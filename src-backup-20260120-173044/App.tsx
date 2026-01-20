import React, { useState } from 'react';
import { RprKontrolLogo } from './brand/RprKontrolLogo';
import { TheFirm } from './components/TheFirm';
import { TheVault } from './components/TheVault';
import { TheSessions } from './components/TheSessions';
import { Icam } from './components/Icam';

/**
 * RPR-KONTROL MOTHERSHIP V4 [UI-ONLY PHASE]
 * Authority: SENTINEL PROTOCOL v4.5.0 / TS-Λ3
 * Status: SUBSTRATE CLEANSED // ALL PILLARS ACTIVE
 */
export default function App() {
  const [activeTab, setActiveTab] = useState<'THE FIRM' | 'LIVE VIEW' | 'THE VAULT' | 'THE SESSIONS' | 'ICAM'>('THE FIRM');

  const tabs: Array<'THE FIRM' | 'LIVE VIEW' | 'THE VAULT' | 'THE SESSIONS' | 'ICAM'> = [
    'THE FIRM',
    'LIVE VIEW',
    'THE VAULT',
    'THE SESSIONS',
    'ICAM'
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 font-sans selection:bg-[#8B5CFF]/30 overflow-x-hidden uppercase">
      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0A0E1A]/90 backdrop-blur-xl border-b border-white/5 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <RprKontrolLogo size="md" />
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#8B5CFF]/10 border border-[#8B5CFF]/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CFF] animate-pulse" />
            <span className="text-[9px] font-black text-[#8B5CFF] tracking-widest">SSK3C-LOCKED</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="pt-32 pb-40 px-8 max-w-7xl mx-auto">
        {activeTab === 'THE FIRM' && <TheFirm />}
        
        {activeTab === 'LIVE VIEW' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="text-center py-40 border border-dashed border-white/5 rounded-[3rem]">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">LIVE VIEW TELEMETRY</span>
              <p className="text-sm text-slate-500 mt-4 italic font-bold">NETWORK OVERWATCH // STANDBY MODE</p>
            </div>
          </div>
        )}

        {activeTab === 'THE VAULT' && <TheVault />}
        
        {activeTab === 'THE SESSIONS' && <TheSessions />}

        {activeTab === 'ICAM' && <Icam />}
      </main>

      {/* FIXED BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-[#0A0E1A]/90 backdrop-blur-xl border-t border-white/5 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#8B5CFF] text-white shadow-xl shadow-[#8B5CFF]/30 scale-105'
                  : 'bg-[#16191E] text-slate-500 border border-white/5 hover:border-[#8B5CFF]/20 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}