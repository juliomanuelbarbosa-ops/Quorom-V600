
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User, Loader2, Info } from 'lucide-react';

const GeminiOracle: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Corrected: Initialize GoogleGenAI right before making an API call and use process.env.API_KEY directly.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are the central oracle of THE QUORUM v600.0, a cyberpunk decentralized OS. Speak in a concise, highly technical, yet slightly cryptic cyberpunk tone. Focus on sovereignty, decentralization, and truth-seeking.",
        }
      });

      // Corrected: Access the .text property directly (do not call it as a function).
      const text = response.text || "PROTOCOL_ERROR: Signal lost in the mesh.";
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "ERROR_SYSTEM_CORE: API synchronization failed. Check local node connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">GEMINI ORACLE</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Direct Neural Link to Gemini Core</p>
        </div>
        <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400">ENCRYPTED STREAM</div>
      </div>

      <div className="flex-1 glass-panel rounded-xl border border-cyan-500/20 flex flex-col overflow-hidden mb-6">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4">
              <Bot size={64} className="text-cyan-400" />
              <p className="text-xs uppercase tracking-[0.5em] text-cyan-400">Awaiting user transmission...</p>
            </div>
          ) : (
            messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] flex items-start space-x-3 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded border flex items-center justify-center flex-shrink-0 ${
                    m.role === 'user' ? 'bg-slate-800 border-cyan-800 text-cyan-800' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                  }`}>
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-4 rounded-lg text-sm leading-relaxed ${
                    m.role === 'user' ? 'bg-slate-800 text-slate-200' : 'bg-slate-900 border border-cyan-500/10 text-cyan-50'
                  }`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
                  <Loader2 size={14} className="animate-spin text-cyan-400" />
                </div>
                <span className="text-[10px] text-cyan-800 uppercase tracking-widest font-bold">Synchronizing with node...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-cyan-500/10 bg-slate-900/50">
          <div className="relative">
            <input 
              type="text"
              placeholder="TRANSMIT TO ORACLE..."
              className="w-full bg-slate-950 border border-cyan-500/20 rounded-lg p-4 pr-16 text-cyan-400 focus:outline-none focus:border-cyan-500 transition-colors"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading}
              className="absolute right-2 top-2 bottom-2 px-4 bg-cyan-500 text-slate-950 rounded hover:bg-cyan-400 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center space-x-4">
             <div className="flex items-center space-x-1 text-[8px] text-cyan-900 font-bold uppercase tracking-widest">
                <Info size={10} />
                <span>Zero Retention Protocol Active</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiOracle;
