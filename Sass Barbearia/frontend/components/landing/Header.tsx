'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.9, 0.98]);
  const headerY = useTransform(scrollY, [0, 100], [0, 0]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#beneficios', label: 'Benefícios' },
    { href: '#demo', label: 'Demonstração' },
    { href: '#precos', label: 'Preços' },
  ];

  return (
    <motion.header
      style={{ y: headerY }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-gradient-to-r from-deep-navy/98 via-dark-charcoal/98 to-deep-navy/98 backdrop-blur-2xl shadow-2xl border-b border-gold/20' 
          : 'bg-transparent'
      }`}
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-burgundy/5"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
          opacity: isScrolled ? 0.5 : 0,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-cream hover:text-gold transition-colors duration-300 font-semibold text-sm uppercase tracking-wider relative group"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="relative inline-block"
                  >
                    {item.label}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-yellow-400 group-hover:w-full transition-all duration-300"
                      initial={false}
                    />
                    {/* Glow Effect */}
                    <motion.span
                      className="absolute inset-0 bg-gold/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </motion.span>
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-6 w-px bg-gradient-to-b from-transparent via-cream/30 to-transparent"
            />
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/auth/login"
                className="text-cream hover:text-gold transition-colors font-semibold text-sm group relative"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block"
                >
                  Entrar
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"
                    initial={false}
                  />
                </motion.span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <Link href="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-gold via-yellow-500 to-gold text-black font-black py-3 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-gold/50 overflow-hidden group"
                >
                  <motion.span
                    className="relative z-10 flex items-center gap-2"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Começar Agora
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.button>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-cream hover:text-gold transition-colors relative z-20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-gold/20 bg-dark-charcoal/98 backdrop-blur-xl"
            >
              <div className="py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block text-cream hover:text-gold transition-colors py-3 px-4 font-semibold text-lg border-l-4 border-transparent hover:border-gold hover:bg-gold/10 rounded-r-xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4 border-t border-cream/10"
                >
                  <Link
                    href="/auth/login"
                    className="block text-cream hover:text-gold transition-colors py-3 px-4 font-semibold text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (navItems.length + 1) * 0.1 }}
                  className="pt-2"
                >
                  <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-black py-4 px-8 rounded-xl transition-all duration-300 shadow-xl"
                    >
                      Começar Agora
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
