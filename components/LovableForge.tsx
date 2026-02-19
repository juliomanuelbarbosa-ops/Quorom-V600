import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Code2, Rocket, Sparkles, ExternalLink, 
  Zap, Cpu, Globe, Layout, Palette 
} from 'lucide-react';

const LovableForge: React.FC = () => {
  const capabilities = [
    {
      title: "Rapid Prototyping",
      desc: "Instant conversion of technical specs into functional UI nodes.",
      icon: <Zap size={18} className="text-rose-400" />
    },
    {
      title: "Full-Stack Context",
      desc: "Orchestrate front-end aesthetics with deep backend logic integration.",
      icon: <Cpu size={18} className="text-cyan-400" />
    },
    {
      title: "Aesthetic Alignment",
      desc: "Neural design weights optimized for high-performance visual fidelity.",
      icon: <Palette size={18} className="text-purple-400" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-rose-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-rose-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Heart size={36} className="text-rose-500 fill-rose-500/20" />
            LOVABLE FORGE
          </h2>
          <p className="text-rose-900 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Full-Stack AI Orchestration & Rapid UI Prototyping
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded text-[10px] text-rose-400 font-black uppercase tracking-widest">
            Protocol: FAST-PROTOTYPE-v2
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="glass-panel p-8 rounded-3xl border border-rose-500/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/5 blur-3xl rounded-full" />
            <h3 className="text-xl font-black text-slate-100 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Code2 size={20} className="text-rose-500" />
              The Creative Mesh
            </h3>
            
            <div className="space-y-6">
              {capabilities.map((c, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-rose-500/10 flex items-center justify-center group-hover:border-rose-500 transition-colors shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-rose-400 font-black uppercase tracking-widest">{c.title}</div>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-1">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex items-start gap-4">
            <Sparkles className="text-rose-400 shrink-0" size={20} />
            <p className="text-[10px] text-rose-900 font-bold uppercase leading-relaxed tracking-wider">
              Lovable operates at the edge of neural code generation, allowing developers to "love their code" again by offloading repetitive structural tasks to a high-intelligence substrate.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="glass-panel p-1 flex flex-col items-center justify-center text-center space-y-8 min-h-[450px] rounded-[2.5rem] border border-rose-500/20 bg-slate-900/40 relative z-10">
            <div className="relative">
              <div className="w-24 h-24 bg-rose-500/5 rounded-full flex items-center justify-center border border-rose-500/20 shadow-[0_0_80px_rgba(244,63,94,0.15)]">
                <Rocket className="text-rose-500 w-12 h-12" />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute inset-0 bg-rose-500 blur-2xl rounded-full -z-10"
              />
            </div>
            
            <div className="space-y-4 max-w-sm px-8">
              <h3 className="text-2xl font-black text-slate-100 uppercase tracking-widest leading-tight">Sync Mesh to Lovable Engine</h3>
              <p className="text-[10px] text-rose-900 font-bold uppercase tracking-widest">
                Prepare to offload component architecture to the global prototyping node.
              </p>
            </div>

            <a 
              href="https://lovable.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-rose-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-rose-500 hover:bg-rose-400 text-slate-950 px-12 py-5 rounded-2xl font-black text-xs tracking-[0.4em] transition-all uppercase flex items-center gap-3">
                <Zap size={16} />
                <span>Launch Forge Node</span>
                <ExternalLink size={16} className="opacity-50" />
              </div>
            </a>

            <div className="text-[8px] text-rose-950 font-black uppercase tracking-[0.3em]">
              Security Handshake: lovable.dev
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-rose-500/20 rounded-tl-3xl pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-rose-500/20 rounded-br-3xl pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/10 flex items-center gap-4">
           <Layout size={24} className="text-rose-900" />
           <div>
             <div className="text-[8px] text-rose-900 font-black uppercase">Assembly Speed</div>
             <div className="text-xs font-black text-rose-500 uppercase">Sub-Minute Renders</div>
           </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/10 flex items-center gap-4">
           <Globe size={24} className="text-rose-900" />
           <div>
             <div className="text-[8px] text-rose-900 font-black uppercase">Deployment</div>
             <div className="text-xs font-black text-rose-500 uppercase">Netlify/Vercel Ready</div>
           </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/10 flex items-center gap-4">
           <Heart size={24} className="text-rose-900" />
           <div>
             <div className="text-[8px] text-rose-900 font-black uppercase">Developer Sat</div>
             <div className="text-xs font-black text-rose-500 uppercase">Maximum Entropy</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LovableForge;