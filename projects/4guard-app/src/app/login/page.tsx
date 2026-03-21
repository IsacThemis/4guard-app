"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const setAuthenticated = useStore((state) => state.setAuthenticated);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular latencia de red de alta seguridad
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setAuthenticated(true, { name: "Carlos Ruíz", role: "Supervisor de Turno" });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#000515] flex items-center justify-center p-6 relative overflow-hidden font-inter">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 dot-grid opacity-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-4"
          >
            <ShieldCheck className="text-primary w-10 h-10" />
          </motion.div>
          <h1 className="text-3xl font-work-sans font-black text-white tracking-tighter uppercase">
            4-GUARD <span className="text-primary-container font-light">WMS</span>
          </h1>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold mt-2">
            The Vault Security System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white font-work-sans">Acceso Restringido</h2>
            <p className="text-sm text-white/50 mt-1">Ingresa tus credenciales para acceder a la terminal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block ml-1">
                Identificador de Usuario
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  required
                  placeholder="Ej: CRUIZ-99"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 focus:ring-1 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all font-inter text-sm"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block ml-1">
                Contraseña Encriptada
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 focus:ring-1 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all font-inter text-sm"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary hover:bg-[#0010a0] text-white font-bold transition-all shadow-[0_4px_15px_rgba(0,5,150,0.3)] group"
              isLoading={isLoading}
            >
              {!isLoading && (
                <>
                  Verificar Identidad
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Helper links */}
          <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
            <button className="text-[10px] font-bold text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest">
              ¿Olvidaste tu clave?
            </button>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest">Servidores Online</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-10 text-center">
          <p className="text-[9px] text-white/20 font-medium uppercase tracking-[0.2em] leading-relaxed">
            Propiedad de 4-GUARD Systems S.A. de C.V.<br />
            El acceso no autorizado será monitoreado y reportado.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
