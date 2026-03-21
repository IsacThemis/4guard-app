"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, User, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import Button from "@/components/ui/Button";

interface Message {
    id: string;
    role: "user" | "bot";
    text: string;
    timestamp: Date;
}

export default function AssistantBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "bot", text: "Hola, soy The Oracle. ¿En qué puedo ayudarte hoy con la operación?", timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            text: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulated AI Response
        setTimeout(() => {
            let botText = "No tengo esa información exacta ahora, pero puedo buscarla en el manual de procedimientos.";
            
            const lowerInput = inputValue.toLowerCase();
            if (lowerInput.includes("sku") || lowerInput.includes("donde")) {
                botText = "El SKU solicitado se encuentra mayoritariamente en la zona A-04 (Picking de Alta Densidad). Hay 450 unidades disponibles.";
            } else if (lowerInput.includes("hola") || lowerInput.includes("buenos")) {
                botText = "¡Hola! Estoy listo para optimizar tu jornada. ¿Consultamos el estado de las oleadas?";
            } else if (lowerInput.includes("alerta") || lowerInput.includes("problema")) {
                botText = "He detectado 3 alertas críticas en el sistema. Te recomiendo revisar el Panel de Control de Inventarios.";
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                text: botText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <div className="fixed bottom-8 right-8 z-[100]">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={clsx(
                        "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors relative overflow-hidden group",
                        isOpen ? "bg-slate-900 text-white" : "bg-primary text-white"
                    )}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {isOpen ? <X className="w-8 h-8 relative z-10" /> : <Bot className="w-8 h-8 relative z-10" />}
                    
                    {!isOpen && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                            1
                        </span>
                    )}
                </motion.button>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-100 z-[100] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 p-6 text-white relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-white/20">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg font-work-sans leading-none">The Oracle</h3>
                                    <p className="text-white/50 text-[10px] uppercase tracking-widest mt-1 font-bold">AI Operational Intelligence</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
                        >
                            {messages.map((m) => (
                                <motion.div 
                                    key={m.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={clsx(
                                        "flex gap-3",
                                        m.role === "user" ? "flex-row-reverse" : "flex-row"
                                    )}
                                >
                                    <div className={clsx(
                                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                        m.role === "bot" ? "bg-primary/10 text-primary" : "bg-slate-200 text-slate-500"
                                    )}>
                                        {m.role === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </div>
                                    <div className={clsx(
                                        "max-w-[80%] p-4 rounded-2xl shadow-sm text-sm font-inter leading-relaxed",
                                        m.role === "bot" ? "bg-white text-slate-800" : "bg-primary text-white"
                                    )}>
                                        {m.text}
                                        <div className={clsx(
                                            "text-[9px] mt-2 font-bold opacity-40",
                                            m.role === "user" ? "text-right" : "text-left"
                                        )}>
                                            {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-200">
                                <input 
                                    type="text" 
                                    placeholder="Pregunta algo sobre la operación..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm px-2 font-inter"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button 
                                    onClick={handleSend}
                                    className="p-2 bg-primary text-white rounded-xl shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex gap-2 mt-3 px-1 overflow-x-auto pb-1 no-scrollbar">
                                {["¿Dónde está el SKU 123?", "¿Alertas hoy?", "Estatus Ola"].map(hint => (
                                    <button 
                                        key={hint}
                                        onClick={() => setInputValue(hint)}
                                        className="whitespace-nowrap text-[10px] font-bold text-slate-400 border border-slate-200 rounded-full px-3 py-1 hover:border-primary/40 hover:text-primary transition-colors"
                                    >
                                        {hint}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

