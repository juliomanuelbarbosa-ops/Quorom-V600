
import React, { useState } from 'react';
import { Search, Github, Star, GitBranch, Terminal } from 'lucide-react';

interface Repo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
}

const GithubExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);

  const mockSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setResults([
        { name: "the-quorum-core", description: "The decentralized OS substrate", stars: 12450, forks: 890, language: "TypeScript" },
        { name: "sovereign-node-p2p", description: "Secure peer-to-peer networking", stars: 8320, forks: 420, language: "Rust" },
        { name: "quantum-crypt-lib", description: "Post-quantum cryptographic primitives", stars: 4120, forks: 150, language: "C++" },
        { name: "grok-agent-orch", description: "AI agent coordination layer", stars: 15600, forks: 2300, language: "Python" }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">GIT EXPLORER</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Global Repository Scrutiny</p>
        </div>
        <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border border-cyan-500/20">
          <Github className="text-cyan-400" />
        </div>
      </div>

      <div className="flex space-x-2">
        <div className="relative flex-1">
          <input 
            type="text"
            placeholder="ENTER REPOSITORY IDENTIFIER OR KEYWORD..."
            className="w-full bg-slate-900 border border-cyan-500/20 rounded p-4 pl-4 text-cyan-400 placeholder-cyan-900 focus:outline-none focus:border-cyan-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button 
          onClick={mockSearch}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 rounded font-black text-xs tracking-widest transition-all"
        >
          SEARCH
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <Terminal className="animate-spin text-cyan-500" />
          </div>
        ) : results.length > 0 ? (
          results.map((repo, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-xl border border-cyan-500/10 hover:bg-slate-900/40 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-cyan-400">{repo.name}</h3>
                <div className="flex space-x-4">
                   <div className="flex items-center space-x-1 text-[10px] text-cyan-800">
                      <Star size={12} />
                      <span>{repo.stars.toLocaleString()}</span>
                   </div>
                   <div className="flex items-center space-x-1 text-[10px] text-cyan-800">
                      <GitBranch size={12} />
                      <span>{repo.forks.toLocaleString()}</span>
                   </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-4">{repo.description}</p>
              <div className="flex items-center space-x-3">
                 <span className="text-[10px] font-bold text-cyan-900 uppercase tracking-widest bg-cyan-900/10 px-2 py-0.5 rounded">
                   {repo.language}
                 </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 text-cyan-900/50 border-2 border-dashed border-cyan-900/20 rounded-2xl">
            <p className="text-xs uppercase tracking-[0.4em]">Initialize search to scan global dev mesh</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubExplorer;
