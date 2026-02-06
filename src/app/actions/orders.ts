'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getOrders() {
    const orders = await prisma.order.findMany({
        include: {
            items: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return orders;
}

export async function updateOrderStatus(id: string, status: string) {
    await prisma.order.update({
        where: { id },
        data: { status }
    });
    revalidatePath('/admin/store');
}

export async function deleteOrder(id: string) {
    await prisma.order.delete({
        where: { id }
    });
    revalidatePath('/admin/store');
}

export async function createOrder(data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    totalAmount: number;
    items: { productId: string; quantity: number; price: number }[];
}) {
    // Verify all products exist
    const productIds = data.items.map(item => item.productId);
    const existingProducts = await prisma.product.findMany({
        where: {
            id: {
                in: productIds
            }
        },
        select: { id: true }
    });

    const existingProductIds = new Set(existingProducts.map(p => p.id));
    const invalidProducts = data.items.filter(item => !existingProductIds.has(item.productId));

    if (invalidProducts.length > 0) {
        throw new Error(`One or more items in your cart are no longer available (IDs: ${invalidProducts.map(i => i.productId).join(', ')}). Please clear your cart and try again.`);
    }

    const order = await prisma.order.create({
        data: {
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            address: data.address,
            totalAmount: data.totalAmount,
            status: 'pending',
            items: {
                create: data.items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }))
            }
        }
    });
    revalidatePath('/admin/store');
    return order;
}
