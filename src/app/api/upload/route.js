import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file received.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename with timestamp
    const timestamp = new Date().getTime();
    const uniqueFileName = `${timestamp}_${file.name}`;
    
    // Save to public/uploads/images
    const filePath = path.join(process.cwd(), 'public', 'uploads', 'images', uniqueFileName);
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      fileName: uniqueFileName 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file.' },
      { status: 500 }
    );
  }
} 