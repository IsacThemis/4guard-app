"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import RoleGuard from "@/components/auth/RoleGuard";
import { UserRole } from "@/store/useAppStore";
import { 
  Search, 
  Box, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  AlertTriangle, 
  ArrowLeft,
  Truck,
  QrCode,
  PackageCheck,
  ClipboardList,
  Shield,
  Car,
  User,
  Lock
} from "lucide-react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

// --- Validation Schemas ---

const metadataSchema = z.object({
  licensePlate: z.string().min(5, "Placas requeridas"),
  carrier: z.string().min(1, "Transportista requerido"),
  driverName: z.string().min(3, "Nombre del chofer requerido"),
  securitySeal: z.string().min(8, "Sello de seguridad (8 dígitos)"),
});

type MetadataFormData = z.infer<typeof metadataSchema>;

const asnSchema = z.object({
  asnNumber: z.string()
    .min(5, "El folio es demasiado corto")
    .regex(/^(ASN-|PO-)/i, "Debe iniciar con ASN- o PO-"),
});

type AsnFormData = z.infer<typeof asnSchema>;

// --- Components ---

export default function ReceptionPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [asnData, setAsnData] = useState<AsnFormData | null>(null);
  const [metadata, setMetadata] = useState<MetadataFormData | null>(null);
  const [lineItems, setLineItems] = useState([
    { sku: "NES-CLA-200", name: "Nescafé Clásico 200g", expected: 120, received: 120 },
    { sku: "DOG-CHO-4KG", name: "Dog Chow Adulto 4kg", expected: 50, received: 48 },
    { sku: "COK-LAT-355", name: "Coca Cola Lata 355ml", expected: 200, received: 200 },
  ]);

  const totalExpected = lineItems.reduce((acc, item) => acc + item.expected, 0);
  const totalReceived = lineItems.reduce((acc, item) => acc + item.received, 0);
  const isQuadratureComplete = totalExpected === totalReceived;
  const missingCount = totalExpected - totalReceived;

  const { register: registerMeta, handleSubmit: handleMetaSubmit, formState: { errors: metaErrors } } = useForm<MetadataFormData>({
    resolver: zodResolver(metadataSchema),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<AsnFormData>({
    resolver: zodResolver(asnSchema),
  });

  const onMetadataSubmit = (data: MetadataFormData) => {
    setMetadata(data);
    setCurrentStep(1);
  };

  const onAsnSubmit = (data: AsnFormData) => {
    setAsnData(data);
    setCurrentStep(2);
  };

  return (
    <RoleGuard allowedRoles={["SUPERVISOR", "MANAGER"]}>
    <Shell>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl text-foreground font-work-sans font-bold tracking-tight">Recepción de Mercancía</h1>
            <p className="text-foreground/50 mt-2 font-inter text-lg">Módulo de Ingreso Seguro (REC-01)</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-white border border-foreground/5 rounded-lg flex items-center gap-2 font-inter text-sm shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-foreground/70 font-bold uppercase tracking-widest text-[10px]">WMS Sync Activo</span>
             </div>
          </div>
        </div>

        {/* Dynamic Stepper */}
        <Card noPadding className="overflow-hidden shadow-xl border-foreground/5">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-foreground/5">
            <StepItem step={0} currentStep={currentStep} label="Metadatos" desc="Seguridad y Registro" icon={Shield} />
            <StepItem step={1} currentStep={currentStep} label="Folio 10 (Ingreso)" desc="Validación Documental" icon={FileText} />
            <StepItem step={2} currentStep={currentStep} label="Folio 20 (Física)" desc="Cruce Ciego Operativo" icon={Box} />
            <StepItem step={3} currentStep={currentStep} label="Folio 30 (Cierre)" desc="Asignación LPN" icon={CheckCircle2} />
          </div>
        </Card>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {currentStep === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="lg:col-span-2">
                <Card className="flex flex-col border-primary/20 bg-primary/5 p-8">
                  <h3 className="text-xl font-bold font-work-sans mb-6 flex items-center text-primary">
                    <Shield className="w-6 h-6 mr-4" /> Metadatos de Arribo
                  </h3>
                  <form onSubmit={handleMetaSubmit(onMetadataSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em] mb-3">
                          Placas (License Plate) <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            {...registerMeta("licensePlate")}
                            type="text" 
                            placeholder="ABC-1234"
                            className={clsx(
                              "w-full bg-white border rounded-xl px-4 py-4 text-foreground font-mono text-lg transition-all shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 uppercase",
                              metaErrors.licensePlate ? "border-red-500" : "border-foreground/10"
                            )}
                          />
                          <Car className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                        </div>
                        {metaErrors.licensePlate && (
                          <p className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> {metaErrors.licensePlate.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em] mb-3">
                          Empresa Transportista
                        </label>
                        <select 
                          {...registerMeta("carrier")}
                          className={clsx(
                            "w-full bg-white border rounded-xl px-4 py-4 text-foreground font-medium transition-all shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none",
                            metaErrors.carrier ? "border-red-500" : "border-foreground/10"
                          )}
                        >
                          <option value="">Seleccionar transportista...</option>
                          <option>Logística Federal S.A.</option>
                          <option>Transportes Atlas</option>
                          <option>Red Cargo Express</option>
                          <option>External Carrier</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em] mb-3">
                          Nombre del Chofer <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            {...registerMeta("driverName")}
                            type="text" 
                            placeholder="JUAN PÉREZ LÓPEZ"
                            className={clsx(
                              "w-full bg-white border rounded-xl px-4 py-4 text-foreground font-medium transition-all shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20",
                              metaErrors.driverName ? "border-red-500" : "border-foreground/10"
                            )}
                          />
                          <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                        </div>
                        {metaErrors.driverName && (
                          <p className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> {metaErrors.driverName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em] mb-3">
                          Sellos de Seguridad <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            {...registerMeta("securitySeal")}
                            type="text" 
                            placeholder="SEAL-00000000"
                            className={clsx(
                              "w-full bg-white border rounded-xl px-4 py-4 text-foreground font-mono text-lg transition-all shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 uppercase",
                              metaErrors.securitySeal ? "border-red-500" : "border-foreground/10"
                            )}
                          />
                          <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                        </div>
                        {metaErrors.securitySeal && (
                          <p className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> {metaErrors.securitySeal.message}
                          </p>
                        )}
                        <p className="text-[10px] text-foreground/40 mt-2">Ingrese los 8 dígitos del sello principal.</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <Button variant="outline" type="button" className="h-12">
                        Pausar Recepción
                      </Button>
                      <Button variant="primary" className="h-12 px-12" type="submit">
                        Guardar y Continuar
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6 bg-primary-container text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5" />
                    <h4 className="text-sm font-bold uppercase tracking-wider">Protocolo de Bóveda</h4>
                  </div>
                  <ul className="space-y-4 text-sm">
                    <li className="flex gap-3">
                      <span className="font-black text-primary-fixed">01</span>
                      <div>
                        <p className="font-bold text-xs uppercase">Verify Plates</p>
                        <p className="text-white/60 text-xs">Coteje físicamente las placas del tracto y la caja.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-black text-primary-fixed">02</span>
                      <div>
                        <p className="font-bold text-xs uppercase">Official ID Check</p>
                        <p className="text-white/60 text-xs">Escanee identificación oficial del chofer.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-black text-primary-fixed">03</span>
                      <div>
                        <p className="font-bold text-xs uppercase">Inspect Seals</p>
                        <p className="text-white/60 text-xs">Verifique integridad de sellos.</p>
                      </div>
                    </li>
                  </ul>
                </Card>

                <Card className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-bold uppercase text-foreground/60">Sincronizado</span>
                  </div>
                  <span className="text-[10px] font-mono text-foreground/40">ID: REC-VLT-00912-A</span>
                </Card>
              </div>
            </div>
          )}

          {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="flex flex-col justify-center border-primary/20 bg-primary/5 p-8">
                      <h3 className="text-xl font-bold font-work-sans mb-6 flex items-center text-primary">
                        <Search className="w-6 h-6 mr-4" /> Búsqueda Manual
                      </h3>
                      <form onSubmit={handleSubmit(onAsnSubmit)} className="space-y-6">
                          <div>
                              <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em] mb-3">Número de ASN / PO (Folio 10)</label>
                              <input 
                                {...register("asnNumber")}
                                type="text" 
                                placeholder="Ej. ASN-2026-0014" 
                                className={clsx(
                                    "w-full bg-white border rounded-xl px-4 py-4 text-foreground font-mono text-lg transition-all shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20",
                                    errors.asnNumber ? "border-red-500" : "border-foreground/10"
                                )}
                              />
                              {errors.asnNumber && (
                                <p className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" /> {errors.asnNumber.message}
                                </p>
                              )}
                          </div>
                          <Button variant="primary" className="w-full h-14 text-sm uppercase tracking-widest font-bold" type="submit">
                              Validar Documento
                              <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                      </form>
                  </Card>

                  <Card className="flex flex-col items-center justify-center text-center p-12 border-dashed border-foreground/20 hover:border-primary/50 transition-all group cursor-pointer bg-white shadow-sm overflow-hidden relative">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                      <div className="w-24 h-24 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm border border-slate-100">
                          <ScanIcon className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold font-work-sans text-slate-800 mb-3">Escaneo Rápido</h3>
                      <p className="text-slate-500 font-inter text-sm max-w-xs mx-auto leading-relaxed">
                          Utilice la terminal RF para escanear el código QR del manifiesto de arribo.
                      </p>
                      <div className="mt-8 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                        <QrCode className="w-4 h-4" /> Activar Cámara
                      </div>
                  </Card>
              </div>
          )}

          {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex justify-between items-center">
                    <Button variant="ghost" onClick={() => setCurrentStep(1)} className="text-slate-400 font-bold text-xs">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Folio 10
                    </Button>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ASN Activo</p>
                            <p className="font-mono font-bold text-primary">{asnData?.asnNumber}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Truck className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                  </div>

                  <Card noPadding className="border-foreground/5 shadow-inner">
                      <div className="p-6 border-b border-foreground/5 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-lg font-work-sans text-slate-800 flex items-center gap-2">
                             <ClipboardList className="w-5 h-5 text-primary" /> Cruce Ciego Operativo (Folio 20)
                        </h3>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            3 SKUs Esperados
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                           <thead>
                              <tr className="bg-white border-b border-foreground/5">
                                 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKU / Descripción</th>
                                 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Esperado</th>
                                 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recibido</th>
                                 <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Desviación</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-50">
                               {lineItems.map((item, index) => (
                                   <tr key={item.sku} className="hover:bg-slate-50/50 transition-colors">
                                       <td className="px-6 py-4">
                                            <div className="font-mono text-sm font-bold text-slate-800">{item.sku}</div>
                                            <div className="text-xs text-slate-400">{item.name}</div>
                                       </td>
                                       <td className="px-6 py-4 font-bold text-slate-800">{item.expected} pz</td>
                                       <td className="px-6 py-4">
                                            <input 
                                                type="number" 
                                                value={item.received}
                                                onChange={(e) => {
                                                    const newItems = [...lineItems];
                                                    newItems[index].received = parseInt(e.target.value) || 0;
                                                    setLineItems(newItems);
                                                }}
                                                className="w-20 bg-white border border-slate-200 rounded-lg px-2 py-1.5 font-bold text-sm focus:border-primary outline-none"
                                            />
                                       </td>
                                       <td className="px-6 py-4">
                                            <span className={clsx(
                                                "text-xs font-bold px-2 py-1 rounded-full",
                                                item.expected === item.received ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            )}>
                                                {item.received - item.expected}
                                            </span>
                                       </td>
                                   </tr>
                               ))}
                           </tbody>
                        </table>
                      </div>
                  </Card>

                  <div className="flex justify-end gap-4 pt-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className={clsx("h-full rounded-full transition-all", isQuadratureComplete ? "bg-green-500" : "bg-amber-500")}
                                    style={{ width: `${(totalReceived / totalExpected) * 100}%` }}
                                />
                            </div>
                            <span className="text-sm font-bold">
                                {totalReceived} / {totalExpected} ({Math.round((totalReceived / totalExpected) * 100)}%)
                            </span>
                        </div>
                        {!isQuadratureComplete && (
                            <p className="text-xs text-red-500 font-medium">
                                Faltan {missingCount} pallets para completar la recepción
                            </p>
                        )}
                    </div>
                    <Button variant="outline" className="h-12 border-secondary/20 text-secondary hover:bg-secondary/5">
                        Registrar Anomalia
                    </Button>
                    <Button 
                        variant="primary" 
                        className={clsx("h-12 px-12", !isQuadratureComplete && "opacity-50 cursor-not-allowed")}
                        disabled={!isQuadratureComplete}
                        onClick={() => isQuadratureComplete && setCurrentStep(3)}
                        title={!isQuadratureComplete ? `Faltan ${missingCount} pallets para cerrar` : ""}
                    >
                        Completar Recepción Física
                    </Button>
                  </div>
              </div>
          )}

          {currentStep === 3 && (
              <div className="flex flex-col items-center justify-center p-12 space-y-8 animate-in zoom-in-95 duration-500">
                  <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center shadow-lg shadow-green-100/50">
                    <PackageCheck className="w-16 h-16 text-green-600" />
                  </div>
                  <div className="text-center max-w-md">
                    <h2 className="text-3xl font-work-sans font-bold text-slate-900 mb-4">Recepción Exitosa (Folio 30)</h2>
                    <p className="text-slate-500 leading-relaxed font-inter">
                        Se han generado <strong>24 etiquetas LPN</strong> para el almacenamiento. Folio 30 cerrado en SAP S/4HANA.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                    <Button variant="outline" className="h-14 font-bold uppercase tracking-widest text-xs">
                        Imprimir Todo
                    </Button>
                    <Button variant="primary" className="h-14 font-bold uppercase tracking-widest text-xs" onClick={() => {
                        setCurrentStep(0);
                        setAsnData(null);
                    }}>
                        Nueva Recepción
                    </Button>
                  </div>
              </div>
          )}
        </div>

      </div>
    </Shell>
    </RoleGuard>
  );
}

function StepItem({ step, currentStep, label, desc, icon: Icon }: { step: number, currentStep: number, label: string, desc: string, icon: React.ElementType }) {
    const isActive = step === currentStep;
    const isPast = step < currentStep;

    return (
        <div className={clsx(
            "flex-1 p-8 relative transition-all duration-500",
            isActive ? "bg-primary/5" : "bg-white",
            isPast ? "opacity-60 grayscale-[0.5]" : ""
        )}>
            {isActive && <motion.div layoutId="active-step" className="absolute top-0 left-0 w-full h-1.5 bg-primary shadow-[0_2px_10px_rgba(var(--primary-rgb),0.5)]"></motion.div>}
            <div className="flex items-center gap-5">
                <div className={clsx(
                    "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm border transition-all duration-300",
                    isActive ? "bg-primary text-white border-primary rotate-3" : isPast ? "bg-green-500 text-white border-green-500" : "bg-slate-50 text-slate-300 border-slate-100"
                )}>
                    {isPast ? <CheckCircle2 className="w-6 h-6" /> : step}
                </div>
                <div>
                   <h4 className={clsx("font-bold text-base font-work-sans tracking-tight", isActive ? "text-primary" : "text-slate-800")}>{label}</h4>
                   <p className="text-xs text-slate-400 mt-1 font-inter font-medium">{desc}</p>
                </div>
            </div>
        </div>
    );
}

function ScanIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <line x1="7" x2="17" y1="12" y2="12" />
      </svg>
    )
}
