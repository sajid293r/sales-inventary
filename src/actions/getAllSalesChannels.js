// src/actions/getAllSalesChannels.js
'use server'

import connectDB from "@/lib/db";
import SalesChannel from "@/models/salesChannel";

export const getAllSalesChannels = async () => {
  try {
    await connectDB();

    const channels = await SalesChannel.find({});
    return JSON.parse(JSON.stringify(channels)); 
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
