"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Shell from "@/components/layout/Shell";
import { 
    Truck, 
    Box, 
    Clock, 
    Users, 
    ChevronLeft, 
    MoreVertical, 
    Search,
    Filter,
    ArrowUpRight,
    MapPin
} from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Cell
} from "recharts";

const MOCK_ITEMS = [
    { id: "1", sku: "NKE-882-BL", desc: "Air Max Pulse - Blue 28", loc: "A-12-04", qty: 12, picked: 12, status: "Complete" },
    { id: "2", sku: "AD-GL-992", desc: "Gazelle OG - Light 27", loc: "B-04-11", qty: 8, picked: 4, status: "Picking" },
    { id: "3", sku: "PU-RS-001", desc: "RS-X Efekt - White 26", loc: "A-01-08", qty: 24, picked: 0, status: "Pending" },
    { id: "4", sku: "VANS-OW-2", desc: "Old Skool - Black 29", loc: "D-22-15", qty: 15, picked: 15, status: "Complete" },
    { id: "5", sku: "RE-CL-044", desc: "Club C 85 - Vintage 28", loc: "C-11-09", qty: 10, picked: 0, status: "Pending" },
];

const ZONE_DATA = [
    { name: "Zona A", value: 85, color: "#1a237e" },
    { name: "Zona B", value: 45, color: "#3949ab" },
    { name: "Zona C", value: 12, color: "#7986cb" },
    { name: "Zona D", value: 98, color: "#c5cae9" },
];

export default function PickingWaveDetailPage() {
    const params = useParams();
    const waveId = params.waveId as string;

    const stats = useMemo(() => ({
        totalItems: MOCK_ITEMS.reduce((acc, curr) => acc + curr.qty, 0),
        pickedItems: MOCK_ITEMS.reduce((acc, curr) => acc + curr.picked, 0),
        progress: (MOCK_ITEMS.reduce((acc, curr) => acc + curr.picked, 0) / MOCK_ITEMS.reduce((acc, curr) => acc + curr.qty, 0)) * 100
    }), []);

    return (
        <Shell>
            <div className="p-8 max-w-[1600px] mx-auto space-y-8">
                
                {/* Navigation & Header */}
                <div className="flex flex-col gap-4">
                    <Link href="/expedition" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest font-inter">Control de Expedición</span>
                    </Link>
                    
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-4xl font-work-sans font-black text-slate-900 tracking-tight uppercase">
                                    Oleada {waveId}
                                </h1>
                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-200">
                                    En Proceso
                                </span>
                            </div>
                            <p className="text-slate-500 font-inter flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> Transportes FedEx (EXPRESS)</span>
                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Inicio: 12 OCT 2026 - 08:30 AM</span>
                            </p>
                        </div>
                        
                        <div className="flex gap-3">
                            <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                                <Users className="w-4 h-4" /> Asignar Pickers
                            </button>
                            <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors flex items-center gap-2 uppercase tracking-widest">
                                Pausar Oleada
                            </button>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-inter">Progreso General</p>
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="text-3xl font-black text-slate-900 font-work-sans leading-none">{stats.progress.toFixed(0)}%</span>
                                <p className="text-xs text-slate-500 mt-2 font-inter">Saturación de Picking</p>
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                                <ArrowUpRight className="w-8 h-8" />
                            </div>
                        </div>
                        <div className="mt-6 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${stats.progress}%` }}></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 font-inter">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Total Artículos</p>
                        <span className="text-3xl font-black text-slate-900 font-work-sans leading-none">{stats.totalItems}</span>
                        <p className="text-xs text-slate-500 mt-2">Unidades Totales</p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 font-inter">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Pickers Activos</p>
                        <span className="text-3xl font-black text-slate-900 font-work-sans leading-none">08</span>
                        <p className="text-xs text-slate-500 mt-2">Asignados a esta oleada</p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 font-inter">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">ETA Estimado</p>
                        <span className="text-3xl font-black text-slate-900 font-work-sans leading-none">12:45</span>
                        <p className="text-xs text-slate-500 mt-2">Cierre de contenedor FM-10</p>
                    </div>
                </div>

                {/* Charts & Actions Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Zone Progress Chart */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 font-work-sans">Saturación por Zona</h3>
                                <p className="text-sm text-slate-500 font-inter">Rendimiento de extracción en tiempo real</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="bg-slate-100 p-2 rounded-lg text-slate-400 cursor-not-allowed uppercase text-[10px] font-bold px-3">Live Update</div>
                            </div>
                        </div>
                        
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={ZONE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#94a3b8', fontSize: 10 }} 
                                    />
                                    <Tooltip 
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={60}>
                                        {ZONE_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Quick Filters / Search */}
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold font-work-sans mb-2">Monitor de Ítems</h3>
                            <p className="text-slate-400 text-sm font-inter mb-8">Filtrado inteligente de inventario en tránsito</p>
                            
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input 
                                        type="text" 
                                        placeholder="Buscar SKU, Lote o SSCC..."
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-sm font-inter focus:outline-none focus:border-primary transition-colors text-white"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs font-bold font-inter flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors">
                                        <Filter className="w-3.5 h-3.5" /> Filtrar Zona
                                    </button>
                                    <button className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-xs font-bold font-inter flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors">
                                        <MapPin className="w-3.5 h-3.5" /> Ver en Mapa
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-800">
                            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 font-inter">
                                <span>Actividad de Pickers</span>
                                <span className="text-primary tracking-normal">8 Conectados</span>
                            </div>
                            <div className="flex -space-x-2">
                                {[1,2,3,4,5].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                                        P{i}
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-primary flex items-center justify-center text-[10px] font-bold">
                                    +3
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-slate-900 font-work-sans underline decoration-primary/30 decoration-4 underline-offset-8">Inventario de Oleada</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span className="text-xs font-bold text-slate-500 font-inter uppercase tracking-widest">Extraído</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-slate-500 font-inter uppercase tracking-widest">En Proceso</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto font-inter">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ubicación</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKU / Descripción</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Solicitado</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confirmado</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {MOCK_ITEMS.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                    <Box className="w-5 h-5" />
                                                </div>
                                                <span className="font-mono font-bold text-slate-900">{item.loc}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-slate-900">{item.sku}</p>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-bold text-slate-900">{item.qty}</span>
                                            <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase">UNS</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <span className={item.picked === item.qty ? "font-bold text-green-600" : "font-bold text-amber-600"}>
                                                    {item.picked}
                                                </span>
                                                <div className="flex-1 w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div 
                                                        className={clsx("h-full rounded-full", item.picked === item.qty ? "bg-green-500" : "bg-amber-500")}
                                                        style={{ width: `${(item.picked / item.qty) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={clsx(
                                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                                                item.status === "Complete" ? "bg-green-50 text-green-700 border-green-100" : 
                                                item.status === "Picking" ? "bg-amber-50 text-amber-700 border-amber-100" : 
                                                "bg-slate-50 text-slate-400 border-slate-100"
                                            )}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </Shell>
    );
}
