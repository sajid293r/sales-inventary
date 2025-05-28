'use server';

import { connectDB } from '@/lib/mongoose';
import ProductInventory from '@/models/salesInventory'; 

export const deleteInventory = async (id) => {
  try {
    await connectDB();
    await ProductInventory.findByIdAndDelete(id); 
    return { success: true };
  } catch (error) {
    console.error('❌ Delete error:', error);
    return { success: false, error: 'Failed to delete Inventory' };
  }
};
