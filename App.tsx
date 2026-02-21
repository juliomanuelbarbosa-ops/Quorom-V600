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

// ──────────────────────────────────────────────────────────────
// LAZY-LOADED MODULES (huge performance win)
// ──────────────────────────────────────────────────────────────
const QuorumDashboard       = lazy(() => import('./components/QuorumDashboard'));
const HomeDashboard         = lazy(() => import('./components/HomeDashboard'));
const GrokNexus             = lazy(() => import('./components/GrokNexus'));
const TensorFlowPlayground  = lazy(() => import('./components/TensorFlowPlayground'));
const AIToolsDirectory      = lazy(() => import('./components/AIToolsDirectory'));
const CryptoHub             = lazy(() => import('./components/CryptoHub'));
const GithubExplorer        = lazy(() => import('./components/GithubExplorer'));
const GeminiOracle          = lazy(() => import('./components/GeminiOracle'));
const MultiAgentHub         = lazy(() => import('./components/MultiAgentHub'));
const RAGChatHub            = lazy(() => import('./components/RAGChatHub'));
const LocalLLMRunner        = lazy(() => import('./components/LocalLLMRunner'));
const NFTCreatorHub         = lazy(() => import('./components/NFTCreatorHub'));
const StripePaymentHub      = lazy(() => import('./components/StripePaymentHub'));
const ApiDashboardHub       = lazy(() => import('./components/ApiDashboardHub'));
const DeveloperRoadmapExplorer = lazy(() => import('./components/DeveloperRoadmapExplorer'));
const JsAlgorithmsVisualizer = lazy(() => import('./components/JsAlgorithmsVisualizer'));
const AwesomeListsDirectory = lazy(() => import('./components/AwesomeListsDirectory'));
const PublicApisExplorer    = lazy(() => import('./components/PublicApisExplorer'));
const SystemDesignPrimerHub = lazy(() => import('./components/SystemDesignPrimerHub'));
const ReactPlayground       = lazy(() => import('./components/ReactPlayground'));
const CodingInterviewUniversity = lazy(() => import('./components/CodingInterviewUniversity'));
const CrewAgentHub          = lazy(() => import('./components/CrewAgentHub'));
const MusicWiz              = lazy(() => import('./components/MusicWiz'));
const VuePlayground         = lazy(() => import('./components/VuePlayground'));
const AirbnbStyleGuideHub   = lazy(() => import('./components/AirbnbStyleGuideHub'));
const OhMyZshConfigurator   = lazy(() => import('./components/OhMyZshConfigurator'));
const BuildYourOwnXHub      = lazy(() => import('./components/BuildYourOwnXHub'));
const PythonAlgorithmsVisualizer = lazy(() => import('./components/PythonAlgorithmsVisualizer'));
const SecurityAuditHub      = lazy(() => import('./components/SecurityAuditHub'));
const LangGraphVisualizer   = lazy(() => import('./components/LangGraphVisualizer'));
const TransformersJsHub     = lazy(() => import('./components/TransformersJsHub'));
const OllamaLocalRunner     = lazy(() => import('./components/OllamaLocalRunner'));
const FreeCodeCampHub       = lazy(() => import('./components/FreeCodeCampHub'));
const ForecastForge         = lazy(() => import('./components/ForecastForge'));
const VeoVideoForge         = lazy(() => import('./components/VeoVideoForge'));
const NotebookLMHub         = lazy(() => import('./components/NotebookLMHub'));
const LovableForge          = lazy(() => import('./components/LovableForge'));
const OSProjectRegistry     = lazy(() => import('./components/OSProjectRegistry'));
const NeuralConfig          = lazy(() => import('./components/NeuralConfig'));
const NeuralLibrary         = lazy(() => import('./components/NeuralLibrary'));
const AutoGPTHub            = lazy(() => import('./components/AutoGPTHub'));
const StableDiffusionForge  = lazy(() => import('./components/StableDiffusionForge'));
const N8NHub                = lazy(() => import('./components/N8NHub'));
const LangChainForge        = lazy(() => import('./components/LangChainForge'));
const DifyOrchestrator      = lazy(() => import('./components/DifyOrchestrator'));
const OpenWebUIHub          = lazy(() => import('./components/OpenWebUIHub'));
const SupabaseSubstrate     = lazy(() => import('./components/SupabaseSubstrate'));
const ComfyUIForge          = lazy(() => import('./components/ComfyUIForge'));
const NetdataObserver       = lazy(() => import('./components/NetdataObserver'));
const PromptRegistry        = lazy(() => import('./components/PromptRegistry'));
const MCPRegistry           = lazy(() => import('./components/MCPRegistry'));
const EmulatorArchive       = lazy(() => import('./components/EmulatorArchive'));
const MamePreservationCore  = lazy(() => import('./components/MamePreservationCore'));
const MultiAgentSwarm       = lazy(() => import('./components/MultiAgentSwarm'));
const BabelProtocol         = lazy(() => import('./components/BabelProtocol'));
const ChainSight            = lazy(() => import('./components/ChainSight'));
const GeminiVisionStudio    = lazy(() => import('./components/GeminiVisionStudio'));
const GeminiAudioLab        = lazy(() => import('./components/GeminiAudioLab'));
const FootballBettingHub    = lazy(() => import('./components/FootballBettingHub'));
const SportsOracle          = lazy(() => import('./components/SportsOracle'));
const SignalNexus           = lazy(() => import('./components/SignalNexus'));
const GeoSentinel           = lazy(() => import('./components/GeoSentinel'));
const CommandPalette        = lazy(() => import('./components/CommandPalette'));
const OperatorPresence      = lazy(() => import('./components/OperatorPresence'));

// Component registry – add new modules here only
const componentMap: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  dashboard: QuorumDashboard,
  home: GrokNexus,                    // label = GROK NEXUS
  'gemini-oracle': GeminiOracle,
  'gemini-vision': GeminiVisionStudio,
  'gemini-audio': GeminiAudioLab,
  'multi-agent-swarm': MultiAgentSwarm,
  'babel-protocol': BabelProtocol,
  'chain-sight': ChainSight,
  'signal-nexus': SignalNexus,
  'geo-vigilance': GeoSentinel,
  'api-dashboard': ApiDashboardHub,
  'supabase-substrate': SupabaseSubstrate,
  'netdata-observer': NetdataObserver,
  'mame-preservation': MamePreservationCore,
  'emulator-archive': EmulatorArchive,
  'open-webui': OpenWebUIHub,
  'mcp-registry': MCPRegistry,
  'prompt-registry': PromptRegistry,
  'comfyui-forge': ComfyUIForge,
  'autogpt-hub': AutoGPTHub,
  'dify-orchestrator': DifyOrchestrator,
  'langchain-forge': LangChainForge,
  'diffusion-forge': StableDiffusionForge,
  'n8n-automator': N8NHub,
  'multi-agent-hub': MultiAgentHub,
  'notebook-lm': NotebookLMHub,
  'forecast-forge': ForecastForge,
  'veo-video-forge': VeoVideoForge,
  'crew-agent-hub': CrewAgentHub,
  'langgraph-visualizer': LangGraphVisualizer,
  'rag-chat': RAGChatHub,
  'tensorflow-playground': TensorFlowPlayground,
  'transformers-js': TransformersJsHub,
  'ollama-runner': OllamaLocalRunner,
  'local-llm': LocalLLMRunner,
  'os-project-registry': OSProjectRegistry,
  'lovable-forge': LovableForge,
  'developer-roadmap': DeveloperRoadmapExplorer,
  'js-algorithms': JsAlgorithmsVisualizer,
  'python-algorithms': PythonAlgorithmsVisualizer,
  'react-playground': ReactPlayground,
  'vue-playground': VuePlayground,
  'system-design': SystemDesignPrimerHub,
  'awesome-lists': AwesomeListsDirectory,
  'public-apis': PublicApisExplorer,
  'coding-interview': CodingInterviewUniversity,
  'github-api': GithubExplorer,
  'build-your-own-x': BuildYourOwnXHub,
  'airbnb-style': AirbnbStyleGuideHub,
  'oh-my-zsh': OhMyZshConfigurator,
  'freecodecamp': FreeCodeCampHub,
  'wallet-connector': CryptoHub,
  'token-creator': CryptoHub,
  'nft-creator': NFTCreatorHub,
  'stripe-payments': StripePaymentHub,
  'football-betting': FootballBettingHub,
  'sports-oracle': SportsOracle,
  'neural-library': NeuralLibrary,
  'ai-tools-directory': AIToolsDirectory,
  'security-audit': SecurityAuditHub,
};

// Icon mapper (string → component)
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Globe, BrainCircuit, Eye, Headphones, Network, GitMerge,
  RadioReceiver, BarChart3, Database, Activity, Gamepad, Gamepad2, Layout,
  FileCode, Shapes, Bot, Command, LinkIcon, ImageIcon, Users, BookOpen,
  TrendingUp, Video, Cpu, Zap, Terminal, Boxes, Github, Heart, MapIcon,
  Binary, TerminalSquare, Monitor, Layers, CheckSquare, Globe2, Wrench,
  ShieldCheck, Trophy, Crosshair, ShieldAlert, Search, Settings,
};

const App: React.FC = () => {
  const { activeView: activeModule, setActiveView: setActiveModule } = useQuorumStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [bootSequence, setBootSequence] = useState(true);
  const [isNeuralConfigOpen, setIsNeuralConfigOpen] = useState(false);
  const [neuralTier, setNeuralTier] = useState<'flash' | 'pro'>('flash');

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navSections: NavSection[] = [
    { title: "CORE SYSTEMS", items: [
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
    ]},
    { title: "AI & COGNITION", items: [
      { id: 'open-webui', label: 'OPEN WEBUI', icon: 'Layout' },
      { id: 'mcp-registry', label: 'MCP REGISTRY', icon: 'Network' },
      { id: 'prompt-registry', label: 'PROMPT REGISTRY', icon: 'FileCode' },
      { id: 'comfyui-forge', label: 'COMFYUI FORGE', icon: 'Shapes' },
      { id: 'autogpt-hub', label: 'AUTOGPT NODE', icon: 'Bot' },
      { id: 'dify-orchestrator', label: 'DIFY ORCHESTRATOR', icon: 'Command' },
      { id: 'langchain-forge', label: 'LANGCHAIN FORGE', icon: 'LinkIcon' },
      { id: 'diffusion-forge', label: 'DIFFUSION FORGE', icon: 'ImageIcon' },
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
    ]},
    { title: "DEVELOPER TOOLS", items: [
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
    ]},
    { title: "FINANCE & ASSETS", items: [
      { id: 'wallet-connector', label: 'SOVEREIGN WALLET', icon: 'Wallet' },
      { id: 'token-creator', label: 'MINT PROTOCOL', icon: 'Zap' },
      { id: 'nft-creator', label: 'NFT FORGE', icon: 'Layers' },
      { id: 'stripe-payments', label: 'STRIPE GATEWAY', icon: 'CreditCard' },
      { id: 'football-betting', label: 'FOOTBALL NEXUS', icon: 'Trophy' },
      { id: 'sports-oracle', label: 'SPORTS ORACLE', icon: 'Crosshair' }
    ]},
    { title: "RESOURCES", items: [
      { id: 'neural-library', label: 'NEURAL LIBRARY', icon: 'Library' },
      { id: 'ai-tools-directory', label: 'AI HUB (250+)', icon: 'Search' },
      { id: 'security-audit', label: 'SEC OPS AUDIT', icon: 'ShieldAlert' }
    ]}
  ];

  const renderIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Globe;
    return <Icon className="w-5 h-5" />;
  };

  const renderContent = () => {
    const Component = componentMap[activeModule];
    if (!Component) {
      return (
        <div className="flex h-full items-center justify-center bg-black text-red-400 font-mono text-xl">
          MODULE <span className="text-white ml-2">{activeModule.toUpperCase()}</span> NOT LOADED
        </div>
      );
    }
    return (
      <Suspense fallback={
        <div className="flex h-full w-full items-center justify-center bg-black">
          <div className="text-center">
            <div className="h-12 w-12 border-4 border-cyan-400 border-t-transparent animate-spin rounded-full mx-auto mb-6" />
            <p className="font-mono text-cyan-400 tracking-widest">NEURAL LINK ESTABLISHED...</p>
          </div>
        </div>
      }>
        <Component />
      </Suspense>
    );
  };

  if (bootSequence) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-6 animate-pulse">⚡</div>
          <div className="text-5xl font-bold tracking-[-4px] text-white">QUORUM</div>
          <div className="text-cyan-400 text-xl tracking-[6px] font-mono mt-2">V600 • BOOTING</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black text-cyan-300 font-mono">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            className="w-80 border-r border-zinc-800 bg-zinc-950 flex flex-col z-50"
          >
            {/* Logo */}
            <div className="p-6 border-b border-zinc-800 flex items-center gap-4">
              <div className="text-5xl">Q</div>
              <div>
                <div className="text-4xl font-black tracking-tighter text-white">QUORUM</div>
                <div className="text-[10px] text-emerald-400 tracking-[4px]">V 6 0 0</div>
              </div>
            </div>

            {/* Nav */}
            <div className="flex-1 overflow-y-auto p-4 space-y-8">
              {navSections.map((section) => (
                <div key={section.title}>
                  <div className="px-4 mb-3 uppercase text-xs tracking-widest text-zinc-500 font-bold">{section.title}</div>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveModule(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group text-left ${
                          activeModule === item.id
                            ? 'bg-zinc-900 border-l-4 border-cyan-400 text-white'
                            : 'hover:bg-zinc-900/70 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {renderIcon(item.icon)}
                        <span className="font-medium tracking-wide">{item.label}</span>
                        {activeModule === item.id && <div className="ml-auto w-1.5 h-1.5 bg-cyan-400 rounded-full" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-800 flex items-center justify-between text-xs">
              <button
                onClick={() => setIsNeuralConfigOpen(true)}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Settings className="w-4 h-4" /> NEURAL CONFIG
              </button>
              <div className="text-emerald-400 font-mono">● LIVE</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-14 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur flex items-center px-6 z-40">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-6 p-2 hover:bg-zinc-900 rounded-xl">
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="font-semibold text-xl tracking-widest flex-1">
            {navSections.flatMap(s => s.items).find(i => i.id === activeModule)?.label || 'QUORUM CORE'}
          </div>
          <div className="flex items-center gap-6">
            <OperatorPresence />
            <CommandPalette />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Neural Config Modal */}
      <AnimatePresence>
        {isNeuralConfigOpen && (
          <Suspense fallback={null}>
            <NeuralConfig
              onClose={() => setIsNeuralConfigOpen(false)}
              currentTier={neuralTier}
              setTier={setNeuralTier}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
