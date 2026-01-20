import React from 'react';
import { History } from 'lucide-react';

export const TheSessions = () => (
  <div className="animate-in fade-in duration-1000 py-20 text-center border border-dashed border-white/5 rounded-[3rem]">
    <History className="mx-auto text-slate-700 mb-6" size={48} />
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">AUDIT_LOG_EMPTY // STANDBY</span>
  </div>
);