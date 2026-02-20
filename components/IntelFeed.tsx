import React, { useState } from 'react';
import { Radio as RadioReceiver, AlertTriangle, TerminalSquare, Filter } from 'lucide-react';

import useQuorumStore, { IntelBrief } from './useQuorumStore';

interface IntelFeedProps {
  briefs?: IntelBrief[];
}

const IntelFeed: React.FC<IntelFeedProps> = ({ briefs: propBriefs }) => {
  const storeBriefs = useQuorumStore((state) => state.intelBriefs);
  const briefs = propBriefs || storeBriefs;
  
  // State to track the currently selected category
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Dynamically extract unique intelligence types from the incoming data stream
  const categories = ['ALL', ...new Set(briefs.map((b) => b.type))];

  // Filter the array based on the active selection before rendering
  const filteredBriefs = activeFilter === 'ALL' 
    ? briefs 
    : briefs.filter((b) => b.type === activeFilter);

  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <RadioReceiver className="text-purple-400 w-6 h-6" />
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">IntelFeed</h2>
        </div>
        <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
          LIVE STREAM
        </span>
      </div>

      {/* Filter Navigation Bar */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <Filter className="w-4 h-4 text-slate-500 shrink-0 mr-2" />
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all border ${
              activeFilter === category
                ? 'bg-slate-800 border-teal-500/50 text-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.2)]'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtered Content Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {filteredBriefs.map((brief) => (
          <div 
            key={brief.id} 
            className="bg-slate-800/50 p-4 rounded-xl border border-slate-800 relative group transition-all hover:bg-slate-800/80"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {brief.severity === 'high' ? (
                  <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                ) : (
                  <TerminalSquare className="w-4 h-4 text-emerald-500" />
                )}
                <span className={`text-xs font-bold font-mono ${brief.severity === 'high' ? 'text-red-500' : 'text-emerald-500'}`}>
                  {brief.type}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">{brief.timestamp}</span>
            </div>
            
            <p className="text-sm text-slate-200 leading-relaxed font-mono">
              {brief.content}
            </p>
          </div>
        ))}
        
        {/* Empty State / No Data Fallback */}
        {filteredBriefs.length === 0 && (
          <div className="text-center text-slate-500 font-mono mt-10 flex flex-col items-center">
            <RadioReceiver className="w-8 h-8 text-slate-700 mb-3 opacity-50" />
            No transmissions detected for this sector.
          </div>
        )}
      </div>
    </div>
  );
};

export default IntelFeed;
