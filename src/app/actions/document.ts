'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

export interface Document {
    id: string;
    title: string;
    description: string | null;
    fileName: string;
    filePath: string;
    category: string;
    fileSize: number;
    fileType: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface DocumentsByCategory {
    [category: string]: Document[];
}

/**
 * Get all public documents grouped by category
 */
export async function getPublicDocuments(): Promise<DocumentsByCategory> {
    const documents = await prisma.document.findMany({
        where: { isPublic: true },
        orderBy: [{ category: 'asc' }, { createdAt: 'desc' }],
    });

    // Group by category
    const grouped: DocumentsByCategory = {};
    documents.forEach((doc: Document) => {
        if (!grouped[doc.category]) {
            grouped[doc.category] = [];
        }
        grouped[doc.category].push(doc);
    });

    return grouped;
}

/**
 * Get all documents (admin only)
 */
export async function getAllDocuments(): Promise<Document[]> {
    const documents = await prisma.document.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return documents;
}

/**
 * Get a single document by ID
 */
export async function getDocumentById(id: string): Promise<Document | null> {
    const document = await prisma.document.findUnique({
        where: { id },
    });
    return document;
}

/**
 * Create a new document
 */
export async function createDocument(data: {
    title: string;
    description?: string;
    fileName: string;
    filePath: string;
    category: string;
    fileSize: number;
    fileType: string;
    isPublic?: boolean;
}): Promise<Document> {
    const document = await prisma.document.create({
        data: {
            title: data.title,
            description: data.description || null,
            fileName: data.fileName,
            filePath: data.filePath,
            category: data.category,
            fileSize: data.fileSize,
            fileType: data.fileType,
            isPublic: data.isPublic !== undefined ? data.isPublic : true,
        },
    });

    revalidatePath('/documents');
    revalidatePath('/admin/documents');

    return document;
}

/**
 * Update document metadata
 */
export async function updateDocument(
    id: string,
    data: {
        title?: string;
        description?: string;
        category?: string;
        isPublic?: boolean;
    }
): Promise<Document> {
    const document = await prisma.document.update({
        where: { id },
        data: {
            title: data.title,
            description: data.description,
            category: data.category,
            isPublic: data.isPublic,
        },
    });

    revalidatePath('/documents');
    revalidatePath('/admin/documents');

    return document;
}

/**
 * Delete a document and its file
 */
export async function deleteDocument(id: string): Promise<void> {
    const document = await prisma.document.findUnique({
        where: { id },
    });

    if (!document) {
        throw new Error('Document not found');
    }

    // Delete the physical file
    const filePath = path.join(process.cwd(), 'public', document.filePath);
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error('Error deleting file:', error);
        // Continue even if file deletion fails
    }

    // Delete from database
    await prisma.document.delete({
        where: { id },
    });

    revalidatePath('/documents');
    revalidatePath('/admin/documents');
}

/**
 * Get document statistics
 */
export async function getDocumentStats() {
    const totalDocuments = await prisma.document.count();
    const publicDocuments = await prisma.document.count({
        where: { isPublic: true },
    });

    const documents = await prisma.document.findMany();
    const totalSize = documents.reduce((sum: number, doc: Document) => sum + doc.fileSize, 0);

    // Group by category
    const byCategory: { [key: string]: number } = {};
    documents.forEach((doc) => {
        byCategory[doc.category] = (byCategory[doc.category] || 0) + 1;
    });

    return {
        totalDocuments,
        publicDocuments,
        totalSize,
        byCategory,
    };
}
