"use client";

import React from "react";
import { X, Box, Info, Truck, Calendar, ShieldAlert, History, MapPin, Package, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface BayDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bayId: string | null;
}

export default function BayDetailDrawer({ isOpen, onClose, bayId }: BayDetailDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-surface flex flex-col z-[101] shadow-2xl border-l border-foreground/5 bg-white"
          >
            {/* Header Area */}
            <div className="p-8 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="bg-white/10 p-1.5 rounded-lg border border-white/20">
                                <Box className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Detalle de Ubicación</span>
                        </div>
                        <h2 className="text-4xl font-work-sans font-bold tracking-tight">Bahía {bayId}</h2>
                        <div className="flex items-center gap-2 mt-2 text-xs text-white/50 font-inter">
                            <MapPin className="w-3 h-3" />
                            <span>Pasillo 04 • Sector ALPHA • Nivel 12</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30">
                
                {/* Ocupación Analytics */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 bg-white shadow-sm border-slate-100 flex flex-col justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ocupación</span>
                        <div className="flex items-end gap-2 mt-2 font-work-sans">
                            <span className="text-3xl font-bold text-slate-800 tracking-tighter">75%</span>
                            <span className="text-xs text-slate-400 pb-1">3/4 Posiciones</span>
                        </div>
                    </Card>
                    <Card className="p-4 bg-white shadow-sm border-slate-100 flex flex-col justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</span>
                        <div className="mt-2 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_rgba(187,1,18,0.5)] animate-pulse"></div>
                            <span className="text-lg font-bold text-secondary tracking-tight">NOM-251 Block</span>
                        </div>
                    </Card>
                </div>

                {/* Main Pallet Info */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Pallets Almacenados
                    </h3>
                    
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:border-primary/20 transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-mono text-sm font-bold text-primary">SSCC 003758291000{i}</div>
                                    <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">Posición {i}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-sm font-bold text-slate-800">Nescafé Clásico 200g</div>
                                        <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            Expira: 12 OCT 2026 • Lote: L24090
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                                        <Info className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Audit Trail Snippet */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <History className="w-4 h-4" />
                        Historial Reciente
                    </h3>
                    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
                        {[
                            { action: "Acomodo Pallet", user: "OP-14 (Juan P.)", time: "2h ago", color: "bg-primary" },
                            { action: "Bloqueo Calidad", user: "INS-02 (Maria L.)", time: "4h ago", color: "bg-secondary" },
                        ].map((log, i) => (
                            <div key={i} className="p-4 flex items-center gap-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                                <div className={`w-1 h-8 rounded-full ${log.color}`}></div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-slate-800">{log.action}</div>
                                    <div className="text-[10px] text-slate-400 flex items-center gap-2">
                                        <User className="w-3 h-3" /> {log.user}
                                    </div>
                                </div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{log.time}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Footer Actions */}
            <div className="p-8 border-t border-slate-100 bg-white grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 uppercase tracking-widest text-[10px] font-bold">
                    <History className="w-4 h-4 mr-2" /> Kardex Completo
                </Button>
                <Button variant="primary" className="h-12 uppercase tracking-widest text-[10px] font-bold">
                    <Truck className="w-4 h-4 mr-2" /> Programar Mov.
                </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
