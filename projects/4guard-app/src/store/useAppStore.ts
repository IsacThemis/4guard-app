import { create } from "zustand";

interface AppState {
  isSidebarOpen: boolean;
  activeWarehouse: string | null;
  userRole: "OPERATOR" | "SUPERVISOR" | "INSPECTOR" | "MANAGER" | "AUDITOR";
  setSidebarOpen: (open: boolean) => void;
  setActiveWarehouse: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: true,
  activeWarehouse: "WH-CENTRO-NORTE",
  userRole: "SUPERVISOR",
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setActiveWarehouse: (id) => set({ activeWarehouse: id }),
}));
