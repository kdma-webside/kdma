'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, LogIn } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import UpiPaymentModal from '@/components/UpiPaymentModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CartDrawer = () => {
    const {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        updateQuantity,
        removeFromCart,
        subtotal,
        clearCart,
        focusAddress,
        setFocusAddress
    } = useCart();

    const nameRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const phoneRef = React.useRef<HTMLInputElement>(null);
    const addressRef = React.useRef<HTMLTextAreaElement>(null);

    // Body scroll lock
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
            // Add padding to prevent layout shift if necessary
            document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [isCartOpen]);

    // Handle focusing the address field when triggered by context
    useEffect(() => {
        if (isCartOpen && focusAddress && addressRef.current) {
            // Small delay to ensure the drawer animation is far enough along
            const timer = setTimeout(() => {
                addressRef.current?.focus();
                addressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setFocusAddress(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isCartOpen, focusAddress, setFocusAddress]);

    const [checkoutDetails, setCheckoutDetails] = React.useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [isCheckingOut, setIsCheckingOut] = React.useState(false);
    const [showUpiModal, setShowUpiModal] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
    const router = useRouter();

    // Check authentication status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { getCurrentSession } = await import('@/app/actions/users');
                const session = await getCurrentSession();
                setIsAuthenticated(!!session);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        // Check if user is authenticated
        if (isAuthenticated === false) {
            // Show sign-in prompt
            const shouldSignIn = confirm('You must be signed in to purchase from our store. Would you like to sign in now?');
            if (shouldSignIn) {
                router.push('/sign-in');
            }
            return;
        }

        if (!checkoutDetails.name) {
            nameRef.current?.focus();
            return;
        }
        if (!checkoutDetails.email) {
            emailRef.current?.focus();
            return;
        }
        if (!checkoutDetails.phone) {
            phoneRef.current?.focus();
            return;
        }
        if (!checkoutDetails.address) {
            addressRef.current?.focus();
            return;
        }

        setIsCheckingOut(true);

        try {
            // Create order in backend
            const { createOrder } = await import('@/app/actions/orders');
            const order = await createOrder({
                customerName: checkoutDetails.name,
                customerEmail: checkoutDetails.email,
                customerPhone: checkoutDetails.phone,
                address: checkoutDetails.address,
                totalAmount: subtotal,
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                }))
            });

            if (!order) {
                alert('Failed to create order. Please try again.');
                setIsCheckingOut(false);
                return;
            }

            // Close cart drawer and show UPI payment modal
            setIsCartOpen(false);
            setShowUpiModal(true);
            setIsCheckingOut(false);
        } catch (error) {
            console.error('Checkout error:', error);
            alert('An error occurred during order creation.');
            setIsCheckingOut(false);
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <React.Fragment key="cart-drawer">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#080808] border-l border-white/10 z-[201] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-orange-600" size={24} />
                                <h2 className="text-white text-2xl font-black uppercase tracking-tighter">Your Armory</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white/10">
                                        <ShoppingBag size={40} />
                                    </div>
                                    <div>
                                        <p className="text-white text-lg font-black uppercase tracking-widest mb-2">Armory is Empty</p>
                                        <p className="text-gray-500 text-xs font-sans">Begin your recruitment by adding gear from the store.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-orange-500 pb-1 hover:text-orange-400 hover:border-orange-400 transition-all"
                                    >
                                        Back to Store
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-6">
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex gap-6 group"
                                            >
                                                <div className="relative w-24 h-24 bg-white/5 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover saturate-[0.5] group-hover:saturate-100 transition-all"
                                                    />
                                                </div>

                                                <div className="flex-grow flex flex-col justify-between py-1">
                                                    <div>
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="text-white text-sm font-black uppercase tracking-tight leading-tight max-w-[150px]">
                                                                {item.name}
                                                            </h3>
                                                            <button
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="text-white/20 hover:text-red-500 transition-colors"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                        <p className="text-orange-500 font-black text-xs mt-1">₹{item.price}</p>
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-1">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-all"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="w-8 text-center text-white text-sm font-black">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-all"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                        <div className="text-[10px] text-white/20 font-black tracking-widest uppercase">
                                                            Total: ₹{item.price * item.quantity}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Deployment Details Form */}
                                    <div className="pt-8 border-t border-white/10 space-y-4">
                                        <h3 className="text-white/60 text-xs font-black uppercase tracking-widest">Deployment Details</h3>
                                        <div className="space-y-3">
                                            <input
                                                ref={nameRef}
                                                type="text"
                                                placeholder="Full Name"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600"
                                                value={checkoutDetails.name}
                                                onChange={(e) => setCheckoutDetails({ ...checkoutDetails, name: e.target.value })}
                                            />
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    ref={emailRef}
                                                    type="email"
                                                    placeholder="Email"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600"
                                                    value={checkoutDetails.email}
                                                    onChange={(e) => setCheckoutDetails({ ...checkoutDetails, email: e.target.value })}
                                                />
                                                <input
                                                    ref={phoneRef}
                                                    type="tel"
                                                    placeholder="Phone"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600"
                                                    value={checkoutDetails.phone}
                                                    onChange={(e) => setCheckoutDetails({ ...checkoutDetails, phone: e.target.value })}
                                                />
                                            </div>
                                            <textarea
                                                ref={addressRef}
                                                rows={3}
                                                placeholder="Delivery Address"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600 resize-none"
                                                value={checkoutDetails.address}
                                                onChange={(e) => setCheckoutDetails({ ...checkoutDetails, address: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {cartItems.length > 0 && (
                            <div className="p-8 bg-[#0C0C0C] border-t border-white/10 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-gray-500 text-[10px] font-black tracking-widest uppercase">
                                        <span>Supplies Subtotal</span>
                                        <span>₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500 text-[10px] font-black tracking-widest uppercase">
                                        <span>Shipping Protocol</span>
                                        <span className="text-orange-500">Free Deployment</span>
                                    </div>
                                    <div className="pt-4 flex justify-between items-center">
                                        <span className="text-white text-lg font-black uppercase tracking-tighter">Total Investment</span>
                                        <span className="text-orange-600 text-2xl font-black">₹{subtotal}</span>
                                    </div>
                                </div>

                                {isAuthenticated === false && (
                                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
                                        <div className="flex items-start gap-3">
                                            <LogIn className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
                                            <div>
                                                <p className="text-orange-400 font-semibold text-sm mb-1">Sign In Required</p>
                                                <p className="text-neutral-400 text-xs">
                                                    You must be registered and signed in to purchase from our store.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut || isAuthenticated === null}
                                    className="w-full bg-orange-600 text-white p-5 rounded-2xl font-black tracking-widest text-xs uppercase hover:bg-orange-700 transition-all flex items-center justify-center gap-4 group shadow-[0_20px_40px_-10px_rgba(234,88,12,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isCheckingOut ? 'Initiating...' : (isAuthenticated === false ? 'Sign In to Purchase' : 'Finalize Recruitment')}
                                    {isAuthenticated === false ? <LogIn size={18} /> : <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                                </button>

                                <p className="text-center text-[8px] text-white/20 font-black tracking-[0.3em] uppercase">
                                    SECURE UPI PAYMENT
                                </p>
                            </div>
                        )}
                    </motion.div>
                </React.Fragment>
            )}

            {/* UPI Payment Modal */}
            <UpiPaymentModal
                isOpen={showUpiModal}
                onClose={() => {
                    setShowUpiModal(false);
                    clearCart();
                    setIsCartOpen(false);
                    setCheckoutDetails({ name: '', email: '', phone: '', address: '' });
                }}
                amount={subtotal}
                upiId={process.env.NEXT_PUBLIC_UPI_ID || 'your-upi-id@paytm'}
                qrCodeUrl={process.env.NEXT_PUBLIC_UPI_QR_CODE_URL}
            />
        </AnimatePresence>
    );
};

export default CartDrawer;
