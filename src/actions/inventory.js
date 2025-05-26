'use server';

import { connectDB } from "@/lib/mongoose";
import SalesInventory from "@/models/salesInventory";

export const submitProductAction = async (formData) => {
  try {
    // Validate product title
    if (!formData.productTitle || formData.productTitle.trim() === '') {
      return { 
        success: false, 
        error: "Please enter Product Title",
        type: "validation_error"
      };
    }

    await connectDB();

    let result;

    if (formData._id) {
      // Update existing product
      result = await SalesInventory.findByIdAndUpdate(
        formData._id,
        { $set: formData },
        { new: true }
      );
    } else {
      // Check if product already exists by title
      const existing = await SalesInventory.findOne({ productTitle: formData.productTitle });
      if (existing) {
        return {
          success: false,
          error: "Product already exists",
          type: "duplicate_error"
        };
      }

      // Create new product
      const newProduct = new SalesInventory(formData);
      result = await newProduct.save();
    }

    return {
      success: true,
      id: result._id.toString(),
      message: formData._id ? "Product updated successfully" : "Product created successfully"
    };

  } catch (error) {
    console.error("Product save error:", error);
    return {
      success: false,
      error: error.message,
      type: "server_error"
    };
  }
};
