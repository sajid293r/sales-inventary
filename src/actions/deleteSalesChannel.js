// src/actions/deleteSalesChannel.js
'use server';

import { connectDB, SalesChannel } from '@/lib/mongoose';

export const deleteSalesChannel = async (id) => {
  try {
    await connectDB();
    await SalesChannel.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error('❌ Delete error:', error);
    return { success: false, error: 'Failed to delete sales channel' };
  }
};
