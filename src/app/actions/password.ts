'use server';

import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

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

    // Send real email if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
            const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?email=${encodeURIComponent(email)}&token=${token}`;

            await transporter.sendMail({
                from: `"KDMA Academy" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Reset Your KDMA Academy Password",
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #ea580c; text-align: center; text-transform: uppercase;">Reset Your Legacy</h2>
                        <p>Greetings Warrior,</p>
                        <p>We received a request to reset your password for the KDMA Academy portal.</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #ea580c; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; text-transform: uppercase; font-size: 14px;">Reset Password</a>
                        </div>
                        <p>Or use this code manually: <strong>${token}</strong></p>
                        <p style="font-size: 12px; color: #666;">This link and code will expire in 1 hour. If you didn't request this, please ignore this email.</p>
                        <hr style="border: 0; border-top: 1px solid #eee;" />
                        <p style="font-size: 10px; color: #999; text-align: center;">KDMA ACADEMY • THE ANCIENT PATH</p>
                    </div>
                `,
            });
            console.log(`[EMAIL] Password reset sent to ${email}`);
        } catch (error) {
            console.error('[EMAIL] Error sending password reset:', error);
            // Fallback for dev: still log to console
            console.log(`[FALLBACK] Reset Code for ${email}: ${token}`);
        }
    } else {
        // Mock Email: Log to console if no SMTP config
        console.log(`[MOCK EMAIL] Password Reset Code for ${email}: ${token}`);
    }

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
