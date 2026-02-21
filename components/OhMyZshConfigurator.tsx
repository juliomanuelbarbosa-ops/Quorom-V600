import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Check, Copy, Palette, Sparkles } from 'lucide-react';

const THEMES = [
  { name: 'agnoster', color: 'bg-cyan-500', text: 'text-slate-950', prompt: '➜ ~ user' },
  { name: 'robbyrussell', color: 'bg-green-500', text: 'text-slate-950', prompt: '➜  ~' },
  { name: 'pure', color: 'bg-slate-800', text: 'text-cyan-400', prompt: '~ user' },
  { name: 'af-magic', color: 'bg-purple-500', text: 'text-slate-950', prompt: '[user@host:~]' },
];

const OhMyZshConfigurator: React.FC = () => {
  const [selected, setSelected] = useState(THEMES[0]);
  const [copied, setCopied] = useState(false);

  const copyConfig = () => {
    navigator.clipboard.writeText(`ZSH_THEME="${selected.name}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">OH MY ZSH</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Terminal Aesthetics Orchestration</p>
        </div>
        <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400 font-bold tracking-widest uppercase">
          Shell: ZSH
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="glass-panel p-6 rounded-xl border border-cyan-500/20 space-y-4">
            <h3 className="text-xs font-black text-cyan-600 uppercase tracking-widest mb-4 flex items-center space-x-2">
              <Palette size={14} /> <span>Theme Matrix</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setSelected(theme)}
                  className={`p-4 rounded-lg border transition-all text-center ${
                    selected.name === theme.name
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-cyan-500/10 bg-slate-900 hover:border-cyan-500/30'
                  }`}
                >
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${selected.name === theme.name ? 'text-cyan-400' : 'text-slate-500'}`}
                  >
                    {theme.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-cyan-500/20 bg-slate-900/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-cyan-800 uppercase tracking-widest">
                Configuration Payload
              </span>
              <button onClick={copyConfig} className="text-cyan-400 hover:text-cyan-200 transition-colors">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <code className="text-xs text-cyan-500 font-mono">
              ZSH_THEME=&quot;<span className="text-white">{selected.name}</span>&quot;
            </code>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="glass-panel rounded-xl border border-cyan-500/20 bg-slate-950 flex flex-col flex-1 overflow-hidden shadow-2xl">
            <div className="p-3 bg-slate-900 border-b border-cyan-500/10 flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[9px] font-bold text-cyan-900 uppercase tracking-widest">TermView: v600-Shell</span>
            </div>

            <div className="p-8 font-mono text-sm space-y-4">
              <div className="flex items-center space-x-2">
                <span className={`${selected.color} ${selected.text} px-2 py-0.5 rounded text-xs font-bold`}>
                  {selected.prompt}
                </span>
                <span className="text-cyan-400 animate-pulse">|</span>
              </div>
              <div className="text-slate-500 text-xs">
                $ ls -la
                <br />
                drwxr-xr-x 2 user staff 64 Feb 19 14:20 .<br />
                drwxr-xr-x 3 user staff 96 Feb 19 14:20 ..
                <br />
                -rw-r--r-- 1 user staff 12 Feb 19 14:20 config.zsh
                <br />
              </div>
            </div>

            <div className="mt-auto p-4 border-t border-cyan-500/5 text-center">
              <span className="text-[8px] text-cyan-900 font-black uppercase tracking-[0.4em] flex items-center justify-center space-x-2">
                <Sparkles size={10} /> <span>Instant Visual Sync Ready</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OhMyZshConfigurator;
