import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from '../constants';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const [links, setLinks] = useState<any>(SOCIAL_LINKS);

  useEffect(() => {
    fetch('http://localhost:3005/api/content')
      .then(res => res.json())
      .then(data => {
        if (data?.socials) setLinks(data.socials);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <footer className="bg-[#0a0a0a] text-white pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-8">
              <img
                src="https://www.webcincodev.com/blog/wp-content/uploads/2026/02/Aesthetics-2.png"
                alt="Divine Aesthetics Logo"
                className="h-28 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-500 max-w-sm mb-10 leading-relaxed font-light text-lg">
              {lang === 'en'
                ? 'Elevating natural beauty through Colombian expertise and premium aesthetic treatments in Jacksonville.'
                : 'Elevando la belleza natural a través de la experiencia colombiana y tratamientos estéticos premium en Jacksonville.'}
            </p>
            <div className="flex space-x-6 text-[10px] font-black tracking-[0.3em] text-[#56b4bd] uppercase">
              <span>#DivineAesthetics</span>
              <span>#YesicaSerrano</span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">
              {lang === 'en' ? 'Navigation' : 'Navegación'}
            </h4>
            <ul className="space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-500 hover:text-[#56b4bd] transition-colors text-sm font-medium">
                    {link.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">
              {lang === 'en' ? 'Follow Divine' : 'Sigue a Divine'}
            </h4>
            <ul className="space-y-4">
              <li>
                <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">
                  Instagram
                </a>
              </li>
              <li>
                <a href={links.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">
                  TikTok
                </a>
              </li>
              <li>
                <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Divine Aesthetics Spa. Jacksonville, FL.</p>
          <div className="mt-6 md:mt-0 space-x-8">
            <span className="cursor-default opacity-50">
              {lang === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}
            </span>
            <span className="cursor-default opacity-50">
              {lang === 'en' ? 'Terms of Service' : 'Términos de Servicio'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;