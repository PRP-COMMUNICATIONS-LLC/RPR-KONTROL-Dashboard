import React from 'react';
import { RprIcon } from './RprIcon';

type Size = 'sm' | 'md' | 'lg';

interface RprKontrolLogoProps {
  size?: Size;
  className?: string;
}

// SPACING LOGIC: Synchronized with confirmed file dimensions
const DIMENSIONS: Record<Size, { icon: number; text: string; gap: string; sub: string }> = {
  sm: { icon: 28, text: 'text-xl', gap: 'gap-[4px]', sub: 'text-[8px]' },
  md: { icon: 40, text: 'text-4xl', gap: 'gap-[5px]', sub: 'text-[10px]' },
  lg: { icon: 56, text: 'text-6xl', gap: 'gap-[6px]', sub: 'text-[12px]' },
};

export const RprKontrolLogo: React.FC<RprKontrolLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const d = DIMENSIONS[size];

  return (
    <div className={`flex flex-col ${className} select-none`}>
      {/* ROW 1: ICON + WORDMARK LOCKUP (AUTHORITATIVE) */}
      <div className={`flex items-center ${d.gap}`}>
        {/* ICON: 1px nudge for baseline parity */}
        <div className="flex items-center justify-center translate-y-[1px]">
          <div className="relative">
            {/* Soft Ambient Purple Glow */}
            <div className="absolute inset-0 blur-[16px] opacity-50">
              <RprIcon size={d.icon} color="#8B5CFF" />
            </div>

            {/* Depth Shadow Layer */}
            <div className="absolute inset-0 translate-x-[1.5px] translate-y-[1.5px] opacity-25 blur-[1px]">
              <RprIcon size={d.icon} color="#3B0764" />
            </div>

            {/* Main Icon with Glow */}
            <div className="relative drop-shadow-[0_0_8px_rgba(139,92,255,0.6)]">
              <RprIcon size={d.icon} color="#8B5CFF" />
            </div>
          </div>
        </div>

        {/* WORDMARK: Original Font (Black/Standard Style) */}
        <h1 className={`${d.text} font-black tracking-tighter leading-none flex items-center uppercase`}>
          <span className="text-white">RPR</span>
          <span className="text-[#8B5CFF] ml-[8px]">KONTROL</span>
        </h1>
      </div>

      {/* ROW 2: SUBTITLE RAIL (THE MOTHERSHIP) */}
      <div className="flex items-center">
        {/* Spacer to align subtitle with the 'R' in the Wordmark rail */}
        <div style={{ width: d.icon + 10 }} className="flex-shrink-0" />
        <p className={`${d.sub} font-bold text-slate-500 uppercase tracking-[0.4em] mt-2 leading-none`}>
          THE MOTHERSHIP
        </p>
      </div>
    </div>
  );
};
