"use client";

import React, { useState } from "react";
import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { 
  Boxes, 
  Map as MapIcon, 
  Search, 
  PackageMinus, 
  ArrowDownUp, 
  RefreshCw 
} from "lucide-react";
import { clsx } from "clsx";
import BayDetailDrawer from "@/components/organisms/BayDetailDrawer";
import { useInventory, useOperationalKPIs } from "@/lib/hooks";
import InventoryTopology2D from "@/components/organisms/InventoryTopology2D";

export default function InventoryPage() {
  const [selectedBay, setSelectedBay] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: inventory, isLoading: invLoading } = useInventory();
  const { data: kpis, isLoading: kpiLoading } = useOperationalKPIs();

  const handleOpenBay = (id: string) => {
    setSelectedBay(id);
    setIsDrawerOpen(true);
  };
  return (
    <Shell>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl text-foreground font-work-sans font-bold">Control de Inventarios</h1>
            <p className="text-foreground/50 mt-2 font-inter text-lg">Visibilidad y Conteo Ciclos (INV-04)</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input 
                type="text" 
                placeholder="SSCC, SKU o Ubicación..."
                className="w-64 bg-white border border-foreground/10 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />
            </div>
            <Button variant="primary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Nuevo Conteo
            </Button>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <KPICard title="Ocupación Global" value={kpiLoading ? "..." : kpis?.inventoryOcupation || "0%"} icon={MapIcon} color="primary" />
           <KPICard title="Pallets Activos" value="14,205" icon={Boxes} color="accent" />
           <KPICard title="Bajo Stock (SKUs)" value="128" icon={PackageMinus} color="secondary" />
           <KPICard title="Movimientos Hoy" value={kpiLoading ? "..." : kpis?.expeditionToday?.toString() || "0"} icon={ArrowDownUp} color="primary" />
        </div>

        {/* Layout Map & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 h-[750px] flex flex-col relative bg-surface-container overflow-hidden group/rack" noPadding>
                <div className="absolute top-4 left-6 flex items-center gap-2 not-italic z-30">
                    <div className="w-2 h-6 bg-primary rounded-full"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-900">Inventory Topology (INV-01)</span>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-2">2D Alpha Sector</span>
                </div>
                
                <InventoryTopology2D onSelectBay={handleOpenBay} />

                <div className="absolute bottom-6 right-6 z-30 bg-slate-900/90 text-white px-4 py-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl opacity-0 group-hover/rack:opacity-100 transition-opacity duration-500 max-w-xs">
                    <p className="text-[9px] font-inter font-medium leading-relaxed italic opacity-80">
                        Visualización topográfica 2D optimizada para alta densidad de datos y respuesta rápida.
                    </p>
                </div>
            </Card>

            <div className="space-y-6">
                <Card noPadding className="flex flex-col h-[500px]">
                    <div className="p-5 border-b border-foreground/5 bg-surface-lowest">
                        <h3 className="font-bold text-lg font-work-sans">Ubicaciones Críticas</h3>
                    </div>
                    <div className="flex-1 overflow-auto p-2">
                        {invLoading ? (
                            <div className="p-8 text-center text-slate-400 font-inter py-20">Cargando ubicaciones...</div>
                        ) : inventory?.map((item, i) => (
                            <div 
                                key={item.id} 
                                onClick={() => handleOpenBay(item.id)}
                                className="flex items-center justify-between p-3 hover:bg-foreground/5 rounded-lg cursor-pointer transition-colors border-b border-foreground/5 last:border-0"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={clsx(
                                        "w-8 h-8 rounded-full flex items-center justify-center",
                                        item.status === "LOCKED" ? "bg-secondary/10" : "bg-primary/10"
                                    )}>
                                        <PackageMinus className={clsx("w-4 h-4", item.status === "LOCKED" ? "text-secondary" : "text-primary")} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-foreground">{item.id}</div>
                                        <div className="text-[10px] text-foreground/50 uppercase font-bold tracking-tighter">SKU: {item.sku} • {item.quantity} pz</div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className={clsx(
                                        "text-[9px] font-bold px-1.5 py-0.5 rounded mb-1",
                                        item.status === "LOCKED" ? "bg-secondary text-white" : "bg-green-500 text-white"
                                    )}>
                                        {item.status}
                                    </span>
                                    <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={(e) => { e.stopPropagation(); handleOpenBay(item.id); }}>Ver Detalle</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>

        <BayDetailDrawer 
            isOpen={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)} 
            bayId={selectedBay} 
        />
      </div>
    </Shell>
  );
}

function KPICard({ title, value, icon: Icon, color }: { title: string, value: string, icon: React.ElementType, color: "primary" | "secondary" | "accent" }) {
  const colorClasses = {
    primary: "text-primary bg-primary/5",
    secondary: "text-secondary bg-secondary/5",
    accent: "text-accent bg-accent/5",
  };

  return (
    <Card className="hover:shadow-lg transition-all border-l-4" style={{ borderLeftColor: `var(--${color})` }}>
      <div className="flex justify-between items-start mb-2">
        <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">{title}</p>
        <div className={`p-1.5 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <h3 className="text-3xl font-bold font-work-sans text-foreground">{value}</h3>
    </Card>
  );
}
