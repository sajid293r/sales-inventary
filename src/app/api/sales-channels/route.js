import { NextResponse } from 'next/server';
import { connectDB, SalesChannel } from '@/lib/mongoose';

export async function GET() {
  try {
    await connectDB();
    
    // Use lean() for better performance and add timeout
    const salesChannels = await SalesChannel.find({})
      .lean()
      .maxTimeMS(5000); // Add timeout to the query
    
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
    await connectDB();
    const body = await request.json();
    
    // Add timeout to the operation
    const salesChannel = await SalesChannel.create(body)
      .maxTimeMS(5000);
    
    return NextResponse.json(salesChannel);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create sales channel', details: error.message },
      { status: 500 }
    );
  }
}
