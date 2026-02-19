
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, ExternalLink, Sparkles, FileText, 
  Headphones, Database, ShieldCheck, Zap, Library
} from 'lucide-react';

const NotebookLMHub: React.FC = () => {
  const features = [
    {
      title: "Source Grounding",
      desc: "AI responses strictly limited to your uploaded sub-files.",
      icon: <Database size={18} className="text-cyan-400" />
    },
    {
      title: "Audio Overviews",
      desc: "Convert document clusters into cinematic neural podcasts.",
      icon: <Headphones size={18} className="text-purple-400" />
    },
    {
      title: "Citation Mapping",
      desc: "Every claim mapped to a specific coordinate in your sources.",
      icon: <ShieldCheck size={18} className="text-emerald-400" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <BookOpen size={36} className="text-cyan-500" />
            NOTEBOOK LM
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Source-Grounded Research & Synthesis Substrate
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400 font-black uppercase tracking-widest">
            Model: Gemini Pro 1.5 Grounded
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/5 blur-3xl rounded-full" />
            <h3 className="text-xl font-black text-slate-100 uppercase tracking-widest mb-6">Library of Truth</h3>
            
            <div className="space-y-6">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/10 flex items-center justify-center group-hover:border-cyan-500 transition-colors shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">{f.title}</div>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-1">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl flex items-start gap-4">
            <Sparkles className="text-cyan-400 shrink-0" size={20} />
            <p className="text-[10px] text-cyan-800 font-bold uppercase leading-relaxed tracking-wider">
              NotebookLM acts as a sovereign container for your specific research, bypassing global neural halluncinations by enforcing strict source-only retrieval logic.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="glass-panel p-1 flex flex-col items-center justify-center text-center space-y-8 min-h-[450px] rounded-[2.5rem] border border-cyan-500/20 bg-slate-900/40 relative z-10">
            <div className="w-24 h-24 bg-cyan-500/5 rounded-full flex items-center justify-center border border-cyan-500/20 shadow-[0_0_80px_rgba(6,182,212,0.1)]">
              <Library className="text-cyan-500 w-12 h-12" />
            </div>
            
            <div className="space-y-4 max-w-sm px-8">
              <h3 className="text-2xl font-black text-slate-100 uppercase tracking-widest leading-tight">Sync Local Intelligence to Cloud</h3>
              <p className="text-[10px] text-cyan-800 font-bold uppercase tracking-widest">
                Prepare to transmit your knowledge clusters to the NotebookLM neural substrate.
              </p>
            </div>

            <a 
              href="https://notebooklm.google" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-12 py-5 rounded-2xl font-black text-xs tracking-[0.4em] transition-all uppercase flex items-center gap-3">
                <Zap size={16} />
                <span>Launch Cloud Node</span>
                <ExternalLink size={16} className="opacity-50" />
              </div>
            </a>

            <div className="text-[8px] text-cyan-900 font-black uppercase tracking-[0.3em]">
              Security Handshake: notebooklm.google
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-3xl pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-cyan-500/20 rounded-br-3xl pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/10 flex items-center gap-4">
           <FileText size={24} className="text-cyan-900" />
           <div>
             <div className="text-[8px] text-cyan-900 font-black uppercase">Source Capacity</div>
             <div className="text-xs font-black text-cyan-500 uppercase">Up to 50 Sources</div>
           </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/10 flex items-center gap-4">
           <Headphones size={24} className="text-cyan-900" />
           <div>
             <div className="text-[8px] text-cyan-900 font-black uppercase">Audio Sync</div>
             <div className="text-xs font-black text-cyan-500 uppercase">Neural Voice Ready</div>
           </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/10 flex items-center gap-4">
           <Zap size={24} className="text-cyan-900" />
           <div>
             <div className="text-[8px] text-cyan-900 font-black uppercase">Latency</div>
             <div className="text-xs font-black text-cyan-500 uppercase">Real-time Grounding</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NotebookLMHub;
