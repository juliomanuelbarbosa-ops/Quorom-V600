import React, { useState } from 'react';
import { Terminal, Trophy, CheckCircle2, Circle, Zap } from 'lucide-react';
import useQuorumStore, { MissionLogEntry } from './useQuorumStore';

const MissionLog = () => {
  const { missionLogs: logs, addMissionLog } = useQuorumStore();

  const [currentTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));

  return (
    <div className="flex flex-col h-full bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden font-mono">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-emerald-500" />
          <h3 className="text-white text-sm font-bold tracking-widest uppercase">Mission_Log_v2.0</h3>
        </div>
        <div className="text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
          SYSTEM_TIME: {currentTime}
        </div>
      </div>

      {/* Log Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {logs.map((log) => (
          <div 
            key={log.id} 
            className={`relative group p-3 rounded-lg border transition-all duration-300 ${
              log.type === 'ACHIEVEMENT' 
                ? 'bg-purple-500/5 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                : 'bg-slate-800/20 border-slate-800 hover:border-emerald-500/40'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="mt-1">
                  {log.type === 'ACHIEVEMENT' ? (
                    <Trophy size={16} className="text-purple-400 animate-bounce" />
                  ) : log.status === 'complete' ? (
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  ) : (
                    <Circle size={16} className="text-slate-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                      log.type === 'ACHIEVEMENT' 
                        ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' 
                        : 'bg-slate-900 border-slate-700 text-slate-500'
                    }`}>
                      {log.type}
                    </span>
                    <span className="text-[10px] text-slate-500">{log.time}</span>
                  </div>
                  <p className={`text-sm mt-1 ${log.type === 'ACHIEVEMENT' ? 'text-slate-200 font-bold' : 'text-slate-400'}`}>
                    {log.text}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-emerald-500">+{log.xp} XP</div>
                <div className={`text-[8px] uppercase tracking-tighter ${
                  log.status === 'complete' || log.status === 'unlocked' ? 'text-emerald-500/50' : 'text-slate-600'
                }`}>
                  {log.status}
                </div>
              </div>
            </div>
            
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-lg ${
              log.type === 'ACHIEVEMENT' ? 'shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]' : 'shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Footer / Stats */}
      <div className="p-3 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-500 uppercase tracking-widest">Total XP</span>
            <span className="text-xs font-bold text-emerald-500">{logs.reduce((acc, curr) => acc + curr.xp, 0)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-500 uppercase tracking-widest">Missions</span>
            <span className="text-xs font-bold text-white">{logs.filter(l => l.type === 'TASK').length}</span>
          </div>
        </div>
        <button 
          onClick={() => {
            const newLog: MissionLogEntry = {
              id: Date.now(),
              type: 'TASK',
              status: 'pending',
              text: 'New manual task initialized',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
              xp: 100
            };
            addMissionLog(newLog);
          }}
          className="p-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition-all group"
        >
          <Zap size={14} className="text-emerald-500 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default MissionLog;
