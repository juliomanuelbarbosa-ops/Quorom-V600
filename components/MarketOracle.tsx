import React, { useState, useEffect } from 'react';
import { LineChart as ChartIcon, TrendingUp, Activity, Crosshair } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  TooltipProps
} from 'recharts';

// Define types for the data
interface MarketDataPoint {
  time: string;
  DraftKings?: number;
  FanDuel?: number;
  Binance?: number;
  Coinbase?: number;
  ev: number;
  [key: string]: string | number | undefined;
}

const MarketOracle = () => {
  const [activeMarket, setActiveMarket] = useState<'NBA_FINALS_ARB' | 'ETH_SPREAD'>('NBA_FINALS_ARB');
  const [chartData, setChartData] = useState<MarketDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Realistic mock data simulating the divergence of odds across books over a 2-hour window
  const marketData: Record<'NBA_FINALS_ARB' | 'ETH_SPREAD', MarketDataPoint[]> = {
    NBA_FINALS_ARB: [
      { time: '09:00', DraftKings: 140, FanDuel: -145, ev: 0.1 },
      { time: '09:15', DraftKings: 142, FanDuel: -145, ev: 0.2 },
      { time: '09:30', DraftKings: 145, FanDuel: -142, ev: 0.4 },
      { time: '09:45', DraftKings: 150, FanDuel: -140, ev: 0.8 },
      { time: '10:00', DraftKings: 155, FanDuel: -140, ev: 1.1 },
      { time: '10:15', DraftKings: 165, FanDuel: -140, ev: 1.5 },
      { time: '10:30', DraftKings: 175, FanDuel: -142, ev: 1.8 }, // Swarm detection peak
      { time: '10:45', DraftKings: 160, FanDuel: -145, ev: 0.9 }, // Market corrects
    ],
    ETH_SPREAD: [
      { time: '09:00', Binance: 3400, Coinbase: 3402, ev: 0.05 },
      { time: '09:15', Binance: 3410, Coinbase: 3415, ev: 0.15 },
      { time: '09:30', Binance: 3425, Coinbase: 3440, ev: 0.45 },
      { time: '09:45', Binance: 3390, Coinbase: 3420, ev: 0.85 },
      { time: '10:00', Binance: 3350, Coinbase: 3400, ev: 1.45 },
      { time: '10:15', Binance: 3340, Coinbase: 3380, ev: 1.15 },
      { time: '10:30', Binance: 3360, Coinbase: 3370, ev: 0.30 },
      { time: '10:45', Binance: 3365, Coinbase: 3366, ev: 0.02 },
    ]
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate network delay for fetching historical market data
    const timer = setTimeout(() => {
      setChartData(marketData[activeMarket]);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeMarket]);

  // Custom Tooltip to match the cyberpunk UI
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] font-mono z-50">
          <p className="text-slate-400 text-xs mb-2 border-b border-slate-800 pb-1">{label} (T-Zero)</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center gap-4 my-1 text-sm">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="text-white font-bold">
                {entry.name === 'ev' ? '+' : ''}{entry.value}{entry.name === 'ev' ? '%' : ''}
              </span>
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
          <ChartIcon className="text-yellow-400 w-6 h-6" />
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">MarketOracle</h2>
        </div>
        <div className="flex items-center gap-2">
          <Activity className={`w-5 h-5 ${isLoading ? 'text-yellow-400 animate-pulse' : 'text-slate-500'}`} />
          <span className="text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
            {isLoading ? 'SYNCING...' : 'LIVE'}
          </span>
        </div>
      </div>

      {/* Market Selector */}
      <div className="flex gap-3 mb-6">
        <button 
          onClick={() => setActiveMarket('NBA_FINALS_ARB')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border flex items-center ${
            activeMarket === 'NBA_FINALS_ARB' 
              ? 'bg-slate-800 border-yellow-400/50 text-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.15)]' 
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
          }`}
        >
          <Crosshair className="w-3 h-3 mr-2" />
          NBA FINALS ARB
        </button>
        <button 
          onClick={() => setActiveMarket('ETH_SPREAD')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border flex items-center ${
            activeMarket === 'ETH_SPREAD' 
              ? 'bg-slate-800 border-purple-400/50 text-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.15)]' 
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
          }`}
        >
          <TrendingUp className="w-3 h-3 mr-2" />
          ETH/USDT SPREAD
        </button>
      </div>

      {/* Chart Container */}
      <div className="flex-1 w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 relative min-h-[300px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-yellow-400/50 flex flex-col items-center gap-2">
              <Activity className="w-8 h-8 animate-pulse" />
              <span className="text-xs tracking-widest">AGGREGATING DATA...</span>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#475569" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="left"
                stroke="#475569" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                domain={['auto', 'auto']}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#eab308" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Highlight the 1.5% EV threshold where the swarm triggers */}
              <ReferenceLine y={1.5} yAxisId="right" stroke="#ef4444" strokeDasharray="3 3" opacity={0.5} />

              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey={activeMarket === 'NBA_FINALS_ARB' ? 'DraftKings' : 'Binance'} 
                stroke="#2dd4bf" 
                strokeWidth={2}
                dot={{ fill: '#0f172a', stroke: '#2dd4bf', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#2dd4bf', stroke: '#0f172a' }}
                name={activeMarket === 'NBA_FINALS_ARB' ? 'DraftKings' : 'Binance'}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey={activeMarket === 'NBA_FINALS_ARB' ? 'FanDuel' : 'Coinbase'} 
                stroke="#818cf8" 
                strokeWidth={2}
                dot={{ fill: '#0f172a', stroke: '#818cf8', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#818cf8', stroke: '#0f172a' }}
                name={activeMarket === 'NBA_FINALS_ARB' ? 'FanDuel' : 'Coinbase'}
              />
              <Line 
                yAxisId="right"
                type="stepAfter" 
                dataKey="ev" 
                stroke="#eab308" 
                strokeWidth={2}
                dot={false}
                opacity={0.8}
                name="ev"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend / Metrics Footer */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-center">
          <div className="text-[10px] text-slate-500 mb-1">DATA STREAM 1</div>
          <div className="text-teal-400 font-bold text-sm">
            {activeMarket === 'NBA_FINALS_ARB' ? 'DraftKings' : 'Binance'}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-center">
          <div className="text-[10px] text-slate-500 mb-1">DATA STREAM 2</div>
          <div className="text-indigo-400 font-bold text-sm">
            {activeMarket === 'NBA_FINALS_ARB' ? 'FanDuel' : 'Coinbase'}
          </div>
        </div>
        <div className="bg-slate-900 border border-yellow-400/20 rounded-lg p-3 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-400/5 animate-pulse"></div>
          <div className="text-[10px] text-yellow-500/70 mb-1 relative z-10">CALCULATED EV</div>
          <div className="text-yellow-400 font-bold text-sm relative z-10">% YIELD</div>
        </div>
      </div>
    </div>
  );
};

export default MarketOracle;
