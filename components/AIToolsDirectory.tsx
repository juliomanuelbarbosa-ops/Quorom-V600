import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Zap, Info, Shield, Filter, Globe, Sparkles } from 'lucide-react';
import { AITool } from '../types';

const AI_TOOLS: AITool[] = [
  // LLMs & CORE MODELS
  { name: "Gemini 3 Pro", category: "LLM", description: "Advanced reasoning and coding capabilities by Google.", link: "https://aistudio.google.com" },
  { name: "Claude 3.5 Sonnet", category: "LLM", description: "High-intelligence conversational AI by Anthropic.", link: "https://claude.ai" },
  { name: "GPT-4o", category: "LLM", description: "OpenAI flagship multimodal model.", link: "https://chatgpt.com" },
  { name: "Llama 3.1 405B", category: "LLM", description: "Meta's state-of-the-art open model.", link: "https://ai.meta.com" },
  { name: "Mistral Large 2", category: "LLM", description: "Europe's leading AI flagship.", link: "https://mistral.ai" },
  { name: "Grok 4.20", category: "LLM", description: "xAI latest real-time search LLM with maximum edge.", link: "https://x.ai" },
  { name: "Qwen 3.5", category: "LLM", description: "Alibaba's powerful multilingual open-source model.", link: "https://github.com/QwenLM/Qwen" },
  { name: "DeepSeek V3", category: "LLM", description: "Highly efficient MoE model from China.", link: "https://deepseek.com" },
  { name: "GLM 5", category: "LLM", description: "Next-gen bilingual model by Zhipu AI.", link: "https://chatglm.cn" },
  { name: "MiniMax M2.5", category: "LLM", description: "Optimized for long-context and creativity.", link: "https://minimaxi.com" },
  
  // IMAGE & VISUAL
  { name: "Photoshop AI", category: "Image", description: "Generative Fill and Expand within Adobe creative suite.", link: "https://adobe.com/photoshop" },
  { name: "Leonardo AI", category: "Image", description: "Production-quality assets with incredible speed.", link: "https://leonardo.ai" },
  { name: "Canva AI", category: "Image", description: "Magic Design and editing tools for everyone.", link: "https://canva.com" },
  { name: "Microsoft Designer", category: "Image", description: "DALL-E 3 powered graphic design assistant.", link: "https://designer.microsoft.com" },
  { name: "Midjourney v6.1", category: "Image", description: "Industry standard for artistic image generation.", link: "https://midjourney.com" },
  { name: "Flux.1", category: "Image", description: "State-of-the-art prompt adherence and realism.", link: "https://blackforestlabs.ai" },
  { name: "Stable Diffusion 3.5", category: "Image", description: "Stability AI's latest open-weight powerhouse.", link: "https://stability.ai" },
  { name: "Freepik AI", category: "Image", description: "Instant image generation for designers.", link: "https://freepik.com" },
  
  // AUDIO & SPEECH
  { name: "ElevenLabs", category: "Audio", description: "Most realistic AI speech synthesis available.", link: "https://elevenlabs.io" },
  { name: "Lyria 3", category: "Audio", description: "Google DeepMind's most advanced music model.", link: "https://deepmind.google/technologies/lyria" },
  { name: "Suno AI v4", category: "Audio", description: "Full song generation with lyrics and melody.", link: "https://suno.com" },
  { name: "Udio", category: "Audio", description: "Cinematic music generation with insane fidelity.", link: "https://udio.com" },
  { name: "Murf.AI", category: "Audio", description: "Versatile AI voice generator for creators.", link: "https://murf.ai" },
  { name: "Uberduck", category: "Audio", description: "Community-driven AI voice and rap generator.", link: "https://uberduck.ai" },
  { name: "Resemble.ai", category: "Audio", description: "Cloned voices that sound exactly like you.", link: "https://resemble.ai" },
  { name: "Play HT", category: "Audio", description: "Instant text-to-speech with massive voice library.", link: "https://play.ht" },
  
  // VIDEO & ANIMATION
  { name: "Runway Gen-3", category: "Video", description: "High-end cinematic video from text.", link: "https://runwayml.com" },
  { name: "Luma Dream Machine", category: "Video", description: "Highly realistic, high-fidelity video generation.", link: "https://lumalabs.ai" },
  { name: "Kling AI", category: "Video", description: "Breakthrough physics-aware video generation.", link: "https://klingai.com" },
  { name: "Filmustage", category: "Video", description: "AI-powered script breakdown and scheduling.", link: "https://filmustage.com" },
  { name: "Waymark", category: "Video", description: "AI video creator for local advertising.", link: "https://waymark.com" },
  { name: "Live3D AI Face Swap", category: "Video", description: "Real-time face swapping for video calls.", link: "https://live3d.io" },
  { name: "HeyGen", category: "Video", description: "AI avatar generator for professional video.", link: "https://heygen.com" },

  // PRODUCTIVITY & SEARCH
  { name: "Perplexity AI", category: "Search", description: "The definitive AI search engine for real-time answers.", link: "https://perplexity.ai" },
  { name: "Notion AI", category: "Productivity", description: "AI-powered workspace and documentation.", link: "https://notion.ai" },
  { name: "QuillBot", category: "Productivity", description: "Advanced paraphrasing and writing assistant.", link: "https://quillbot.com" },
  { name: "Textero AI", category: "Productivity", description: "AI academic writing and research tool.", link: "https://textero.ai" },
  { name: "Humata AI", category: "Productivity", description: "The fastest way to understand complex documents.", link: "https://humata.ai" },
  { name: "SciSpace", category: "Productivity", description: "AI copilot for reading and understanding papers.", link: "https://typeset.io" },
  { name: "ClickUp Brain", category: "Productivity", description: "AI integrated deeply into project management.", link: "https://clickup.com" },
  { name: "Any Summary", category: "Productivity", description: "Summarize any file, video, or URL instantly.", link: "https://anysummary.app" },

  // DEV TOOLS & CODING
  { name: "Cursor", category: "Dev", description: "AI-native code editor with deep context.", link: "https://cursor.com" },
  { name: "v0.dev", category: "Dev", description: "Vercel's UI generation for React/Tailwind.", link: "https://v0.dev" },
  { name: "Replit Agent", category: "Dev", description: "Build full applications with simple prompts.", link: "https://replit.com" },
  { name: "Codeium", category: "Dev", description: "Lightning-fast AI code completions.", link: "https://codeium.com" },
  { name: "Gologin", category: "Dev", description: "Anti-detect browser for managing multi-profiles.", link: "https://gologin.com" },
  { name: "Manus Browser Operator", category: "Dev", description: "AI that can browse the web like a human.", link: "https://manus.ai" },

  // SECURITY & DETECTION
  { name: "FaceCheck ID", category: "Security", description: "Facial recognition search across the web.", link: "https://facecheck.id" },
  { name: "DeepFake Detector", category: "Security", description: "Verify authenticity of video and audio.", link: "https://deepfakedetector.ai" },
  { name: "GPTZero", category: "Security", description: "The gold standard for AI content detection.", link: "https://gptzero.me" },
  { name: "PimEyes", category: "Security", description: "Deep facial search engine.", link: "https://pimeyes.com" },
  { name: "Copyleaks", category: "Security", description: "Plagiarism and AI detection for enterprise.", link: "https://copyleaks.com" },

  // MARKETING & ADS
  { name: "AdsTurbo AI", category: "Marketing", description: "Generate high-converting ad creatives.", link: "https://adsturbo.ai" },
  { name: "Adcreative AI", category: "Marketing", description: "Scale ad generation with Semrush technology.", link: "https://adcreative.ai" },
  { name: "Namelix", category: "Marketing", description: "AI business name generator.", link: "https://namelix.com" },
  { name: "HoppyCopy", category: "Marketing", description: "AI email copy specifically for marketing.", link: "https://hoppycopy.co" },
  
  // SPECIALIZED TOOLS
  { name: "Utopia Enhance", category: "Visual", description: "Upscale and enhance images to 8K resolution.", link: "https://utopia.ai" },
  { name: "RedactAI", category: "Privacy", description: "Anonymize sensitive data in text and images.", link: "https://redactai.io" },
  { name: "Dressrious", category: "Lifestyle", description: "AI fashion stylist and outfit planner.", link: "https://dressrious.com" },
  { name: "Flo", category: "Health", description: "AI-driven health and cycle tracking.", link: "https://flo.health" }
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
              className={`px-3 py-1.5 rounded-sm text-[9px] font-black tracking-widest transition-all border ${
                filter === cat 
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-105' 
                  : 'bg-slate-900/50 text-cyan-800 border-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30'
              }`}
            >
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

      {filteredTools.length > 0 ? (
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
                {idx < 10 && <Zap size={12} className="ml-2 text-yellow-500 animate-pulse" />}
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
      ) : (
        <div className="text-center py-40 glass-panel rounded-3xl border border-cyan-500/10">
           <Shield className="mx-auto text-cyan-900 mb-6" size={64} />
           <h3 className="text-2xl font-black text-cyan-900 uppercase tracking-[0.3em]">Query mismatch</h3>
           <p className="text-cyan-950 text-xs font-bold uppercase mt-2">The specified neural pattern was not found in the v600.0 registry.</p>
           <button 
             onClick={() => {setSearchTerm(''); setFilter('All');}}
             className="mt-8 text-cyan-500 font-black text-[10px] tracking-widest uppercase hover:text-cyan-300 transition-colors"
           >
             Clear All Filters
           </button>
        </div>
      )}
      
      <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-3xl flex items-center justify-between">
         <div className="flex items-center space-x-6">
            <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
               <Info size={28} className="text-cyan-400" />
            </div>
            <div>
               <div className="text-xs text-cyan-400 font-black uppercase tracking-widest">Global Intelligence mesh</div>
               <div className="text-[10px] text-cyan-800 font-bold uppercase tracking-widest mt-1">Version 600.0.0 Stable / Last Crawl: FEB 2026</div>
            </div>
         </div>
         <div className="hidden lg:flex items-center space-x-8">
            <div className="text-right">
               <div className="text-[8px] text-cyan-900 font-black uppercase">Sync Health</div>
               <div className="text-xs font-black text-green-500">OPTIMAL</div>
            </div>
            <div className="h-10 w-px bg-cyan-500/20" />
            <div className="text-right">
               <div className="text-[8px] text-cyan-900 font-black uppercase">Nodes Active</div>
               <div className="text-xs font-black text-cyan-500">642/642</div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AIToolsDirectory;