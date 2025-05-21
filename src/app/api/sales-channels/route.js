import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';

// Define the schema
const salesChannelSchema = new mongoose.Schema({
  // Add your schema fields here
  name: String,
  // ... other fields
}, { timestamps: true });

// Create the model if it doesn't exist
const SalesChannel = mongoose.models.SalesChannel || mongoose.model('SalesChannel', salesChannelSchema);

export async function GET() {
  try {
    await dbConnect();
    const salesChannels = await SalesChannel.find({}).lean();
    return NextResponse.json(salesChannels);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales channels', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const salesChannel = await SalesChannel.create(body);
    return NextResponse.json(salesChannel);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create sales channel', details: error.message },
      { status: 500 }
    );
  }
}
