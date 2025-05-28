'use server';

import { connectDB } from "@/lib/mongoose";
import SalesInventory from "@/models/salesInventory";

export const getAllInventory = async () => {
  try {
    await connectDB();

    const products = await SalesInventory.find({}).sort({ createdAt: -1 }).lean();

    const cleaned = products.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toISOString(),
      updatedAt: p.updatedAt?.toISOString(),
    }));

    return {
      success: true,
      data: cleaned
    };

  } catch (error) {
    console.error("Error fetching inventory:", error);
    return {
      success: false,
      error: error.message
    };
  }
};
