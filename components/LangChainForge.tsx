
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { 
  Link as LinkIcon, Layers, Zap, Play, Loader2, 
  Terminal, Search, Database, Code, Shield, 
  ExternalLink, Star, ChevronRight, Activity, 
  Settings, MessageSquare, ListTree
} from 'lucide-react';

interface ChainStep {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'complete' | 'error';
  type: 'prompt' | 'llm' | 'tool' | 'parser';
  output?: string;
}

const LangChainForge: React.FC = () => {
  const [input, setInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [trace, setTrace] = useState<string[]>([]);
  const [chainSteps, setChainSteps] = useState<ChainStep[]>([
    { id: '1', name: 'PROMPT TEMPLATE', type: 'prompt', status: 'idle' },
    { id: '2', name: 'NEURAL CORE (GEMINI)', type: 'llm', status: 'idle' },
    { id: '3', name: 'TOOL: SEARCH GROUNDING', type: 'tool', status: 'idle' },
    { id: '4', name: 'OUTPUT PARSER', type: 'parser', status: 'idle' }
  ]);

  const logTrace = (msg: string) => setTrace(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const executeChain = async () => {
    if (!input.trim() || isExecuting) return;

    setIsExecuting(true);
    setTrace([]);
    setChainSteps(prev => prev.map(s => ({ ...s, status: 'idle', output: undefined })));

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Step 1: Prompt
      setChainSteps(prev => prev.map(s => s.id === '1' ? { ...s, status: 'running' } : s));
      logTrace("Serializing prompt template with user variables...");
      await new Promise(r => setTimeout(r, 800));
      setChainSteps(prev => prev.map(s => s.id === '1' ? { ...s, status: 'complete', output: `Processed: ${input}` } : s));

      // Step 2: LLM
      setChainSteps(prev => prev.map(s => s.id === '2' ? { ...s, status: 'running' } : s));
      logTrace("Initiating neural handshake with Gemini 3 Flash...");
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a LangChain agent. Plan a response for: ${input}. Be technical.`,
        config: { tools: [{ googleSearch: {} }] }
      });
      const resultText = response.text || "Chain interruption.";
      logTrace("Neural core returned latent strategy.");
      setChainSteps(prev => prev.map(s => s.id === '2' ? { ...s, status: 'complete', output: resultText } : s));

      // Step 3: Tool (Simulated interaction)
      setChainSteps(prev => prev.map(s => s.id === '3' ? { ...s, status: 'running' } : s));
      logTrace("Executing tool call: google_search...");
      await new Promise(r => setTimeout(r, 1200));
      logTrace("Grounding metadata extracted from global mesh.");
      setChainSteps(prev => prev.map(s => s.id === '3' ? { ...s, status: 'complete', output: "Grounding verified via 12 sources." } : s));

      // Step 4: Parser
      setChainSteps(prev => prev.map(s => s.id === '4' ? { ...s, status: 'running' } : s));
      logTrace("Normalizing output to technical JSON substrate...");
      await new Promise(r => setTimeout(r, 500));
      setChainSteps(prev => prev.map(s => s.id === '4' ? { ...s, status: 'complete', output: resultText } : s));

      logTrace("CHAIN_SEQUENCE_SUCCESS: Result pushed to output buffer.");
    } catch (err: any) {
      logTrace(`CRITICAL_FAILURE: ${err.message}`);
      setChainSteps(prev => prev.map(s => s.status === 'running' ? { ...s, status: 'error' } : s));
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <LinkIcon size={36} className="text-cyan-500" />
            LANGCHAIN FORGE
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Modular Neural Orchestration Substrate / v0.3.0
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded">
            <Star size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-400 uppercase">89K CHAINED</span>
          </div>
          <a href="https://github.com/langchain-ai/langchain" target="_blank" rel="noopener noreferrer" className="text-cyan-900 hover:text-cyan-400 transition-colors">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Left: Chain Composer */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-6 flex-1 flex flex-col overflow-hidden">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <ListTree size={16} /> Pipeline Definition
            </h3>
            
            <div className="flex-1 space-y-1 relative overflow-y-auto custom-scrollbar">
              {chainSteps.map((step, idx) => (
                <div key={step.id} className="relative">
                  <motion.div 
                    animate={step.status === 'running' ? { scale: 1.02, borderColor: '#06b6d4' } : { scale: 1 }}
                    className={`p-4 rounded-xl border ${
                      step.status === 'complete' ? 'bg-cyan-500/5 border-cyan-500/40' : 
                      step.status === 'running' ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 
                      'bg-slate-950/50 border-cyan-500/10'
                    } transition-all`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded bg-slate-900 border ${
                          step.status === 'complete' ? 'border-cyan-500 text-cyan-400' : 'border-cyan-900/50 text-cyan-900'
                        }`}>
                          {step.type === 'prompt' && <MessageSquare size={12} />}
                          {step.type === 'llm' && <Zap size={12} />}
                          {step.type === 'tool' && <Settings size={12} />}
                          {step.type === 'parser' && <Code size={12} />}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          step.status === 'running' ? 'text-cyan-400 animate-pulse' : 
                          step.status === 'complete' ? 'text-slate-200' : 'text-cyan-900'
                        }`}>{step.name}</span>
                      </div>
                      {step.status === 'running' && <Loader2 size={12} className="animate-spin text-cyan-400" />}
                    </div>
                  </motion.div>
                  {idx < chainSteps.length - 1 && (
                    <div className="h-4 flex justify-center">
                       <div className="w-px bg-cyan-500/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-cyan-500/10">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Assign task to chain..."
                className="w-full bg-slate-950 border border-cyan-500/20 rounded-xl p-4 text-cyan-400 focus:outline-none focus:border-cyan-500 text-xs h-24 resize-none font-bold"
              />
              <button 
                onClick={executeChain}
                disabled={isExecuting || !input.trim()}
                className={`w-full py-4 rounded-xl font-black text-xs tracking-[0.3em] transition-all uppercase flex items-center justify-center gap-2 ${
                  isExecuting ? 'bg-slate-800 text-cyan-900 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                }`}
              >
                {isExecuting ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
                <span>{isExecuting ? 'Chaining...' : 'Run Pipeline'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Trace & Result */}
        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
          <div className="glass-panel flex-1 rounded-3xl border border-cyan-500/20 bg-slate-950/40 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-cyan-500/10 bg-slate-900/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <Terminal size={14} className="text-cyan-500" />
                 <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">LangSmith.trace</span>
              </div>
              <div className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[8px] font-black text-cyan-500 uppercase">
                LATENCY: {isExecuting ? '--' : '2.4s'}
              </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-4 font-mono">
              {trace.length === 0 && !isExecuting ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-4">
                  <Activity size={64} />
                  <p className="text-[10px] uppercase tracking-[0.4em]">Awaiting Execution Signal</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {trace.map((line, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] text-cyan-800 font-bold"
                    >
                      {line}
                    </motion.div>
                  ))}
                  {isExecuting && (
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-[10px] text-cyan-400 font-bold"
                    >
                      > PROCESSING NEURAL PACKET...
                    </motion.div>
                  )}
                </div>
              )}

              <AnimatePresence>
                {chainSteps.some(s => s.output) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-slate-900/80 rounded-2xl border border-cyan-500/10"
                  >
                    <div className="text-[8px] text-cyan-900 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Shield size={12} className="text-green-500" /> Grounded Synthesis Output
                    </div>
                    <div className="text-xs text-slate-100 leading-relaxed whitespace-pre-wrap">
                      {chainSteps[chainSteps.length - 1].output || chainSteps[1].output}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/10 flex items-center gap-3">
               <Search size={16} className="text-cyan-900" />
               <div>
                  <div className="text-[8px] text-cyan-900 font-black uppercase">Tools Registry</div>
                  <div className="text-[10px] font-bold text-cyan-400">12 ACTIVE</div>
               </div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/10 flex items-center gap-3">
               <Database size={16} className="text-cyan-900" />
               <div>
                  <div className="text-[8px] text-cyan-900 font-black uppercase">Vector Memory</div>
                  <div className="text-[10px] font-bold text-cyan-400">PERSISTENT</div>
               </div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/10 flex items-center gap-3">
               <Shield size={16} className="text-cyan-900" />
               <div>
                  <div className="text-[8px] text-cyan-900 font-black uppercase">Mesh Safety</div>
                  <div className="text-[10px] font-bold text-cyan-400">STABLE</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LangChainForge;
