import React, { useState, useEffect } from 'react';
import { Layers, Cpu, Fingerprint, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

const AssetTokenize = () => {
  const [assetName, setAssetName] = useState('Manhattan Commercial Plaza');
  const [assetValue, setAssetValue] = useState('45000000');
  const [fractions, setFractions] = useState('100000');
  const [isMinting, setIsMinting] = useState(false);
  const [mintProgress, setMintProgress] = useState(0);
  const [deployedAssets, setDeployedAssets] = useState([
    { id: 'RWA-091', name: 'Tokyo Data Center', fractions: '50k', value: '$12M', status: 'Active' },
    { id: 'RWA-088', name: 'Gold Bullion Vault 4', fractions: '10k', value: '$2.5M', status: 'Locked' },
  ]);

  const handleTokenize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMinting(true);
    setMintProgress(0);

    // Simulate smart contract compilation and deployment steps
    const interval = setInterval(() => {
      setMintProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsMinting(false);
          setDeployedAssets(
            [
              {
                id: `RWA-${Math.floor(Math.random() * 900) + 100}`,
                name: assetName,
                fractions: `${(parseInt(fractions) / 1000).toFixed(0)}k`,
                value: `$${(parseInt(assetValue) / 1000000).toFixed(1)}M`,
                status: 'Active',
              },
              ...deployedAssets,
            ].slice(0, 4)
          );
          return 100;
        }
        return prev + 2; // Progress speed
      });
    }, 50);
  };

  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-200 h-full flex flex-col font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Layers className="text-emerald-500 w-6 h-6" />
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">AssetTokenize // Forge</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-emerald-500/30 rounded-lg">
          <Cpu className="w-4 h-4 text-emerald-500" />
          <span className="text-xs text-emerald-400 font-bold">ERC-3643 COMPLIANT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {/* Left Column: Deployment Terminal */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col">
          <div className="text-xs text-slate-500 mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            RWA SMART CONTRACT DEPLOYMENT
          </div>

          <form onSubmit={handleTokenize} className="space-y-4 flex-1">
            <div>
              <label htmlFor="asset-designation" className="block text-[10px] text-slate-400 mb-1">ASSET DESIGNATION</label>
              <input
                id="asset-designation"
                type="text"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                disabled={isMinting}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="total-valuation" className="block text-[10px] text-slate-400 mb-1">TOTAL VALUATION (USD)</label>
                <input
                  id="total-valuation"
                  type="number"
                  value={assetValue}
                  onChange={(e) => setAssetValue(e.target.value)}
                  disabled={isMinting}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="fractional-supply" className="block text-[10px] text-slate-400 mb-1">FRACTIONAL SUPPLY</label>
                <input
                  id="fractional-supply"
                  type="number"
                  value={fractions}
                  onChange={(e) => setFractions(e.target.value)}
                  disabled={isMinting}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isMinting}
              className={`w-full mt-4 py-3 rounded-lg font-bold text-sm tracking-widest transition-all ${
                isMinting
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              }`}
            >
              {isMinting ? 'COMPILING CONTRACT...' : 'INITIALIZE TOKENIZATION'}
            </button>
          </form>

          {/* Minting Progress Bar */}
          {isMinting && (
            <div className="mt-6">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>ON-CHAIN INJECTION</span>
                <span>{mintProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-emerald-500 transition-all duration-75 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  style={{ width: `${mintProgress}%` }}
                ></div>
              </div>
              <div className="text-[10px] text-emerald-500/70 mt-2 text-center animate-pulse">
                {mintProgress < 30
                  ? 'Compiling Solidity ABIs...'
                  : mintProgress < 70
                    ? 'Generating cryptographic proofs...'
                    : 'Broadcasting to network...'}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Deployed Registry */}
        <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-5">
          <div className="text-xs text-slate-500 mb-4 flex items-center gap-2">
            <Fingerprint className="w-4 h-4" />
            IMMUTABLE LEDGER REGISTRY
          </div>

          <div className="space-y-3">
            {deployedAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center justify-between group hover:border-slate-600 transition-colors"
              >
                <div>
                  <div className="text-sm font-bold text-slate-200">{asset.name}</div>
                  <div className="text-xs text-slate-500 flex gap-2 mt-1">
                    <span className="text-emerald-400">{asset.id}</span>
                    <span>|</span>
                    <span>{asset.fractions} Tokens</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white font-bold">{asset.value}</div>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {asset.status === 'Active' ? (
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-slate-500" />
                    )}
                    <span
                      className={`text-[10px] uppercase ${asset.status === 'Active' ? 'text-cyan-400' : 'text-slate-500'}`}
                    >
                      {asset.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTokenize;
