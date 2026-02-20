import React, { useState, useEffect } from 'react';
import { 
  Link, 
  Activity, 
  ArrowRight, 
  Box, 
  Eye, 
  DatabaseZap,
  ShieldAlert
} from 'lucide-react';

interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  asset: string;
  amount: string;
  isWhale: boolean;
  timestamp: string;
}

import useQuorumStore from './useQuorumStore';

interface ChainSightProps {
  onWhaleAlert?: (alert: any) => void;
}

const ChainSight: React.FC<ChainSightProps> = ({ onWhaleAlert }) => {
  const { addIntelBrief, unlockAchievement } = useQuorumStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [latestBlock, setLatestBlock] = useState(21045832);
  const [isSyncing, setIsSyncing] = useState(true);

  // Generate realistic mock on-chain data
  const generateMockTx = (): Transaction => {
    const assets = ['ETH', 'USDT', 'USDC', 'WBTC', 'PEPE', 'LINK'];
    const asset = assets[Math.floor(Math.random() * assets.length)];
    const rawAmount = Math.random() * (asset === 'WBTC' ? 50 : 500000);
    const amount = rawAmount.toFixed(2);
    const hash = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
    const from = `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`;
    const to = `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`;
    const isWhale = rawAmount > 100000 || (asset === 'ETH' && rawAmount > 500);

    return {
      id: Math.random().toString(36).substr(2, 9),
      hash,
      from,
      to,
      asset,
      amount,
      isWhale,
      timestamp: new Date().toLocaleTimeString(),
    };
  };

  useEffect(() => {
    // Initial population
    const initialTxs = Array.from({ length: 5 }, generateMockTx);
    setTransactions(initialTxs);

    // Simulate live WebSocket stream of new blocks and transactions
    const interval = setInterval(() => {
      setLatestBlock((prev) => prev + 1);
      
      const newTxCount = Math.floor(Math.random() * 3) + 1; // 1-3 new TXs per tick
      const newTxs = Array.from({ length: newTxCount }, () => {
        const tx = generateMockTx();
        
        // Trigger IntelFeed if it's a massive transaction
        if (tx.isWhale) {
          addIntelBrief({
            id: `whale-${tx.hash}`,
            timestamp: tx.timestamp,
            type: 'ON-CHAIN WHALE',
            content: `Massive liquidity movement: ${tx.amount} ${tx.asset} routed to ${tx.to}. Potential market impact.`,
            severity: 'high' // This will make it pulse red in IntelFeed
          });

          // Grant XP for detecting a whale
          unlockAchievement(`Whale Detected: ${tx.amount} ${tx.asset}`, 50);
        }
        
        return tx;
      });
      
      setTransactions((prev) => {
        const combined = [...newTxs, ...prev];
        return combined.slice(0, 8); // Keep only the 8 most recent to prevent overflow
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [addIntelBrief, unlockAchievement]);

  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-200 h-full flex flex-col font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Eye className="text-purple-400 w-6 h-6" />
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">ChainSight</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg flex items-center gap-2">
            <Box className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-400">BLOCK: <span className="text-purple-400 font-bold">{latestBlock}</span></span>
          </div>
          <Activity className={`w-5 h-5 ${isSyncing ? 'text-purple-500 animate-pulse' : 'text-slate-500'}`} />
        </div>
      </div>

      {/* Network Status Node */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <DatabaseZap className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">RPC NODE CONNECTION</div>
            <div className="text-sm text-slate-200 font-bold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
              MAINNET // INDEXING LIVE MEMPOOL
            </div>
          </div>
        </div>
        <Link className="text-slate-600 w-5 h-5" />
      </div>

      {/* Transaction Feed Header */}
      <div className="grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 mb-3 px-4 uppercase tracking-wider">
        <div className="col-span-2">TX Hash</div>
        <div className="col-span-4">Route</div>
        <div className="col-span-3 text-right">Volume</div>
        <div className="col-span-3 text-right">Timestamp</div>
      </div>

      {/* Live Transaction List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {transactions.map((tx, index) => (
          <div 
            key={tx.id} 
            className={`flex items-center bg-slate-800/50 p-3 rounded-xl border transition-all duration-500 ${
              index === 0 ? 'bg-slate-800 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'border-slate-800'
            } ${tx.isWhale ? 'border-red-500/30' : ''}`}
          >
            <div className="grid grid-cols-12 gap-4 w-full items-center text-sm">
              {/* Hash */}
              <div className="col-span-2 text-purple-400 truncate font-mono">
                {tx.hash}
              </div>

              {/* Route */}
              <div className="col-span-4 flex items-center gap-2 text-slate-400 truncate">
                <span className="truncate w-20">{tx.from}</span>
                <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" />
                <span className="truncate w-20">{tx.to}</span>
              </div>

              {/* Volume */}
              <div className="col-span-3 text-right flex items-center justify-end gap-2">
                {tx.isWhale && <ShieldAlert className="w-3 h-3 text-red-400 animate-pulse" />}
                <span className={`font-bold ${tx.isWhale ? 'text-red-400' : 'text-slate-200'}`}>
                  {tx.amount}
                </span>
                <span className="text-slate-500 text-xs">{tx.asset}</span>
              </div>

              {/* Timestamp */}
              <div className="col-span-3 text-right text-xs text-slate-500">
                {tx.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChainSight;
