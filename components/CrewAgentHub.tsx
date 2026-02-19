
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Rocket, Users, Target, Loader2, Play, CheckCircle2 } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  agent: string;
  status: 'pending' | 'active' | 'done';
}

const INITIAL_TASKS: Task[] = [
  { id: '1', name: "Market Vulnerability Scan", agent: "Researcher", status: 'done' },
  { id: '2', name: "Competitive Mesh Analysis", agent: "Analyst", status: 'active' },
  { id: '3', name: "Tactical Response Draft", agent: "Strategist", status: 'pending' }
];

const CrewAgentHub: React.FC = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [crewRunning, setCrewRunning] = useState(false);

  const startCrew = () => {
    setCrewRunning(true);
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === '2' ? { ...t, status: 'done' } : t.id === '3' ? { ...t, status: 'active' } : t));
      setTimeout(() => {
        setTasks(prev => prev.map(t => ({ ...t, status: 'done' })));
        setCrewRunning(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">CREW AI OPS</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Multi-Agent Task Orchestration</p>
        </div>
        <button 
          onClick={startCrew}
          disabled={crewRunning}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-2 rounded font-black text-xs tracking-widest flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20"
        >
          {crewRunning ? <Loader2 className="animate-spin" size={16} /> : <Rocket size={16} />}
          <span>LAUNCH CREW</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="glass-panel p-6 rounded-xl border border-cyan-500/20 bg-slate-900/40">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-6 flex items-center space-x-2">
              <Target size={16} /> <span>Task Pipeline</span>
            </h3>
            
            <div className="space-y-4">
              {tasks.map((task, idx) => (
                <div key={task.id} className={`p-4 rounded-lg border flex items-center justify-between transition-all ${
                  task.status === 'done' ? 'bg-green-500/5 border-green-500/20' : 
                  task.status === 'active' ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.1)]' : 
                  'bg-slate-950/50 border-cyan-500/10 opacity-50'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                      task.status === 'done' ? 'bg-green-500 text-slate-950' : 
                      task.status === 'active' ? 'bg-cyan-500 text-slate-950 animate-pulse' : 
                      'bg-slate-800 text-cyan-900'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-100 uppercase tracking-wider">{task.name}</div>
                      <div className="text-[8px] text-cyan-800 font-black uppercase tracking-widest mt-1">Assigned to: {task.agent}</div>
                    </div>
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-[0.2em]">
                    {task.status === 'done' && <CheckCircle2 className="text-green-500" size={16} />}
                    {task.status === 'active' && <span className="text-cyan-400">Processing...</span>}
                    {task.status === 'pending' && <span className="text-cyan-900">Awaiting Signal</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-cyan-500/20">
             <h3 className="text-xs font-black text-cyan-600 uppercase tracking-widest mb-4 flex items-center space-x-2">
               <Users size={16} /> <span>Active Crew</span>
             </h3>
             <div className="space-y-4">
               {['Researcher', 'Analyst', 'Strategist'].map(agent => (
                 <div key={agent} className="flex items-center space-x-3">
                   <div className="w-10 h-10 bg-slate-900 rounded-lg border border-cyan-500/10 flex items-center justify-center">
                     <Users size={18} className="text-cyan-800" />
                   </div>
                   <div>
                     <div className="text-[10px] font-bold text-slate-200 uppercase">{agent} Agent</div>
                     <div className="flex items-center space-x-1 mt-1">
                        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[8px] text-cyan-900 font-bold uppercase">Online</span>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded flex items-start space-x-3">
             <Network size={16} className="text-cyan-800 flex-shrink-0 mt-0.5" />
             <p className="text-[9px] text-cyan-800 font-bold uppercase leading-tight">
               Autonomous agents sync via local mesh sockets. All reasoning steps are recorded in the sovereign ledger.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewAgentHub;
