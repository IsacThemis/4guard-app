"use client";

import Link from "next/link";
import { CheckCircle2, ChevronRight, FileText, ClipboardList } from "lucide-react";
import MobileRFLayout from "@/components/layout/MobileRFLayout";
import { motion } from "framer-motion";

export default function RFAnomalyConfirmPage() {
    const folio = "ANO-2026-00442";

    return (
        <MobileRFLayout>
            <div className="flex flex-col h-full bg-white">
                
                {/* Success Animation Area */}
                <div className="bg-red-600 text-white p-10 flex flex-col items-center justify-center text-center gap-4 rounded-b-[3rem] shadow-xl">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border-4 border-white"
                    >
                        <CheckCircle2 className="w-14 h-14 text-white" />
                    </motion.div>
                    <div>
                        <h1 className="text-3xl font-work-sans font-bold text-white tracking-tight">¡Reportado!</h1>
                        <p className="text-red-100 font-inter text-sm opacity-90">Incidencia enviada a Mesa de Control</p>
                    </div>
                </div>

                {/* Folio Info */}
                <div className="p-8 space-y-8 flex-1">
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1 font-inter">Número de Folio</p>
                        <p className="text-4xl font-work-sans font-black text-slate-900 tracking-tighter">{folio}</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-slate-200 p-2 rounded-lg">
                                <ClipboardList className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase font-inter">Próximos Pasos</p>
                                <p className="text-xs text-slate-600 font-inter leading-relaxed mt-1">
                                    Mesa de Control validará el reporte en los próximos <span className="font-bold">15 minutos</span>. El stock ha sido bloqueado preventivamente.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-slate-200 p-2 rounded-lg">
                                <FileText className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase font-inter">Destino de Evidencia</p>
                                <p className="text-xs text-slate-600 font-inter mt-1 tracking-tight font-mono uppercase">AWS_S3://WMS_VAULT/ANOMALIES/</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Action */}
                <div className="p-6">
                    <Link href="/rf/tareas">
                        <button className="w-full bg-slate-900 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all text-sm font-inter uppercase tracking-widest shadow-lg">
                            Regresar a Tareas
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>

            </div>
        </MobileRFLayout>
    );
}
