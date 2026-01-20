import React from 'react';
import { RprIcon } from './RprIcon';

interface RprKontrolLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

/**
 * RPR-KONTROL Logo Component
 * Combines RPR shield icon with KONTROL branding
 */
export const RprKontrolLogo: React.FC<RprKontrolLogoProps> = ({ 
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 48
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm md:text-lg',
    lg: 'text-lg md:text-2xl'
  };

  const subtitleSizes = {
    sm: 'text-[6px]',
    md: 'text-[8px] md:text-[9px]',
    lg: 'text-[10px] md:text-[12px]'
  };

  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
      <div className={`w-8 h-8 md:w-11 md:h-11 bg-[#00D9FF] rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-900/20`}>
        <RprIcon size={iconSizes[size]} fill="#0A0E1A" />
      </div>
      <div>
        <h1 className={`${textSizes[size]} font-bold tracking-tight text-white uppercase leading-none`}>
          RPR-KONTROL
        </h1>
        {showSubtitle && (
          <p className={`${subtitleSizes[size]} font-black text-slate-500 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1`}>
            Governance Tower
          </p>
        )}
      </div>
    </div>
  );
};

export default RprKontrolLogo;
