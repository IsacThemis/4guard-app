"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { 
  Scan, 
  Package, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Undo2, 
  History,
  Barcode,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

interface ScannedItem {
  id: string;
  sscc: string;
  sku: string;
  description: string;
  timestamp: string;
  status: "VALIDATED" | "PENDING" | "ERROR";
}

export default function ReceptionScanPage() {
  const router = useRouter();
  const [barcode, setBarcode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([
    {
      id: "1",
      sscc: "003758291000184729",
      sku: "SKU-NES-200",
      description: "Nescafé Clásico 200g (Caja x24)",
      timestamp: "10:45:12",
      status: "VALIDATED",
    },
    {
      id: "2",
      sscc: "003758291000184730",
      sku: "SKU-NES-200",
      description: "Nescafé Clásico 200g (Caja x24)",
      timestamp: "10:46:05",
      status: "VALIDATED",
    }
  ]);

  const handleManualScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode) return;
    
    setIsScanning(true);
    
    // Simular validación GS1-128
    setTimeout(() => {
      const newItem: ScannedItem = {
        id: Math.random().toString(36).substr(2, 9),
        sscc: barcode.startsWith("00") ? barcode : `00${barcode}`,
        sku: "SKU-TBD-001",
        description: "Pallet Genérico (Pendiente Identificación)",
        timestamp: new Date().toLocaleTimeString("es-MX", { hour12: false }),
        status: barcode.length > 15 ? "VALIDATED" : "ERROR",
      };
      
      setScannedItems([newItem, ...scannedItems]);
      setBarcode("");
      setIsScanning(false);
    }, 600);
  };

  return (
    <Shell>
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-work-sans font-bold text-slate-900">Escaneo de Recepción</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ASN: ASN-2024-0812 • Andén 04</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Scanner Conectado</span>
            </div>
            <Button variant="primary" size="sm" onClick={() => router.push("/reception/buffer")}>
              Finalizar Carga <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Scanner Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 bg-slate-900 border-none shadow-2xl relative overflow-hidden group">
              {/* Decorative Scan Lines */}
              <div className="absolute inset-x-0 top-0 h-1 bg-primary/30 blur-sm animate-scan-line pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                    <Scan className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-white font-work-sans">Terminal de Captura</h2>
                </div>

                <form onSubmit={handleManualScan} className="space-y-4">
                  <div className="relative">
                    <Barcode className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20" />
                    <input
                      type="text"
                      autoFocus
                      placeholder="ESCANEÉ CÓDIGO GS1-128 O SSCC..."
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-6 pl-14 pr-6 text-2xl font-mono text-white placeholder:text-white/10 focus:border-primary/50 outline-none transition-all tracking-wider"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className="text-[10px] font-bold text-white/30 uppercase mr-2">Auto-Commit</span>
                      <div className="w-10 h-6 bg-primary/20 rounded-full p-1 relative">
                        <div className="w-4 h-4 bg-primary rounded-full absolute right-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      className="flex-1 h-14 text-base sm:text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20 px-8"
                      isLoading={isScanning}
                    >
                      Procesar Entrada
                    </Button>
                    <button type="button" className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                      <Undo2 className="w-6 h-6" />
                    </button>
                  </div>
                </form>

                {/* Last Scan Tip */}
                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5 flex items-center gap-4">
                  <Package className="w-8 h-8 text-primary/60" />
                  <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Último Validado</p>
                    <p className="text-sm font-mono text-white/80">SSCC: 003758291000184730</p>
                  </div>
                  <div className="ml-auto text-emerald-500 bg-emerald-500/10 p-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Background Visual */}
              <div className="absolute top-[-50%] right-[-20%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            </Card>

            {/* Helper Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">En Espera</p>
                  <p className="text-xl font-black text-blue-900">42 Pallets</p>
                </div>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Capturados</p>
                  <p className="text-xl font-black text-emerald-900">12 / 54</p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Scan Log */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 px-2">
              Log de Captura
              <span className="ml-auto bg-slate-100 px-2 py-0.5 rounded text-[9px] text-slate-500">Sesión Activa</span>
            </h3>
            
            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {scannedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {item.status === "VALIDATED" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-secondary" />
                        )}
                        <span className="text-[10px] font-mono font-bold text-slate-400">{item.timestamp}</span>
                      </div>
                      <span className={clsx(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter",
                        item.status === "VALIDATED" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      )}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs font-black text-slate-800 font-mono mb-1 truncate">{item.sscc}</p>
                    <p className="text-[10px] text-slate-500 truncate">{item.description}</p>
                    
                    {/* Hover Detail Overlay */}
                    <div className="absolute inset-0 bg-primary/95 flex flex-col justify-center px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1">Operación SSCC</p>
                      <div className="flex gap-2">
                        <Button variant="ghost" className="h-6 text-[9px] bg-white/10 hover:bg-white/20 text-white border-white/10">Re-Imprimir</Button>
                        <Button variant="ghost" className="h-6 text-[9px] bg-white/10 hover:bg-white/20 text-white border-white/10">Corregir</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <Button variant="outline" className="w-full border-dashed border-2 py-8 text-slate-400 hover:text-primary hover:border-primary/30">
              Cargar Archivo de Respaldo (.CSV)
            </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan-line {
          0% { top: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 3s linear infinite;
        }
      `}</style>
    </Shell>
  );
}
