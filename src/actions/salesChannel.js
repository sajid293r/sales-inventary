// 'use server'
// import { connectDB, SalesChannel } from "@/lib/mongoose";

// export const submitAction = async (formData) => {
//   try {
//     // Validate sales channel name
//     if (!formData.salesChannelName || formData.salesChannelName.trim() === '') {
//       return { 
//         success: false, 
//         error: "Please enter Sales Channel Name",
//         type: "validation_error"
//       };
//     }

//     await connectDB();
//     let result;
//     if (formData._id) {
//       // Update existing record
//       result = await SalesChannel.findByIdAndUpdate(
//         formData._id,
//         { $set: formData },
//         { new: true }
//       );
//     } else {
//       // Create new record
//       const filter = { salesChannelName: formData.salesChannelName };
//       const update = { $set: formData };
//       const options = { upsert: true, new: true };
//       result = await SalesChannel.findOneAndUpdate(filter, update, options);
//     }

//     if (!result) {
//       throw new Error('Failed to save/update sales channel');
//     }

//     console.log("✅ Saved or Updated:", result._id);
//     return { 
//       success: true, 
//       id: result._id.toString(),
//       message: "Sales Channel saved successfully"
//     }; 
//   } catch (error) {
//     console.error("Save error:", error);
//     return { 
//       success: false, 
//       error: error.message,
//       type: "server_error"
//     };
//   }
// }


'use server'
import { connectDB, SalesChannel } from "@/lib/mongoose";

export const submitAction = async (formData) => {
  try {
    // Validate sales channel name
    if (!formData.salesChannelName || formData.salesChannelName.trim() === '') {
      return {
        success: false,
        error: "Please enter Sales Channel Name",
        type: "validation_error"
      };
    }

    await connectDB();

    // 🔁 Check if name already exists (exclude current _id in case of update)
    const existing = await SalesChannel.findOne({
      salesChannelName: formData.salesChannelName.trim(),
      _id: { $ne: formData._id } // excludes current doc if updating
    });

    if (existing) {
      return {
        success: false,
        error: "Sales Channel Name is already registered",
        type: "duplicate_error"
      };
    }

    let result;
    if (formData._id) {
      // Update existing record
      result = await SalesChannel.findByIdAndUpdate(
        formData._id,
        { $set: formData },
        { new: true }
      );
    } else {
      // Create new record
      const newRecord = new SalesChannel(formData);
      result = await newRecord.save();
    }

    if (!result) {
      throw new Error('Failed to save/update sales channel');
    }

    console.log("✅ Saved or Updated:", result._id);
    return {
      success: true,
      id: result._id.toString(),
      message: "Sales Channel saved successfully"
    };
  } catch (error) {
    console.error("Save error:", error);
    return {
      success: false,
      error: error.message,
      type: "server_error"
    };
  }
}
