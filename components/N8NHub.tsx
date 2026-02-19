
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, Play, Zap, Database, Globe, 
  MessageSquare, Cpu, Shield, ArrowRight, 
  Settings, Loader2, Star, ExternalLink, 
  Webhook, GitBranch, Bell, Terminal
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  label: string;
  type: 'trigger' | 'action' | 'logic';
  icon: React.ReactNode;
  color: string;
}

const N8NHub: React.FC = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const workflow: WorkflowNode[] = [
    { id: '1', label: 'WEBHOOK TRIGGER', type: 'trigger', icon: <Webhook size={18} />, color: 'text-cyan-400' },
    { id: '2', label: 'GEMINI ORACLE', type: 'logic', icon: <Cpu size={18} />, color: 'text-purple-400' },
    { id: '3', label: 'SOVEREIGN MINT', type: 'action', icon: <Zap size={18} />, color: 'text-amber-400' },
    { id: '4', label: 'DISCORD SIGNAL', type: 'action', icon: <MessageSquare size={18} />, color: 'text-indigo-400' }
  ];

  const runWorkflow = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setLogs([]);
    setActiveNode(null);

    const sequence = async () => {
      for (const node of workflow) {
        setActiveNode(node.id);
        const logEntry = `[${new Date().toLocaleTimeString()}] NODE_${node.id}: EXECUTING ${node.label}...`;
        setLogs(prev => [...prev, logEntry]);
        await new Promise(r => setTimeout(r, 1200));
      }
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] WORKFLOW_SUCCESS: PROXIES TERMINATED.`]);
      setIsExecuting(false);
      setActiveNode(null);
    };

    sequence();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Network size={36} className="text-cyan-500" />
            N8N AUTOMATOR
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Visual Sovereign Orchestration / v1.82.0
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded">
            <Star size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-400 uppercase">45K AUTOMATED</span>
          </div>
          <a href="https://github.com/n8n-io/n8n" target="_blank" rel="noopener noreferrer" className="text-cyan-900 hover:text-cyan-400 transition-colors">
            <ExternalLink size={20} />
          </a>
          <button 
            onClick={runWorkflow}
            disabled={isExecuting}
            className={`px-8 py-2 rounded font-black text-xs tracking-widest flex items-center gap-2 transition-all ${isExecuting ? 'bg-slate-800 text-cyan-900' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'}`}
          >
            {isExecuting ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
            <span>RUN WORKFLOW</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Workflow Designer */}
        <div className="lg:col-span-8 glass-panel rounded-3xl border border-cyan-500/10 bg-slate-950/40 relative overflow-hidden flex flex-col items-center justify-center p-12">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-4 w-full justify-center">
            {workflow.map((node, idx) => (
              <React.Fragment key={node.id}>
                <motion.div 
                  animate={activeNode === node.id ? { scale: 1.1, borderColor: '#06b6d4', boxShadow: '0 0 20px rgba(6,182,212,0.3)' } : { scale: 1 }}
                  className={`w-40 p-4 rounded-2xl glass-panel border ${activeNode === node.id ? 'border-cyan-500' : 'border-cyan-500/10'} flex flex-col items-center gap-3 text-center group cursor-pointer hover:border-cyan-500/40 transition-all`}
                >
                  <div className={`p-3 rounded-xl bg-slate-900 border border-cyan-500/10 ${node.color}`}>
                    {node.icon}
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-200">
                    {node.label}
                  </div>
                  <div className="text-[7px] text-cyan-900 font-bold uppercase">ID: NODE_{node.id}</div>
                </motion.div>
                
                {idx < workflow.length - 1 && (
                  <div className="relative flex items-center justify-center">
                    <div className="w-8 h-px bg-cyan-500/20 md:block hidden" />
                    <div className="h-8 w-px bg-cyan-500/20 md:hidden block" />
                    <AnimatePresence>
                      {isExecuting && activeNode === node.id && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 20 }}
                          exit={{ opacity: 0 }}
                          className="absolute text-cyan-400 md:block hidden"
                        >
                          <Zap size={14} className="fill-cyan-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
             <div className="px-3 py-1 bg-slate-900/80 rounded border border-cyan-500/10 text-[8px] font-black text-cyan-900 uppercase tracking-widest flex items-center gap-2">
                <Shield size={10} /> Sovereign Execution Hub
             </div>
             <div className="px-3 py-1 bg-slate-900/80 rounded border border-cyan-500/10 text-[8px] font-black text-cyan-900 uppercase tracking-widest flex items-center gap-2">
                <Database size={10} /> Local Persistence: ON
             </div>
          </div>
        </div>

        {/* Sidebar Controls & Logs */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel rounded-2xl border border-cyan-500/20 flex flex-col flex-1 bg-slate-950/60 overflow-hidden">
             <div className="p-4 border-b border-cyan-500/10 bg-slate-900/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <Terminal size={14} className="text-cyan-500" />
                   <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Execution.log</span>
                </div>
                <div className="flex gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500/20" />
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
                </div>
             </div>
             <div className="flex-1 p-4 font-mono text-[9px] overflow-y-auto custom-scrollbar space-y-1.5">
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-2">
                    <Network size={32} />
                    <p className="uppercase tracking-[0.3em]">Awaiting Trigger</p>
                  </div>
                ) : (
                  logs.map((log, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -5 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className={log.includes('SUCCESS') ? 'text-green-500' : 'text-cyan-800'}
                    >
                      {log}
                    </motion.div>
                  ))
                )}
             </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/10 space-y-6">
             <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
               <Settings size={14} /> Node Configuration
             </h3>
             <div className="space-y-4">
                <div className="space-y-1.5">
                   <label className="text-[8px] text-cyan-900 font-black uppercase tracking-widest">Retry Policy</label>
                   <div className="flex rounded overflow-hidden border border-cyan-500/10">
                      <button className="flex-1 py-1.5 bg-cyan-500 text-slate-950 text-[9px] font-black uppercase">Standard</button>
                      <button className="flex-1 py-1.5 bg-slate-900 text-cyan-800 text-[9px] font-black uppercase">Exponential</button>
                   </div>
                </div>
                <div className="space-y-1.5">
                   <label className="text-[8px] text-cyan-900 font-black uppercase tracking-widest">Memory Limit</label>
                   <div className="flex justify-between text-[10px] font-bold text-cyan-500 font-mono">
                      <span>512 MB</span>
                      <span className="text-cyan-900">MAX: 4GB</span>
                   </div>
                   <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500/40 w-1/4" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default N8NHub;
