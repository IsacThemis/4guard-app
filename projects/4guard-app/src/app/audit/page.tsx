import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ShieldAlert, ShieldCheck, History, Fingerprint, Lock, Download, Video } from "lucide-react";

export default function AuditPage() {
  return (
    <Shell>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl text-foreground font-work-sans font-bold">Monitor de Auditoría</h1>
            <p className="text-foreground/50 mt-2 font-inter text-lg">Blockchain Logging & CCTV (AUD-06)</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar SHA-256
            </Button>
            <div className="px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-lg flex items-center gap-2 font-inter text-sm font-bold text-secondary">
              <Lock className="w-4 h-4" />
              Logs Inmutables Activos
            </div>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <KPICard title="Eventos Críticos (24h)" value="12" icon={ShieldAlert} color="secondary" pulse />
           <KPICard title="Accesos Restringidos" value="142" icon={Fingerprint} color="accent" />
           <KPICard title="Compliance NOM-251" value="99.9%" icon={ShieldCheck} color="primary" />
        </div>

        {/* Immutable Log Table */}
        <Card className="overflow-hidden flex flex-col" noPadding>
            <div className="p-6 border-b border-foreground/5 bg-surface-lowest flex justify-between items-center">
                <h3 className="font-bold text-lg font-work-sans flex items-center">
                    <History className="w-5 h-5 mr-3 text-primary" />
                    Bitácora Inmutable (Tiempo Real)
                </h3>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-inter whitespace-nowrap">
                    <thead className="bg-foreground/5 text-foreground/40 uppercase tracking-widest text-[10px] font-bold">
                        <tr>
                            <th className="p-4">Timestamp (UTC)</th>
                            <th className="p-4">Evento</th>
                            <th className="p-4">Actor / Terminal</th>
                            <th className="p-4">Objeto (ID)</th>
                            <th className="p-4">Nivel Rielgo</th>
                            <th className="p-4 text-right">Hash</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5">
                        {[
                            { time: "2026-03-22 14:12:05", event: "Override Temperatura Bloqueo", actor: "SUP-05 (Carlos R.)", obj: "LT-2026-991", risk: "CRÍTICO", hash: "a8f5...2b9" },
                            { time: "2026-03-22 14:10:45", event: "Acceso Bóveda Controlados", actor: "MNG-01 (Ana L.)", obj: "ACC-ZON-C", risk: "ALTO", hash: "7c1e...d4f" },
                            { time: "2026-03-22 14:05:12", event: "Cruce Ciego Fallido", actor: "OP-14 (Juan P.)", obj: "PO-00129", risk: "MEDIO", hash: "9b3a...110" },
                            { time: "2026-03-22 14:01:00", event: "Autenticación Biométrica", actor: "OP-14 (Juan P.)", obj: "SYS-LOGIN", risk: "BAJO", hash: "f1a9...c8e" }
                        ].map((log, i) => (
                            <tr key={i} className="hover:bg-foreground/[0.02] transition-colors font-mono text-xs">
                                <td className="p-4 text-primary font-bold">{log.time}</td>
                                <td className="p-4">{log.event}</td>
                                <td className="p-4 text-foreground/70">{log.actor}</td>
                                <td className="p-4 font-bold max-w-[150px] truncate">{log.obj}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${
                                        log.risk === 'CRÍTICO' ? 'bg-secondary/10 text-secondary' : 
                                        log.risk === 'ALTO' ? 'bg-amber-500/10 text-amber-600' :
                                        log.risk === 'MEDIO' ? 'bg-orange-500/10 text-orange-600' :
                                        'bg-primary/10 text-primary'
                                    }`}>
                                        {log.risk}
                                    </span>
                                </td>
                                <td className="p-4 text-right text-foreground/30 font-mono tracking-widest">{log.hash}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-surface-lowest p-4 border-t border-foreground/5 text-center">
                <Button variant="ghost" size="sm" className="font-mono text-xs text-primary">Mostrar Todos los Registros</Button>
            </div>
        </Card>

        {/* Security Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card className="bg-surface-container border-foreground/5 h-[300px] flex items-center justify-center text-foreground/40 italic relative">
                <Video className="absolute top-4 left-6 w-5 h-5 text-primary" />
                <span className="absolute top-4 left-14 text-xs font-bold uppercase tracking-widest">Feed CCTV Integrado</span>
                <p>Módulo de visualización en tiempo real</p>
             </Card>
             <Card className="bg-surface-container border-foreground/5 h-[300px] flex items-center justify-center text-foreground/40 italic relative">
                <span className="absolute top-4 left-6 text-xs font-bold uppercase tracking-widest text-secondary">Mapa de Incidentes</span>
                <p>Heatmap de seguridad de la planta</p>
             </Card>
        </div>

      </div>
    </Shell>
  );
}

function KPICard({ title, value, icon: Icon, color, pulse }: { title: string, value: string, icon: React.ElementType, color: "primary" | "secondary" | "accent", pulse?: boolean }) {
  const colorClasses = {
    primary: "text-primary bg-primary/5 border-primary/20",
    secondary: "text-white bg-secondary border-secondary/20 shadow-md",
    accent: "text-accent bg-accent/5 border-accent/20",
  };

  return (
    <Card className={`hover:-translate-y-1 transition-transform border border-transparent ${colorClasses[color]} ${pulse ? 'pulse-critical' : ''}`}>
      <div className="flex justify-between flex-row-reverse items-start mb-2">
        <div className={`p-2 rounded-lg ${color === 'secondary' ? 'bg-white/20' : 'bg-white/50'} shadow-sm`}>
          <Icon className="w-6 h-6 text-current" />
        </div>
      </div>
      <h3 className={`text-3xl font-bold font-work-sans tracking-tight mb-1 ${color === 'secondary' ? 'text-white' : 'text-foreground'}`}>{value}</h3>
      <p className={`text-xs font-bold uppercase tracking-widest ${color === 'secondary' ? 'text-white/80' : 'text-foreground/60'}`}>{title}</p>
    </Card>
  );
}
