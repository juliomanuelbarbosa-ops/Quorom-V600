import React from 'react';
import { motion } from 'framer-motion';
import { Code, Book, CheckCircle, ExternalLink, Activity } from 'lucide-react';

const FreeCodeCampHub: React.FC = () => {
  const certifications = [
    { title: "Responsive Web Design", status: "100%", active: true },
    { title: "JavaScript Algorithms", status: "84%", active: true },
    { title: "Front End Libraries", status: "0%", active: false },
    { title: "Data Visualization", status: "0%", active: false },
    { title: "Scientific Computing with Python", status: "0%", active: false }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">FCC PROGRESS</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Global Curriculum Sync</p>
        </div>
        <div className="flex space-x-2">
           <a href="https://www.freecodecamp.org" target="_blank" rel="noopener noreferrer" className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded text-cyan-400 hover:bg-cyan-500/20 transition-all">
             <ExternalLink size={16} />
           </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 space-y-6">
           <h3 className="text-xs font-black text-cyan-600 uppercase tracking-widest flex items-center space-x-2">
             <Book size={14} /> <span>Curriculum Matrix</span>
           </h3>
           <div className="space-y-4">
             {certifications.map((cert, idx) => (
               <div key={idx} className={`p-4 rounded-lg border flex items-center justify-between transition-all ${
                 cert.active ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-slate-900 border-slate-800 opacity-50'
               }`}>
                 <div>
                    <div className="text-xs font-bold text-slate-100 uppercase tracking-wider">{cert.title}</div>
                    <div className="text-[8px] text-cyan-800 font-black uppercase mt-1">Integration: {cert.status}</div>
                 </div>
                 {cert.status === "100%" ? <CheckCircle className="text-green-500" size={16} /> : <div className="w-1.5 h-1.5 rounded-full bg-cyan-800" />}
               </div>
             ))}
           </div>
        </div>

        <div className="space-y-6">
           <div className="glass-panel p-8 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 flex flex-col items-center justify-center text-center space-y-6 h-full">
              <Code size={64} className="text-cyan-900/30" />
              <div className="space-y-2">
                 <h3 className="text-lg font-black text-cyan-400 uppercase tracking-widest">Neural Learning Mesh</h3>
                 <p className="text-xs text-slate-500">Synchronize your local profile with the global freeCodeCamp database to map your neural knowledge growth.</p>
              </div>
              <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 rounded font-black text-[10px] tracking-[0.3em] transition-all uppercase">
                Synchronize Profile
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FreeCodeCampHub;