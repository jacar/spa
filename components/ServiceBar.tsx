
import React from 'react';
import { Language } from '../types';
import { SERVICE_BAR_HIGHLIGHTS, getIcon } from '../constants';

interface ServiceBarProps {
  lang: Language;
}

export default function ServiceBar({ lang }: ServiceBarProps) {
  return (
    <div className="relative bg-[#7c3aed] py-8 overflow-hidden z-10">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {SERVICE_BAR_HIGHLIGHTS.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-4 group"
              style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
            >
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/5 group-hover:scale-110 transition-transform duration-500">
                {/* Override the default teal icon color with white for this purple bar */}
                {React.cloneElement(getIcon(item.icon) as React.ReactElement<any>, { className: "text-white" })}
              </div>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/90">
                {item.label[lang]}
              </span>
              
              {/* Divider for desktop */}
              {index < SERVICE_BAR_HIGHLIGHTS.length - 1 && (
                <div className="hidden lg:block w-[1px] h-8 bg-white/10 ml-8"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
