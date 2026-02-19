import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Rocket, Database, Globe, Layers, CheckSquare } from 'lucide-react';

const CHALLENGES = [
  { id: 'db', title: "Build Your Own Database", category: "Core", difficulty: "Expert", progress: 0 },
  { id: 'os', title: "Build Your Own Operating System", category: "Low Level", difficulty: "Elite", progress: 0 },
  { id: 'docker', title: "Build Your Own Docker", category: "Systems", difficulty: "Hard", progress: 45 },
  { id: 'git', title: "Build Your Own Git", category: "VCS", difficulty: "Advanced", progress: 10 },
  { id: 'react', title: "Build Your Own React", category: "Frontend", difficulty: "Advanced", progress: 0 },
  { id: 'blockchain', title: "Build Your Own Blockchain", category: "Web3", difficulty: "Expert", progress: 0 }
];

const BuildYourOwnXHub: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">BUILD YOUR OWN X</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Foundational Engineering Challenges</p>
        </div>
        <div className="flex space-x-2">
           <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400 font-bold tracking-widest uppercase">Tutorial Mesh: ACTIVE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHALLENGES.map((ch, idx) => (
          <motion.div
            key={ch.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-panel p-6 rounded-2xl border border-cyan-500/10 hover:border-cyan-500/40 transition-all group cursor-pointer flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500 transition-colors">
                <Wrench size={20} className="text-cyan-700 group-hover:text-cyan-400" />
              </div>
              <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${
                ch.difficulty === 'Elite' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500'
              } tracking-widest uppercase`}>
                {ch.difficulty}
              </span>
            </div>

            <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest mb-2 group-hover:text-cyan-400 transition-colors">
              {ch.title}
            </h3>
            <p className="text-[9px] text-cyan-900 font-bold uppercase mb-6">{ch.category}</p>

            <div className="mt-auto space-y-2">
              <div className="flex justify-between text-[8px] font-black uppercase text-cyan-800">
                <span>Synchronization</span>
                <span>{ch.progress}%</span>
              </div>
              <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${ch.progress}%` }} className="h-full bg-cyan-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-6 bg-slate-900/40 border border-cyan-500/10 rounded-xl flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
               <Rocket size={24} className="text-cyan-500" />
            </div>
            <div>
               <div className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">Global Tutorial Repository</div>
               <div className="text-[8px] text-cyan-900 font-bold uppercase tracking-widest">Sourced from build-your-own-x on GitHub</div>
            </div>
         </div>
         <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2 rounded text-[10px] font-black tracking-widest uppercase transition-all shadow-lg shadow-cyan-500/20">
            LOAD FULL DIRECTORY
         </button>
      </div>
    </div>
  );
};

export default BuildYourOwnXHub;