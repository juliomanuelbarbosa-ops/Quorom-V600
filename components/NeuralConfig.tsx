
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, Info, Lock, Globe } from 'lucide-react';

interface NeuralConfigProps {
  onClose: () => void;
  currentTier: 'flash' | 'pro';
  setTier: (tier: 'flash' | 'pro') => void;
}

const NeuralConfig: React.FC<NeuralConfigProps> = ({ onClose, currentTier, setTier }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel max-w-2xl w-full rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-cyan-500/10 bg-slate-900/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Cpu className="text-cyan-500" size={24} />
            <h2 className="text-xl font-black text-cyan-400 tracking-widest uppercase">Cognitive Architecture</h2>
          </div>
          <button onClick={onClose} className="text-cyan-900 hover:text-cyan-400 transition-colors uppercase text-[10px] font-black tracking-widest">
            Close Node
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => setTier('flash')}
              className={`p-6 rounded-2xl border transition-all text-left space-y-3 ${
                currentTier === 'flash' ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'bg-slate-900 border-cyan-500/10 hover:border-cyan-500/30'
              }`}
            >
              <Zap size={24} className={currentTier === 'flash' ? 'text-cyan-400' : 'text-cyan-900'} />
              <div>
                <div className="text-xs font-black text-slate-100 uppercase tracking-widest">Flash Tier</div>
                <div className="text-[10px] text-cyan-800 font-bold uppercase mt-1">High-Speed / Low Latency</div>
              </div>
              <p className="text-[9px] text-slate-400 leading-relaxed">Optimal for simple queries and rapid data extraction tasks.</p>
            </button>

            <button 
              onClick={() => setTier('pro')}
              className={`p-6 rounded-2xl border transition-all text-left space-y-3 ${
                currentTier === 'pro' ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.1)]' : 'bg-slate-900 border-purple-500/10 hover:border-purple-500/30'
              }`}
            >
              <Cpu size={24} className={currentTier === 'pro' ? 'text-purple-400' : 'text-purple-900'} />
              <div>
                <div className="text-xs font-black text-slate-100 uppercase tracking-widest">Pro Tier (GPT-Class)</div>
                <div className="text-[10px] text-purple-800 font-bold uppercase mt-1">Deep Reasoning / Multi-Source</div>
              </div>
              <p className="text-[9px] text-slate-400 leading-relaxed">Advanced synthesis and complex problem solving with Thinking logic enabled.</p>
            </button>
          </div>

          <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <Lock className="text-cyan-500" size={18} />
              <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Sovereign Key Protocol</h3>
            </div>
            <p className="text-[10px] text-cyan-800 font-bold uppercase leading-relaxed tracking-wider">
              The Quorum Kernel manages all neural credentials via managed environment injection. Manual key entry is disabled to prevent session harvesting. Your access to GPT-class and Pro-tier models is facilitated through the centralized Secure-Mesh Link.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-cyan-500/10">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-500" />
              <span className="text-[8px] text-green-900 font-black uppercase tracking-widest">Encryption: AES-256-GCM Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-cyan-900" />
              <span className="text-[8px] text-cyan-900 font-black uppercase tracking-widest">Node: Local/Global Hybrid</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NeuralConfig;
