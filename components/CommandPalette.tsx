import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Zap, Globe, Shield, Cpu, Terminal, X, ChevronRight } from 'lucide-react';
import useQuorumStore from './useQuorumStore';

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { setActiveView, intelBriefs, missionLogs } = useQuorumStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  const modules = [
    { id: 'dashboard', label: 'Command Center', icon: <Terminal size={16} />, category: 'System' },
    { id: 'signal-nexus', label: 'Signal Nexus', icon: <Globe size={16} />, category: 'Intelligence' },
    { id: 'chain-sight', label: 'ChainSight', icon: <Shield size={16} />, category: 'Intelligence' },
    { id: 'gemini-oracle', label: 'Gemini Oracle', icon: <Cpu size={16} />, category: 'Neural' },
    { id: 'geo-vigilance', label: 'Geo Vigilance', icon: <Globe size={16} />, category: 'Security' },
  ];

  const filteredModules = modules.filter(m => 
    m.label.toLowerCase().includes(query.toLowerCase()) || 
    m.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-slate-950/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden"
      >
        <div className="p-4 border-b border-cyan-500/10 flex items-center gap-4">
          <Command size={20} className="text-cyan-500" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search modules, commands, or intelligence..."
            className="flex-1 bg-transparent border-none outline-none text-cyan-400 placeholder:text-cyan-900 font-mono text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-cyan-900 border border-cyan-900 px-1.5 py-0.5 rounded">ESC</span>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} className="text-cyan-900 hover:text-cyan-500 transition-colors" />
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
          {filteredModules.length > 0 && (
            <div className="mb-4">
              <div className="px-3 py-2 text-[10px] font-black text-cyan-900 uppercase tracking-widest">Modules</div>
              {filteredModules.map(m => (
                <button 
                  key={m.id}
                  onClick={() => { setActiveView(m.id); setIsOpen(false); }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-cyan-500/10 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 border border-cyan-500/10 text-cyan-500 group-hover:border-cyan-500/40 transition-all">
                      {m.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{m.label}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tighter">{m.category}</div>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-cyan-900 group-hover:text-cyan-500 transition-all" />
                </button>
              ))}
            </div>
          )}

          {query.length > 2 && (
            <div>
              <div className="px-3 py-2 text-[10px] font-black text-cyan-900 uppercase tracking-widest">Intelligence Matches</div>
              {intelBriefs.filter(b => b.content.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map(b => (
                <div key={b.id} className="p-3 rounded-xl hover:bg-slate-800/50 transition-all border border-transparent hover:border-cyan-500/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={12} className="text-cyan-500" />
                    <span className="text-[10px] font-bold text-cyan-700 uppercase">{b.type}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{b.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-950/50 border-t border-cyan-500/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-cyan-900 font-bold">↑↓</span>
              <span className="text-[10px] text-cyan-900">Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-cyan-900 font-bold">ENTER</span>
              <span className="text-[10px] text-cyan-900">Select</span>
            </div>
          </div>
          <div className="text-[10px] text-cyan-900 font-black uppercase tracking-widest">Quorum_OS_v6.0</div>
        </div>
      </motion.div>
    </div>
  );
};

export default CommandPalette;
