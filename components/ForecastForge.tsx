import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Zap,
  Info,
  Loader2,
  Activity,
  Target,
  Clock,
  ShieldCheck,
  RefreshCcw,
} from 'lucide-react';

const ForecastForge: React.FC = () => {
  const [isProjecting, setIsProjecting] = useState(false);
  const [scope, setScope] = useState(30);
  const [confidence, setConfidence] = useState(95);
  const [result, setResult] = useState<number[] | null>(null);

  const runProjection = () => {
    setIsProjecting(true);
    setResult(null);

    // Simulate complex neural projection
    setTimeout(() => {
      const data = Array.from({ length: scope }, (_, i) => {
        const base = 50 + Math.sin(i * 0.5) * 20;
        const noise = (Math.random() - 0.5) * (100 - confidence) * 0.5;
        return Math.max(0, Math.min(100, base + noise));
      });
      setResult(data);
      setIsProjecting(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <TrendingUp size={36} className="text-cyan-500" />
            FORECAST FORGE
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Predictive Modeling & Temporal Projection Substrate
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400 font-black uppercase tracking-widest">
            Monte Carlo Engine: Active
          </div>
          <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-[10px] text-purple-400 font-black uppercase tracking-widest">
            Bayesian Logic: Synced
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Controls Sidebar */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label htmlFor="temporal-scope" className="text-[10px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-2">
                  <Clock size={12} /> Temporal Scope
                </label>
                <span className="text-cyan-400 font-mono text-xs">{scope} Cycles</span>
              </div>
              <input
                id="temporal-scope"
                type="range"
                min="10"
                max="100"
                step="10"
                value={scope}
                onChange={(e) => setScope(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label htmlFor="confidence-input" className="text-[10px] text-cyan-900 font-black uppercase tracking-widest flex items-center gap-2">
                  <Target size={12} /> Confidence
                </label>
                <span className="text-cyan-400 font-mono text-xs">{confidence}%</span>
              </div>
              <input
                id="confidence-input"
                type="range"
                min="50"
                max="99"
                step="1"
                value={confidence}
                onChange={(e) => setConfidence(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <button
              onClick={runProjection}
              disabled={isProjecting}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 py-4 rounded-xl font-black text-xs tracking-[0.3em] transition-all uppercase shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              {isProjecting ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />}
              <span>Run Projection</span>
            </button>
          </div>

          <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Info size={14} /> Methodology
            </h3>
            <p className="text-[9px] text-cyan-900 font-bold uppercase leading-relaxed tracking-wider">
              Calculates outcome variance across N-dimensional neural paths using weighted probability distribution.
              Optimal for market volatility or systemic risk assessment.
            </p>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 min-h-[500px] flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="w-full h-full border-b border-cyan-500/20 flex flex-col justify-between">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-full h-px bg-cyan-500/10" />
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mb-12 relative z-10">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-cyan-500" />
                <h3 className="text-xs font-black text-cyan-400 tracking-widest uppercase">
                  Neural Probability Matrix
                </h3>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-cyan-900">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" /> Projected
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-cyan-500/20" /> Variance
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-end justify-between gap-1 relative z-10 h-[300px]">
              <AnimatePresence mode="wait">
                {isProjecting ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  >
                    <div className="relative w-24 h-24">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 border-t-2 border-cyan-500 rounded-full"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-4 border-b-2 border-purple-500 rounded-full"
                      />
                    </div>
                    <span className="text-[10px] text-cyan-500 font-black uppercase tracking-[0.5em]">
                      Projecting Paths...
                    </span>
                  </motion.div>
                ) : result ? (
                  <div className="w-full h-full flex items-end justify-between gap-1">
                    {result.map((val, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${val}%` }}
                        transition={{ duration: 0.5, delay: i * 0.02 }}
                        className="group relative flex-1"
                      >
                        {/* Probability variance cloud */}
                        <div
                          className="absolute bottom-0 w-full bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all rounded-t-sm"
                          style={{ height: `${val + (100 - confidence)}%` }}
                        />
                        {/* Main projection line */}
                        <div className="absolute bottom-0 w-full bg-cyan-500 rounded-t-sm h-full shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-20">
                    <TrendingUp size={64} className="text-cyan-900" />
                    <p className="text-xs uppercase tracking-[0.4em] font-black text-cyan-900">
                      Initiate signal for projection
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6 pt-8 border-t border-cyan-500/10 relative z-10">
              <div className="space-y-1">
                <span className="text-[8px] text-cyan-900 font-black uppercase tracking-widest">Mean Divergence</span>
                <div className="text-xl font-black text-slate-100">
                  {result ? (Math.random() * 2.5).toFixed(2) : '--'}%
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-cyan-900 font-black uppercase tracking-widest">Anomaly Threshold</span>
                <div className="text-xl font-black text-red-500">EXCEEDED</div>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-cyan-900 font-black uppercase tracking-widest">Data Integrity</span>
                <div className="text-xl font-black text-green-500">99.98%</div>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-1 glass-panel p-6 rounded-2xl border border-cyan-500/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-cyan-500/20 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">Secure Compute</div>
                  <div className="text-[8px] text-cyan-900 font-bold uppercase tracking-widest mt-1">
                    Air-gapped Bayesian node
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 border border-cyan-500/20 rounded-lg text-[10px] font-black text-cyan-800 hover:text-cyan-400 hover:border-cyan-500 transition-all uppercase tracking-widest">
                Export Ledger
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastForge;
