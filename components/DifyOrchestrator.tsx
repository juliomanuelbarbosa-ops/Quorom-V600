
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Command, Layers, Database, Zap, Play, 
  Settings, Loader2, Star, ExternalLink, 
  Layout, MessageSquare, Terminal, Shield,
  Search, FileText, Share2, Sparkles, Cpu,
  RefreshCcw
} from 'lucide-react';

interface DifyApp {
  id: string;
  name: string;
  type: 'Chatbot' | 'Agent' | 'Workflow';
  status: 'Published' | 'Draft';
  lastModified: string;
}

const DifyOrchestrator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Apps' | 'Knowledge' | 'Tools'>('Apps');
  const [isSyncing, setIsSyncing] = useState(false);
  const [apps] = useState<DifyApp[]>([
    { id: '1', name: 'QUORUM_ADVISOR_BOT', type: 'Chatbot', status: 'Published', lastModified: '2m ago' },
    { id: '2', name: 'MESH_SECURITY_AGENT', type: 'Agent', status: 'Published', lastModified: '1h ago' },
    { id: '3', name: 'DATA_ETL_WORKFLOW', type: 'Workflow', status: 'Draft', lastModified: '12h ago' }
  ]);

  const syncKnowledge = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Command size={36} className="text-cyan-500" />
            DIFY ORCHESTRATOR
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Enterprise LLM Application Platform / v0.10.0
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded">
            <Star size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-400 uppercase">60K STARS</span>
          </div>
          <a href="https://github.com/langgenius/dify" target="_blank" rel="noopener noreferrer" className="text-cyan-900 hover:text-cyan-400 transition-colors">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="flex gap-1 p-1 bg-slate-900/50 rounded-xl border border-cyan-500/10 w-fit">
        {(['Apps', 'Knowledge', 'Tools'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'text-cyan-900 hover:text-cyan-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'Apps' && (
            <motion.div 
              key="apps"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {apps.map((app) => (
                <div key={app.id} className="glass-panel p-6 rounded-2xl border border-cyan-500/10 hover:border-cyan-500/40 transition-all group flex flex-col h-fit relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                    <Layout size={80} className="text-cyan-500" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-2 rounded-lg bg-slate-900 border border-cyan-500/20 text-cyan-400`}>
                      {app.type === 'Chatbot' ? <MessageSquare size={18} /> : app.type === 'Agent' ? <Cpu size={18} /> : <Layers size={18} />}
                    </div>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${
                      app.status === 'Published' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-slate-800 border-slate-700 text-slate-500'
                    } uppercase tracking-widest`}>
                      {app.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-100 group-hover:text-cyan-400 transition-colors mb-1 uppercase tracking-tight">
                    {app.name}
                  </h3>
                  <div className="text-[9px] text-cyan-900 font-bold uppercase tracking-widest mb-8">
                    Type: {app.type} / Last Sync: {app.lastModified}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <button className="py-2 bg-slate-950 border border-cyan-500/10 rounded-lg text-[9px] font-black uppercase text-cyan-800 hover:text-cyan-400 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2">
                      <Settings size={12} /> Config
                    </button>
                    <button className="py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-[9px] font-black uppercase text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center justify-center gap-2">
                      <Play size={12} /> Run Node
                    </button>
                  </div>
                </div>
              ))}

              <button className="border-2 border-dashed border-cyan-900/20 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 group hover:border-cyan-500/40 transition-all hover:bg-cyan-500/5 min-h-[220px]">
                 <div className="w-12 h-12 rounded-full border border-cyan-900/50 flex items-center justify-center text-cyan-900 group-hover:text-cyan-400 group-hover:border-cyan-400 transition-all">
                    <Sparkles size={24} />
                 </div>
                 <div className="text-[10px] font-black text-cyan-900 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">Create New App</div>
              </button>
            </motion.div>
          )}

          {activeTab === 'Knowledge' && (
            <motion.div 
              key="knowledge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            >
              <div className="lg:col-span-3 glass-panel p-8 rounded-3xl border border-cyan-500/20 bg-slate-950/40 flex flex-col min-h-[500px]">
                 <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-2">
                       <Database size={20} className="text-cyan-500" />
                       <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest">RAG Knowledge Base</h3>
                    </div>
                    <button 
                      onClick={syncKnowledge}
                      disabled={isSyncing}
                      className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-[9px] font-black uppercase tracking-widest flex items-center gap-2"
                    >
                      {isSyncing ? <Loader2 size={12} className="animate-spin" /> : <RefreshCcw size={12} />}
                      {isSyncing ? 'Syncing...' : 'Sync Index'}
                    </button>
                 </div>

                 <div className="flex-1 space-y-4">
                    <div className="p-4 bg-slate-900 border border-cyan-500/10 rounded-xl flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                       <div className="flex items-center gap-4">
                          <FileText size={20} className="text-cyan-800" />
                          <div>
                             <div className="text-xs font-bold text-slate-200">QUORUM_WHITEPAPER_v6.PDF</div>
                             <div className="text-[8px] text-cyan-900 font-bold uppercase tracking-widest">248 Chunks / Indexed</div>
                          </div>
                       </div>
                       <div className="text-[8px] font-black text-green-500 uppercase tracking-widest">Healthy</div>
                    </div>
                    <div className="p-4 bg-slate-900 border border-cyan-500/10 rounded-xl flex items-center justify-between group hover:border-cyan-500/30 transition-all opacity-50">
                       <FileText size={20} className="text-cyan-800" />
                       <div className="flex-1 ml-4">
                          <div className="text-xs font-bold text-slate-200">MESH_NETWORK_TOPOLOGY.MD</div>
                          <div className="text-[8px] text-cyan-900 font-bold uppercase tracking-widest">Awaiting Semantic Parsing...</div>
                       </div>
                       <Loader2 size={14} className="animate-spin text-cyan-800" />
                    </div>
                 </div>

                 <div className="mt-8 p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <Terminal size={18} className="text-cyan-900" />
                       <span className="text-[9px] text-cyan-800 font-black uppercase tracking-widest">Total Vector Count: 1.2M Records</span>
                    </div>
                    <button className="text-[9px] font-black text-cyan-400 hover:text-cyan-200 uppercase tracking-widest transition-colors flex items-center gap-2">
                       Analyze Embedding Load <Share2 size={12} />
                    </button>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="glass-panel p-6 rounded-2xl border border-cyan-500/10 bg-slate-900/40">
                    <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-6">Semantic Config</h3>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <div className="flex justify-between text-[8px] font-bold text-cyan-900 uppercase">
                             <span>Top-K Retrieval</span>
                             <span>4</span>
                          </div>
                          <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                             <div className="h-full bg-cyan-500 w-1/4" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between text-[8px] font-bold text-cyan-900 uppercase">
                             <span>Rerank Similarity</span>
                             <span>0.72</span>
                          </div>
                          <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                             <div className="h-full bg-cyan-500 w-3/4" />
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl space-y-4">
                    <div className="flex items-center gap-3">
                       <Shield className="text-cyan-500" size={18} />
                       <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Audit Logs</h3>
                    </div>
                    <div className="font-mono text-[8px] text-cyan-900 space-y-1.5 uppercase">
                       <p>[14:22] {'>'} Indexing chunk #421</p>
                       <p>[14:23] {'>'} Vector collision detected</p>
                       <p>[14:25] {'>'} Embedding manifold stable</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/10 flex items-center gap-3">
           <Zap size={16} className="text-cyan-900" />
           <div>
              <div className="text-[8px] text-cyan-900 font-black uppercase">API Load</div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase">Optimal</div>
           </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/10 flex items-center gap-3">
           <Search size={16} className="text-cyan-900" />
           <div>
              <div className="text-[8px] text-cyan-900 font-black uppercase">Search Latency</div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase">12ms</div>
           </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/10 flex items-center gap-3">
           <Layers size={16} className="text-cyan-900" />
           <div>
              <div className="text-[8px] text-cyan-900 font-black uppercase">Orchestrator</div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase">v0.10.0</div>
           </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/10 flex items-center gap-3">
           <Shield size={16} className="text-cyan-900" />
           <div>
              <div className="text-[8px] text-cyan-900 font-black uppercase">Access Control</div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase">RBAC_ACTIVE</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DifyOrchestrator;
