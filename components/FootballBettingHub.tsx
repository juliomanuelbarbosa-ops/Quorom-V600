import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Activity, TrendingUp, DollarSign, 
  BarChart2, RefreshCw, Shield, Globe, 
  Zap, Database, Target, Calendar,
  ChevronRight, ExternalLink, AlertTriangle,
  Search, Filter, ArrowUpRight, ArrowDownRight,
  BrainCircuit
} from 'lucide-react';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  time: string;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  score?: { home: number; away: number };
  odds?: { home: number; draw: number; away: number };
  prediction?: { winner: 'home' | 'away' | 'draw'; confidence: number };
}

const FootballBettingHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'odds' | 'analytics' | 'config'>('live');
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated data fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setMatches([
        {
          id: '1',
          homeTeam: 'Manchester City',
          awayTeam: 'Liverpool',
          league: 'Premier League',
          time: '19:45',
          status: 'LIVE',
          score: { home: 2, away: 1 },
          odds: { home: 2.10, draw: 3.50, away: 3.20 },
          prediction: { winner: 'home', confidence: 78 }
        },
        {
          id: '2',
          homeTeam: 'Real Madrid',
          awayTeam: 'Barcelona',
          league: 'La Liga',
          time: '20:00',
          status: 'UPCOMING',
          odds: { home: 2.40, draw: 3.40, away: 2.80 },
          prediction: { winner: 'draw', confidence: 45 }
        },
        {
          id: '3',
          homeTeam: 'Bayern Munich',
          awayTeam: 'Dortmund',
          league: 'Bundesliga',
          time: '14:30',
          status: 'FINISHED',
          score: { home: 3, away: 1 },
          odds: { home: 1.80, draw: 4.00, away: 4.50 }
        },
        {
          id: '4',
          homeTeam: 'PSG',
          awayTeam: 'Marseille',
          league: 'Ligue 1',
          time: '21:00',
          status: 'UPCOMING',
          odds: { home: 1.60, draw: 4.20, away: 5.50 },
          prediction: { winner: 'home', confidence: 82 }
        },
        {
          id: '5',
          homeTeam: 'Juventus',
          awayTeam: 'AC Milan',
          league: 'Serie A',
          time: '18:00',
          status: 'UPCOMING',
          odds: { home: 2.20, draw: 3.10, away: 3.40 },
          prediction: { winner: 'away', confidence: 55 }
        }
      ]);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const integrations = [
    {
      name: 'API-Sports',
      status: 'CONNECTED',
      ping: '14ms',
      type: 'Live Data',
      icon: <Activity size={16} />,
      color: 'text-green-400',
      desc: 'Real-time scores & fixtures'
    },
    {
      name: 'TheSportsDB',
      status: 'SYNCED',
      ping: '42ms',
      type: 'Metadata',
      icon: <Database size={16} />,
      color: 'text-blue-400',
      desc: 'Team artwork & badges'
    },
    {
      name: 'The Odds API',
      status: 'ACTIVE',
      ping: '89ms',
      type: 'Betting',
      icon: <DollarSign size={16} />,
      color: 'text-yellow-400',
      desc: 'Global bookmaker odds'
    },
    {
      name: 'Sportsipy',
      status: 'OFFLINE',
      ping: '--',
      type: 'Analytics',
      icon: <BarChart2 size={16} />,
      color: 'text-red-400',
      desc: 'Python ML pipeline'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Trophy size={36} className="text-cyan-500" />
            FOOTBALL NEXUS
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Predictive Betting & Analytics Hub / v2.4.0
          </p>
        </div>
        <div className="flex gap-2">
          {integrations.map((int) => (
            <div key={int.name} className="px-3 py-1 bg-slate-900/50 border border-cyan-500/20 rounded flex items-center gap-2" title={int.desc}>
              <div className={`w-1.5 h-1.5 rounded-full ${int.status === 'OFFLINE' ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
              <span className="text-[9px] font-bold text-cyan-700 uppercase">{int.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 p-1 bg-slate-900/50 rounded-xl border border-cyan-500/10 w-fit">
        {[
          { id: 'live', label: 'Live Feed', icon: <Activity size={14} /> },
          { id: 'odds', label: 'Market Odds', icon: <DollarSign size={14} /> },
          { id: 'analytics', label: 'ML Models', icon: <BrainCircuit size={14} /> }, // Changed from BarChart2 to BrainCircuit for consistency if available, but BrainCircuit is not imported. Let's check imports.
          { id: 'config', label: 'Data Sources', icon: <Database size={14} /> }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeTab === tab.id ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'text-cyan-900 hover:text-cyan-400'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'live' && (
          <motion.div 
            key="live"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Live Matches Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-black text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                  <Activity size={14} /> Live Action
                </h3>
                <span className="text-[9px] text-cyan-800 font-mono animate-pulse">UPDATING LIVE FEED...</span>
              </div>
              
              {isLoading ? (
                <div className="h-64 flex items-center justify-center border border-cyan-500/10 rounded-2xl bg-slate-900/40">
                  <RefreshCw className="animate-spin text-cyan-500" />
                </div>
              ) : (
                matches.map(match => (
                  <div key={match.id} className="glass-panel p-4 rounded-xl border border-cyan-500/10 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
                    {match.status === 'LIVE' && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[9px] font-bold text-cyan-700 uppercase tracking-wider bg-cyan-900/10 px-2 py-0.5 rounded">
                            {match.league}
                          </span>
                          <span className={`text-[9px] font-black uppercase tracking-widest ${
                            match.status === 'LIVE' ? 'text-green-500 animate-pulse' : 'text-slate-500'
                          }`}>
                            {match.status === 'LIVE' ? `${match.time} • LIVE` : match.time}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-8">
                          <div className="flex items-center gap-3 flex-1 justify-end">
                            <span className="text-sm font-bold text-slate-200 uppercase">{match.homeTeam}</span>
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-cyan-500/20 flex items-center justify-center text-[10px] font-black text-cyan-700">
                              {match.homeTeam.substring(0, 2).toUpperCase()}
                            </div>
                          </div>

                          <div className="px-4 py-1 bg-slate-950 rounded border border-cyan-500/20 font-mono text-xl font-black text-cyan-400">
                            {match.score ? `${match.score.home} - ${match.score.away}` : 'VS'}
                          </div>

                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-cyan-500/20 flex items-center justify-center text-[10px] font-black text-cyan-700">
                              {match.awayTeam.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="text-sm font-bold text-slate-200 uppercase">{match.awayTeam}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Odds */}
                    <div className="mt-4 pt-4 border-t border-cyan-500/10 grid grid-cols-3 gap-2">
                      <button className="py-1.5 bg-slate-900/50 hover:bg-cyan-500/10 border border-cyan-500/10 rounded text-center transition-colors group/btn">
                        <div className="text-[8px] text-cyan-800 uppercase font-bold">Home</div>
                        <div className="text-xs font-mono text-cyan-400 group-hover/btn:text-cyan-300">{match.odds?.home.toFixed(2)}</div>
                      </button>
                      <button className="py-1.5 bg-slate-900/50 hover:bg-cyan-500/10 border border-cyan-500/10 rounded text-center transition-colors group/btn">
                        <div className="text-[8px] text-cyan-800 uppercase font-bold">Draw</div>
                        <div className="text-xs font-mono text-cyan-400 group-hover/btn:text-cyan-300">{match.odds?.draw.toFixed(2)}</div>
                      </button>
                      <button className="py-1.5 bg-slate-900/50 hover:bg-cyan-500/10 border border-cyan-500/10 rounded text-center transition-colors group/btn">
                        <div className="text-[8px] text-cyan-800 uppercase font-bold">Away</div>
                        <div className="text-xs font-mono text-cyan-400 group-hover/btn:text-cyan-300">{match.odds?.away.toFixed(2)}</div>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border border-cyan-500/10 bg-slate-900/40">
                <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Zap size={14} /> Market Trends
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] font-bold text-green-400 uppercase">High Confidence</span>
                      <ArrowUpRight size={12} className="text-green-500" />
                    </div>
                    <div className="text-xs font-bold text-slate-200">Man City to Win</div>
                    <div className="text-[9px] text-cyan-700 mt-1">Vol: $1.2M • 89% Buy</div>
                  </div>
                  <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] font-bold text-red-400 uppercase">Odds Drifting</span>
                      <ArrowDownRight size={12} className="text-red-500" />
                    </div>
                    <div className="text-xs font-bold text-slate-200">Barcelona Draw</div>
                    <div className="text-[9px] text-cyan-700 mt-1">Vol: $450K • Sharp Action</div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-cyan-500/10 bg-slate-900/40">
                <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Target size={14} /> AI Predictions
                </h3>
                <div className="space-y-3">
                  {matches.slice(0, 3).map(match => (
                    <div key={match.id} className="flex items-center justify-between p-2 border-b border-cyan-500/10 last:border-0">
                      <div className="text-[9px] font-bold text-slate-400 uppercase">{match.homeTeam} vs {match.awayTeam}</div>
                      <div className={`text-[9px] font-black px-2 py-0.5 rounded ${
                        match.prediction?.confidence && match.prediction.confidence > 70 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {match.prediction?.confidence}% {match.prediction?.winner.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'config' && (
          <motion.div 
            key="config"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {integrations.map((int) => (
              <div key={int.name} className="glass-panel p-6 rounded-2xl border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-slate-950 border border-cyan-500/10 ${int.color}`}>
                    {int.icon}
                  </div>
                  <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${
                    int.status === 'OFFLINE' 
                      ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                      : 'bg-green-500/10 border-green-500/20 text-green-500'
                  }`}>
                    {int.status}
                  </div>
                </div>
                <h3 className="text-lg font-black text-slate-100 uppercase mb-1">{int.name}</h3>
                <p className="text-xs text-cyan-800 font-bold uppercase tracking-wider mb-6">{int.desc}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-[9px] font-mono text-cyan-600 uppercase">
                    <span>Latency</span>
                    <span>{int.ping}</span>
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-cyan-600 uppercase">
                    <span>API Quota</span>
                    <span>{int.name === 'The Odds API' ? '420/500' : 'Unlimited'}</span>
                  </div>
                  <button className="w-full py-2 mt-2 bg-slate-900 border border-cyan-500/20 rounded text-[9px] font-black text-cyan-400 uppercase hover:bg-cyan-500 hover:text-slate-950 transition-all">
                    Configure Keys
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
        
        {/* Placeholder for other tabs */}
        {(activeTab === 'odds' || activeTab === 'analytics') && (
          <motion.div 
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-96 flex flex-col items-center justify-center border border-dashed border-cyan-500/20 rounded-3xl bg-slate-900/20"
          >
            <AlertTriangle className="text-cyan-500 mb-4" size={48} />
            <h3 className="text-xl font-black text-cyan-400 uppercase tracking-widest">Module Under Construction</h3>
            <p className="text-cyan-800 text-xs uppercase tracking-widest mt-2">Connect Sportsipy Pipeline to enable ML Analytics</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FootballBettingHub;
