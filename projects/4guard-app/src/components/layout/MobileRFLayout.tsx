import React from "react";
import { Signal, Battery, Wifi } from "lucide-react";

export default function MobileRFLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 p-4">
      {/* Mobile Device Container (simulating an industrial Zebra Terminal) */}
      <div className="w-full max-w-[400px] h-[800px] max-h-[90vh] bg-surface flex flex-col rounded-[2rem] overflow-hidden shadow-2xl border-8 border-slate-800 relative">
        
        {/* Hardware Status Bar (mock) */}
        <div className="bg-black text-white px-4 py-1.5 flex justify-between items-center text-[10px] font-bold font-inter z-50">
          <div className="flex items-center gap-1">
            <span>TC8000</span>
          </div>
          <div className="flex items-center gap-2">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <div className="flex items-center gap-1">
              <span>94%</span>
              <Battery className="w-3 h-3" />
            </div>
            <span>14:30</span>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 relative">
          {children}
        </main>
        
        {/* Hardware Bottom Bezels (mock) */}
        <div className="h-6 bg-slate-800 flex justify-center items-center">
            <div className="w-1/3 h-1 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
