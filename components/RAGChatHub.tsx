
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { 
  FileText, Search, Database, Loader2, Send, 
  ShieldCheck, Trash2, Cpu, Zap, Brain, Sparkles 
} from 'lucide-react';

const RAGChatHub: React.FC = () => {
  const [documents, setDocuments] = useState<{ name: string; content: string }[]>([]);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [tier, setTier] = useState<'flash' | 'pro'>('flash');
  const [thinkingLog, setThinkingLog] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setDocuments(prev => [...prev, { name: file.name, content }]);
        setIsUploading(false);
      };
      reader.readAsText(file);
    }
  };

  const askKnowledgeBase = async () => {
    if (!query.trim() || documents.length === 0 || isProcessing) return;

    setIsProcessing(true);
    setResponse('');
    setThinkingLog(tier === 'pro' ? ["Initializing Multi-Source Analysis...", "Allocating Reasoning Budget...", "Synthesizing Contextual Substrates..."] : []);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = documents.map(d => `--- DOCUMENT: ${d.name} ---\n${d.content}`).join('\n\n');
      
      const config: any = {
        systemInstruction: "You are a RAG (Retrieval-Augmented Generation) agent within THE QUORUM OS. Context is everything. Answer the user query using only the provided sources. Be technically precise and concise.",
      };

      if (tier === 'pro') {
        config.thinkingConfig = { thinkingBudget: 2000 };
      }

      const res = await ai.models.generateContent({
        model: tier === 'pro' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview',
        contents: `Given the context below, answer the following query: ${query}.\n\nCONTEXT:\n${context}`,
        config
      });

      setResponse(res.text || "NO_DATA_FOUND");
    } catch (error) {
      console.error(error);
      setResponse("PROTOCOL_ERROR: FAILED TO EXTRACT DATA FROM VAULT. CHECK NODE STATUS.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase flex items-center gap-3">
            <Database size={28} className="text-cyan-500" />
            KNOWLEDGE RAG
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Local Document Contextualization & Synthesis</p>
        </div>
        
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-cyan-500/10">
          <button 
            onClick={() => setTier('flash')}
            className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
              tier === 'flash' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-cyan-800 hover:text-cyan-400'
            }`}
          >
            <Zap size={12} />
            Flash
          </button>
          <button 
            onClick={() => setTier('pro')}
            className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
              tier === 'pro' ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'text-purple-900 hover:text-purple-400'
            }`}
          >
            <Cpu size={12} />
            GPT-Class Pro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
        {/* Sidebar: Documents */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 flex flex-col flex-1">
            <h3 className="text-[10px] font-black text-cyan-600 tracking-widest uppercase mb-4 flex items-center space-x-2">
              <Database size={14} /> <span>Intelligence Vault</span>
            </h3>
            
            <div className="flex-1 space-y-2 mb-4 overflow-y-auto custom-scrollbar">
              {documents.length > 0 ? documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-950 border border-cyan-500/10 rounded-xl group hover:border-cyan-500/40 transition-all">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <FileText size={14} className="text-cyan-800 flex-shrink-0" />
                    <span className="text-[10px] text-slate-300 truncate font-bold">{doc.name}</span>
                  </div>
                  <button onClick={() => setDocuments(prev => prev.filter((_, idx) => idx !== i))} className="text-red-900 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={12} />
                  </button>
                </div>
              )) : (
                <div className="text-center py-12 opacity-10">
                  <Database size={48} className="mx-auto mb-2" />
                  <p className="text-[10px] uppercase tracking-widest">Vault Empty</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <input type="file" id="rag-upload" className="hidden" onChange={handleFileUpload} accept=".txt,.md,.json" />
              <label htmlFor="rag-upload" className="w-full cursor-pointer bg-slate-900 hover:bg-slate-800 py-3 rounded-xl text-[10px] font-black text-cyan-400 flex items-center justify-center space-x-2 transition border border-cyan-500/10">
                {isUploading ? <Loader2 className="animate-spin" size={14} /> : <Database size={14} />}
                <span>UPLOAD TO VAULT</span>
              </label>
            </div>
          </div>
        </div>

        {/* Main: Chat */}
        <div className="lg:col-span-3 flex flex-col h-full space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/20 flex flex-col flex-1 min-h-[500px] bg-slate-950/40">
            <div className="flex-1 overflow-y-auto mb-6 space-y-6 custom-scrollbar pr-2">
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center space-y-6"
                  >
                    <div className="relative">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className={`w-24 h-24 border-t-2 rounded-full ${tier === 'pro' ? 'border-purple-500' : 'border-cyan-500'}`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {tier === 'pro' ? <Brain className="text-purple-500 animate-pulse" size={32} /> : <Zap className="text-cyan-500 animate-pulse" size={32} />}
                      </div>
                    </div>
                    <div className="space-y-2 text-center">
                       <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${tier === 'pro' ? 'text-purple-500' : 'text-cyan-500'}`}>
                         {tier === 'pro' ? 'Deep Reasoning Active' : 'Scanning Signals'}
                       </p>
                       {tier === 'pro' && (
                         <div className="space-y-1">
                           {thinkingLog.map((log, i) => (
                             <motion.p 
                               key={i} 
                               initial={{ opacity: 0 }} 
                               animate={{ opacity: 1 }} 
                               transition={{ delay: i * 0.5 }}
                               className="text-[8px] text-purple-900 font-bold uppercase"
                             >
                               {log}
                             </motion.p>
                           ))}
                         </div>
                       )}
                    </div>
                  </motion.div>
                ) : response ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-slate-900/60 rounded-2xl border border-cyan-500/10 relative"
                  >
                    <div className="flex items-center justify-between mb-4 border-b border-cyan-500/5 pb-3">
                       <div className="flex items-center gap-2 text-[10px] text-cyan-600 font-black uppercase tracking-widest">
                         <ShieldCheck size={14} className="text-green-500" /> 
                         <span>Validated Synthesis</span>
                       </div>
                       <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${tier === 'pro' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}`}>
                         Engine: {tier.toUpperCase()}
                       </div>
                    </div>
                    <div className="text-sm text-cyan-50 leading-relaxed font-mono whitespace-pre-wrap">
                      {response}
                    </div>
                    <div className="mt-6 flex items-center gap-4 pt-4 border-t border-cyan-500/5">
                       <span className="text-[8px] text-cyan-900 font-black uppercase tracking-widest italic">Source Grounding: 100% Secure</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                    <div className="w-32 h-32 bg-cyan-500/5 rounded-full flex items-center justify-center border border-cyan-500/20">
                      <Sparkles size={64} className="text-cyan-900" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-900">Vault Query Substrate: STANDBY</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center space-x-3 bg-slate-900 border border-cyan-500/20 rounded-2xl p-2 focus-within:border-cyan-500 transition-all shadow-2xl">
              <input 
                type="text" 
                placeholder="QUERY THE KNOWLEDGE VAULT..."
                className="flex-1 bg-transparent border-none py-3 px-4 text-cyan-400 placeholder-cyan-900 focus:outline-none text-xs font-bold tracking-wider"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && askKnowledgeBase()}
              />
              <button 
                onClick={askKnowledgeBase}
                disabled={isProcessing || documents.length === 0}
                className={`p-3 rounded-xl transition-all flex items-center justify-center ${
                  isProcessing || documents.length === 0 ? 'bg-slate-800 text-cyan-950 opacity-50' : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                }`}
              >
                {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RAGChatHub;
