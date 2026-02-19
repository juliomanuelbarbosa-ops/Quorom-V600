
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Terminal, Zap, Brain, ShieldAlert, 
  History, Play, Square, Loader2, GitBranch, 
  Star, ExternalLink, MessageSquare, Target
} from 'lucide-react';

interface Thought {
  type: 'thought' | 'reasoning' | 'plan' | 'criticism' | 'action';
  text: string;
  timestamp: string;
}

const AutoGPTHub: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thoughts]);

  const simulateLoop = () => {
    if (!goal.trim() || isRunning) return;
    
    setIsRunning(true);
    setThoughts([]);
    
    const steps: Thought[] = [
      { type: 'thought', text: `Analyzing objective: "${goal}"`, timestamp: '0.001s' },
      { type: 'reasoning', text: "Target requires multi-step decomposition. Accessing local knowledge base for substrate verification.", timestamp: '0.450s' },
      { type: 'plan', text: "1. Scan mesh for vulnerabilities\n2. Deploy sub-agent for data extraction\n3. Synthesize final report", timestamp: '1.200s' },
      { type: 'criticism', text: "Initial plan lacks post-quantum encryption check. High risk of signal interception. Amending protocol.", timestamp: '2.100s' },
      { type: 'action', text: "Executing secure handshake with Node_04X. Initializing subprocess...", timestamp: '3.500s' }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setThoughts(prev => [...prev, steps[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1500);
  };

  const getThoughtStyle = (type: Thought['type']) => {
    switch (type) {
      case 'thought': return 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5';
      case 'reasoning': return 'text-purple-400 border-purple-500/20 bg-purple-500/5';
      case 'plan': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'criticism': return 'text-red-400 border-red-500/20 bg-red-500/5';
      case 'action': return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      default: return 'text-slate-400 border-slate-500/20 bg-slate-500/5';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Bot size={36} className="text-cyan-500" />
            AUTOGPT NODE
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Autonomous General Intelligence Substrate / Version 0.5.1
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded">
            <Star size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-400">165K</span>
          </div>
          <a 
            href="https://github.com/Significant-Gravitas/AutoGPT" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 text-cyan-900 hover:text-cyan-400 transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
        {/* Left: Input & Stats */}
        <div className="space-y-6 flex flex-col">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-2">
                <Target size={12} /> Mission Objective
              </label>
              <textarea 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Assign a complex autonomous task..."
                className="w-full bg-slate-950 border border-cyan-500/20 rounded-xl p-4 text-cyan-400 focus:outline-none focus:border-cyan-500 text-xs h-32 resize-none font-bold"
              />
            </div>
            <button 
              onClick={simulateLoop}
              disabled={isRunning || !goal.trim()}
              className={`w-full py-4 rounded-xl font-black text-xs tracking-[0.3em] transition-all uppercase flex items-center justify-center gap-2 ${
                isRunning ? 'bg-slate-800 text-cyan-900 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
              }`}
            >
              {isRunning ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
              {isRunning ? 'Agent Thinking' : 'Initialize Loop'}
            </button>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 space-y-4">
             <div className="flex items-center gap-2 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
               <History size={14} /> Memory Substrate
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-[8px] font-bold text-cyan-900 uppercase">
                  <span>Vector Cache</span>
                  <span className="text-cyan-600">8.4GB</span>
                </div>
                <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-3/4" />
                </div>
             </div>
          </div>
        </div>

        {/* Right: Thought Stream */}
        <div className="lg:col-span-3 flex flex-col overflow-hidden">
          <div className="glass-panel rounded-3xl border border-cyan-500/20 flex flex-col flex-1 bg-slate-950/40 overflow-hidden">
            <div className="p-4 border-b border-cyan-500/10 bg-slate-900/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <Terminal size={14} className="text-cyan-500" />
                 <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Agent_Core.log</span>
              </div>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500/30" />
                 <div className="w-2 h-2 rounded-full bg-amber-500/30" />
                 <div className="w-2 h-2 rounded-full bg-green-500/30" />
              </div>
            </div>
            
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-4 font-mono"
            >
              <AnimatePresence>
                {thoughts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-4">
                    <Brain size={80} />
                    <p className="text-[10px] uppercase tracking-[0.5em]">Awaiting Objective Transmision</p>
                  </div>
                ) : (
                  thoughts.map((t, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 rounded-xl border ${getThoughtStyle(t.type)} relative overflow-hidden`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-60">[{t.type}]</span>
                        <span className="text-[8px] font-bold opacity-40">{t.timestamp}</span>
                      </div>
                      <p className="text-[11px] font-bold leading-relaxed whitespace-pre-wrap">{t.text}</p>
                    </motion.div>
                  ))
                )}
                {isRunning && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 p-4"
                  >
                    <Loader2 size={14} className="animate-spin text-cyan-500" />
                    <span className="text-[10px] text-cyan-900 font-black uppercase tracking-widest animate-pulse">Processing Cognitive Cycle...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoGPTHub;
