"use client";

import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { clsx } from "clsx";
import { TrendingUp, AlertCircle, Box, Clock, Download, Filter, Plus } from "lucide-react";
import { useOperationalKPIs } from "@/lib/hooks";
import { ActivityChart } from "@/components/organisms/ActivityChart";

export default function Home() {
  const { data: kpis, isLoading } = useOperationalKPIs();

  return (
    <Shell>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl text-foreground font-work-sans font-bold">Torre de Control</h1>
            <p className="text-foreground/50 mt-2 font-inter text-lg">Centro de Distribución — Centro Norte (CN-01)</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Reporte PDF
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Recepción
            </Button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard 
            title="Saturación Almacén" 
            value={isLoading ? "..." : kpis?.inventoryOcupation || "0%"} 
            trend="+2.1%" 
            icon={Box} 
            color="primary"
          />
          <KPICard 
            title="Alertas Críticas" 
            value={isLoading ? "..." : (kpis?.qualityTotal?.toString().padStart(2, '0') || "00")} 
            trend="-1" 
            icon={AlertCircle} 
            color="secondary"
            pulse
          />
          <KPICard 
            title="Eficiencia Recepción" 
            value="94.2%" 
            trend="+5.4%" 
            icon={TrendingUp} 
            color="accent"
          />
          <KPICard 
            title="Expedición Hoy" 
            value={isLoading ? "..." : kpis?.expeditionToday?.toString() || "0"} 
            trend="+12" 
            icon={Clock} 
            color="primary"
          />
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 h-[450px] flex flex-col p-0 relative group overflow-hidden">
            <div className="p-6 border-b border-foreground/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/60 font-inter">Monitor de Actividad (24h)</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] bg-primary/5 text-primary px-2 py-1 rounded font-bold uppercase">En Vivo</span>
              </div>
            </div>
            <div className="flex-1 w-full">
              <ActivityChart />
            </div>
          </Card>
          
          <div className="space-y-6">
            <Card className="flex flex-col h-[210px] justify-center items-center text-center group cursor-pointer hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-surface-lowest flex items-center justify-center mb-4 shadow-inner border border-foreground/5">
                <p className="text-primary font-bold text-lg">CP</p>
              </div>
              <h4 className="text-lg font-bold text-foreground">Consulta de Pallets</h4>
              <p className="text-sm text-foreground/50 mt-1">Localización inmediata por SSCC</p>
            </Card>

            <Card className="flex flex-col h-[210px] justify-center items-center text-center group cursor-pointer hover:border-secondary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center mb-4 shadow-inner border border-secondary/10">
                <AlertCircle className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="text-lg font-bold text-foreground">NOM-251 Calidad</h4>
              <p className="text-sm text-foreground/50 mt-1">2 Lotes Pendientes de Liberación</p>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function KPICard({ 
  title, 
  value, 
  trend, 
  icon: Icon, 
  color,
  pulse = false 
}: { 
  title: string; 
  value: string; 
  trend: string; 
  icon: React.ElementType; 
  color: "primary" | "secondary" | "accent";
  pulse?: boolean;
}) {
  const colorClasses = {
    primary: "text-primary bg-primary/5 group-hover:bg-primary group-hover:text-white",
    secondary: "text-secondary bg-secondary/5 group-hover:bg-secondary group-hover:text-white",
    accent: "text-accent bg-accent/5 group-hover:bg-accent group-hover:text-white",
  };

  return (
    <Card className={clsx(
      "hover:shadow-lg transition-all cursor-pointer",
      pulse && "pulse-critical bg-white/80"
    )}>
      <div className="flex justify-between items-start mb-6">
        <div className={clsx(
          "p-2.5 rounded-xl transition-all duration-300",
          colorClasses[color]
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={clsx(
          "px-2 py-1 rounded-full text-[10px] font-bold font-inter tabular-nums",
          trend.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
        )}>
          {trend}
        </div>
      </div>
      <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-1">{title}</p>
      <h3 className="text-3xl text-foreground font-work-sans tabular-nums tracking-tight">{value}</h3>
    </Card>
  );
}
