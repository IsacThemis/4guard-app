"use client";

import React, { useState } from "react";
import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { 
  ArrowLeft, 
  ShieldAlert, 
  Clock, 
  User, 
  MapPin, 
  Package, 
  FileText, 
  Printer, 
  CheckCircle2, 
  X,
  Eye,
  Loader2
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { useQualityIncident } from "@/lib/hooks";

export default function IncidentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const folioId = params.folioId as string;
  const { data: incident, isLoading } = useQualityIncident(folioId);
  const [showPdf, setShowPdf] = useState(false);

  if (isLoading) {
    return (
      <Shell>
        <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="font-bold text-sm uppercase tracking-widest font-inter">Recuperando Folio {folioId}...</p>
        </div>
      </Shell>
    );
  }

  if (!incident) {
    return (
      <Shell>
        <div className="h-full flex flex-col items-center justify-center gap-6 text-slate-400">
          <ShieldAlert className="w-16 h-16 opacity-20" />
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900 font-work-sans">Folio no encontrado</h2>
            <p className="text-sm mt-1 font-inter">No existe registro para el ID: {folioId}</p>
          </div>
          <Button onClick={() => router.push("/quality")}>Regresar a Lista</Button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-inter">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-work-sans tracking-tight">Detalle de Incidencia: <span className="text-secondary">{incident.folio}</span></h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Bloqueo Preventivo Sanitario • Protocolo NOM-251</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowPdf(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Ver Acta PDF
            </Button>
            <Button variant="primary" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir Etiqueta Bloqueo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
             <Card className={clsx("p-8 border-l-4", incident.severity === "CRITICAL" ? "border-l-red-500" : "border-l-amber-500")}>
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className={clsx(
                        "w-12 h-12 rounded-2xl flex items-center justify-center",
                        incident.severity === "CRITICAL" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                    )}>
                      <ShieldAlert className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 uppercase font-headline">Estatus: {incident.status}</h3>
                      <p className="text-xs text-slate-500 font-medium italic">Acceso restringido para cualquier operación de picking o carga.</p>
                    </div>
                  </div>
                  <span className={clsx(
                      "text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest",
                      incident.severity === "CRITICAL" ? "bg-red-600" : "bg-amber-600"
                  )}>
                    {incident.severity}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-8">
                   <DetailItem icon={Package} label="SKU de Referencia" value={incident.sku} sub={incident.skuName} />
                   <DetailItem icon={MapPin} label="Ubicación Física" value={incident.location} sub={incident.locationDetail} />
                   <DetailItem icon={User} label="Reportado Por" value={incident.reportedBy} sub={incident.role} />
                   <DetailItem icon={Clock} label="Fecha y Hora" value={incident.timestamp.split(' ')[0]} sub={incident.timestamp.split(' ').slice(1).join(' ')} />
                </div>
             </Card>

             <Card className="bg-slate-50 border-none">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-inter">Descripción de Hallazgo</h4>
                 <p className="text-sm text-slate-700 leading-relaxed font-inter italic border-l-2 border-slate-200 pl-4">
                   &ldquo;{incident.description}&rdquo;
                 </p>
             </Card>

             <div className="flex gap-4">
                <Button className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white uppercase font-black tracking-widest shadow-xl shadow-emerald-600/20">
                  <CheckCircle2 className="w-5 h-5 mr-3" /> Liberar para Mermas
                </Button>
                <Button variant="outline" className="flex-1 h-14 uppercase font-black tracking-widest">
                  Solicitar Re-Inspección
                </Button>
             </div>
          </div>

          {/* Activity Log */}
          <div className="space-y-4">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 px-2 font-inter">
               Historial de Folio
             </h3>
             <div className="space-y-4 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                 {incident.history?.map((log) => (
                    <HistoryLogItem key={log.id} active={log.active} title={log.title} time={log.time} date={log.date} user={log.user} />
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Mockup */}
      <AnimatePresence>
        {showPdf && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/80 backdrop-blur-md"
               onClick={() => setShowPdf(false)}
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative bg-white w-full max-w-4xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
             >
                <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                   <div className="flex items-center gap-3">
                     <FileText className="w-6 h-6 text-primary" />
                     <h2 className="font-bold text-slate-800">Acta_De_Incidente_{incident.folio}.pdf</h2>
                   </div>
                   <button onClick={() => setShowPdf(false)} className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                     <X className="w-6 h-6" />
                   </button>
                </div>
                <div className="flex-1 bg-slate-400 p-8 overflow-y-auto flex justify-center">
                   <div className="bg-white w-[600px] min-h-[842px] shadow-xl p-12 text-slate-900 font-serif">
                      <div className="text-center mb-12">
                        <h1 className="text-2xl font-bold uppercase underline">Acta de Hallazgo de Calidad</h1>
                        <p className="text-sm mt-2">Protocolo NOM-251 / Auditoría Operativa</p>
                      </div>
                      
                      <div className="space-y-6 text-sm">
                        <p><strong>Folio:</strong> {incident.folio}</p>
                        <p><strong>Ubicación:</strong> {incident.location}</p>
                        <p><strong>Descripción:</strong> Se hace constar que al día de hoy, el producto arriba mencionado no cumple con los estándares de inocuidad...</p>
                        <div className="h-64 border border-dashed border-slate-300 flex items-center justify-center text-slate-300 rounded-xl bg-slate-50">
                           <div className="text-center">
                                <Package className="w-10 h-10 mx-auto mb-2 opacity-20" />
                                [ESPACIO PARA EVIDENCIA FOTOGRÁFICA]
                           </div>
                        </div>
                        <div className="pt-24 flex justify-around">
                          <div className="w-40 border-t border-black text-center pt-2 text-[10px] uppercase font-bold">Firma Inspector</div>
                          <div className="w-40 border-t border-black text-center pt-2 text-[10px] uppercase font-bold">Firma Operador</div>
                        </div>
                      </div>
                   </div>
                </div>
                <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
                   <Button variant="outline" onClick={() => setShowPdf(false)}>Cerrar Previsualización</Button>
                   <Button variant="primary">Descargar Documento</Button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Shell>
  );
}

function DetailItem({ icon: Icon, label, value, sub }: { 
  icon: React.ElementType; 
  label: string; 
  value: string; 
  sub?: string; 
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 font-inter">{label}</p>
        <p className="text-sm font-black text-slate-800 font-mono tracking-tight uppercase">{value}</p>
        <p className="text-[10px] text-slate-500 font-medium italic font-inter">{sub}</p>
      </div>
    </div>
  );
}

function HistoryLogItem({ title, time, date, user, active = false }: {
  title: string;
  time: string;
  date: string;
  user: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 relative pl-10 h-12">
      <div className={clsx(
        "absolute left-2.5 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center z-10",
        active ? "bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" : "bg-slate-200"
      )} />
      <div className="flex-1">
        <p className={clsx("text-xs font-bold font-inter", active ? "text-slate-900" : "text-slate-500")}>{title}</p>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase font-inter">
          <span>{time}</span>
          <span className="opacity-30">•</span>
          <span>{date}</span>
        </div>
      </div>
      <div className="text-[9px] font-black text-slate-400 border border-slate-100 px-1.5 py-0.5 rounded font-mono">
        {user}
      </div>
    </div>
  );
}
