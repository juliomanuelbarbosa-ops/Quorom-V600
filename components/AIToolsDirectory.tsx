import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Zap, Info, Shield, Filter, Globe, Sparkles, Code, Image, Mic, MessageSquare, Briefcase, Atom } from 'lucide-react';
import { AITool } from '../types';

const AI_TOOLS: AITool[] = [
  // DISCOVERY & DIRECTORIES
  { name: "AIXploria", category: "Discovery", description: "The definitive encyclopedia of AI tools and GitHub projects.", link: "https://www.aixploria.com" },
  { name: "FutureTools", category: "Discovery", description: "Curated collection of the latest AI tools by Matt Wolfe.", link: "https://www.futuretools.io" },

  // LLMs & CORE MODELS
  { name: "Gemini 3 Pro", category: "LLM", description: "Advanced reasoning and coding capabilities by Google.", link: "https://aistudio.google.com" },
  { name: "Claude 3.5 Sonnet", category: "LLM", description: "High-intelligence conversational AI by Anthropic.", link: "https://claude.ai" },
  { name: "GPT-4o", category: "LLM", description: "OpenAI flagship multimodal model.", link: "https://chatgpt.com" },
  { name: "Llama 3.1 405B", category: "LLM", description: "Meta's state-of-the-art open model.", link: "https://ai.meta.com" },
  { name: "Mistral Large 2", category: "LLM", description: "Europe's leading AI flagship.", link: "https://mistral.ai" },
  { name: "DeepSeek V3", category: "LLM", description: "Highly efficient MoE model from China.", link: "https://deepseek.com" },
  
  // DEVELOPER & CODING
  { name: "Cursor", category: "Development", description: "AI-native code editor built for pair programming.", link: "https://cursor.com" },
  { name: "Lovable", category: "Development", description: "Full-stack AI development platform for rapid apps.", link: "https://lovable.dev" },
  { name: "Supermaven", category: "Development", description: "The fastest code completion tool for developers.", link: "https://supermaven.com" },
  { name: "Replit Agent", category: "Development", description: "Build full applications from natural language.", link: "https://replit.com" },
  { name: "V0.dev", category: "Development", description: "Generative UI for React and Tailwind components.", link: "https://v0.dev" },
  { name: "Codeium", category: "Development", description: "Free AI coding assistant for every editor.", link: "https://codeium.com" },
  
  // IMAGE & VISUAL SYNTHESIS
  { name: "Flux.1", category: "Visual", description: "The new standard for open-weight image generation.", link: "https://blackforestlabs.ai" },
  { name: "Midjourney v6.1", category: "Visual", description: "Industry standard for artistic image generation.", link: "https://midjourney.com" },
  { name: "Krea AI", category: "Visual", description: "Real-time AI creative tools for designers.", link: "https://krea.ai" },
  { name: "Leonardo AI", category: "Visual", description: "Production-quality assets with incredible speed.", link: "https://leonardo.ai" },
  { name: "Magnific AI", category: "Visual", description: "Extreme AI upscaling and enhancement.", link: "https://magnific.ai" },
  { name: "Adobe Firefly", category: "Visual", description: "Ethical generative AI for commercial design.", link: "https://adobe.com/firefly" },
  
  // AUDIO & SPEECH
  { name: "ElevenLabs", category: "Audio", description: "Most realistic AI speech synthesis available.", link: "https://elevenlabs.io" },
  { name: "Suno AI v4", category: "Audio", description: "Full song generation with lyrics and melody.", link: "https://suno.com" },
  { name: "Udio", category: "Audio", description: "Cinematic quality AI music generation.", link: "https://udio.com" },
  { name: "Descript", category: "Audio", description: "AI-powered video and podcast editing.", link: "https://descript.com" },
  { name: "Riverside.fm", category: "Audio", description: "AI-enhanced remote recording and transcription.", link: "https://riverside.fm" },
  
  // AGENTS & AUTOMATION
  { name: "Zapier Central", category: "Agents", description: "Teach AI agents to work across 6000+ apps.", link: "https://zapier.com/central" },
  { name: "Make.com", category: "Automation", description: "Visual platform to build complex AI workflows.", link: "https://make.com" },
  { name: "MindStudio", category: "Agents", description: "No-code platform to build custom AI workers.", link: "https://mindstudio.ai" },
  { name: "AgentGPT", category: "Agents", description: "Assemble, configure, and deploy autonomous AI agents.", link: "https://agentgpt.reworkd.ai" },
  
  // RESEARCH & DATA
  { name: "Consensus", category: "Research", description: "AI search engine for peer-reviewed research.", link: "https://consensus.app" },
  { name: "Elicit", category: "Research", description: "Automate time-consuming research tasks with AI.", link: "https://elicit.com" },
  { name: "Perplexity AI", category: "Research", description: "The definitive AI search engine for real-time answers.", link: "https://perplexity.ai" },
  { name: "NotebookLM", category: "Research", description: "AI-native research and writing assistant.", link: "https://notebooklm.google" },
  { name: "ResearchRabbit", category: "Research", description: "Mapping research networks and discovery.", link: "https://researchrabbit.ai" },

  // WRITING & MARKETING
  { name: "Jasper", category: "Marketing", description: "Enterprise AI platform for content strategy.", link: "https://jasper.ai" },
  { name: "Copy.ai", category: "Marketing", description: "GTM AI platform for marketing and sales.", link: "https://copy.ai" },
  { name: "Writesonic", category: "Marketing", description: "AI-powered content marketing and SEO platform.", link: "https://writesonic.com" },
  { name: "AdCreative.ai", category: "Marketing", description: "Generate conversion-focused ad creatives.", link: "https://adcreative.ai" }
];

const AIToolsDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(AI_TOOLS.map(t => t.category))].sort(), []);

  const filteredTools = useMemo(() => 
    AI_TOOLS.filter(t => 
      (filter === 'All' || t.category === filter) &&
      (t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       t.category.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [searchTerm, filter]);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Development': return <Code size={14} />;
      case 'Visual': return <Image size={14} />;
      case 'Audio': return <Mic size={14} />;
      case 'LLM': return <MessageSquare size={14} />;
      case 'Marketing': return <Briefcase size={14} />;
      case 'Research': return <Atom size={14} />;
      default: return <Zap size={14} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Sparkles className="text-cyan-500 animate-pulse" size={32} />
            <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase">AI HUB v600.0</h2>
          </div>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.3em] font-bold">Consolidated Neural Directory / {AI_TOOLS.length} Active Modules</p>
        </div>
        
        <div className="flex flex-wrap gap-2 max-w-2xl justify-end">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-sm text-[9px] font-black tracking-widest transition-all border flex items-center gap-2 ${
                filter === cat 
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-105' 
                  : 'bg-slate-900/50 text-cyan-800 border-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30'
              }`}
            >
              {getCategoryIcon(cat)}
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search size={22} className="text-cyan-900 group-focus-within:text-cyan-400 transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="QUERY THE QUORUM'S GLOBAL INTELLIGENCE MESH..."
          className="w-full bg-slate-900/40 border border-cyan-500/20 rounded-2xl py-6 pl-14 pr-6 text-cyan-400 placeholder-cyan-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-2xl font-bold tracking-wider"
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden md:flex items-center space-x-2 text-[9px] text-cyan-900 font-black uppercase tracking-widest">
           <Filter size={12} />
           <span>{filteredTools.length} results</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTools.map((tool, idx) => (
          <div 
            key={idx} 
            className="glass-panel p-6 rounded-2xl border border-cyan-500/10 hover:border-cyan-500/60 hover:bg-slate-900/60 transition-all group flex flex-col h-full relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
              <Globe size={80} className="text-cyan-500" />
            </div>
            
            <div className="flex justify-between items-start mb-4">
              <span className="bg-cyan-500/10 text-cyan-500 text-[8px] font-black px-2.5 py-1 rounded-full border border-cyan-500/20 tracking-widest uppercase">
                {tool.category}
              </span>
              <a 
                href={tool.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cyan-900 hover:text-cyan-400 transition-all hover:scale-110"
                title="Visit Website"
              >
                <ExternalLink size={18} />
              </a>
            </div>
            
            <h3 className="text-lg font-black text-slate-100 group-hover:text-cyan-400 transition-colors mb-3 uppercase tracking-tight flex items-center">
              {tool.name}
              {idx < 15 && <Zap size={12} className="ml-2 text-yellow-500 animate-pulse" />}
            </h3>
            
            <p className="text-slate-400 text-[11px] leading-relaxed mb-8 font-medium opacity-80 flex-1 border-l border-cyan-500/10 pl-3">
              {tool.description}
            </p>
            
            <div className="mt-auto">
              <a 
                href={tool.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center py-3 bg-slate-950/50 hover:bg-cyan-500 hover:text-slate-950 transition-all text-[10px] font-black tracking-[0.2em] rounded-xl border border-cyan-500/20 uppercase group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                Launch Module
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-3xl flex items-center justify-between">
         <div className="flex items-center space-x-6">
            <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
               <Info size={28} className="text-cyan-400" />
            </div>
            <div>
               <div className="text-xs text-cyan-400 font-black uppercase tracking-widest">Global Intelligence mesh</div>
               <div className="text-[10px] text-cyan-800 font-bold uppercase tracking-widest mt-1">Sourced from Best-of-AI & AIXploria Manifests</div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AIToolsDirectory;