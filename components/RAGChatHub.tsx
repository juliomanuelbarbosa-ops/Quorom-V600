
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { FileText, Search, Database, Loader2, Send, ShieldCheck, Trash2 } from 'lucide-react';

const RAGChatHub: React.FC = () => {
  const [documents, setDocuments] = useState<{ name: string; content: string }[]>([]);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = documents.map(d => `--- DOCUMENT: ${d.name} ---\n${d.content}`).join('\n\n');
      
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a RAG (Retrieval-Augmented Generation) agent within THE QUORUM. 
        Context information is below:
        ---------------------
        ${context}
        ---------------------
        Given the context above and no other information, answer the following query: ${query}. 
        If the answer is not in the context, state that the information is missing from the local vault.`,
      });

      setResponse(res.text || "NO_DATA_FOUND");
    } catch (error) {
      console.error(error);
      setResponse("PROTOCOL_ERROR: FAILED TO EXTRACT DATA FROM VAULT.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">KNOWLEDGE RAG</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Local Document Contextualization</p>
        </div>
        <div className="flex space-x-2">
           <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400">ZERO-TRUST STORAGE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Documents */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-cyan-500/20 flex flex-col h-full">
            <h3 className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-4 flex items-center space-x-2">
              <Database size={14} /> <span>Local Vault</span>
            </h3>
            
            <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-[300px]">
              {documents.length > 0 ? documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-900 border border-cyan-500/10 rounded group">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <FileText size={12} className="text-cyan-800 flex-shrink-0" />
                    <span className="text-[10px] text-slate-300 truncate">{doc.name}</span>
                  </div>
                  <button onClick={() => setDocuments(prev => prev.filter((_, idx) => idx !== i))} className="text-red-900 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={12} />
                  </button>
                </div>
              )) : (
                <div className="text-center py-12 opacity-10">
                  <Database size={32} className="mx-auto mb-2" />
                  <p className="text-[8px] uppercase tracking-widest">Vault Empty</p>
                </div>
              )}
            </div>

            <input type="file" id="rag-upload" className="hidden" onChange={handleFileUpload} accept=".txt,.md,.json" />
            <label htmlFor="rag-upload" className="w-full cursor-pointer bg-slate-800 hover:bg-slate-700 py-3 rounded text-[10px] font-bold text-cyan-400 flex items-center justify-center space-x-2 transition border border-cyan-500/20">
              {isUploading ? <Loader2 className="animate-spin" size={14} /> : <Database size={14} />}
              <span>UPLOAD TO VAULT</span>
            </label>
          </div>
        </div>

        {/* Main: Chat */}
        <div className="lg:col-span-2 flex flex-col h-full space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-cyan-500/20 flex flex-col flex-1 min-h-[400px]">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 font-mono">
              {response ? (
                <div className="p-4 bg-slate-900/50 rounded border border-cyan-500/10">
                   <div className="flex items-center space-x-2 text-[10px] text-cyan-800 font-bold uppercase mb-2">
                     <ShieldCheck size={12} /> <span>Validated Response</span>
                   </div>
                   <div className="text-xs text-cyan-100 leading-relaxed whitespace-pre-wrap">
                     {response}
                   </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-10">
                  <Search size={48} className="mb-4" />
                  <p className="text-xs uppercase tracking-[0.3em]">Query the vault knowledge base</p>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="EXECUTE KNOWLEDGE SEARCH..."
                className="flex-1 bg-slate-900 border border-cyan-500/20 rounded p-4 text-cyan-400 placeholder-cyan-900 focus:outline-none focus:border-cyan-500 text-xs"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && askKnowledgeBase()}
              />
              <button 
                onClick={askKnowledgeBase}
                disabled={isProcessing || documents.length === 0}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 px-6 rounded font-black text-xs transition-all flex items-center justify-center"
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
