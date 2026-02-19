
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, BookOpen, ChevronRight, Binary, Cpu, Layout, Database } from 'lucide-react';

interface Topic {
  title: string;
  items: string[];
}

const STUDY_PLAN: Topic[] = [
  { title: "Computer Science Fundamentals", items: ["Algorithm Analysis (Big-O)", "Memory Management", "Bitwise Operations", "Operating Systems", "Networking Stack"] },
  { title: "Data Structures", items: ["Arrays & Dynamic Arrays", "Linked Lists", "Stacks & Queues", "Hash Tables", "Binary Search Trees", "Heaps / Priority Queues", "Graphs & Representations"] },
  { title: "Algorithms", items: ["Sorting (Merge, Quick, Heap)", "Binary Search", "Tree Traversals (BFS, DFS)", "Shortest Path (Dijkstra)", "Dynamic Programming", "Recursion & Backtracking"] },
  { title: "Systems & Scalability", items: ["Load Balancing", "Caching Strategy", "Sharding & Replication", "CAP Theorem", "Microservices Architecture"] }
];

const CodingInterviewUniversity: React.FC = () => {
  const [completed, setCompleted] = useState<string[]>([]);

  const toggleItem = (item: string) => {
    setCompleted(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const totalItems = STUDY_PLAN.reduce((acc, curr) => acc + curr.items.length, 0);
  const progress = (completed.length / totalItems) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">INTERVIEW UNIVERSITY</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Sovereign Engineer Study Path</p>
        </div>
        <div className="text-right">
           <div className="text-[8px] text-cyan-900 font-bold uppercase mb-1">Neural Integration</div>
           <div className="text-lg font-black text-cyan-500">{Math.round(progress)}% COMPLETE</div>
        </div>
      </div>

      <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/10">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STUDY_PLAN.map((topic, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-xl border border-cyan-500/10 flex flex-col">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-6 border-l-2 border-cyan-500 pl-3">
              {topic.title}
            </h3>
            
            <div className="space-y-3 flex-1">
              {topic.items.map((item, i) => (
                <button 
                  key={i}
                  onClick={() => toggleItem(item)}
                  className={`w-full flex items-center space-x-3 p-2 rounded transition-all group ${
                    completed.includes(item) ? 'bg-cyan-500/5 text-cyan-500' : 'hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    completed.includes(item) ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-cyan-900/50 group-hover:border-cyan-500'
                  }`}>
                    {completed.includes(item) && <ChevronRight size={12} className="rotate-90" />}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-left">{item}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-900/40 border border-cyan-500/10 rounded-xl flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
               <BookOpen size={24} className="text-cyan-500" />
            </div>
            <div>
               <div className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">Master Study Plan Loaded</div>
               <div className="text-[8px] text-cyan-900 font-bold uppercase tracking-widest">Sourced from jwasham/coding-interview-university</div>
            </div>
         </div>
         <button className="bg-slate-800 hover:bg-slate-700 text-cyan-400 px-6 py-2 rounded text-[10px] font-black tracking-widest uppercase transition-all border border-cyan-500/10">
            Export Progress
         </button>
      </div>
    </div>
  );
};

export default CodingInterviewUniversity;
