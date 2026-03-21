"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  ChevronRight, 
  Calendar, 
  Clock, 
  User,
  ShieldAlert,
  Download,
  CheckCircle2,
  MoreHorizontal
} from "lucide-react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, Tooltip } from 'recharts';

const SEVERITY_DATA = [
  { name: 'CRÍTICA', count: 2, color: '#ef4444' },
  { name: 'ALTA', count: 1, color: '#f59e0b' },
  { name: 'MEDIA', count: 1, color: '#3b82f6' },
];

interface Incident {
  id: string;
  folio: string;
  type: "NOM-251" | "DAMAGE" | "CONTAMINATION" | "MISMATCH";
  status: "BLOCKED" | "UNDER_REVIEW" | "RELEASED";
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  date: string;
  reportedBy: string;
  location: string;
  sku: string;
}

const MOCK_INCIDENTS: Incident[] = [
  {
    id: "1",
    folio: "INC-2024-8821",
    type: "NOM-251",
    status: "BLOCKED",
    severity: "CRITICAL",
    date: "2024-03-20 14:30",
    reportedBy: "Ing. Roberto M.",
    location: "04-A-12",
    sku: "NES-200-CLAS",
  },
  {
    id: "2",
    folio: "INC-2024-8822",
    type: "DAMAGE",
    status: "UNDER_REVIEW",
    severity: "HIGH",
    date: "2024-03-20 15:15",
    reportedBy: "Op. Laura S.",
    location: "RECC-02",
    sku: "GANS-050-PACK",
  },
  {
    id: "3",
    folio: "INC-2024-8790",
    type: "CONTAMINATION",
    status: "BLOCKED",
    severity: "CRITICAL",
    date: "2024-03-19 09:20",
    reportedBy: "Insp. Elena F.",
    location: "02-B-05",
    sku: "LECH-LALA-1L",
  },
  {
    id: "4",
    folio: "INC-2024-8780",
    type: "MISMATCH",
    status: "RELEASED",
    severity: "MEDIUM",
    date: "2024-03-18 11:45",
    reportedBy: "Sup. Carlos R.",
    location: "AND-03",
    sku: "ABAR-GEN",
  }
];

export default function QualityIncidentsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredIncidents = MOCK_INCIDENTS.filter(inc => {
    if (filter !== "ALL" && inc.status !== filter) return false;
    if (search && !inc.folio.includes(search) && !inc.sku.includes(search)) return false;
    return true;
  });

  return (
    <Shell>
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-inter">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert className="w-5 h-5 text-secondary" />
              <h1 className="text-2xl font-work-sans font-bold text-slate-900 tracking-tight">Registro de Incidencias</h1>
            </div>
            <p className="text-sm text-slate-500 font-medium tracking-wide">Gestión Integral de Calidad y Bloqueos de Seguridad</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar Protocolo
            </Button>
            <Button variant="danger" size="sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Nuevo Reporte NOM-251
            </Button>
          </div>
        </div>

        {/* Filters and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats Summary */}
          <div className="space-y-4 lg:col-span-1">
            <IncidentStat label="Bloqueos Activos" value="02" color="secondary" active />
            <IncidentStat label="En Revisión" value="01" color="amber" />
            <IncidentStat label="Liberados (24h)" value="14" color="emerald" />
            
            <Card className="p-4 h-48 bg-slate-50/50 border-slate-100">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Severidad de Incidencias</p>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SEVERITY_DATA} layout="vertical" margin={{ left: -10, right: 10 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700 }} width={50} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={12}>
                      {SEVERITY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* List Section */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search and Tabs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 p-2 rounded-2xl">
              <div className="flex gap-1">
                <FilterTab label="Todos" active={filter === "ALL"} onClick={() => setFilter("ALL")} count={4} />
                <FilterTab label="Bloqueados" active={filter === "BLOCKED"} onClick={() => setFilter("BLOCKED")} count={2} color="secondary" />
                <FilterTab label="Revisión" active={filter === "UNDER_REVIEW"} onClick={() => setFilter("UNDER_REVIEW")} count={1} color="amber" />
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar Folio o SKU..."
                  className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Incidents List */}
            <div className="space-y-3">
              {filteredIncidents.map((incident) => (
                <Card 
                  key={incident.id} 
                  className="hover:shadow-md transition-all group cursor-pointer border-slate-100 hover:border-primary/20"
                  onClick={() => router.push(`/quality/incidencias/${incident.folio}`)}
                >
                  <div className="flex items-center gap-6">
                    {/* Status Badge */}
                    <div className={clsx(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                      incident.status === "BLOCKED" ? "bg-red-50 text-red-600 border border-red-100 shadow-[0_0_15px_rgba(239,68,68,0.15)]" :
                      incident.status === "UNDER_REVIEW" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                      "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    )}>
                      {incident.status === "BLOCKED" ? <ShieldAlert className="w-6 h-6" /> : 
                       incident.status === "UNDER_REVIEW" ? <Clock className="w-6 h-6" /> : 
                       <CheckCircle2 className="w-6 h-6" />}
                    </div>

                    {/* Main Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-black text-slate-800 font-mono tracking-tighter">{incident.folio}</span>
                        <span className={clsx(
                          "text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest",
                          incident.severity === "CRITICAL" ? "bg-red-600 text-white" :
                          incident.severity === "HIGH" ? "bg-amber-500 text-white" :
                          "bg-blue-500 text-white"
                        )}>
                          {incident.severity}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">{incident.type}</p>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <p className="text-xs text-slate-400 font-medium">SKU: <span className="text-slate-600 font-bold">{incident.sku}</span></p>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <p className="text-xs text-slate-400 font-medium">Ubicación: <span className="text-slate-600 font-bold">{incident.location}</span></p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="hidden md:flex flex-col items-end gap-1 px-6 border-l border-slate-50">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                        <User className="w-3 h-3" /> {incident.reportedBy}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                        <Calendar className="w-3 h-3" /> {incident.date}
                      </div>
                    </div>

                    {/* Action */}
                    <button className="p-2 rounded-xl hover:bg-slate-50 text-slate-300 group-hover:text-primary transition-colors">
                      <MoreHorizontal className="w-6 h-6" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
            
            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] py-8">
              — Fin de los Registros Recientes —
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function IncidentStat({ label, value, color, active = false }: { label: string, value: string, color: string, active?: boolean }) {
  const colorClasses = {
    secondary: "text-secondary bg-secondary/5 border-secondary/10",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
  } as Record<string, string>;

  return (
    <div className={clsx(
      "p-6 rounded-3xl border transition-all cursor-pointer group",
      active ? colorClasses[color] : "bg-white border-slate-100 hover:border-slate-200"
    )}>
      <p className={clsx(
        "text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-70",
        active ? "text-current" : "text-slate-400"
      )}>{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-work-sans font-black tracking-tighter">{value}</span>
        {active && <div className="w-2 h-2 rounded-full bg-current animate-pulse mb-1.5" />}
      </div>
    </div>
  );
}

function FilterTab({ label, active, onClick, count, color = "primary" }: { label: string, active: boolean, onClick: () => void, count: number, color?: string }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
        active ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
      )}
    >
      {label}
      <span className={clsx(
        "px-1.5 py-0.5 rounded text-[8px] font-black",
        active ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-500"
      )}>
        {count.toString().padStart(2, '0')}
      </span>
    </button>
  );
}
