import React from 'react';
import { Terminal, Code2, Play, Save } from 'lucide-react';

const CodeNexus = () => {
  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col h-full font-mono">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Code2 className="text-orange-400 w-6 h-6" />
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">CodeNexus</h2>
        </div>
        <div className="flex gap-2">
          <button className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 transition-colors">
            <Save className="w-4 h-4 text-slate-400" />
          </button>
          <button className="p-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition-colors">
            <Play className="w-4 h-4 text-emerald-500" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-4 overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
          <Terminal className="w-3 h-3 text-slate-500" />
          <span className="text-[10px] text-slate-500 uppercase">arb_engine_v2.sol</span>
        </div>
        <pre className="text-xs text-slate-400 overflow-y-auto flex-1 custom-scrollbar">
          {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArbitrageEngine {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }

    function executeArb(
        address tokenA,
        address tokenB,
        uint256 amount
    ) external {
        // Logic for cross-dex arbitrage
        // 1. Flash loan tokenA
        // 2. Swap tokenA for tokenB on DEX1
        // 3. Swap tokenB for tokenA on DEX2
        // 4. Repay flash loan
    }
}`}
        </pre>
      </div>
    </div>
  );
};

export default CodeNexus;
