 'use server'
 import connectDB from "@/lib/db";
 import SalesChannel from "@/models/salesChannel";


export const submitAction = async (formData) => {
  try {
    await connectDB();

    const filter = { salesChannelName: formData.salesChannelName };
    const update = { $set: formData };
    const options = { upsert: true, new: true }; // upsert = update or insert

    const result = await SalesChannel.findOneAndUpdate(filter, update, options);

    console.log("✅ Saved or Updated:", result._id);
    return { success: true, id: result._id.toString() }; 
  } catch (error) {
    console.error("Save error:", error);
    return { success: false, error: error.message };
  }
}