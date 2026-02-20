import React, { useState, useEffect } from 'react';
import { Eye, Activity, Database, Network } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, TooltipProps
} from 'recharts';

const VisualCortex = () => {
  const [isRendering, setIsRendering] = useState(true);

  // Mock data representing the Total Value Locked (TVL) of tokenized assets over 24 hours
  const tvlData = [
    { time: '00:00', tvl: 12.5 },
    { time: '04:00', tvl: 14.2 },
    { time: '08:00', tvl: 13.8 },
    { time: '12:00', tvl: 16.5 },
    { time: '16:00', tvl: 22.1 },
    { time: '20:00', tvl: 24.8 },
    { time: '24:00', tvl: 28.4 },
  ];

  // Mock data representing the distribution of asset types
  const sectorData = [
    { subject: 'Real Estate', value: 120, fullMark: 150 },
    { subject: 'Commodities', value: 98, fullMark: 150 },
    { subject: 'Equities', value: 86, fullMark: 150 },
    { subject: 'Intellectual Prop', value: 99, fullMark: 150 },
    { subject: 'Bonds', value: 85, fullMark: 150 },
    { subject: 'Derivatives', value: 65, fullMark: 150 },
  ];

  useEffect(() => {
    // Simulate optical boot-up sequence
    const timer = setTimeout(() => setIsRendering(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Custom Tooltip to replace the default white background with our slate theme
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] font-mono z-50">
          <p className="text-slate-400 text-xs mb-2 border-b border-slate-800 pb-1">{label || 'SECTOR VECTOR'}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center gap-4 my-1 text-sm">
              <span style={{ color: entry.color }} className="uppercase text-xs">{entry.name}:</span>
              <span className="text-white font-bold">{entry.value}{entry.name === 'tvl' ? 'M' : ''}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col h-full font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Eye className="text-cyan-400 w-6 h-6" />
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">VisualCortex // Telemetry</h2>
        </div>
        <div className="flex items-center gap-2">
          <Activity className={`w-5 h-5 ${isRendering ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
          <span className="text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
            {isRendering ? 'INITIALIZING OPTICS...' : 'OPTICS ONLINE'}
          </span>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
          <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1">
            <Database className="w-3 h-3" /> GLOBAL TVL
          </div>
          <div className="text-xl text-white font-bold">$28.4M</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
          <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1">
            <Network className="w-3 h-3" /> ACTIVE NODES
          </div>
          <div className="text-xl text-white font-bold text-emerald-400">1,402</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-400/5 animate-pulse"></div>
          <div className="text-[10px] text-cyan-500/70 mb-1 relative z-10">SYSTEM STABILITY</div>
          <div className="text-xl text-cyan-400 font-bold relative z-10">99.9%</div>
        </div>
      </div>

      {/* Main Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[300px]">
        
        {/* TVL Area Chart */}
        <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4 relative flex flex-col">
          <div className="text-xs text-slate-500 mb-4 tracking-widest uppercase">Liquidity Aggregation (24H)</div>
          <div className="flex-1 w-full">
            {isRendering ? (
              <div className="h-full w-full flex items-center justify-center text-slate-600">Loading metrics...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tvlData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTvl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '3 3' }} />
                  <Area type="monotone" dataKey="tvl" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorTvl)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Sector Radar Chart */}
        <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4 relative flex flex-col">
          <div className="text-xs text-slate-500 mb-4 tracking-widest uppercase">Asset Sector Mapping</div>
          <div className="flex-1 w-full">
            {isRendering ? (
              <div className="h-full w-full flex items-center justify-center text-slate-600">Calibrating sensors...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={sectorData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Allocation" dataKey="value" stroke="#a855f7" strokeWidth={2} fill="#a855f7" fillOpacity={0.2} />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VisualCortex;
