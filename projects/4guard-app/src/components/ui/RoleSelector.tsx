"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserRole, ROLES, useAppStore } from "@/store/useAppStore";
import { ChevronDown, Shield, Check, Monitor, Smartphone } from "lucide-react";
import { clsx } from "clsx";

const STORAGE_KEY = "4guard-user-role";
const VIEW_MODE_KEY = "4guard-view-mode";

export type ViewMode = "web" | "mobile";

export default function RoleSelector() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("web");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { userRole, setUserRole } = useAppStore();

  useEffect(() => {
    setIsHydrated(true);
    const storedRole = localStorage.getItem(STORAGE_KEY) as UserRole;
    const storedView = localStorage.getItem(VIEW_MODE_KEY) as ViewMode;
    if (storedRole && ROLES[storedRole]) {
      setUserRole(storedRole);
    }
    if (storedView === "mobile" || storedView === "web") {
      setViewMode(storedView);
    }
  }, [setUserRole]);

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem(STORAGE_KEY, role);
    setIsOpen(false);
  };

  const toggleViewMode = () => {
    const newMode = viewMode === "web" ? "mobile" : "web";
    setViewMode(newMode);
    localStorage.setItem(VIEW_MODE_KEY, newMode);
    if (newMode === "mobile") {
      router.push("/rf/tareas");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isHydrated) return null;

  const currentRole = ROLES[userRole];

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleViewMode}
        className={clsx(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-medium",
          viewMode === "mobile" 
            ? "bg-primary text-white" 
            : "bg-surface-high hover:bg-surface-container border border-foreground/10 text-foreground"
        )}
        title={viewMode === "mobile" ? "Ver versión móvil" : "Ver versión web"}
      >
        {viewMode === "mobile" ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
        <span className="hidden sm:inline">{viewMode === "mobile" ? "Móvil" : "Web"}</span>
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all",
            "bg-surface-high hover:bg-surface-container border border-foreground/10",
            "text-xs font-medium"
          )}
        >
          <Shield className="w-3.5 h-3.5 text-primary" />
          <span className="text-foreground">{currentRole.label}</span>
          <ChevronDown className={clsx("w-3.5 h-3.5 text-foreground/50 transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-surface-lowest rounded-lg shadow-xl border border-foreground/10 z-50 overflow-hidden">
            <div className="p-2 border-b border-foreground/5">
              <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">Seleccionar Rol</p>
            </div>
            <div className="p-2 space-y-1">
              {(Object.keys(ROLES) as UserRole[]).map((roleKey) => {
                const role = ROLES[roleKey];
                const isSelected = userRole === roleKey;
                return (
                  <button
                    key={roleKey}
                    onClick={() => handleRoleChange(roleKey)}
                    className={clsx(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all text-left",
                      isSelected
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-surface-container text-foreground"
                    )}
                  >
                    <div className={clsx("w-2 h-2 rounded-full", role.color)} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{role.label}</p>
                      <p className="text-[10px] text-foreground/50">{role.description}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}