
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { 
  Layout, MessageSquare, Plus, Settings, Globe, 
  Database, Zap, Send, Paperclip, MoreHorizontal,
  History, Search, User, Bot, Loader2, Sparkles,
  Shield, ExternalLink, Star, Trash2
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
}

const OpenWebUIHub: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeModel, setActiveModel] = useState('Gemini 3 Flash');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'workspace'>('chat');
  const scrollRef = useRef<HTMLDivElement>(null);

  const availableModels = [
    { name: 'Gemini 3 Flash', engine: 'Cloud-Mesh', status: 'Online' },
    { name: 'Llama 3.1 8B', engine: 'Ollama-Local', status: 'Online' },
    { name: 'Mistral Large', engine: 'External-API', status: 'Offline' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userContent = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userContent }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userContent,
        config: {
          systemInstruction: "You are the interface layer of Open WebUI integrated into THE QUORUM OS. You are professional, helpful, and highly technical.",
        }
      });

      const text = response.text || "INTERFACE_ERROR: Null response from neural substrate.";
      setMessages(prev => [...prev, { role: 'assistant', content: text, model: activeModel }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "CRITICAL_FAILURE: Connection to LLM backend severed." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Layout size={32} className="text-cyan-500" />
            OPEN WEBUI
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Universal Intelligence Interface / v0.5.0
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded">
            <Star size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-400 uppercase">42K COMMUNITY</span>
          </div>
          <a href="https://github.com/open-webui/open-webui" target="_blank" rel="noopener noreferrer" className="text-cyan-900 hover:text-cyan-400 transition-colors">
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-3xl border border-cyan-500/10 bg-slate-950/40 flex overflow-hidden">
        {/* Component Sidebar */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-r border-cyan-500/10 bg-slate-900/30 flex flex-col"
            >
              <div className="p-4 space-y-4">
                <button className="w-full py-2.5 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 rounded-xl text-[10px] font-black text-cyan-400 flex items-center justify-center gap-2 transition-all">
                  <Plus size={14} /> NEW TRANSMISSION
                </button>

                <div className="space-y-1">
                  <div className="text-[8px] font-black text-cyan-900 uppercase tracking-widest px-2 mb-2">Workspace</div>
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className={`w-full p-2 rounded-lg text-left text-[10px] font-bold flex items-center gap-3 transition-all ${activeTab === 'chat' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:bg-slate-800'}`}
                  >
                    <MessageSquare size={14} /> Chat
                  </button>
                  <button 
                    onClick={() => setActiveTab('workspace')}
                    className={`w-full p-2 rounded-lg text-left text-[10px] font-bold flex items-center gap-3 transition-all ${activeTab === 'workspace' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:bg-slate-800'}`}
                  >
                    <Database size={14} /> Knowledge
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar px-4">
                <div className="text-[8px] font-black text-cyan-900 uppercase tracking-widest px-2 mb-2">History</div>
                <div className="space-y-1">
                  {[1, 2, 3].map(i => (
                    <button key={i} className="w-full p-2 rounded-lg text-left text-[9px] font-bold text-slate-400 hover:bg-slate-800 flex items-center justify-between group">
                       <span className="truncate">Sovereign Protocol Query #{i}</span>
                       <Trash2 size={10} className="opacity-0 group-hover:opacity-100 text-red-900 hover:text-red-500 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-cyan-500/10">
                 <button className="w-full p-2 rounded-lg text-left text-[10px] font-bold text-slate-500 hover:bg-slate-800 flex items-center gap-3">
                    <Settings size={14} /> Interface Settings
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Interface */}
        <div className="flex-1 flex flex-col relative bg-slate-950/20">
          <div className="p-4 border-b border-cyan-500/10 flex items-center justify-between bg-slate-900/20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-cyan-900"
              >
                <History size={18} />
              </button>
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-cyan-500/20 rounded-xl hover:border-cyan-500/50 transition-all">
                   <Bot size={14} className="text-cyan-500" />
                   <span className="text-[10px] font-black text-slate-200 uppercase">{activeModel}</span>
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900 border border-cyan-500/20 rounded-xl hidden group-hover:block z-50 shadow-2xl p-2">
                   {availableModels.map(m => (
                     <button 
                        key={m.name}
                        onClick={() => setActiveModel(m.name)}
                        className="w-full p-2 rounded-lg text-left hover:bg-cyan-500/10 flex items-center justify-between group"
                     >
                        <div>
                           <div className="text-[10px] font-black text-slate-200 uppercase">{m.name}</div>
                           <div className="text-[8px] text-cyan-900 font-bold uppercase">{m.engine}</div>
                        </div>
                        <div className={`w-1.5 h-1.5 rounded-full ${m.status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                     </button>
                   ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="px-2 py-0.5 rounded-full bg-cyan-500/5 border border-cyan-500/10 text-[8px] font-black text-cyan-900 uppercase">Latency: 14ms</div>
               <button className="p-1.5 hover:bg-slate-800 rounded-lg text-cyan-900"><Search size={18} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar scroll-smooth" ref={scrollRef}>
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center space-y-8"
                >
                  <div className="w-20 h-20 bg-cyan-500/5 border border-cyan-500/20 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
                     <Layout size={40} className="text-cyan-500" />
                     <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute inset-0 border border-dashed border-cyan-500/40 rounded-full scale-150"
                     />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-black text-slate-100 uppercase tracking-widest">Awaiting Neural Link</h3>
                    <p className="text-[10px] text-cyan-900 font-bold uppercase tracking-widest">Establish a query parameter to initialize generation</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
                     {[
                       { t: "Research sovereign tech stack", i: <Shield size={12} /> },
                       { t: "Audit mesh network security", i: <Zap size={12} /> },
                       { t: "Generate smart contract substrate", i: <Database size={12} /> },
                       { t: "Coordinate global neural nodes", i: <Globe size={12} /> }
                     ].map((p, i) => (
                       <button 
                        key={i} 
                        onClick={() => setInput(p.t)}
                        className="p-4 bg-slate-900/50 border border-cyan-500/10 rounded-2xl hover:border-cyan-500/40 transition-all text-left group"
                       >
                         <div className="text-cyan-900 mb-2 group-hover:text-cyan-400 transition-colors">{p.i}</div>
                         <div className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase">{p.t}</div>
                       </button>
                     ))}
                  </div>
                </motion.div>
              ) : (
                messages.map((m, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                        m.role === 'user' ? 'bg-slate-900 border-cyan-900/50 text-cyan-900' : 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      }`}>
                        {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                      </div>
                      <div className="space-y-2">
                        {m.model && (
                          <div className="text-[8px] font-black text-cyan-900 uppercase tracking-widest">{m.model}</div>
                        )}
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          m.role === 'user' ? 'bg-slate-900 text-slate-200' : 'bg-slate-900/80 border border-cyan-500/10 text-cyan-50 shadow-xl'
                        }`}>
                          {m.content}
                        </div>
                        {m.role === 'assistant' && (
                          <div className="flex gap-4 px-2">
                            <button className="text-[8px] font-black text-cyan-900 uppercase hover:text-cyan-400 transition-all">Copy</button>
                            <button className="text-[8px] font-black text-cyan-900 uppercase hover:text-cyan-400 transition-all">Regenerate</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl border border-cyan-400 bg-cyan-500 text-slate-950 flex items-center justify-center">
                       <Loader2 size={18} className="animate-spin" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <div className="text-[8px] font-black text-cyan-400 uppercase tracking-widest animate-pulse">Assistant is thinking...</div>
                       <div className="bg-slate-900/80 border border-cyan-500/10 p-4 rounded-2xl">
                          <div className="flex gap-1">
                             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 animate-bounce" />
                             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 animate-bounce [animation-delay:0.2s]" />
                             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 animate-bounce [animation-delay:0.4s]" />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-6">
            <div className="max-w-4xl mx-auto relative">
               <div className="absolute inset-0 bg-cyan-500/5 blur-3xl -z-10 rounded-full opacity-50" />
               <div className="glass-panel border border-cyan-500/20 rounded-3xl p-2 focus-within:border-cyan-500 transition-all shadow-2xl bg-slate-900/90 backdrop-blur-xl">
                  <div className="flex items-end gap-2 p-2">
                     <button className="p-2.5 hover:bg-slate-800 rounded-2xl text-cyan-900 hover:text-cyan-400 transition-all">
                        <Paperclip size={20} />
                     </button>
                     <textarea 
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                        placeholder="Send a transmission to the mesh..."
                        className="flex-1 bg-transparent border-none py-3 px-2 text-cyan-50 placeholder-cyan-900 focus:outline-none text-sm resize-none custom-scrollbar min-h-[44px] max-h-48"
                     />
                     <button 
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isTyping}
                        className={`p-3 rounded-2xl transition-all shadow-lg ${
                          !input.trim() || isTyping ? 'bg-slate-800 text-cyan-900 opacity-50' : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20'
                        }`}
                     >
                        <Send size={20} />
                     </button>
                  </div>
               </div>
               <div className="mt-3 flex justify-between px-4">
                  <div className="flex items-center gap-4 text-[8px] font-black text-cyan-900 uppercase tracking-widest">
                     <div className="flex items-center gap-1"><Sparkles size={10} /> Grounding: ON</div>
                     <div className="flex items-center gap-1"><Globe size={10} /> Web Access: ACTIVE</div>
                  </div>
                  <div className="text-[8px] font-black text-cyan-900 uppercase tracking-widest">
                    Press Shift+Enter for new line
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenWebUIHub;
