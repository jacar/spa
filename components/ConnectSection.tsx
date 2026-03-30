
import React from 'react';
import { Language } from '../types';
import { CONTACT_INFO } from '../constants';

interface ConnectSectionProps {
  lang: Language;
}

const ConnectSection: React.FC<ConnectSectionProps> = ({ lang }) => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-[#333] italic mb-4">
            Owner & Full Specialist
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 relative">
          {/* QR Code Placeholder 1 (Black Style) */}
          <div className="w-64 h-64 md:w-80 md:h-80 bg-white border-2 border-gray-100 rounded-[2.5rem] p-6 shadow-xl flex items-center justify-center relative group">
            <div className="w-full h-full bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-dashed border-gray-300">
              <div className="grid grid-cols-4 gap-2 opacity-20">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-black rounded-sm"></div>
                ))}
              </div>
              <span className="mt-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Scan Me</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="bg-white p-2 rounded-xl shadow-md border border-gray-100 font-serif font-bold text-2xl">b</div>
            </div>
          </div>

          {/* Center Divider Line & Logo */}
          <div className="hidden md:flex flex-col items-center h-80 justify-center">
            <div className="w-[2px] flex-1 bg-[#56b4bd] opacity-40"></div>
            <div className="my-6 text-[#56b4bd] p-4 bg-white shadow-2xl rounded-full border border-gray-50 transform hover:scale-110 transition-transform">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 20c-10 0-18 8-18 18 0 10 8 18 18 18s18-8 18-18c0-10-8-18-18-18zm0 30c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z" opacity="0.3"/>
                <path d="M50 60c-15 0-25 10-25 20h50c0-10-10-20-25-20z" opacity="0.8"/>
              </svg>
            </div>
            <div className="w-[2px] flex-1 bg-[#56b4bd] opacity-40"></div>
          </div>

          {/* QR Code Placeholder 2 (Teal Style) */}
          <div className="w-64 h-64 md:w-80 md:h-80 bg-white border-2 border-gray-100 rounded-[2.5rem] p-6 shadow-xl flex items-center justify-center relative">
            <div className="w-full h-full bg-[#56b4bd]/5 rounded-2xl flex flex-col items-center justify-center border border-dashed border-[#56b4bd]/20">
              <div className="grid grid-cols-4 gap-2 opacity-20">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-[#56b4bd] rounded-sm"></div>
                ))}
              </div>
              <span className="mt-4 text-[10px] font-black text-[#56b4bd]/30 uppercase tracking-widest">Book Now</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="bg-white p-2 rounded-xl shadow-md border border-gray-100 text-[#56b4bd]">
                 <svg width="24" height="24" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 30c-10 0-15 10-15 20s5 20 15 20 15-10 15-20-5-20-15-20z"/>
                 </svg>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center space-y-4">
          <p className="text-xl md:text-2xl font-bold tracking-tight text-[#333]">
            {lang === 'en' ? 'Find out more by scanning the QR codes.' : 'Descubre más escaneando los códigos QR.'}
          </p>
          <p className="text-lg md:text-xl font-light italic text-gray-400">
            {CONTACT_INFO.tagline[lang]}
          </p>
          <div className="pt-8">
            <a 
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="text-4xl md:text-7xl font-bold text-[#56b4bd] block hover:scale-105 transition-transform"
            >
              {CONTACT_INFO.phone}
            </a>
            <a 
              href={`https://${CONTACT_INFO.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-light text-[#333] hover:text-[#56b4bd] transition-colors mt-4 block"
            >
              {CONTACT_INFO.website}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
