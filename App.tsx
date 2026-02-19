import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Cpu, BrainCircuit, Wallet, Code, Database, ShieldAlert, Globe, Activity,
  Menu, X, Search, Zap, Users, FileText, Boxes, Layers, CreditCard, BarChart3,
  Map as MapIcon, BookOpen, Layout, Binary, Monitor, CheckSquare, Network, Rocket,
  ShieldCheck, TerminalSquare, Wrench, Shapes, Bot, Command, Globe2, Sparkles,
  Link as LinkIcon, Lock
} from 'lucide-react';

import GrokNexus from './components/GrokNexus';
import TensorFlowPlayground from './components/TensorFlowPlayground';
import AIToolsDirectory from './components/AIToolsDirectory';
import CryptoHub from './components/CryptoHub';
import GithubExplorer from './components/GithubExplorer';
import GeminiOracle from './components/GeminiOracle';
import MultiAgentHub from './components/MultiAgentHub';
import RAGChatHub from './components/RAGChatHub';
import LocalLLMRunner from './components/LocalLLMRunner';
import NFTCreatorHub from './components/NFTCreatorHub';
import StripePaymentHub from './components/StripePaymentHub';
import ApiDashboardHub from './components/ApiDashboardHub';
import DeveloperRoadmapExplorer from './components/DeveloperRoadmapExplorer';
import JsAlgorithmsVisualizer from './components/JsAlgorithmsVisualizer';
import AwesomeListsDirectory from './components/AwesomeListsDirectory';
import PublicApisExplorer from './components/PublicApisExplorer';
import SystemDesignPrimerHub from './components/SystemDesignPrimerHub';
import ReactPlayground from './components/ReactPlayground';
import CodingInterviewUniversity from './components/CodingInterviewUniversity';
import CrewAgentHub from './components/CrewAgentHub';
import MusicWiz from './components/MusicWiz';
import VuePlayground from './components/VuePlayground';
import AirbnbStyleGuideHub from './components/AirbnbStyleGuideHub';
import OhMyZshConfigurator from './components/OhMyZshConfigurator';
import BuildYourOwnXHub from './components/BuildYourOwnXHub';
import PythonAlgorithmsVisualizer from './components/PythonAlgorithmsVisualizer';
import SecurityAuditHub from './components/SecurityAuditHub';
import LangGraphVisualizer from './components/LangGraphVisualizer';

// Additional promised functional hubs to reach 28
import TransformersJsHub from './components/TransformersJsHub';
import OllamaLocalRunner from './components/OllamaLocalRunner';
import FreeCodeCampHub from './components/FreeCodeCampHub';

import { NavSection } from './types';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [bootSequence, setBootSequence] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navSections: NavSection[] = [
    { 
      title: "CORE SYSTEMS", 
      items: [
        { id: 'home', label: 'GROK NEXUS', icon: 'Globe' },
        { id: 'gemini-oracle', label: 'GEMINI ORACLE', icon: 'BrainCircuit' },
        { id: 'api-dashboard', label: 'LIVE DATAFEED', icon: 'BarChart3' }
      ] 
    },
    { 
      title: "AI & COGNITION", 
      items: [
        { id: 'multi-agent-hub', label: 'SWARM COGNITION', icon: 'Users' },
        { id: 'crew-agent-hub', label: 'CREW AI OPS', icon: 'Network' },
        { id: 'langgraph-visualizer', label: 'LANGGRAPH MESH', icon: 'Shapes' },
        { id: 'rag-chat', label: 'KNOWLEDGE RAG', icon: 'Database' },
        { id: 'tensorflow-playground', label: 'TF.JS PLAYGROUND', icon: 'Cpu' },
        { id: 'transformers-js', label: 'TRANSFORMERS.JS', icon: 'Zap' },
        { id: 'ollama-runner', label: 'OLLAMA LOCAL', icon: 'Terminal' },
        { id: 'local-llm', label: 'WASM RUNNER', icon: 'Boxes' }
      ] 
    },
    { 
      title: "DEVELOPER TOOLS", 
      items: [
        { id: 'developer-roadmap', label: 'ROADMAP EXPLORER', icon: 'MapIcon' },
        { id: 'js-algorithms', label: 'JS ALGORITHMS', icon: 'Binary' },
        { id: 'python-algorithms', label: 'PYTHON ALGORITHMS', icon: 'TerminalSquare' },
        { id: 'react-playground', label: 'REACT PLAYGROUND', icon: 'Monitor' },
        { id: 'vue-playground', label: 'VUE PLAYGROUND', icon: 'Monitor' },
        { id: 'system-design', label: 'SYSTEM DESIGN', icon: 'Layers' },
        { id: 'awesome-lists', label: 'AWESOME DIRECTORY', icon: 'BookOpen' },
        { id: 'public-apis', label: 'PUBLIC APIS', icon: 'Globe2' },
        { id: 'coding-interview', label: 'INTERVIEW UNI', icon: 'CheckSquare' },
        { id: 'github-api', label: 'GIT EXPLORER', icon: 'Code' },
        { id: 'build-your-own-x', label: 'BUILD YOUR OWN X', icon: 'Wrench' },
        { id: 'airbnb-style', label: 'AIRBNB JS GUIDE', icon: 'ShieldCheck' },
        { id: 'oh-my-zsh', label: 'ZSH CONFIG', icon: 'Terminal' },
        { id: 'freecodecamp', label: 'FCC PROGRESS', icon: 'Code' }
      ] 
    },
    { 
      title: "FINANCE & ASSETS", 
      items: [
        { id: 'wallet-connector', label: 'SOVEREIGN WALLET', icon: 'Wallet' },
        { id: 'token-creator', label: 'MINT PROTOCOL', icon: 'Zap' },
        { id: 'nft-creator', label: 'NFT FORGE', icon: 'Layers' },
        { id: 'stripe-payments', label: 'STRIPE GATEWAY', icon: 'CreditCard' }
      ] 
    },
    { 
      title: "RESOURCES", 
      items: [
        { id: 'ai-tools-directory', label: 'AI TOOLS (150+)', icon: 'Search' },
        { id: 'security-audit', label: 'SEC OPS AUDIT', icon: 'ShieldAlert' }
      ] 
    }
  ];

  const renderContent = () => {
    switch (activeModule) {
      case 'home': return <GrokNexus onNavigate={setActiveModule} />;
      case 'tensorflow-playground': return <TensorFlowPlayground />;
      case 'ai-tools-directory': return <AIToolsDirectory />;
      case 'wallet-connector': 
      case 'token-creator': return <CryptoHub mode={activeModule === 'token-creator' ? 'creator' : 'wallet'} />;
      case 'github-api': return <GithubExplorer />;
      case 'gemini-oracle': return <GeminiOracle />;
      case 'multi-agent-hub': return <MultiAgentHub />;
      case 'crew-agent-hub': return <CrewAgentHub />;
      case 'rag-chat': return <RAGChatHub />;
      case 'local-llm': return <LocalLLMRunner />;
      case 'nft-creator': return <NFTCreatorHub />;
      case 'stripe-payments': return <StripePaymentHub />;
      case 'api-dashboard': return <ApiDashboardHub />;
      case 'developer-roadmap': return <DeveloperRoadmapExplorer />;
      case 'js-algorithms': return <JsAlgorithmsVisualizer />;
      case 'awesome-lists': return <AwesomeListsDirectory />;
      case 'public-apis': return <PublicApisExplorer />;
      case 'system-design': return <SystemDesignPrimerHub />;
      case 'react-playground': return <ReactPlayground />;
      case 'vue-playground': return <VuePlayground />;
      case 'coding-interview': return <CodingInterviewUniversity />;
      case 'airbnb-style': return <AirbnbStyleGuideHub />;
      case 'oh-my-zsh': return <OhMyZshConfigurator />;
      case 'build-your-own-x': return <BuildYourOwnXHub />;
      case 'python-algorithms': return <PythonAlgorithmsVisualizer />;
      case 'security-audit': return <SecurityAuditHub />;
      case 'langgraph-visualizer': return <LangGraphVisualizer />;
      case 'transformers-js': return <TransformersJsHub />;
      case 'ollama-runner': return <OllamaLocalRunner />;
      case 'freecodecamp': return <FreeCodeCampHub />;
      default: return <GrokNexus onNavigate={setActiveModule} />;
    }
  };

  if (bootSequence) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="text-cyan-500 font-bold text-4xl mb-4 tracking-[0.2em] glow-text">THE QUORUM v600.0</div>
          <div className="w-64 h-1 bg-slate-900 overflow-hidden relative mx-auto rounded-full">
            <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 h-full w-1/3 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
          </div>
          <p className="mt-4 text-[10px] text-cyan-800 uppercase tracking-widest font-black">Booting kernel / mapping sovereign nodes</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden cyber-grid font-mono">
      <motion.aside initial={false} animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="bg-slate-900/80 border-r border-cyan-500/20 glass-panel flex flex-col overflow-hidden z-30">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_5px_#06b6d4]" />
              <h1 className="text-xl font-black text-cyan-500 tracking-tighter glow-text">QUORUM v600</h1>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-cyan-400">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar pr-2">
            {navSections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-cyan-700 mb-3 font-bold border-b border-cyan-500/10 pb-1">{section.title}</h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button key={item.id} onClick={() => setActiveModule(item.id)}
                      className={`w-full text-left py-2 px-3 rounded transition-all duration-300 flex items-center space-x-3 group ${
                        activeModule === item.id ? 'bg-cyan-500/10 border-l-2 border-cyan-500 text-cyan-400' : 'hover:bg-slate-800/50 text-slate-400'
                      }`}>
                      <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                        {item.id === 'home' ? <Globe size={14} /> : 
                         item.id === 'gemini-oracle' ? <BrainCircuit size={14} /> :
                         item.id === 'api-dashboard' ? <BarChart3 size={14} /> :
                         item.id === 'multi-agent-hub' ? <Users size={14} /> :
                         item.id === 'crew-agent-hub' ? <Network size={14} /> :
                         item.id === 'langgraph-visualizer' ? <Shapes size={14} /> :
                         item.id === 'rag-chat' ? <FileText size={14} /> :
                         item.id === 'tensorflow-playground' ? <Cpu size={14} /> :
                         item.id === 'transformers-js' ? <Zap size={14} /> :
                         item.id === 'ollama-runner' ? <Terminal size={14} /> :
                         item.id === 'local-llm' ? <Boxes size={14} /> :
                         item.id === 'developer-roadmap' ? <MapIcon size={14} /> :
                         item.id === 'js-algorithms' ? <Binary size={14} /> :
                         item.id === 'python-algorithms' ? <TerminalSquare size={14} /> :
                         item.id === 'react-playground' ? <Monitor size={14} /> :
                         item.id === 'vue-playground' ? <Monitor size={14} /> :
                         item.id === 'system-design' ? <Layers size={14} /> :
                         item.id === 'awesome-lists' ? <BookOpen size={14} /> :
                         item.id === 'public-apis' ? <Globe2 size={14} /> :
                         item.id === 'coding-interview' ? <CheckSquare size={14} /> :
                         item.id === 'github-api' ? <Code size={14} /> :
                         item.id === 'build-your-own-x' ? <Wrench size={14} /> :
                         item.id === 'airbnb-style' ? <ShieldCheck size={14} /> :
                         item.id === 'oh-my-zsh' ? <Terminal size={14} /> :
                         item.id === 'freecodecamp' ? <Code size={14} /> :
                         item.id === 'wallet-connector' ? <Wallet size={14} /> :
                         item.id === 'token-creator' ? <Zap size={14} /> :
                         item.id === 'nft-creator' ? <Layers size={14} /> :
                         item.id === 'stripe-payments' ? <CreditCard size={14} /> :
                         item.id === 'ai-tools-directory' ? <Search size={14} /> :
                         <Activity size={14} />}
                      </span>
                      <span className="text-[10px] font-bold tracking-wider uppercase">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-cyan-500/10 bg-slate-950/40">
          <div className="flex items-center space-x-2 text-[10px] text-cyan-800 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-bold tracking-widest uppercase">ENCRYPTED-04X-ALPHA</span>
          </div>
          <div className="text-[8px] text-cyan-900 font-bold uppercase tracking-tighter opacity-50">OS_KERNEL: 600.0.0_STABLE</div>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-14 flex items-center justify-between px-8 border-b border-cyan-500/10 glass-panel z-20">
          <div className="flex items-center space-x-4">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-slate-800 rounded-lg text-cyan-400 transition-colors">
                <Menu size={18} />
              </button>
            )}
            <div className="hidden md:flex items-center space-x-2 text-[10px] font-bold text-cyan-500/70 uppercase tracking-[0.2em]">
              <Terminal size={12} />
              <span>Session: root@quorum:~/hub/{activeModule}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
             <div className="hidden lg:flex items-center space-x-4">
                <div className="flex flex-col items-end">
                   <div className="text-[8px] text-cyan-900 font-bold uppercase">Mesh Load</div>
                   <div className="text-[10px] text-cyan-600 font-mono">12.4%</div>
                </div>
             </div>
             <button className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1 rounded-sm text-[9px] font-black tracking-widest transition-all border border-red-500/20">
                DISCONNECT
             </button>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-10 overflow-auto relative">
          <AnimatePresence mode="wait">
            <motion.div key={activeModule} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="h-full">
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <MusicWiz />
      </main>
    </div>
  );
};

export default App;