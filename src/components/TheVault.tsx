import React from 'react';
import { Database, FileText, Search, Lock, HardDrive, FileCheck, FolderOpen } from 'lucide-react';

export const TheVault = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-12">
      {/* SECTION HEADER */}
      <div className="flex items-end justify-between border-b border-white/5 pb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#8B5CFF]">
            <div className="w-10 h-[2px] bg-[#8B5CFF]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">ASSET INFRASTRUCTURE</span>
          </div>
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic">
            THE <span className="text-[#8B5CFF]">VAULT</span>
          </h2>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text" 
            placeholder="SEARCH REGISTRY..." 
            className="bg-[#16191E] border border-white/5 rounded-xl py-3 pl-12 pr-6 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-[#8B5CFF]/40 transition-all w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR: STORAGE STATS */}
        <div className="space-y-6">
          <div className="bg-[#0C0D18]/80 border border-white/5 rounded-[2rem] p-8 space-y-6">
            <div className="flex items-center gap-3 text-[#8B5CFF]">
              <HardDrive size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">SUBSTRATE LOAD</span>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#8B5CFF] w-[42%] shadow-[0_0_10px_#8B5CFF]" />
              </div>
              <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase">
                <span>4.2 GB USED</span>
                <span>10 GB LIMIT</span>
              </div>
            </div>
          </div>

          <div className="bg-[#16191E] border border-white/5 rounded-[2rem] p-6">
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-4">DRIVE ANCHORS</span>
            <div className="space-y-2">
              {['NEUTRAL_RULES', 'CLINICAL_SOURCE', 'SSK3C_ARTIFACTS'].map((folder) => (
                <div key={folder} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-[#8B5CFF]/30 transition-all cursor-pointer">
                  <FolderOpen size={14} className="text-[#8B5CFF]" />
                  <span className="text-[10px] font-bold text-slate-300">{folder}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FILE EXPLORER MAIN */}
        <div className="lg:col-span-3 bg-[#0C0D18]/80 border border-white/5 rounded-[2.5rem] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">DOCUMENT NAME</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">TYPE</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">GOVERNANCE</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'NEUTRAL_RULE_PROTOCOL_V4', type: 'PDF', gov: 'VERIFIED' },
                { name: 'CLINICAL_SOURCE_INDEX', type: 'XLSX', gov: 'LOCKED' },
                { name: 'IDENTITY_ANCHOR_SSK3C', type: 'JSON', gov: 'ENFORCED' }
              ].map((file) => (
                <tr key={file.name} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <FileText size={18} className="text-slate-500 group-hover:text-[#8B5CFF]" />
                      <span className="text-[11px] font-black text-white italic tracking-tighter">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-mono text-slate-500 font-bold">{file.type}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-[#8B5CFF]/10 text-[#8B5CFF] text-[9px] font-black rounded-full border border-[#8B5CFF]/20 uppercase tracking-widest">
                      {file.gov}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <button className="text-slate-500 hover:text-white transition-colors">
                      <Lock size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};