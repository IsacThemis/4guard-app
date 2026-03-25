"use client";

import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem, SpringCard, AnimatedNumber, ProgressBar } from "@/components/ui/Animation";
import { clsx } from "clsx";
import { TrendingUp, AlertCircle, Box, Clock, Download, Filter, Plus, ShieldCheck, Package, ClipboardList, FileSearch, CheckCircle, XCircle, Truck, Warehouse } from "lucide-react";
import { useOperationalKPIs } from "@/lib/hooks";
import { ActivityChart } from "@/components/organisms/ActivityChart";
import { useAppStore, ROLES } from "@/store/useAppStore";

export default function Home() {
  const { data: kpis, isLoading } = useOperationalKPIs();
  const { userRole } = useAppStore();

  const roleConfig = {
    SUPERVISOR: {
      title: "Torre de Control",
      subtitle: "Centro de Distribución — Centro Norte (CN-01)",
      actions: true,
    },
    MANAGER: {
      title: "Panel de Gerencia",
      subtitle: "Centro de Distribución — Centro Norte (CN-01)",
      actions: true,
    },
    INSPECTOR: {
      title: "Panel de Calidad",
      subtitle: "Cumplimiento NOM-251",
      actions: false,
    },
    AUDITOR: {
      title: "Panel de Auditoría",
      subtitle: "Trazabilidad y Compliance",
      actions: false,
    },
    OPERATOR: {
      title: "Terminal Operador",
      subtitle: "Sesión RF Activa",
      actions: false,
    },
  };

  const config = roleConfig[userRole] || roleConfig.SUPERVISOR;

  return (
    <Shell>
      <div className="max-w-7xl mx-auto space-y-8">
        <FadeIn>
          <DashboardHeader config={config} />
        </FadeIn>

        {userRole === "SUPERVISOR" && <SupervisorDashboard kpis={kpis} isLoading={isLoading} />}
        {userRole === "MANAGER" && <ManagerDashboard kpis={kpis} isLoading={isLoading} />}
        {userRole === "INSPECTOR" && <InspectorDashboard kpis={kpis} isLoading={isLoading} />}
        {userRole === "AUDITOR" && <AuditorDashboard />}
      </div>
    </Shell>
  );
}

function DashboardHeader({ config }: { config: { title: string; subtitle: string; actions: boolean } }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
      <div>
        <h1 className="text-4xl text-foreground font-work-sans font-bold">{config.title}</h1>
        <p className="text-foreground/50 mt-2 font-inter text-lg">{config.subtitle}</p>
      </div>
      {config.actions && (
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
      )}
    </div>
  );
}

function SupervisorDashboard({ kpis, isLoading }: { kpis?: any; isLoading: boolean }) {
  return (
    <>
      <StaggerContainer staggerDelay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StaggerItem><KPICard title="Saturación Almacén" value={isLoading ? "..." : kpis?.inventoryOcupation || "0%"} trend="+2.1%" icon={Box} color="primary" /></StaggerItem>
          <StaggerItem><KPICard title="Alertas Críticas" value={isLoading ? "..." : (kpis?.qualityTotal?.toString().padStart(2, '0') || "00")} trend="-1" icon={AlertCircle} color="secondary" pulse /></StaggerItem>
          <StaggerItem><KPICard title="Eficiencia Recepción" value="94.2%" trend="+5.4%" icon={TrendingUp} color="accent" /></StaggerItem>
          <StaggerItem><KPICard title="Expedición Hoy" value={isLoading ? "..." : kpis?.expeditionToday?.toString() || "0"} trend="+12" icon={Clock} color="primary" /></StaggerItem>
        </div>
      </StaggerContainer>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 h-[450px] flex flex-col p-0 relative group overflow-hidden">
          <div className="p-6 border-b border-foreground/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-foreground/60 font-inter">Monitor de Actividad (24h)</span>
            </div>
            <span className="text-[10px] bg-primary/5 text-primary px-2 py-1 rounded font-bold uppercase">En Vivo</span>
          </div>
          <div className="flex-1 w-full"><ActivityChart /></div>
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
    </>
  );
}

function ManagerDashboard({ kpis, isLoading }: { kpis?: any; isLoading: boolean }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Volumen Total" value="12,450" trend="+8.2%" icon={Package} color="primary" />
        <KPICard title="Tasa de Entrega" value="98.7%" trend="+2.1%" icon={Truck} color="accent" />
        <KPICard title="Costo por Unidad" value="$4.32" trend="-3.5%" icon={TrendingUp} color="primary" />
        <KPICard title="Ocupación" value={isLoading ? "..." : kpis?.inventoryOcupation || "0%"} trend="+2.1%" icon={Warehouse} color="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="h-[400px] flex flex-col p-0">
          <div className="p-6 border-b border-foreground/5">
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">Métricas de Negocio</span>
          </div>
          <div className="flex-1 p-6 space-y-4">
            <MetricBar label="Recepción" value={85} color="bg-primary" />
            <MetricBar label="Expedición" value={92} color="bg-accent" />
            <MetricBar label="Inventario" value={78} color="bg-green-500" />
            <MetricBar label="Calidad" value={96} color="bg-green-500" />
          </div>
        </Card>

        <Card className="h-[400px] flex flex-col p-0">
          <div className="p-6 border-b border-foreground/5">
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">Resumen Operativo</span>
          </div>
          <div className="flex-1 p-6 space-y-4">
            <div className="flex justify-between items-center p-3 bg-surface-low rounded-lg">
              <span className="text-sm font-medium">Recepciones Hoy</span>
              <span className="text-lg font-bold text-primary">24</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-surface-low rounded-lg">
              <span className="text-sm font-medium">Pedidos Procesados</span>
              <span className="text-lg font-bold text-accent">156</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-surface-low rounded-lg">
              <span className="text-sm font-medium">Horas Extra</span>
              <span className="text-lg font-bold text-secondary">12h</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-surface-low rounded-lg">
              <span className="text-sm font-medium">Eficiencia Global</span>
              <span className="text-lg font-bold text-green-600">94.2%</span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function InspectorDashboard({ kpis, isLoading }: { kpis?: any; isLoading: boolean }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Incidencias Abiertas" value={isLoading ? "..." : (kpis?.qualityTotal?.toString() || "0")} trend="-2" icon={AlertCircle} color="secondary" pulse />
        <KPICard title="Lotes en Revisión" value="8" trend="+3" icon={ClipboardList} color="accent" />
        <KPICard title="Liberados Hoy" value="12" trend="+5" icon={CheckCircle} color="accent" />
        <KPICard title="Rechazados" value="2" trend="0" icon={XCircle} color="secondary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 h-[400px] flex flex-col p-0">
          <div className="p-6 border-b border-foreground/5 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">Registro de Incidencias</span>
            <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-1 rounded font-bold">Crítico</span>
          </div>
          <div className="flex-1 p-6 overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-foreground/50">
                  <th className="pb-3">Folio</th>
                  <th className="pb-3">Tipo</th>
                  <th className="pb-3">Estado</th>
                  <th className="pb-3">Fecha</th>
                </tr>
              </thead>
              <tbody className="space-y-3">
                <tr className="border-b border-foreground/5">
                  <td className="py-2 font-mono text-sm">INC-2026-0142</td>
                  <td className="py-2 text-sm">Temperatura</td>
                  <td className="py-2"><span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] rounded-full font-bold">PENDIENTE</span></td>
                  <td className="py-2 text-sm text-foreground/50">25/03/2026</td>
                </tr>
                <tr className="border-b border-foreground/5">
                  <td className="py-2 font-mono text-sm">INC-2026-0141</td>
                  <td className="py-2 text-sm">Daño Empaque</td>
                  <td className="py-2"><span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] rounded-full font-bold">EN REVISIÓN</span></td>
                  <td className="py-2 text-sm text-foreground/50">25/03/2026</td>
                </tr>
                <tr className="border-b border-foreground/5">
                  <td className="py-2 font-mono text-sm">INC-2026-0140</td>
                  <td className="py-2 text-sm">Etiqueta</td>
                  <td className="py-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full font-bold">RESUELTO</span></td>
                  <td className="py-2 text-sm text-foreground/50">24/03/2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/60 mb-4">Estados de Calidad</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Aprobados</span>
                <span className="text-lg font-bold text-green-600">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">En Cuarentena</span>
                <span className="text-lg font-bold text-amber-600">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rechazados</span>
                <span className="text-lg font-bold text-red-600">8</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-secondary/5 border-secondary/20">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-secondary" />
              <h4 className="text-sm font-bold uppercase text-secondary">Alerta NOM-251</h4>
            </div>
            <p className="text-sm text-foreground/70">3 lotes requieren liberación antes de las 18:00 para cumplir con compromisos de entrega.</p>
          </Card>
        </div>
      </div>
    </>
  );
}

function AuditorDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Eventos Hoy" value="2,847" trend="+12%" icon={FileSearch} color="primary" />
        <KPICard title="Alteraciones" value="3" trend="0" icon={AlertCircle} color="secondary" />
        <KPICard title="Bloqueos" value="7" trend="-2" icon={ShieldCheck} color="accent" />
        <KPICard title="Trazabilidad" value="100%" trend="0" icon={CheckCircle} color="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 h-[450px] flex flex-col p-0">
          <div className="p-6 border-b border-foreground/5">
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/60 font-inter">Registro de Auditoría - Trazabilidad</span>
          </div>
          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-4">
              <AuditEvent time="14:32:05" user="admin.vault@almacen.com" action="BLOQUEO" details="Lote INC-2026-0142 bloqueado por calidad" />
              <AuditEvent time="14:15:22" user="operador.rf@almacen.com" action="ESCANEO" details="SSCC 003719283740112 escaneado en Bahía B-12" />
              <AuditEvent time="13:58:41" user="supervisor.turno@almacen.com" action="AJUSTE" details="Inventario ajustado: +24 unidades" />
              <AuditEvent time="13:42:18" user="system" action="AUTO-BLOQUEO" details="Temperatura excedida - Autobloqueo" />
              <AuditEvent time="13:21:55" user="inspector.calidad@almacen.com" action="LIBERACIÓN" details="Lote LT-X9901 liberado de cuarentena" />
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/60 mb-4">Integridad del Sistema</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm">Hash Chain Verificado</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Logs Inmutables</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Cifrado Activo</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Backup Verificado</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h4 className="text-sm font-bold uppercase text-primary">Estado de Cumplimiento</h4>
            </div>
            <p className="text-sm text-foreground/70 mb-4">Cumplimiento normativo al 100%</p>
            <div className="h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary w-full" style={{ width: '100%' }}></div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

function AuditEvent({ time, user, action, details }: { time: string; user: string; action: string; details: string }) {
  const actionColors: Record<string, string> = {
    BLOQUEO: "bg-red-100 text-red-700",
    ESCANEO: "bg-blue-100 text-blue-700",
    AJUSTE: "bg-amber-100 text-amber-700",
    "AUTO-BLOQUEO": "bg-red-100 text-red-700",
    LIBERACIÓN: "bg-green-100 text-green-700",
  };

  return (
    <div className="flex gap-4 p-3 bg-surface-low rounded-lg">
      <div className="text-xs font-mono text-foreground/50 w-20 shrink-0">{time}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={clsx("px-2 py-0.5 text-[10px] rounded font-bold", actionColors[action] || "bg-gray-100")}>{action}</span>
        </div>
        <p className="text-sm text-foreground">{details}</p>
        <p className="text-[10px] text-foreground/50 mt-1">{user}</p>
      </div>
    </div>
  );
}

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className="font-bold">{value}%</span>
      </div>
      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
        <div className={clsx("h-full rounded-full", color)} style={{ width: `${value}%` }}></div>
      </div>
    </div>
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
    <SpringCard className={clsx(
      "hover:shadow-lg transition-shadow",
      pulse && "pulse-critical"
    )}>
      <Card className="h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={clsx(
            "p-2.5 rounded-xl transition-all duration-300",
            colorClasses[color]
          )}>
            <Icon className="w-6 h-6" />
          </div>
          <div className={clsx(
            "px-2 py-1 rounded-full text-[10px] font-bold font-inter tabular-nums",
            trend.startsWith('+') ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30' : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30'
          )}>
            {trend}
          </div>
        </div>
        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-1">{title}</p>
        <h3 className="text-3xl text-foreground font-work-sans tabular-nums tracking-tight">{value}</h3>
      </Card>
    </SpringCard>
  );
}
