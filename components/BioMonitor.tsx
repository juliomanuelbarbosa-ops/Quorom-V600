import React from 'react';
import { Heart, Zap, Thermometer, Activity, Link as LinkIcon, RefreshCcw } from 'lucide-react';
import useQuorumStore from './useQuorumStore';

const BioMonitor = () => {
  const { healthData, syncHealthData } = useQuorumStore();
  const [isSyncing, setIsSyncing] = React.useState(false);

  const handleConnect = async () => {
    setIsSyncing(true);
    // Simulate OAuth flow
    await new Promise(r => setTimeout(r, 1500));
    syncHealthData({
      steps: 8432,
      heartRate: 68
    });
    setIsSyncing(false);
  };

  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col h-full font-mono relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2">
        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
      </div>

      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Activity className="text-emerald-400 w-6 h-6" />
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">BioMonitor</h2>
        </div>
        <div className="flex items-center gap-2">
          {healthData ? (
            <button onClick={handleConnect} className="text-slate-500 hover:text-emerald-400 transition-colors">
              <RefreshCcw size={14} className={isSyncing ? 'animate-spin' : ''} />
            </button>
          ) : (
            <button 
              onClick={handleConnect}
              className="flex items-center gap-2 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[8px] font-black text-emerald-400 uppercase tracking-widest hover:bg-emerald-500/20 transition-all"
            >
              <LinkIcon size={10} />
              Connect
            </button>
          )}
          <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">STABLE</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-center items-center group hover:border-red-500/30 transition-all">
          <Heart className={`w-8 h-8 text-red-500 mb-2 ${healthData ? 'animate-pulse' : 'opacity-30'}`} />
          <div className="text-2xl font-bold text-white">{healthData?.heartRate || '--'}</div>
          <div className="text-[10px] text-slate-500 uppercase">BPM</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-center items-center group hover:border-cyan-500/30 transition-all">
          <Zap className="text-yellow-400 w-8 h-8 mb-2" />
          <div className="text-2xl font-bold text-white">{healthData ? '98%' : '--'}</div>
          <div className="text-[10px] text-slate-500 uppercase">Neural Sync</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-center items-center group hover:border-blue-500/30 transition-all">
          <Thermometer className="text-blue-400 w-8 h-8 mb-2" />
          <div className="text-2xl font-bold text-white">36.6°C</div>
          <div className="text-[10px] text-slate-500 uppercase">Core Temp</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-center items-center group hover:border-purple-500/30 transition-all">
          <Activity className="text-purple-400 w-8 h-8 mb-2" />
          <div className="text-2xl font-bold text-white">{healthData?.steps || '--'}</div>
          <div className="text-[10px] text-slate-500 uppercase">Daily Steps</div>
        </div>
      </div>

      {healthData && (
        <div className="mt-4 text-[8px] text-slate-600 uppercase tracking-widest text-center">
          Last Sync: {new Date(healthData.lastSync).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default BioMonitor;
