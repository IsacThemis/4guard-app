import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { AlertCircle, FileCheck, Info, XCircle, FileWarning, Search } from "lucide-react";

export default function QualityPage() {
  return (
    <Shell>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl text-foreground font-work-sans font-bold">Gestión de Calidad</h1>
            <p className="text-foreground/50 mt-2 font-inter text-lg">Liberación y Retenciones (QM-03)</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input 
                type="text" 
                placeholder="Buscar Lote o SSCC..."
                className="w-64 bg-white border border-foreground/10 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />
            </div>
            <Button variant="outline">Filtros</Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Card className="flex items-center gap-4 border-l-4 border-l-secondary bg-secondary/5">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                    <AlertCircle className="w-6 h-6 text-secondary" />
                </div>
                <div>
                    <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Retenidos por NOM-251</p>
                    <h4 className="text-2xl font-bold text-foreground font-work-sans">12 Lotes</h4>
                </div>
           </Card>
           
           <Card className="flex items-center gap-4 border-l-4 border-l-amber-500 bg-amber-500/5">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                    <FileWarning className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                    <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Pendientes de Muestreo</p>
                    <h4 className="text-2xl font-bold text-foreground font-work-sans">5 Pallets</h4>
                </div>
           </Card>

           <Card className="flex items-center gap-4 border-l-4 border-l-green-600 bg-green-600/5">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                    <FileCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Liberados Hoy</p>
                    <h4 className="text-2xl font-bold text-foreground font-work-sans">48 Lotes</h4>
                </div>
           </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* List of pending items */}
            <Card className="lg:col-span-2 overflow-hidden flex flex-col" noPadding>
                <div className="p-6 border-b border-foreground/5 flex justify-between items-center bg-surface-lowest">
                    <h3 className="font-bold text-lg font-work-sans flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 text-secondary" />
                        Lotes con Bloqueo Crítico
                    </h3>
                </div>
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left text-sm font-inter">
                        <thead className="bg-foreground/5 text-foreground/40 uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="p-4 font-bold">Lote / SKU</th>
                                <th className="p-4 font-bold">Motivo</th>
                                <th className="p-4 font-bold">Fecha / Antigüedad</th>
                                <th className="p-4 font-bold text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/5">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-foreground/[0.02] transition-colors cursor-pointer">
                                    <td className="p-4">
                                        <div className="font-bold text-foreground">LT-2026-99{i}</div>
                                        <div className="text-xs text-foreground/50">SKU: VACUNA-TTV-01</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded bg-secondary/10 text-secondary text-xs font-bold">
                                            Ruptura Cadena de Frío
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-foreground">22 Mar 2026</div>
                                        <div className="text-xs text-secondary font-medium">12h 45m</div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button variant="outline" size="sm">Evaluar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Selected item Detail */}
            <Card className="bg-surface-container border-foreground/5">
                <h3 className="font-bold text-lg font-work-sans mb-4">Detalle de Anomalía</h3>
                
                <div className="p-4 bg-white rounded-lg border border-secondary/20 shadow-sm relative overflow-hidden mb-6">
                    <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-secondary">Alerta de Temperatura</h4>
                        <span className="px-2 py-0.5 bg-secondary text-white text-[10px] font-bold uppercase rounded">Crítico</span>
                    </div>
                    <p className="text-sm text-foreground/70 font-inter leading-relaxed">
                        El sensor TEMP-ZN-04 registró una lectura de <strong>9.2°C</strong> (rango permitido: 2°C - 8°C) durante 45 minutos.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between pb-3 border-b border-foreground/5">
                        <span className="text-foreground/50 text-sm">Contenedor</span>
                        <span className="font-bold text-foreground font-mono">SSCC-00123912093</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-foreground/5">
                        <span className="text-foreground/50 text-sm">Cantidad Afectada</span>
                        <span className="font-bold text-foreground">1,200 unds</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-foreground/5">
                        <span className="text-foreground/50 text-sm">Dictamen</span>
                        <span className="font-bold text-foreground/30 italic text-sm">Pendiente Análisis</span>
                    </div>
                </div>

                <div className="mt-8 space-y-3">
                    <Button variant="danger" className="w-full">
                        <XCircle className="w-4 h-4 mr-2" /> Declarar Rechazo Total
                    </Button>
                    <Button variant="outline" className="w-full">
                        <Info className="w-4 h-4 mr-2" /> Solicitar Re-muestreo
                    </Button>
                </div>
            </Card>
        </div>
      </div>
    </Shell>
  );
}
