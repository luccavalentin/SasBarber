'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      <label className="block text-xs sm:text-sm font-bold text-metallic-silver mb-1.5 sm:mb-2">
        {label}
      </label>

      {/* Select Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-dark-charcoal/60 border border-gold/20 rounded-lg sm:rounded-xl text-cream text-xs sm:text-sm font-medium hover:border-gold/40 transition-all backdrop-blur-xl touch-target"
      >
        <span className="truncate">{selectedOption.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-metallic-silver flex-shrink-0" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 z-50 bg-dark-charcoal/95 border border-gold/30 rounded-lg sm:rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden"
            >
              <div className="py-1 max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {options.map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all touch-target ${
                      value === option.value
                        ? 'bg-gold/20 text-gold'
                        : 'text-cream hover:text-gold'
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

