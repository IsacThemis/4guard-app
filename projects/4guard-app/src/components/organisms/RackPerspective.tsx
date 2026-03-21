"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Info, Package, AlertCircle } from "lucide-react";

interface Bay {
    id: string;
    level: number;
    pos: number;
    status: "EMPTY" | "FULL" | "LOCKED" | "PICKING";
    occupancy: number;
}

const GENERATE_BAYS = (): Bay[] => {
    const bays: Bay[] = [];
    for (let l = 1; l <= 4; l++) {
        for (let p = 1; p <= 8; p++) {
            bays.push({
                id: `B-${l}-${p}`,
                level: l,
                pos: p,
                status: Math.random() > 0.8 ? "LOCKED" : Math.random() > 0.6 ? "PICKING" : Math.random() > 0.2 ? "FULL" : "EMPTY",
                occupancy: Math.floor(Math.random() * 100),
            });
        }
    }
    return bays;
};

interface RackPerspectiveProps {
    onSelectBay: (id: string) => void;
}

export default function RackPerspective({ onSelectBay }: RackPerspectiveProps) {
    const [bays] = useState<Bay[]>(GENERATE_BAYS());
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="w-full h-full relative p-12 perspective-[1000px] overflow-hidden flex items-center justify-center">
            
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Isometric Rack Table */}
            <motion.div 
                initial={{ opacity: 0, rotateX: 60, rotateZ: -35, scale: 0.8 }}
                animate={{ opacity: 1, rotateX: 55, rotateZ: -30, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative grid grid-cols-8 gap-3 preserve-3d"
                style={{ 
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Floor Grid Shadow */}
                <div className="absolute -inset-10 bg-slate-200/20 blur-xl -z-10 rounded-[40px] transform-gpu translate-z-[-50px]"></div>

                {bays.map((bay) => (
                    <div
                        key={bay.id}
                        className="relative preserve-3d group cursor-pointer"
                        onMouseEnter={() => setHoveredId(bay.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => onSelectBay(bay.id)}
                    >
                        {/* Bay Base (Shadow/Footprint) */}
                        <div className="w-16 h-16 bg-slate-200/30 rounded-lg absolute inset-0 translate-z-[-10px] blur-[2px]"></div>

                        {/* Bay Structure (The "Box") */}
                        <motion.div
                            whileHover={{ translateZ: 20 }}
                            className={clsx(
                                "w-16 h-20 rounded-xl border-2 transition-all relative transition-colors duration-500",
                                bay.status === "EMPTY" ? "bg-white/40 border-slate-200" :
                                bay.status === "LOCKED" ? "bg-secondary/20 border-secondary shadow-[0_0_20px_rgba(var(--secondary-rgb),0.3)]" :
                                bay.status === "PICKING" ? "bg-primary/20 border-primary animate-pulse" :
                                "bg-white border-primary/20 shadow-sm"
                            )}
                        >
                            {/* Inner Content Simulating a Pallet */}
                            {bay.status !== "EMPTY" && (
                                <div className={clsx(
                                    "absolute inset-2 rounded-lg flex items-center justify-center",
                                    bay.status === "FULL" ? "bg-primary/10" : "bg-slate-100"
                                )}>
                                    <Package className={clsx(
                                        "w-6 h-6",
                                        bay.status === "LOCKED" ? "text-secondary/60" : "text-primary/60"
                                    )} />
                                    
                                    {/* Occupancy Bar */}
                                    <div className="absolute bottom-1 left-1 right-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-primary" 
                                            style={{ width: `${bay.occupancy}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Tooltip on Hover */}
                            {hoveredId === bay.id && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute -top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white p-3 rounded-2xl shadow-2xl z-50 w-40 pointer-events-none"
                                    style={{ transform: "rotateZ(30deg) rotateX(-55deg) translateZ(50px)" }}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] font-bold text-white/40 uppercase">Ub. {bay.id}</span>
                                        <span className={clsx(
                                            "text-[9px] font-bold px-1.5 py-0.5 rounded",
                                            bay.status === "LOCKED" ? "bg-secondary" : "bg-primary"
                                        )}>{bay.status}</span>
                                    </div>
                                    <div className="text-sm font-bold font-work-sans">Ocupación: {bay.occupancy}%</div>
                                    <div className="text-[9px] text-white/60 mt-1 italic leading-tight">Click para gestionar inventario</div>
                                </motion.div>
                            )}

                            {/* Decorative Corner LEDs */}
                            <div className={clsx(
                                "absolute top-1 right-1 w-1.5 h-1.5 rounded-full",
                                bay.status === "LOCKED" ? "bg-secondary shadow-[0_0_5px_#ff4444]" : 
                                bay.status === "PICKING" ? "bg-primary shadow-[0_0_5px_#22c55e]" : 
                                "bg-slate-200"
                            )}></div>
                        </motion.div>
                        
                        {/* Rack Label */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                            {bay.id}
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Depth of Field / Edge Fog */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-surface-container to-transparent pointer-events-none z-20"></div>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface-container to-transparent pointer-events-none z-20"></div>
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface-container to-transparent pointer-events-none z-20"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface-container to-transparent pointer-events-none z-20"></div>

            {/* View Controls */}
            <div className="absolute bottom-6 left-6 flex gap-2 z-30">
                <div className="bg-white/80 backdrop-blur-md border border-slate-100 p-2 rounded-2xl flex items-center gap-3 shadow-sm">
                    <button className="p-2 hover:bg-primary/10 rounded-xl transition-colors text-primary"><Info className="w-4 h-4" /></button>
                    <div className="h-4 w-px bg-slate-200"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Hardware-Accelerated Perspective</span>
                </div>
            </div>
        </div>
    );
}
