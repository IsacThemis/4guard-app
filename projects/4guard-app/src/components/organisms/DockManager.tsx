"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Info, CheckCircle2, AlertTriangle, ArrowRight, GripVertical } from "lucide-react";
import { clsx } from "clsx";
interface Transporter {
    id: string;
    name: string;
    type: string;
    priority: "HIGH" | "NORMAL" | "LOW";
}

interface Dock {
    id: string;
    status: "IDLE" | "OCCUPIED" | "DELAYED";
    assignedTransporter?: Transporter;
    loadProgress: number;
}

const INITIAL_TRANSPORTERS: Transporter[] = [
    { id: "TRP-001", name: "GOLFO-EXP", type: "Tracto 53'", priority: "HIGH" },
    { id: "TRP-002", name: "ESTRELLA", type: "Torton 20'", priority: "NORMAL" },
    { id: "TRP-003", name: "VALLE-MX", type: "Camioneta 3.5", priority: "LOW" },
];

const INITIAL_DOCKS: Dock[] = [
    { id: "A-01", status: "OCCUPIED", assignedTransporter: { id: "TRP-999", name: "FEDEX-IND", type: "Paquetería", priority: "NORMAL" }, loadProgress: 75 },
    { id: "A-02", status: "IDLE", loadProgress: 0 },
    { id: "A-03", status: "IDLE", loadProgress: 0 },
    { id: "A-04", status: "DELAYED", assignedTransporter: { id: "TRP-888", name: "DHL-EXPRESS", type: "Aéreo", priority: "HIGH" }, loadProgress: 100 },
];

export default function DockManager() {
    const [transporters, setTransporters] = useState<Transporter[]>(INITIAL_TRANSPORTERS);
    const [docks, setDocks] = useState<Dock[]>(INITIAL_DOCKS);
    const [draggingId, setDraggingId] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggingId(id);
        e.dataTransfer.setData("transporterId", id);
    };

    const handleDrop = (e: React.DragEvent, dockId: string) => {
        e.preventDefault();
        const transporterId = e.dataTransfer.getData("transporterId");
        const transporter = transporters.find(t => t.id === transporterId);

        if (transporter) {
            setDocks(prev => prev.map(d => 
                d.id === dockId 
                    ? { ...d, status: "OCCUPIED", assignedTransporter: transporter, loadProgress: 5 } 
                    : d
            ));
            setTransporters(prev => prev.filter(t => t.id !== transporterId));
        }
        setDraggingId(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleUnassign = (dockId: string) => {
        const dock = docks.find(d => d.id === dockId);
        if (dock?.assignedTransporter) {
            setTransporters(prev => [...prev, dock.assignedTransporter!]);
            setDocks(prev => prev.map(d => 
                d.id === dockId ? { ...d, status: "IDLE", assignedTransporter: undefined, loadProgress: 0 } : d
            ));
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Transporters Queue */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cola de Arribos</h3>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {transporters.length} Esperando
                    </span>
                </div>
                
                <div className="space-y-3">
                    <AnimatePresence>
                        {transporters.map((t) => (
                            <motion.div
                                key={t.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                draggable
                                onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, t.id)}
                                onDragEnd={() => setDraggingId(null)}
                                className={clsx(
                                    "bg-white border-2 border-slate-100 p-4 rounded-2xl shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all group relative overflow-hidden",
                                    draggingId === t.id && "opacity-50 border-primary border-dashed"
                                )}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rotate-45 translate-x-12 -translate-y-12 group-hover:bg-primary/5 transition-colors"></div>
                                
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-slate-400 group-hover:text-primary transition-colors">
                                        <GripVertical className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-800 font-work-sans">{t.name}</h4>
                                            <span className={clsx(
                                                "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase",
                                                t.priority === "HIGH" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                                            )}>
                                                {t.priority}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{t.type} • {t.id}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {transporters.length === 0 && (
                        <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl text-center text-slate-300 italic text-sm">
                            No hay transportes en cola
                        </div>
                    )}
                </div>
            </div>

            {/* Docks Grid */}
            <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Andenes de Carga</h3>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div> Disponible
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <div className="w-2 h-2 rounded-full bg-primary/40"></div> En Carga
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {docks.map((dock) => (
                        <div
                            key={dock.id}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, dock.id)}
                            className={clsx(
                                "min-h-[160px] rounded-3xl border-2 transition-all relative overflow-hidden flex flex-col",
                                dock.status === "IDLE" ? "border-slate-100 border-dashed bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200" :
                                dock.status === "DELAYED" ? "border-secondary/20 bg-secondary/5" :
                                "border-primary/10 bg-white shadow-sm"
                            )}
                        >
                            {/* Dock Number Badge */}
                            <div className={clsx(
                                "absolute top-4 left-4 w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl font-work-sans border shadow-sm z-10",
                                dock.status === "IDLE" ? "bg-white text-slate-300 border-slate-100" :
                                dock.status === "DELAYED" ? "bg-secondary text-white border-secondary rotate-6" :
                                "bg-primary text-white border-primary"
                            )}>
                                {dock.id}
                            </div>

                            {dock.assignedTransporter ? (
                                <div className="p-6 pt-16 flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-lg leading-tight">{dock.assignedTransporter.name}</h4>
                                            <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-tighter">
                                                {dock.assignedTransporter.type} • {dock.assignedTransporter.id}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => handleUnassign(dock.id)}
                                            className="p-2 hover:bg-slate-100 rounded-full text-slate-300 hover:text-slate-600 transition-all"
                                            title="Liberar Andén"
                                        >
                                            <ArrowRight className="w-4 h-4 rotate-180" />
                                        </button>
                                    </div>

                                    <div className="mt-6 space-y-2">
                                        <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            <span>Progreso de Carga</span>
                                            <span className="text-slate-800">{dock.loadProgress}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${dock.loadProgress}%` }}
                                                className={clsx(
                                                    "h-full rounded-full transition-all",
                                                    dock.status === "DELAYED" ? "bg-secondary" : "bg-primary"
                                                )}
                                            ></motion.div>
                                        </div>
                                        
                                        {dock.status === "DELAYED" && (
                                            <div className="flex items-center gap-1.5 text-secondary text-[9px] font-bold uppercase mt-2">
                                                <AlertTriangle className="w-3 h-3" /> Tiempo exceedido (EST-2H)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-100 text-slate-200 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest leading-relaxed font-inter">
                                        Arrastre transporte <br /> para asignar
                                    </p>
                                </div>
                            )}

                            {/* Drop overlay hint */}
                            {draggingId && dock.status === "IDLE" && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 bg-primary/5 border-4 border-primary/20 border-dashed rounded-3xl flex items-center justify-center z-20"
                                >
                                    <div className="bg-primary text-white p-3 rounded-full shadow-lg scale-125">
                                        <PlusIcon className="w-6 h-6" />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    )
}
