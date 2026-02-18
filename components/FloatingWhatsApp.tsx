import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronRight, X } from 'lucide-react';
import { Language } from '../types';
import { SERVICES, CONTACT_INFO } from '../constants';

interface FloatingWhatsAppProps {
  lang: Language;
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatData, setChatData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setChatData(data?.chat))
      .catch(err => console.error(err));
  }, []);

  const handleServiceClick = (serviceTitle: string) => {
    const message = lang === 'en'
      ? `Hello! I'm interested in the ${serviceTitle} service.`
      : `¡Hola! Estoy interesado en el servicio de ${serviceTitle}.`;
    const url = `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-28 md:bottom-10 right-6 md:right-10 z-[60] flex flex-col items-end">
      {/* Menu Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Services Menu */}
      <div className={`mb-4 w-72 md:w-80 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
        }`}>
        <div className="bg-[#25d366] p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-serif text-xl">Divine Support</h3>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <X size={20} />
            </button>
          </div>
          {chatData?.instructorImage && (
            <div className="flex items-center space-x-4 mb-4 bg-white/10 p-3 rounded-2xl">
              <img src="https://www.webcincodev.com/blog/wp-content/uploads/2026/02/asesor.png" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg" alt="Advisor" />
              <p className="text-[10px] font-bold tracking-tight">
                {chatData.message?.[lang] || (lang === 'en' ? 'Hi! How can I help you today?' : '¡Hola! ¿Cómo puedo ayudarte hoy?')}
              </p>
            </div>
          )}
          <p className="text-[9px] uppercase font-black tracking-widest opacity-80">
            {lang === 'en' ? 'Select a service:' : 'Selecciona un servicio:'}
          </p>
        </div>

        <div className="max-h-64 overflow-y-auto p-4 custom-scrollbar">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.title[lang])}
              className="w-full flex items-center justify-between p-4 mb-2 bg-[#fdfcfb] hover:bg-white hover:shadow-md rounded-2xl transition-all group border border-transparent hover:border-gray-100"
            >
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider text-left">
                {service.title[lang]}
              </span>
              <ChevronRight size={14} className="text-[#25d366] transform group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group focus:outline-none"
      >
        <div className={`absolute -top-12 right-0 bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 transition-all duration-500 transform ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
          <p className="text-[9px] font-black text-[#25d366] uppercase tracking-widest whitespace-nowrap">
            {chatData?.message?.[lang] || (lang === 'en' ? 'Chat now' : 'Chat ahora')}
          </p>
          <div className="absolute top-full right-6 w-2 h-2 bg-white rotate-45 -translate-y-1 border-r border-b border-gray-100"></div>
        </div>

        <div className={`p-1 bg-white rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-95 ${isOpen ? 'rotate-12' : ''}`}>
          <div className="w-14 h-14 rounded-xl overflow-hidden relative">
            <img
              src="https://www.webcincodev.com/blog/wp-content/uploads/2026/02/asesor.png"
              className="w-full h-full object-cover"
              alt="Advisor"
            />
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#25d366] border-2 border-white rounded-full"></div>
          </div>
        </div>
      </button>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #25d366;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default FloatingWhatsApp;
