
import React, { useState } from 'react';
// Added 'AnimatePresence' to the imports to fix the reference error on lines 77 and 113
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Play, RefreshCcw, Monitor, Layers, Zap } from 'lucide-react';

const INITIAL_CODE = `
import React from 'react';

export default function CyberComponent() {
  return (
    <div className="p-8 bg-slate-900 rounded-xl border border-cyan-500/20 text-center">
      <h1 className="text-3xl font-black text-cyan-400 tracking-tighter glow-text">
        SOVEREIGN UI
      </h1>
      <p className="mt-4 text-cyan-800 text-xs uppercase tracking-[0.4em]">
        Browser-Native Execution Substrate
      </p>
      <button className="mt-8 px-6 py-2 bg-cyan-500 text-slate-950 font-bold rounded">
        ACTIVATE NODE
      </button>
    </div>
  );
}
`;

const ReactPlayground: React.FC = () => {
  const [code, setCode] = useState(INITIAL_CODE);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">REACT PLAYGROUND</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Live Component Forge v2.0</p>
        </div>
        <div className="flex space-x-4">
           <button onClick={() => setCode(INITIAL_CODE)} className="p-2 text-cyan-800 hover:text-cyan-400 transition-colors">
             <RefreshCcw size={18} />
           </button>
           <button 
             onClick={runCode}
             className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-1 rounded-sm text-[10px] font-black tracking-widest flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20"
           >
             <Play size={14} />
             <span>HOT RELOAD</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        <div className="glass-panel rounded-xl border border-cyan-500/20 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-cyan-500/10 bg-slate-900/50 flex items-center space-x-2">
            <Code size={14} className="text-cyan-600" />
            <span className="text-[10px] font-bold text-cyan-600 tracking-widest uppercase">EditorSubstrate.tsx</span>
          </div>
          <textarea 
            className="flex-1 bg-slate-950 p-6 font-mono text-xs text-cyan-500 focus:outline-none resize-none custom-scrollbar leading-relaxed"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="glass-panel rounded-xl border border-cyan-500/20 flex flex-col overflow-hidden bg-slate-900/20 relative">
          <div className="p-3 border-b border-cyan-500/10 bg-slate-900/50 flex items-center space-x-2">
            <Monitor size={14} className="text-cyan-600" />
            <span className="text-[10px] font-bold text-cyan-600 tracking-widest uppercase">RenderView: PrimaryNode</span>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
            <AnimatePresence mode="wait">
              {isRunning ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center space-y-4"
                >
                  <Zap size={32} className="text-cyan-500 animate-pulse" />
                  <span className="text-[10px] text-cyan-800 font-black uppercase tracking-[0.5em]">Compiling Mesh...</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="content"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {/* Visual Simulation of the code being rendered */}
                  <div className="p-12 bg-slate-900/80 rounded-2xl border border-cyan-500/30 text-center shadow-2xl shadow-cyan-500/5 max-w-sm">
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/20">
                      <Layers size={32} className="text-cyan-400" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-100 tracking-tight glow-text uppercase mb-2">
                      Sovereign UI
                    </h1>
                    <p className="text-cyan-800 text-[8px] uppercase tracking-[0.3em] font-bold mb-8">
                      Local Node Execution: STABLE
                    </p>
                    <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[10px] tracking-widest rounded transition-all shadow-lg shadow-cyan-500/20">
                      ACTIVATE PROTOCOL
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-4 right-4 text-cyan-900/20 select-none">
             <Code size={120} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactPlayground;
