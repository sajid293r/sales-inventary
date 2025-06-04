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
    if (!formData.sku || formData.sku.trim() === '') {
      return { 
        success: false, 
        error: "Please enter SKU",
        type: "validation_error"
      };
    }
    if (!formData.sellingPrice || formData.sellingPrice.trim() === '') {
      return { 
        success: false, 
        error: "Please enter Selling Price",
        type: "validation_error"
      };
    }if (!formData.rrp || formData.rrp.trim() === '') {
      return { 
        success: false, 
        error: "Please enter RRP",
        type: "validation_error"
      };
    }
    const title = formData.productTitle.trim();
    if (title === title.toLowerCase() || title === title.toUpperCase()) {
      return {
        success: false,
        error: "Product title must not be all lowercase or all uppercase",
        type: "format_error"
      };
    }
    await connectDB();

    // Prepare data with explicit imageName
    const productData = {
      ...formData,
      imageName: formData.imageName || "" // Ensure imageName is included
    };

    let result;
    if (formData._id) {
      // Update existing product
      console.log('Updating existing product:', formData._id);
      result = await SalesInventory.findByIdAndUpdate(
        formData._id,
        { $set: productData },
        { new: true }
      );
    } else {
      // Check if product already exists by title
      console.log('Checking for existing product with title:', formData.productTitle);
      const existing = await SalesInventory.findOne({ productTitle: formData.productTitle });
      if (existing) {
        return {
          success: false,
          error: "Product already exists",
          type: "duplicate_error"
        };
      }

      // Create new product
      console.log('Creating new product with data:', productData);
      const newProduct = new SalesInventory(productData);
      result = await newProduct.save();
    }

    console.log('Operation result:', result);
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
