
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Maximize2 } from 'lucide-react';

const MusicWiz: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [trackName] = useState("NEON_NIGHTS_2077.MP3");

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 text-slate-950 hover:bg-cyan-400 transition-all"
          >
            <Music size={20} className={isPlaying ? 'animate-bounce' : ''} />
          </motion.button>
        ) : (
          <motion.div
            initial={{ width: 0, opacity: 0, x: -20 }}
            animate={{ width: 320, opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -20 }}
            className="glass-panel rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl"
          >
            <div className="p-4 flex items-center justify-between border-b border-cyan-500/10 bg-slate-900/50">
               <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Audio Substrate</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-cyan-900 hover:text-cyan-400">
                 <Maximize2 size={14} />
               </button>
            </div>
            
            <div className="p-6 space-y-6">
               <div className="text-center">
                  <div className="text-[10px] text-cyan-800 font-bold uppercase tracking-widest mb-1">Now Transmitting</div>
                  <div className="text-xs font-black text-slate-100 truncate uppercase tracking-tighter">{trackName}</div>
               </div>

               {/* Waveform Visualizer simulation */}
               <div className="flex items-end justify-center space-x-1 h-12">
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={isPlaying ? { height: [4, 24, 8, 20, 4] } : { height: 4 }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                      className="w-1.5 bg-cyan-500/50 rounded-t-full"
                    />
                  ))}
               </div>

               <div className="flex items-center justify-center space-x-6">
                  <button className="text-cyan-900 hover:text-cyan-400"><SkipBack size={20} /></button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-slate-950 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                  </button>
                  <button className="text-cyan-900 hover:text-cyan-400"><SkipForward size={20} /></button>
               </div>

               <div className="flex items-center space-x-3">
                  <Volume2 size={14} className="text-cyan-900" />
                  <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-cyan-500 w-3/4" />
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicWiz;
