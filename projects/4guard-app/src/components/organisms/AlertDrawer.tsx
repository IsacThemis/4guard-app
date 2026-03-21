"use client";

import React from "react";
import { X, AlertTriangle, Info, CheckCircle2, ShieldAlert, ChevronRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Button from "@/components/ui/Button";

interface Alert {
  id: string;
  type: "CRITICAL" | "WARNING" | "INFO" | "SUCCESS";
  title: string;
  description: string;
  timestamp: string;
  module: string;
}

const mockAlerts: Alert[] = [
  {
    id: "ALR-001",
    type: "CRITICAL",
    title: "Anomalía NOM-251 Detectada",
    description: "Paquete dañado reportado en Bahía 04-A-12. Bloqueo SSCC ejecutado.",
    timestamp: "Hace 2 min",
    module: "Calidad",
  },
  {
    id: "ALR-002",
    type: "WARNING",
    title: "Retraso en Carga",
    description: "Andén 03: Transporte TRP-EST-12 excede tiempo de estadía (2h+).",
    timestamp: "Hace 15 min",
    module: "Expedición",
  },
  {
    id: "ALR-003",
    type: "INFO",
    title: "Nueva Recepción Arribada",
    description: "Tracto placas 44-BB-22 en caseta. Esperando asignación de andén.",
    timestamp: "Hace 25 min",
    module: "Recepción",
  },
];

interface AlertDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlertDrawer({ isOpen, onClose }: AlertDrawerProps) {
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col border-l border-slate-200"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-work-sans font-bold text-slate-800 flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-primary" />
                  Monitor de Alertas
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">
                  Global System Response (GLOB-01)
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors shadow-sm bg-white"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={clsx(
                    "bg-white rounded-2xl p-5 border shadow-sm transition-all hover:shadow-md cursor-pointer group",
                    alert.type === "CRITICAL" ? "border-red-100 bg-red-50/20" : "border-slate-100"
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <AlertIcon type={alert.type} />
                      <span className={clsx(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                        alert.type === "CRITICAL" ? "bg-red-100 text-red-700" :
                        alert.type === "WARNING" ? "bg-amber-100 text-amber-700" :
                        alert.type === "SUCCESS" ? "bg-green-100 text-green-700" :
                        "bg-blue-100 text-blue-700"
                      )}>
                        {alert.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                      <Clock className="w-3 h-3" />
                      {alert.timestamp}
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-800 font-work-sans group-hover:text-primary transition-colors">
                    {alert.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 font-inter">
                    {alert.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      Módulo: <span className="text-slate-600">{alert.module}</span>
                    </span>
                    <Button variant="ghost" size="sm" className="h-8 text-[11px] font-bold">
                      Detalle <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-white">
              <Button variant="outline" className="w-full h-12 uppercase tracking-widest text-xs font-bold">
                Marcar todas como leídas
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function AlertIcon({ type }: { type: Alert["type"] }) {
  switch (type) {
    case "CRITICAL":
      return <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse" />;
    case "WARNING":
      return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    case "SUCCESS":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    default:
      return <Info className="w-5 h-5 text-blue-500" />;
  }
}
