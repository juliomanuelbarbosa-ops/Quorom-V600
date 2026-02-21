import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2,
  Search,
  ExternalLink,
  Cpu,
  Monitor,
  Smartphone,
  Database,
  Zap,
  ShieldCheck,
  Info,
  Filter,
  Star,
  Terminal,
  Layers,
  MonitorPlay,
} from 'lucide-react';

interface EmulatorNode {
  name: string;
  repo: string;
  platform: 'Nintendo' | 'Sony' | 'Sega' | 'Microsoft' | 'Arcade' | 'Multi';
  type: 'Handheld' | 'Home' | 'Desktop';
  description: string;
  status: 'STABLE' | 'ACTIVE' | 'LEGACY';
}

const EMULATOR_DATA: EmulatorNode[] = [
  {
    name: 'Ryujinx',
    repo: 'Ryujinx/Ryujinx',
    platform: 'Nintendo',
    type: 'Home',
    description: 'Experimental Nintendo Switch emulator written in C#.',
    status: 'ACTIVE',
  },
  {
    name: 'Dolphin',
    repo: 'dolphin-emu/dolphin',
    platform: 'Nintendo',
    type: 'Home',
    description: 'GameCube and Wii emulator. The gold standard for performance and accuracy.',
    status: 'STABLE',
  },
  {
    name: 'RPCS3',
    repo: 'RPCS3/rpcs3',
    platform: 'Sony',
    type: 'Home',
    description: "The world's first open-source PlayStation 3 emulator/debugger.",
    status: 'ACTIVE',
  },
  {
    name: 'PCSX2',
    repo: 'PCSX2/pcsx2',
    platform: 'Sony',
    type: 'Home',
    description: 'PlayStation 2 emulator capable of running 99% of the original library.',
    status: 'STABLE',
  },
  {
    name: 'DuckStation',
    repo: 'stenzek/duckstation',
    platform: 'Sony',
    type: 'Home',
    description: 'Fast PlayStation 1 emulator focusing on playability and speed.',
    status: 'STABLE',
  },
  {
    name: 'mGBA',
    repo: 'mgba-emu/mgba',
    platform: 'Nintendo',
    type: 'Handheld',
    description: 'New generation of Game Boy Advance emulator, optimized for accuracy.',
    status: 'STABLE',
  },
  {
    name: 'Citra',
    repo: 'citra-emu/citra',
    platform: 'Nintendo',
    type: 'Handheld',
    description: 'Experimental Nintendo 3DS emulator.',
    status: 'LEGACY',
  },
  {
    name: 'PPSSPP',
    repo: 'hrydgard/ppsspp',
    platform: 'Sony',
    type: 'Handheld',
    description: 'Cross-platform PSP emulator with high resolution rendering.',
    status: 'STABLE',
  },
  {
    name: 'Flycast',
    repo: 'flyinghead/flycast',
    platform: 'Sega',
    type: 'Home',
    description: 'Multi-platform Sega Dreamcast, Naomi and Atomiswave emulator.',
    status: 'ACTIVE',
  },
  {
    name: 'MAME',
    repo: 'mamedev/mame',
    platform: 'Arcade',
    type: 'Desktop',
    description: 'Multiple Arcade Machine Emulator. Preservation substrate for arcade history.',
    status: 'STABLE',
  },
  {
    name: 'RetroArch',
    repo: 'libretro/RetroArch',
    platform: 'Multi',
    type: 'Desktop',
    description: 'The definitive frontend for emulators, game engines and media players.',
    status: 'STABLE',
  },
  {
    name: 'Xenia',
    repo: 'xenia-project/xenia',
    platform: 'Microsoft',
    type: 'Home',
    description: 'Experimental Xbox 360 Research Emulator.',
    status: 'ACTIVE',
  },
];

const EmulatorArchive: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('All');

  const platforms = useMemo(() => ['All', ...new Set(EMULATOR_DATA.map((e) => e.platform))].sort(), []);

  const filtered = useMemo(
    () =>
      EMULATOR_DATA.filter(
        (e) =>
          (filter === 'All' || e.platform === filter) &&
          (e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [searchTerm, filter]
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-orange-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-orange-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Gamepad2 size={36} className="text-orange-500" />
            EMULATOR ARCHIVE
          </h2>
          <p className="text-orange-900 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            System Preservation & Hardware Abstraction Substrate
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-orange-500/20 rounded">
            <MonitorPlay size={12} className="text-orange-500" />
            <span className="text-[10px] font-black text-orange-400 uppercase">GUEST_MODE: ACTIVE</span>
          </div>
          <a
            href="https://github.com/DerekTurtleRoe/awesome-emulators"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-900 hover:text-orange-400 transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-orange-900 group-focus-within:text-orange-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="SEARCH LEGACY HARDWARE NODES..."
            className="w-full bg-slate-900/40 border border-orange-500/20 rounded-xl py-4 pl-12 pr-4 text-orange-400 focus:outline-none focus:border-orange-500 transition-all font-bold tracking-wider text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                filter === p
                  ? 'bg-orange-600 text-white border-orange-400 shadow-lg'
                  : 'bg-slate-900/40 text-orange-900 border-orange-500/10 hover:border-orange-500/40'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filtered.map((emu, idx) => (
            <motion.div
              key={emu.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel p-6 rounded-2xl border border-orange-500/10 hover:border-orange-500/40 hover:bg-slate-900/60 transition-all group flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                <Cpu size={60} className="text-orange-500" />
              </div>

              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-2.5 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${
                    emu.type === 'Handheld'
                      ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      : emu.type === 'Home'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                  }`}
                >
                  {emu.type}
                </span>
                <div className="flex gap-2">
                  <span
                    className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${
                      emu.status === 'STABLE'
                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                        : emu.status === 'ACTIVE'
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                    }`}
                  >
                    {emu.status}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-100 group-hover:text-orange-400 transition-colors mb-2 uppercase tracking-tight">
                {emu.name}
              </h3>

              <p className="text-slate-400 text-[11px] leading-relaxed mb-6 font-medium opacity-80 flex-1 h-12 line-clamp-3 italic">
                {emu.description}
              </p>

              <div className="space-y-4 pt-4 border-t border-orange-500/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-orange-900" />
                    <span className="text-[9px] font-black text-orange-800 uppercase tracking-tighter">
                      {emu.platform} Core
                    </span>
                  </div>
                  <a
                    href={`https://github.com/${emu.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[8px] font-black text-orange-500 hover:text-orange-300 uppercase tracking-widest transition-colors flex items-center gap-2"
                  >
                    REPOSITORY <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-8 bg-orange-500/5 border border-orange-500/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 mt-auto">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
            <Layers size={32} className="text-orange-400" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black text-orange-400 uppercase tracking-widest font-mono">
              Dynamic Recompiler Protocol
            </h4>
            <p className="text-[10px] text-orange-900 font-bold uppercase leading-relaxed max-w-xl italic">
              &quot;Abstractions must be complete. Every register of the original silicon is a coordinate in the timeline of
              computational history.&quot;
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-[8px] text-orange-900 font-black uppercase tracking-widest">JIT COMPILER</div>
            <div className="text-xs font-black text-green-500 tracking-tighter">OPTIMIZED</div>
          </div>
          <div className="h-10 w-px bg-orange-500/10 hidden md:block" />
          <div className="text-right">
            <div className="text-[8px] text-orange-900 font-black uppercase tracking-widest">Latency Offset</div>
            <div className="text-xs font-black text-orange-500 tracking-tighter">0.12ms</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmulatorArchive;
