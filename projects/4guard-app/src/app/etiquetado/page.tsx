"use client";

import React from "react";
import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { 
  Printer, 
  Settings, 
  FileText, 
  ArrowLeft,
  Barcode,
  RefreshCw,
  Search,
  Layout,
  CheckCircle2
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function EtiquetadoPage() {
  const router = useRouter();

  return (
    <Shell>
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-inter">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-work-sans font-bold text-slate-900 tracking-tight">Administración de Etiquetado</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Generación de SSCC GS1-128 • Master Labels</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sincronizar Zebra
            </Button>
            <Button variant="primary" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir Lote
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Label Designer / Preview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 bg-slate-50 flex items-center justify-center border-dashed border-2 border-slate-200">
              <div className="bg-white w-[400px] h-[580px] shadow-2xl rounded-sm p-6 flex flex-col items-center border border-slate-100 relative overflow-hidden ring-1 ring-slate-100">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-black tracking-tighter text-slate-900">4-GUARD SYSTEMS</h3>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Logistics Unit Label</p>
                </div>
                
                <div className="w-full border-2 border-slate-900 grid grid-cols-2 text-[10px] font-bold divide-x-2 divide-y-2 border-collapse">
                  <div className="p-2 col-span-2">FROM: HUBSPOT LOGISTICS PARK</div>
                  <div className="p-2 col-span-2 font-black text-xs uppercase">TO: CDMX - NORTH HUB (CN-01)</div>
                  <div className="p-2">SHIP DATE: 20-MAR-2024</div>
                  <div className="p-2">BATCH: QM-8821</div>
                  <div className="p-2 col-span-2">SKU: NES-200-CLAS / NESCAFE 200G</div>
                  <div className="p-2">QTY: 24 CASE</div>
                  <div className="p-2">PO: 45000912</div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center w-full gap-4 pt-4">
                   <div className="bg-slate-100 w-full h-8 flex items-center justify-center font-mono text-[9px] font-bold">(01) 07501000184729</div>
                   <div className="w-full h-32 bg-[repeating-linear-gradient(90deg,black,black_2px,transparent_2px,transparent_6px)]" />
                   <div className="font-mono text-lg font-black tracking-[0.3em]">003758291000184731</div>
                </div>

                <div className="absolute top-4 right-4 bg-emerald-500 text-white p-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <Button variant="outline" className="h-16 flex items-center justify-center gap-3 px-8">
                 <Layout className="w-6 h-6 text-primary" />
                 <div className="text-left">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Plantilla Activa</p>
                   <p className="text-sm font-black text-slate-800 uppercase">Estándar GS1-128 / Master</p>
                 </div>
              </Button>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            <Card className="space-y-6">
               <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                   <Settings className="w-4 h-4 text-primary" /> Configuración Zebra
                 </h3>
                 <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
               </div>
               
               <div className="space-y-4">
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tipo de Código</label>
                   <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary/20 transition-all">
                     <option>GS1-128 (Stacked)</option>
                     <option>DataMatrix</option>
                     <option>PDF417</option>
                   </select>
                 </div>
                 
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Prefijo de Empresa (7)</label>
                   <input type="text" value="3758291" readOnly className="w-full bg-slate-100 border border-slate-100 rounded-xl px-4 py-2 text-sm font-mono text-slate-500" />
                 </div>

                 <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Impresión Automática</span>
                    <div className="w-10 h-6 bg-emerald-500/20 rounded-full p-1 relative cursor-pointer">
                      <div className="w-4 h-4 bg-emerald-500 rounded-full absolute right-1" />
                    </div>
                 </div>
               </div>
            </Card>

            <Card className="bg-primary text-white space-y-4">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                    <Printer className="w-4 h-4" />
                 </div>
                 <h4 className="font-bold text-sm">Status de Impresora</h4>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-[11px] font-medium opacity-80">
                   <span>Zebra ZT411 — Line 01</span>
                   <span className="text-emerald-300 font-bold uppercase">Ready</span>
                 </div>
                 <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-emerald-300" />
                 </div>
                 <p className="text-[9px] font-bold tracking-widest opacity-50">PAPER REMAINING: 850 LABELS</p>
               </div>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  );
}
