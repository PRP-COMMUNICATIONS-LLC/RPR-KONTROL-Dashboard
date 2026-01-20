import React from 'react';
import { Info, ShieldCheck, Scale, Zap } from 'lucide-react';

/**
 * ForensicExplanationCard Component [v1.0.0]
 * Provides plain-English context for the Governance Bridge and the 'Neutral Rule' architecture.
 */
export const ForensicExplanationCard: React.FC = () => {
    return (
        <div className="bg-[#16191E]/60 border border-white/5 p-6 rounded-3xl shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
            <div className="flex items-center gap-3 mb-6">
                <Info size={18} className="text-[#00D9FF]" />
                <h3 className="text-white text-[11px] font-black uppercase tracking-[0.3em]">Governance Context</h3>
            </div>

            <div className="space-y-6">
                {/* Neutral Rule Explanation */}
                <div className="flex gap-4">
                    <div className="mt-1">
                        <Scale size={16} className="text-mothership-purple" />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black text-slate-200 uppercase tracking-widest mb-1">The Neutral Rule</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed italic">
                            All forensic data is processed under the "Neutral Rule" mandate. This ensures that extraction telemetry is audited without bias, using cryptographic hashes to verify identity integrity before any reasoning is applied.
                        </p>
                    </div>
                </div>

                {/* Identity Lock Explanation */}
                <div className="flex gap-4">
                    <div className="mt-1">
                        <ShieldCheck size={16} className="text-[#00D9FF]" />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black text-slate-200 uppercase tracking-widest mb-1">SSK3C Identity Lock</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                            The bridge is secured via the SSK3C protocol. Every session creates a sovereign fingerprint, locking the dashboard to your regional harbor (asia-southeast1) for forensic transparency.
                        </p>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="pt-4 border-t border-white/5 mt-4">
                    <div className="bg-black/40 p-3 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Zap size={12} className="text-mothership-purple" />
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Mission Status</span>
                        </div>
                        <span className="text-[9px] font-black text-mothership-purple uppercase tracking-[0.2em]">Ready for Auth Bridge</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
