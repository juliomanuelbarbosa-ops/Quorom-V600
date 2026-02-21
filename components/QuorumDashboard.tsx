import React, { useCallback } from 'react';
import BabelProtocol from './BabelProtocol';
import IntelFeed from './IntelFeed';
import { IntelBrief } from './useQuorumStore';
import MarketOracle from './MarketOracle';
import ChainSight from './ChainSight';
import AssetTokenize from './AssetTokenize';
import VisualCortex from './VisualCortex';
import NeuralRadio from './NeuralRadio';
import { Shield } from 'lucide-react';

const QuorumDashboard: React.FC = () => {
  const { intelBriefs, addIntelBrief } = useQuorumStore();

  // Handler passed to BabelProtocol to inject new intel
  const handleNewIntel = useCallback((newBrief: IntelBrief) => {
    addIntelBrief(newBrief);
  }, [addIntelBrief]);

  return (
    <div className="bg-slate-950 h-full font-mono text-slate-200 flex flex-col overflow-hidden">
      {/* Main Dashboard Canvas */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 custom-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
          <BabelProtocol onTaskComplete={handleNewIntel} />
          <IntelFeed briefs={intelBriefs} />
        </div>
        <div className="min-h-[400px]">
          <MarketOracle />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px]">
          <ChainSight onWhaleAlert={handleNewIntel} />
          <AssetTokenize />
          <div className="flex flex-col gap-6">
            <div className="flex-1">
              <VisualCortex />
            </div>
            <div className="h-[300px]">
              <NeuralRadio />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuorumDashboard;
