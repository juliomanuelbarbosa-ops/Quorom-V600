
import React, { useState } from 'react';
import { Wallet, Shield, Zap, ArrowRight, Copy, Terminal as TerminalIcon } from 'lucide-react';

interface CryptoHubProps {
  mode: 'wallet' | 'creator';
}

const CryptoHub: React.FC<CryptoHubProps> = ({ mode }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');

  const mockConnect = () => {
    setWalletConnected(true);
  };

  const erc20Template = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${tokenName || "MyToken"} is ERC20, Ownable {
    constructor() ERC20("${tokenName || "MyToken"}", "${tokenSymbol || "MTK"}") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
  `;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">
          {mode === 'wallet' ? 'SOVEREIGN WALLET' : 'MINT PROTOCOL'}
        </h2>
        <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Non-Custodial Asset Management</p>
      </div>

      {!walletConnected ? (
        <div className="glass-panel p-12 rounded-2xl border border-cyan-500/20 text-center space-y-8">
          <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
            <Shield className="text-cyan-400 w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Encrypted Gateway Restricted</h3>
            <p className="text-cyan-800 text-sm max-w-sm mx-auto">Connect your hardware or browser wallet to authorize on-chain operations.</p>
          </div>
          <button 
            onClick={mockConnect}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-3 rounded text-sm tracking-widest transition-all shadow-lg shadow-cyan-500/20"
          >
            CONNECT WALLET
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-6 rounded-xl border border-cyan-500/30 space-y-6">
             <div className="flex justify-between items-center border-b border-cyan-500/10 pb-4">
                <div className="flex items-center space-x-2">
                  <Wallet size={16} className="text-cyan-400" />
                  <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">Portfolio</span>
                </div>
                <div className="text-[10px] text-cyan-800 font-bold uppercase">Mainnet v4</div>
             </div>

             <div className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-lg flex justify-between items-center">
                   <div>
                      <div className="text-[10px] text-cyan-900 font-bold uppercase">Balance</div>
                      <div className="text-2xl font-black text-slate-100">42.069 ETH</div>
                   </div>
                   <div className="text-right text-cyan-500 text-xs font-bold">
                      ≈ $112,450.00
                   </div>
                </div>

                <div className="flex space-x-2">
                   <button className="flex-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 py-3 rounded text-[10px] font-bold text-cyan-400 tracking-widest transition">
                      SEND
                   </button>
                   <button className="flex-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 py-3 rounded text-[10px] font-bold text-cyan-400 tracking-widest transition">
                      RECEIVE
                   </button>
                </div>
             </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-cyan-500/30 space-y-4">
             <h3 className="text-xs font-bold text-cyan-400 tracking-widest uppercase flex items-center space-x-2">
                <Zap size={14} /> <span>Smart Contract Lab</span>
             </h3>
             
             {mode === 'creator' ? (
               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-cyan-900 font-bold uppercase mb-1 block">Token Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-900 border border-cyan-500/20 rounded p-2 text-cyan-400 focus:outline-none focus:border-cyan-500"
                      placeholder="e.g. Quorum Token"
                      value={tokenName}
                      onChange={(e) => setTokenName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-cyan-900 font-bold uppercase mb-1 block">Symbol</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-900 border border-cyan-500/20 rounded p-2 text-cyan-400 focus:outline-none focus:border-cyan-500"
                      placeholder="e.g. QRM"
                      value={tokenSymbol}
                      onChange={(e) => setTokenSymbol(e.target.value)}
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[9px] bg-slate-950 p-4 rounded overflow-hidden max-h-40 border border-cyan-500/10 font-mono text-cyan-700">
                      {erc20Template}
                    </pre>
                    <button className="absolute top-2 right-2 p-1.5 bg-slate-900 hover:bg-slate-800 rounded border border-cyan-500/20 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Copy size={12} />
                    </button>
                  </div>
                  <button className="w-full bg-cyan-500 text-slate-950 py-3 rounded text-[10px] font-black tracking-[0.2em] hover:bg-cyan-400 transition-colors">
                    DEPLOY CONTRACT
                  </button>
               </div>
             ) : (
               <div className="space-y-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="p-3 bg-slate-900/50 border border-cyan-500/10 rounded flex items-center justify-between text-[10px]">
                      <div className="flex items-center space-x-2">
                        <TerminalIcon size={12} className="text-cyan-800" />
                        <span className="text-cyan-700">0x{Math.random().toString(16).slice(2, 10)}... DEPLOYED</span>
                      </div>
                      <ArrowRight size={12} className="text-cyan-900" />
                    </div>
                  ))}
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoHub;
