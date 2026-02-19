import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TerminalSquare, Play, RefreshCcw, Cpu, Binary } from 'lucide-react';

const INITIAL_CODE = `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

data = [42, 12, 89, 23, 11, 45, 77, 1]
print(f"INPUT: {data}")
print(f"OUTPUT: {quicksort(data)}")`;

const PythonAlgorithmsVisualizer: React.FC = () => {
  const [code, setCode] = useState(INITIAL_CODE);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput('> Initializing Pyodide Environment...\n> Allocating Local Memory Substrate...\n> Executing Sovereign Python Runtime...');
    
    setTimeout(() => {
      setOutput(`INPUT: [42, 12, 89, 23, 11, 45, 77, 1]\nOUTPUT: [1, 11, 12, 23, 42, 45, 77, 89]\n\nPROCESS_FINISHED_WITH_EXIT_CODE_0`);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-yellow-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-yellow-500 glow-text tracking-tight uppercase">PYTHON ALGORITHMS</h2>
          <p className="text-yellow-900 text-xs uppercase tracking-[0.2em] mt-1">Sovereign WASM Python Node</p>
        </div>
        <div className="flex space-x-4">
           <button 
             onClick={runCode}
             disabled={isRunning}
             className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-8 py-2 rounded font-black text-xs tracking-widest flex items-center space-x-2 transition-all shadow-lg shadow-yellow-500/20"
           >
             <Play size={16} />
             <span>EXECUTE PROTOCOL</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        <div className="glass-panel rounded-xl border border-yellow-500/20 flex flex-col overflow-hidden bg-slate-950">
          <div className="p-3 border-b border-yellow-500/10 bg-slate-900/50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TerminalSquare size={14} className="text-yellow-600" />
              <span className="text-[10px] font-bold text-yellow-600 tracking-widest uppercase">AlgorithmEngine.py</span>
            </div>
            <div className="flex space-x-1">
               <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
               <span className="text-[8px] font-bold text-yellow-900">PY 3.12</span>
            </div>
          </div>
          <textarea 
            className="flex-1 bg-transparent p-6 font-mono text-xs text-yellow-500/80 focus:outline-none resize-none custom-scrollbar leading-relaxed"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="glass-panel rounded-xl border border-yellow-500/20 flex flex-col overflow-hidden bg-slate-900/40">
          <div className="p-3 border-b border-yellow-500/10 bg-slate-900/50 flex items-center space-x-2">
            <Cpu size={14} className="text-yellow-600" />
            <span className="text-[10px] font-bold text-yellow-600 tracking-widest uppercase">Output Log: PythonNode-01</span>
          </div>
          <div className="flex-1 p-6 font-mono text-xs text-yellow-500 overflow-auto whitespace-pre-wrap leading-relaxed bg-slate-950/50">
            {output || (
              <div className="opacity-10 h-full flex flex-col items-center justify-center space-y-4">
                 <Binary size={48} />
                 <p className="text-[10px] uppercase tracking-widest font-black">Waiting for code execution signal</p>
              </div>
            )}
          </div>
          <div className="p-4 bg-yellow-500/5 border-t border-yellow-500/10 flex items-center justify-between">
             <div className="text-[8px] text-yellow-900 font-black uppercase">MEM: 512MB ALLOCATED</div>
             <div className="text-[8px] text-yellow-900 font-black uppercase">ENV: PYODIDE-WASM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonAlgorithmsVisualizer;