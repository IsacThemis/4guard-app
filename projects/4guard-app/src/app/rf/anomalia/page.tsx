"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Camera, UploadCloud, X, Send } from "lucide-react";
import { clsx } from "clsx";

export default function RFAnomalyPage() {
    const [step, setStep] = useState(1);
    const [photo, setPhoto] = useState(false);

    return (
        <div className="flex flex-col h-full bg-slate-50 relative">
            
            {/* Header */}
            <header className="bg-red-600 text-white p-4 shadow-md z-10 flex items-center gap-3">
                <Link href="/rf/tareas">
                    <div className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center">
                        <ArrowLeft className="w-6 h-6" />
                    </div>
                </Link>
                <div>
                    <h1 className="text-xl font-work-sans font-bold">Reportar Anomalía</h1>
                    <p className="text-[10px] text-white/80 font-inter uppercase tracking-widest">Protocolo NOM-251</p>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {/* Step 1: Tipo de Anomalía */}
                <div className={clsx("transition-opacity duration-300", step === 1 ? "opacity-100" : "opacity-40 pointer-events-none")}>
                    <h2 className="font-bold text-slate-500 uppercase tracking-widest text-xs mb-3">1. Tipo de Incidencia</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {['Empaque Dañado', 'Derrame', 'Faltante', 'Bloqueo Físico'].map((type) => (
                            <button 
                                key={type}
                                onClick={() => setStep(2)}
                                className="bg-white border-2 border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-slate-700 font-bold active:border-red-500 transition-colors shadow-sm"
                            >
                                <AlertTriangle className="w-6 h-6 text-slate-400" />
                                <span className="text-xs text-center">{type}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 2: Evidencia Fotográfica */}
                <div className={clsx("transition-opacity duration-300", step >= 2 ? "opacity-100" : "opacity-40 pointer-events-none")}>
                    <h2 className="font-bold text-slate-500 uppercase tracking-widest text-xs mb-3">2. Evidencia Obligatoria</h2>
                    
                    {!photo ? (
                        <button 
                            onClick={() => setPhoto(true)}
                            className="w-full bg-slate-200/50 border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-slate-500 active:bg-slate-200 transition-colors"
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Camera className="w-8 h-8 text-slate-400" />
                            </div>
                            <span className="font-bold">Tomar Fotografía</span>
                        </button>
                    ) : (
                        <div className="w-full bg-slate-900 rounded-xl h-48 relative overflow-hidden flex items-center justify-center border-4 border-slate-800 shadow-inner">
                            {/* Mock Photo */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400')] bg-cover bg-center opacity-60"></div>
                            <div className="z-10 bg-black/60 px-4 py-2 rounded-lg text-white font-mono text-xs flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                REC_20260320_A.jpg
                            </div>
                            <button 
                                onClick={() => setPhoto(false)}
                                className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Step 3: SSCC y Notas */}
                <div className={clsx("transition-opacity duration-300", photo ? "opacity-100" : "opacity-40 pointer-events-none")}>
                    <h2 className="font-bold text-slate-500 uppercase tracking-widest text-xs mb-3">3. Identificación (Opcional)</h2>
                    <input 
                        type="text" 
                        placeholder="Escanear SSCC (Si es legible)"
                        className="w-full bg-white border border-slate-200 rounded-xl p-4 font-mono mb-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-500 transition-colors shadow-sm"
                    />
                    <textarea 
                        placeholder="Observaciones adicionales..."
                        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm mb-4 min-h-[100px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-500 transition-colors shadow-sm"
                    ></textarea>

                    <Link href="/rf/tareas" className="w-full bg-red-600 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-red-600/30 active:scale-95 transition-transform">
                        <Send className="w-5 h-5" />
                        Bloquear y Notificar
                    </Link>
                </div>

            </div>
        </div>
    )
}
