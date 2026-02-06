'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getProducts() {
    return await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    });
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
