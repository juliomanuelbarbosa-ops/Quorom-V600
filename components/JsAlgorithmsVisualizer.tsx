import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Binary, Play, RefreshCcw, Zap, Activity } from 'lucide-react';

const JsAlgorithmsVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<'bubble' | 'quick'>('bubble');

  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < 30; i++) {
      newArray.push(Math.floor(Math.random() * 90) + 10);
    }
    setArray(newArray);
    setActiveIndices([]);
    setComparingIndices([]);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparingIndices([j, j + 1]);
        await sleep(50);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          setActiveIndices([j, j + 1]);
        }
      }
    }
    setComparingIndices([]);
    setActiveIndices([]);
    setIsSorting(false);
  };

  const quickSort = async (arr: number[], low: number, high: number): Promise<void> => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr: number[], low: number, high: number): Promise<number> => {
    const pivot = arr[high];
    let i = low - 1;
    setComparingIndices([high]);
    for (let j = low; j < high; j++) {
      setComparingIndices([j, high]);
      await sleep(50);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        setActiveIndices([i, j]);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    setActiveIndices([i + 1, high]);
    return i + 1;
  };

  const handleRun = async () => {
    if (algorithm === 'bubble') await bubbleSort();
    else {
      setIsSorting(true);
      await quickSort([...array], 0, array.length - 1);
      setIsSorting(false);
      setComparingIndices([]);
      setActiveIndices([]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">ALGORITHM VISUALIZER</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Binary Sorting Neural Stream</p>
        </div>
        <div className="flex space-x-2">
           <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400 uppercase tracking-widest font-bold">MODE: REAL-TIME</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
           <div className="glass-panel p-6 rounded-xl border border-cyan-500/20 space-y-4">
              <h3 className="text-[10px] font-bold text-cyan-600 tracking-widest uppercase mb-4 flex items-center space-x-2">
                <Activity size={14} /> <span>Control Interface</span>
              </h3>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setAlgorithm('bubble')}
                  className={`w-full text-left p-3 rounded text-[10px] font-bold uppercase tracking-widest border transition-all ${
                    algorithm === 'bubble' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-cyan-500/10 text-slate-500'
                  }`}
                >
                  Bubble Sort Protocol
                </button>
                <button 
                  onClick={() => setAlgorithm('quick')}
                  className={`w-full text-left p-3 rounded text-[10px] font-bold uppercase tracking-widest border transition-all ${
                    algorithm === 'quick' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-cyan-500/10 text-slate-500'
                  }`}
                >
                  Quick Sort Protocol
                </button>
              </div>

              <div className="pt-4 space-y-2">
                <button 
                  onClick={generateArray}
                  disabled={isSorting}
                  className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 py-3 rounded text-[10px] font-black tracking-widest uppercase transition-all border border-cyan-500/10 disabled:opacity-30"
                >
                  <RefreshCcw size={14} />
                  <span>RESET ENTROPY</span>
                </button>
                <button 
                  onClick={handleRun}
                  disabled={isSorting}
                  className="w-full flex items-center justify-center space-x-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3 rounded text-[10px] font-black tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] disabled:opacity-30"
                >
                  <Play size={14} />
                  <span>EXECUTE CORE</span>
                </button>
              </div>
           </div>

           <div className="glass-panel p-4 rounded-xl border border-cyan-500/10 bg-cyan-500/5">
              <div className="text-[9px] text-cyan-800 font-bold uppercase leading-relaxed">
                Visualizing memory re-allocation in O(n log n) or O(n²) space-time complexity based on selected protocol.
              </div>
           </div>
        </div>

        <div className="lg:col-span-3 flex flex-col">
           <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 flex-1 min-h-[400px] flex items-end justify-between space-x-1">
              {array.map((value, idx) => {
                const isComparing = comparingIndices.includes(idx);
                const isActive = activeIndices.includes(idx);
                return (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`w-full rounded-t-sm relative group ${
                      isActive ? 'bg-cyan-400 shadow-[0_0_15px_#06b6d4]' : 
                      isComparing ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : 
                      'bg-slate-800'
                    }`}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-cyan-500 transition-opacity">
                      {value}
                    </div>
                  </motion.div>
                );
              })}
           </div>

           <div className="mt-4 flex justify-between items-center text-[10px] text-cyan-900 font-bold uppercase tracking-widest px-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 shadow-[0_0_5px_#06b6d4]" />
                  <span>Swapping</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-500 shadow-[0_0_5px_#a855f7]" />
                  <span>Comparing</span>
                </div>
              </div>
              <div>Buffer Status: {isSorting ? 'Processing...' : 'Idle'}</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default JsAlgorithmsVisualizer;