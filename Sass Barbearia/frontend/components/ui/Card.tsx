import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  actions?: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  title, 
  actions,
  hover = false,
  glow = false,
}) => {
  const baseClasses = clsx(
    'rounded-2xl shadow-xl backdrop-blur-xl',
    'bg-dark-charcoal/90 border border-gold/20',
    'transition-all duration-300',
    hover && 'hover:border-gold/40 hover:shadow-gold/20 hover:-translate-y-1',
    glow && 'shadow-gold/10',
    className
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={baseClasses}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold/20">
          {title && (
            <h3 className="text-xl font-black text-cream">{title}</h3>
          )}
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
