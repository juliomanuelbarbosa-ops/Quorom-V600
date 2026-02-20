import React, { useState } from 'react';
import { LayoutGrid, Cpu, Code2, LineChart, Globe, Maximize } from 'lucide-react';

// Core Components
// import LiveSpacesBanner from './LiveSpacesBanner';
// import NeuralRadio from './NeuralRadio';
// import MarketOracle from './MarketOracle';
// import MissionLog from './MissionLog';
// import CodeNexus from './CodeNexus';
// import BioMonitor from './BioMonitor';
// import SkillMatrix from './SkillMatrix';
// import BookHub from './BookHub';

// Tactical Modules
import GeoSentinel from './GeoSentinel';
import SignalNexus from './SignalNexus';

const HomeDashboard = () => {
  const [activeLayout, setActiveLayout] = useState('OSINT'); // Defaulting to the new view

  const layouts = [
    { id: 'OVERVIEW', name: 'System Overview', icon: <LayoutGrid size={14} /> },
    { id: 'DEV_MODE', name: 'Dev Nexus', icon: <Code2 size={14} /> },
    { id: 'FINANCE', name: 'Market Watch', icon: <LineChart size={14} /> },
    { id: 'OSINT', name: 'Tactical Command', icon: <Globe size={14} /> }, // New Layout Tab
  ];

  return (
    <div className="h-full w-full flex flex-col space-y-4 p-2 md:p-4 overflow-y-auto custom-scrollbar">
      
      {/* Top Telemetry & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/80 p-3 border border-slate-800 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <Cpu className="text-emerald-500 animate-pulse" size={20} />
          <h1 className="text-white font-bold tracking-widest uppercase text-sm">
            Quorum_Orchestrator_v600
          </h1>
        </div>
        
        {/* Layout Switcher */}
        <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {layouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => setActiveLayout(layout.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase transition-all ${
                activeLayout === layout.id
                  ? 'bg-slate-800 text-white shadow-[0_0_10px_rgba(30,41,59,0.8)]'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              {layout.icon}
              <span className="hidden sm:inline">{layout.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* The Master CSS Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]">
        
        {/* ROW 1: Banners and Audio (Always top, persistent across layouts) */}
        <div className="xl:col-span-8 bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm shadow-lg">
          {/* <LiveSpacesBanner /> */}
          <div className="h-[180px] flex items-center justify-center text-slate-600 font-mono text-xs">LiveSpacesBanner Mount Point</div>
        </div>
        <div className="xl:col-span-4 bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm shadow-lg">
          {/* <NeuralRadio /> */}
          <div className="h-[180px] flex items-center justify-center text-slate-600 font-mono text-xs">NeuralRadio Mount Point</div>
        </div>

        {/* --- TACTICAL COMMAND LAYOUT (OSINT) --- */}
        {activeLayout === 'OSINT' && (
          <>
            {/* GeoSentinel: Global Tracking (Takes up 2/3 of the width, spans tall) */}
            <div className="xl:col-span-8 xl:row-span-3 bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm shadow-lg min-h-[600px] relative group">
              <button className="absolute top-3 right-3 p-1.5 bg-slate-900/80 border border-amber-500/30 rounded text-amber-500/50 opacity-0 group-hover:opacity-100 transition-opacity hover:text-amber-400 hover:border-amber-400 z-50 backdrop-blur-md">
                <Maximize size={12} />
              </button>
              <GeoSentinel />
            </div>

            {/* Right Sidebar Stack */}
            {/* SignalNexus: Local Wi-Fi Topology */}
            <div className="xl:col-span-4 xl:row-span-2 bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm shadow-lg min-h-[400px]">
              <SignalNexus />
            </div>

            {/* Mission Log / Terminal: System events and LLM parsing output */}
            <div className="xl:col-span-4 xl:row-span-1 bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm shadow-lg min-h-[180px]">
              {/* <MissionLog /> */}
              <div className="h-full flex flex-col items-center justify-center text-slate-600 font-mono text-xs p-4 text-center border border-dashed border-slate-700 m-2 rounded">
                MissionLog_v2.0 Mount Point
                <span className="text-[9px] text-slate-500 mt-2">Routing achievement data & OSINT alerts</span>
              </div>
            </div>
          </>
        )}

        {/* ... (Keep your OVERVIEW, DEV_MODE, and FINANCE conditions exactly as they were before) ... */}
        {activeLayout === 'OVERVIEW' && (
           <div className="xl:col-span-12 h-[400px] flex items-center justify-center border border-slate-800 rounded-xl text-slate-500 font-mono">
             [SYSTEM OVERVIEW LAYOUT INACTIVE FOR THIS RENDER]
           </div>
        )}
      </div>
    </div>
  );
};

export default HomeDashboard;
