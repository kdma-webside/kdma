import { NextRequest, NextResponse } from 'next/server';

// This endpoint creates a Razorpay order server-side
// Razorpay requires server-side order creation for security
export async function POST(request: NextRequest) {
    try {
        const { amount, currency = 'INR', notes = {} } = await request.json();

        // Validate request
        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            );
        }

        // Check if Razorpay credentials are configured
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            console.error('Razorpay credentials not configured');
            return NextResponse.json(
                { error: 'Payment gateway not configured' },
                { status: 503 }
            );
        }

        // Create Razorpay order using their API
        const response = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
            },
            body: JSON.stringify({
                amount: Math.round(amount * 100), // Convert to paise
                currency,
                notes,
                receipt: `order_${Date.now()}`,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Razorpay API error:', errorData);
            return NextResponse.json(
                { error: 'Failed to create order' },
                { status: response.status }
            );
        }

        const order = await response.json();

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
