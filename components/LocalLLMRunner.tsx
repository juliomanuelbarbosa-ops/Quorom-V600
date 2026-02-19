
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Boxes, Zap, Terminal, Cpu, Info, Loader2 } from 'lucide-react';

const LocalLLMRunner: React.FC = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const loadModel = () => {
    setIsLoading(true);
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setIsModelLoaded(true);
        setIsLoading(false);
      }
      setProgress(current);
    }, 200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">WASM RUNNER</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">On-Device Sovereign Inference</p>
        </div>
        <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400">QUANTIZED 4-BIT</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-slate-900 border border-cyan-500/20 rounded-full flex items-center justify-center relative">
            {isLoading ? <Loader2 className="animate-spin text-cyan-500 w-10 h-10" /> : <Boxes className="text-cyan-400 w-10 h-10" />}
            {isModelLoaded && <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900" />}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold uppercase tracking-widest">QUORUM-LLM-v1</h3>
            <p className="text-[10px] text-cyan-800 font-bold uppercase tracking-widest">Base: Llama-3-Sovereign-8B</p>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
              <span>Memory Allocation</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${progress}%` }}
                className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
              />
            </div>
          </div>

          <button 
            onClick={loadModel}
            disabled={isLoading || isModelLoaded}
            className={`w-full py-4 rounded font-black text-xs tracking-[0.3em] transition-all border ${
              isModelLoaded ? 'bg-green-500/10 border-green-500/40 text-green-500' : 
              'bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-cyan-500 shadow-lg shadow-cyan-500/10'
            }`}
          >
            {isModelLoaded ? 'CORE ACTIVE' : isLoading ? 'ALLOCATING VRAM...' : 'INITIALIZE LOCAL CORE'}
          </button>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-cyan-500/10 bg-slate-900/40">
            <h3 className="text-xs font-bold text-cyan-600 tracking-widest uppercase mb-4 flex items-center space-x-2">
              <Terminal size={14} /> <span>System Logs</span>
            </h3>
            <div className="font-mono text-[9px] text-cyan-800 space-y-1">
              <p>[INFO] INITIALIZING WASM RUNTIME...</p>
              <p>[INFO] DETECTING WebGPU SUBSTRATE...</p>
              <p>[INFO] FOUND NVIDIA RTX GRID CLOUD EMULATED</p>
              <p>[WARN] MEMORY PRESSURE: HIGH</p>
              {isModelLoaded && <p className="text-green-500">[READY] MODEL QUORUM-LLM LOADED INTO RAM</p>}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-cyan-500/10 bg-cyan-500/5">
            <h3 className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-4 flex items-center space-x-2">
              <Cpu size={14} /> <span>HARDWARE MESH</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[8px] text-cyan-900 uppercase">GPU LOAD</div>
                <div className="text-lg font-bold text-cyan-500">84%</div>
              </div>
              <div>
                <div className="text-[8px] text-cyan-900 uppercase">LATENCY</div>
                <div className="text-lg font-bold text-cyan-500">2ms</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900 border border-cyan-500/10 rounded flex items-center space-x-3">
             <Info size={16} className="text-cyan-800" />
             <p className="text-[9px] text-cyan-800 font-bold uppercase leading-tight">
               Local inference bypasses the oracle neural link for air-gapped operations.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalLLMRunner;
