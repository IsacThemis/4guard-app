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
        return { 
          label: "Pendiente", 
          color: "bg-slate-100 text-slate-600 border-slate-200",
          dotColor: "bg-slate-400",
          desc: "Pendiente de Escaneo" 
        };
      case 20:
        return { 
          label: "En Proceso", 
          color: "bg-amber-50 text-amber-700 border-amber-200",
          dotColor: "bg-amber-500",
          desc: "En Proceso (Bolsa)" 
        };
      case 30:
        return { 
          label: "Cerrado", 
          color: "bg-green-50 text-green-700 border-green-200",
          dotColor: "bg-green-500",
          desc: "Cerrado/Liberado" 
        };
      default:
        return { 
          label: "Unknown", 
          color: "bg-gray-50 text-gray-600 border-gray-200",
          dotColor: "bg-gray-400",
          desc: "" 
        };
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
                  strokeDasharray={`${Math.min(globalQuadrature, 100) * 2.51} 251`}
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
          <div className="p-5 border-b border-foreground/5 flex items-center justify-between bg-[var(--surface-low)]">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Recepciones en Proceso</h3>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
              <input
                type="text"
                placeholder="Buscar por ASN o placas..."
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[var(--surface-low)] border-b border-foreground/5">
                  <th className="px-6 py-4 text-xs font-semibold text-foreground/50 uppercase tracking-wider">ASN</th>
                  <th className="px-6 py-4 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Transportista</th>
                  <th className="px-6 py-4 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Placas</th>
                  <th className="px-6 py-4 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Andén</th>
                  <th className="px-6 py-4 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Hora</th>
                  <th className="px-6 py-4 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Cuadratura</th>
                  <th className="px-6 py-4 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {receptionUnits.map((unit) => {
                  const statusInfo = getStatusInfo(unit.status);
                  const quadrature = getQuadrature(unit);
                  return (
                    <tr key={unit.id} className="hover:bg-[var(--surface-low)] transition-colors">
                      <td className="px-6 py-5">
                        <span className="font-mono font-bold text-primary text-sm">{unit.asn}</span>
                      </td>
                      <td className="px-6 py-5 text-sm text-foreground/80">{unit.carrier}</td>
                      <td className="px-6 py-5">
                        <span className="font-mono text-sm bg-[var(--surface-container)] px-3 py-1.5 rounded-lg">{unit.plates}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-foreground/80">{unit.dock}</span>
                      </td>
                      <td className="px-6 py-5 text-sm text-foreground/60">{unit.arrivalTime}</td>
                      <td className="px-6 py-5">
                        <span className={clsx("inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border", statusInfo.color)}>
                          <span className={clsx("w-2 h-2 rounded-full", statusInfo.dotColor)} />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-2 bg-[var(--surface-container)] rounded-full overflow-hidden">
                            <div 
                              className={clsx("h-full rounded-full transition-all", quadrature === 100 ? "bg-green-500" : "bg-amber-500")}
                              style={{ width: `${quadrature}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-foreground/70">{quadrature}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <Link href={unit.status === 10 ? "/reception" : "/reception/buffer"}>
                          <Button variant="ghost" size="sm" className="h-9">
                            Ver <ArrowRight className="w-4 h-4 ml-1" />
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
    blue: "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800",
    slate: "text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-700/30 border-slate-100 dark:border-slate-600",
    amber: "text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-700",
    green: "text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-900/20 border-green-100 dark:border-green-800",
  };

  return (
    <Card className={clsx("p-5 border", colors[color])}>
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-xl bg-white/50 dark:bg-white/5">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </Card>
  );
}
