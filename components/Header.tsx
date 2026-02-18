import React, { useState, useEffect } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
  lang: Language;
  toggleLang: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, toggleLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`fixed w-full z-[60] transition-all duration-500 ${scrolled
        ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3'
        : 'bg-transparent py-6'
        }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo Brand */}
            <a href="#home" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <img
                src="https://www.webcincodev.com/blog/wp-content/uploads/2026/02/Aesthetics-2.png"
                alt="Divine Aesthetics Logo"
                className="h-14 md:h-20 w-auto object-contain"
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[10px] font-black text-gray-700 hover:text-[#56b4bd] transition-colors uppercase tracking-[0.2em]"
                >
                  {link.label[lang]}
                </a>
              ))}
              <div className="h-4 w-[1px] bg-gray-200"></div>
              <button
                onClick={toggleLang}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-gray-100 text-[10px] font-bold hover:bg-gray-50 transition-all uppercase tracking-widest"
              >
                <Globe size={14} className="text-[#56b4bd]" />
                <span>{lang === 'en' ? 'ES' : 'EN'}</span>
              </button>
              <a
                href="#contact"
                className="bg-[#1a1a1a] text-white px-8 py-3 rounded-2xl text-[10px] font-black shadow-xl hover:bg-black transition-all transform hover:scale-105 uppercase tracking-[0.2em]"
              >
                {lang === 'en' ? 'BOOKING' : 'RESERVAS'}
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleLang}
                className="p-2 text-gray-600 hover:text-[#56b4bd] transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <Globe size={16} />
                  <span className="text-[10px] font-bold">{lang === 'en' ? 'ES' : 'EN'}</span>
                </div>
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl text-[#1a1a1a] hover:text-[#56b4bd] transition-all active:scale-90 border border-gray-100"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div className={`fixed inset-0 z-[55] bg-white transition-all duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex flex-col h-full pt-32 pb-12 px-8 overflow-y-auto">
          <div className="flex flex-col space-y-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-serif text-[#1a1a1a] hover:text-[#56b4bd] transition-colors"
              >
                {link.label[lang]}
              </a>
            ))}
          </div>

          <div className="mt-auto space-y-8 pt-12 border-t border-gray-100">
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-[#1a1a1a] text-white py-6 rounded-[2rem] text-sm font-black uppercase tracking-[0.3em] shadow-2xl"
            >
              {lang === 'en' ? 'BOOK AN APPOINTMENT' : 'RESERVAR UNA CITA'}
            </a>

            <div className="flex justify-center space-x-8 text-gray-400">
              <p className="text-[10px] uppercase font-black tracking-widest">Divine Aesthetics Spa</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;