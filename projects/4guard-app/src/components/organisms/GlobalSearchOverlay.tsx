"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Search, 
    X, 
    Clock, 
    Zap, 
    SearchCode, 
    ArrowRight, 
    Boxes, 
    Truck, 
    ShieldAlert,
    ScanLine
} from "lucide-react";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";

interface GlobalSearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const QUICK_ACTIONS = [
    { id: "new-anomaly", label: "Reportar Anomalía", icon: ShieldAlert, href: "/rf/anomalia" },
    { id: "scan-sscc", label: "Escanear SSCC", icon: ScanLine, href: "/reception/scan" },
    { id: "inventory-top", label: "Ver Topografía", icon: Boxes, href: "/inventory" },
    { id: "picking-waves", label: "Gestionar Oleadas", icon: Truck, href: "/expedition" },
];

const RECENT_SEARCHES = [
    { id: "1", type: "SKU", value: "NES-CLA-200", label: "Nescafé Clásico 200g" },
    { id: "2", type: "SSCC", value: "003758291000184729", label: "Pallet Nestlé A102" },
    { id: "3", type: "FOLIO", value: "QM-8821", label: "Incidencia Calidad" },
];

export default function GlobalSearchOverlay({ isOpen, onClose }: GlobalSearchOverlayProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => inputRef.current?.focus(), 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleNavigate = (href: string) => {
        router.push(href);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 sm:px-0 font-inter">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={onClose}
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
                    >
                        {/* Search Input */}
                        <div className="p-6 border-b flex items-center gap-4 bg-slate-50/50">
                            <Search className="w-6 h-6 text-primary" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Buscar por SKU, SSCC, Lote o Folio..."
                                className="flex-1 bg-transparent border-none text-lg outline-none placeholder:text-slate-400 font-medium"
                            />
                            <div className="flex items-center gap-2">
                                <span className="bg-slate-200 px-2 py-1 rounded text-[10px] font-black text-slate-500 uppercase">ESC</span>
                                <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-lg transition-colors">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
                            {query === "" ? (
                                <div className="space-y-6 p-4">
                                    {/* Quick Actions */}
                                    <section>
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-3 flex items-center gap-2">
                                            <Zap className="w-3 h-3 text-amber-500" />
                                            Acciones Directas
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {QUICK_ACTIONS.map(action => (
                                                <button
                                                    key={action.id}
                                                    onClick={() => handleNavigate(action.href)}
                                                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-primary/5 group transition-all text-left border border-transparent hover:border-primary/20"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                                                        <action.icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-800">{action.label}</div>
                                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Command Prompt</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Recent */}
                                    <section>
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-3 flex items-center gap-2">
                                            <Clock className="w-3 h-3" />
                                            Búsquedas Recientes
                                        </h3>
                                        <div className="space-y-1">
                                            {RECENT_SEARCHES.map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleNavigate(item.type === "FOLIO" ? `/quality/incidencias/${item.value}` : `/inventory`)}
                                                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group text-left"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-widest border border-slate-200 min-w-[50px] text-center">
                                                            {item.type}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-700">{item.value}</div>
                                                            <div className="text-[10px] text-slate-400 font-medium">{item.label}</div>
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transition-transform" />
                                                </button>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            ) : (
                                <div className="p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                                    <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto text-slate-300">
                                        <SearchCode className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Buscando &ldquo;{query}&rdquo;...</h3>
                                        <p className="text-sm text-slate-400">Presiona ENTER para búsqueda profunda en BigTable</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-slate-50 border-t flex justify-between items-center px-6">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 italic font-inter lowercase">
                                    <span className="bg-white border rounded px-1.5 py-0.5 not-italic uppercase font-black text-[9px]">↑↓</span> navegar
                                </span>
                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 italic font-inter lowercase">
                                    <span className="bg-white border rounded px-1.5 py-0.5 not-italic uppercase font-black text-[9px]">Enter</span> seleccionar
                                </span>
                            </div>
                            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                                4-GUARD SEARCH ENGINE v1.2
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
