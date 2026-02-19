import React from 'react';
import { motion } from 'framer-motion';
import { Shapes, Play, ArrowRight, Zap, Brain, CheckSquare } from 'lucide-react';

const LangGraphVisualizer: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-indigo-400 glow-text tracking-tight uppercase">LANGGRAPH MESH</h2>
          <p className="text-indigo-800 text-xs uppercase tracking-[0.2em] mt-1">Sovereign State-Machine Orchestration</p>
        </div>
        <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] text-indigo-400 font-bold tracking-widest uppercase">Nodes Active: 04</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 glass-panel p-12 rounded-3xl border border-indigo-500/10 bg-slate-950/50 flex items-center justify-center relative min-h-[500px]">
          {/* Animated Graph Visual */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Start Node */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute left-10 w-20 h-20 rounded-2xl bg-slate-900 border border-indigo-500 flex flex-col items-center justify-center space-y-1 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
               <span className="text-[8px] font-black text-indigo-500 uppercase">START</span>
               <Play size={16} className="text-indigo-400" />
            </motion.div>

            <motion.div initial={{ width: 0 }} animate={{ width: 100 }} transition={{ delay: 0.5 }} className="absolute left-[120px] h-0.5 bg-indigo-500/30" />

            {/* Plan Node */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} className="absolute left-[220px] w-24 h-24 rounded-full bg-slate-900 border border-indigo-500 flex flex-col items-center justify-center space-y-1 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
               <span className="text-[8px] font-black text-indigo-500 uppercase">PLANNER</span>
               <Brain size={20} className="text-indigo-400" />
            </motion.div>

            <motion.div initial={{ width: 0 }} animate={{ width: 80 }} transition={{ delay: 1.5 }} className="absolute left-[316px] h-0.5 bg-indigo-500/30" />

            {/* Act Node */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 }} className="absolute left-[396px] w-24 h-24 rounded-full bg-slate-900 border border-indigo-500 flex flex-col items-center justify-center space-y-1 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
               <span className="text-[8px] font-black text-indigo-500 uppercase">ACTOR</span>
               <Zap size={20} className="text-indigo-400" />
            </motion.div>

            <motion.div initial={{ width: 0 }} animate={{ width: 80 }} transition={{ delay: 2.5 }} className="absolute left-[492px] h-0.5 bg-indigo-500/30" />

            {/* Finish Node */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3 }} className="absolute right-10 w-20 h-20 rounded-2xl bg-slate-900 border border-indigo-500 flex flex-col items-center justify-center space-y-1 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
               <span className="text-[8px] font-black text-indigo-500 uppercase">FINISH</span>
               <CheckSquare size={16} className="text-indigo-400" />
            </motion.div>

            {/* Pulsing Edge */}
            <motion.div animate={{ opacity: [0.1, 1, 0.1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-1/2 left-0 right-0 h-[200px] pointer-events-none">
               <div className="absolute top-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent -translate-y-1/2" />
            </motion.div>
          </div>

          <div className="absolute top-4 left-4 p-4">
             <div className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mb-1">Graph Substrate</div>
             <p className="text-[8px] text-indigo-900 uppercase">Stateful Cyclical Orchestration</p>
          </div>
        </div>

        <div className="space-y-6">
           <div className="glass-panel p-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5">
              <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">State Schema</h3>
              <pre className="text-[9px] text-indigo-900 font-mono leading-relaxed">
                {`{
  "messages": [...],
  "agent_outcome": null,
  "intermediate_steps": []
}`}
              </pre>
           </div>
           <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-black text-xs tracking-widest uppercase transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2">
              <Play size={16} />
              <span>RUN STATE GRAPH</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default LangGraphVisualizer;