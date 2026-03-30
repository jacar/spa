
import React, { useState, useEffect } from 'react';
import { Home, Sparkles, Image as ImageIcon, MessageSquare, Split } from 'lucide-react';
import { Language } from '../types';

interface MobileNavProps {
  lang: Language;
}

const MobileNav: React.FC<MobileNavProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'results', 'gallery', 'contact'];
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
    { id: 'results', icon: Split, label: { en: 'Results', es: 'Resultados' } },
    { id: 'gallery', icon: ImageIcon, label: { en: 'Gallery', es: 'Galería' } },
    { id: 'contact', icon: MessageSquare, label: { en: 'Contact', es: 'Contacto' } },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-[100] px-6 pointer-events-none">
      <div className="bg-white/90 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] flex items-center justify-around py-4 px-2 pointer-events-auto">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center justify-center relative transition-all duration-300 group px-3 h-16"
          >
            <item.icon
              size={26}
              className={`transition-all duration-500 ${activeTab === item.id
                ? 'text-[#56b4bd] scale-125 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.15)]'
                : 'text-gray-400 opacity-70 group-hover:opacity-100'
                }`}
            />
            <span
              className={`text-[8px] mt-2 font-bold uppercase tracking-[0.1em] transition-all duration-500 ${activeTab === item.id
                ? 'text-[#56b4bd] opacity-100'
                : 'text-gray-400 opacity-60'
                }`}
            >
              {item.label[lang]}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;