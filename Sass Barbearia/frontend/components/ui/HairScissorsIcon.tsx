import React from 'react';

interface HairScissorsIconProps {
  className?: string;
  size?: number;
}

export const HairScissorsIcon: React.FC<HairScissorsIconProps> = ({ 
  className = 'w-5 h-5', 
  size 
}) => {
  const width = size || 24;
  const height = size || 24;
  
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tesoura de cortar cabelo profissional */}
      {/* Lâmina superior esquerda */}
      <path d="M5 4L9 8L11 6" />
      {/* Lâmina inferior direita */}
      <path d="M19 4L15 8L13 6" />
      {/* Cabo esquerdo com anel */}
      <path d="M5 4C5 8 6 12 9 14C10 14.5 11 14.5 11 14" />
      <circle cx="10" cy="14" r="2" fill="currentColor" strokeWidth="1" />
      {/* Cabo direito com anel */}
      <path d="M19 4C19 8 18 12 15 14C14 14.5 13 14.5 13 14" />
      <circle cx="14" cy="14" r="2" fill="currentColor" strokeWidth="1" />
      {/* Ponto de pivô central */}
      <circle cx="12" cy="7" r="1.5" fill="currentColor" strokeWidth="1" />
      {/* Detalhes das lâminas */}
      <path d="M7 6L9 8" strokeWidth="1" />
      <path d="M17 6L15 8" strokeWidth="1" />
      {/* Linhas de corte nas lâminas */}
      <path d="M6 5L8 7" strokeWidth="1" opacity="0.6" />
      <path d="M18 5L16 7" strokeWidth="1" opacity="0.6" />
    </svg>
  );
};
