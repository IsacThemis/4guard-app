"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle, Camera, X, Send } from "lucide-react";
import { clsx } from "clsx";
import MobileRFLayout from "@/components/layout/MobileRFLayout";

export default function RFAnomalyPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [photo, setPhoto] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleSubmit = () => {
        router.push("/rf/anomalia/confirm");
    };

    return (
        <MobileRFLayout>
            <div className="flex flex-col relative pb-10">
                
                {/* Header */}
                <header className="bg-red-600 text-white p-4 shadow-md z-10 flex items-center gap-3">
                    <Link href="/rf/tareas">
                        <div className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center">
                            <ArrowLeft className="w-6 h-6" />
                        </div>
                    </Link>
                    <div>
                        <h1 className="text-xl font-work-sans font-bold text-white">Reportar Anomalía</h1>
                        <p className="text-[10px] text-white/80 font-inter uppercase tracking-widest">Protocolo NOM-251</p>
                    </div>
                </header>

                <div className="flex-1 p-4 space-y-6">
                    
                    {/* Step 1: Tipo de Anomalía */}
                    <div className={clsx("transition-all duration-300", step === 1 ? "opacity-100" : "opacity-40")}>
                        <h2 className="font-bold text-slate-500 uppercase tracking-widest text-[10px] mb-3 font-inter">1. Tipo de Incidencias</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {['Empaque Dañado', 'Derrame', 'Faltante', 'Bloqueo Físico'].map((type) => (
                                <button 
                                    key={type}
                                    onClick={() => {
                                        setSelectedType(type);
                                        setStep(2);
                                    }}
                                    className={clsx(
                                        "bg-white border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 font-bold transition-all shadow-sm active:scale-95",
                                        selectedType === type ? "border-red-600 text-red-600 bg-red-50" : "border-slate-200 text-slate-700"
                                    )}
                                >
                                    <AlertTriangle className={clsx("w-6 h-6", selectedType === type ? "text-red-600" : "text-slate-400")} />
                                    <span className="text-[11px] text-center font-inter">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Evidencia Fotográfica */}
                    <div className={clsx("transition-all duration-300", step >= 2 ? "opacity-100" : "opacity-40 pointer-events-none")}>
                        <h2 className="font-bold text-slate-500 uppercase tracking-widest text-[10px] mb-3 font-inter">2. Evidencia Obligatoria</h2>
                        
                        {!photo ? (
                            <button 
                                onClick={() => setPhoto(true)}
                                className="w-full bg-white border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-slate-500 active:bg-slate-50 transition-colors"
                            >
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center shadow-sm">
                                    <Camera className="w-8 h-8 text-slate-400" />
                                </div>
                                <span className="font-bold text-sm font-inter">Tomar Fotografía</span>
                            </button>
                        ) : (
                            <div className="w-full bg-slate-900 rounded-xl h-48 relative overflow-hidden flex items-center justify-center border-4 border-slate-800 shadow-inner">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400')] bg-cover bg-center opacity-70"></div>
                                <div className="z-10 bg-black/60 px-4 py-2 rounded-lg text-white font-mono text-[10px] flex items-center gap-2 backdrop-blur-md border border-white/10">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    IMG_QM_2026.JPG
                                </div>
                                <button 
                                    onClick={() => setPhoto(false)}
                                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm active:scale-90"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Step 3: SSCC y Notas */}
                    <div className={clsx("transition-all duration-300", photo ? "opacity-100" : "opacity-40 pointer-events-none")}>
                        <h2 className="font-bold text-slate-500 uppercase tracking-widest text-[10px] mb-3 font-inter">3. Identificación</h2>
                        <input 
                            type="text" 
                            placeholder="Escanear SSCC (Opcional)"
                            className="w-full bg-white border-2 border-slate-200 rounded-xl p-4 font-inter text-sm mb-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-600 transition-all shadow-sm"
                        />
                        <textarea 
                            placeholder="Describa la anomalía..."
                            className="w-full bg-white border-2 border-slate-200 rounded-xl p-4 text-sm mb-6 min-h-[100px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-600 transition-all shadow-sm font-inter"
                        ></textarea>

                        <button 
                            onClick={handleSubmit}
                            className="w-full bg-red-600 text-white p-5 rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all text-sm font-inter uppercase tracking-widest"
                        >
                            <Send className="w-5 h-5" />
                            Bloquear y Notificar
                        </button>
                    </div>

                </div>
            </div>
        </MobileRFLayout>
    )
}
