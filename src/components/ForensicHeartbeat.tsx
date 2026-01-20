import React, { useState, useEffect } from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, getDocs, limit, query } from "firebase/firestore";
import { Activity, ShieldAlert, CheckCircle2, Terminal } from "lucide-react";

/**
 * ForensicHeartbeat Component [v1.0.0]
 * Diagnostic substrate to verify Firebase/GCP connectivity and Identity Lock integrity.
 */
export const ForensicHeartbeat: React.FC = () => {
    const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'PASS' | 'FAIL'>('IDLE');
    const [logs, setLogs] = useState<{ msg: string; type: 'info' | 'error' | 'success' }[]>([]);
    const [errorDetails, setErrorDetails] = useState<string | null>(null);

    const log = (msg: string, type: 'info' | 'error' | 'success' = 'info') => {
        setLogs(prev => [...prev.slice(-4), { msg, type }]);
    };

    const verifySubstrate = async () => {
        setStatus('PENDING');
        setLogs([]);
        setErrorDetails(null);

        log("INITIALIZING FORENSIC HEARTBEAT...", "info");

        try {
            const auth = getAuth();
            log("ATTEMPTING ANONYMOUS AUTH BRIDGE...", "info");
            await signInAnonymously(auth);
            log("AUTH BRIDGE: ESTABLISHED", "success");

            const db = getFirestore();
            log("QUERYING FIREBASE COLLECTIONS...", "info");
            const q = query(collection(db, "artifacts"), limit(1));
            await getDocs(q);
            log("FIRESTORE SUBSTRATE: ACCESSIBLE", "success");

            setStatus('PASS');
            log("SYSTEM HEARTBEAT: 100% COMPLIANT", "success");
        } catch (err: any) {
            console.error("HEARTBEAT_FAILURE:", err);
            setStatus('FAIL');
            setErrorDetails(err.message || String(err));

            if (err.code === 'auth/operation-not-allowed') {
                log("FAIL: ANONYMOUS AUTH NOT ENABLED", "error");
            } else if (err.message?.includes('403')) {
                log("FAIL: 403 FORBIDDEN - PERMISSION LOCK", "error");
            } else {
                log(`FAIL: ${err.code || 'UNKNOWN_ERROR'}`, "error");
            }
        }
    };

    useEffect(() => {
        verifySubstrate();
    }, []);

    return (
        <div className="bg-[#16191E]/80 border border-white/5 p-6 rounded-3xl shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Activity size={18} className={status === 'PENDING' ? 'text-primary-purple animate-pulse' : 'text-primary-purple'} />
                    <h3 className="text-white text-[11px] font-black uppercase tracking-[0.3em]">Forensic Heartbeat</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${status === 'PASS' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        status === 'FAIL' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            'bg-primary-purple/10 text-primary-purple border border-primary-purple/20'
                    }`}>
                    {status}
                </div>
            </div>

            <div className="space-y-3 mb-6">
                {logs.map((l, i) => (
                    <div key={i} className="flex items-center gap-3 font-mono text-[10px]">
                        {l.type === 'info' && <Terminal size={12} className="text-slate-500" />}
                        {l.type === 'success' && <CheckCircle2 size={12} className="text-green-400" />}
                        {l.type === 'error' && <ShieldAlert size={12} className="text-red-400" />}
                        <span className={
                            l.type === 'info' ? 'text-slate-400' :
                                l.type === 'success' ? 'text-green-400/80' :
                                    'text-red-400/80'
                        }>
                            {l.msg}
                        </span>
                    </div>
                ))}
            </div>

            {errorDetails && (
                <div className="bg-black/40 p-4 rounded-xl border border-red-500/10 mb-6">
                    <p className="text-[10px] font-mono text-red-400/60 leading-relaxed overflow-hidden text-ellipsis italic">
                        DIAGNOSTIC_PAYLOAD: {errorDetails}
                    </p>
                </div>
            )}

            <button
                onClick={verifySubstrate}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all active:scale-95"
            >
                RE-INSTANTIATE PROBE
            </button>
        </div>
    );
};
