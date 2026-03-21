"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Box, QrCode, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

export default function RFPickingPage({ params }: { params: Promise<{ taskId: string }> }) {
    const { taskId } = use(params);
    const [scanned, setScanned] = useState(false);

    return (
        <div className="flex flex-col h-full bg-slate-50 relative">
            
            {/* Header */}
            <header className="bg-primary text-white p-4 shadow-md z-10 flex items-center gap-3">
                <Link href="/rf/tareas">
                    <div className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center">
                        <ArrowLeft className="w-6 h-6" />
                    </div>
                </Link>
                <div>
                    <h1 className="text-xl font-work-sans font-bold truncate">{taskId}</h1>
                    <p className="text-[10px] text-white/70 font-inter uppercase tracking-widest">Picking Guiado</p>
                </div>
            </header>

            {/* Instruction Area */}
            <div className="bg-primary p-6 pb-8 text-white text-center rounded-b-[2rem]">
                <div className="text-xs uppercase tracking-widest text-primary-200 mb-2 font-bold">Objetivo Actual</div>
                <div className="text-5xl font-black font-work-sans tracking-tight mb-1">04-A-12</div>
                <div className="text-sm text-white/80 font-inter">Pasillo 4, Rack A, Nivel 1</div>
            </div>

            {/* Scanning Logic Area */}
            <div className="px-4 -mt-6 z-20 flex-1 flex flex-col">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col items-center">
                    
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 relative">
                        {scanned ? (
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        ) : (
                            <>
                                <Box className="w-10 h-10 text-slate-400" />
                                <div className="absolute inset-0 border-4 border-slate-200 rounded-full animate-ping opacity-20"></div>
                            </>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 font-work-sans mb-1">SKU 880219X</h2>
                    <p className="text-sm text-slate-500 text-center">Nescafé Clásico 200g (Pallet Completo)</p>
                    
                    <div className="w-full mt-6 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 text-center">Esperando Escaneo LPN</div>
                        <div className="flex justify-center items-center gap-2 text-slate-800 font-mono text-lg opacity-50">
                            <QrCode className="w-5 h-5" />
                            <span>[ _ _ _ _ _ _ ]</span>
                        </div>
                    </div>

                    {/* Developer Mock Buttons */}
                    <div className="w-full flex gap-3 mt-6">
                        <button 
                            onClick={() => setScanned(true)}
                            className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-bold border border-slate-200 active:bg-slate-200"
                        >
                            Simular Scan
                        </button>
                        <Link href="/rf/tareas" className={clsx(
                            "flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                            scanned ? "bg-primary text-white shadow-md active:bg-primary/90" : "bg-slate-100 text-slate-400 pointer-events-none opacity-50"
                        )}>
                            Cargar <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Progress */}
                <div className="mt-auto py-6">
                    <div className="flex justify-between items-end mb-2 px-2">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Progreso</div>
                        <div className="text-lg font-bold text-primary font-work-sans">12 / 450</div>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '3%' }}></div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button (FAB) for Anomaly */}
            <div className="absolute bottom-6 right-6">
                <Link href="/rf/anomalia">
                    <button className="w-16 h-16 bg-red-600 rounded-full shadow-xl shadow-red-600/30 flex items-center justify-center text-white active:scale-90 transition-transform">
                        <AlertTriangle className="w-8 h-8" />
                    </button>
                </Link>
            </div>

        </div>
    )
}
