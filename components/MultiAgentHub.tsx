
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { Users, ArrowRight, Play, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface AgentState {
  role: string;
  status: 'idle' | 'running' | 'complete' | 'error';
  output: string;
}

const MultiAgentHub: React.FC = () => {
  const [task, setTask] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [agents, setAgents] = useState<AgentState[]>([
    { role: 'Planner', status: 'idle', output: '' },
    { role: 'Researcher', status: 'idle', output: '' },
    { role: 'Writer', status: 'idle', output: '' },
    { role: 'Critic', status: 'idle', output: '' },
  ]);

  const updateAgent = (role: string, updates: Partial<AgentState>) => {
    setAgents(prev => prev.map(a => a.role === role ? { ...a, ...updates } : a));
  };

  const executeSwarm = async () => {
    if (!task.trim() || isExecuting) return;

    setIsExecuting(true);
    setAgents(prev => prev.map(a => ({ ...a, status: 'idle', output: '' })));

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Step 1: Planner
      updateAgent('Planner', { status: 'running' });
      const planResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a highly technical 3-step plan to solve this task in a cyberpunk world: ${task}. Be concise.`,
      });
      const plan = planResponse.text || "Failed to generate plan.";
      updateAgent('Planner', { status: 'complete', output: plan });

      // Step 2: Researcher
      updateAgent('Researcher', { status: 'running' });
      const researchResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Based on this plan: ${plan}, provide deep technical context for task: ${task}. Focus on decentralized technologies.`,
      });
      const research = researchResponse.text || "Failed to research.";
      updateAgent('Researcher', { status: 'complete', output: research });

      // Step 3: Writer
      updateAgent('Writer', { status: 'running' });
      const writeResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Synthesize the research: ${research} into a final operative report for the mission: ${task}.`,
      });
      const report = writeResponse.text || "Failed to write.";
      updateAgent('Writer', { status: 'complete', output: report });

      // Step 4: Critic
      updateAgent('Critic', { status: 'running' });
      const criticResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Review this report: ${report}. Identify any security vulnerabilities or logical flaws from a zero-trust perspective.`,
      });
      updateAgent('Critic', { status: 'complete', output: criticResponse.text || "Audit complete." });

    } catch (error) {
      console.error(error);
      setAgents(prev => prev.map(a => a.status === 'running' ? { ...a, status: 'error', output: 'SIGNAL_INTERRUPTED' } : a));
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">SWARM COGNITION</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Multi-Agent Neural Orchestration</p>
        </div>
        <div className="flex space-x-2">
           <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400">LANGGRAPH.JS INSPIRED</div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl border border-cyan-500/20">
        <div className="flex space-x-4">
          <input 
            type="text" 
            placeholder="DEFINE MISSION OBJECTIVE (e.g. 'Audit the smart contract mesh' or 'Synthesize a post-quantum encryption strategy')"
            className="flex-1 bg-slate-900 border border-cyan-500/20 rounded p-4 text-cyan-400 placeholder-cyan-900 focus:outline-none focus:border-cyan-500 transition-all"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            disabled={isExecuting}
          />
          <button 
            onClick={executeSwarm}
            disabled={isExecuting || !task.trim()}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 px-8 rounded font-black text-xs tracking-[0.2em] flex items-center space-x-2 transition-all"
          >
            {isExecuting ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
            <span>INITIATE SWARM</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-500/10 -translate-y-1/2 pointer-events-none z-0" />
        
        {agents.map((agent, idx) => (
          <div key={idx} className="relative z-10 flex flex-col h-full">
            <div className={`glass-panel p-5 rounded-xl border transition-all duration-500 flex flex-col h-full ${
              agent.status === 'running' ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 
              agent.status === 'complete' ? 'border-green-500/40' : 'border-cyan-500/10'
            }`}>
              <div className="flex justify-between items-center mb-4">
                <span className={`text-[10px] font-bold tracking-widest uppercase ${
                  agent.status === 'running' ? 'text-cyan-400' : 'text-cyan-800'
                }`}>{agent.role}</span>
                {agent.status === 'running' && <Loader2 className="animate-spin text-cyan-400" size={14} />}
                {agent.status === 'complete' && <CheckCircle2 className="text-green-500" size={14} />}
                {agent.status === 'error' && <AlertCircle className="text-red-500" size={14} />}
              </div>
              
              <div className="flex-1">
                {agent.output ? (
                  <div className="text-[10px] text-slate-300 leading-relaxed font-mono whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar">
                    {agent.output}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 opacity-10">
                    <Users size={32} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isExecuting && (
        <div className="text-center">
          <motion.p 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[10px] text-cyan-500 font-bold tracking-[0.5em] uppercase"
          >
            Orchestrating multi-node consensus...
          </motion.p>
        </div>
      )}
    </div>
  );
};

export default MultiAgentHub;
