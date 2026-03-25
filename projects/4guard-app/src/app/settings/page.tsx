"use client";

import React, { useState } from "react";
import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Monitor, 
  Moon, 
  Sun,
  Save,
  LogOut,
  Key,
  Building2,
  Smartphone
} from "lucide-react";
import { clsx } from "clsx";
import { useStore } from "@/lib/store";
import { useAppStore, ROLES } from "@/store/useAppStore";

export default function SettingsPage() {
  const { user, setAuthenticated } = useStore();
  const { userRole } = useAppStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    quality: true,
    reception: false,
    expedition: true,
  });

  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "notifications", label: "Notificaciones", icon: Bell },
    { id: "security", label: "Seguridad", icon: Shield },
    { id: "system", label: "Sistema", icon: Building2 },
  ];

  return (
    <Shell>
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl text-foreground font-work-sans font-bold tracking-tight">Configuración</h1>
            <p className="text-foreground/50 mt-2 font-inter text-lg">Administra tu cuenta y preferencias</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1 p-4 h-fit">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/60 hover:bg-surface-container hover:text-foreground"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            {activeTab === "profile" && (
              <Card className="p-6">
                <h2 className="text-lg font-bold font-work-sans mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Información del Perfil
                </h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center">
                    <User className="w-10 h-10 text-foreground/30" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{user?.name || "Usuario"}</h3>
                    <p className="text-sm text-foreground/50">{ROLES[userRole]?.label || "Usuario"}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Cambiar Foto
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name || ""}
                      className="w-full bg-surface-container border border-foreground/10 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      defaultValue="usuario@4guard.com"
                      className="w-full bg-surface-container border border-foreground/10 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">
                      Almacén Asignado
                    </label>
                    <select className="w-full bg-surface-container border border-foreground/10 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                      <option>WH-CENTRO-NORTE (CN-01)</option>
                      <option>WH-SUR (CS-01)</option>
                      <option>WH-ESTE (CE-01)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">
                      Turno
                    </label>
                    <select className="w-full bg-surface-container border border-foreground/10 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                      <option>Matutino (06:00 - 14:00)</option>
                      <option>Vespertino (14:00 - 22:00)</option>
                      <option>Nocturno (22:00 - 06:00)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button variant="primary">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="p-6">
                <h2 className="text-lg font-bold font-work-sans mb-6 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Preferencias de Notificaciones
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificaciones por Email</p>
                      <p className="text-sm text-foreground/50">Recibe alertas por correo electrónico</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                      className={clsx(
                        "w-12 h-6 rounded-full transition-colors relative",
                        notifications.email ? "bg-primary" : "bg-surface-container"
                      )}
                    >
                      <div className={clsx(
                        "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow",
                        notifications.email ? "left-6" : "left-0.5"
                      )} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificaciones Push</p>
                      <p className="text-sm text-foreground/50">Alertas en tiempo real en el navegador</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                      className={clsx(
                        "w-12 h-6 rounded-full transition-colors relative",
                        notifications.push ? "bg-primary" : "bg-surface-container"
                      )}
                    >
                      <div className={clsx(
                        "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow",
                        notifications.push ? "left-6" : "left-0.5"
                      )} />
                    </button>
                  </div>

                  <hr className="border-foreground/10" />

                  <div>
                    <p className="font-medium mb-4">Módulos de Alerta</p>
                    <div className="space-y-3">
                      {[
                        { key: "quality", label: "Calidad", desc: "Incidencias y liberaciones" },
                        { key: "reception", label: "Recepción", desc: "Arribos y cuadratura" },
                        { key: "expedition", label: "Expedición", desc: "Oleadas y despachos" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{item.label}</p>
                            <p className="text-xs text-foreground/50">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                            className={clsx(
                              "w-10 h-5 rounded-full transition-colors relative",
                              notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-surface-container"
                            )}
                          >
                            <div className={clsx(
                              "w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform shadow",
                              notifications[item.key as keyof typeof notifications] ? "left-5" : "left-0.5"
                            )} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "security" && (
              <Card className="p-6">
                <h2 className="text-lg font-bold font-work-sans mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Configuración de Seguridad
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl">
                    <div className="flex items-center gap-4">
                      <Key className="w-5 h-5 text-foreground/50" />
                      <div>
                        <p className="font-medium">Cambiar Contraseña</p>
                        <p className="text-sm text-foreground/50">Último cambio: hace 30 días</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Actualizar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl">
                    <div className="flex items-center gap-4">
                      <Smartphone className="w-5 h-5 text-foreground/50" />
                      <div>
                        <p className="font-medium">Autenticación de Dos Factores</p>
                        <p className="text-sm text-foreground/50">Estado: No configurado</p>
                      </div>
                    </div>
                    <Button variant="primary" size="sm">
                      Configurar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl">
                    <div className="flex items-center gap-4">
                      <LogOut className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="font-medium text-secondary">Cerrar Sesión</p>
                        <p className="text-sm text-foreground/50">Cerrar en todos los dispositivos</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-secondary/20 text-secondary hover:bg-secondary/5"
                      onClick={() => {
                        setAuthenticated(false);
                        window.location.href = "/login";
                      }}
                    >
                      Cerrar
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "system" && (
              <Card className="p-6">
                <h2 className="text-lg font-bold font-work-sans mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Configuración del Sistema
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">
                      Idioma de la Interfaz
                    </label>
                    <select className="w-full bg-surface-container border border-foreground/10 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                      <option>Español (México)</option>
                      <option>English (US)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">
                      Zona Horaria
                    </label>
                    <select className="w-full bg-surface-container border border-foreground/10 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                      <option>America/Mexico_City (GMT-6)</option>
                      <option>America/Bogota (GMT-5)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Modo Oscuro</p>
                      <p className="text-sm text-foreground/50">Cambiar tema de la interfaz</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-surface-container">
                      <Moon className="w-5 h-5 text-foreground/50" />
                    </button>
                  </div>

                  <div className="p-4 bg-surface-container rounded-xl">
                    <p className="text-xs font-bold text-foreground/40 uppercase tracking-wider mb-2">Versión del Sistema</p>
                    <p className="font-mono text-sm">4-GUARD WMS v1.2.0-build.2026.03.25</p>
                    <p className="text-xs text-foreground/40 mt-1">The Vault Security System</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}
