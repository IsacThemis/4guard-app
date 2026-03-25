import { create } from "zustand";

export type UserRole = "OPERATOR" | "SUPERVISOR" | "INSPECTOR" | "MANAGER" | "AUDITOR";

interface RoleInfo {
  id: UserRole;
  label: string;
  description: string;
  color: string;
}

export const ROLES: Record<UserRole, RoleInfo> = {
  OPERATOR: { id: "OPERATOR", label: "Operador", description: "Terminal Móvil RF", color: "bg-blue-500" },
  SUPERVISOR: { id: "SUPERVISOR", label: "Supervisor", description: "Líder de Turno", color: "bg-purple-500" },
  INSPECTOR: { id: "INSPECTOR", label: "Inspector", description: "Calidad NOM-251", color: "bg-orange-500" },
  MANAGER: { id: "MANAGER", label: "Gerente", description: "Operaciones", color: "bg-green-500" },
  AUDITOR: { id: "AUDITOR", label: "Auditor", description: "Cumplimiento", color: "bg-gray-500" },
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  OPERATOR: ["/rf", "/rf/tareas", "/rf/picking", "/rf/anomalia", "/rf/anomalia/confirm"],
  SUPERVISOR: ["/", "/reception", "/reception/scan", "/reception/buffer", "/quality", "/inventory", "/expedition", "/expedition/picking", "/etiquetado", "/audit"],
  INSPECTOR: ["/", "/quality", "/quality/incidencias", "/inventory", "/audit"],
  MANAGER: ["/", "/reception", "/quality", "/inventory", "/expedition", "/etiquetado", "/audit"],
  AUDITOR: ["/", "/audit"],
};

interface AppState {
  isSidebarOpen: boolean;
  activeWarehouse: string | null;
  userRole: UserRole;
  setSidebarOpen: (open: boolean) => void;
  setActiveWarehouse: (id: string) => void;
  setUserRole: (role: UserRole) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: true,
  activeWarehouse: "WH-CENTRO-NORTE",
  userRole: "SUPERVISOR",
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setActiveWarehouse: (id) => set({ activeWarehouse: id }),
  setUserRole: (role) => set({ userRole: role }),
}));
