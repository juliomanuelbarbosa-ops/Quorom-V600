import React, { useState, useEffect } from 'react';
import { 
  Radio, Play, Pause, SkipForward, SkipBack, 
  Volume2, Activity, Disc3, Headphones 
} from 'lucide-react';

const NeuralRadio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChannel, setActiveChannel] = useState(0);
  const [progress, setProgress] = useState(34); // Mock percentage
  const [visualizerData, setVisualizerData] = useState(Array(16).fill(10));

  // Mock audio channels fitting the cyberpunk theme
  const channels = [
    { id: 'CH-01', name: 'Mempool Lo-Fi', frequency: '104.2 MHz', duration: '4:20' },
    { id: 'CH-02', name: 'Sector 7 Ambience', frequency: '88.1 MHz', duration: 'Live' },
    { id: 'CH-03', name: 'Neural Net Sync', frequency: '92.5 MHz', duration: '12:45' },
    { id: 'CH-04', name: 'Encrypted Comms (Node B)', frequency: '144.0 MHz', duration: 'Unknown' }
  ];

  // Simulate audio visualizer bars when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setVisualizerData(prev => 
          prev.map(() => Math.floor(Math.random() * 80) + 10)
        );
      }, 150);
    } else {
      // Return bars to baseline when paused
      setVisualizerData(Array(16).fill(10));
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Simulate track progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && channels[activeChannel].duration !== 'Live' && channels[activeChannel].duration !== 'Unknown') {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeChannel]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextChannel = () => {
    setActiveChannel((prev) => (prev + 1) % channels.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const prevChannel = () => {
    setActiveChannel((prev) => (prev === 0 ? channels.length - 1 : prev - 1));
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col h-full font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Radio className="text-cyan-400 w-6 h-6" />
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">NeuralRadio // Comms</h2>
        </div>
        <div className="flex items-center gap-2">
          <Activity className={`w-5 h-5 ${isPlaying ? 'text-cyan-400 animate-pulse' : 'text-slate-600'}`} />
          <span className="text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
            {isPlaying ? 'STREAM ACTIVE' : 'STANDBY'}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 pr-2 overflow-y-auto custom-scrollbar">
        
        {/* Left Side: Player Controls & Visualizer */}
        <div className="flex-1 flex flex-col justify-between bg-slate-900/50 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-cyan-900/20 blur-3xl rounded-full pointer-events-none"></div>

          {/* Track Info */}
          <div className="relative z-10 flex items-start gap-4 mb-6">
            <div className={`w-16 h-16 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-700 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
              <Disc3 className={`w-8 h-8 ${isPlaying ? 'text-cyan-400' : 'text-slate-500'}`} />
            </div>
            <div>
              <div className="text-xs text-cyan-400 mb-1 tracking-widest uppercase">{channels[activeChannel].id}</div>
              <div className="text-lg text-white font-bold">{channels[activeChannel].name}</div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <Headphones className="w-3 h-3" />
                FREQUENCY: {channels[activeChannel].frequency}
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="h-16 flex items-end justify-between gap-1 mb-6 relative z-10">
            {visualizerData.map((height, i) => (
              <div 
                key={i}
                className="w-full bg-cyan-400/80 rounded-t-sm transition-all duration-150 ease-out"
                style={{ height: `${height}%`, opacity: height > 20 ? 1 : 0.3 }}
              ></div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mb-6 relative z-10">
            <div className="flex justify-between text-[10px] text-slate-400 mb-2">
              <span>{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
              <span>{channels[activeChannel].duration}</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-400 transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 text-slate-500">
              <Volume2 className="w-4 h-4" />
              <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-slate-400"></div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button onClick={prevChannel} className="text-slate-400 hover:text-white transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button 
                onClick={togglePlay}
                className="w-12 h-12 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/50 rounded-full text-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
              </button>
              <button onClick={nextChannel} className="text-slate-400 hover:text-white transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Channel Directory */}
        <div className="w-full md:w-64 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col">
          <div className="text-xs text-slate-500 mb-4 tracking-widest uppercase border-b border-slate-800 pb-2">
            Available Frequencies
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
            {channels.map((channel, idx) => (
              <button
                key={channel.id}
                onClick={() => {
                  setActiveChannel(idx);
                  setProgress(0);
                  setIsPlaying(true);
                }}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  activeChannel === idx 
                    ? 'bg-slate-800 border-cyan-500/30 shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]' 
                    : 'bg-slate-950 border-transparent hover:border-slate-800 hover:bg-slate-800/50'
                }`}
              >
                <div className={`text-xs font-bold mb-1 ${activeChannel === idx ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {channel.id}
                </div>
                <div className="text-sm text-slate-200 truncate">{channel.name}</div>
              </button>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default NeuralRadio;
