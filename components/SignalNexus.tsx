import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RadioReceiver, Map as MapIcon, Wifi, WifiOff, 
  Shield, ShieldAlert, ShieldCheck, Zap, 
  Terminal, Search, Activity, Crosshair,
  Navigation, Globe, Database, Loader2, Save
} from 'lucide-react';
import useQuorumStore from './useQuorumStore';

interface Hotspot {
  id: number;
  ssid: string;
  bssid: string;
  signal: number;
  security: string;
  lat: number;
  lng: number;
  type: 'open' | 'secure';
  source: string;
}

const SignalNexus: React.FC = () => {
  const { saveHotspot, savedHotspots } = useQuorumStore();
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [gpsStatus, setGpsStatus] = useState<string>('AWAITING_UPLINK');
  const [isScanning, setIsScanning] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const fetchLiveIntel = async (lat: number, lng: number) => {
    setIsScanning(true);
    try {
      // We use a relative path here. The proxy intercepts '/api/...'
      // Proxy handles /api/ to http://localhost:80
      const response = await fetch(`/api/get_markers.php?lat=${lat}&lng=${lng}`);
      
      if (!response.ok) throw new Error('Database uplink rejected');
      
      const realData = await response.json();
      
      const formattedHotspots = realData.map((node: any, index: number) => ({
        id: index,
        ssid: node.ssid || 'HIDDEN_NETWORK',
        bssid: node.mac || node.bssid,
        signal: 100, // Znerox may not pass live signal strength for historical data
        security: node.encryption || 'UNKNOWN',
        lat: parseFloat(node.lat),
        lng: parseFloat(node.lon),
        type: node.encryption === 'None' ? 'open' : 'secure',
        source: 'Znerox_DB'
      }));

      setHotspots(formattedHotspots);
      // Persist discovered hotspots
      formattedHotspots.forEach((h: any) => saveHotspot(h));
      
      setGpsStatus('UPLINK_ESTABLISHED');
    } catch (error) {
      console.error("CRITICAL: Znerox Proxy Link Failed", error);
      setGpsStatus('PROXY_CONNECTION_ERROR');
      
      // Fallback mock data if the local backend isn't actually running
      const fallback = [
        { id: 101, ssid: 'QUORUM_SECURE_NODE', bssid: '00:11:22:33:44:55', signal: 92, security: 'WPA3', lat: lat + 0.001, lng: lng + 0.001, type: 'secure', source: 'MOCK_FALLBACK' },
        { id: 102, ssid: 'FREE_CITY_WIFI', bssid: 'AA:BB:CC:DD:EE:FF', signal: 45, security: 'None', lat: lat - 0.002, lng: lng + 0.001, type: 'open', source: 'MOCK_FALLBACK' },
        { id: 103, ssid: 'STARLINK_TRANSIT', bssid: '12:34:56:78:90:AB', signal: 78, security: 'WPA2', lat: lat + 0.002, lng: lng - 0.001, type: 'secure', source: 'MOCK_FALLBACK' },
      ];
      setHotspots(fallback);
      fallback.forEach(h => saveHotspot(h));
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setGpsStatus('UPLINK_ESTABLISHED');
          
          // Trigger the fetch to the Znerox backend
          fetchLiveIntel(latitude, longitude);
        },
        (error) => {
          console.error("GPS Error:", error);
          setGpsStatus('GPS_DENIED');
        }
      );
    } else {
      setGpsStatus('HARDWARE_NOT_SUPPORTED');
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 glow-text tracking-tighter uppercase flex items-center gap-3">
            <RadioReceiver size={36} className="text-cyan-500" />
            SIGNAL NEXUS
          </h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Wireless Intelligence & Network Mapping Substrate
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-3 py-1 rounded border text-[10px] font-black uppercase tracking-widest transition-all ${
              showHeatmap ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 text-cyan-500 border-cyan-500/20'
            }`}
          >
            Heatmap: {showHeatmap ? 'ON' : 'OFF'}
          </button>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded">
            <Save size={12} className="text-cyan-500" />
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{savedHotspots.length} PERSISTED</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded">
            <Navigation size={12} className={gpsStatus === 'UPLINK_ESTABLISHED' ? 'text-green-500' : 'text-red-500'} />
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{gpsStatus}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Left: Hotspot Feed */}
        <div className="lg:col-span-5 flex flex-col gap-6 overflow-hidden">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 flex flex-col flex-1 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Wifi size={16} /> Detected Nodes
              </h3>
              <button 
                onClick={() => userLocation && fetchLiveIntel(userLocation[0], userLocation[1])}
                disabled={isScanning}
                className="p-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded hover:bg-cyan-500/20 transition-all"
              >
                {isScanning ? <Loader2 size={14} className="animate-spin text-cyan-400" /> : <Activity size={14} className="text-cyan-400" />}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
              <AnimatePresence mode="popLayout">
                {hotspots.map((node) => (
                  <motion.div 
                    key={node.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="p-4 bg-slate-950/50 border border-cyan-500/10 rounded-xl hover:border-cyan-500/30 transition-all group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-slate-900 border ${node.type === 'open' ? 'border-red-500/30 text-red-500' : 'border-green-500/30 text-green-500'}`}>
                          {node.type === 'open' ? <WifiOff size={16} /> : <ShieldCheck size={16} />}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-100 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                            {node.ssid}
                          </h4>
                          <div className="text-[10px] text-cyan-900 font-bold uppercase tracking-tighter mt-0.5">
                            BSSID: {node.bssid}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-black text-cyan-500">{node.signal}%</div>
                        <div className="text-[8px] text-cyan-900 font-bold uppercase">{node.security}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database size={10} className="text-cyan-900" />
                        <span className="text-[8px] text-cyan-900 font-black uppercase tracking-widest">{node.source}</span>
                      </div>
                      <div className="text-[8px] text-cyan-900 font-bold">
                        {node.lat.toFixed(4)}, {node.lng.toFixed(4)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {hotspots.length === 0 && !isScanning && (
                <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4">
                  <WifiOff size={48} />
                  <p className="text-[10px] uppercase tracking-[0.4em]">No Signal Data Detected</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Tactical Map Visualization */}
        <div className="lg:col-span-7 flex flex-col gap-6 overflow-hidden">
          <div className="glass-panel flex-1 rounded-3xl border border-cyan-500/20 bg-slate-950/40 relative overflow-hidden">
            {/* Tactical Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            {/* Heatmap Overlay */}
            <AnimatePresence>
              {showHeatmap && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-0 pointer-events-none"
                >
                  {hotspots.map((node, i) => {
                    if (!userLocation) return null;
                    const dx = (node.lng - userLocation[1]) * 10000;
                    const dy = (node.lat - userLocation[0]) * 10000;
                    return (
                      <div 
                        key={`heat-${i}`}
                        className="absolute w-40 h-40 bg-cyan-500/10 blur-[40px] rounded-full"
                        style={{ transform: `translate(calc(50% + ${dx}px), calc(50% - ${dy}px))` }}
                      />
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center justify-center">
              {/* Mock Map Visualization */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* User Marker */}
                <div className="absolute z-20">
                  <div className="w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_20px_#06b6d4] animate-pulse"></div>
                  <div className="absolute -inset-4 border border-cyan-500/30 rounded-full animate-ping"></div>
                </div>

                {/* Hotspot Markers */}
                {hotspots.map((node, i) => {
                  if (!userLocation) return null;
                  const dx = (node.lng - userLocation[1]) * 10000;
                  const dy = (node.lat - userLocation[0]) * 10000;
                  return (
                    <motion.div 
                      key={node.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="absolute z-10 cursor-pointer group"
                      style={{ transform: `translate(${dx}px, ${-dy}px)` }}
                    >
                      <div className={`w-3 h-3 rounded-full border-2 ${node.type === 'open' ? 'bg-red-500 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-green-500 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`}></div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900 border border-cyan-500/20 px-2 py-1 rounded text-[8px] font-black text-cyan-400 uppercase z-30">
                        {node.ssid}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Radar Sweep Effect */}
                <div className="absolute w-[600px] h-[600px] border border-cyan-500/5 rounded-full"></div>
                <div className="absolute w-[400px] h-[400px] border border-cyan-500/10 rounded-full"></div>
                <div className="absolute w-[200px] h-[200px] border border-cyan-500/20 rounded-full"></div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-transparent rounded-full origin-center"
                  style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
                ></motion.div>
              </div>
            </div>

            <div className="absolute top-4 left-4 p-3 bg-slate-900/80 border border-cyan-500/20 rounded-xl backdrop-blur-md z-30">
              <div className="flex items-center gap-2 mb-2">
                <Crosshair size={14} className="text-cyan-500" />
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Tactical Overlay</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-[8px] text-slate-400 font-bold uppercase">SECURE_NODE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-[8px] text-slate-400 font-bold uppercase">OPEN_AP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-cyan-500/10 flex items-center gap-3">
              <Zap size={16} className="text-cyan-900" />
              <div>
                <div className="text-[8px] text-cyan-900 font-black uppercase">Scan Range</div>
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">GLOBAL_MESH</div>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-cyan-500/10 flex items-center gap-3">
              <Shield size={16} className="text-cyan-900" />
              <div>
                <div className="text-[8px] text-cyan-900 font-black uppercase">Encryption</div>
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">WPA3_SUPPORT</div>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-cyan-500/10 flex items-center gap-3">
              <Activity size={16} className="text-cyan-900" />
              <div>
                <div className="text-[8px] text-cyan-900 font-black uppercase">Uplink</div>
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">ZNEROX_SYNC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalNexus;
