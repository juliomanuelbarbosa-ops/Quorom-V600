
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { 
  Shapes, Play, Zap, Download, RefreshCcw, 
  Settings, Loader2, Star, ExternalLink, 
  Image as ImageIcon, Layers, Cpu, Database, 
  Terminal, Share2, Plus, Info, Move
} from 'lucide-react';

interface Node {
  id: string;
  name: string;
  type: 'loader' | 'sampler' | 'encoder' | 'decoder' | 'output';
  status: 'idle' | 'running' | 'complete';
  x: number;
  y: number;
}

const ComfyUIForge: React.FC = () => {
  const [isQueueing, setIsQueueing] = useState(false);
  const [prompt, setPrompt] = useState('A digital painting of a cyberpunk city floating in a void of neon gas, hyper-realistic, 8k');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', name: 'LOAD_CHECKPOINT', type: 'loader', status: 'idle', x: 50, y: 50 },
    { id: '2', name: 'CLIP_TEXT_ENCODE', type: 'encoder', status: 'idle', x: 50, y: 180 },
    { id: '3', name: 'K_SAMPLER_CORE', type: 'sampler', status: 'idle', x: 280, y: 110 },
    { id: '4', name: 'VAE_DECODE_MESH', type: 'decoder', status: 'idle', x: 520, y: 110 },
    { id: '5', name: 'SAVE_IMAGE_NODE', type: 'output', status: 'idle', x: 740, y: 110 }
  ]);

  const queuePrompt = async () => {
    if (isQueueing || !prompt.trim()) return;

    setIsQueueing(true);
    setGeneratedImage(null);
    
    // Reset status
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle' })));

    try {
      // Step-by-step node simulation
      for (let i = 0; i < nodes.length; i++) {
        const nodeId = (i + 1).toString();
        setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'running' } : n));
        
        // Sampler takes longer
        const delay = nodes[i].type === 'sampler' ? 3000 : 800;
        await new Promise(r => setTimeout(r, delay));
        
        setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'complete' } : n));
      }

      // Final synthesis via Gemini
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });

      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) setGeneratedImage(imageUrl);
    } catch (err) {
      console.error("FORGE_FAILURE:", err);
    } finally {
      setIsQueueing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-indigo-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-indigo-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Shapes size={28} className="text-indigo-500" />
            COMFYUI FORGE
          </h2>
          <p className="text-indigo-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Node-Based Latent Orchestration / v0.2.1-MESH
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-indigo-500/20 rounded">
            <Star size={12} className="text-indigo-500" />
            <span className="text-[10px] font-black text-indigo-400 uppercase">48K STARS</span>
          </div>
          <a href="https://github.com/comfyanonymous/ComfyUI" target="_blank" rel="noopener noreferrer" className="text-indigo-900 hover:text-indigo-400 transition-colors">
            <ExternalLink size={18} />
          </a>
          <button 
            onClick={queuePrompt}
            disabled={isQueueing || !prompt.trim()}
            className={`px-8 py-2 rounded font-black text-xs tracking-widest flex items-center gap-2 transition-all ${isQueueing ? 'bg-slate-800 text-indigo-900' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'}`}
          >
            {isQueueing ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
            <span>QUEUE PROMPT</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-hidden">
        {/* Node Canvas Area */}
        <div className="lg:col-span-8 glass-panel rounded-3xl border border-indigo-500/20 bg-slate-950/40 relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none cyber-grid" />
          
          {/* SVG Connections Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 150 75 L 280 135" stroke="#4338ca" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="4" />
            <path d="M 150 205 L 280 145" stroke="#4338ca" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="4" />
            <path d="M 380 135 L 520 135" stroke="#4338ca" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="4" />
            <path d="M 620 135 L 740 135" stroke="#4338ca" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="4" />
          </svg>

          <div className="relative flex-1 p-8">
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                style={{ left: node.x, top: node.y }}
                className={`absolute w-44 glass-panel rounded-xl border ${
                  node.status === 'running' ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 
                  node.status === 'complete' ? 'border-indigo-900/50 opacity-80' : 'border-indigo-500/10'
                } overflow-hidden`}
              >
                <div className={`p-2 border-b ${node.status === 'running' ? 'bg-indigo-500 text-slate-950' : 'bg-slate-900/50 text-indigo-500'} flex justify-between items-center transition-colors`}>
                  <span className="text-[8px] font-black uppercase tracking-widest">{node.name}</span>
                  {node.status === 'running' && <Loader2 size={10} className="animate-spin" />}
                </div>
                <div className="p-4 space-y-2">
                   <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                      <motion.div 
                        animate={node.status === 'running' ? { width: ['0%', '100%'] } : node.status === 'complete' ? { width: '100%' } : { width: '0%' }}
                        transition={node.status === 'running' ? { repeat: Infinity, duration: 2 } : { duration: 0.5 }}
                        className="h-full bg-indigo-500" 
                      />
                   </div>
                   <div className="flex justify-between items-center opacity-30">
                      <div className="w-2 h-2 rounded-full bg-indigo-800" />
                      <div className="w-2 h-2 rounded-full bg-indigo-800" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 bg-slate-900/50 border-t border-indigo-500/10 flex justify-between items-center">
             <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[8px] font-black text-indigo-900 uppercase">
                   <Move size={10} /> PAN: SHIFT+DRAG
                </div>
                <div className="flex items-center gap-2 text-[8px] font-black text-indigo-900 uppercase">
                   <Plus size={10} /> ADD NODE: RIGHT-CLICK
                </div>
             </div>
             <div className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">
               WORKSPACE_ID: 0X_F03_G
             </div>
          </div>
        </div>

        {/* Sidebar Controls & Result */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-hidden">
          <div className="glass-panel p-6 rounded-2xl border border-indigo-500/20 bg-slate-900/30 flex flex-col gap-6">
            <div className="space-y-4">
              <label className="text-[9px] text-indigo-900 font-black uppercase tracking-widest flex items-center gap-2">
                <Terminal size={12} /> Positive Latent Input
              </label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-slate-950 border border-indigo-500/20 rounded-xl p-4 text-indigo-400 focus:outline-none focus:border-indigo-500 text-[11px] h-32 resize-none font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                  <label className="text-[8px] text-indigo-900 font-black uppercase">Steps</label>
                  <input type="number" defaultValue={20} className="w-full bg-slate-950 border border-indigo-500/10 rounded p-2 text-[10px] text-indigo-400" />
               </div>
               <div className="space-y-1">
                  <label className="text-[8px] text-indigo-900 font-black uppercase">CFG Scale</label>
                  <input type="number" defaultValue={8.0} step={0.5} className="w-full bg-slate-950 border border-indigo-500/10 rounded p-2 text-[10px] text-indigo-400" />
               </div>
            </div>
          </div>

          <div className="glass-panel flex-1 rounded-3xl border border-indigo-500/20 bg-slate-950/60 overflow-hidden relative group flex flex-col">
             <div className="p-4 border-b border-indigo-500/10 bg-slate-900/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <ImageIcon size={14} className="text-indigo-500" />
                   <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Preview Output</span>
                </div>
                {generatedImage && (
                  <button className="text-indigo-500 hover:text-white transition-colors">
                    <Download size={14} />
                  </button>
                )}
             </div>
             
             <div className="flex-1 relative flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                  {isQueueing ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <Loader2 size={32} className="animate-spin text-indigo-500" />
                      <p className="text-[9px] font-black text-indigo-900 uppercase tracking-widest">Rendering...</p>
                    </motion.div>
                  ) : generatedImage ? (
                    <motion.img 
                      key="img"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={generatedImage}
                      className="max-w-full max-h-full rounded-lg shadow-2xl border border-indigo-500/20"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-4 opacity-10">
                       <Database size={48} />
                       <p className="text-[9px] font-black uppercase tracking-[0.3em]">Awaiting Queue</p>
                    </div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComfyUIForge;
