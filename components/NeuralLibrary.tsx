import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Library, ExternalLink, Search, Globe, 
  Database, Zap, Sparkles, Filter, 
  Layers, Binary, Share2, Info
} from 'lucide-react';

interface DirectoryNode {
  name: string;
  url: string;
  description: string;
  type: 'Meta' | 'Tools' | 'Models' | 'Dev';
}

const DIRECTORY_DATA: DirectoryNode[] = [
  { name: "FutureTools", url: "https://www.futuretools.io", description: "Matt Wolfe's curated database of the best AI tools.", type: 'Tools' },
  { name: "Futurepedia", url: "https://www.futurepedia.io", description: "The largest AI tools directory, updated daily.", type: 'Tools' },
  { name: "Best-of-AI", url: "https://github.com/best-of-ai/ai-directories", description: "Comprehensive manifest of global AI directories.", type: 'Meta' },
  { name: "There's an AI for That", url: "https://theresanaiforthat.com", description: "The most comprehensive AI tracker in the world.", type: 'Tools' },
  { name: "Hugging Face", url: "https://huggingface.co", description: "The central platform for open-source AI models and datasets.", type: 'Models' },
  { name: "AIXploria", url: "https://www.aixploria.com", description: "Elegant directory focusing on European and global AI projects.", type: 'Meta' },
  { name: "Papers with Code", url: "https://paperswithcode.com", description: "The state-of-the-art in machine learning research with source code.", type: 'Dev' },
  { name: "AlternativeTo AI", url: "https://alternativeto.net/category/ai/", description: "Crowdsourced database of AI software alternatives.", type: 'Tools' },
  { name: "Vercel AI SDK", url: "https://sdk.vercel.ai", description: "The best directory for building and exploring AI-powered UIs.", type: 'Dev' }
];

const NeuralLibrary: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = DIRECTORY_DATA.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) || 
    d.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-indigo-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-indigo-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Library size={36} className="text-indigo-500" />
            NEURAL LIBRARY
          </h2>
          <p className="text-indigo-900 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Meta-Directory Protocol / Best-of-AI Integration
          </p>
        </div>
        <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] text-indigo-400 font-black uppercase tracking-widest">
          Nodes Indexed: {DIRECTORY_DATA.length}
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search size={20} className="text-indigo-900 group-focus-within:text-indigo-400 transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="QUERY THE GLOBAL META-MESH..."
          className="w-full bg-slate-900/40 border border-indigo-500/20 rounded-2xl py-5 pl-14 pr-6 text-indigo-400 placeholder-indigo-900 focus:outline-none focus:border-indigo-500 transition-all font-bold tracking-wider"
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((node, idx) => (
          <motion.div 
            key={node.url}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-panel p-6 rounded-2xl border border-indigo-500/10 hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all group flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase border ${
                node.type === 'Meta' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                node.type === 'Models' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
              }`}>
                {node.type}
              </span>
              <a href={node.url} target="_blank" rel="noopener noreferrer" className="text-indigo-900 hover:text-indigo-400 transition-all">
                <ExternalLink size={16} />
              </a>
            </div>

            <h3 className="text-lg font-black text-slate-100 group-hover:text-indigo-400 transition-colors mb-2 uppercase tracking-tight">
              {node.name}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-6 opacity-80 flex-1">
              {node.description}
            </p>

            <div className="pt-4 border-t border-indigo-500/5 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Globe size={10} className="text-indigo-900" />
                <span className="text-[8px] font-black text-indigo-900 uppercase">Public Node</span>
              </div>
              <button className="text-[8px] font-black text-indigo-500 hover:text-indigo-300 uppercase tracking-widest">
                LAUNCH ARCHIVE
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl flex items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
            <Share2 size={32} className="text-indigo-400" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest font-mono">Mesh Contribution Protocol</h4>
            <p className="text-[10px] text-indigo-900 font-bold uppercase leading-relaxed max-w-lg italic">
              "The explosion of AI necessitates a decentralized map of intelligence." - Quorum Kernel
            </p>
          </div>
        </div>
        <div className="hidden lg:block h-10 w-px bg-indigo-500/20" />
        <div className="hidden lg:flex items-center gap-8">
           <div className="text-right">
             <div className="text-[8px] text-indigo-900 font-black uppercase">P2P Discovery</div>
             <div className="text-xs font-black text-green-500">ACTIVE</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralLibrary;