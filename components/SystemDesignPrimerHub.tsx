
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added 'Zap' to the imports to fix the reference error on line 32
import { Layers, Network, Database, Server, Cpu, ShieldAlert, ArrowRight, Zap } from 'lucide-react';

interface DesignConcept {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  diagram: string;
}

const CONCEPTS: DesignConcept[] = [
  {
    id: 'scalability',
    title: 'Horizontal vs Vertical Scaling',
    icon: <Network size={20} />,
    content: 'Vertical scaling (Scale Up) means adding more power to your existing machine. Horizontal scaling (Scale Out) means adding more machines to your pool of resources.',
    diagram: 'NODE_A [8GB] -> NODE_A [64GB] (Vertical)\nNODE_A [8GB] -> [NODE_A, NODE_B, NODE_C] (Horizontal)'
  },
  {
    id: 'load-balancing',
    title: 'Load Balancing & Proxies',
    icon: <Server size={20} />,
    content: 'A load balancer acts as a reverse proxy and distributes network or application traffic across a number of servers.',
    diagram: 'CLIENTS -> [LB] -> {SVR1, SVR2, SVR3}'
  },
  {
    id: 'caching',
    title: 'Caching Strategies',
    icon: <Zap size={20} />,
    content: 'Caching improves performance by keeping data in memory (Redis/Memcached) for faster retrieval than querying a database.',
    diagram: 'APP -> CACHE? -> (YES: RETURN) / (NO: DB -> CACHE -> RETURN)'
  },
  {
    id: 'databases',
    title: 'SQL vs NoSQL',
    icon: <Database size={20} />,
    content: 'SQL databases are relational (strict schema, ACID), while NoSQL databases are non-relational (flexible schema, BASE).',
    diagram: 'SQL: RELATIONS [ID|NAME|ADDR]\nNoSQL: COLLECTIONS {id: 1, data: "..."}'
  }
];

const SystemDesignPrimerHub: React.FC = () => {
  const [activeConcept, setActiveConcept] = useState(CONCEPTS[0]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">SYSTEM DESIGN PRIMER</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Architectural Blueprints for the Mesh</p>
        </div>
        <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Scalable Ops</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          {CONCEPTS.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveConcept(c)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeConcept.id === c.id ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-cyan-500/10 text-slate-500 hover:border-cyan-500/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                {c.icon}
                <span className="text-[10px] font-black uppercase tracking-widest">{c.title}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeConcept.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-panel p-8 rounded-2xl border border-cyan-500/20 h-full flex flex-col"
            >
              <h3 className="text-xl font-black text-cyan-400 uppercase tracking-widest mb-4 flex items-center space-x-2">
                {activeConcept.icon}
                <span>{activeConcept.title}</span>
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-mono italic">
                {activeConcept.content}
              </p>

              <div className="flex-1 bg-slate-950 p-6 rounded-lg border border-cyan-500/10 font-mono text-cyan-500 text-xs overflow-auto">
                <div className="text-[10px] text-cyan-900 mb-4 uppercase font-black tracking-widest flex items-center space-x-2">
                   <Cpu size={14} /> <span>Architectural Logic Diagram</span>
                </div>
                <pre className="whitespace-pre-wrap leading-loose">
                  {activeConcept.diagram}
                </pre>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="text-[10px] font-black text-cyan-400 hover:text-cyan-200 transition-colors flex items-center space-x-2 uppercase tracking-widest">
                  <span>Deep Dive Case Studies</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SystemDesignPrimerHub;
