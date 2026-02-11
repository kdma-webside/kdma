'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCart, Mail, Lock, User, Phone, ArrowRight, Chrome, ChevronLeft, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import { getCurrentSession, logout } from '@/app/actions/users';

const Navbar = () => {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const currentSession = await getCurrentSession();
      setSession(currentSession);
    };
    fetchSession();
  }, []);

  const handleLogout = async () => {
    await logout();
    setSession(null);
    window.location.href = '/';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'COMMITTEE', href: '/committee' },
    { name: 'TRAININGS', href: '/trainings' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'EVENTS', href: '/events' },
    { name: 'DOCUMENTS', href: '/documents' },
    { name: 'STORE', href: '/store' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] px-6 lg:px-24 py-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-gradient-to-b from-black to-transparent'}`}>
        {/* Logo */}
        <div className="flex items-center">
          <MagneticButton>
            <Link href="/" className="group relative z-[110]">
              <div className="text-white font-black text-3xl lg:text-4xl tracking-tighter flex items-center">
                <span className="bg-white text-black px-2 mr-1">K</span>
                <span className="group-hover:text-orange-600 transition-colors">DMA</span>
              </div>
            </Link>
          </MagneticButton>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;

            return (
              <MagneticButton key={item.name}>
                <Link
                  href={item.href}
                  className={`text-white text-[10px] tracking-[0.4em] font-black hover:text-orange-600 active:text-orange-500 transition-colors relative group`}
                >
                  {item.name}
                  <div className={`absolute -bottom-2 left-0 h-[3px] bg-orange-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              </MagneticButton>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 lg:space-x-8 relative z-[110]">
          {/* Conditional Cart Button */}
          {pathname === '/store' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsCartOpen(true)}
              className="group pointer-events-auto"
            >
              <MagneticButton className="flex items-center gap-3 bg-white/5 border border-white/10 text-white px-4 lg:px-5 py-3 rounded-full hover:bg-white/10 active:bg-white/20 active:scale-95 transition-all">
                <div className="relative">
                  <ShoppingCart size={16} className="text-orange-500 group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center text-[8px] font-black">
                      {totalItems}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase hidden lg:block">Armory Cart</span>
              </MagneticButton>
            </motion.button>
          )}

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {session ? (
              <>
                <MagneticButton>
                  <span className="text-white text-[10px] tracking-[0.2em] font-black uppercase mr-2">
                    Welcome, {session.name.split(' ')[0]}
                  </span>
                </MagneticButton>
                <MagneticButton>
                  <button
                    onClick={handleLogout}
                    className="bg-orange-600 text-white px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_-5px_rgba(234,88,12,0.4)] block"
                  >
                    Logout
                  </button>
                </MagneticButton>
              </>
            ) : (
              <>
                <MagneticButton>
                  <Link
                    href="/signin"
                    className="bg-orange-600 text-white px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_-5px_rgba(234,88,12,0.4)] block"
                  >
                    Sign In
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/register"
                    className="bg-orange-600 text-white px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_-5px_rgba(234,88,12,0.4)] block"
                  >
                    Register
                  </Link>
                </MagneticButton>
              </>
            )}
          </div>

          {/* Hamburger Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-black pt-32 px-6 flex flex-col items-center md:hidden"
          >
            <div className="flex flex-col items-center space-y-10 w-full">
              {navLinks.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.href}
                    className={`text-4xl font-black tracking-tighter uppercase ${pathname === item.href ? 'text-orange-600' : 'text-white hover:text-orange-500 transition-colors'}`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center space-y-6 pt-10 border-t border-white/10 w-full"
              >
                {session ? (
                  <>
                    <span className="text-white text-sm tracking-[0.3em] font-black uppercase">
                      Warrior: {session.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="w-full max-w-xs bg-orange-600 text-white py-5 rounded-2xl text-center font-black tracking-[0.3em] uppercase shadow-[0_20px_40px_rgba(234,88,12,0.3)]"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="w-full max-w-xs bg-orange-600 text-white py-5 rounded-2xl text-center font-black tracking-[0.3em] uppercase shadow-[0_20px_40px_rgba(234,88,12,0.3)] mb-4"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="w-full max-w-xs bg-orange-600 text-white py-5 rounded-2xl text-center font-black tracking-[0.3em] uppercase shadow-[0_20px_40px_rgba(234,88,12,0.3)]"
                    >
                      Register Now
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
