'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { setSession, deleteSession, getSession } from '@/lib/auth';

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

    await setSession({ id: user.id, name: user.name, email: user.email });

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

    const userData = { id: user.id, name: user.name, email: user.email };
    await setSession(userData);

    return { success: true, user: userData };
}

export async function logout() {
    await deleteSession();
    revalidatePath('/');
}

export async function getCurrentSession() {
    return await getSession();
}

export async function deleteUser(id: string) {
    await prisma.user.delete({
        where: { id }
    });
    revalidatePath('/admin/users');
}
