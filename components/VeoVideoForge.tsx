
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { 
  Video, Film, Zap, Play, Loader2, Info, 
  ShieldAlert, ExternalLink, Download, Settings,
  Clock, Monitor, Layers, Sparkles, Image as ImageIcon,
  Upload, X
} from 'lucide-react';

type GenerationMode = 'text-to-video' | 'image-to-video';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const VeoVideoForge: React.FC = () => {
  const [mode, setMode] = useState<GenerationMode>('text-to-video');
  const [prompt, setPrompt] = useState('');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('720p');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [inputImage, setInputImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    // @ts-ignore - window.aistudio is injected
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const openKeyPicker = async () => {
    // @ts-ignore
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const reassuringMessages = [
    "Initializing Neural Video Substrate...",
    "Synthesizing Temporal Frames...",
    "Orchestrating VEO Diffusion Nodes...",
    "Aligning Cinematic Latents...",
    "Finalizing High-Fidelity Render...",
    "Mapping Motion Vectors to Mesh..."
  ];

  const generateVideo = async () => {
    if (isGenerating) return;
    if (mode === 'text-to-video' && !prompt.trim()) return;
    if (mode === 'image-to-video' && !inputImage) return;

    setIsGenerating(true);
    setVideoUrl(null);
    setError(null);
    let msgIndex = 0;
    const interval = setInterval(() => {
      setLoadingMessage(reassuringMessages[msgIndex % reassuringMessages.length]);
      msgIndex++;
    }, 4000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let requestPayload: any = {
        model: 'veo-3.1-fast-generate-preview',
        config: {
          numberOfVideos: 1,
          resolution: resolution,
          aspectRatio: aspectRatio
        }
      };

      if (mode === 'image-to-video' && inputImage) {
        const base64Data = inputImage.split(',')[1];
        const mimeType = inputImage.split(';')[0].split(':')[1];
        
        requestPayload.image = {
          imageBytes: base64Data,
          mimeType: mimeType
        };
        // Prompt is optional for image-to-video but good to include if present
        if (prompt.trim()) {
          requestPayload.prompt = prompt;
        }
      } else {
        requestPayload.prompt = prompt;
      }

      let operation = await ai.models.generateVideos(requestPayload);

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!response.ok) {
          if (response.status === 404) {
             setHasKey(false);
             throw new Error("API Key configuration error. Please re-select key.");
          }
          throw new Error("Failed to fetch video stream.");
        }
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during synthesis.");
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-8 glass-panel rounded-3xl border border-cyan-500/20 p-12">
        <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
          <ShieldAlert size={48} className="text-cyan-400" />
        </div>
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-3xl font-black text-slate-100 uppercase tracking-widest">Access Restricted</h2>
          <p className="text-cyan-800 text-xs font-bold uppercase tracking-widest leading-relaxed">
            VEO video generation requires a paid API key from a billing-enabled GCP project. 
            Select your sovereign credentials to continue.
          </p>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            className="inline-flex items-center space-x-2 text-[10px] text-cyan-500 hover:text-cyan-300 font-black uppercase tracking-widest transition-colors"
          >
            <span>Billing Documentation</span>
            <ExternalLink size={12} />
          </a>
        </div>
        <button 
          onClick={openKeyPicker}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-12 py-4 rounded-xl font-black text-xs tracking-[0.3em] transition-all uppercase shadow-lg shadow-cyan-500/20"
        >
          Select API Key
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Video size={36} className="text-cyan-500" />
            VEO VIDEO FORGE
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            High-Fidelity Temporal Diffusion Substrate
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-2 bg-slate-900/50 p-1 rounded-lg border border-cyan-500/20">
            <button
              onClick={() => setMode('text-to-video')}
              className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest transition-all ${
                mode === 'text-to-video' ? 'bg-cyan-500 text-slate-950' : 'text-cyan-900 hover:text-cyan-400'
              }`}
            >
              Text-to-Video
            </button>
            <button
              onClick={() => setMode('image-to-video')}
              className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest transition-all ${
                mode === 'image-to-video' ? 'bg-cyan-500 text-slate-950' : 'text-cyan-900 hover:text-cyan-400'
              }`}
            >
              Image-to-Video
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-6">
            
            {mode === 'image-to-video' && (
              <div className="space-y-4">
                <label className="text-[10px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={12} /> Input Frame
                </label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all relative overflow-hidden group ${
                    inputImage ? 'border-cyan-500/30 bg-slate-900/50' : 'border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/5'
                  }`}
                >
                  {inputImage ? (
                    <div className="relative w-full h-32 flex items-center justify-center">
                      <img src={inputImage} alt="Preview" className="max-w-full max-h-full object-contain rounded" />
                      <button 
                        onClick={() => setInputImage(null)}
                        className="absolute top-0 right-0 p-1.5 bg-slate-950/80 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center space-y-2 pointer-events-none">
                      <Upload size={24} className="text-cyan-800 mx-auto" />
                      <p className="text-[9px] text-cyan-800 font-bold uppercase tracking-widest">
                        Upload Source Image
                      </p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={!!inputImage}
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <label className="text-[10px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={12} /> {mode === 'image-to-video' ? 'Prompt (Optional)' : 'Temporal Prompt'}
              </label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe a cinematic sequence (e.g., 'A neon hologram of a cyber-crow flying through a rain-slicked futuristic alleyway')..."
                className="w-full bg-slate-950 border border-cyan-500/20 rounded-xl p-4 text-cyan-400 focus:outline-none focus:border-cyan-500 text-sm h-32 resize-none leading-relaxed"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-2">
                <Settings size={12} /> Configuration
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[8px] text-cyan-800 uppercase font-black">Aspect Ratio</span>
                  <div className="flex rounded-lg overflow-hidden border border-cyan-500/20">
                    <button 
                      onClick={() => setAspectRatio('16:9')}
                      className={`flex-1 py-2 text-[9px] font-black uppercase transition-all ${aspectRatio === '16:9' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-cyan-800 hover:text-cyan-400'}`}
                    >
                      16:9
                    </button>
                    <button 
                      onClick={() => setAspectRatio('9:16')}
                      className={`flex-1 py-2 text-[9px] font-black uppercase transition-all ${aspectRatio === '9:16' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-cyan-800 hover:text-cyan-400'}`}
                    >
                      9:16
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] text-cyan-800 uppercase font-black">Resolution</span>
                  <div className="flex rounded-lg overflow-hidden border border-cyan-500/20">
                    <button 
                      onClick={() => setResolution('720p')}
                      className={`flex-1 py-2 text-[9px] font-black uppercase transition-all ${resolution === '720p' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-cyan-800 hover:text-cyan-400'}`}
                    >
                      720p
                    </button>
                    <button 
                      onClick={() => setResolution('1080p')}
                      className={`flex-1 py-2 text-[9px] font-black uppercase transition-all ${resolution === '1080p' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-cyan-800 hover:text-cyan-400'}`}
                    >
                      1080p
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={generateVideo}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 py-4 rounded-xl font-black text-xs tracking-[0.3em] transition-all uppercase shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />}
              <span>Initiate Synthesis</span>
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
              <ShieldAlert className="text-red-500 shrink-0" size={18} />
              <p className="text-[10px] text-red-400 font-bold uppercase leading-relaxed">{error}</p>
            </div>
          )}

          <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Info size={14} /> System Note
            </h3>
            <p className="text-[9px] text-cyan-900 font-bold uppercase leading-relaxed tracking-wider">
              Temporal synthesis consumes significant neural compute. Average duration: 120-180 seconds. Operation is asynchronous.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/20 min-h-[500px] flex flex-col relative overflow-hidden h-full">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center space-y-8"
                >
                  <div className="relative w-32 h-32">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-t-2 border-cyan-500 rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 border-b-2 border-purple-500 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Film className="text-cyan-500 animate-pulse" size={40} />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-black text-cyan-400 uppercase tracking-[0.3em] animate-pulse">
                      Synthesizing Temporal Reality
                    </h3>
                    <p className="text-[10px] text-cyan-800 font-bold uppercase tracking-widest h-4">
                      {loadingMessage}
                    </p>
                  </div>
                </motion.div>
              ) : videoUrl ? (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col space-y-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-black text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                      <Play size={14} /> Output Buffer
                    </h3>
                    <a 
                      href={videoUrl} 
                      download="quorum-veo-capture.mp4"
                      className="p-2 hover:bg-cyan-500 hover:text-slate-950 rounded-lg border border-cyan-500/20 transition-all text-cyan-400"
                    >
                      <Download size={18} />
                    </a>
                  </div>
                  <div className={`relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-2xl flex-1 flex items-center justify-center ${aspectRatio === '9:16' ? 'aspect-[9/16] max-h-[600px] mx-auto' : 'aspect-video'}`}>
                    <video 
                      src={videoUrl} 
                      controls 
                      autoPlay 
                      loop 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center opacity-20 space-y-6">
                  <Film size={80} className="text-cyan-900" />
                  <p className="text-xs uppercase tracking-[0.4em] font-black text-cyan-900">
                    Neural Video Stream: Awaiting Sequence
                  </p>
                </div>
              )}
            </AnimatePresence>

            <div className="mt-8 grid grid-cols-3 gap-6 pt-8 border-t border-cyan-500/10 relative z-10">
              <div className="space-y-1">
                <span className="text-[8px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-1">
                  <Monitor size={10} /> Frame Depth
                </span>
                <div className="text-xl font-black text-slate-100">{resolution}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-1">
                  <Clock size={10} /> Temporal Scale
                </span>
                <div className="text-xl font-black text-slate-100">7.0s</div>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-1">
                  <Layers size={10} /> Mesh Status
                </span>
                <div className="text-xl font-black text-green-500 uppercase">Synced</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeoVideoForge;
