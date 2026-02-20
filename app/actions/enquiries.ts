'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getEnquiries() {
    return await prisma.enquiry.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function createEnquiry(data: any) {
    const enquiry = await prisma.enquiry.create({
        data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            interest: data.interest,
        }
    });
    revalidatePath('/admin/enquiries');
    return enquiry;
}

export async function updateEnquiryStatus(id: string, status: string) {
    const enquiry = await prisma.enquiry.update({
        where: { id },
        data: { status }
    });
    revalidatePath('/admin/enquiries');
    return enquiry;
}

export async function deleteEnquiry(id: string) {
    await prisma.enquiry.delete({
        where: { id }
    });
    revalidatePath('/admin/enquiries');
}
