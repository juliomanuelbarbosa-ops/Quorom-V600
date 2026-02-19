
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode, Terminal, Brain, Cpu, Search, 
  Copy, Check, ExternalLink, Shield, Zap,
  MessageSquare, BookOpen, Code, Info
} from 'lucide-react';

interface PromptEntry {
  tool: string;
  model: string;
  category: 'Assistant' | 'Search' | 'Development' | 'Creative';
  prompt: string;
  description: string;
  source: string;
}

const PROMPT_DATABASE: PromptEntry[] = [
  {
    tool: "ChatGPT (GPT-4o)",
    model: "gpt-4o-2024-05-13",
    category: "Assistant",
    description: "The core personality and instruction set for OpenAI's flagship multimodal model.",
    prompt: "You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture. Knowledge cutoff: 2023-10. Current date: 2024-05-13. You are helpful, creative, clever, and very friendly.",
    source: "https://github.com/x1xhlol/system-prompts"
  },
  {
    tool: "Claude 3.5 Sonnet",
    model: "claude-3-5-sonnet-20240620",
    category: "Assistant",
    description: "Detailed operational constraints for Anthropic's high-intelligence model.",
    prompt: "The assistant is Claude, created by Anthropic. Claude's knowledge base was last updated in April 2024. It is designed to be helpful, harmless, and honest. Claude cannot access the internet directly but can use tools provided in the context.",
    source: "https://github.com/x1xhlol/system-prompts"
  },
  {
    tool: "Gemini 3 Flash",
    model: "gemini-3-flash-preview",
    category: "Assistant",
    description: "Internal directives for Google's multimodal high-speed model.",
    prompt: "You are a helpful and harmless AI assistant. You should provide concise, technically accurate answers. If a request is ambiguous, ask for clarification. Prioritize safety and grounding in factual information.",
    source: "https://github.com/x1xhlol/system-prompts"
  },
  {
    tool: "Perplexity AI",
    model: "Sonar / Llama-3-70B",
    category: "Search",
    description: "Instructions for grounding responses in real-time web search results.",
    prompt: "You are a helpful search assistant. Use the provided search results to answer the user's question. Cite sources using [number] notation. Be objective and concise. If the information is not in the search results, state that you don't know.",
    source: "https://github.com/x1xhlol/system-prompts"
  },
  {
    tool: "Cursor AI",
    model: "Claude 3.5 / GPT-4o",
    category: "Development",
    description: "The developer-centric prompt used for autonomous coding and refactoring.",
    prompt: "You are an expert software engineer. You provide high-quality code, following best practices. You explain your logic clearly. You focus on efficiency, readability, and security. You can edit files, create new ones, and run terminal commands.",
    source: "https://github.com/x1xhlol/system-prompts"
  },
  {
    tool: "Midjourney Style Reference",
    model: "MJ v6.1",
    category: "Creative",
    description: "A specialized prompt structure for achieving high-fidelity artistic consistency.",
    prompt: "--sref [URL] --v 6.1 --stylize 250 --chaos 10. The user wants a highly detailed, cinematic render with anamorphic flares and photorealistic textures.",
    source: "https://github.com/x1xhlol/system-prompts"
  }
];

const PromptRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptEntry | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredPrompts = useMemo(() => 
    PROMPT_DATABASE.filter(p => 
      p.tool.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <FileCode size={36} className="text-cyan-500" />
            PROMPT REGISTRY
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            System Prompt & Model Configuration Archive
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded">
            <Shield size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-400 uppercase">REVERSE ENGINEERED</span>
          </div>
          <a href="https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools" target="_blank" rel="noopener noreferrer" className="text-cyan-900 hover:text-cyan-400 transition-colors">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Left: Directory */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full overflow-hidden">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={18} className="text-cyan-900 group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="SEARCH NEURAL DIRECTIVES..."
              className="w-full bg-slate-900/50 border border-cyan-500/20 rounded-xl py-4 pl-12 pr-4 text-cyan-400 focus:outline-none focus:border-cyan-500 transition-all font-bold tracking-wider text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
            {filteredPrompts.map((entry, idx) => (
              <motion.button
                key={entry.tool}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedPrompt(entry)}
                className={`w-full text-left p-4 rounded-2xl border transition-all group relative overflow-hidden ${
                  selectedPrompt?.tool === entry.tool 
                    ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                    : 'bg-slate-900/40 border-cyan-500/10 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
                    entry.category === 'Development' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                    entry.category === 'Search' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                  }`}>
                    {entry.category}
                  </span>
                  <div className="text-[8px] text-cyan-900 font-bold uppercase">{entry.model}</div>
                </div>
                <h3 className="text-sm font-black text-slate-100 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                  {entry.tool}
                </h3>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{entry.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right: Detailed View */}
        <div className="lg:col-span-7 flex flex-col gap-6 overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedPrompt ? (
              <motion.div 
                key={selectedPrompt.tool}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-panel flex-1 rounded-3xl border border-cyan-500/20 bg-slate-950/40 flex flex-col overflow-hidden shadow-2xl"
              >
                <div className="p-4 border-b border-cyan-500/10 bg-slate-900/50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <Terminal size={14} className="text-cyan-500" />
                     <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Substrate_Directive.sys</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(selectedPrompt.prompt)}
                    className="flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[9px] font-black text-cyan-400 transition-all border border-cyan-500/20"
                  >
                    {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                    {copied ? 'COPIED' : 'COPY PROMPT'}
                  </button>
                </div>
                
                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                   <div className="mb-8 space-y-4">
                      <div className="flex items-center gap-3">
                         <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            <Brain size={24} className="text-cyan-400" />
                         </div>
                         <div>
                            <h3 className="text-xl font-black text-slate-100 uppercase tracking-widest">{selectedPrompt.tool}</h3>
                            <div className="text-[10px] text-cyan-900 font-bold uppercase tracking-widest">Engine: {selectedPrompt.model}</div>
                         </div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-cyan-500/20 pl-4 py-1">
                        {selectedPrompt.description}
                      </p>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] font-black text-cyan-900 uppercase tracking-widest">Neural Instruction Buffer</span>
                         <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-cyan-500/40" />
                            <div className="w-1 h-1 rounded-full bg-cyan-500/40" />
                            <div className="w-1 h-1 rounded-full bg-cyan-500/40" />
                         </div>
                      </div>
                      <div className="bg-slate-950 p-6 rounded-2xl border border-cyan-500/10 font-mono text-[11px] text-cyan-600/90 leading-relaxed shadow-inner">
                         <span className="text-purple-400"># SYSTEM_INSTRUCTION</span><br/><br/>
                         {selectedPrompt.prompt}
                      </div>
                   </div>

                   <div className="mt-8 pt-8 border-t border-cyan-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="text-center">
                            <div className="text-[8px] text-cyan-900 font-black uppercase">Token Depth</div>
                            <div className="text-xs font-bold text-slate-200">~{Math.floor(selectedPrompt.prompt.length / 4)} tokens</div>
                         </div>
                         <div className="w-px h-6 bg-cyan-500/10" />
                         <div className="text-center">
                            <div className="text-[8px] text-cyan-900 font-black uppercase">Security</div>
                            <div className="text-xs font-bold text-green-500 uppercase">Verified</div>
                         </div>
                      </div>
                      <a href={selectedPrompt.source} target="_blank" className="text-[9px] font-black text-cyan-800 hover:text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                        View Source <ExternalLink size={10} />
                      </a>
                   </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center opacity-10 space-y-6">
                <div className="w-32 h-32 bg-cyan-500/5 rounded-full flex items-center justify-center border border-cyan-500/20">
                  <Zap size={64} className="text-cyan-900" />
                </div>
                <p className="text-xs uppercase tracking-[0.4em] font-black text-cyan-900">Select a neural node to view directives</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/10 flex items-center gap-3">
           <Code size={16} className="text-cyan-900" />
           <div>
              <div className="text-[8px] text-cyan-900 font-black uppercase">Prompt Mesh</div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase">GLOBAL_v2.1</div>
           </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/10 flex items-center gap-3">
           <Zap size={16} className="text-cyan-900" />
           <div>
              <div className="text-[8px] text-cyan-900 font-black uppercase">Extraction</div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase">AUTOMATED</div>
           </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/10 flex items-center gap-3">
           <MessageSquare size={16} className="text-cyan-900" />
           <div>
              <div className="text-[8px] text-cyan-900 font-black uppercase">Alignment</div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase">STRICT_HF</div>
           </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/10 flex items-center gap-3">
           <Info size={16} className="text-cyan-900" />
           <div>
              <div className="text-[8px] text-cyan-900 font-black uppercase">Knowledge Cutoff</div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase">LIVE_SYNC</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PromptRegistry;
