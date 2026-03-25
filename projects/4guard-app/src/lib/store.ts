import { create } from "zustand";

interface WMSState {
  alertsCount: number;
  incrementAlerts: () => void;
  resetAlerts: () => void;
  isAuthenticated: boolean;
  user: { name: string; role: string } | null;
  setAuthenticated: (status: boolean, user?: { name: string; role: string }) => void;
}

export const useStore = create<WMSState>((set) => ({
  alertsCount: 3,
  incrementAlerts: () => set((state) => ({ alertsCount: state.alertsCount + 1 })),
  resetAlerts: () => set({ alertsCount: 0 }),
  isAuthenticated: false,
  user: null,
  setAuthenticated: (status, user) => set({ isAuthenticated: status, user: user || null }),
}));
