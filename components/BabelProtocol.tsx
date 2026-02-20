import React, { useState, useEffect, useRef } from 'react';
import { Network, GitMerge, Zap, Cpu } from 'lucide-react';

interface BabelProtocolProps {
  onTaskComplete?: (brief: any) => void;
}

interface AgentLog {
  agent: string;
  msg: string;
}

const BabelProtocol: React.FC<BabelProtocolProps> = ({ onTaskComplete }) => {
  const [activeTask, setActiveTask] = useState('Standby');
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const hasRun = useRef(false);

  const agents: Record<string, { name: string; role?: string; color: string; border: string }> = {
    Orchestrator: { name: 'The Oracle', color: 'text-slate-200', border: 'border-slate-500' },
    Grok: { name: 'Grok 4.20', role: 'Sentiment', color: 'text-red-500', border: 'border-red-500/50' },
    DeepSeek: { name: 'DeepSeek R1', role: 'Math', color: 'text-emerald-500', border: 'border-emerald-500/50' }
  };

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Simulating the backend SSE connection
    const runSwarmSimulation = async () => {
      setActiveTask('Analyzing Arbitrage Opportunity: NBA Finals');
      setIsProcessing(true);
      setAgentLogs([]);

      const mockSequence = [
        { agent: 'Orchestrator', msg: 'Task received. Delegating to swarm...' },
        { agent: 'Grok', msg: 'High variance detected. Star player questionable.' },
        { agent: 'DeepSeek', msg: 'Arbitrage found. Guaranteed profit: +1.8%.' },
        { agent: 'Orchestrator', msg: 'Consensus reached. Injecting data into Intel Feed.' }
      ];

      for (let i = 0; i < mockSequence.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setAgentLogs(prev => [...prev, mockSequence[i]]);
        
        // On the final step, push the data up to the parent App.js
        if (i === mockSequence.length - 1 && onTaskComplete) {
          onTaskComplete({
            id: `intel-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toLocaleTimeString(),
            type: 'ARBITRAGE EDGE',
            content: 'NBA Finals: +1.8% EV discrepancy located between DraftKings and FanDuel using Kelly sizing.',
            severity: 'medium'
          });
        }
      }
      
      setIsProcessing(false);
      setActiveTask('Task Completed. Awaiting next command.');
    };

    // Trigger simulation once for demonstration
    runSwarmSimulation();
  }, [onTaskComplete]);

  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Network className="text-teal-400 w-6 h-6" />
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">BabelProtocol</h2>
        </div>
        <div className="flex items-center gap-2">
          <Cpu className={`w-5 h-5 ${isProcessing ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500 block mb-1 font-bold tracking-widest">CURRENT DIRECTIVE</span>
          <span className="text-sm text-yellow-400 font-bold">{activeTask}</span>
        </div>
        {isProcessing && <Zap className="text-yellow-400 w-5 h-5 animate-pulse" />}
      </div>

      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-y-auto space-y-3 custom-scrollbar">
        {agentLogs.map((log, index) => (
          <div key={index} className="flex gap-3 text-sm animate-fade-in">
            <div className={`font-bold mr-2 ${agents[log.agent]?.color || 'text-slate-200'}`}>
              [{agents[log.agent]?.name || log.agent}]
            </div>
            <div className="text-slate-400">{log.msg}</div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex gap-3 text-sm">
            <GitMerge className="w-4 h-4 text-slate-500 animate-spin mt-0.5" />
            <span className="text-slate-500">Awaiting agent response...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BabelProtocol;
