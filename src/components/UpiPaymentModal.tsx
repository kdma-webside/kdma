'use client';

import { useState } from 'react';
import { X, Copy, Check, CheckCircle2, Phone } from 'lucide-react';

interface UpiPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    upiId: string;
    qrCodeUrl?: string;
}

export default function UpiPaymentModal({
    isOpen,
    onClose,
    amount,
    upiId,
    qrCodeUrl,
}: UpiPaymentModalProps) {
    const [copied, setCopied] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!isOpen) return null;

    const handleCopyUpiId = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePaymentComplete = () => {
        setShowConfirmation(true);
    };

    const handleClose = () => {
        setShowConfirmation(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="relative w-full max-w-md bg-gradient-to-br from-neutral-900 to-neutral-800 border border-orange-500/30 rounded-2xl p-8 mx-4">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-white transition"
                >
                    <X className="w-6 h-6" />
                </button>

                {!showConfirmation ? (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-2">Complete Payment</h2>
                        <p className="text-orange-400 text-3xl font-bold mb-6">₹{amount.toFixed(2)}</p>

                        {/* QR Code Section */}
                        {qrCodeUrl && (
                            <div className="bg-white rounded-xl p-6 mb-6 flex justify-center">
                                <img
                                    src={qrCodeUrl}
                                    alt="UPI QR Code"
                                    className="w-64 h-64 object-contain"
                                />
                            </div>
                        )}

                        {/* UPI ID Section */}
                        <div className="mb-6">
                            <label className="text-sm text-neutral-400 mb-2 block">UPI ID</label>
                            <div className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 rounded-lg p-3">
                                <input
                                    type="text"
                                    value={upiId}
                                    readOnly
                                    className="flex-1 bg-transparent text-white outline-none"
                                />
                                <button
                                    onClick={handleCopyUpiId}
                                    className="p-2 hover:bg-neutral-700 rounded-lg transition"
                                    title="Copy UPI ID"
                                >
                                    {copied ? (
                                        <Check className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-neutral-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-neutral-800/50 border border-orange-500/20 rounded-lg p-4 mb-6">
                            <h3 className="text-white font-semibold mb-2">Payment Instructions</h3>
                            <ol className="text-sm text-neutral-300 space-y-2 list-decimal list-inside">
                                <li>Scan the QR code with any UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                                <li>Or copy the UPI ID and paste in your UPI app</li>
                                <li>Enter the amount: ₹{amount.toFixed(2)}</li>
                                <li>Complete the payment</li>
                                <li>Take a screenshot of the payment confirmation</li>
                            </ol>
                        </div>

                        {/* Note */}
                        <p className="text-xs text-neutral-500 mb-4">
                            After payment, our team will verify and confirm your order within 24 hours.
                            Please keep the payment receipt for verification.
                        </p>

                        <button
                            onClick={handlePaymentComplete}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition"
                        >
                            I've Completed Payment
                        </button>
                    </>
                ) : (
                    /* Thank You Confirmation Screen */
                    <div className="text-center py-8">
                        <div className="mb-6 flex justify-center">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
                            <p className="text-green-400 font-semibold mb-2">Order Confirmed</p>
                            <p className="text-neutral-300 text-sm">
                                Your order has been received successfully. Our sales executive will contact you soon to confirm your order details.
                            </p>
                        </div>

                        <div className="bg-neutral-800/50 border border-orange-500/20 rounded-lg p-4 mb-6">
                            <h3 className="text-white font-semibold mb-3 flex items-center justify-center gap-2">
                                <Phone className="w-5 h-5 text-orange-500" />
                                Customer Care
                            </h3>
                            <a
                                href="tel:+919876543210"
                                className="text-orange-400 text-2xl font-bold hover:text-orange-300 transition"
                            >
                                +91 98765 43210
                            </a>
                            <p className="text-xs text-neutral-500 mt-2">
                                Available Mon-Sat, 9 AM - 6 PM
                            </p>
                        </div>

                        <button
                            onClick={handleClose}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
