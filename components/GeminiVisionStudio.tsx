import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { 
  Image as ImageIcon, Upload, Zap, RefreshCw, 
  Download, Sparkles, AlertTriangle, X,
  Wand2, Layers, Scan, Monitor, Eye,
  Maximize, Minimize, Film, FileVideo
} from 'lucide-react';

type Mode = 'generate' | 'analyze-image' | 'analyze-video';
type AspectRatio = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';
type ImageSize = '1K' | '2K' | '4K';

const GeminiVisionStudio: React.FC = () => {
  const [mode, setMode] = useState<Mode>('generate');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [imageSize, setImageSize] = useState<ImageSize>('1K');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
        setAnalysisResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const executeAction = async () => {
    if (mode === 'generate' && !prompt) return;
    if ((mode === 'analyze-image' || mode === 'analyze-video') && !mediaFile) return;

    setIsProcessing(true);
    setError(null);
    setResult(null);
    setAnalysisResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      if (mode === 'generate') {
        // Image Generation
        // Using generateContent for nano banana series as per guidelines for 'gemini-3-pro-image-preview'
        // Guidelines say: "Upgrade to gemini-3-pro-image-preview if the user requests high-quality images"
        // And "Call generateContent to generate images with nano banana series models"
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio,
              imageSize: imageSize
            }
          }
        });

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
          setResult(generatedImage);
        } else {
          throw new Error("No image data returned from the model.");
        }

      } else if (mode === 'analyze-image') {
        // Image Analysis
        if (!mediaPreview) return;
        const base64Data = mediaPreview.split(',')[1];
        const mimeType = mediaPreview.split(';')[0].split(':')[1];

        const response = await ai.models.generateContent({
          model: 'gemini-3.1-pro-preview',
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: mimeType,
                },
              },
              {
                text: prompt || "Analyze this image in detail. Describe the visual elements, style, and any text present.",
              },
            ],
          },
        });

        setAnalysisResult(response.text || "No analysis generated.");

      } else if (mode === 'analyze-video') {
        // Video Analysis
        // For video, we typically need to upload bytes. 
        // Since we are in browser, we can try inlineData if small, but for larger videos usually File API is needed.
        // Guidelines say: "Call generateContent to generate images...". For video understanding: "Add video understanding... using gemini-3.1-pro-preview"
        // The SDK supports base64 for video in inlineData for some models, but usually it's better to use File API.
        // However, the environment constraints might limit File API usage (uploading to Google File API).
        // Let's try inlineData with a size limit check or warning.
        
        if (!mediaPreview) return;
        const base64Data = mediaPreview.split(',')[1];
        const mimeType = mediaPreview.split(';')[0].split(':')[1];

        // Note: Real-world video analysis via API often requires uploading to File API first.
        // Here we attempt inline for short clips as per "preview" environment limitations.
        
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-pro-preview',
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: mimeType,
                },
              },
              {
                text: prompt || "Analyze this video. Summarize the key events and visual details.",
              },
            ],
          },
        });

        setAnalysisResult(response.text || "No analysis generated.");
      }

    } catch (err: any) {
      console.error('Operation error:', err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Eye size={36} className="text-cyan-500" />
            GEMINI VISION STUDIO
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Multimodal Perception & Synthesis Hub
          </p>
        </div>
        <div className="flex gap-2 bg-slate-900/50 p-1 rounded-lg border border-cyan-500/20">
          {[
            { id: 'generate', label: 'Generate', icon: <Wand2 size={14} /> },
            { id: 'analyze-image', label: 'Analyze Image', icon: <Scan size={14} /> },
            { id: 'analyze-video', label: 'Analyze Video', icon: <FileVideo size={14} /> }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id as Mode); setResult(null); setAnalysisResult(null); setError(null); }}
              className={`px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                mode === m.id 
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                  : 'text-cyan-900 hover:text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              {m.icon}
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        {/* Controls Column */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/40 space-y-6">
            
            {mode === 'generate' ? (
              <>
                <div className="space-y-4">
                  <label className="text-[10px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-2">
                    <Maximize size={12} /> Aspect Ratio
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {['1:1', '16:9', '9:16', '4:3', '3:4', '3:2', '2:3', '21:9'].map((r) => (
                      <button
                        key={r}
                        onClick={() => setAspectRatio(r as AspectRatio)}
                        className={`py-2 text-[9px] font-black uppercase rounded border transition-all ${
                          aspectRatio === r 
                            ? 'bg-cyan-500 text-slate-950 border-cyan-500' 
                            : 'bg-slate-950 text-cyan-800 border-cyan-500/20 hover:border-cyan-500/50'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-2">
                    <Monitor size={12} /> Resolution
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['1K', '2K', '4K'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setImageSize(s as ImageSize)}
                        className={`py-2 text-[9px] font-black uppercase rounded border transition-all ${
                          imageSize === s 
                            ? 'bg-cyan-500 text-slate-950 border-cyan-500' 
                            : 'bg-slate-950 text-cyan-800 border-cyan-500/20 hover:border-cyan-500/50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <label className="text-[10px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-2">
                  <Upload size={12} /> Input Media
                </label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all relative overflow-hidden group ${
                    mediaFile ? 'border-cyan-500/30 bg-slate-900/50' : 'border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/5'
                  }`}
                >
                  {mediaPreview ? (
                    <div className="relative w-full h-32 flex items-center justify-center">
                      {mode === 'analyze-video' ? (
                        <video src={mediaPreview} className="max-w-full max-h-full rounded" />
                      ) : (
                        <img src={mediaPreview} alt="Preview" className="max-w-full max-h-full object-contain rounded" />
                      )}
                      <button 
                        onClick={() => { setMediaFile(null); setMediaPreview(null); }}
                        className="absolute top-0 right-0 p-1.5 bg-slate-950/80 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center space-y-2 pointer-events-none">
                      <Upload size={24} className="text-cyan-800 mx-auto" />
                      <p className="text-[9px] text-cyan-800 font-bold uppercase tracking-widest">
                        Upload {mode === 'analyze-video' ? 'Video' : 'Image'}
                      </p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept={mode === 'analyze-video' ? "video/*" : "image/*"}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={!!mediaFile}
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <label className="text-[10px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={12} /> {mode === 'generate' ? 'Prompt' : 'Instructions (Optional)'}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={mode === 'generate' ? "Describe the image to generate..." : "Ask questions about the media..."}
                className="w-full bg-slate-950 border border-cyan-500/20 rounded-xl p-4 text-cyan-400 focus:outline-none focus:border-cyan-500 text-sm h-32 resize-none leading-relaxed font-mono"
              />
            </div>

            <button 
              onClick={executeAction}
              disabled={isProcessing || (mode === 'generate' && !prompt) || (mode !== 'generate' && !mediaFile)}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 py-4 rounded-xl font-black text-xs tracking-[0.3em] transition-all uppercase shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
              <span>{mode === 'generate' ? 'Synthesize' : 'Analyze'}</span>
            </button>
          </div>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/20 min-h-[500px] flex flex-col relative overflow-hidden h-full bg-slate-900/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Monitor size={20} className="text-cyan-500" />
                <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest">
                  {mode === 'generate' ? 'Visual Output' : 'Analysis Stream'}
                </h3>
              </div>
              {result && (
                <a 
                  href={result} 
                  download="gemini-vision-output.png"
                  className="p-2 bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 rounded-lg transition-all border border-cyan-500/20"
                >
                  <Download size={16} />
                </a>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center rounded-2xl bg-slate-950/50 border border-cyan-500/10 overflow-hidden relative">
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
                      Processing Neural Tensors
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.img 
                    key="result-img"
                    src={result}
                    alt="Generated"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-full max-h-full object-contain shadow-2xl"
                  />
                ) : analysisResult ? (
                  <motion.div 
                    key="result-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full h-full p-6 overflow-y-auto custom-scrollbar"
                  >
                    <div className="prose prose-invert prose-sm max-w-none font-mono text-cyan-100">
                      <p className="whitespace-pre-wrap">{analysisResult}</p>
                    </div>
                  </motion.div>
                ) : error ? (
                  <motion.div 
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center p-6 max-w-sm"
                  >
                    <AlertTriangle size={32} className="text-red-500 mx-auto mb-4" />
                    <p className="text-red-400 font-bold text-sm mb-2">Operation Failed</p>
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
                    <p className="text-cyan-400 font-black text-xs uppercase tracking-widest">System Standby</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-6 flex items-center justify-between text-[9px] font-mono text-cyan-900 uppercase">
              <span>Model: {mode === 'generate' ? 'Gemini 3 Pro Image' : 'Gemini 3.1 Pro'}</span>
              <span>Status: {isProcessing ? 'COMPUTING' : 'IDLE'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiVisionStudio;
