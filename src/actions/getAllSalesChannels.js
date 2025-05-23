// src/actions/getAllSalesChannels.js
'use server'

import { connectDB, SalesChannel } from "@/lib/mongoose";

export const getAllSalesChannels = async () => {
  try {
    await connectDB();
const channels = await SalesChannel.find({}).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(channels)); 
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
