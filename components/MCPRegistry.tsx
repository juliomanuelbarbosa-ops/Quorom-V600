import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network,
  Search,
  ExternalLink,
  Zap,
  Database,
  Globe,
  Terminal,
  Shield,
  Cpu,
  Code2,
  Link as LinkIcon,
  Box,
  MessageSquare,
  Layout,
  Filter,
  Sparkles,
} from 'lucide-react';

interface MCPServer {
  name: string;
  repo: string;
  description: string;
  category:
    | 'Storage'
    | 'Tools'
    | 'Social'
    | 'Cloud'
    | 'Search'
    | 'Development'
    | 'Finance'
    | 'Design'
    | 'Memory'
    | 'Productivity';
  author: string;
  capabilities: string[];
}

const MCP_SERVERS: MCPServer[] = [
  {
    name: 'Google Maps MCP',
    repo: 'google/mcp-servers',
    description: 'Connect your AI models to real-world geography and place data via Google Maps Platform.',
    category: 'Search',
    author: 'Google',
    capabilities: ['Local Search', 'Place Details', 'Routing'],
  },
  {
    name: 'Postgres MCP',
    repo: 'modelcontextprotocol/servers',
    description: 'Read and write access to PostgreSQL databases with full schema awareness.',
    category: 'Storage',
    author: 'Anthropic',
    capabilities: ['SQL Execution', 'Schema Reflection', 'Query Planning'],
  },
  {
    name: 'GitHub MCP',
    repo: 'modelcontextprotocol/servers',
    description: 'Comprehensive integration with GitHub for repository management and code audits.',
    category: 'Development',
    author: 'Anthropic',
    capabilities: ['Search Code', 'Pull Requests', 'File Operations'],
  },
  {
    name: 'Slack MCP',
    repo: 'modelcontextprotocol/servers',
    description: 'Authorize AI agents to communicate and search within Slack workspaces.',
    category: 'Social',
    author: 'Anthropic',
    capabilities: ['Send Messages', 'Search History', 'User Management'],
  },
  {
    name: 'Cloudflare MCP',
    repo: 'cloudflare/mcp-server-cloudflare',
    description: 'Manage Cloudflare resources including Workers, Pages, and KV stores.',
    category: 'Cloud',
    author: 'Cloudflare',
    capabilities: ['Worker Deployment', 'DNS Management', 'Analytics'],
  },
  {
    name: 'Exa Search MCP',
    repo: 'exa-labs/exa-mcp-server',
    description: 'A neural search engine optimized specifically for LLM retrieval and grounding.',
    category: 'Search',
    author: 'Exa Labs',
    capabilities: ['Neural Search', 'Web Crawling', 'Similarity Scoring'],
  },
  {
    name: 'Docker MCP',
    repo: 'modelcontextprotocol/servers',
    description: 'Interact with local or remote Docker engines for container orchestration.',
    category: 'Tools',
    author: 'Anthropic',
    capabilities: ['List Containers', 'Container Logs', 'Network Config'],
  },
  {
    name: 'Brave Search MCP',
    repo: 'modelcontextprotocol/servers',
    description: "Direct web grounding using Brave's privacy-focused search index.",
    category: 'Search',
    author: 'Anthropic',
    capabilities: ['Web Search', 'Local Results', 'Privacy Shield'],
  },
  {
    name: 'Figma-Framelink MCP',
    repo: 'figma/mcp-server',
    description:
      'Connects directly to Figma data, bridging the gap between UI designs and React/Tailwind implementation.',
    category: 'Design',
    author: 'Figma',
    capabilities: ['Read Designs', 'Export Assets', 'Inspect Nodes'],
  },
  {
    name: 'Vercel MCP',
    repo: 'vercel/mcp-server',
    description: 'Deploy, configure, and interrogate serverless edge functions and static hosting resources.',
    category: 'Cloud',
    author: 'Vercel',
    capabilities: ['Deployments', 'Logs', 'Edge Config'],
  },
  {
    name: 'Playwright MCP',
    repo: 'microsoft/playwright-mcp',
    description: 'Launch a headless browser, navigate pages, and visually inspect UI elements for testing.',
    category: 'Tools',
    author: 'Microsoft',
    capabilities: ['Browser Automation', 'UI Testing', 'Screenshots'],
  },
  {
    name: 'AlphaVantage MCP',
    repo: 'alphavantage/mcp-server',
    description: 'Enterprise-grade stock market, ETF, and forex data for financial analysis.',
    category: 'Finance',
    author: 'AlphaVantage',
    capabilities: ['Stock Data', 'Forex', 'Technical Indicators'],
  },
  {
    name: 'Binance MCP',
    repo: 'binance/mcp-server',
    description: 'Real-time cryptocurrency price feeds, order books, and ticker data.',
    category: 'Finance',
    author: 'Binance',
    capabilities: ['Crypto Prices', 'Order Books', 'Trade History'],
  },
  {
    name: 'BigQuery MCP',
    repo: 'google/mcp-bigquery',
    description: 'Interpret schemas and run SQL queries against massive enterprise datasets in place.',
    category: 'Storage',
    author: 'Google',
    capabilities: ['SQL Queries', 'Schema Analysis', 'Data Warehousing'],
  },
  {
    name: 'Firecrawl MCP',
    repo: 'mendable/firecrawl-mcp',
    description: 'Bypass bot detection and turn any website URL into clean, structured Markdown data.',
    category: 'Search',
    author: 'Mendable',
    capabilities: ['Web Scraping', 'Markdown Extraction', 'Anti-Bot Bypass'],
  },
  {
    name: 'Supabase MCP',
    repo: 'supabase/mcp-server',
    description: 'Direct, natural-language database interaction for reading and writing to backend.',
    category: 'Storage',
    author: 'Supabase',
    capabilities: ['Database CRUD', 'Auth Management', 'Realtime Subs'],
  },
  {
    name: 'Knowledge Graph Memory',
    repo: 'neo4j/mcp-memory',
    description: 'Persistent memory system storing entities and relationships for long-term recall.',
    category: 'Memory',
    author: 'Neo4j',
    capabilities: ['Entity Extraction', 'Relationship Mapping', 'Graph Query'],
  },
  {
    name: 'Notion MCP',
    repo: 'notion/mcp-server',
    description: 'Pull in workspace context, documentation, and team communications.',
    category: 'Productivity',
    author: 'Notion',
    capabilities: ['Page Access', 'Database Query', 'Content Search'],
  },
  {
    name: 'Google Calendar MCP',
    repo: 'google/mcp-calendar',
    description: 'Reason over schedules, check availability, and manage time-series events.',
    category: 'Productivity',
    author: 'Google',
    capabilities: ['Event Management', 'Availability Check', 'Scheduling'],
  },
];

const MCPRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('All');

  const categories = useMemo(() => ['All', ...new Set(MCP_SERVERS.map((s) => s.category))].sort(), []);

  const filteredServers = useMemo(
    () =>
      MCP_SERVERS.filter(
        (s) =>
          (filter === 'All' || s.category === filter) &&
          (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [searchTerm, filter]
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Network size={36} className="text-cyan-500" />
            MCP REGISTRY
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Model Context Protocol / Universal Tool Substrate
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded">
            <Box size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-400 uppercase">PROTOCOL v1.0</span>
          </div>
          <a
            href="https://github.com/punkpeye/awesome-mcp-servers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-900 hover:text-cyan-400 transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-cyan-900 group-focus-within:text-cyan-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="SEARCH PROTOCOL ADAPTERS..."
            className="w-full bg-slate-900/40 border border-cyan-500/20 rounded-xl py-4 pl-12 pr-4 text-cyan-400 focus:outline-none focus:border-cyan-500 transition-all font-bold tracking-wider text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                filter === cat
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg'
                  : 'bg-slate-900/40 text-cyan-900 border-cyan-500/10 hover:border-cyan-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredServers.map((server, idx) => (
            <motion.div
              key={server.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel p-6 rounded-2xl border border-cyan-500/10 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all group flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                <LinkIcon size={60} className="text-cyan-500" />
              </div>

              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-2.5 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${
                    server.category === 'Storage'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : server.category === 'Development'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        : server.category === 'Finance'
                          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                          : server.category === 'Design'
                            ? 'bg-pink-500/10 text-pink-400 border-pink-500/20'
                            : server.category === 'Memory'
                              ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                              : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                  }`}
                >
                  {server.category}
                </span>
                <a
                  href={`https://github.com/${server.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-900 hover:text-cyan-400 transition-all"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              <h3 className="text-lg font-black text-slate-100 group-hover:text-cyan-400 transition-colors mb-2 uppercase tracking-tight">
                {server.name}
              </h3>

              <p className="text-slate-400 text-[11px] leading-relaxed mb-6 font-medium opacity-80 flex-1 h-12 line-clamp-3">
                {server.description}
              </p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {server.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="text-[7px] font-black text-cyan-900 uppercase border border-cyan-500/10 px-1.5 py-0.5 rounded bg-slate-950/50"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-cyan-500/5">
                  <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-cyan-900" />
                    <span className="text-[9px] font-black text-cyan-800 uppercase tracking-tighter">
                      Auth: {server.author}
                    </span>
                  </div>
                  <button className="text-[8px] font-black text-cyan-500 hover:text-cyan-300 uppercase tracking-widest transition-colors flex items-center gap-2">
                    INITIATE <Zap size={10} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 mt-auto">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            <Network size={32} className="text-cyan-400" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest font-mono">
              Model Context Protocol (MCP)
            </h4>
            <p className="text-[10px] text-cyan-900 font-bold uppercase leading-relaxed max-w-xl italic">
              &quot;A standardized communication substrate allowing neural models to securely interact with the physical and
              digital world through managed toolsets.&quot;
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[8px] text-cyan-900 font-black uppercase tracking-widest">Interface Status</div>
            <div className="text-xs font-black text-green-500 tracking-tighter">MESH_READY</div>
          </div>
          <div className="w-1.5 h-10 bg-cyan-500/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ height: ['0%', '100%', '0%'] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-full bg-cyan-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCPRegistry;
