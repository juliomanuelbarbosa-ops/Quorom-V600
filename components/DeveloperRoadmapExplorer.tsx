import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map as MapIcon, ChevronRight, Layout, Database, Globe, Layers, ArrowRight, CheckCircle2, Circle, Zap } from 'lucide-react';
import useQuorumStore from './useQuorumStore';

interface RoadmapItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  steps: string[];
  color: string;
}

const ROADMAPS: RoadmapItem[] = [
  {
    id: 'frontend',
    title: 'Frontend Architect',
    icon: <Layout size={20} />,
    color: 'text-cyan-400',
    steps: ['Internet Fundamentals', 'HTML/CSS Mastery', 'JavaScript Deep Dive', 'React & Ecosystem', 'Build Tools (Vite)', 'Testing (Vitest/Cypress)', 'Performance Ops', 'PWA & Native']
  },
  {
    id: 'backend',
    title: 'Backend Sovereign',
    icon: <Database size={20} />,
    color: 'text-purple-400',
    steps: ['OS & Kernel Basics', 'Node.js / Rust / Go', 'Relational DBs (PostgreSQL)', 'NoSQL (MongoDB/Redis)', 'API Architecture (REST/GraphQL)', 'Message Brokers (Kafka)', 'Auth (OAuth2/JWT)', 'Docker & K8s']
  },
  {
    id: 'blockchain',
    title: 'On-Chain Engineer',
    icon: <Globe size={20} />,
    color: 'text-orange-400',
    steps: ['Blockchain Theory', 'Ethereum & EVM', 'Solidity Mastery', 'Hardhat/Foundry Environment', 'DeFi Protocols', 'Smart Contract Security', 'Layer 2 Scaling', 'Zero Knowledge Proofs']
  },
  {
    id: 'ai-ml',
    title: 'Neural Ops Engineer',
    icon: <Layers size={20} />,
    color: 'text-green-400',
    steps: ['Calculus & Linear Algebra', 'Python Intelligence', 'Data Engineering', 'TensorFlow / PyTorch', 'Transformers Architecture', 'MLOps & Deployment', 'Agent Orchestration', 'Quantization Ops']
  }
];

const DeveloperRoadmapExplorer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(ROADMAPS[0].id);
  const { masteredSkills, toggleSkillMastery, unlockAchievement } = useQuorumStore();

  const activeRoadmap = ROADMAPS.find(r => r.id === selectedId);

  const handleToggleMastery = (roadmapId: string, step: string) => {
    const skillId = `${roadmapId}_${step.replace(/\s+/g, '_')}`;
    toggleSkillMastery(skillId, 250);
    
    // If all steps in a roadmap are mastered, unlock a major achievement
    const roadmap = ROADMAPS.find(r => r.id === roadmapId);
    if (roadmap) {
      const allSteps = roadmap.steps.map(s => `${roadmapId}_${s.replace(/\s+/g, '_')}`);
      const currentlyMastered = masteredSkills.includes(skillId) 
        ? masteredSkills.filter(id => id !== skillId)
        : [...masteredSkills, skillId];
      
      const isComplete = allSteps.every(s => currentlyMastered.includes(s));
      if (isComplete && !masteredSkills.includes(`${roadmapId}_COMPLETE`)) {
        unlockAchievement(`SOVEREIGN ATTAINED: Mastered ${roadmap.title} Path`, 5000);
        toggleSkillMastery(`${roadmapId}_COMPLETE`, 0); // Mark as complete
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">DEVELOPER ROADMAPS</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Sovereign Career Path Mapping</p>
        </div>
        <div className="flex space-x-2">
           <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Updated: FEB 2026</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          {ROADMAPS.map((r) => {
            const roadmapSteps = r.steps.map(s => `${r.id}_${s.replace(/\s+/g, '_')}`);
            const masteredCount = roadmapSteps.filter(s => masteredSkills.includes(s)).length;
            const progress = (masteredCount / r.steps.length) * 100;

            return (
              <button
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex flex-col gap-3 group ${
                  selectedId === r.id 
                    ? 'bg-slate-900 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                    : 'bg-slate-900/40 border-cyan-500/10 hover:border-cyan-500/30 text-slate-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`${selectedId === r.id ? r.color : 'text-slate-600'}`}>
                    {r.icon}
                  </div>
                  <span className={`text-[11px] font-bold tracking-widest uppercase ${selectedId === r.id ? 'text-cyan-400' : ''}`}>
                    {r.title}
                  </span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={`h-full ${selectedId === r.id ? 'bg-cyan-500' : 'bg-slate-700'}`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            {activeRoadmap && (
              <motion.div
                key={activeRoadmap.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-panel p-8 rounded-2xl border border-cyan-500/20 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/5 blur-3xl rounded-full" />
                
                <h3 className={`text-2xl font-black mb-8 uppercase tracking-widest ${activeRoadmap.color} flex items-center space-x-4`}>
                   <span>{activeRoadmap.title}</span>
                   <div className="h-0.5 flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent" />
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeRoadmap.steps.map((step, idx) => {
                    const skillId = `${activeRoadmap.id}_${step.replace(/\s+/g, '_')}`;
                    const isMastered = masteredSkills.includes(skillId);

                    return (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => handleToggleMastery(activeRoadmap.id, step)}
                        className={`p-4 rounded-lg group transition-all cursor-pointer flex items-center justify-between border ${
                          isMastered 
                            ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                            : 'bg-slate-900/60 border-cyan-500/10 hover:border-cyan-500/40'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                            isMastered ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'bg-slate-800 border-cyan-900 text-cyan-500'
                          }`}>
                            {isMastered ? <CheckCircle2 size={12} /> : idx + 1}
                          </div>
                          <span className={`text-[11px] font-bold uppercase tracking-wide transition-colors ${
                            isMastered ? 'text-cyan-400' : 'text-slate-100 group-hover:text-cyan-400'
                          }`}>
                            {step}
                          </span>
                        </div>
                        <div className={`transition-all ${isMastered ? 'text-cyan-400' : 'text-cyan-900 group-hover:text-cyan-500'}`}>
                          {isMastered ? <Zap size={14} className="animate-pulse" /> : <Circle size={14} />}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-8 p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-lg flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center border border-cyan-500/20">
                         <MapIcon size={20} className="text-cyan-500" />
                      </div>
                      <div>
                         <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                           Mastery Level: {
                             (activeRoadmap.steps.filter(s => masteredSkills.includes(`${activeRoadmap.id}_${s.replace(/\s+/g, '_')}`)).length / activeRoadmap.steps.length) > 0.8 
                               ? 'Sovereign' 
                               : (activeRoadmap.steps.filter(s => masteredSkills.includes(`${activeRoadmap.id}_${s.replace(/\s+/g, '_')}`)).length / activeRoadmap.steps.length) > 0.4
                                 ? 'Advanced'
                                 : 'Initiate'
                           }
                         </div>
                         <div className="text-[8px] text-cyan-900 font-bold uppercase tracking-widest">Est. Synchronization Time: 2,400 Hours</div>
                      </div>
                   </div>
                   <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded font-black text-[10px] tracking-widest uppercase transition-all flex items-center space-x-2">
                      <span>INITIATE PROTOCOL</span>
                      <ArrowRight size={14} />
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DeveloperRoadmapExplorer;