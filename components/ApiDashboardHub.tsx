import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Added Loader2 to the list of imports from lucide-react to fix the reference error on line 99
import { BarChart3, Globe, Zap, Cpu, RefreshCcw, Quote, Camera, Activity, Loader2 } from 'lucide-react';

interface NasaData {
  url: string;
  title: string;
  explanation: string;
}

interface QuoteData {
  q: string;
  a: string;
}

const ApiDashboardHub: React.FC = () => {
  const [nasa, setNasa] = useState<NasaData | null>(null);
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [crypto, setCrypto] = useState<{ eth: number; btc: number }>({ eth: 2640.45, btc: 64120.12 });
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState(new Date());

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch NASA APOD (Demo key or public)
      const nasaRes = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
      const nasaData = await nasaRes.json();
      setNasa(nasaData);

      // Fetch Quote
      const quoteRes = await fetch('https://zenquotes.io/api/random');
      const quoteData = await quoteRes.json();
      setQuote(quoteData[0]);

      // Randomize Crypto for visual feedback
      setCrypto({
        eth: 2600 + Math.random() * 100,
        btc: 64000 + Math.random() * 500,
      });

      setLastSync(new Date());
    } catch (e) {
      console.error('Signal synchronization failed', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Sync every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">LIVE DATAFEED</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">
            Real-time Environmental Synchronization
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <div className="text-[8px] text-cyan-900 font-bold uppercase">Last Sync</div>
            <div className="text-[10px] text-cyan-600 font-mono">{lastSync.toLocaleTimeString()}</div>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-3 bg-slate-900 border border-cyan-500/20 rounded-full text-cyan-500 hover:bg-slate-800 hover:border-cyan-500 transition-all shadow-lg"
          >
            <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-auto">
        {/* NASA Hub */}
        <div className="md:col-span-2 glass-panel rounded-2xl border border-cyan-500/20 overflow-hidden flex flex-col relative group">
          <div className="p-4 border-b border-cyan-500/10 bg-slate-900/50 flex justify-between items-center relative z-10">
            <div className="flex items-center space-x-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
              <Camera size={14} /> <span>Deep Space Observation (NASA)</span>
            </div>
          </div>
          <div className="flex-1 bg-slate-950 relative min-h-[300px]">
            {nasa ? (
              <>
                <img
                  src={nasa.url}
                  alt={nasa.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2">
                  <h3 className="text-xl font-black text-cyan-400 uppercase tracking-tighter">{nasa.title}</h3>
                  <p className="text-[10px] text-slate-400 line-clamp-3 leading-relaxed uppercase tracking-wider">
                    {nasa.explanation}
                  </p>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="animate-spin text-cyan-800" size={32} />
              </div>
            )}
          </div>
        </div>

        {/* Intelligence Hub */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/40 relative overflow-hidden h-fit">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Quote size={64} />
            </div>
            <h3 className="text-xs font-bold text-cyan-600 tracking-widest uppercase mb-4 flex items-center space-x-2">
              <Zap size={14} /> <span>Philosophical Buffer</span>
            </h3>
            {quote ? (
              <div className="space-y-4">
                <p className="text-sm italic text-slate-200 leading-relaxed">&quot;{quote.q}&quot;</p>
                <div className="text-right text-[10px] font-bold text-cyan-500 tracking-widest uppercase">
                  — {quote.a}
                </div>
              </div>
            ) : (
              <div className="animate-pulse space-y-2">
                <div className="h-2 bg-slate-800 rounded w-full" />
                <div className="h-2 bg-slate-800 rounded w-3/4" />
              </div>
            )}
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 tracking-widest uppercase flex items-center space-x-2">
              <Activity size={14} /> <span>Neural Liquidity Mesh</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-cyan-900 font-bold uppercase">BTC-USD</span>
                <span className="text-lg font-black text-slate-100">${crypto.btc.toLocaleString()}</span>
              </div>
              <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                <motion.div animate={{ width: '65%' }} className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
              </div>

              <div className="flex justify-between items-end pt-2">
                <span className="text-[10px] text-cyan-900 font-bold uppercase">ETH-USD</span>
                <span className="text-lg font-black text-slate-100">${crypto.eth.toLocaleString()}</span>
              </div>
              <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                <motion.div animate={{ width: '42%' }} className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 flex items-center space-x-4">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border border-cyan-500/20">
              <Globe className="text-cyan-500 animate-pulse" size={24} />
            </div>
            <div>
              <div className="text-[8px] text-cyan-900 font-bold uppercase">Network Integrity</div>
              <div className="text-xs font-black text-cyan-400 uppercase tracking-widest">Global P2P Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDashboardHub;
