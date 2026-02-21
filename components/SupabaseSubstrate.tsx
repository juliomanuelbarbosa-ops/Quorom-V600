import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import {
  Database,
  Lock,
  Zap,
  Folder,
  Terminal,
  Settings,
  Play,
  Loader2,
  Star,
  ExternalLink,
  ChevronRight,
  Activity,
  Shield,
  Users,
  Code,
  RefreshCcw,
  Table as TableIcon,
  Plus,
} from 'lucide-react';

interface TableRow {
  id: string;
  identity_key: string;
  status: 'ACTIVE' | 'REVOKED' | 'PENDING';
  last_sign_in: string;
  neural_latency: string;
}

const SupabaseSubstrate: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'Tables' | 'Functions' | 'Auth'>('Dashboard');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [rows] = useState<TableRow[]>([
    { id: '1', identity_key: '0x71...3E4F', status: 'ACTIVE', last_sign_in: '2m ago', neural_latency: '12ms' },
    { id: '2', identity_key: '0xAC...9912', status: 'ACTIVE', last_sign_in: '1h ago', neural_latency: '14ms' },
    { id: '3', identity_key: '0xBF...2231', status: 'REVOKED', last_sign_in: '3d ago', neural_latency: '--' },
    { id: '4', identity_key: '0xDE...4451', status: 'PENDING', last_sign_in: 'Never', neural_latency: '42ms' },
  ]);

  const refreshNode = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const metrics = [
    { label: 'DB SIZE', value: '1.2 GB', icon: <Database size={14} />, color: 'text-emerald-500' },
    { label: 'AUTH USERS', value: '4,281', icon: <Users size={14} />, color: 'text-cyan-500' },
    { label: 'EDGE CALLS', value: '890K', icon: <Zap size={14} />, color: 'text-amber-500' },
    { label: 'STORAGE', value: '84%', icon: <Folder size={14} />, color: 'text-purple-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-emerald-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Database size={36} className="text-emerald-500" />
            SUPABASE SUBSTRATE
          </h2>
          <p className="text-emerald-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Open Source Backend Infrastructure / PostgreSQL Core
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-emerald-500/20 rounded">
            <Star size={12} className="text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-400 uppercase">73K FORGED</span>
          </div>
          <a
            href="https://github.com/supabase/supabase"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-900 hover:text-emerald-400 transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="flex gap-1 p-1 bg-slate-900/50 rounded-xl border border-emerald-500/10 w-fit">
        {(['Dashboard', 'Tables', 'Functions', 'Auth'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                : 'text-emerald-900 hover:text-emerald-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'Dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                  <div
                    key={i}
                    className="glass-panel p-6 rounded-2xl border border-emerald-500/10 bg-slate-950/40 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                      {m.icon}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`${m.color}`}>{m.icon}</div>
                      <span className="text-[8px] font-black text-emerald-900 uppercase tracking-widest">
                        {m.label}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-slate-100">{m.value}</div>
                    <div className="mt-4 h-1 bg-slate-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        className={`h-full bg-emerald-500`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-panel p-8 rounded-3xl border border-emerald-500/10 bg-slate-950/40 flex flex-col min-h-[300px]">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                      <Activity size={18} className="text-emerald-500" />
                      <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest">Realtime Events</h3>
                    </div>
                    <button onClick={refreshNode} className="text-emerald-900 hover:text-emerald-400 transition-colors">
                      <RefreshCcw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                    </button>
                  </div>
                    <div className="flex-1 space-y-3 font-mono text-[9px]">
                      <div className="flex justify-between p-2 bg-emerald-500/5 rounded border border-emerald-500/10 text-emerald-500/60">
                        <span>{'>'} INSERT IN table &apos;MESH_LOGS&apos;</span>
                        <span>JUST NOW</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-900/50 rounded border border-emerald-500/5 text-emerald-900">
                        <span>{'>'} UPDATE IN table &apos;NODE_CONFIG&apos;</span>
                        <span>12:44:02</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-900/50 rounded border border-emerald-500/5 text-emerald-900">
                        <span>{'>'} DELETE FROM table &apos;TEMP_SUBSTRATE&apos;</span>
                        <span>12:42:15</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-900/50 rounded border border-emerald-500/5 text-emerald-900">
                        <span>{'>'} RPC &apos;SYNC_GLOBAL_STATE&apos; EXECUTED</span>
                        <span>12:39:58</span>
                      </div>
                    </div>
                </div>

                <div className="glass-panel p-8 rounded-3xl border border-emerald-500/10 bg-slate-950/40 flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <Shield size={24} className="text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-emerald-400 uppercase tracking-widest">
                        Row Level Security
                      </div>
                      <p className="text-[10px] text-emerald-900 font-bold uppercase mt-1">
                        RLS policies are enforced across all nodes.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-950 border border-emerald-500/10 rounded-xl">
                    <code className="text-[10px] text-emerald-600 leading-relaxed">
                      CREATE POLICY &quot;Public read access&quot; ON &quot;public&quot;.&quot;MESH_USERS&quot;
                      <br />
                      FOR SELECT USING (true);
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Tables' && (
            <motion.div
              key="tables"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="glass-panel rounded-3xl border border-emerald-500/20 bg-slate-950/40 overflow-hidden"
            >
              <div className="p-6 border-b border-emerald-500/10 bg-slate-900/50 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <TableIcon size={18} className="text-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                    Table Editor: MESH_USERS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[8px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-500 hover:text-slate-950 transition-all">
                    <Plus size={10} /> Insert Row
                  </button>
                  <button className="px-3 py-1 bg-slate-800 border border-emerald-500/10 rounded-lg text-[8px] font-black text-emerald-700 uppercase tracking-widest">
                    Edit Schema
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/50 border-b border-emerald-500/10 text-[9px] font-black text-emerald-900 uppercase tracking-[0.2em]">
                      <th className="p-4">UUID</th>
                      <th className="p-4">IDENTITY_KEY</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4">LAST_SYNC</th>
                      <th className="p-4">LATENCY</th>
                    </tr>
                  </thead>
                  <tbody className="text-[10px] font-mono">
                    {rows.map((row, i) => (
                      <tr key={i} className="border-b border-emerald-500/5 hover:bg-emerald-500/5 transition-colors">
                        <td className="p-4 text-emerald-900">{row.id}</td>
                        <td className="p-4 text-slate-100 font-bold">{row.identity_key}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded border ${
                              row.status === 'ACTIVE'
                                ? 'bg-green-500/10 border-green-500/20 text-green-500'
                                : row.status === 'REVOKED'
                                  ? 'bg-red-500/10 border-red-500/20 text-red-500'
                                  : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                            } text-[8px] font-black`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="p-4 text-emerald-900 uppercase">{row.last_sign_in}</td>
                        <td className="p-4 text-emerald-400 font-bold">{row.neural_latency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'Functions' && (
            <motion.div
              key="functions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-4 space-y-4">
                <div className="glass-panel p-6 rounded-2xl border border-emerald-500/10 space-y-4">
                  <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap size={14} /> Edge Runtime
                  </h3>
                  <div className="space-y-2">
                    {['process-payment', 'sync-neural-mesh', 'verify-identity', 'cleanup-logs'].map((f) => (
                      <button
                        key={f}
                        className="w-full p-3 bg-slate-900 border border-emerald-500/5 rounded-xl text-left hover:border-emerald-500/40 transition-all group flex justify-between items-center"
                      >
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-400 transition-colors uppercase">
                          {f}
                        </span>
                        <ChevronRight size={14} className="text-emerald-900" />
                      </button>
                    ))}
                  </div>
                  <button className="w-full py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-2">
                    <Plus size={14} /> New Function
                  </button>
                </div>
              </div>
              <div className="lg:col-span-8 flex flex-col">
                <div className="glass-panel flex-1 rounded-3xl border border-emerald-500/20 bg-slate-950 overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-emerald-500/10 bg-slate-900/50 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Code size={14} className="text-emerald-500" />
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                        sync-neural-mesh.ts
                      </span>
                    </div>
                    <button className="px-4 py-1.5 bg-emerald-500 text-slate-950 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                      <Play size={12} /> Deploy Edge
                    </button>
                  </div>
                  <div className="flex-1 p-6 font-mono text-[11px] text-emerald-600 leading-relaxed overflow-auto custom-scrollbar">
                    <span className="text-purple-400">import</span> {'{ createClient }'}{' '}
                    <span className="text-purple-400">from</span>{' '}
                    <span className="text-amber-200">&apos;@supabase/supabase-js&apos;</span>
                    <br />
                    <br />
                    <span className="text-emerald-400 opacity-50">// Initialize mesh core</span>
                    <br />
                    <span className="text-purple-400">const</span> supabase = createClient(
                    <br />
                    &nbsp;&nbsp;Deno.<span className="text-cyan-400">env</span>.get(
                    <span className="text-amber-200">&apos;SUPABASE_URL&apos;</span>) ??{' '}
                    <span className="text-amber-200">&apos;&apos;</span>,<br />
                    &nbsp;&nbsp;Deno.<span className="text-cyan-400">env</span>.get(
                    <span className="text-amber-200">&apos;SUPABASE_SERVICE_ROLE_KEY&apos;</span>) ??{' '}
                    <span className="text-amber-200">&apos;&apos;</span>
                    <br />
                    )<br />
                    <br />
                    Deno.<span className="text-cyan-400">serve</span>(<span className="text-purple-400">async</span>{' '}
                    (req) ={'>'} {'{'}
                    <br />
                    &nbsp;&nbsp;<span className="text-purple-400">const</span> {'{ name }'} ={' '}
                    <span className="text-purple-400">await</span> req.<span className="text-cyan-400">json</span>()
                    <br />
                    &nbsp;&nbsp;<span className="text-purple-400">const</span> data ={' '}
                    {'{ message: `Mesh ${name} synced successfully.` }'}
                    <br />
                    <br />
                    &nbsp;&nbsp;<span className="text-purple-400">return new</span> Response(
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;JSON.<span className="text-cyan-400">stringify</span>(data),
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{'{ headers: { "Content-Type": "application/json" } }'}
                    <br />
                    &nbsp;&nbsp;)
                    <br />
                    {'}'})
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-emerald-500/10 flex items-center gap-3">
          <Database size={16} className="text-emerald-900" />
          <div>
            <div className="text-[8px] text-emerald-900 font-black uppercase">Postgres Status</div>
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">SYNCHRONIZED</div>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-emerald-500/10 flex items-center gap-3">
          <Lock size={16} className="text-emerald-900" />
          <div>
            <div className="text-[8px] text-emerald-900 font-black uppercase">JWT Auth Substrate</div>
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">SECURE (HS256)</div>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-emerald-500/10 flex items-center gap-3">
          <Zap size={16} className="text-emerald-900" />
          <div>
            <div className="text-[8px] text-emerald-900 font-black uppercase">Auto-API Mesh</div>
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">REST/GRAPHQL READY</div>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-emerald-500/10 flex items-center gap-3">
          <Terminal size={16} className="text-emerald-900" />
          <div>
            <div className="text-[8px] text-emerald-900 font-black uppercase">Protocol ID</div>
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">SUB_v0.60.2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupabaseSubstrate;
