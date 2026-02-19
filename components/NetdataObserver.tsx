
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Cpu, Database, Zap, Bell, 
  Settings, RefreshCcw, Star, ExternalLink, 
  ChevronRight, HardDrive, Globe, Shield,
  ArrowUpRight, ArrowDownRight, Clock
} from 'lucide-react';

interface MetricPoint {
  time: string;
  value: number;
}

const NetdataObserver: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState<MetricPoint[]>([]);
  const [ramUsage, setRamUsage] = useState<MetricPoint[]>([]);
  const [netUsage, setNetUsage] = useState<MetricPoint[]>([]);
  const [activeNode, setActiveNode] = useState('LOCAL_WORKSTATION_01');
  const [isLive, setIsLive] = useState(true);

  // Generate initial data and update loop
  useEffect(() => {
    const generateInitialData = () => {
      return Array.from({ length: 40 }, (_, i) => ({
        time: i.toString(),
        value: Math.random() * 30 + 10
      }));
    };

    setCpuUsage(generateInitialData());
    setRamUsage(generateInitialData());
    setNetUsage(generateInitialData());

    const interval = setInterval(() => {
      if (!isLive) return;
      
      const updateSeries = (prev: MetricPoint[]) => {
        const nextVal = Math.max(5, Math.min(95, prev[prev.length - 1].value + (Math.random() - 0.5) * 10));
        const newSeries = [...prev.slice(1), { time: Date.now().toString(), value: nextVal }];
        return newSeries;
      };

      setCpuUsage(updateSeries);
      setRamUsage(updateSeries);
      setNetUsage(updateSeries);
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive]);

  const summaryMetrics = [
    { label: 'CPU CORE', val: `${cpuUsage[cpuUsage.length-1]?.value.toFixed(1)}%`, icon: <Cpu size={14} />, color: 'text-emerald-500' },
    { label: 'MEMORY', val: `${ramUsage[ramUsage.length-1]?.value.toFixed(1)}%`, icon: <Database size={14} />, color: 'text-cyan-500' },
    { label: 'NETWORK', val: `${(netUsage[netUsage.length-1]?.value * 124).toFixed(0)} KB/s`, icon: <Zap size={14} />, color: 'text-amber-500' },
    { label: 'DISK I/O', val: '12.4 MB/s', icon: <HardDrive size={14} />, color: 'text-purple-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-emerald-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Activity size={36} className="text-emerald-500" />
            NETDATA OBSERVER
          </h2>
          <p className="text-emerald-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Real-time Autonomous Monitoring Substrate / v1.45.0
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-emerald-500/20 rounded">
            <Star size={12} className="text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-400 uppercase">68K NODES</span>
          </div>
          <a href="https://github.com/netdata/netdata" target="_blank" rel="noopener noreferrer" className="text-emerald-900 hover:text-emerald-400 transition-colors">
            <ExternalLink size={20} />
          </a>
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${
              isLive ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900 text-emerald-800 border-emerald-900/40'
            }`}
          >
            {isLive ? <RefreshCcw size={12} className="animate-spin" /> : <Clock size={12} />}
            {isLive ? 'LIVE STREAM' : 'PAUSED'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summaryMetrics.map((m, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl border border-emerald-500/10 bg-slate-950/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
               {m.icon}
            </div>
            <div className="flex items-center gap-2 mb-2">
               <div className={`${m.color}`}>{m.icon}</div>
               <span className="text-[8px] font-black text-emerald-900 uppercase tracking-widest">{m.label}</span>
            </div>
            <div className="text-2xl font-black text-slate-100">{m.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Charts Main Area */}
        <div className="lg:col-span-8 space-y-6 overflow-y-auto custom-scrollbar pr-2">
          {/* CPU Chart */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/10 bg-slate-950/40">
             <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                   <Cpu size={18} className="text-emerald-500" />
                   <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest">System CPU (Usage)</h3>
                </div>
                <div className="text-[10px] font-mono text-emerald-900">MAX: 100% / CUR: {cpuUsage[cpuUsage.length-1]?.value.toFixed(1)}%</div>
             </div>
             <div className="h-48 flex items-end gap-1 px-2">
                {cpuUsage.map((p, i) => (
                  <motion.div 
                    key={i} 
                    className="flex-1 bg-emerald-500/40 rounded-t-sm hover:bg-emerald-500 transition-colors"
                    style={{ height: `${p.value}%` }}
                    initial={false}
                    animate={{ height: `${p.value}%` }}
                  />
                ))}
             </div>
          </div>

          {/* Network Chart */}
          <div className="glass-panel p-6 rounded-3xl border border-cyan-500/10 bg-slate-950/40">
             <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                   <Globe size={18} className="text-cyan-500" />
                   <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest">Mesh Interface (P2P)</h3>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-[8px] text-emerald-500 font-black"><ArrowUpRight size={10} /> 120 KB/s</div>
                  <div className="flex items-center gap-1 text-[8px] text-cyan-500 font-black"><ArrowDownRight size={10} /> 840 KB/s</div>
                </div>
             </div>
             <div className="h-48 relative overflow-hidden flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.path 
                    d={`M 0 100 ${netUsage.map((p, i) => `L ${(i / (netUsage.length - 1)) * 100} ${100 - p.value}`).join(' ')} L 100 100 Z`}
                    fill="url(#gradient-net)"
                    stroke="#06b6d4"
                    strokeWidth="0.5"
                  />
                  <defs>
                    <linearGradient id="gradient-net" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
             </div>
          </div>
        </div>

        {/* Sidebar Controls & Alerts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-slate-900/40">
             <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Bell size={14} /> Critical Alarms
             </h3>
             <div className="space-y-3">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                   <div className="p-1.5 rounded bg-red-500 text-slate-950 mt-1"><Shield size={10} /></div>
                   <div>
                      <div className="text-[10px] font-black text-red-500 uppercase tracking-tighter">Socket Leak Detected</div>
                      <div className="text-[8px] text-red-900 font-bold uppercase mt-1">NODE_04X-ALPHA / 2m ago</div>
                   </div>
                </div>
                <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-3 opacity-60">
                   <div className="p-1.5 rounded bg-amber-500 text-slate-950 mt-1"><Zap size={10} /></div>
                   <div>
                      <div className="text-[10px] font-black text-amber-500 uppercase tracking-tighter">IOPS Pressure High</div>
                      <div className="text-[8px] text-amber-900 font-bold uppercase mt-1">MAIN_FS_VOL / 12m ago</div>
                   </div>
                </div>
             </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/10 bg-slate-900/40">
             <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Settings size={14} /> Node Registry
             </h3>
             <div className="space-y-2">
                {[
                  { name: 'LOCAL_WORKSTATION_01', status: 'Online' },
                  { name: 'OFFSHORE_NODE_HK_04', status: 'Online' },
                  { name: 'SECURE_MESH_PROXY', status: 'Offline' }
                ].map((node, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveNode(node.name)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all group ${
                      activeNode === node.name ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-950/50 border-emerald-500/5 text-emerald-900'
                    }`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest truncate max-w-[140px]">{node.name}</span>
                    <div className="flex items-center gap-2">
                       <span className="text-[7px] font-bold uppercase opacity-50">{node.status}</span>
                       <div className={`w-1.5 h-1.5 rounded-full ${node.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                    </div>
                  </button>
                ))}
             </div>
          </div>

          <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
             <div className="text-[8px] text-emerald-900 font-black uppercase tracking-[0.2em] mb-2">Protocol Insight</div>
             <p className="text-[9px] text-emerald-800 font-bold leading-relaxed">
               Observer node is utilizing zero-copy metric streaming via local UNIX sockets for minimal overhead ( &lt; 1% CPU usage ).
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetdataObserver;
