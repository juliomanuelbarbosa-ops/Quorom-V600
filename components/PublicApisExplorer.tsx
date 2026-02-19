
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, ExternalLink, Shield, Zap, Database } from 'lucide-react';

interface PublicApi {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

const API_DATA: PublicApi[] = [
  { API: "CoinGecko", Description: "Cryptocurrency data", Auth: "No", HTTPS: true, Cors: "Yes", Link: "https://www.coingecko.com/en/api", Category: "Crypto" },
  { API: "OpenWeather", Description: "Current weather data", Auth: "apiKey", HTTPS: true, Cors: "Yes", Link: "https://openweathermap.org/api", Category: "Weather" },
  { API: "GitHub", Description: "Software repositories", Auth: "OAuth", HTTPS: true, Cors: "Yes", Link: "https://docs.github.com/en/rest", Category: "Development" },
  { API: "NASA", Description: "Space data and images", Auth: "apiKey", HTTPS: true, Cors: "Unknown", Link: "https://api.nasa.gov/", Category: "Science" },
  { API: "Spotify", Description: "Music and podcasts", Auth: "OAuth", HTTPS: true, Cors: "Yes", Link: "https://developer.spotify.com/documentation/web-api/", Category: "Music" },
  { API: "Stripe", Description: "Payment processing", Auth: "apiKey", HTTPS: true, Cors: "No", Link: "https://stripe.com/docs/api", Category: "Finance" },
  { API: "Twilio", Description: "SMS and Voice", Auth: "apiKey", HTTPS: true, Cors: "No", Link: "https://www.twilio.com/docs/api", Category: "Communication" },
  { API: "Unsplash", Description: "High-quality photos", Auth: "apiKey", HTTPS: true, Cors: "Yes", Link: "https://unsplash.com/developers", Category: "Image" }
];

const PublicApisExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(API_DATA.map(a => a.Category))];

  const filtered = API_DATA.filter(api => 
    (filter === 'All' || api.Category === filter) &&
    (api.API.toLowerCase().includes(searchTerm.toLowerCase()) || 
     api.Description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">PUBLIC APIS EXPLORER</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Global Data Mesh Discovery</p>
        </div>
        <div className="flex space-x-2">
           <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400 uppercase tracking-widest font-bold">1400+ Total</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-cyan-900" />
          </div>
          <input 
            type="text"
            placeholder="FILTER API DATABASE..."
            className="w-full bg-slate-900/50 border border-cyan-500/20 rounded py-3 pl-12 pr-4 text-cyan-400 focus:outline-none focus:border-cyan-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded text-[10px] font-black tracking-widest whitespace-nowrap transition-all border ${
                filter === cat ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900/40 text-cyan-800 border-cyan-500/10 hover:border-cyan-500/30'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-xl border border-cyan-500/20 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-900 border-b border-cyan-500/20">
              <th className="p-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest">API Name</th>
              <th className="p-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest">Description</th>
              <th className="p-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest">Auth</th>
              <th className="p-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest">HTTPS</th>
              <th className="p-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest">CORS</th>
              <th className="p-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest">Category</th>
              <th className="p-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest text-center">Protocol</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((api, idx) => (
              <tr key={idx} className="border-b border-cyan-500/5 hover:bg-cyan-500/5 transition-colors group">
                <td className="p-4 text-xs font-bold text-slate-100">{api.API}</td>
                <td className="p-4 text-[10px] text-slate-400 italic">{api.Description}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-[2px] text-[8px] font-black tracking-tighter ${api.Auth === 'No' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    {api.Auth.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  {api.HTTPS ? <Shield size={14} className="text-cyan-500" /> : <Shield size={14} className="text-red-900" />}
                </td>
                <td className="p-4 text-[10px] font-bold text-cyan-900">{api.Cors}</td>
                <td className="p-4 text-[10px] font-bold text-slate-500 uppercase">{api.Category}</td>
                <td className="p-4 text-center">
                  <a href={api.Link} target="_blank" rel="noopener noreferrer" className="text-cyan-800 hover:text-cyan-400 transition-colors inline-block">
                    <ExternalLink size={16} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublicApisExplorer;
