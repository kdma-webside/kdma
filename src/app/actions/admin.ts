'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function loginAdmin(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        return { success: false, message: 'Please provide both username and password' };
    }

    try {
        const admin = await prisma.admin.findUnique({
            where: { username }
        });

        if (!admin || admin.password !== password) {
            return { success: false, message: 'Invalid credentials' };
        }

        // Set session cookie
        // In Next.js 15, cookies() is async
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 24 hours
        });

        return { success: true };
    } catch (error) {
        console.error('Admin login error:', error);
        return { success: false, message: 'System error during authentication' };
    }
}

export async function logoutAdmin() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    return { success: true };
}

export async function updateAdminPassword(adminUsername: string, currentPassword: string, newPassword: string) {
    try {
        const admin = await prisma.admin.findUnique({
            where: { username: adminUsername }
        });

        if (!admin) {
            return { success: false, message: 'Administrator account not found' };
        }

        // In a real application, you MUST hash the password.
        // For now, mirroring the existing login logic which seems to use plain text.
        if (admin.password !== currentPassword) {
            return { success: false, message: 'Invalid current password' };
        }

        await prisma.admin.update({
            where: { username: adminUsername },
            data: { password: newPassword }
        });

        revalidatePath('/admin');
        return { success: true, message: 'Access cipher updated successfully' };
    } catch (error) {
        console.error('Admin password update error:', error);
        return { success: false, message: 'System error during protocol update' };
    }
}
