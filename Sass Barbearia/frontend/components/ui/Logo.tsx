'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HairScissorsIcon } from './HairScissorsIcon';

interface LogoProps {
  variant?: 'default' | 'compact' | 'icon-only';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  className = '',
  showText = true 
}) => {
  const logoContent = (
    <motion.div
      className={`flex items-center gap-3 group ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Icon Container */}
      <motion.div
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gold/30 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        
        {/* Icon Background */}
        <motion.div
          className="relative bg-gradient-to-br from-gold via-yellow-400 to-gold w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg border-2 border-gold/50 group-hover:shadow-gold/50 transition-shadow"
          whileHover={{ scale: 1.1 }}
        >
          <HairScissorsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
        </motion.div>
      </motion.div>

      {/* Text */}
      {showText && variant !== 'icon-only' && (
        <div className="flex flex-col">
          <motion.span
            className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            Sas Barber
          </motion.span>
          {variant === 'default' && (
            <span className="text-[10px] sm:text-xs text-metallic-silver font-medium tracking-wider uppercase">
              Sistema de Gestão
            </span>
          )}
        </div>
      )}
    </motion.div>
  );

  if (variant === 'icon-only') {
    return <Link href="/">{logoContent}</Link>;
  }

  return <Link href="/">{logoContent}</Link>;
};

