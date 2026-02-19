import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Settings, Globe, Loader2, Play, Power, Server } from 'lucide-react';

const OllamaLocalRunner: React.FC = () => {
  const [endpoint, setEndpoint] = useState('http://localhost:11434');
  const [status, setStatus] = useState<'offline' | 'checking' | 'online'>('offline');
  const [models, setModels] = useState<string[]>([]);

  const checkOllama = () => {
    setStatus('checking');
    // Simulated check - in reality this would fetch http://localhost:11434/api/tags
    setTimeout(() => {
      setStatus('online');
      setModels(['llama3:8b', 'mistral:latest', 'phi3:mini', 'codellama:7b']);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">OLLAMA LOCAL</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Sovereign LLM Node Management</p>
        </div>
        <div className={`px-3 py-1 rounded text-[10px] font-black tracking-widest uppercase transition-colors ${
          status === 'online' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {status.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-widest flex items-center space-x-2">
              <Server size={20} className="text-cyan-400" />
              <span>Node Settings</span>
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] text-cyan-900 font-bold uppercase block">API Endpoint</label>
              <input type="text" value={endpoint} onChange={(e) => setEndpoint(e.target.value)}
                className="w-full bg-slate-900 border border-cyan-500/20 rounded p-3 text-cyan-400 focus:outline-none focus:border-cyan-500 font-mono text-xs" />
            </div>
          </div>

          <button onClick={checkOllama} disabled={status === 'checking'}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 rounded font-black text-xs tracking-[0.3em] transition-all flex items-center justify-center space-x-2">
            {status === 'checking' ? <Loader2 className="animate-spin" size={16} /> : <Power size={16} />}
            <span>SYNC NODE</span>
          </button>

          <div className="p-4 bg-slate-950 border border-cyan-500/10 rounded space-y-2">
            <div className="text-[10px] text-cyan-800 font-black uppercase">Available Matrix</div>
            {models.length > 0 ? (
              <div className="space-y-1">
                {models.map(m => (
                  <div key={m} className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>{m}</span>
                    <Play size={10} className="text-cyan-900" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-slate-600 italic">No nodes detected in local mesh.</p>
            )}
          </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-cyan-500/10 bg-slate-900/50 flex flex-col justify-center text-center space-y-6">
          <Terminal size={64} className="mx-auto text-cyan-900/20" />
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-cyan-400 uppercase tracking-widest">SOVEREIGN CHAT</h3>
            <p className="text-xs text-slate-500">Synchronize with your local Ollama node to enable high-intelligence chat with zero external latency.</p>
          </div>
          <button disabled={status !== 'online'}
            className="bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-cyan-400 py-3 px-6 rounded text-[10px] font-black tracking-[0.2em] border border-cyan-500/20 transition-all">
            LAUNCH LOCAL CONSOLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default OllamaLocalRunner;