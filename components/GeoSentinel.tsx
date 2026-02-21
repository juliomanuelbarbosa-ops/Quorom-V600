import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  ShieldAlert,
  Activity,
  Map as MapIcon,
  AlertTriangle,
  Radio,
  Eye,
  Zap,
  Wind,
  CloudLightning,
  Waves,
  Flame,
  Loader2,
  ExternalLink,
  Crosshair,
  Navigation,
  X,
} from 'lucide-react';
import useQuorumStore from './useQuorumStore';

interface GeoEvent {
  id: string;
  type: 'EARTHQUAKE' | 'STORM' | 'CONFLICT' | 'FIRE' | 'FLOOD';
  title: string;
  location: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  lat: number;
  lng: number;
  details: string;
}

const GeoVigilanceHub: React.FC = () => {
  const [events, setEvents] = useState<GeoEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<GeoEvent | null>(null);
  const { addIntelBrief } = useQuorumStore();

  const fetchGeoData = async () => {
    setIsLoading(true);
    try {
      // Fetch real earthquake data from USGS
      const eqResponse = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson');
      const eqData = await eqResponse.json();

      const earthquakeEvents: GeoEvent[] = eqData.features.slice(0, 10).map((f: any) => ({
        id: f.id,
        type: 'EARTHQUAKE',
        title: `M ${f.properties.mag} Earthquake`,
        location: f.properties.place,
        severity: f.properties.mag > 6 ? 'CRITICAL' : f.properties.mag > 5 ? 'HIGH' : 'MEDIUM',
        timestamp: new Date(f.properties.time).toLocaleTimeString(),
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
        details: `Depth: ${f.geometry.coordinates[2]}km. Detected by USGS Global Network.`,
      }));

      // Mock other data for demo purposes (real-time conflict/storm APIs are often paid/restricted)
      const mockEvents: GeoEvent[] = [
        {
          id: 'storm-01',
          type: 'STORM',
          title: 'Tropical Cyclone NEURAL',
          location: 'Philippine Sea',
          severity: 'HIGH',
          timestamp: '08:45',
          lat: 15.4,
          lng: 130.2,
          details: 'Sustained winds 140km/h. Moving NW at 15km/h.',
        },
        {
          id: 'conflict-01',
          type: 'CONFLICT',
          title: 'Border Skirmish Detected',
          location: 'Eastern Buffer Zone',
          severity: 'CRITICAL',
          timestamp: '09:12',
          lat: 48.2,
          lng: 37.5,
          details: 'Thermal signatures indicate high-intensity kinetic exchange. Multi-agent swarm monitoring active.',
        },
      ];

      const allEvents = [...earthquakeEvents, ...mockEvents].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
      setEvents(allEvents);

      // Inject critical events into global feed
      allEvents
        .filter((e) => e.severity === 'CRITICAL')
        .forEach((e) => {
          addIntelBrief({
            id: `geo-${e.id}`,
            timestamp: e.timestamp,
            type: 'GEO_VIGILANCE',
            content: `CRITICAL EVENT: ${e.title} in ${e.location}.`,
            severity: 'high',
          });
        });
    } catch (error) {
      console.error('Geo Data Fetch Failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGeoData();
    const interval = setInterval(fetchGeoData, 300000); // Update every 5 mins
    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'EARTHQUAKE':
        return <Waves className="text-amber-500" />;
      case 'STORM':
        return <Wind className="text-cyan-400" />;
      case 'CONFLICT':
        return <Flame className="text-red-500" />;
      case 'FIRE':
        return <Flame className="text-orange-500" />;
      default:
        return <AlertTriangle className="text-slate-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-red-500/20 pb-6">
        <div>
          <h2 className="text-4xl font-black text-red-500 glow-text tracking-tighter uppercase flex items-center gap-3">
            <Globe size={36} className="text-red-600 animate-pulse" />
            GEO VIGILANCE HUB
          </h2>
          <p className="text-red-900 text-xs uppercase tracking-[0.4em] font-bold mt-1">
            Global Crisis Monitoring & Tactical Response Substrate
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-red-500/20 rounded">
            <Radio size={12} className="text-red-500 animate-pulse" />
            <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">LIVE_SATELLITE_UPLINK</span>
          </div>
          <button
            onClick={fetchGeoData}
            className="p-2 bg-red-500/10 border border-red-500/20 rounded hover:bg-red-500/20 transition-all"
          >
            {isLoading ? (
              <Loader2 size={14} className="animate-spin text-red-500" />
            ) : (
              <Zap size={14} className="text-red-500" />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Left: Event Feed */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
          <div className="glass-panel p-6 rounded-2xl border border-red-500/20 flex flex-col flex-1 overflow-hidden bg-slate-950/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-red-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert size={16} /> Active Alerts
              </h3>
              <span className="text-[10px] font-bold text-red-900">{events.length} NODES_ACTIVE</span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
              <AnimatePresence mode="popLayout">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setSelectedEvent(event)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${
                      selectedEvent?.id === event.id
                        ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                        : 'bg-slate-900/40 border-slate-800 hover:border-red-500/30'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-red-500/30 transition-colors">
                          {getIcon(event.type)}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-100 uppercase tracking-tight group-hover:text-red-400 transition-colors">
                            {event.title}
                          </h4>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-0.5">
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${
                          event.severity === 'CRITICAL'
                            ? 'bg-red-500 text-slate-950 border-red-400'
                            : 'bg-slate-950 text-red-500 border-red-900'
                        }`}
                      >
                        {event.severity}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Center: Tactical Map & Live Feed */}
        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
          <div className="glass-panel flex-1 rounded-3xl border border-red-500/20 bg-slate-950/40 relative overflow-hidden">
            {/* Tactical Grid */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #ef4444 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            ></div>

            <div className="absolute inset-0 flex items-center justify-center">
              {/* Mock World Map with Event Markers */}
              <div className="relative w-full h-full p-10">
                <div className="w-full h-full border border-red-500/10 rounded-2xl relative bg-slate-900/20">
                  {events.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute cursor-pointer group"
                      style={{
                        left: `${((event.lng + 180) / 360) * 100}%`,
                        top: `${((90 - event.lat) / 180) * 100}%`,
                      }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 animate-pulse ${
                          event.severity === 'CRITICAL'
                            ? 'bg-red-500 border-red-300 shadow-[0_0_15px_#ef4444]'
                            : 'bg-amber-500 border-amber-300'
                        }`}
                      ></div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 border border-red-500/30 px-2 py-1 rounded text-[8px] font-black text-red-400 uppercase z-50 whitespace-nowrap">
                        {event.title}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Event Overlay */}
            <AnimatePresence>
              {selectedEvent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-6 left-6 right-6 p-6 bg-slate-950/90 border border-red-500/30 rounded-2xl backdrop-blur-xl z-40"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        {getIcon(selectedEvent.type)}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-red-500 uppercase tracking-tighter">
                          {selectedEvent.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                          {selectedEvent.location}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedEvent(null)} className="text-slate-500 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>
                  <p className="text-sm text-slate-300 font-mono mb-4 leading-relaxed">{selectedEvent.details}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Navigation size={12} className="text-red-900" />
                        <span className="text-[10px] text-red-900 font-black">
                          {selectedEvent.lat.toFixed(2)}, {selectedEvent.lng.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity size={12} className="text-red-900" />
                        <span className="text-[10px] text-red-900 font-black">{selectedEvent.timestamp}</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-slate-950 rounded-lg font-black text-[10px] tracking-widest uppercase hover:bg-red-400 transition-all">
                      <span>Live Feed Uplink</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <div className="p-3 bg-slate-950/80 border border-red-500/20 rounded-xl backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2">
                  <Eye size={14} className="text-red-500" />
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Live Cams</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="w-20 h-12 bg-slate-900 rounded border border-red-500/10 overflow-hidden relative group cursor-pointer">
                    <img
                      src="https://picsum.photos/seed/cam1/200/120"
                      alt="Live Feed 1"
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-20 h-12 bg-slate-900 rounded border border-red-500/10 overflow-hidden relative group cursor-pointer">
                    <img
                      src="https://picsum.photos/seed/cam2/200/120"
                      alt="Live Feed 2"
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-red-500/10 flex items-center gap-3 bg-slate-950/40">
              <Waves size={16} className="text-red-900" />
              <div>
                <div className="text-[8px] text-red-900 font-black uppercase">Seismic</div>
                <div className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">STABLE</div>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-red-500/10 flex items-center gap-3 bg-slate-950/40">
              <Wind size={16} className="text-red-900" />
              <div>
                <div className="text-[8px] text-red-900 font-black uppercase">Atmospheric</div>
                <div className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">VOLATILE</div>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-red-500/10 flex items-center gap-3 bg-slate-950/40">
              <Flame size={16} className="text-red-900" />
              <div>
                <div className="text-[8px] text-red-900 font-black uppercase">Conflict</div>
                <div className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">3_ACTIVE</div>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-red-500/10 flex items-center gap-3 bg-slate-950/40">
              <Crosshair size={16} className="text-red-900" />
              <div>
                <div className="text-[8px] text-red-900 font-black uppercase">Precision</div>
                <div className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">SATELLITE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoVigilanceHub;
