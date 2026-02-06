'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
    return await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function createUser(data: any) {
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password, // In a production app, hash this
        }
    });
    revalidatePath('/admin/users');
    return user;
}

export async function verifyUser(data: any) {
    const user = await prisma.user.findUnique({
        where: { email: data.email }
    });

    if (!user) {
        throw new Error('User not found');
    }

    if (user.password !== data.password) {
        throw new Error('Invalid credentials');
    }

    return { success: true, user: { id: user.id, name: user.name, email: user.email } };
}

export async function deleteUser(id: string) {
    await prisma.user.delete({
        where: { id }
    });
    revalidatePath('/admin/users');
}
