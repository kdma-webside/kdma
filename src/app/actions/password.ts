'use server';

import prisma from '@/lib/db';

export async function sendPasswordReset(email: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        // For security, don't reveal if a user exists
        return { success: true };
    }

    // Generate a secure 6-digit code for simplicity
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    await prisma.passwordReset.upsert({
        where: { email },
        update: { token, expiresAt },
        create: { email, token, expiresAt }
    });

    // Mock Email: Log to console
    console.log(`[MOCK EMAIL] Password Reset Code for ${email}: ${token}`);

    return { success: true };
}

export async function resetPassword(email: string, token: string, newPassword: string) {
    const record = await prisma.passwordReset.findUnique({
        where: { email }
    });

    if (!record || record.token !== token) {
        return { success: false, message: "Invalid or expired reset code." };
    }

    if (record.expiresAt < new Date()) {
        return { success: false, message: "Reset code has expired." };
    }

    // Update user password
    await prisma.user.update({
        where: { email },
        data: { password: newPassword } // In production, hash this!
    });

    // Delete the reset record
    await prisma.passwordReset.delete({
        where: { email }
    });

    return { success: true };
}
