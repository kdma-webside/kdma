'use server';

import prisma from '@/lib/prisma';

export async function sendOtp(phone: string) {
    // Generate a 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Upsert the OTP record
    await prisma.otpVerification.upsert({
        where: { phone },
        update: { code, expiresAt },
        create: { phone, code, expiresAt }
    });

    // Check if real SMS service is configured
    const apiKey = process.env.SMS_API_KEY;
    const templateId = process.env.SMS_TEMPLATE_ID;

    if (apiKey && templateId) {
        try {
            // Priority: MSG91 Integration (Recommended for India)
            const response = await fetch(`https://api.msg91.com/api/v5/otp?template_id=${templateId}&mobile=${phone}&authkey=${apiKey}&otp=${code}`, {
                method: 'GET'
            });
            const data = await response.json();
            console.log(`[SMS API] Response for ${phone}:`, data);
        } catch (error) {
            console.error('[SMS API] Error sending OTP:', error);
            // Fallback to console for debugging even if API fails
            console.log(`[FALLBACK] OTP for ${phone}: ${code}`);
        }
    } else {
        // Mock SMS: Log to console
        console.log(`[MOCK SMS] OTP for ${phone}: ${code}`);
    }

    return { success: true };
}

export async function verifyOtp(phone: string, code: string) {
    const record = await prisma.otpVerification.findUnique({
        where: { phone }
    });

    if (!record) {
        return { success: false, message: 'No OTP found for this number.' };
    }

    if (record.code !== code) {
        return { success: false, message: 'Invalid OTP code.' };
    }

    if (record.expiresAt < new Date()) {
        return { success: false, message: 'OTP has expired. Please request a new one.' };
    }

    // Securely mark as verified instead of deleting
    // This allows the subsequent createUser call to check verification status server-side
    await prisma.otpVerification.update({
        where: { phone },
        data: { verifiedAt: new Date() }
    });

    return { success: true };
}

/**
 * Server-internal check to ensure a phone was verified recently.
 * To be used by createUser or other sensitive actions.
 */
export async function isPhoneVerified(phone: string) {
    const record = await prisma.otpVerification.findUnique({
        where: { phone }
    });

    if (!record || !record.verifiedAt) return false;

    // Optional: Only trust verification for a short window (e.g., 30 mins)
    const verificationWindow = 30 * 60 * 1000;
    const isRecent = (Date.now() - record.verifiedAt.getTime()) < verificationWindow;

    return isRecent;
}

export async function clearVerification(phone: string) {
    try {
        await prisma.otpVerification.delete({ where: { phone } });
    } catch (e) {
        // Ignore if already deleted
    }
}
