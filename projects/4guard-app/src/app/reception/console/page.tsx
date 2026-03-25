"use client";

import React, { useState } from "react";
import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import RoleGuard from "@/components/auth/RoleGuard";
import { 
  Truck,
  Package,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Search,
  Filter,
  Dock,
  ArrowRight,
  Circle,
  ScanLine
} from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";

interface ReceptionUnit {
  id: string;
  asn: string;
  carrier: string;
  plates: string;
  arrivalTime: string;
  status: 10 | 20 | 30;
  expected: number;
  scanned: number;
  dock: string;
}

const receptionUnits: ReceptionUnit[] = [
  { id: "1", asn: "ASN-2026-0142", carrier: "Logística Federal", plates: "ABC-1234", arrivalTime: "08:30", status: 10, expected: 24, scanned: 0, dock: "ANDEN-01" },
  { id: "2", asn: "ASN-2026-0141", carrier: "Transportes Atlas", plates: "XYZ-5678", arrivalTime: "09:15", status: 20, expected: 48, scanned: 36, dock: "ANDEN-02" },
  { id: "3", asn: "ASN-2026-0140", carrier: "Red Cargo", plates: "DEF-9012", arrivalTime: "10:00", status: 30, expected: 12, scanned: 12, dock: "ANDEN-03" },
];

export default function ReceptionConsolePage() {
  const [selectedUnit, setSelectedUnit] = useState<ReceptionUnit | null>(null);

  const getStatusInfo = (status: number) => {
    switch (status) {
      case 10:
        return { label: "Status 10", color: "bg-slate-400", text: "text-slate-600", desc: "Pendiente de Escaneo" };
      case 20:
        return { label: "Status 20", color: "bg-amber-500", text: "text-amber-600", desc: "En Proceso (Bolsa)" };
      case 30:
        return { label: "Status 30", color: "bg-green-500", text: "text-green-600", desc: "Cerrado/Liberado" };
      default:
        return { label: "Unknown", color: "bg-gray-400", text: "text-gray-600", desc: "" };
    }
  };

  const getQuadrature = (unit: ReceptionUnit) => {
    if (unit.expected === 0) return 0;
    return Math.round((unit.scanned / unit.expected) * 100);
  };

  const totalExpected = receptionUnits.reduce((acc, u) => acc + u.expected, 0);
  const totalScanned = receptionUnits.reduce((acc, u) => acc + u.scanned, 0);
  const globalQuadrature = totalExpected > 0 ? Math.round((totalScanned / totalExpected) * 100) : 0;

  return (
    <RoleGuard allowedRoles={["SUPERVISOR", "MANAGER"]}>
    <Shell>
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl text-foreground font-work-sans font-bold tracking-tight">Consola de Recepción</h1>
            <p className="text-foreground/50 mt-2 font-inter text-lg">Vista Unificada — REC-02 The Vault</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Link href="/reception">
              <Button variant="primary" size="sm">
                <ScanLine className="w-4 h-4 mr-2" />
                Nueva Recepción
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="col-span-1 lg:col-span-1 p-6 bg-primary-container text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/60">Cuadratura Global</h3>
              <Dock className="w-5 h-5 text-white/60" />
            </div>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke={globalQuadrature === 100 ? "#10b981" : "#f57009"} 
                  strokeWidth="8"
                  strokeDasharray={`${globalQuadrature * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-black">{globalQuadrature}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-xs">{totalScanned} / {totalExpected} pallets</p>
            </div>
          </Card>

          <div className="col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Truck} label="En Andén" value="3" color="blue" />
            <StatCard icon={Clock} label="Status 10" value="1" color="slate" />
            <StatCard icon={AlertTriangle} label="Status 20" value="1" color="amber" />
            <StatCard icon={CheckCircle2} label="Cerrados" value="1" color="green" />
          </div>
        </div>

        <Card noPadding className="overflow-hidden">
          <div className="p-4 border-b border-foreground/5 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/60">Recepciones en Proceso</h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
              <input
                type="text"
                placeholder="Buscar por ASN o placas..."
                className="w-full bg-white border border-foreground/10 rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b border-foreground/5">
                  <th className="px-6 py-4 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">ASN</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Transportista</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Placas</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Andén</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Hora</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Estado</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Cuadratura</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {receptionUnits.map((unit) => {
                  const statusInfo = getStatusInfo(unit.status);
                  const quadrature = getQuadrature(unit);
                  return (
                    <tr key={unit.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-primary">{unit.asn}</span>
                      </td>
                      <td className="px-6 py-4 text-sm">{unit.carrier}</td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">{unit.plates}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium">{unit.dock}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/60">{unit.arrivalTime}</td>
                      <td className="px-6 py-4">
                        <span className={clsx("px-2 py-1 rounded-full text-[10px] font-bold uppercase", statusInfo.color, statusInfo.text)}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={clsx("h-full rounded-full", quadrature === 100 ? "bg-green-500" : "bg-amber-500")}
                              style={{ width: `${quadrature}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold">{quadrature}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={unit.status === 10 ? "/reception" : "/reception/buffer"}>
                          <Button variant="ghost" size="sm" className="h-8">
                            Ver <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Shell>
    </RoleGuard>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    slate: "text-slate-600 bg-slate-50 border-slate-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
    green: "text-green-600 bg-green-50 border-green-100",
  };

  return (
    <Card className={clsx("p-4 border", colors[color])}>
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{label}</p>
          <p className="text-2xl font-black">{value}</p>
        </div>
      </div>
    </Card>
  );
}
