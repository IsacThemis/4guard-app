import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Truck, Search, Calendar, PackageCheck, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { clsx } from "clsx";
import DockManager from "@/components/organisms/DockManager";

export default function ExpeditionPage() {
  return (
    <Shell>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl text-foreground font-work-sans font-bold">Gestión de Expedición</h1>
            <p className="text-foreground/50 mt-2 font-inter text-lg">Picking, Packing y Carga (EXP-05)</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input 
                type="text" 
                placeholder="Orden, Oleada o Transporte..."
                className="w-64 bg-white border border-foreground/10 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />
            </div>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Programa de Carga
            </Button>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <KPICard title="Órdenes Pendientes" value="34" icon={PackageCheck} color="accent" />
           <KPICard title="Líneas en Picking" value="1,245" icon={Truck} color="primary" />
           <KPICard title="Retraso de Carga" value="2" icon={AlertCircle} color="secondary" pulse />
           <KPICard title="Fill Rate (Hoy)" value="98.5%" icon={CheckCircle} color="primary" />
        </div>

        {/* Dock Management System (EXP-05-DRAG) */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="mb-6 flex items-center gap-6">
                <div className="h-10 w-2 bg-primary rounded-full"></div>
                <div>
                    <h2 className="text-2xl font-bold font-work-sans text-slate-900 leading-none">Dispatcher Master Control</h2>
                    <p className="text-slate-400 text-sm mt-1 font-inter font-medium tracking-tight">Asignación dinámica de andenes y monitoreo de estadía</p>
                </div>
            </div>
            
            <DockManager />
        </section>

        {/* Waves Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
            <Card className="lg:col-span-2 overflow-hidden flex flex-col" noPadding>
                <div className="p-6 border-b border-foreground/5 flex justify-between items-center bg-surface-lowest">
                    <h3 className="font-bold text-lg font-work-sans">Oleadas Activas (Wave Picking)</h3>
                    <Button variant="ghost" size="sm">Ver Todas</Button>
                </div>
                <div className="flex-1 overflow-auto p-4 space-y-4">
                    {[
                        { id: "WAV-2026-089", status: "En Proceso", progress: 65, lines: 450, time: "1h 15m" },
                        { id: "WAV-2026-090", status: "Liberada", progress: 10, lines: 120, time: "0h 10m" },
                        { id: "WAV-2026-091", status: "Pausada", progress: 85, lines: 600, time: "2h 30m" },
                    ].map((wave, i) => (
                        <div key={i} className="bg-white border border-foreground/5 rounded-xl p-4 flex items-center justify-between hover:border-primary/20 transition-all cursor-pointer shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={clsx(
                                    "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm",
                                    wave.status === 'En Proceso' ? 'bg-primary/10 text-primary' : wave.status === 'Pausada' ? 'bg-secondary/10 text-secondary' : 'bg-green-100 text-green-700'
                                )}>
                                    <Truck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold font-work-sans text-foreground">{wave.id}</h4>
                                    <div className="text-xs text-foreground/50 flex items-center gap-2 mt-1">
                                        <PackageCheck className="w-3 h-3" /> {wave.lines} líneas integradas
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-end gap-2 w-1/3">
                                <div className="flex justify-between w-full text-xs font-bold">
                                    <span className={clsx(
                                        wave.status === 'Pausada' ? 'text-secondary' : 'text-primary'
                                    )}>{wave.status}</span>
                                    <span className="text-foreground/60">{wave.progress}%</span>
                                </div>
                                <div className="w-full bg-foreground/5 rounded-full h-1.5 overflow-hidden">
                                    <div 
                                        className={clsx("h-full rounded-full transition-all", wave.status === 'Pausada' ? 'bg-secondary' : 'bg-primary')} 
                                        style={{ width: `${wave.progress}%` }}
                                    ></div>
                                </div>
                                <div className="text-[10px] text-foreground/40 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Tpo. Transcurrido: {wave.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="bg-slate-900 text-white p-8 relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <h3 className="text-2xl font-bold font-work-sans mb-4 relative z-10">Optimización AI</h3>
                <p className="text-white/60 text-sm font-inter leading-relaxed relative z-10">
                    Se recomienda priorizar la **Oleada 2026-091** para evitar cuellos de botella en el área de consolidación.
                </p>
                <Button variant="primary" className="mt-8 w-full bg-white text-slate-900 border-white hover:bg-white/90">
                    Aplicar Plan Sugerido
                </Button>
            </Card>
        </div>
      </div>
    </Shell>
  );
}

function DockItem({ number, status, transport, load, alert }: { number: string, status: string, transport: string, load: string, alert?: boolean }) {
    return (
        <div className="bg-white border border-foreground/5 rounded-lg p-3 flex justify-between items-center group cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
                <div className={clsx(
                    "w-10 h-10 rounded bg-foreground/5 text-foreground font-work-sans font-bold text-xl flex items-center justify-center border-b-2",
                    alert ? "border-secondary text-secondary" : status === 'Libre' ? "border-green-500 text-green-600" : "border-primary text-primary"
                )}>
                    {number}
                </div>
                <div>
                    <h5 className="font-bold text-sm text-foreground">{status}</h5>
                    <p className="text-xs text-foreground/50">{transport}</p>
                </div>
            </div>
            {status !== 'Libre' && (
                <div className="text-right">
                    <div className="text-xs font-bold text-primary">{load}</div>
                    <div className="text-[10px] text-foreground/40 uppercase tracking-wider">Carga</div>
                </div>
            )}
        </div>
    )
}

function KPICard({ title, value, icon: Icon, color, pulse }: { title: string, value: string, icon: React.ElementType, color: "primary" | "secondary" | "accent", pulse?: boolean }) {
  const colorClasses = {
    primary: "text-primary bg-primary/5 border-primary/20",
    secondary: "text-secondary bg-secondary/5 border-secondary/20",
    accent: "text-accent bg-accent/5 border-accent/20",
  };

  return (
    <Card className={clsx("hover:-translate-y-1 transition-transform border border-transparent", colorClasses[color], pulse && "pulse-critical bg-white/50")}>
      <div className="flex justify-between flex-row-reverse items-start mb-2">
        <div className={`p-2 rounded-lg bg-white/50 shadow-sm`}>
          <Icon className="w-5 h-5 text-current" />
        </div>
      </div>
      <h3 className="text-3xl font-bold font-work-sans text-foreground tracking-tight">{value}</h3>
      <p className="text-[11px] font-bold text-foreground/60 uppercase tracking-widest mt-1">{title}</p>
    </Card>
  );
}
