"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { AlertTriangle, TrendingUp, Package, Loader2 } from "lucide-react";
import { useInventory } from "@/lib/hooks";

interface Bay {
    id: string;
    row: string;
    col: number;
    status: "OPTIMUM" | "TACTICAL" | "RESERVE" | "CRITICAL";
    occupancy: number;
}

const ROWS = ["A", "B", "C", "D"];
const COLS = Array.from({ length: 12 }, (_, i) => i + 1);

interface InventoryTopology2DProps {
    onSelectBay: (id: string) => void;
}

export default function InventoryTopology2D({ onSelectBay }: InventoryTopology2DProps) {
    const { data: inventory, isLoading } = useInventory();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Map inventory data to our grid structure
    const getBayData = (row: string, col: number): Bay => {
        const id = `BAY-${row}-${col.toString().padStart(2, '0')}`;
        const invItem = inventory?.find(item => item.id === id);
        
        if (invItem) {
            let status: Bay["status"] = "OPTIMUM";
            if (invItem.status === "LOCKED") status = "CRITICAL";
            else if ((invItem.occupancy ?? 0) < 40) status = "RESERVE";
            else if ((invItem.occupancy ?? 0) < 85) status = "TACTICAL";
            
            return {
                id,
                row,
                col,
                status,
                occupancy: invItem.occupancy ?? 0
            };
        }

        // Default "Ghost" data if not in our active mock set, 
        // but let's make it look like a real warehouse with mostly "Optimum"
        return {
            id,
            row,
            col,
            status: "OPTIMUM",
            occupancy: 92
        };
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 m-6">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-inter">Generando Topografía Sector Alpha...</p>
            </div>
        );
    }

    const globalOccupancy = 82.4;

    return (
        <div className="flex flex-col h-full bg-surface p-6 overflow-hidden font-inter">
            {/* Legend & Summary */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Óptimo (&gt;85%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-sm shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]"></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Táctico (40-84%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reserva (&lt;40%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-sm shadow-[0_0_12px_rgba(var(--secondary-rgb),0.6)] animate-pulse"></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Bloqueo / Crítico</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-2xl">
                    <TrendingUp className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest tracking-tighter">Ocupación Global: {globalOccupancy}%</span>
                </div>
            </div>

            {/* Grid Container */}
            <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200/50 p-8 overflow-auto custom-scrollbar relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <Package className="w-32 h-32" />
                </div>

                {/* Column Headers */}
                <div className="grid grid-cols-[80px_1fr] gap-4 mb-3">
                    <div></div>
                    <div className="grid grid-cols-12 gap-1.5">
                        {COLS.map(c => (
                            <div key={c} className="text-[9px] font-black text-slate-400 text-center uppercase tracking-tighter">
                                COL-{c.toString().padStart(2, '0')}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rows */}
                <div className="space-y-1.5 relative z-10">
                    {ROWS.map(rowLabel => (
                        <div key={rowLabel} className="grid grid-cols-[80px_1fr] gap-4 items-center group">
                            <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase group-hover:text-primary transition-colors duration-300">
                                ROW-{rowLabel}
                            </div>
                            <div className="grid grid-cols-12 gap-1.5">
                                {COLS.map(col => {
                                    const bay = getBayData(rowLabel, col);
                                    return (
                                        <motion.div
                                            key={bay.id}
                                            whileHover={{ scale: 1.05, zIndex: 10 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => onSelectBay(bay.id)}
                                            onMouseEnter={() => setHoveredId(bay.id)}
                                            onMouseLeave={() => setHoveredId(null)}
                                            className={clsx(
                                                "h-16 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all border-2 relative overflow-hidden",
                                                bay.status === "OPTIMUM" ? "bg-emerald-500 border-white/20 text-white" :
                                                bay.status === "TACTICAL" ? "bg-primary border-white/20 text-white shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)]" :
                                                bay.status === "RESERVE" ? "bg-yellow-400 border-white/20 text-slate-900" :
                                                "bg-secondary border-white/40 text-white shadow-[0_0_20px_rgba(var(--secondary-rgb),0.5)] ring-2 ring-secondary/20"
                                            )}
                                        >
                                            <span className={clsx(
                                                "text-[10px] font-black tracking-tighter",
                                                bay.status === "RESERVE" ? "text-slate-900" : "text-white"
                                            )}>{rowLabel}-{col.toString().padStart(2, '0')}</span>
                                            
                                            {bay.status === "CRITICAL" && (
                                                <motion.div
                                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                >
                                                    <AlertTriangle className="w-3 h-3 mt-1 text-white" />
                                                </motion.div>
                                            )}
                                            
                                            {/* Hover Tooltip Overlay */}
                                            <AnimatePresence>
                                                {hoveredId === bay.id && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        className="absolute inset-0 bg-slate-900/90 backdrop-blur-[2px] flex flex-col items-center justify-center p-1"
                                                    >
                                                        <span className="text-[10px] font-black text-white">{bay.occupancy}%</span>
                                                        <div className="w-full h-1 bg-white/20 rounded-full mt-1 overflow-hidden">
                                                            <div className="h-full bg-primary" style={{ width: `${bay.occupancy}%` }} />
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Stats Footer */}
            <div className="grid grid-cols-3 gap-6 mt-6">
                <StatCard 
                    label="Slots Activos" 
                    value="14,204" 
                    icon={Package} 
                    color="primary" 
                    sub="Capacidad Total: 16k" 
                />
                <StatCard 
                    label="Bloqueos Activos" 
                    value={inventory?.filter(i => i.status === "LOCKED").length.toString().padStart(2, '0') || "00"} 
                    icon={AlertTriangle} 
                    color="secondary" 
                    sub="Pendiente Calidad" 
                />
                <StatCard 
                    label="Saturación Sector A" 
                    value="94%" 
                    icon={TrendingUp} 
                    color="emerald" 
                    sub="+2.4% vs Ayer" 
                />
            </div>
        </div>
    );
}

function StatCard({ label, value, icon: Icon, color, sub }: { label: string, value: string, icon: React.ElementType, color: string, sub: string }) {
    const colorMap: Record<string, string> = {
        primary: "bg-primary/5 text-primary border-primary/10",
        secondary: "bg-secondary/5 text-secondary border-secondary/10",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    };

    return (
        <div className={clsx("p-5 rounded-[2.5rem] border flex items-center gap-5 shadow-sm bg-white transition-all hover:shadow-md group", colorMap[color])}>
            <div className={clsx(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                color === "primary" ? "bg-primary text-white shadow-lg shadow-primary/20" :
                color === "secondary" ? "bg-secondary text-white shadow-lg shadow-secondary/20" :
                "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
            )}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-0.5">{label}</div>
                <div className="text-2xl font-black text-slate-900 leading-none mb-1 font-headline">{value}</div>
                <div className="text-[9px] font-bold text-slate-400 font-inter italic tracking-tight">{sub}</div>
            </div>
        </div>
    );
}
