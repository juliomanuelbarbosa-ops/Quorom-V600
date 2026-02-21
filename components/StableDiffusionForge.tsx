
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { 
  Image as ImageIcon, Wand2, Sliders, Zap, Download, 
  Trash2, Loader2, ExternalLink, Star, Shield, 
  Layers, Maximize2, Sparkles, AlertCircle, Cpu
} from 'lucide-react';

const StableDiffusionForge: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [steps, setSteps] = useState(25);
  const [cfgScale, setCfgScale] = useState(7.5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const [acceleration, setAcceleration] = useState<'CPU' | 'WebGPU'>('WebGPU');

  const generateImage = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const fullPrompt = `${prompt} ${negativePrompt ? `(Negative: ${negativePrompt})` : ''}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: fullPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio
          }
        }
      });

      // Search for the image part in the response
      let imageUrl = null;
      if (response.candidates) {
        for (const candidate of response.candidates) {
          if (candidate.content && candidate.content.parts) {
            for (const part of candidate.content.parts) {
              if (part.inlineData) {
                imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                break;
              }
            }
          }
          if (imageUrl) break;
        }
      }

      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        throw new Error("LATENT_COLLAPSE: Image data not found in neural stream.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "NEURAL_INTERRUPT: Synthesis failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Sparkles size={28} className="text-cyan-500" />
            DIFFUSION FORGE
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Latent Space Manipulation Substrate / v1.11.0
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded">
            <Star size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-400 uppercase">135K STABLE</span>
          </div>
          <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui" target="_blank" rel="noopener noreferrer" className="text-cyan-900 hover:text-cyan-400 transition-colors">
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-hidden">
        {/* Left Control Panel */}
        <div className="lg:col-span-4 space-y-4 overflow-y-auto custom-scrollbar pr-2">
          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 space-y-4">
            <div className="space-y-2">
              <label className="text-[9px] text-cyan-900 font-black uppercase tracking-widest flex justify-between">
                <span>Checkpoint Substrate</span>
                <span className="text-cyan-500">v1.5-PRUNED-EMAONLY</span>
              </label>
              <select className="w-full bg-slate-950 border border-cyan-500/20 rounded-lg p-2 text-cyan-400 text-[10px] font-bold outline-none focus:border-cyan-500">
                <option>Quorum-Sovereign-v2.safetensors</option>
                <option>Dreamshaper_v8_Mesh.ckpt</option>
                <option>Realistic_Vision_V6.0</option>
                <option>Cyberpunk_Neon_Flux</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={10} /> Positive Prompt
              </label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the visual manifest..."
                className="w-full bg-slate-950 border border-cyan-500/20 rounded-xl p-3 text-cyan-400 focus:outline-none focus:border-cyan-500 text-[11px] h-24 resize-none leading-relaxed font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] text-red-900 font-black uppercase tracking-widest flex items-center gap-2">
                <AlertCircle size={10} /> Negative Prompt
              </label>
              <textarea 
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="Elements to exclude from the latent cloud..."
                className="w-full bg-slate-950 border border-red-500/10 rounded-xl p-3 text-red-900 focus:outline-none focus:border-red-500/40 text-[11px] h-16 resize-none leading-relaxed font-bold"
              />
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/10 space-y-6">
            <h3 className="text-[10px] font-black text-cyan-600 uppercase tracking-widest flex items-center gap-2">
              <Sliders size={12} /> Sampling Parameters
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-black text-cyan-900 uppercase">
                  <span>Sampling Steps</span>
                  <span className="text-cyan-400">{steps}</span>
                </div>
                <input type="range" min="1" max="50" value={steps} onChange={(e) => setSteps(Number(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-black text-cyan-900 uppercase">
                  <span>CFG Scale</span>
                  <span className="text-cyan-400">{cfgScale}</span>
                </div>
                <input type="range" min="1" max="20" step="0.5" value={cfgScale} onChange={(e) => setCfgScale(Number(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <span className="text-[8px] text-cyan-800 uppercase font-black">Aspect Ratio</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['1:1', '16:9', '9:16'] as const).map(ratio => (
                      <button 
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        className={`py-2 rounded text-[9px] font-black uppercase transition-all border ${aspectRatio === ratio ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 text-cyan-900 border-cyan-500/10 hover:border-cyan-500/30'}`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Cpu size={10} className="text-cyan-800" />
                    <span className="text-[8px] text-cyan-800 uppercase font-black">Compute Engine Acceleration</span>
                  </div>
                  <div className="flex rounded-lg overflow-hidden border border-cyan-500/20">
                    <button 
                      onClick={() => setAcceleration('CPU')}
                      className={`flex-1 py-2 text-[9px] font-black uppercase transition-all ${acceleration === 'CPU' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-cyan-800 hover:text-cyan-400'}`}
                    >
                      CPU Core
                    </button>
                    <button 
                      onClick={() => setAcceleration('WebGPU')}
                      className={`flex-1 py-2 text-[9px] font-black uppercase transition-all ${acceleration === 'WebGPU' ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]' : 'bg-slate-900 text-cyan-800 hover:text-cyan-400'}`}
                    >
                      WebGPU (Native)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={generateImage}
            disabled={isGenerating || !prompt.trim()}
            className={`w-full py-4 rounded-xl font-black text-xs tracking-[0.4em] transition-all uppercase flex items-center justify-center gap-3 ${
              isGenerating ? 'bg-slate-800 text-cyan-900 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30'
            }`}
          >
            {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
            {isGenerating ? 'Synthesizing...' : 'Generate Assets'}
          </button>
        </div>

        {/* Right Output Area */}
        <div className="lg:col-span-8 flex flex-col h-full space-y-4">
          <div className="glass-panel flex-1 rounded-3xl border border-cyan-500/20 bg-slate-950/40 relative overflow-hidden flex items-center justify-center group">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="relative w-40 h-40">
                    <motion.div 
                      animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-b-2 border-cyan-500 rounded-full blur-[2px]"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-6 border-t-2 border-purple-500 rounded-full opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Zap className="text-cyan-500 animate-pulse" size={48} />
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-[10px] text-cyan-500 font-black uppercase tracking-[0.5em]">Scanning Latent Matrix</p>
                    <p className="text-[8px] text-cyan-900 font-bold uppercase">Node Compute: {acceleration === 'WebGPU' ? 'WebGPU' : 'CPU'} Load</p>
                  </div>
                </motion.div>
              ) : generatedImage ? (
                <motion.div 
                  key="output"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full p-4 flex flex-col"
                >
                  <div className="relative flex-1 rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-900 group">
                    <img 
                      src={generatedImage} 
                      alt="Generated Asset" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => window.open(generatedImage, '_blank')} className="p-2 bg-slate-950/80 hover:bg-cyan-500 hover:text-slate-950 rounded-lg text-cyan-400 border border-cyan-500/20">
                         <Maximize2 size={16} />
                       </button>
                       <a href={generatedImage} download="quorum-diffusion.png" className="p-2 bg-slate-950/80 hover:bg-cyan-500 hover:text-slate-950 rounded-lg text-cyan-400 border border-cyan-500/20">
                         <Download size={16} />
                       </a>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center px-2">
                     <div className="flex items-center gap-3">
                        <div className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded text-[8px] font-black text-cyan-500 uppercase tracking-widest">
                          Seed: {Math.floor(Math.random() * 1000000000)}
                        </div>
                        <div className="px-2 py-0.5 bg-slate-900 border border-cyan-500/10 rounded text-[8px] font-black text-cyan-900 uppercase tracking-widest">
                          Steps: {steps}
                        </div>
                        <div className="px-2 py-0.5 bg-slate-950/50 border border-cyan-500/5 rounded text-[8px] font-black text-cyan-800 uppercase tracking-widest italic">
                          Eng: {acceleration}
                        </div>
                     </div>
                     <button onClick={() => setGeneratedImage(null)} className="text-red-900 hover:text-red-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors">
                       <Trash2 size={14} /> <span>Wipe Buffer</span>
                     </button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center opacity-10 space-y-6">
                  <div className="w-32 h-32 bg-cyan-500/5 rounded-full flex items-center justify-center border border-cyan-500/20">
                    <ImageIcon size={64} className="text-cyan-900" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.4em] font-black text-cyan-900">Output Buffer: Awaiting Latent Signal</p>
                </div>
              )}
            </AnimatePresence>

            {error && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-md flex items-start gap-3">
                  <AlertCircle className="text-red-500 shrink-0" size={18} />
                  <p className="text-[10px] text-red-400 font-bold uppercase leading-relaxed">{error}</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/10 flex items-center gap-3">
               <Shield size={16} className="text-cyan-900" />
               <div>
                  <div className="text-[8px] text-cyan-900 font-black uppercase">Integrity</div>
                  <div className="text-[10px] font-bold text-cyan-400">SECURE</div>
               </div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/10 flex items-center gap-3">
               <Layers size={16} className="text-cyan-900" />
               <div>
                  <div className="text-[8px] text-cyan-900 font-black uppercase">VRAM Usage</div>
                  <div className="text-[10px] font-bold text-cyan-400">{acceleration === 'WebGPU' ? '8.4 GB' : '0.5 GB (SWAP)'}</div>
               </div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/10 flex items-center gap-3">
               <Zap size={16} className="text-cyan-900" />
               <div>
                  <div className="text-[8px] text-cyan-900 font-black uppercase">Engine</div>
                  <div className={`text-[10px] font-bold ${acceleration === 'WebGPU' ? 'text-cyan-400' : 'text-amber-500'}`}>{acceleration}</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StableDiffusionForge;
