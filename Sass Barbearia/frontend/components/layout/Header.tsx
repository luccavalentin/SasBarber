'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    role: string;
  };
  onLogout?: () => void;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onMenuClick }) => {
  const pathname = usePathname();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notificationCount] = useState(2);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isPublic = pathname === '/' || pathname?.startsWith('/auth');

  if (isPublic) {
    return (
      <header className="bg-gradient-to-r from-deep-navy/98 to-dark-charcoal/98 border-b border-gold/20 shadow-xl backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo variant="compact" />
            <nav className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-metallic-silver hover:text-gold transition-colors font-medium">
                Entrar
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-gradient-to-r from-gold to-yellow-500 text-deep-navy rounded-lg hover:shadow-lg transition-all font-semibold shadow-lg shadow-gold/30"
              >
                Começar Agora
              </Link>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-r from-deep-navy/95 via-dark-charcoal/95 to-deep-navy/95 border-b border-gold/20 shadow-xl backdrop-blur-xl sticky top-0 z-50">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gold/5 via-transparent to-burgundy/5"
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
          }}
        />
      </div>

      <div className="px-3 sm:px-6 py-3 sm:py-4 relative z-10">
        <div className="flex justify-between items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick}
            className="lg:hidden p-2.5 bg-dark-charcoal/60 border border-gold/20 rounded-xl text-metallic-silver hover:text-gold hover:border-gold/50 transition-all backdrop-blur-xl shadow-lg touch-manipulation"
          >
            <Menu className="w-5 h-5" />
          </motion.button>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative hidden sm:block">
            <motion.div
              animate={{
                scale: isSearchFocused ? 1.02 : 1,
                borderColor: isSearchFocused ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.2)',
              }}
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-metallic-silver pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-dark-charcoal/60 border border-gold/20 rounded-xl pl-12 pr-4 py-2.5 text-cream placeholder-metallic-silver focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all backdrop-blur-xl shadow-lg hover:border-gold/30"
              />
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 w-full bg-dark-charcoal/95 border border-gold/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl"
                >
                  <p className="text-sm text-metallic-silver">Digite para buscar...</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Mobile Search Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchFocused(true)}
            className="sm:hidden p-2.5 bg-dark-charcoal/60 border border-gold/20 rounded-xl text-metallic-silver hover:text-gold hover:border-gold/50 transition-all backdrop-blur-xl shadow-lg touch-manipulation"
          >
            <Search className="w-5 h-5" />
          </motion.button>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 sm:p-2.5 bg-dark-charcoal/60 border border-gold/20 rounded-xl text-metallic-silver hover:text-gold hover:border-gold/50 transition-all backdrop-blur-xl shadow-lg group touch-manipulation"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-xs font-bold text-cream shadow-lg"
                >
                  {notificationCount}
                </motion.span>
              )}
              {/* Notification Pulse */}
              <motion.span
                className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full opacity-75"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.75, 0, 0.75],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.button>

            {/* User Menu */}
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gold/20">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-cream">{user?.name}</p>
                <p className="text-xs text-metallic-silver font-medium">{user?.role}</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center text-deep-navy font-black shadow-lg shadow-gold/30 cursor-pointer hover:shadow-gold/50 transition-shadow touch-manipulation text-sm sm:text-base"
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </motion.div>
              {onLogout && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLogout}
                  className="p-2 sm:p-2.5 bg-burgundy/20 border border-burgundy/30 rounded-xl text-metallic-silver hover:text-red-400 hover:border-red-400/50 transition-all backdrop-blur-xl shadow-lg touch-manipulation"
                  title="Sair"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchFocused && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden absolute top-full left-0 right-0 bg-dark-charcoal/98 border-b border-gold/20 p-4 z-50"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-metallic-silver" />
              <input
                type="text"
                placeholder="Buscar..."
                autoFocus
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-dark-charcoal/60 border border-gold/20 rounded-xl pl-12 pr-4 py-3 text-cream placeholder-metallic-silver focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all backdrop-blur-xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
