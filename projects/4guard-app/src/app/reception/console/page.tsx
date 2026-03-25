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
  Search,
  Filter,
  Dock,
  ArrowRight,
  ScanLine,
  Circle
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
  const getStatusInfo = (status: number) => {
    switch (status) {
      case 10:
        return { 
          label: "Pendiente", 
          color: "bg-slate-100 text-slate-600 border-slate-200",
          dotColor: "bg-slate-400",
          bgHover: "hover:bg-slate-50"
        };
      case 20:
        return { 
          label: "En Proceso", 
          color: "bg-amber-50 text-amber-700 border-amber-200",
          dotColor: "bg-amber-500",
          bgHover: "hover:bg-amber-50"
        };
      case 30:
        return { 
          label: "Cerrado", 
          color: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dotColor: "bg-emerald-500",
          bgHover: "hover:bg-emerald-50"
        };
      default:
        return { 
          label: "Unknown", 
          color: "bg-gray-50 text-gray-600 border-gray-200",
          dotColor: "bg-gray-400",
          bgHover: "hover:bg-gray-50"
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
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Consola de Recepción</h1>
            <p className="text-slate-500 mt-1 font-medium">Vista Unificada — REC-02 The Vault</p>
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

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          {/* Global Quadrature Card */}
          <Card className="col-span-1 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Cuadratura Global</span>
                <Dock className="w-5 h-5 text-slate-400" />
              </div>
              
              <div className="relative w-28 h-28 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                  <circle 
                    cx="50" cy="50" r="40" fill="none" 
                    stroke={globalQuadrature === 100 ? "#10b981" : "#f59e0b"} 
                    strokeWidth="10"
                    strokeDasharray={`${Math.min(globalQuadrature, 100) * 2.51} 251`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{globalQuadrature}%</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-slate-300">{totalScanned} / {totalExpected} pallets</p>
              </div>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Truck} label="En Andén" value="3" color="blue" />
            <StatCard icon={Clock} label="Pendientes" value="1" color="amber" />
            <StatCard icon={AlertTriangle} label="En Proceso" value="1" color="orange" />
            <StatCard icon={CheckCircle2} label="Cerrados" value="1" color="green" />
          </div>
        </div>

        {/* Main Table Card */}
        <Card noPadding className="overflow-hidden shadow-sm border-slate-200">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <h3 className="text-sm font-semibold text-slate-700">Recepciones en Proceso</h3>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por ASN o placas..."
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ASN</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Transportista</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Placas</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Andén</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hora</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cuadratura</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {receptionUnits.map((unit) => {
                  const statusInfo = getStatusInfo(unit.status);
                  const quadrature = getQuadrature(unit);
                  return (
                    <tr key={unit.id} className={clsx("transition-colors cursor-pointer", statusInfo.bgHover)}>
                      <td className="px-6 py-4">
                        <span className="font-mono font-semibold text-primary">{unit.asn}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{unit.carrier}</td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">{unit.plates}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">{unit.dock}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{unit.arrivalTime}</td>
                      <td className="px-6 py-4">
                        <span className={clsx("inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border", statusInfo.color)}>
                          <span className={clsx("w-2 h-2 rounded-full", statusInfo.dotColor)} />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={clsx("h-full rounded-full transition-all", quadrature === 100 ? "bg-emerald-500" : "bg-amber-500")}
                              style={{ width: `${quadrature}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-slate-600 w-10">{quadrature}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={unit.status === 10 ? "/reception" : "/reception/buffer"}>
                          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-primary">
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
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
    orange: "text-orange-600 bg-orange-50 border-orange-100",
    green: "text-emerald-600 bg-emerald-50 border-emerald-100",
  };

  const iconBg: Record<string, string> = {
    blue: "bg-blue-100",
    amber: "bg-amber-100",
    orange: "bg-orange-100",
    green: "bg-emerald-100",
  };

  return (
    <Card className={clsx("p-4 border shadow-sm", colors[color])}>
      <div className="flex items-center gap-4">
        <div className={clsx("p-2.5 rounded-xl", iconBg[color])}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="text-xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </Card>
  );
}
