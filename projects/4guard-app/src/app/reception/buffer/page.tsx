"use client";

import React from "react";
import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { 
  Package, 
  ArrowLeft, 
  CheckCircle2, 
  Warehouse, 
  Truck, 
  Barcode,
  Search,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

export default function ReceptionBufferPage() {
  const router = useRouter();

  const bufferItems = [
    { sscc: "003758291000184729", sku: "SKU-NES-200", qty: 24, status: "READY", location: "REC-BUF-01" },
    { sscc: "003758291000184730", sku: "SKU-NES-200", qty: 24, status: "READY", location: "REC-BUF-02" },
    { sscc: "003758291000184731", sku: "SKU-NES-200", qty: 24, status: "IN_TRANSIT", location: "ANDEN-04" },
  ];

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
              <h1 className="text-2xl font-work-sans font-bold text-slate-900 tracking-tight">Buffer de Almacenamiento</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Pallets Validados • Pendientes de Ubicación Final</p>
            </div>
          </div>
          <Button variant="primary" size="sm">
            Confirmar Almacenaje Masivo <Warehouse className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BufferStat icon={Truck} label="Arribados" value="12" subtext="ASN-2024-0812" color="blue" />
          <BufferStat icon={Barcode} label="Escaneados" value="03" subtext="En Buffer" color="primary" />
          <BufferStat icon={CheckCircle2} label="Listos" value="02" subtext="Validación QM OK" color="emerald" />
        </div>

        {/* Buffer Table */}
        <Card className="p-0 overflow-hidden border-slate-100">
          <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inventario en Tránsito Interior (REC-BUF)</h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Filtrar por SSCC..."
                className="w-full bg-white border border-slate-200 rounded-xl py-1.5 pl-9 pr-4 text-xs focus:ring-1 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b border-slate-50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">SSCC (Identificador)</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKU / Producto</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ubicación Actual</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bufferItems.map((item) => (
                  <tr key={item.sscc} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-700">{item.sscc}</td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-slate-700">{item.sku}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-medium">Cant: {item.qty} uds</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Warehouse className="w-4 h-4 text-primary/40" />
                        <span className="text-xs font-bold text-slate-600">{item.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter",
                        item.status === "READY" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                      )}>
                        {item.status === "READY" ? "Listo" : "En Andén"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold group-hover:bg-primary group-hover:text-white">
                        Ubicar <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Shell>
  );
}

function BufferStat({ icon: Icon, label, value, subtext, color }: {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  color: string;
}) {
  const colors: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    primary: "text-primary bg-primary/5 border-primary/10",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
  };

  return (
    <div className={clsx("p-5 rounded-3xl border flex items-center gap-4 bg-white", colors[color])}>
      <div className="p-3 rounded-2xl bg-white shadow-sm">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black">{value}</span>
          <span className="text-[9px] font-bold opacity-40 uppercase">{subtext}</span>
        </div>
      </div>
    </div>
  );
}
