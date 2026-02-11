import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
    'image/jpg',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const category = (formData.get('category') as string) || 'GENERAL';

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Allowed types: PDF, DOC, DOCX, PNG, JPG, JPEG' },
                { status: 400 }
            );
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: 'File size exceeds 10MB limit' },
                { status: 400 }
            );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `documents/${category.toLowerCase()}/${timestamp}_${originalName}`;

        // Upload to Vercel Blob
        const blob = await put(fileName, file, {
            access: 'public',
        });

        return NextResponse.json({
            success: true,
            fileName: originalName,
            filePath: blob.url, // Store the full Blob URL
            fileSize: file.size,
            fileType: file.type,
        });
    } catch (error: any) {
        console.error('Upload Error Details:', {
            message: error.message,
            stack: error.stack,
            error
        });
        return NextResponse.json(
            { error: `Upload failed: ${error.message || 'Unknown error'}` },
            { status: 500 }
        );
    }
}
