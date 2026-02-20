import React from 'react';
import { Radio, Users, Mic, Activity } from 'lucide-react';

const LiveSpacesBanner = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden group transition-all hover:border-slate-700">
      {/* Background Pulse Effect */}
      <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]"></div>
      
      {/* Left: Space Info */}
      <div className="flex items-center gap-4 pl-2 w-full md:w-auto">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-slate-950 border border-red-500/50 flex items-center justify-center z-10 relative">
            <Radio className="w-5 h-5 text-red-500 animate-pulse" />
          </div>
          <div className="absolute inset-0 rounded-full border border-red-500 animate-ping opacity-20"></div>
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-red-500 font-bold tracking-widest uppercase bg-red-500/10 px-2 py-0.5 rounded">
              LIVE BROADCAST
            </span>
            <span className="text-xs text-slate-500 font-mono">ID: SEC-7-ALPHA</span>
          </div>
          <h3 className="text-sm font-bold text-slate-200 mt-1">Global Market Analysis & Whale Tracking</h3>
        </div>
      </div>

      {/* Right: Stats & Join Button */}
      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-slate-500" />
            1,402 Listening
          </div>
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <Mic className="w-4 h-4 text-cyan-400" />
            3 Speakers
          </div>
        </div>
        
        <button className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] whitespace-nowrap">
          <Activity className="w-4 h-4" />
          TUNE IN
        </button>
      </div>
    </div>
  );
};

export default LiveSpacesBanner;
