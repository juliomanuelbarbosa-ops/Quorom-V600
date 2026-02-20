import React, { useState, useCallback } from 'react';
import BabelProtocol from './BabelProtocol';
import IntelFeed, { IntelBrief } from './IntelFeed';
import MarketOracle from './MarketOracle';
import ChainSight from './ChainSight';
import AssetTokenize from './AssetTokenize';
import VisualCortex from './VisualCortex';
import NeuralRadio from './NeuralRadio';
import { Shield } from 'lucide-react';

const QuorumDashboard: React.FC = () => {
  // Global state for completed agent tasks
  const [intelBriefs, setIntelBriefs] = useState<IntelBrief[]>([
    {
      id: 'intel-001',
      timestamp: '10:42:05 AM',
      type: 'MARKET ALERT',
      content: 'Ethereum whale wallet 0x7a... moving 45,000 ETH to Binance. High probability of localized dump.',
      severity: 'high'
    }
  ]);

  // Handler passed to BabelProtocol to inject new intel
  const handleNewIntel = useCallback((newBrief: IntelBrief) => {
    setIntelBriefs((prevBriefs) => [newBrief, ...prevBriefs]);
  }, []);

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
