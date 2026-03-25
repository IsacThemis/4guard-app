import { create } from "zustand";

interface WMSState {
  alertsCount: number;
  incrementAlerts: () => void;
  resetAlerts: () => void;
  isAuthenticated: boolean;
  user: { name: string; role: string } | null;
  setAuthenticated: (status: boolean, user?: { name: string; role: string }) => void;
}

const getInitialState = () => {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, user: null };
  }
  const stored = localStorage.getItem("4guard-auth");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { isAuthenticated: false, user: null };
    }
  }
  return { isAuthenticated: false, user: null };
};

export const useStore = create<WMSState>((set, get) => ({
  alertsCount: 3,
  incrementAlerts: () => set((state) => ({ alertsCount: state.alertsCount + 1 })),
  resetAlerts: () => set({ alertsCount: 0 }),
  ...getInitialState(),
  setAuthenticated: (status, user) => {
    const newState = { isAuthenticated: status, user: user || null };
    set(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("4guard-auth", JSON.stringify(newState));
    }
  },
}));
