import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, CheckCircle, Info, Code } from 'lucide-react';

const EXAMPLES = [
  {
    title: "Variables & Declaration",
    bad: "var x = 10;\nlet y = 20;",
    good: "const x = 10;\nconst y = 20;",
    reason: "Prefer const over let. Avoid var entirely."
  },
  {
    title: "Objects & Shorthand",
    bad: "const obj = {\n  val: val,\n  method: function() {}\n};",
    good: "const obj = {\n  val,\n  method() {}\n};",
    reason: "Use property value shorthand and method shorthand."
  },
  {
    title: "Arrows & Functions",
    bad: "[1, 2].map(function(x) {\n  return x * 2;\n});",
    good: "[1, 2].map((x) => x * 2);",
    reason: "Use arrow functions for anonymous functions."
  }
];

const AirbnbStyleGuideHub: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">AIRBNB JS GUIDE</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Linter Enforcement Protocols</p>
        </div>
        <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400 font-bold tracking-widest uppercase">ESLint Standard</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeIndex === i ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-lg' : 'bg-slate-900 border-cyan-500/10 text-slate-500 hover:border-cyan-500/30'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">{ex.title}</span>
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="glass-panel p-6 rounded-xl border border-red-500/20 bg-red-500/5">
              <div className="flex items-center space-x-2 text-red-500 mb-3 uppercase font-black text-[10px] tracking-widest">
                <AlertTriangle size={14} /> <span>Bad Practice</span>
              </div>
              <pre className="font-mono text-xs text-red-900 bg-slate-950 p-4 rounded border border-red-900/10 overflow-x-auto">
                {EXAMPLES[activeIndex].bad}
              </pre>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-green-500/20 bg-green-500/5">
              <div className="flex items-center space-x-2 text-green-500 mb-3 uppercase font-black text-[10px] tracking-widest">
                <CheckCircle size={14} /> <span>Airbnb Standard</span>
              </div>
              <pre className="font-mono text-xs text-green-400 bg-slate-950 p-4 rounded border border-green-900/10 overflow-x-auto">
                {EXAMPLES[activeIndex].good}
              </pre>
            </div>
          </div>

          <div className="p-4 bg-slate-900 border border-cyan-500/10 rounded-lg flex items-start space-x-3">
             <Info size={16} className="text-cyan-800 flex-shrink-0 mt-0.5" />
             <div className="space-y-1">
               <p className="text-[10px] text-cyan-800 font-black uppercase tracking-wider">Linter Reason</p>
               <p className="text-xs text-slate-400 italic">{EXAMPLES[activeIndex].reason}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirbnbStyleGuideHub;