'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getTrainings() {
    console.log('--- DEBUG: getTrainings ---');
    console.log('Prisma Keys:', Object.keys(prisma));
    console.log('Has Training?', 'training' in prisma);
    // Explicitly cast to any to debug runtime state
    if (!(prisma as any).training) {
        console.error('CRITICAL: prisma.training is undefined!');
        // Fallback or throw informative error
        throw new Error('Prisma Client is missing Training model. Please restart dev server.');
    }
    return await prisma.training.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getCamps() {
    return await prisma.camp.findMany({
        where: { isActive: true },
        orderBy: { startDate: 'asc' }
    });
}

export async function createTraining(data: any) {
    const training = await prisma.training.create({
        data: {
            title: data.title,
            description: data.description,
            duration: data.duration,
            level: data.level,
            image: data.image,
            category: data.category,
            isActive: data.isActive ?? true
        }
    });
    revalidatePath('/trainings');
    return training;
}

export async function createCamp(data: any) {
    const camp = await prisma.camp.create({
        data: {
            title: data.title,
            description: data.description,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            location: data.location,
            image: data.image,
            price: parseFloat(data.price),
            isActive: data.isActive ?? true
        }
    });
    revalidatePath('/trainings');
    return camp;
}

export async function deleteTraining(id: string) {
    await prisma.training.delete({ where: { id } });
    revalidatePath('/trainings');
}

export async function updateTraining(id: string, data: any) {
    try {
        console.log('Updating training:', id, data);
        await prisma.training.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                duration: data.duration,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                level: data.level,
                image: data.image,
                category: data.category,
                isActive: data.isActive ?? true
            }
        });
        revalidatePath('/trainings');
        console.log('Training updated successfully');
    } catch (error) {
        console.error('Error updating training:', error);
        throw error;
    }
}

export async function deleteCamp(id: string) {
    await prisma.camp.delete({ where: { id } });
    revalidatePath('/trainings');
}

export async function updateCamp(id: string, data: any) {
    await prisma.camp.update({
        where: { id },
        data: {
            title: data.title,
            description: data.description,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            location: data.location,
            image: data.image,
            price: parseFloat(data.price),
            isActive: data.isActive ?? true
        }
    });
    revalidatePath('/trainings');
}

export async function registerForTraining(trainingId: string, data: any) {
    // Explicitly check for training relation access
    if (!(prisma as any).trainingRegistration) {
        console.error('CRITICAL: prisma.trainingRegistration is undefined! Schema might not constitute client yet.');
    }

    const registration = await prisma.trainingRegistration.create({
        data: {
            trainingId,
            userName: data.userName,
            userEmail: data.userEmail,
            userPhone: data.userPhone,
            responses: JSON.stringify(data.responses),
            status: 'registered'
        }
    });

    // Optional: Send email notification here

    revalidatePath('/trainings');
    return registration;
}

export async function registerForCamp(campId: string, data: any) {
    const registration = await prisma.campRegistration.create({
        data: {
            campId,
            userName: data.userName,
            userEmail: data.userEmail,
            userPhone: data.userPhone,
            responses: JSON.stringify(data.responses),
            status: 'registered'
        }
    });

    revalidatePath('/trainings');
    return registration;
}

export async function getTrainingRegistrations() {
    return await prisma.trainingRegistration.findMany({
        include: {
            training: true
        },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getCampRegistrations() {
    return await prisma.campRegistration.findMany({
        include: {
            camp: true
        },
        orderBy: { createdAt: 'desc' }
    });
}
