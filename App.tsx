import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Cpu, BrainCircuit, Wallet, Code, Database, ShieldAlert, Globe, Activity,
  Menu, X, Search, Zap, Users, FileText, Boxes, Layers, CreditCard, BarChart3,
  Map as MapIcon, BookOpen, Layout, Binary, Monitor, CheckSquare, Network, Rocket,
  ShieldCheck, TerminalSquare, Wrench, Shapes, Bot, Command, Globe2, Sparkles,
  Link as LinkIcon, Lock, TrendingUp, Video, Heart, Github, Settings, Library,
  Image as ImageIcon, FileCode, Gamepad2, Gamepad, Trophy, Wand2, Crosshair, Eye, Headphones,
  LayoutDashboard, RadioReceiver, DatabaseZap, LogOut, GitMerge
} from 'lucide-react';

import useQuorumStore from './components/useQuorumStore';
import { NavSection } from './types';

import useQuorumPersistence from './components/useQuorumPersistence';

// Lazy load all heavy modules (only loads when opened)
const HomeDashboard = lazy(() => import('./components/HomeDashboard'));
const GrokNexus = lazy(() => import('./components/GrokNexus'));
const TensorFlowPlayground = lazy(() => import('./components/TensorFlowPlayground'));
const AIToolsDirectory = lazy(() => import('./components/AIToolsDirectory'));
const CryptoHub = lazy(() => import('./components/CryptoHub'));
const GithubExplorer = lazy(() => import('./components/GithubExplorer'));
const GeminiOracle = lazy(() => import('./components/GeminiOracle'));
const MultiAgentHub = lazy(() => import('./components/MultiAgentHub'));
const RAGChatHub = lazy(() => import('./components/RAGChatHub'));
const LocalLLMRunner = lazy(() => import('./components/LocalLLMRunner'));
const NFTCreatorHub = lazy(() => import('./components/NFTCreatorHub'));
const StripePaymentHub = lazy(() => import('./components/StripePaymentHub'));
const ApiDashboardHub = lazy(() => import('./components/ApiDashboardHub'));
const DeveloperRoadmapExplorer = lazy(() => import('./components/DeveloperRoadmapExplorer'));
const JsAlgorithmsVisualizer = lazy(() => import('./components/JsAlgorithmsVisualizer'));
const AwesomeListsDirectory = lazy(() => import('./components/AwesomeListsDirectory'));
const PublicApisExplorer = lazy(() => import('./components/PublicApisExplorer'));
const SystemDesignPrimerHub = lazy(() => import('./components/SystemDesignPrimerHub'));
const ReactPlayground = lazy(() => import('./components/ReactPlayground'));
const CodingInterviewUniversity = lazy(() => import('./components/CodingInterviewUniversity'));
const CrewAgentHub = lazy(() => import('./components/CrewAgentHub'));
const MusicWiz = lazy(() => import('./components/MusicWiz'));
const VuePlayground = lazy(() => import('./components/VuePlayground'));
const AirbnbStyleGuideHub = lazy(() => import('./components/AirbnbStyleGuideHub'));
const OhMyZshConfigurator = lazy(() => import('./components/OhMyZshConfigurator'));
const BuildYourOwnXHub = lazy(() => import('./components/BuildYourOwnXHub'));
const PythonAlgorithmsVisualizer = lazy(() => import('./components/PythonAlgorithmsVisualizer'));
const SecurityAuditHub = lazy(() => import('./components/SecurityAuditHub'));
const LangGraphVisualizer = lazy(() => import('./components/LangGraphVisualizer'));
const TransformersJsHub = lazy(() => import('./components/TransformersJsHub'));
const OllamaLocalRunner = lazy(() => import('./components/OllamaLocalRunner'));
const FreeCodeCampHub = lazy(() => import('./components/FreeCodeCampHub'));
const ForecastForge = lazy(() => import('./components/ForecastForge'));
const VeoVideoForge = lazy(() => import('./components/VeoVideoForge'));
const NotebookLMHub = lazy(() => import('./components/NotebookLMHub'));
const LovableForge = lazy(() => import('./components/LovableForge'));
const OSProjectRegistry = lazy(() => import('./components/OSProjectRegistry'));
const NeuralConfig = lazy(() => import('./components/NeuralConfig'));
const NeuralLibrary = lazy(() => import('./components/NeuralLibrary'));
const AutoGPTHub = lazy(() => import('./components/AutoGPTHub'));
const StableDiffusionForge = lazy(() => import('./components/StableDiffusionForge'));
const N8NHub = lazy(() => import('./components/N8NHub'));
const LangChainForge = lazy(() => import('./components/LangChainForge'));
const DifyOrchestrator = lazy(() => import('./components/DifyOrchestrator'));
const OpenWebUIHub = lazy(() => import('./components/OpenWebUIHub'));
const SupabaseSubstrate = lazy(() => import('./components/SupabaseSubstrate'));
const ComfyUIForge = lazy(() => import('./components/ComfyUIForge'));
const NetdataObserver = lazy(() => import('./components/NetdataObserver'));
const PromptRegistry = lazy(() => import('./components/PromptRegistry'));
const MCPRegistry = lazy(() => import('./components/MCPRegistry'));
const EmulatorArchive = lazy(() => import('./components/EmulatorArchive'));
const MamePreservationCore = lazy(() => import('./components/MamePreservationCore'));
const MultiAgentSwarm = lazy(() => import('./components/MultiAgentSwarm'));
const BabelProtocol = lazy(() => import('./components/BabelProtocol'));
const QuorumDashboard = lazy(() => import('./components/QuorumDashboard'));
const ChainSight = lazy(() => import('./components/ChainSight'));
const GeminiVisionStudio = lazy(() => import('./components/GeminiVisionStudio'));
const GeminiAudioLab = lazy(() => import('./components/GeminiAudioLab'));
const FootballBettingHub = lazy(() => import('./components/FootballBettingHub'));
const SportsOracle = lazy(() => import('./components/SportsOracle'));
const SignalNexus = lazy(() => import('./components/SignalNexus'));
const GeoSentinel = lazy(() => import('./components/GeoSentinel'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const OperatorPresence = lazy(() => import('./components/OperatorPresence'));

const componentMap: Record<string, React.LazyExoticComponent<React.FC<any>>> = {
  dashboard: HomeDashboard,
  home: GrokNexus,
  'tensorflow-playground': TensorFlowPlayground,
  'ai-tools-directory': AIToolsDirectory,
  'wallet-connector': CryptoHub,
  'token-creator': CryptoHub,
  'github-api': GithubExplorer,
  'gemini-oracle': GeminiOracle,
  'gemini-vision': GeminiVisionStudio,
  'gemini-audio': GeminiAudioLab,
  'multi-agent-swarm': MultiAgentSwarm,
  'babel-protocol': BabelProtocol,
  'chain-sight': ChainSight,
  'signal-nexus': SignalNexus,
  'geo-vigilance': GeoSentinel,
  'multi-agent-hub': MultiAgentHub,
  'autogpt-hub': AutoGPTHub,
  'dify-orchestrator': DifyOrchestrator,
  'open-webui': OpenWebUIHub,
  'mcp-registry': MCPRegistry,
  'prompt-registry': PromptRegistry,
  'supabase-substrate': SupabaseSubstrate,
  'comfyui-forge': ComfyUIForge,
  'netdata-observer': NetdataObserver,
  'mame-preservation': MamePreservationCore,
  'emulator-archive': EmulatorArchive,
  'langchain-forge': LangChainForge,
  'diffusion-forge': StableDiffusionForge,
  'n8n-automator': N8NHub,
  'crew-agent-hub': CrewAgentHub,
  'rag-chat': RAGChatHub,
  'local-llm': LocalLLMRunner,
  'nft-creator': NFTCreatorHub,
  'stripe-payments': StripePaymentHub,
  'football-betting': FootballBettingHub,
  'sports-oracle': SportsOracle,
  'api-dashboard': ApiDashboardHub,
  'developer-roadmap': DeveloperRoadmapExplorer,
  'js-algorithms': JsAlgorithmsVisualizer,
  'awesome-lists': AwesomeListsDirectory,
  'public-apis': PublicApisExplorer,
  'system-design': SystemDesignPrimerHub,
  'react-playground': ReactPlayground,
  'vue-playground': VuePlayground,
  'coding-interview': CodingInterviewUniversity,
  'airbnb-style': AirbnbStyleGuideHub,
  'oh-my-zsh': OhMyZshConfigurator,
  'build-your-own-x': BuildYourOwnXHub,
  'python-algorithms': PythonAlgorithmsVisualizer,
  'security-audit': SecurityAuditHub,
  'langgraph-visualizer': LangGraphVisualizer,
  'transformers-js': TransformersJsHub,
  'ollama-runner': OllamaLocalRunner,
  'freecodecamp': FreeCodeCampHub,
  'forecast-forge': ForecastForge,
  'veo-video-forge': VeoVideoForge,
  'notebook-lm': NotebookLMHub,
  'lovable-forge': LovableForge,
  'os-project-registry': OSProjectRegistry,
  'neural-library': NeuralLibrary,
  'neural-config': NeuralConfig, // NeuralConfig is not in navSections, but might be used elsewhere
};

const App: React.FC = () => {
  const { activeView: activeModule, setActiveView: setActiveModule, saveGameProgress } = useQuorumStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [bootSequence, setBootSequence] = useState(true);
  const [isNeuralConfigOpen, setIsNeuralConfigOpen] = useState(false);
  const [neuralTier, setNeuralTier] = useState<'flash' | 'pro'>('flash');

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navSections: NavSection[] = [
    { 
      title: "CORE SYSTEMS", 
      items: [
        { id: 'dashboard', label: 'COMMAND CENTER', icon: 'LayoutDashboard' },
        { id: 'home', label: 'GROK NEXUS', icon: 'Globe' },
        { id: 'gemini-oracle', label: 'GEMINI OMNI-ORACLE', icon: 'BrainCircuit' },
        { id: 'gemini-vision', label: 'GEMINI VISION', icon: 'Eye' },
        { id: 'gemini-audio', label: 'GEMINI AUDIO', icon: 'Headphones' },
        { id: 'multi-agent-swarm', label: 'SWARM INTELLIGENCE', icon: 'Network' },
        { id: 'babel-protocol', label: 'BABEL PROTOCOL', icon: 'GitMerge' },
        { id: 'chain-sight', label: 'CHAINSIGHT', icon: 'Eye' },
        { id: 'signal-nexus', label: 'SIGNAL NEXUS', icon: 'RadioReceiver' },
        { id: 'geo-vigilance', label: 'GEO VIGILANCE', icon: 'Globe' },
        { id: 'api-dashboard', label: 'LIVE DATAFEED', icon: 'BarChart3' },
        { id: 'supabase-substrate', label: 'SUPABASE BACKEND', icon: 'Database' },
        { id: 'netdata-observer', label: 'NETDATA OBSERVER', icon: 'Activity' },
        { id: 'mame-preservation', label: 'MAME PRESERVATION', icon: 'Gamepad' },
        { id: 'emulator-archive', label: 'EMULATOR ARCHIVE', icon: 'Gamepad2' }
      ] 
    },
    { 
      title: "AI & COGNITION", 
      items: [
        { id: 'open-webui', label: 'OPEN WEBUI', icon: 'Layout' },
        { id: 'mcp-registry', label: 'MCP REGISTRY', icon: 'Network' },
        { id: 'prompt-registry', label: 'PROMPT REGISTRY', icon: 'FileCode' },
        { id: 'comfyui-forge', label: 'COMFYUI FORGE', icon: 'Shapes' },
        { id: 'autogpt-hub', label: 'AUTOGPT NODE', icon: 'Bot' },
        { id: 'dify-orchestrator', label: 'DIFY ORCHESTRATOR', icon: 'Command' },
        { id: 'langchain-forge', label: 'LANGCHAIN FORGE', icon: 'LinkIcon' },
        { id: 'diffusion-forge', label: 'DIFFUSION FORGE', icon: 'Image' },
        { id: 'n8n-automator', label: 'N8N AUTOMATOR', icon: 'Network' },
        { id: 'multi-agent-hub', label: 'SWARM COGNITION', icon: 'Users' },
        { id: 'notebook-lm', label: 'NOTEBOOK LM', icon: 'BookOpen' },
        { id: 'forecast-forge', label: 'FORECAST FORGE', icon: 'TrendingUp' },
        { id: 'veo-video-forge', label: 'VEO VIDEO FORGE', icon: 'Video' },
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
        { id: 'os-project-registry', label: 'OS PROJECT HUB', icon: 'Github' },
        { id: 'lovable-forge', label: 'LOVABLE FORGE', icon: 'Heart' },
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
        { id: 'stripe-payments', label: 'STRIPE GATEWAY', icon: 'CreditCard' },
        { id: 'football-betting', label: 'FOOTBALL NEXUS', icon: 'Trophy' },
        { id: 'sports-oracle', label: 'SPORTS ORACLE', icon: 'Crosshair' }
      ] 
    },
    { 
      title: "RESOURCES", 
      items: [
        { id: 'neural-library', label: 'NEURAL LIBRARY', icon: 'Library' },
        { id: 'ai-tools-directory', label: 'AI HUB (250+)', icon: 'Search' },
        { id: 'security-audit', label: 'SEC OPS AUDIT', icon: 'ShieldAlert' }
      ] 
    }
  ];

  const renderContent = () => {
    const Component = componentMap[activeModule];
    if (!Component) return <div className="p-8 text-red-400">Module {activeModule} not implemented yet</div>;
  
    return (
      <Suspense fallback={<div className="flex h-full items-center justify-center text-cyan-500 text-xl animate-pulse">Booting neural core...</div>}>
        {activeModule === 'wallet-connector' || activeModule === 'token-creator' ? (
          <CryptoHub mode={activeModule === 'token-creator' ? 'creator' : 'wallet'} />
        ) : (
          <Component />
        )}
      </Suspense>
    );
  };

  const getSidebarIcon = (id: string) => {
    switch (id) {
      case 'dashboard': return <LayoutDashboard size={14} />;
      case 'home': return <Globe size={14} />;
      case 'gemini-oracle': return <BrainCircuit size={14} />;
      case 'gemini-vision': return <Eye size={14} />;
      case 'gemini-audio': return <Headphones size={14} />;
      case 'multi-agent-swarm': return <Network size={14} />;
      case 'babel-protocol': return <GitMerge size={14} />;
      case 'chain-sight': return <Eye size={14} />;
      case 'signal-nexus': return <RadioReceiver size={14} />;
      case 'geo-vigilance': return <Globe size={14} />;
      case 'api-dashboard': return <BarChart3 size={14} />;
      case 'supabase-substrate': return <Database size={14} />;
      case 'netdata-observer': return <Activity size={14} />;
      case 'mame-preservation': return <Gamepad size={14} />;
      case 'emulator-archive': return <Gamepad2 size={14} />;
      case 'multi-agent-hub': return <Users size={14} />;
      case 'autogpt-hub': return <Bot size={14} />;
      case 'dify-orchestrator': return <Command size={14} />;
      case 'open-webui': return <Layout size={14} />;
      case 'mcp-registry': return <Network size={14} />;
      case 'prompt-registry': return <FileCode size={14} />;
      case 'comfyui-forge': return <Shapes size={14} />;
      case 'langchain-forge': return <LinkIcon size={14} />;
      case 'diffusion-forge': return <ImageIcon size={14} />;
      case 'n8n-automator': return <Network size={14} />; 
      case 'forecast-forge': return <TrendingUp size={14} />;
      case 'veo-video-forge': return <Video size={14} />;
      case 'notebook-lm': return <BookOpen size={14} />;
      case 'crew-agent-hub': return <Network size={14} />;
      case 'langgraph-visualizer': return <Shapes size={14} />;
      case 'rag-chat': return <FileText size={14} />;
      case 'tensorflow-playground': return <Cpu size={14} />;
      case 'transformers-js': return <Zap size={14} />;
      case 'ollama-runner': return <Terminal size={14} />;
      case 'local-llm': return <Boxes size={14} />;
      case 'lovable-forge': return <Heart size={14} />;
      case 'os-project-registry': return <Github size={14} />;
      case 'developer-roadmap': return <MapIcon size={14} />;
      case 'js-algorithms': return <Binary size={14} />;
      case 'python-algorithms': return <TerminalSquare size={14} />;
      case 'react-playground': return <Monitor size={14} />;
      case 'vue-playground': return <Monitor size={14} />;
      case 'system-design': return <Layers size={14} />;
      case 'awesome-lists': return <BookOpen size={14} />;
      case 'public-apis': return <Globe2 size={14} />;
      case 'coding-interview': return <CheckSquare size={14} />;
      case 'github-api': return <Code size={14} />;
      case 'build-your-own-x': return <Wrench size={14} />;
      case 'airbnb-style': return <ShieldCheck size={14} />;
      case 'oh-my-zsh': return <Terminal size={14} />;
      case 'freecodecamp': return <Code size={14} />;
      case 'wallet-connector': return <Wallet size={14} />;
      case 'token-creator': return <Zap size={14} />;
      case 'nft-creator': return <Layers size={14} />;
      case 'stripe-payments': return <CreditCard size={14} />;
      case 'football-betting': return <Trophy size={14} />;
      case 'sports-oracle': return <Crosshair size={14} />;
      case 'ai-tools-directory': return <Search size={14} />;
      case 'neural-library': return <Library size={14} />;
      case 'security-audit': return <ShieldAlert size={14} />;
      default: return <Activity size={14} />;
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
                        {getSidebarIcon(item.id)}
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
        <OperatorPresence />
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
             <div className="flex items-center gap-4 bg-slate-900/50 px-3 py-1 rounded border border-cyan-500/10">
                <div className="flex flex-col items-end">
                   <div className="text-[7px] text-cyan-900 font-black uppercase">Neural Tier</div>
                   <div className={`text-[10px] font-mono ${neuralTier === 'pro' ? 'text-purple-400' : 'text-cyan-400'}`}>{neuralTier.toUpperCase()}</div>
                </div>
                <button 
                  onClick={() => setIsNeuralConfigOpen(true)}
                  className="p-1.5 hover:bg-slate-800 rounded text-cyan-600 hover:text-cyan-400 transition-all"
                >
                  <Settings size={14} />
                </button>
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

      <AnimatePresence>
        {isNeuralConfigOpen && (
          <NeuralConfig 
            currentTier={neuralTier} 
            setTier={setNeuralTier} 
            onClose={() => setIsNeuralConfigOpen(false)} 
          />
        )}
      </AnimatePresence>
      <CommandPalette />
    </div>
  );
};

export default App;
