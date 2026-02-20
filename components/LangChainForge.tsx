
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";
import { StateGraph, START, END } from "@langchain/langgraph";
import { 
  Link as LinkIcon, Layers, Zap, Play, Loader2, 
  Terminal, Search, Database, Code, Shield, 
  ExternalLink, Star, ChevronRight, Activity, 
  Settings, MessageSquare, ListTree, GitGraph
} from 'lucide-react';

interface ChainStep {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'complete' | 'error';
  type: 'prompt' | 'llm' | 'tool' | 'parser';
  output?: string;
}

// Define the state for our graph
interface AgentState {
  messages: BaseMessage[];
  steps: string[];
}

const LangChainForge: React.FC = () => {
  const [input, setInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [trace, setTrace] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [chainSteps, setChainSteps] = useState<ChainStep[]>([
    { id: '1', name: 'INPUT NODE', type: 'prompt', status: 'idle' },
    { id: '2', name: 'GEMINI AGENT', type: 'llm', status: 'idle' },
    { id: '3', name: 'OUTPUT NODE', type: 'parser', status: 'idle' }
  ]);

  const logTrace = (msg: string) => setTrace(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const executeChain = async () => {
    if (!input.trim() || isExecuting) return;

    setIsExecuting(true);
    setTrace([]);
    setResult(null);
    setChainSteps(prev => prev.map(s => ({ ...s, status: 'idle', output: undefined })));

    try {
      logTrace("Initializing LangGraph StateGraph...");
      
      // 1. Initialize Model
      const model = new ChatGoogleGenerativeAI({
        model: "gemini-3-flash-preview",
        apiKey: process.env.API_KEY,
        maxOutputTokens: 2048,
      });

      // 2. Define Nodes
      const agentNode = async (state: AgentState) => {
        logTrace("Executing Agent Node (Gemini 3 Flash)...");
        setChainSteps(prev => prev.map(s => s.id === '2' ? { ...s, status: 'running' } : s));
        
        const { messages } = state;
        const response = await model.invoke(messages);
        
        logTrace("Agent generated response.");
        setChainSteps(prev => prev.map(s => s.id === '2' ? { ...s, status: 'complete', output: response.content as string } : s));
        
        return { 
          messages: [response],
          steps: ["agent"]
        };
      };

      // 3. Build Graph
      const workflow = new StateGraph<AgentState>({
        channels: {
          messages: {
            reducer: (a: BaseMessage[], b: BaseMessage[]) => a.concat(b),
            default: () => [],
          },
          steps: {
            reducer: (a: string[], b: string[]) => a.concat(b),
            default: () => [],
          }
        }
      })
      .addNode("agent", agentNode)
      .addEdge(START, "agent")
      .addEdge("agent", END);

      const app = workflow.compile();

      // 4. Execute
      setChainSteps(prev => prev.map(s => s.id === '1' ? { ...s, status: 'complete', output: input } : s));
      logTrace("Graph compilation complete. Invoking...");

      const inputs = { messages: [new HumanMessage(input)] };
      
      // Stream events if possible, or just await result
      // For simplicity in this UI, we'll await the final state
      const finalState = await app.invoke(inputs) as unknown as AgentState;
      
      const lastMessage = finalState.messages[finalState.messages.length - 1];
      const outputText = typeof lastMessage.content === 'string' ? lastMessage.content : JSON.stringify(lastMessage.content);

      setResult(outputText);
      setChainSteps(prev => prev.map(s => s.id === '3' ? { ...s, status: 'complete', output: outputText } : s));
      logTrace("Graph execution finished successfully.");

    } catch (err: any) {
      console.error(err);
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
            <GitGraph size={36} className="text-cyan-500" />
            LANGGRAPH FORGE
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Cyclic Graph Orchestration / Gemini Powered
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded">
            <Star size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-400 uppercase">STATEFUL AGENTS</span>
          </div>
          <a href="https://langchain-ai.github.io/langgraphjs/" target="_blank" rel="noopener noreferrer" className="text-cyan-900 hover:text-cyan-400 transition-colors">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Left: Chain Composer */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-6 flex-1 flex flex-col overflow-hidden">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <ListTree size={16} /> Graph Topology
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
                placeholder="Describe a task for the agent graph..."
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
                <span>{isExecuting ? 'Executing Graph...' : 'Invoke Agent'}</span>
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
                 <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Graph.trace</span>
              </div>
              <div className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[8px] font-black text-cyan-500 uppercase">
                STATUS: {isExecuting ? 'RUNNING' : 'IDLE'}
              </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-4 font-mono">
              {trace.length === 0 && !isExecuting ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-4">
                  <Activity size={64} />
                  <p className="text-[10px] uppercase tracking-[0.4em]">Awaiting Graph Invocation</p>
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
                      {'>'} PROCESSING GRAPH NODE...
                    </motion.div>
                  )}
                </div>
              )}

              <AnimatePresence>
                {result && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-slate-900/80 rounded-2xl border border-cyan-500/10"
                  >
                    <div className="text-[8px] text-cyan-900 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Shield size={12} className="text-green-500" /> Agent Output
                    </div>
                    <div className="text-xs text-slate-100 leading-relaxed whitespace-pre-wrap">
                      {result}
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
                  <div className="text-[8px] text-cyan-900 font-black uppercase">Nodes</div>
                  <div className="text-[10px] font-bold text-cyan-400">3 ACTIVE</div>
               </div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/10 flex items-center gap-3">
               <Database size={16} className="text-cyan-900" />
               <div>
                  <div className="text-[8px] text-cyan-900 font-black uppercase">State Memory</div>
                  <div className="text-[10px] font-bold text-cyan-400">EPHEMERAL</div>
               </div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/10 flex items-center gap-3">
               <Shield size={16} className="text-cyan-900" />
               <div>
                  <div className="text-[8px] text-cyan-900 font-black uppercase">Model</div>
                  <div className="text-[10px] font-bold text-cyan-400">GEMINI 3 FLASH</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LangChainForge;
