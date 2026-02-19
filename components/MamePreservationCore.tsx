
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { 
  Gamepad, Cpu, Database, Save, Activity, 
  Box, Search, ExternalLink, Star, Zap, 
  Terminal, Monitor, HardDrive, ShieldCheck,
  ChevronRight, RefreshCcw, Loader2, Info
} from 'lucide-react';

interface MachineDriver {
  id: string;
  name: string;
  year: string;
  manufacturer: string;
  cpu: string;
  sound: string;
  resolution: string;
  status: 'PROTECTED' | 'VERIFIED' | 'PRESERVING';
}

const DRIVERS: MachineDriver[] = [
  { id: 'pacman', name: "PAC-MAN", year: "1980", manufacturer: "Namco", cpu: "Z80 @ 3.072 MHz", sound: "Namco 3-ch", resolution: "224x288", status: 'VERIFIED' },
  { id: 'neogeo', name: "NEO GEO MVS", year: "1990", manufacturer: "SNK", cpu: "68000 @ 12 MHz", sound: "YM2610", resolution: "320x224", status: 'PROTECTED' },
  { id: 'cps2', name: "CAPCOM SYSTEM II", year: "1993", manufacturer: "Capcom", cpu: "68000 @ 16 MHz", sound: "Q-Sound", resolution: "384x224", status: 'PROTECTED' },
  { id: 'astroids', name: "ASTEROIDS", year: "1979", manufacturer: "Atari", cpu: "6502 @ 1.5 MHz", sound: "Discrete", resolution: "Vector", status: 'VERIFIED' },
  { id: 'segas16', name: "SEGA SYSTEM 16", year: "1985", manufacturer: "Sega", cpu: "68000 @ 10 MHz", sound: "YM2151", resolution: "320x224", status: 'PRESERVING' }
];

const MamePreservationCore: React.FC = () => {
  const [selectedDriver, setSelectedDriver] = useState<MachineDriver>(DRIVERS[0]);
  const [isBooting, setIsBooting] = useState(false);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [neuralInsights, setNeuralInsights] = useState<string | null>(null);

  const initiateBoot = () => {
    setIsBooting(true);
    setBootLog([]);
    setNeuralInsights(null);
    
    const logs = [
      `Initializing Hardware Driver: ${selectedDriver.name}`,
      `Mapping CPU Space: ${selectedDriver.cpu}`,
      `Allocating Video Buffer: ${selectedDriver.resolution}`,
      `Synchronizing Sound Substrate: ${selectedDriver.sound}`,
      "Checking ROM Decryption Keys...",
      "Integrity Verified: SH-04 Signal Detected",
      "BOOT_SEQUENCE_COMPLETE: Node Active"
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setBootLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] > ${logs[i]}`]);
        i++;
      } else {
        clearInterval(interval);
        setIsBooting(false);
      }
    }, 600);
  };

  const getNeuralAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explain the technical significance and hardware architecture of the ${selectedDriver.name} (${selectedDriver.year}) arcade system by ${selectedDriver.manufacturer}. Focus on the CPU ${selectedDriver.cpu} and any unique preservation challenges. Keep it technical and cyberpunk.`,
      });
      setNeuralInsights(response.text || "Failed to extract insights.");
    } catch (err) {
      setNeuralInsights("NEURAL_CORE_OFFLINE: Could not sync with preservation database.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-amber-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-amber-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Gamepad size={36} className="text-amber-500" />
            MAME PRESERVATION CORE
          </h2>
          <p className="text-amber-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Global Hardware Documentation & Abstraction Substrate
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-amber-500/20 rounded">
            <Star size={12} className="text-amber-500" />
            <span className="text-[10px] font-black text-amber-400 uppercase">PRESERVING 10K+ MACHINES</span>
          </div>
          <a href="https://github.com/mamedev/mame" target="_blank" rel="noopener noreferrer" className="text-amber-900 hover:text-amber-400 transition-colors">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Left: Driver Registry */}
        <div className="lg:col-span-4 space-y-4 flex flex-col overflow-hidden">
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-xs font-black text-amber-600 tracking-widest uppercase flex items-center gap-2">
                 <Database size={14} /> Driver Registry
               </h3>
               <div className="text-[8px] text-amber-900 font-bold uppercase">v0.264-MESH</div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
              {DRIVERS.map((driver) => (
                <button 
                  key={driver.id}
                  onClick={() => {
                    setSelectedDriver(driver);
                    setNeuralInsights(null);
                    setBootLog([]);
                  }}
                  className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all group ${
                    selectedDriver.id === driver.id 
                    ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                    : 'bg-slate-950/50 border-amber-500/5 hover:border-amber-500/30'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-[10px] font-black text-slate-100 group-hover:text-amber-400 transition-colors uppercase tracking-tight">{driver.name}</div>
                    <div className="text-[8px] text-amber-900 font-bold uppercase mt-1">{driver.manufacturer} / {driver.year}</div>
                  </div>
                  <ChevronRight size={14} className={selectedDriver.id === driver.id ? 'text-amber-400' : 'text-amber-900'} />
                </button>
              ))}
            </div>

            <div className="mt-4 relative group">
               <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search size={14} className="text-amber-900" />
               </div>
               <input 
                type="text" 
                placeholder="QUERY MACHINES..." 
                className="w-full bg-slate-900 border border-amber-500/10 rounded-lg py-2 pl-9 pr-4 text-[10px] text-amber-500 focus:outline-none focus:border-amber-500 font-bold tracking-wider"
               />
            </div>
          </div>
        </div>

        {/* Right: Technical Substrate */}
        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-hidden">
            
            {/* Machine Details */}
            <div className="glass-panel p-8 rounded-3xl border border-amber-500/20 bg-slate-950/40 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                 <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <HardDrive size={24} />
                 </div>
                 <span className={`px-2 py-0.5 rounded border ${
                    selectedDriver.status === 'VERIFIED' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 
                    'bg-blue-500/10 border-blue-500/20 text-blue-500'
                  } text-[8px] font-black tracking-widest`}>
                   {selectedDriver.status}
                 </span>
              </div>

              <div className="space-y-6 flex-1">
                 <div>
                    <h3 className="text-2xl font-black text-slate-100 uppercase tracking-tighter">{selectedDriver.name}</h3>
                    <div className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em] mt-1">Abstraction Layer: ACTIVE</div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/5">
                       <div className="text-[7px] text-amber-900 font-black uppercase mb-1">CPU Architecture</div>
                       <div className="text-[10px] font-bold text-slate-300">{selectedDriver.cpu}</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/5">
                       <div className="text-[7px] text-amber-900 font-black uppercase mb-1">Audio Synthesis</div>
                       <div className="text-[10px] font-bold text-slate-300">{selectedDriver.sound}</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/5">
                       <div className="text-[7px] text-amber-900 font-black uppercase mb-1">Video Plane</div>
                       <div className="text-[10px] font-bold text-slate-300">{selectedDriver.resolution}</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/5">
                       <div className="text-[7px] text-amber-900 font-black uppercase mb-1">Preservation ID</div>
                       <div className="text-[10px] font-bold text-slate-300">{selectedDriver.id.toUpperCase()}_0x1</div>
                    </div>
                 </div>

                 <div className="flex gap-3">
                    <button 
                      onClick={initiateBoot}
                      disabled={isBooting}
                      className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 py-3 rounded-xl font-black text-[10px] tracking-[0.3em] transition-all uppercase shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                    >
                      {isBooting ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} className="fill-slate-950" />}
                      <span>Load ROM Buffer</span>
                    </button>
                    <button 
                      onClick={getNeuralAnalysis}
                      disabled={isAnalyzing}
                      className="px-4 border border-amber-500/20 rounded-xl text-amber-500 hover:bg-amber-500/10 transition-all"
                    >
                      {isAnalyzing ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                    </button>
                 </div>
              </div>
            </div>

            {/* Boot Log / Insights */}
            <div className="flex flex-col gap-6 overflow-hidden">
               <div className="glass-panel flex-1 rounded-3xl border border-amber-500/10 bg-slate-950/60 overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-amber-500/10 bg-slate-900/50 flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-amber-500" />
                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Driver_Console.log</span>
                     </div>
                     <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  </div>
                  <div className="flex-1 p-6 font-mono text-[9px] text-amber-900 overflow-y-auto custom-scrollbar space-y-2">
                    <AnimatePresence mode="popLayout">
                      {neuralInsights ? (
                        <motion.div 
                          key="insights"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-amber-400 leading-relaxed whitespace-pre-wrap"
                        >
                          <div className="text-[10px] font-black text-amber-500 border-b border-amber-500/10 pb-2 mb-2 flex items-center gap-2">
                             <Info size={12} /> NEURAL_ARCHIVE_DATA
                          </div>
                          {neuralInsights}
                        </motion.div>
                      ) : bootLog.length > 0 ? (
                        bootLog.map((log, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>
                            {log}
                          </motion.div>
                        ))
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-4">
                           <Monitor size={48} />
                           <p className="text-[10px] uppercase tracking-[0.3em]">Awaiting Boot Protocol</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-amber-500/10 flex items-center gap-3">
               <Cpu size={16} className="text-amber-900" />
               <div>
                  <div className="text-[8px] text-amber-900 font-black uppercase">JIT Substrate</div>
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-tighter">OPTIMIZED</div>
               </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-amber-500/10 flex items-center gap-3">
               <ShieldCheck size={16} className="text-amber-900" />
               <div>
                  <div className="text-[8px] text-amber-900 font-black uppercase">Verification</div>
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-tighter">BIT-PERFECT</div>
               </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-amber-500/10 flex items-center gap-3">
               <Activity size={16} className="text-amber-900" />
               <div>
                  <div className="text-[8px] text-amber-900 font-black uppercase">Timing Sync</div>
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-tighter">SCANLINE_LEVEL</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Play: React.FC<{ size?: number; className?: string; fill?: string }> = ({ size = 16, className = "", fill = "none" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={fill} 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="6 3 20 12 6 21 6 3"/>
  </svg>
);

export default MamePreservationCore;
