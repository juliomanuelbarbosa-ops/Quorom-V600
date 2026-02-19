import React, { useState } from 'react';
import { Search, ExternalLink, Zap, Info, Shield } from 'lucide-react';
import { AITool } from '../types';

const AI_TOOLS: AITool[] = [
  { name: "Gemini 3 Pro", category: "LLM", description: "Advanced reasoning and coding capabilities.", link: "https://aistudio.google.com" },
  { name: "Claude 3.5 Sonnet", category: "LLM", description: "High-intelligence conversational AI.", link: "https://claude.ai" },
  { name: "GPT-4o", category: "LLM", description: "OpenAI flagship multimodal model.", link: "https://chatgpt.com" },
  { name: "Llama 3.1 405B", category: "LLM", description: "Meta's state-of-the-art open model.", link: "https://ai.meta.com" },
  { name: "Mistral Large 2", category: "LLM", description: "Europe's leading AI flagship.", link: "https://mistral.ai" },
  { name: "Grok 4.20", category: "LLM", description: "xAI latest real-time search LLM.", link: "https://x.ai" },
  { name: "Suno AI v4", category: "Audio", description: "Generate full songs with vocals and melody.", link: "https://suno.com" },
  { name: "Udio", category: "Audio", description: "High-fidelity music generation.", link: "https://udio.com" },
  { name: "ElevenLabs", category: "Audio", description: "Realistic AI voice generator.", link: "https://elevenlabs.io" },
  { name: "Stable Diffusion 3.5", category: "Image", description: "Unmatched photorealism and control.", link: "https://stability.ai" },
  { name: "Flux.1", category: "Image", description: "The new standard in prompt adherence.", link: "https://blackforestlabs.ai" },
  { name: "Midjourney v6.1", category: "Image", description: "Top-tier artistic image generation.", link: "https://midjourney.com" },
  { name: "DALL-E 3", category: "Image", description: "OpenAI high-adherence image creator.", link: "https://openai.com/dall-e-3" },
  { name: "Perplexity AI", category: "Search", description: "Answer engine with real-time web access.", link: "https://perplexity.ai" },
  { name: "SearchGPT", category: "Search", description: "Direct answer engine by OpenAI.", link: "https://openai.com/search" },
  { name: "Cursor", category: "Dev", description: "AI-native code editor with deep context.", link: "https://cursor.com" },
  { name: "v0.dev", category: "Dev", description: "Vercel UI generation engine.", link: "https://v0.dev" },
  { name: "Codeium", category: "Dev", description: "Lightning-fast AI code completions.", link: "https://codeium.com" },
  { name: "Runway Gen-3 Alpha", category: "Video", description: "High-quality video from text.", link: "https://runwayml.com" },
  { name: "Luma Dream Machine", category: "Video", description: "High-fidelity cinematic video generator.", link: "https://lumalabs.ai" },
  { name: "Kling AI", category: "Video", description: "Revolutionary video generation.", link: "https://klingai.com" },
  { name: "HeyGen", category: "Avatar", description: "AI avatar video creator for pros.", link: "https://heygen.com" },
  { name: "Synthesia", category: "Avatar", description: "AI video communications platform.", link: "https://synthesia.io" },
  { name: "Notion AI", category: "Productivity", description: "AI assistant integrated into Notion.", link: "https://notion.so" },
  { name: "QuillBot", category: "Productivity", description: "Advanced paraphrasing tool.", link: "https://quillbot.com" },
  { name: "Hugging Face", category: "Platform", description: "The hub for machine learning models.", link: "https://huggingface.co" },
  { name: "Replicate", category: "Platform", description: "Run open-source AI models via API.", link: "https://replicate.com" },
  { name: "LangChain", category: "Agents", description: "Framework for building LLM apps.", link: "https://langchain.com" },
  { name: "CrewAI", category: "Agents", description: "Orchestrate role-playing AI agents.", link: "https://crewai.com" },
  { name: "AutoGPT", category: "Agents", description: "Autonomous AI agents that solve tasks.", link: "https://autogpt.org" }
];

const AIToolsDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(AI_TOOLS.map(t => t.category))];

  const filteredTools = AI_TOOLS.filter(t => 
    (filter === 'All' || t.category === filter) &&
    (t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     t.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">AI TOOLS DIRECTORY</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Sovereign Knowledge Swarm v600</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest transition-all ${
                filter === cat ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-cyan-800 hover:text-cyan-400'
              }`}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-cyan-900 group-focus-within:text-cyan-400 transition-colors" />
        </div>
        <input type="text" placeholder="QUERY GLOBAL INTELLIGENCE DATABASE..."
          className="w-full bg-slate-900/50 border border-cyan-500/20 rounded-lg py-4 pl-12 pr-4 text-cyan-400 placeholder-cyan-900 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTools.map((tool, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-xl border border-cyan-500/10 hover:border-cyan-500/50 transition-all group flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none group-hover:opacity-20 transition-opacity">
              <Zap size={40} className="text-cyan-500" />
            </div>
            
            <div className="flex justify-between items-start mb-3">
              <span className="bg-cyan-500/5 text-cyan-600 text-[8px] font-black px-2 py-0.5 rounded border border-cyan-500/10 tracking-widest uppercase">
                {tool.category}
              </span>
              <a href={tool.link} target="_blank" rel="noopener noreferrer" className="text-cyan-900 hover:text-cyan-400 transition-colors">
                <ExternalLink size={14} />
              </a>
            </div>
            
            <h3 className="text-sm font-black text-slate-100 group-hover:text-cyan-400 transition-colors mb-2 uppercase tracking-tight">{tool.name}</h3>
            <p className="text-slate-400 text-[10px] leading-relaxed mb-6 font-mono opacity-80 flex-1">{tool.description}</p>
            
            <div className="mt-auto">
              <a href={tool.link} target="_blank" rel="noopener noreferrer"
                className="block text-center py-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 transition-all text-[9px] font-black tracking-widest rounded border border-cyan-500/10 uppercase">
                Synchronize
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIToolsDirectory;