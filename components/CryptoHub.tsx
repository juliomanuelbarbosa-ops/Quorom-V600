import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  Shield,
  Zap,
  ArrowRight,
  Copy,
  Terminal as TerminalIcon,
  Cpu,
  HardDrive,
  Globe,
  RefreshCcw,
  Check,
  Loader2,
  AlertCircle,
  Link as LinkIcon,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

interface CryptoHubProps {
  mode: 'wallet' | 'creator';
}

interface ChainBalance {
  network: string;
  symbol: string;
  amount: number;
  fiatValue: number;
  status: 'synced' | 'syncing' | 'error';
  color: string;
}

const CryptoHub: React.FC<CryptoHubProps> = ({ mode }) => {
  const [walletState, setWalletState] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [connectMethod, setConnectMethod] = useState<'browser' | 'ledger' | 'trezor' | null>(null);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [activeChain, setActiveChain] = useState('Ethereum');
  const [isSyncing, setIsSyncing] = useState(false);

  const [balances, setBalances] = useState<ChainBalance[]>([
    {
      network: 'Ethereum',
      symbol: 'ETH',
      amount: 12.45,
      fiatValue: 32450.12,
      status: 'synced',
      color: 'text-cyan-400',
    },
    {
      network: 'Solana',
      symbol: 'SOL',
      amount: 452.1,
      fiatValue: 68412.33,
      status: 'synced',
      color: 'text-purple-400',
    },
    {
      network: 'Polygon',
      symbol: 'MATIC',
      amount: 8902.5,
      fiatValue: 4120.45,
      status: 'synced',
      color: 'text-indigo-400',
    },
  ]);

  const initiateConnection = (method: 'browser' | 'ledger' | 'trezor') => {
    setConnectMethod(method);
    setWalletState('connecting');
    // Simulate WebHID / Injected connection handshake
    setTimeout(() => {
      setWalletState('connected');
    }, 2500);
  };

  const syncAllBalances = () => {
    setIsSyncing(true);
    setBalances((prev) => prev.map((b) => ({ ...b, status: 'syncing' })));

    setTimeout(() => {
      setBalances((prev) =>
        prev.map((b) => ({
          ...b,
          amount: b.amount + Math.random() * 0.1,
          status: 'synced',
        }))
      );
      setIsSyncing(false);
    }, 2000);
  };

  const erc20Template = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${tokenName.replace(/\s+/g, '') || 'SovereignToken'} is ERC20, Ownable {
    constructor() ERC20("${tokenName || 'Sovereign Token'}", "${tokenSymbol || 'SVT'}") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
  `;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase">
            {mode === 'wallet' ? 'SOVEREIGN WALLET' : 'MINT PROTOCOL'}
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Non-Custodial Multi-Chain Node
          </p>
        </div>
        {walletState === 'connected' && (
          <div className="flex items-center space-x-4 bg-slate-900/50 p-2 rounded-lg border border-cyan-500/10">
            <div className="flex flex-col items-end">
              <span className="text-[8px] text-cyan-900 font-black uppercase">Mesh Identity</span>
              <span className="text-[10px] text-cyan-500 font-mono">0x71C...3E4F</span>
            </div>
            <div className="w-10 h-10 bg-cyan-500/10 rounded flex items-center justify-center border border-cyan-500/20">
              <Cpu size={20} className="text-cyan-400" />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {walletState === 'disconnected' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-12 rounded-3xl border border-cyan-500/20 text-center space-y-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20" />

            <div className="space-y-4">
              <div className="w-24 h-24 bg-cyan-500/5 rounded-full flex items-center justify-center mx-auto border border-cyan-500/20 shadow-[0_0_80px_rgba(6,182,212,0.15)]">
                <Shield className="text-cyan-400 w-12 h-12 animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-slate-100 uppercase tracking-widest">Connect to Mesh</h3>
              <p className="text-cyan-800 text-xs font-bold uppercase tracking-widest max-w-sm mx-auto">
                Authorize your cryptographic signature to access local and global subnets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <button
                onClick={() => initiateConnection('browser')}
                className="group p-6 bg-slate-900 border border-cyan-500/10 rounded-2xl hover:border-cyan-500 hover:bg-cyan-500/5 transition-all text-center space-y-4"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <LinkIcon size={24} className="text-cyan-400" />
                </div>
                <div className="text-[10px] font-black uppercase text-cyan-800 group-hover:text-cyan-400">
                  Browser Wallet
                </div>
              </button>

              <button
                onClick={() => initiateConnection('ledger')}
                className="group p-6 bg-slate-900 border border-cyan-500/10 rounded-2xl hover:border-cyan-500 hover:bg-cyan-500/5 transition-all text-center space-y-4"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <HardDrive size={24} className="text-cyan-400" />
                </div>
                <div className="text-[10px] font-black uppercase text-cyan-800 group-hover:text-cyan-400">
                  Ledger Nano
                </div>
              </button>

              <button
                onClick={() => initiateConnection('trezor')}
                className="group p-6 bg-slate-900 border border-cyan-500/10 rounded-2xl hover:border-cyan-500 hover:bg-cyan-500/5 transition-all text-center space-y-4"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Cpu size={24} className="text-cyan-400" />
                </div>
                <div className="text-[10px] font-black uppercase text-cyan-800 group-hover:text-cyan-400">
                  Trezor One
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {walletState === 'connecting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel p-20 rounded-3xl border border-cyan-500/20 text-center space-y-8"
          >
            <div className="relative w-32 h-32 mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="absolute inset-0 border-b-2 border-cyan-500 rounded-full"
              />
              <div className="absolute inset-4 border-t-2 border-cyan-800 rounded-full animate-reverse-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                {connectMethod === 'browser' ? (
                  <LinkIcon className="text-cyan-400 animate-pulse" size={32} />
                ) : (
                  <HardDrive className="text-cyan-400 animate-pulse" size={32} />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-cyan-400 uppercase tracking-[0.3em]">Handshaking...</h3>
              <p className="text-[10px] text-cyan-900 font-bold uppercase tracking-widest">
                {connectMethod === 'browser'
                  ? 'Waiting for injected provider authorization'
                  : 'Scanning WebHID interface for compatible device'}
              </p>
            </div>
          </motion.div>
        )}

        {walletState === 'connected' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left: Balances and Chain Management */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 space-y-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Globe size={18} className="text-cyan-500" />
                    <h3 className="text-xs font-black text-cyan-400 tracking-widest uppercase">Multi-Chain Assets</h3>
                  </div>
                  <button
                    onClick={syncAllBalances}
                    disabled={isSyncing}
                    className="flex items-center space-x-2 text-[10px] font-bold text-cyan-800 hover:text-cyan-400 transition-colors uppercase tracking-widest"
                  >
                    <RefreshCcw size={14} className={isSyncing ? 'animate-spin' : ''} />
                    <span>Sync Mesh</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {balances.map((balance) => (
                    <motion.div
                      key={balance.network}
                      whileHover={{ y: -4 }}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                        activeChain === balance.network
                          ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                          : 'bg-slate-900/50 border-cyan-500/10 hover:border-cyan-500/30'
                      }`}
                      onClick={() => setActiveChain(balance.network)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black text-cyan-900 uppercase tracking-widest">
                          {balance.network}
                        </span>
                        {balance.status === 'syncing' ? (
                          <Loader2 size={12} className="animate-spin text-cyan-800" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-black text-slate-100">
                          {balance.amount.toFixed(2)} <span className={balance.color}>{balance.symbol}</span>
                        </div>
                        <div className="text-[10px] text-cyan-900 font-bold uppercase tracking-widest">
                          ≈ ${balance.fiatValue.toLocaleString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 bg-slate-950/50 rounded-2xl border border-cyan-500/10 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-black text-cyan-400 uppercase tracking-widest">
                      Active Chain: {activeChain}
                    </div>
                    <div className="flex space-x-2">
                      <div className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-[8px] font-black text-green-500 uppercase tracking-widest">
                        Healthy
                      </div>
                      <div className="px-2 py-0.5 bg-slate-800 border border-cyan-500/10 rounded text-[8px] font-black text-cyan-800 uppercase tracking-widest">
                        Latency: 12ms
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 rounded-xl font-black text-[10px] tracking-[0.3em] transition-all uppercase shadow-lg shadow-cyan-500/10">
                      Transfer Assets
                    </button>
                    <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 py-4 rounded-xl font-black text-[10px] tracking-[0.3em] transition-all uppercase border border-cyan-500/10">
                      Receive Node
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Smart Contract / Forge Logic */}
            <div className="space-y-8">
              <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 space-y-6 h-full flex flex-col">
                <div className="flex items-center space-x-2">
                  <Zap size={18} className="text-cyan-500" />
                  <h3 className="text-xs font-black text-cyan-400 tracking-widest uppercase">Smart Contract Lab</h3>
                </div>

                {mode === 'creator' ? (
                  <div className="space-y-6 flex-1 flex flex-col">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="token-name" className="text-[10px] text-cyan-900 font-bold uppercase mb-2 block tracking-widest">
                          Token Name
                        </label>
                        <input
                          id="token-name"
                          type="text"
                          className="w-full bg-slate-950 border border-cyan-500/20 rounded-xl p-4 text-cyan-400 focus:outline-none focus:border-cyan-500 text-sm font-bold tracking-wider"
                          placeholder="Neon Matrix Token"
                          value={tokenName}
                          onChange={(e) => setTokenName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="token-symbol" className="text-[10px] text-cyan-900 font-bold uppercase mb-2 block tracking-widest">
                          Symbol
                        </label>
                        <input
                          id="token-symbol"
                          type="text"
                          className="w-full bg-slate-950 border border-cyan-500/20 rounded-xl p-4 text-cyan-400 focus:outline-none focus:border-cyan-500 text-sm font-bold tracking-wider"
                          placeholder="NMX"
                          value={tokenSymbol}
                          onChange={(e) => setTokenSymbol(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="relative group flex-1">
                      <div className="absolute top-2 right-2 z-10">
                        <button className="p-2 bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 rounded-lg border border-cyan-500/20 transition-all text-cyan-400">
                          <Copy size={12} />
                        </button>
                      </div>
                      <pre className="h-48 bg-slate-950 p-6 rounded-2xl border border-cyan-500/10 font-mono text-[9px] text-cyan-800 overflow-auto custom-scrollbar leading-relaxed">
                        {erc20Template}
                      </pre>
                    </div>

                    <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 rounded-xl font-black text-[10px] tracking-[0.3em] transition-all uppercase shadow-lg shadow-cyan-500/10">
                      Deploy Mint Node
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-xl flex items-start space-x-3">
                      <AlertCircle size={16} className="text-cyan-700 flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] text-cyan-800 font-bold uppercase tracking-wide leading-relaxed">
                        Sovereign Wallet mode restricts smart contract deployment to ensure high-entropy security for
                        stored assets.
                      </p>
                    </div>
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-cyan-500/10"
                        >
                          <div className="flex items-center space-x-2">
                            <TerminalIcon size={12} className="text-cyan-800" />
                            <span className="text-[10px] text-slate-400 font-mono">
                              0x{Math.random().toString(16).slice(2, 8)}... Tx
                            </span>
                          </div>
                          <ArrowRight size={12} className="text-cyan-900" />
                        </div>
                      ))}
                    </div>
                    <button className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-400 py-3 rounded-xl font-black text-[10px] tracking-[0.2em] transition-all uppercase border border-cyan-500/10">
                      View Transaction Ledger
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CryptoHub;
