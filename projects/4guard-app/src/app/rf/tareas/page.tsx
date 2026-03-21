import { Truck, PackageSearch, AlertTriangle, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

export default function RFTaskMenu() {
    return (
        <div className="flex flex-col h-full bg-slate-50 relative">
            
            {/* Top Bar for Operator */}
            <header className="bg-primary text-white p-4 pb-6 rounded-b-[2rem] shadow-md z-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-work-sans font-bold">4-GUARD</h1>
                        <p className="text-xs text-white/70 font-inter uppercase tracking-widest mt-1">Terminal Operativa</p>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                        <User className="w-6 h-6" />
                    </div>
                </div>
            </header>

            {/* Operator Info Floating Card */}
            <div className="px-4 -mt-8 relative z-20">
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-4 flex justify-between items-center">
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Operador Activo</div>
                        <div className="text-lg font-bold text-slate-800">OP-14 (Juan P.)</div>
                    </div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        En Turno
                    </div>
                </div>
            </div>

            {/* Task List */}
            <div className="flex-1 p-4 mt-2 space-y-4">
                <h2 className="font-bold text-slate-500 uppercase tracking-widest text-xs ml-2">Tareas Asignadas</h2>

                {/* Primary Task */}
                <Link href="/rf/picking/WAV-2026-089" className="block">
                    <div className="bg-white rounded-2xl p-5 border-2 border-primary shadow-sm active:scale-95 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-xl">
                                <Truck className="w-8 h-8" />
                            </div>
                            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider animate-pulse">
                                Alta Prioridad
                            </span>
                        </div>
                        <h3 className="text-xl font-bold font-work-sans text-slate-800">Picking Consolidado</h3>
                        <p className="text-sm text-slate-500 mt-1 font-inter">Oleada WAV-2026-089</p>
                        
                        <div className="mt-4 flex items-center justify-between text-primary font-bold">
                            <span>450 Líneas</span>
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </div>
                </Link>

                {/* Secondary Task */}
                <Link href="#" className="block">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm active:scale-95 transition-transform opacity-70">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-slate-100 text-slate-500 p-3 rounded-xl">
                                <PackageSearch className="w-8 h-8" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold font-work-sans text-slate-800">Acomodo Arribo</h3>
                        <p className="text-sm text-slate-500 mt-1 font-inter">Folio ASN-7782</p>
                        
                        <div className="mt-4 flex items-center justify-between text-slate-400 font-bold">
                            <span>24 Pallets</span>
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </div>
                </Link>

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
