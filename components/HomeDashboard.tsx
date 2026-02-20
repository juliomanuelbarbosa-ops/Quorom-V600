import React from 'react';
import { motion } from 'framer-motion';

// Component Imports
import LiveSpacesBanner from './LiveSpacesBanner';
import VisualCortex from './VisualCortex';
import BioMonitor from './BioMonitor';
import MarketOracle from './MarketOracle';
import ChainSight from './ChainSight';
import BabelProtocol from './BabelProtocol';
import IntelFeed from './IntelFeed';
import MissionLog from './MissionLog';
import AssetTokenize from './AssetTokenize';
import CodeNexus from './CodeNexus';
import NeuralRadio from './NeuralRadio';
import useQuorumStore from './useQuorumStore';
import { BrainCircuit, Sparkles, Loader2 } from 'lucide-react';

const HomeDashboard = () => {
  const addIntelBrief = useQuorumStore((state) => state.addIntelBrief);
  const intelBriefs = useQuorumStore((state) => state.intelBriefs);
  const missionLogs = useQuorumStore((state) => state.missionLogs);
  const [neuralSummary, setNeuralSummary] = React.useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = React.useState(false);

  const generateNeuralBrief = async () => {
    setIsSummarizing(true);
    try {
      // In a real app, we'd send the last 10 intel briefs and mission logs to Gemini
      // For this demo, we'll simulate a high-quality summary
      await new Promise(r => setTimeout(r, 2000));
      const summary = `NEURAL_SUMMARY_v6.0: System stability is at 98.4%. Recent whale activity in ETH detected by ChainSight suggests a liquidity shift. Mission progress is steady with ${missionLogs.filter(l => l.status === 'complete').length} tasks finalized. Recommend focusing on NeuralSync optimization for the next cycle.`;
      setNeuralSummary(summary);
    } catch (e) {
      setNeuralSummary("ERROR: Neural synchronization failed.");
    } finally {
      setIsSummarizing(false);
    }
  };

  React.useEffect(() => {
    generateNeuralBrief();
  }, []);

  // 1. Define the orchestration for the parent container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each module booting up
        delayChildren: 0.2,    // Initial pause before the sequence starts
      }
    }
  };

  // 2. Define the animation for each individual module
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.98,
      filter: 'blur(4px)' 
    },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: 'blur(0px)'
    }
  };

  const itemTransition = { 
    duration: 0.5
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-mono p-4 md:p-6 overflow-x-hidden custom-scrollbar">
      
      {/* Attach the container variant to the master wrapper */}
      <motion.div 
        className="max-w-[1600px] mx-auto flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        
        {/* ROW 1: Global Announcements */}
        <motion.div variants={itemVariants} transition={itemTransition} className="w-full flex flex-col gap-6">
          <LiveSpacesBanner />
          
          {/* Neural Briefing Section */}
          <div className="bg-slate-900/40 border border-cyan-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 group-hover:scale-110 transition-transform">
              <BrainCircuit size={32} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-cyan-400" />
                <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.3em]">Neural Briefing Room</h3>
              </div>
              <div className="text-sm text-slate-300 font-mono leading-relaxed">
                {isSummarizing ? (
                  <div className="flex items-center gap-2 text-cyan-900">
                    <Loader2 size={14} className="animate-spin" />
                    <span>SYNCHRONIZING_NEURAL_STREAMS...</span>
                  </div>
                ) : (
                  neuralSummary || "Awaiting neural uplink..."
                )}
              </div>
            </div>
            <button 
              onClick={generateNeuralBrief}
              className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-[10px] font-black text-cyan-400 uppercase tracking-widest hover:bg-cyan-500/20 transition-all"
            >
              Refresh Brief
            </button>
          </div>
        </motion.div>

        {/* CSS GRID MASTER CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-max">
          
          {/* ROW 2: Primary Telemetry */}
          <motion.div variants={itemVariants} transition={itemTransition} className="col-span-1 lg:col-span-8 h-[450px]">
            <VisualCortex />
          </motion.div>
          <motion.div variants={itemVariants} transition={itemTransition} className="col-span-1 lg:col-span-4 h-[450px]">
            <BioMonitor />
          </motion.div>

          {/* ROW 3: Market & On-Chain Data */}
          <motion.div variants={itemVariants} transition={itemTransition} className="col-span-1 lg:col-span-6 h-[400px]">
            <MarketOracle />
          </motion.div>
          <motion.div variants={itemVariants} transition={itemTransition} className="col-span-1 lg:col-span-6 h-[400px]">
            <ChainSight onWhaleAlert={addIntelBrief} /> 
          </motion.div>

          {/* ROW 4: Intelligence & Swarm Coordination */}
          <motion.div variants={itemVariants} transition={itemTransition} className="col-span-1 lg:col-span-4 h-[450px]">
            <BabelProtocol onTaskComplete={addIntelBrief} />
          </motion.div>
          <motion.div variants={itemVariants} transition={itemTransition} className="col-span-1 lg:col-span-4 h-[450px]">
            <IntelFeed briefs={intelBriefs} /> 
          </motion.div>
          <motion.div variants={itemVariants} transition={itemTransition} className="col-span-1 lg:col-span-4 h-[450px]">
            <MissionLog />
          </motion.div>

          {/* ROW 5: Execution Forge & Backend Logic */}
          <motion.div variants={itemVariants} transition={itemTransition} className="col-span-1 lg:col-span-6 h-[600px]">
            <AssetTokenize />
          </motion.div>
          <motion.div variants={itemVariants} transition={itemTransition} className="col-span-1 lg:col-span-6 h-[600px]">
            <CodeNexus />
          </motion.div>

        </div>

        {/* ROW 6: Audio & Comms Layer */}
        <motion.div variants={itemVariants} transition={itemTransition} className="w-full h-[300px] mt-2 pb-6">
          <NeuralRadio />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default HomeDashboard;
