'use client';

import { Tent, MapPin, RefreshCw, Luggage } from 'lucide-react';

interface HeaderProps {
  packedCount: number;
  totalCount: number;
  progressPercent: number;
  isLoading: boolean;
  onRefresh: () => void;
}

export function Header({
  packedCount,
  totalCount,
  progressPercent,
  isLoading,
  onRefresh,
}: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 shadow-xl border border-emerald-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <Tent className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Yosemite Expedition 🏕️</h1>
            <p className="text-emerald-100 text-xs sm:text-sm flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5" /> Shared Live Packing List
            </p>
          </div>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition text-xs flex items-center gap-1"
          title="Refresh items"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-1.5 bg-black/20 p-3.5 rounded-xl backdrop-blur-md">
        <div className="flex justify-between text-xs text-emerald-100 font-semibold">
          <span className="flex items-center gap-1">
            <Luggage className="w-3.5 h-3.5" /> Progress
          </span>
          <span>
            {packedCount} of {totalCount} items ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-950/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}