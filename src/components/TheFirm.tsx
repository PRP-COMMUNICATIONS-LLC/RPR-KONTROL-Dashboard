import React from 'react';
import { Building2, ShieldCheck, Briefcase } from 'lucide-react';

export const TheFirm = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-12">
      {/* SECTION HEADER */}
      <div className="flex items-end justify-between border-b border-white/5 pb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#8B5CFF]">
            <div className="w-10 h-[2px] bg-[#8B5CFF]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">LEGAL SUBSTRATE</span>
          </div>
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic">
            THE <span className="text-[#8B5CFF]">FIRM</span>
          </h2>
        </div>
        <div className="text-right hidden md:block">
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] block mb-2">ENTITY STATUS</span>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
            <ShieldCheck size={12} className="text-green-500" />
            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">AUTHORIZED</span>
          </div>
        </div>
      </div>

      {/* CORPORATE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ENTITY CARD */}
        <div className="lg:col-span-2 bg-[#0C0D18]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Building2 size={120} />
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-[#8B5CFF] uppercase tracking-[0.4em]">REGISTERED ENTITY</span>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">RPR COMMUNICATIONS, LLC</h3>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-1">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">JURISDICTION</span>
                <p className="text-sm font-bold text-slate-300">USA // DELAWARE</p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">GOVERNANCE ID</span>
                <p className="text-sm font-mono font-bold text-[#8B5CFF]">SSK3C-796960601918</p>
              </div>
            </div>
          </div>
        </div>

        {/* CONSULTING PILLAR */}
        <div className="bg-[#8B5CFF]/5 border border-[#8B5CFF]/20 rounded-[2.5rem] p-10 space-y-8">
          <div className="p-3 bg-[#8B5CFF]/10 rounded-2xl w-fit border border-[#8B5CFF]/20">
            <Briefcase size={24} className="text-[#8B5CFF]" />
          </div>
          <div className="space-y-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">CORE OPERATIONS</span>
            <ul className="space-y-3">
              {['BUSINESS CONSULTING', 'BRAND COMMUNICATION', 'SOVEREIGN UI ARCHITECTURE'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[11px] font-black text-white italic tracking-tight">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CFF]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};