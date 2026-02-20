
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, ThinkingLevel, Type, FunctionDeclaration } from "@google/genai";
import { 
  Send, Bot, User, Loader2, Info, 
  Sparkles, Zap, Globe, MapPin, BrainCircuit,
  Settings, ChevronDown, Terminal
} from 'lucide-react';
import useQuorumStore from './useQuorumStore';

type ChatMode = 'pro' | 'thinking' | 'lite' | 'search' | 'maps' | 'operator';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  groundingMetadata?: any;
}

const GeminiOracle: React.FC = () => {
  const { 
    addIntelBrief, 
    unlockAchievement, 
    setActiveView, 
    missionLogs, 
    intelBriefs 
  } = useQuorumStore();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>('pro');
  const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const operatorTools: FunctionDeclaration[] = [
    {
      name: "add_intel_brief",
      parameters: {
        type: Type.OBJECT,
        description: "Add a new intelligence brief to the global Quorum feed.",
        properties: {
          type: { type: Type.STRING, description: "The category of intel (e.g., 'SECURITY', 'MARKET', 'WHALE_ALERT')" },
          content: { type: Type.STRING, description: "The actual intelligence data or message." },
          severity: { type: Type.STRING, enum: ['high', 'medium', 'low', 'info'], description: "Importance level." }
        },
        required: ["type", "content", "severity"]
      }
    },
    {
      name: "unlock_achievement",
      parameters: {
        type: Type.OBJECT,
        description: "Grant the operator an achievement and XP.",
        properties: {
          text: { type: Type.STRING, description: "Description of the achievement." },
          xp: { type: Type.NUMBER, description: "Amount of XP to grant." }
        },
        required: ["text", "xp"]
      }
    },
    {
      name: "navigate_to_module",
      parameters: {
        type: Type.OBJECT,
        description: "Switch the active Quorum module view.",
        properties: {
          moduleId: { 
            type: Type.STRING, 
            enum: ['dashboard', 'home', 'gemini-oracle', 'gemini-vision', 'gemini-audio', 'multi-agent-swarm', 'babel-protocol', 'chain-sight', 'signal-nexus', 'api-dashboard', 'supabase-substrate', 'netdata-observer', 'emulator-archive', 'mame-core'],
            description: "The ID of the module to navigate to." 
          }
        },
        required: ["moduleId"]
      }
    },
    {
      name: "get_system_status",
      parameters: {
        type: Type.OBJECT,
        description: "Retrieve current system status including mission logs and latest intel.",
        properties: {}
      }
    }
  ];

  const getModelConfig = (mode: ChatMode) => {
    switch (mode) {
      case 'thinking':
        return {
          model: 'gemini-3.1-pro-preview',
          config: {
            thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
          }
        };
      case 'lite':
        return {
          model: 'gemini-2.5-flash-lite-preview-02-05',
          config: {}
        };
      case 'search':
        return {
          model: 'gemini-3-flash-preview',
          config: {
            tools: [{ googleSearch: {} }]
          }
        };
      case 'maps':
        return {
          model: 'gemini-2.5-flash',
          config: {
            tools: [{ googleMaps: {} }]
          }
        };
      case 'operator':
        return {
          model: 'gemini-3.1-pro-preview',
          config: {
            tools: [{ functionDeclarations: operatorTools }]
          }
        };
      case 'pro':
      default:
        return {
          model: 'gemini-3.1-pro-preview',
          config: {}
        };
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const { model, config } = getModelConfig(mode);
      
      const finalConfig = {
        ...config,
        systemInstruction: mode === 'operator' 
          ? "You are the NEURAL OPERATOR of THE QUORUM. You have direct access to system modules. Use your tools to assist the user in managing the OS. Speak in a sharp, authoritative, technical cyberpunk tone."
          : "You are the central oracle of THE QUORUM v600.0. Speak in a concise, technical, cyberpunk tone. If using tools, integrate the results naturally.",
      };

      const response = await ai.models.generateContent({
        model: model,
        contents: userMessage,
        config: finalConfig
      });

      // Handle function calls if in operator mode
      if (mode === 'operator' && response.functionCalls) {
        for (const call of response.functionCalls) {
          if (call.name === 'add_intel_brief') {
            const args = call.args as any;
            addIntelBrief({
              id: `ai-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
              type: args.type,
              content: args.content,
              severity: args.severity
            });
          } else if (call.name === 'unlock_achievement') {
            const args = call.args as any;
            unlockAchievement(args.text, args.xp);
          } else if (call.name === 'navigate_to_module') {
            const args = call.args as any;
            setActiveView(args.moduleId);
          } else if (call.name === 'get_system_status') {
            // We can't easily send feedback back to the model in this simple UI loop without a chat session,
            // but we can at least acknowledge it or show it in the response.
            console.log("System status requested by AI");
          }
        }
      }

      const text = response.text || (response.functionCalls ? "EXECUTING_SYSTEM_COMMANDS..." : "PROTOCOL_ERROR: Signal lost in the mesh.");
      const grounding = response.candidates?.[0]?.groundingMetadata;

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: text,
        groundingMetadata: grounding
      }]);

    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: `ERROR_SYSTEM_CORE: ${error.message || "API synchronization failed."}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const modes = [
    { id: 'pro', label: 'Gemini Pro 3.1', icon: <Sparkles size={14} />, desc: 'Standard Reasoning' },
    { id: 'operator', label: 'Neural Operator', icon: <Terminal size={14} />, desc: 'System Control Mode' },
    { id: 'thinking', label: 'Deep Thinker', icon: <BrainCircuit size={14} />, desc: 'High Reasoning Mode' },
    { id: 'lite', label: 'Flash Lite', icon: <Zap size={14} />, desc: 'Low Latency' },
    { id: 'search', label: 'Web Search', icon: <Globe size={14} />, desc: 'Google Search Grounding' },
    { id: 'maps', label: 'Maps Guide', icon: <MapPin size={14} />, desc: 'Google Maps Grounding' },
  ];

  const activeMode = modes.find(m => m.id === mode);

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto pb-6">
      <div className="flex items-center justify-between mb-6 border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase flex items-center gap-3">
            <Bot size={32} className="text-cyan-500" />
            GEMINI OMNI-ORACLE
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1 font-bold">
            Multi-Model Neural Interface / v3.1
          </p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsModeMenuOpen(!isModeMenuOpen)}
            className="flex items-center gap-3 px-4 py-2 bg-slate-900 border border-cyan-500/30 rounded-lg hover:bg-slate-800 transition-all min-w-[200px] justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="text-cyan-400">{activeMode?.icon}</div>
              <div className="text-left">
                <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{activeMode?.label}</div>
                <div className="text-[8px] text-cyan-700 font-bold uppercase">{activeMode?.desc}</div>
              </div>
            </div>
            <ChevronDown size={14} className={`text-cyan-500 transition-transform ${isModeMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isModeMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-slate-950 border border-cyan-500/30 rounded-xl shadow-2xl z-50 overflow-hidden">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { setMode(m.id as ChatMode); setIsModeMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-cyan-500/10 transition-colors border-b border-cyan-500/10 last:border-0 ${
                    mode === m.id ? 'bg-cyan-500/5' : ''
                  }`}
                >
                  <div className={`p-2 rounded-lg ${mode === m.id ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-cyan-500'}`}>
                    {m.icon}
                  </div>
                  <div className="text-left">
                    <div className={`text-[10px] font-black uppercase tracking-widest ${mode === m.id ? 'text-cyan-400' : 'text-slate-300'}`}>
                      {m.label}
                    </div>
                    <div className="text-[8px] text-slate-500 font-bold uppercase">{m.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl border border-cyan-500/20 flex flex-col overflow-hidden mb-6 bg-slate-900/40 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-30" />
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth custom-scrollbar" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-30 space-y-6">
              <div className="w-24 h-24 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-500/5 animate-pulse">
                <BrainCircuit size={48} className="text-cyan-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-400">Neural Link Established</p>
                <p className="text-[10px] text-cyan-800 font-bold uppercase mt-2">Select a mode and transmit query</p>
              </div>
            </div>
          ) : (
            messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex items-start gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                    m.role === 'user' ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                  }`}>
                    {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`p-5 rounded-2xl text-sm leading-relaxed shadow-lg ${
                      m.role === 'user' 
                        ? 'bg-slate-800 text-slate-200 rounded-tr-none border border-slate-700' 
                        : 'bg-slate-950 text-cyan-50 rounded-tl-none border border-cyan-500/20'
                    }`}>
                      <div className="whitespace-pre-wrap font-mono text-xs md:text-sm">{m.content}</div>
                    </div>

                    {/* Grounding Sources Display */}
                    {m.groundingMetadata?.groundingChunks && (
                      <div className="flex flex-wrap gap-2 mt-2 ml-1">
                        {m.groundingMetadata.groundingChunks.map((chunk: any, i: number) => (
                          chunk.web?.uri ? (
                            <a 
                              key={i} 
                              href={chunk.web.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 border border-cyan-500/20 rounded text-[9px] text-cyan-400 hover:bg-cyan-500/10 transition-colors uppercase font-bold tracking-wider"
                            >
                              <Globe size={10} />
                              {chunk.web.title || "Source"}
                            </a>
                          ) : null
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
                  <Loader2 size={16} className="animate-spin text-cyan-400" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-cyan-500 font-black uppercase tracking-widest animate-pulse">
                    {mode === 'thinking' ? 'Reasoning Deeply...' : 'Processing...'}
                  </div>
                  <div className="h-0.5 w-24 bg-cyan-900/30 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 w-1/2 animate-progress" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-cyan-500/10 bg-slate-900/80 backdrop-blur-sm">
          <div className="relative">
            <input 
              type="text"
              placeholder={`TRANSMIT TO ${activeMode?.label.toUpperCase()}...`}
              className="w-full bg-slate-950 border border-cyan-500/20 rounded-xl p-4 pr-16 text-cyan-400 focus:outline-none focus:border-cyan-500 transition-all shadow-inner font-mono text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 px-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 rounded-lg transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between px-2">
             <div className="flex items-center gap-2 text-[8px] text-cyan-800 font-bold uppercase tracking-widest">
                <Info size={10} />
                <span>Encrypted Channel // Zero Retention</span>
             </div>
             <div className="text-[8px] text-cyan-900 font-mono">
                LATENCY: {isLoading ? '...' : '12ms'}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiOracle;
