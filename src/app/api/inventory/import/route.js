import { connectDB } from "@/lib/mongoose";
import SalesInventory from "@/models/salesInventory";

export async function POST(request) {
  try {
    await connectDB();
    const inventoryItem = await request.json();

    // Check if product exists by title
    const existingProduct = await SalesInventory.findOne({ 
      productTitle: inventoryItem.productTitle 
    });

    let result;
    let action;

    if (existingProduct) {
      // Update existing product
      result = await SalesInventory.findByIdAndUpdate(
        existingProduct._id,
        { $set: inventoryItem },
        { new: true }
      );
      action = 'updated';
    } else {
      // Create new product
      const newProduct = new SalesInventory(inventoryItem);
      result = await newProduct.save();
      action = 'created';
    }

    return Response.json({ 
      success: true, 
      action,
      data: result 
    });

  } catch (error) {
    console.error('Import error:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    });
  }
} 