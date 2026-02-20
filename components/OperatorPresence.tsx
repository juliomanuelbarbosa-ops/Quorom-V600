import React from 'react';
import { motion } from 'framer-motion';
import { Users, Circle } from 'lucide-react';
import useQuorumStore from './useQuorumStore';

const OperatorPresence: React.FC = () => {
  const { presence } = useQuorumStore();

  return (
    <div className="p-4 border-t border-cyan-500/10 bg-slate-900/40">
      <div className="flex items-center gap-2 mb-4">
        <Users size={14} className="text-cyan-500" />
        <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Live Operators</h4>
      </div>
      <div className="space-y-3">
        {presence.map((op) => (
          <div key={op.id} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-cyan-500/10 flex items-center justify-center text-[10px] font-bold text-cyan-900 group-hover:border-cyan-500/30 transition-all">
                  {op.name.substring(0, 2)}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${
                  op.status === 'online' ? 'bg-green-500' : op.status === 'away' ? 'bg-amber-500' : 'bg-slate-600'
                }`} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-200 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{op.name}</div>
                <div className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">{op.status} // {op.lastSeen}</div>
              </div>
            </div>
            <Circle size={8} className={`transition-colors ${op.status === 'online' ? 'text-green-500 fill-green-500' : 'text-slate-800'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperatorPresence;
