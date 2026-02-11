'use server';

import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

// Create email verification token
export async function sendEmailVerification(email: string) {
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Delete any existing verification for this email
    await prisma.otpVerification.deleteMany({
        where: { phone: email }, // Reusing OtpVerification table, using phone field for email
    });

    // Create new verification record
    await prisma.otpVerification.create({
        data: {
            phone: email, // Store email in phone field
            code,
            expiresAt,
        },
    });

    // Send verification email
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"KDMA" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify Your Email - KDMA',
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .code-box { background: white; border: 2px dashed #f97316; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
              .code { font-size: 32px; font-weight: bold; color: #f97316; letter-spacing: 8px; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Email Verification</h1>
                <p style="margin: 10px 0 0 0;">Kanyakumari District Mallakhamb Association</p>
              </div>
              <div class="content">
                <p>Hello,</p>
                <p>Thank you for registering with KDMA. Please use the verification code below to complete your registration:</p>
                
                <div class="code-box">
                  <div class="code">${code}</div>
                </div>
                
                <p><strong>This code will expire in 15 minutes.</strong></p>
                
                <p>If you didn't request this code, please ignore this email.</p>
                
                <p>Best regards,<br>KDMA Team</p>
              </div>
              <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </body>
        </html>
      `,
        });

        console.log(`[EMAIL] Verification code sent to ${email}`);
        return { success: true };
    } catch (error) {
        console.error('[EMAIL] Error sending verification:', error);
        return { success: false, message: 'Failed to send verification email' };
    }
}

// Verify email code
export async function verifyEmailCode(email: string, code: string) {
    const record = await prisma.otpVerification.findUnique({
        where: { phone: email },
    });

    if (!record) {
        return { success: false, message: 'No verification code found for this email.' };
    }

    if (record.code !== code) {
        return { success: false, message: 'Invalid verification code.' };
    }

    if (record.expiresAt < new Date()) {
        return { success: false, message: 'Verification code has expired. Please request a new one.' };
    }

    // Mark as verified
    await prisma.otpVerification.update({
        where: { phone: email },
        data: { verifiedAt: new Date() },
    });

    return { success: true };
}

// Check if email is verified
export async function isEmailVerified(email: string) {
    const record = await prisma.otpVerification.findUnique({
        where: { phone: email },
    });

    if (!record || !record.verifiedAt) return false;

    // Trust verification for 30 minutes
    const verificationWindow = 30 * 60 * 1000;
    const isRecent = (Date.now() - record.verifiedAt.getTime()) < verificationWindow;

    return isRecent;
}

// Clear verification
export async function clearEmailVerification(email: string) {
    try {
        await prisma.otpVerification.delete({ where: { phone: email } });
    } catch (e) {
        // Ignore if already deleted
    }
}
