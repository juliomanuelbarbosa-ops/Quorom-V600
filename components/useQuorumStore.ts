import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface IntelBrief {
  id: string;
  timestamp: string;
  type: string;
  content: string;
  severity: 'high' | 'medium' | 'low' | 'info';
}

export interface MissionLogEntry {
  id: number;
  type: 'TASK' | 'ACHIEVEMENT';
  status: 'complete' | 'unlocked' | 'active' | 'pending';
  text: string;
  time: string;
  xp: number;
}

interface QuorumState {
  activeView: string;
  setActiveView: (view: string) => void;
  intelBriefs: IntelBrief[];
  addIntelBrief: (newBrief: IntelBrief) => void;
  missionLogs: MissionLogEntry[];
  addMissionLog: (newLog: MissionLogEntry) => void;
  unlockAchievement: (text: string, xp: number) => void;
  gameSaves: Record<string, any>;
  saveGameProgress: (gameId: string, saveData: any) => void;
  masteredSkills: string[];
  toggleSkillMastery: (skillId: string, xp: number) => void;
  savedHotspots: any[];
  saveHotspot: (hotspot: any) => void;
  presence: { id: string; name: string; status: string; lastSeen: string }[];
  updatePresence: (id: string, status: string) => void;
  healthData: { steps: number; heartRate: number; lastSync: string } | null;
  syncHealthData: (data: { steps: number; heartRate: number }) => void;
}

const useQuorumStore = create<QuorumState>()(
  persist(
    (set) => ({
      // --- UI NAVIGATION STATE ---
      activeView: 'dashboard',
      setActiveView: (view) => set({ activeView: view }),

      // --- GLOBAL INTELLIGENCE STATE ---
      intelBriefs: [
        {
          id: 'intel-init',
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
          type: 'SYSTEM CORE',
          content: 'The Quorum interface initialized. All operator modules online.',
          severity: 'info'
        }
      ],
      
      // Action to inject new intelligence from any module
      addIntelBrief: (newBrief) => set((state) => ({
        // Add the new brief to the top of the array, keep only the latest 50
        intelBriefs: [newBrief, ...state.intelBriefs].slice(0, 50)
      })),

      // --- MISSION LOG STATE ---
      missionLogs: [
        { id: 1, type: 'TASK', status: 'complete', text: 'Initialize Quorum Core', time: '08:00', xp: 100 }
      ],
      addMissionLog: (newLog) => set((state) => ({
        missionLogs: [newLog, ...state.missionLogs].slice(0, 100)
      })),

      unlockAchievement: (text, xp) => set((state) => {
        const newLog: MissionLogEntry = {
          id: Date.now(),
          type: 'ACHIEVEMENT',
          status: 'unlocked',
          text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
          xp
        };
        return { missionLogs: [newLog, ...state.missionLogs].slice(0, 100) };
      }),

      // --- GAME SAVES STATE ---
      gameSaves: {},
      saveGameProgress: (gameId, saveData) => set((state) => ({
        gameSaves: { ...state.gameSaves, [gameId]: saveData }
      })),

      // --- SKILL MASTERY STATE ---
      masteredSkills: [],
      toggleSkillMastery: (skillId, xp) => set((state) => {
        const isMastered = state.masteredSkills.includes(skillId);
        const newMastered = isMastered 
          ? state.masteredSkills.filter(id => id !== skillId)
          : [...state.masteredSkills, skillId];
        
        // If newly mastered, add to mission log
        let newLogs = state.missionLogs;
        if (!isMastered) {
          const log: MissionLogEntry = {
            id: Date.now(),
            type: 'TASK',
            status: 'complete',
            text: `Skill Mastered: ${skillId.split('_').pop()}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            xp
          };
          newLogs = [log, ...state.missionLogs].slice(0, 100);
        }

        return { 
          masteredSkills: newMastered,
          missionLogs: newLogs
        };
      }),

      // --- SIGNAL NEXUS PERSISTENCE ---
      savedHotspots: [],
      saveHotspot: (hotspot) => set((state) => ({
        savedHotspots: state.savedHotspots.some(h => h.bssid === hotspot.bssid)
          ? state.savedHotspots
          : [hotspot, ...state.savedHotspots].slice(0, 500)
      })),

      // --- OPERATOR PRESENCE ---
      presence: [
        { id: 'op-01', name: 'ZNEROX', status: 'online', lastSeen: 'NOW' },
        { id: 'op-02', name: 'NEURAL_LINK', status: 'away', lastSeen: '5M AGO' },
        { id: 'op-03', name: 'GHOST_SHELL', status: 'offline', lastSeen: '2H AGO' }
      ],
      updatePresence: (id, status) => set((state) => ({
        presence: state.presence.map(p => p.id === id ? { ...p, status, lastSeen: 'NOW' } : p)
      })),

      // --- BIO-NEURAL DATA ---
      healthData: null,
      syncHealthData: (data) => set({
        healthData: { ...data, lastSync: new Date().toISOString() }
      }),
    }),
    {
      name: 'QUORUM_V1_STORE',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useQuorumStore;
