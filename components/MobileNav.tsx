
import React, { useState, useEffect } from 'react';
import { Home, Sparkles, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { Language } from '../types';

interface MobileNavProps {
  lang: Language;
}

const MobileNav: React.FC<MobileNavProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: { en: 'Home', es: 'Inicio' } },
    { id: 'services', icon: Sparkles, label: { en: 'Services', es: 'Servicios' } },
    { id: 'gallery', icon: ImageIcon, label: { en: 'Gallery', es: 'Galería' } },
    { id: 'contact', icon: MessageSquare, label: { en: 'Contact', es: 'Contacto' } },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-safe pb-4">
      <div className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] flex items-center justify-around py-3 px-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center justify-center relative w-16 h-12 transition-all duration-300"
          >
            <item.icon
              size={20}
              className={`transition-colors duration-300 ${
                activeTab === item.id ? 'text-[#56b4bd]' : 'text-gray-400'
              }`}
            />
            <span
              className={`text-[9px] mt-1 font-bold uppercase tracking-widest transition-colors duration-300 ${
                activeTab === item.id ? 'text-[#56b4bd]' : 'text-gray-400'
              }`}
            >
              {item.label[lang]}
            </span>
            {activeTab === item.id && (
              <span className="absolute -top-1 w-1 h-1 bg-[#56b4bd] rounded-full shadow-[0_0_8px_#56b4bd]"></span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;