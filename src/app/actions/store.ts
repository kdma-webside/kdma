'use server';

import prisma from '@/lib/prisma';
import { revalidatePath, unstable_noStore } from 'next/cache';

export async function getProducts() {
    unstable_noStore();
    try {
        return await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Error fetching products during build:", error);
        return [];
    }
}

export async function updateProduct(id: string, data: any) {
    const product = await prisma.product.update({
        where: { id },
        data
    });
    revalidatePath('/admin/store');
    revalidatePath('/store');
    return product;
}

export async function createProduct(data: any) {
    const product = await prisma.product.create({
        data
    });
    revalidatePath('/admin/store');
    revalidatePath('/store');
    return product;
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id }
    });
    revalidatePath('/admin/store');
    revalidatePath('/store');
}
