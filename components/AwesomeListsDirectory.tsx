import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, ExternalLink, Bookmark, Zap, Cpu } from 'lucide-react';

interface AwesomeList {
  name: string;
  repo: string;
  stars: string;
  category: string;
  description: string;
}

const AWESOME_DATA: AwesomeList[] = [
  { name: "Awesome AI", repo: "steven-terner/awesome-ai-ml-dl", stars: "12k", category: "AI", description: "A curated list of Artificial Intelligence, Machine Learning, and Deep Learning resources." },
  { name: "Awesome React", repo: "enaqx/awesome-react", stars: "58k", category: "Web", description: "A collection of awesome things regarding React ecosystem." },
  { name: "Awesome Rust", repo: "rust-unofficial/awesome-rust", stars: "41k", category: "Systems", description: "A curated list of Rust code and resources." },
  { name: "Awesome Cyber Security", repo: "sbilly/awesome-security", stars: "32k", category: "Security", description: "A collection of awesome software, libraries, learning tutorials, frameworks, etc." },
  { name: "Awesome Python", repo: "vinta/awesome-python", stars: "182k", category: "Language", description: "A curated list of awesome Python frameworks, libraries, software and resources." },
  { name: "Awesome Cryptography", repo: "sobolevn/awesome-cryptography", stars: "15k", category: "Security", description: "A curated list of cryptography resources and links." },
  { name: "Awesome Self-Hosted", repo: "awesome-selfhosted/awesome-selfhosted", stars: "148k", category: "Sovereignty", description: "A list of Free Software network services and web applications which can be hosted locally." },
  { name: "Awesome Decentralized", repo: "Mst-Rashedul-Alam/Awesome-Decentralized", stars: "4k", category: "Web3", description: "A curated list of decentralized protocols, products, and ideas." }
];

const AwesomeListsDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(AWESOME_DATA.map(d => d.category))];

  const filteredData = AWESOME_DATA.filter(item => 
    (activeCategory === 'All' || item.category === activeCategory) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">AWESOME DIRECTORY</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Curated Knowledge Swarms</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest transition-all ${
                activeCategory === cat ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-cyan-800 hover:text-cyan-400'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-cyan-900" />
        </div>
        <input 
          type="text"
          placeholder="SEARCH AWESOME KNOWLEDGE DATABASE..."
          className="w-full bg-slate-900/50 border border-cyan-500/20 rounded-lg py-4 pl-12 pr-4 text-cyan-400 placeholder-cyan-900 focus:outline-none focus:border-cyan-500 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredData.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-panel p-5 rounded-xl border border-cyan-500/10 hover:border-cyan-500/40 transition-all group flex flex-col h-full relative"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-500 border border-cyan-500/20">
                <Bookmark size={16} />
              </div>
              <div className="flex items-center space-x-2">
                 <div className="text-[8px] text-cyan-900 font-black uppercase tracking-tighter">Stars: {item.stars}</div>
                 <a href={`https://github.com/${item.repo}`} target="_blank" rel="noopener noreferrer" className="text-cyan-800 hover:text-cyan-400 transition-colors">
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest mb-2 group-hover:text-cyan-400 transition-colors">
              {item.name}
            </h3>
            <p className="text-[10px] text-slate-400 leading-relaxed mb-6 font-mono opacity-70 flex-1">
              {item.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-cyan-500/5">
              <span className="text-[8px] font-black text-cyan-900 uppercase tracking-widest">{item.category}</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse delay-75" />
                <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse delay-150" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AwesomeListsDirectory;