'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  HelpCircle,
  Settings,
  Sparkles,
  X,
  CheckSquare,
} from 'lucide-react';
import { HairScissorsIcon } from '@/components/ui/HairScissorsIcon';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'Agendamentos', href: '/dashboard/appointments', icon: <Calendar className="w-5 h-5" /> },
  { name: 'Clientes', href: '/dashboard/clients', icon: <Users className="w-5 h-5" /> },
  { name: 'Serviços', href: '/dashboard/services', icon: <HairScissorsIcon className="w-5 h-5" /> },
  { name: 'Estoque', href: '/dashboard/inventory', icon: <Package className="w-5 h-5" /> },
  { name: 'Vendas', href: '/dashboard/sales', icon: <ShoppingCart className="w-5 h-5" /> },
  { name: 'Financeiro', href: '/dashboard/financial', icon: <DollarSign className="w-5 h-5" /> },
  { name: 'Tarefas', href: '/dashboard/tasks', icon: <CheckSquare className="w-5 h-5" /> },
  { name: 'Suporte', href: '/dashboard/support', icon: <HelpCircle className="w-5 h-5" /> },
  { name: 'Configurações', href: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -288,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-72 fixed left-0 top-0 h-screen bg-gradient-to-b from-deep-navy via-dark-charcoal to-deep-navy border-r border-gold/20 backdrop-blur-xl shadow-2xl overflow-y-auto flex flex-col z-50 lg:translate-x-0"
      >
        {/* Animated Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="p-4 sm:p-6 flex-1 relative z-10">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-gold/30">
                <Sparkles className="w-5 h-5 text-deep-navy" />
              </div>
              <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-500 to-gold">
                Sas Barber
              </h1>
            </Link>
            {onClose && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 bg-dark-charcoal/60 border border-gold/20 rounded-lg text-metallic-silver hover:text-gold hover:border-gold/50 transition-all"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          {/* Desktop Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 hidden lg:block"
          >
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-gold/30 group-hover:shadow-gold/50 transition-shadow"
              >
                <Sparkles className="w-7 h-7 text-deep-navy" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-500 to-gold">
                  Sas Barber
                </h1>
                <p className="text-xs text-metallic-silver font-medium">Gestão Profissional</p>
              </div>
            </Link>
          </motion.div>

        {/* Navigation */}
        <nav className="space-y-1.5 sm:space-y-2">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={clsx(
                    'flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl transition-all group relative overflow-hidden touch-manipulation',
                    isActive
                      ? 'bg-gradient-to-r from-gold/20 to-yellow-500/10 text-gold border border-gold/40 shadow-lg shadow-gold/20'
                      : 'text-metallic-silver hover:text-cream hover:bg-dark-charcoal/50 border border-transparent hover:border-gold/20 active:bg-dark-charcoal/70'
                  )}
                >
                  {/* Active Background Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-gold/20 to-yellow-500/10 rounded-xl border border-gold/40"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  <span className={clsx(
                    'relative z-10 transition-transform group-hover:scale-110',
                    isActive ? 'text-gold' : 'text-metallic-silver group-hover:text-gold'
                  )}>
                    {item.icon}
                  </span>
                  <span className={clsx(
                    'relative z-10 font-semibold text-sm sm:text-base',
                    isActive ? 'text-gold font-bold' : 'text-metallic-silver group-hover:text-cream'
                  )}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="relative z-10 ml-auto w-2 h-2 bg-gold rounded-full shadow-lg shadow-gold/50"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 sm:p-6 border-t border-gold/20 mt-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-gold/10 to-yellow-500/5 rounded-xl p-3 sm:p-4 border border-gold/20 backdrop-blur-sm"
        >
          <p className="text-xs text-metallic-silver text-center font-medium">
            © 2024 Sas Barber
          </p>
          <p className="text-xs text-gold/70 text-center mt-1 font-medium hidden sm:block">
            Sistema de Gestão Profissional
          </p>
          <p className="text-xs text-metallic-silver/60 text-center mt-2 font-medium hidden sm:block">
            Todos os direitos reservados Valens Tech
          </p>
        </motion.div>
      </div>
    </motion.aside>
    </>
  );
};
