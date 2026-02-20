import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { 
  Image as ImageIcon, Upload, Zap, RefreshCw, 
  Download, Sparkles, AlertTriangle, X,
  Wand2, Layers, Scan, Monitor
} from 'lucide-react';

const GeminiImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateEdit = async () => {
    if (!image || !prompt) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Extract base64 data and mime type
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      // Find the image part in the response
      let generatedImage = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            generatedImage = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (generatedImage) {
        setResultImage(generatedImage);
      } else {
        setError('No image generated. The model might have returned text instead.');
      }

    } catch (err) {
      console.error('Generation error:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Wand2 size={36} className="text-cyan-500" />
            NANO EDITOR
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Gemini 2.5 Flash Image / Neural Manipulation
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded">
            <Zap size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-400 uppercase">TURBO MODE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Input Section */}
        <div className="space-y-6 flex flex-col">
          <div 
            className={`flex-1 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 transition-all relative overflow-hidden group ${
              image ? 'border-cyan-500/30 bg-slate-900/50' : 'border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/5'
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {image ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img src={image} alt="Source" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
                <button 
                  onClick={() => { setImage(null); setResultImage(null); }}
                  className="absolute top-2 right-2 p-2 bg-slate-950/80 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4 pointer-events-none">
                <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border border-cyan-500/20 group-hover:scale-110 transition-transform">
                  <Upload size={32} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-200 uppercase tracking-tight">Upload Source Image</h3>
                  <p className="text-cyan-800 text-xs font-bold uppercase tracking-widest mt-2">Drag & Drop or Click to Browse</p>
                </div>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={!!image}
            />
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/10 bg-slate-900/40 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-cyan-500" />
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Edit Instruction</span>
            </div>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe how to modify the image (e.g., 'Add a retro filter', 'Make it cyberpunk style', 'Remove the background')..."
                className="w-full bg-slate-950/50 border border-cyan-500/20 rounded-xl p-4 text-sm text-cyan-100 placeholder-cyan-900/50 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all h-32 resize-none font-mono"
              />
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={generateEdit}
                  disabled={!image || !prompt || isProcessing}
                  className={`px-6 py-2 rounded-lg font-black uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all ${
                    !image || !prompt || isProcessing
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={12} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Wand2 size={12} />
                      Execute Edit
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="glass-panel rounded-3xl border border-cyan-500/10 bg-slate-900/20 p-8 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Monitor size={20} className="text-cyan-500" />
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest">Output Feed</h3>
            </div>
            {resultImage && (
              <a 
                href={resultImage} 
                download="gemini-edit.png"
                className="p-2 bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 rounded-lg transition-all border border-cyan-500/20"
              >
                <Download size={16} />
              </a>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center rounded-2xl bg-slate-950/50 border border-cyan-500/10 overflow-hidden relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-t-2 border-cyan-500 animate-spin" />
                    <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin reverse" />
                    <div className="absolute inset-4 rounded-full border-b-2 border-emerald-500 animate-spin" />
                  </div>
                  <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest animate-pulse">
                    Neural Transformation in Progress
                  </div>
                </motion.div>
              ) : resultImage ? (
                <motion.img 
                  key="result"
                  src={resultImage}
                  alt="Generated"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-full max-h-full object-contain shadow-2xl"
                />
              ) : error ? (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center p-6 max-w-sm"
                >
                  <AlertTriangle size={32} className="text-red-500 mx-auto mb-4" />
                  <p className="text-red-400 font-bold text-sm mb-2">Generation Failed</p>
                  <p className="text-red-500/70 text-xs font-mono">{error}</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center opacity-30"
                >
                  <Layers size={48} className="text-cyan-500 mx-auto mb-4" />
                  <p className="text-cyan-400 font-black text-xs uppercase tracking-widest">Awaiting Neural Input</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-6 flex items-center justify-between text-[9px] font-mono text-cyan-900 uppercase">
            <span>Model: Gemini 2.5 Flash Image</span>
            <span>Latency: {isProcessing ? '...' : resultImage ? '1.2s' : '--'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiImageEditor;
