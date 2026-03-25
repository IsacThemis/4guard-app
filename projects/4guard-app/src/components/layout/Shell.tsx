"use client";

import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Package, 
  ClipboardCheck, 
  Truck, 
  Boxes, 
  ShieldCheck, 
  Bell, 
  Search,
  Menu,
  X,
  User,
  Settings,
  ChevronRight,
  Printer,
  Smartphone,
  Monitor,
  Settings as SettingsIcon,
  LogOut
} from "lucide-react";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import AlertDrawer from "@/components/organisms/AlertDrawer";
import AssistantBot from "@/components/organisms/AssistantBot";
import GlobalSearchOverlay from "@/components/organisms/GlobalSearchOverlay";
import { useStore } from "@/lib/store";
import { useAppStore, ROLE_PERMISSIONS } from "@/store/useAppStore";
import RoleSelector from "@/components/ui/RoleSelector";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: "Torre de Control", href: "/", roles: ["SUPERVISOR", "MANAGER", "INSPECTOR", "AUDITOR"] },
  { icon: Package, label: "Nueva Recepción", href: "/reception", roles: ["SUPERVISOR", "MANAGER"] },
  { icon: Monitor, label: "Consola Recepción", href: "/reception/console", roles: ["SUPERVISOR", "MANAGER"] },
  { icon: ClipboardCheck, label: "Calidad", href: "/quality", roles: ["SUPERVISOR", "MANAGER", "INSPECTOR"] },
  { icon: Boxes, label: "Inventarios", href: "/inventory", roles: ["SUPERVISOR", "MANAGER", "INSPECTOR", "AUDITOR"] },
  { icon: Truck, label: "Expedición", href: "/expedition", roles: ["SUPERVISOR", "MANAGER"] },
  { icon: Printer, label: "Etiquetado", href: "/etiquetado", roles: ["SUPERVISOR", "MANAGER"] },
  { icon: ShieldCheck, label: "Auditoría", href: "/audit", roles: ["SUPERVISOR", "MANAGER", "INSPECTOR", "AUDITOR"] },
  { icon: Smartphone, label: "Terminal RF", href: "/rf", roles: ["OPERATOR"] },
  { icon: SettingsIcon, label: "Configuración", href: "/settings", roles: ["SUPERVISOR", "MANAGER", "INSPECTOR", "AUDITOR", "OPERATOR"] },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAlertDrawerOpen, setIsAlertDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, alertsCount } = useStore();
  const { userRole } = useAppStore();
  
  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));
  const allowedPaths = ROLE_PERMISSIONS[userRole];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-inter">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-primary-container text-white transition-all duration-300 ease-in-out flex flex-col z-50",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <ShieldCheck className="text-primary w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <span className="font-work-sans font-bold text-xl tracking-tight">4-GUARD</span>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group relative",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
                {isActive && isSidebarOpen && (
                  <div className="absolute right-3">
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </div>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-primary-container text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none border border-white/10 shadow-xl">
                    {item.label}
                  </div>
                )}
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5 text-white/60" /> : <Menu className="w-5 h-5 text-white/60" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden h-full">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 liquid-glass z-40 sticky top-0 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group cursor-pointer" onClick={() => setIsSearchOpen(true)}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors" />
              <input
                type="text"
                readOnly
                placeholder="Buscar SSCC, Lote o SKU..."
                className="w-full bg-background/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/20 outline-none placeholder:text-foreground/30 transition-all font-inter cursor-pointer hover:bg-background/80"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                 <span className="text-[10px] font-black border rounded px-1.5 py-0.5">CTRL</span>
                 <span className="text-[10px] font-black border rounded px-1.5 py-0.5">K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <RoleSelector />
            <button
              onClick={() => setIsAlertDrawerOpen(true)}
              className="relative p-2 rounded-full hover:bg-foreground/5 transition-colors group"
            >
              <Bell className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
              {alertsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-secondary text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                  {alertsCount}
                </span>
              )}
            </button>

            <div className="h-8 w-px bg-foreground/10 mx-2"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-foreground">Ing. {user?.name}</p>
                <p className="text-[10px] font-medium text-foreground/50 uppercase tracking-widest">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-high flex items-center justify-center border border-foreground/5 shadow-sm overflow-hidden group cursor-pointer hover:border-primary/20 transition-all">
                <User className="w-6 h-6 text-foreground/40 group-hover:text-primary transition-colors" />
              </div>
            </div>

            <button 
              className="p-2 rounded-lg hover:bg-foreground/5 transition-colors text-foreground/60 hover:text-primary"
              onClick={() => {
                useStore.getState().setAuthenticated(false);
                window.location.href = "/login";
              }}
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 relative dot-grid bg-background scroll-smooth">
          {children}
        </main>
      </div>

      <AlertDrawer
        isOpen={isAlertDrawerOpen}
        onClose={() => setIsAlertDrawerOpen(false)}
      />
      <GlobalSearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <AssistantBot />
    </div>
  );
}
