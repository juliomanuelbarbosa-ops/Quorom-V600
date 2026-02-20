import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";
import { StateGraph, END } from "@langchain/langgraph";
import { 
  Network, Zap, BrainCircuit, ShieldCheck, 
  Terminal, Activity, Play, Loader2, 
  CheckCircle2, Circle, ArrowRight, Bot
} from 'lucide-react';

// 1. Define the Shared State
interface AgentState {
  task: string;
  market_data: string;
  sentiment_analysis: string;
  math_validation: string;
  final_output: string;
  messages: BaseMessage[];
}

// Agent Configuration
const AGENTS = [
  { id: 'grok', name: 'Grok 4.20', role: 'Sentiment Analysis', icon: <Zap size={16} />, color: 'text-yellow-400', border: 'border-yellow-400/50' },
  { id: 'gemini', name: 'Gemini 3 Pro', role: 'Data Parsing', icon: <BrainCircuit size={16} />, color: 'text-cyan-400', border: 'border-cyan-400/50' },
  { id: 'deepseek', name: 'DeepSeek R1', role: 'Math/EV Calc', icon: <Terminal size={16} />, color: 'text-purple-400', border: 'border-purple-400/50' },
  { id: 'claude', name: 'Claude 4.5', role: 'Logic Verification', icon: <ShieldCheck size={16} />, color: 'text-orange-400', border: 'border-orange-400/50' },
  { id: 'gpt', name: 'GPT-5.2', role: 'Final Formatting', icon: <Network size={16} />, color: 'text-green-400', border: 'border-green-400/50' }
];

const MultiAgentSwarm: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [agentData, setAgentData] = useState<Partial<AgentState>>({});
  const [finalResult, setFinalResult] = useState<any | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const runSwarm = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setAgentData({});
    setFinalResult(null);
    setActiveAgent(null);

    try {
      addLog("Initializing Babel Protocol...");
      addLog("Connecting to backend swarm orchestrator...");

      const eventSource = new EventSource('/api/swarm/stream?directive=Analyze Arbitrage Opportunity: NBA Finals');

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'FINAL_RESULT') {
          try {
            setFinalResult(JSON.parse(data.payload));
          } catch (e) {
            setFinalResult({ error: "Failed to parse final JSON payload", raw: data.payload });
          }
          return;
        }

        addLog(`${data.agent}: ${data.msg}`);
        
        // Update active agent visualization based on the agent name
        const agentId = data.agent.toLowerCase().split(' ')[0]; // simple mapping
        setActiveAgent(agentId);
        
        // Mark agent as complete in the UI state
        setAgentData(prev => ({
          ...prev,
          [agentId]: true 
        }));
      };

      eventSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        eventSource.close();
        setIsRunning(false);
        addLog("Swarm execution complete (Stream closed).");
      };

    } catch (err: any) {
      console.error(err);
      addLog(`CRITICAL FAILURE: ${err.message}`);
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Network size={36} className="text-cyan-500" />
            MULTI-AGENT SWARM
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Autonomous Neural Collective / Babel Protocol
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded text-[10px] font-black text-cyan-400 uppercase">
            5 NODES ACTIVE
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Left: Swarm Visualization */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-6 flex-1 flex flex-col">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Activity size={16} /> Swarm Topology
            </h3>
            
            <div className="flex-1 space-y-4 relative">
              {AGENTS.map((agent, idx) => (
                <div key={agent.id} className="relative z-10">
                  <motion.div 
                    animate={activeAgent === agent.id ? { scale: 1.05, x: 10 } : { scale: 1, x: 0 }}
                    className={`p-4 rounded-xl border bg-slate-900/80 transition-all ${
                      activeAgent === agent.id 
                        ? `${agent.border} shadow-[0_0_20px_rgba(0,0,0,0.3)]` 
                        : 'border-cyan-500/10 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-slate-950 ${agent.color}`}>
                          {agent.icon}
                        </div>
                        <div>
                          <div className={`text-[10px] font-black uppercase tracking-widest ${agent.color}`}>
                            {agent.name}
                          </div>
                          <div className="text-[8px] text-slate-500 font-bold uppercase">
                            {agent.role}
                          </div>
                        </div>
                      </div>
                      {activeAgent === agent.id ? (
                        <Loader2 size={14} className={`animate-spin ${agent.color}`} />
                      ) : agentData[agent.id as keyof AgentState] || (agent.id === 'gpt' && finalResult) ? (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      ) : (
                        <Circle size={14} className="text-slate-700" />
                      )}
                    </div>
                  </motion.div>
                  {idx < AGENTS.length - 1 && (
                    <div className="absolute left-8 top-full h-4 w-0.5 bg-cyan-500/10 -z-10" />
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={runSwarm}
              disabled={isRunning}
              className={`w-full py-4 rounded-xl font-black text-xs tracking-[0.3em] transition-all uppercase flex items-center justify-center gap-2 ${
                isRunning ? 'bg-slate-800 text-cyan-900 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
              }`}
            >
              {isRunning ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
              <span>{isRunning ? 'Swarm Active...' : 'Initiate Protocol'}</span>
            </button>
          </div>
        </div>

        {/* Right: Intelligence Brief */}
        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
          <div className="glass-panel flex-1 rounded-3xl border border-cyan-500/20 bg-slate-950/40 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-cyan-500/10 bg-slate-900/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <Terminal size={14} className="text-cyan-500" />
                 <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Swarm.log</span>
              </div>
              <div className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[8px] font-black text-cyan-500 uppercase">
                STATUS: {isRunning ? 'PROCESSING' : 'IDLE'}
              </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-2 font-mono" ref={scrollRef}>
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-4">
                  <BrainCircuit size={64} />
                  <p className="text-[10px] uppercase tracking-[0.4em]">Awaiting Neural Handshake</p>
                </div>
              ) : (
                logs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] text-cyan-500/80 font-bold border-l-2 border-cyan-500/20 pl-3 py-1"
                  >
                    {log}
                  </motion.div>
                ))
              )}
            </div>

            <AnimatePresence>
              {finalResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-slate-900/90 border-t border-cyan-500/20 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Bot size={16} className="text-green-400" />
                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Final Intelligence Payload</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/10">
                      <div className="text-[8px] text-slate-500 font-bold uppercase mb-1">Status</div>
                      <div className="text-sm font-bold text-cyan-100">{finalResult.status}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/10">
                      <div className="text-[8px] text-slate-500 font-bold uppercase mb-1">Edge</div>
                      <div className="text-sm font-bold text-yellow-400">{finalResult.edge}</div>
                    </div>
                    <div className="col-span-full p-4 rounded-xl bg-slate-950 border border-cyan-500/10">
                      <div className="text-[8px] text-slate-500 font-bold uppercase mb-1">Insight</div>
                      <div className="text-xs text-slate-300 leading-relaxed">{finalResult.insight}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiAgentSwarm;
