import React from 'react';
import { RefreshCw } from 'lucide-react';
import { RprKontrolLogo } from './RprKontrolLogo';

interface TelemetryHeaderProps {
    user: any;
    onRefresh?: () => void;
}

/**
 * TelemetryHeader Component [v1.9.7]
 * Integrated overwatch position featuring locked brand substrate and sovereign status pips.
 */
export const TelemetryHeader: React.FC<TelemetryHeaderProps> = ({ user, onRefresh }) => {
    return (
        <header className="fixed top-0 left-0 right-0 p-4 md:p-8 flex items-center justify-between border-b border-card-border bg-header-bg backdrop-blur-xl z-[100]">
            <RprKontrolLogo size="md" />

            <div className="flex items-center gap-3 md:gap-6">
                <div className="hidden sm:flex flex-col items-end">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CFF] animate-pulse" />
                        <span className="text-[9px] font-black uppercase text-badge-text">SSK3C IDENTITY LOCK // SOVEREIGN</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                        {user?.uid?.substring(0, 8).toUpperCase() || "AUTH..."}
                    </span>
                </div>
                <button
                    onClick={onRefresh}
                    className="btn-primary-purple"
                >
                    <RefreshCw size={14} /> <span className="hidden md:inline">FORCE SYNC</span>
                </button>
            </div>
        </header>
    );
};

export default TelemetryHeader;
