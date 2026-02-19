
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Star, GitBranch, Terminal, ExternalLink, 
  Search, Filter, Zap, Code2, Globe, Cpu, Bot
} from 'lucide-react';

interface OSProject {
  name: string;
  repo: string;
  description: string;
  category: 'Agent' | 'Diffusion' | 'LLM' | 'Tools' | 'Orchestration';
  language: string;
  stars: string;
}

const OS_PROJECTS: OSProject[] = [
  { name: "AutoGPT", repo: "Significant-Gravitas/AutoGPT", description: "An experimental open-source attempt to make GPT-4 fully autonomous.", category: 'Agent', language: 'Python', stars: "165k" },
  { name: "ComfyUI", repo: "comfyanonymous/ComfyUI", description: "The most powerful and modular stable diffusion GUI with a graph-based interface.", category: 'Diffusion', language: 'Python', stars: "48k" },
  { name: "OpenDevin", repo: "OpenDevin/OpenDevin", description: "An autonomous AI software engineer that can build and deploy applications.", category: 'Agent', language: 'TypeScript', stars: "32k" },
  { name: "LocalGPT", repo: "PromtEngineer/localGPT", description: "Chat with your documents locally using LLMs without any data leakage.", category: 'LLM', language: 'Python', stars: "21k" },
  { name: "LangChain", repo: "langchain-ai/langchain", description: "Building applications with LLMs through composability and modularity.", category: 'Orchestration', language: 'Python', stars: "89k" },
  { name: "Ollama", repo: "ollama/ollama", description: "Get up and running with large language models locally.", category: 'Tools', language: 'Go', stars: "92k" },
  { name: "Stable Diffusion WebUI", repo: "AUTOMATIC1111/stable-diffusion-webui", description: "Browser interface for Stable Diffusion based on Gradio library.", category: 'Diffusion', language: 'Python', stars: "135k" },
  { name: "Fabric", repo: "danielmiessler/fabric", description: "An open-source framework for augmenting humans using AI.", category: 'Tools', language: 'Python', stars: "18k" },
  { name: "GPT-Pilot", repo: "Pythagora-io/gpt-pilot", description: "The first real AI developer that builds apps from scratch.", category: 'Agent', language: 'Python', stars: "28k" }
];

const OSProjectRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => ['All', 'Agent', 'Diffusion', 'LLM', 'Tools', 'Orchestration'], []);

  const filteredProjects = useMemo(() => 
    OS_PROJECTS.filter(p => 
      (activeCategory === 'All' || p.category === activeCategory) &&
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [searchTerm, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-emerald-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Github size={36} className="text-emerald-500" />
            OS PROJECT HUB
          </h2>
          <p className="text-emerald-900 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Auditing Global Neural Repositories / AIXploria Protocol
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                  : 'bg-slate-900/50 text-emerald-800 border-emerald-500/10 hover:text-emerald-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search size={20} className="text-emerald-900 group-focus-within:text-emerald-400 transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="QUERY THE GITHUB AI MANIFEST..."
          className="w-full bg-slate-900/40 border border-emerald-500/20 rounded-2xl py-5 pl-14 pr-6 text-emerald-400 placeholder-emerald-900 focus:outline-none focus:border-emerald-500 transition-all font-bold tracking-wider"
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.div 
              key={project.repo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel p-6 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/40 hover:bg-slate-900/60 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:opacity-[0.1] transition-opacity">
                <Github size={60} className="text-emerald-500" />
              </div>

              <div className="flex justify-between items-start mb-4">
                <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-black px-2.5 py-1 rounded-full border border-emerald-500/20 tracking-widest uppercase">
                  {project.category}
                </span>
                <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1 text-emerald-900 group-hover:text-emerald-500 transition-colors">
                      <Star size={12} />
                      <span className="text-[10px] font-black">{project.stars}</span>
                   </div>
                   <a 
                    href={`https://github.com/${project.repo}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-emerald-900 hover:text-emerald-400 transition-all"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              
              <h3 className="text-lg font-black text-slate-100 group-hover:text-emerald-400 transition-colors mb-2 uppercase tracking-tight">
                {project.name}
              </h3>
              
              <p className="text-slate-400 text-[11px] leading-relaxed mb-6 font-medium opacity-80 h-12 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-emerald-500/10">
                 <div className="flex items-center gap-2">
                    <Code2 size={12} className="text-emerald-900" />
                    <span className="text-[9px] font-black text-emerald-800 uppercase">{project.language}</span>
                 </div>
                 <button className="text-[8px] font-black text-emerald-500 hover:text-emerald-300 uppercase tracking-[0.2em] transition-colors flex items-center gap-2">
                    <Zap size={10} />
                    Audit Source
                 </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center space-x-6">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
               <Bot size={28} className="text-emerald-400" />
            </div>
            <div>
               <div className="text-xs text-emerald-400 font-black uppercase tracking-widest">Discovery Engine: SYNCED</div>
               <div className="text-[10px] text-emerald-900 font-bold uppercase tracking-widest mt-1 italic">
                 Sourced via AIXploria Global Open Source Registry
               </div>
            </div>
         </div>
         <a 
           href="https://www.aixploria.com/en/category/github-project-ai/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-xl font-black text-[10px] tracking-[0.2em] transition-all uppercase shadow-lg shadow-emerald-500/20 flex items-center gap-3"
         >
           View External Registry
           <Globe size={14} />
         </a>
      </div>
    </div>
  );
};

export default OSProjectRegistry;
