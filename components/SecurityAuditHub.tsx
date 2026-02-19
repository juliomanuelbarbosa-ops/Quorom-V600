import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Zap, AlertTriangle, Loader2, Search, Lock } from 'lucide-react';

const SecurityAuditHub: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const startScan = () => {
    setIsScanning(true);
    setResults(null);
    setTimeout(() => {
      setResults({
        score: 84,
        vulnerabilities: [
          { type: "Reentrancy", risk: "Critical", status: "Potential Match" },
          { type: "Gas Limit Loop", risk: "Medium", status: "Warning" },
          { type: "Unauthorized Access", risk: "Critical", status: "Secure" }
        ],
        integrity: "92.4%"
      });
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-red-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-red-500 glow-text tracking-tight uppercase">SEC OPS AUDIT</h2>
          <p className="text-red-900 text-xs uppercase tracking-[0.2em] mt-1">Sovereign Mesh Security Scanner</p>
        </div>
        <button 
          onClick={startScan}
          disabled={isScanning}
          className="bg-red-500 hover:bg-red-400 disabled:bg-slate-800 text-white px-8 py-2 rounded font-black text-xs tracking-widest flex items-center space-x-2 transition-all"
        >
          {isScanning ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
          <span>{isScanning ? 'INITIATING SCAN' : 'START AUDIT'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 rounded-2xl border border-red-500/20 flex flex-col justify-center min-h-[400px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isScanning && !results && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
                <div className="w-20 h-20 bg-red-500/5 border border-red-500/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(239,68,68,0.1)]">
                  <Lock size={32} className="text-red-900" />
                </div>
                <div className="space-y-2">
                   <h3 className="text-xl font-black text-red-900 uppercase tracking-widest">Awaiting Security Mesh</h3>
                   <p className="text-xs text-slate-500 max-w-xs mx-auto">Upload a contract substrate or target node to begin deep-packet integrity analysis.</p>
                </div>
              </motion.div>
            )}

            {isScanning && (
              <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center space-y-8">
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-32 h-32 border-4 border-dashed border-red-500 rounded-full"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Zap size={32} className="text-red-500 animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                   <p className="text-[10px] text-red-500 font-black tracking-[0.5em] uppercase animate-pulse">Scanning Bytecode Matrix...</p>
                   <p className="text-[8px] text-red-900 font-bold uppercase">Decompiling EVM Instructions</p>
                </div>
              </motion.div>
            )}

            {results && !isScanning && (
              <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                <div className="flex justify-between items-end">
                   <div>
                      <h3 className="text-4xl font-black text-red-500">{results.score}/100</h3>
                      <p className="text-[10px] text-red-900 font-bold uppercase tracking-widest">Global Security Index</p>
                   </div>
                   <div className="text-right">
                      <div className="text-xl font-black text-green-500">{results.integrity}</div>
                      <p className="text-[10px] text-green-900 font-bold uppercase tracking-widest">Mesh Integrity</p>
                   </div>
                </div>

                <div className="space-y-4">
                   {results.vulnerabilities.map((v: any, i: number) => (
                     <div key={i} className="p-4 bg-slate-900/50 border border-red-500/10 rounded-lg flex items-center justify-between group hover:border-red-500/30 transition-all">
                        <div className="flex items-center space-x-4">
                           <div className={`p-2 rounded bg-slate-950 border ${v.risk === 'Critical' ? 'border-red-500/50 text-red-500' : 'border-yellow-500/50 text-yellow-500'}`}>
                              <AlertTriangle size={14} />
                           </div>
                           <div>
                              <div className="text-xs font-bold text-slate-100 uppercase tracking-widest">{v.type}</div>
                              <div className="text-[8px] font-black text-red-900 uppercase">Risk Level: {v.risk}</div>
                           </div>
                        </div>
                        <div className={`text-[8px] font-black px-2 py-1 rounded bg-slate-950 uppercase ${v.status === 'Secure' ? 'text-green-500 border border-green-500/30' : 'text-red-500 border border-red-500/30'}`}>
                           {v.status}
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
           <div className="glass-panel p-6 rounded-xl border border-red-500/20 bg-slate-900/40">
              <h3 className="text-xs font-black text-red-900 uppercase tracking-widest mb-4">Integrity Notes</h3>
              <div className="space-y-4 font-mono text-[9px] text-red-900/80">
                 <p>> [WARN] POST-QUANTUM ENTROPY: LOW</p>
                 <p>> [INFO] SHADOW-SOCKETS: DETECTED</p>
                 <p>> [CRIT] ZERO-DAY BUFFER OVERFLOW PROTECTION: INACTIVE</p>
              </div>
           </div>

           <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center space-x-4">
              <ShieldCheck size={24} className="text-red-900" />
              <div>
                 <p className="text-[10px] text-red-900 font-black uppercase">Deep Auditor Node</p>
                 <p className="text-[8px] text-slate-500 uppercase">v2.4.0 Engine Loaded</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAuditHub;