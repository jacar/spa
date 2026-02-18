
import React from 'react';
import { Language } from '../types';
import { CONTACT_INFO } from '../constants';

interface HeroProps {
  lang: Language;
  previewData?: any;
}

const Hero: React.FC<HeroProps> = ({ lang, previewData }) => {
  const [content, setContent] = React.useState<any>(null);

  React.useEffect(() => {
    if (previewData) return;
    fetch('http://localhost:3005/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error(err));
  }, [previewData]);

  const heroData = previewData || content?.hero || {
    title: {
      en: 'Enhance Your Natural Beauty',
      es: 'Realza Tu Belleza Natural'
    },
    backgroundImage: 'https://www.webcincodev.com/blog/wp-content/uploads/2026/02/headerpng.png'
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#faf9f6]">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroData.backgroundImage}
          alt="Divine Spa Ambience"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white/95 via-white/40 to-transparent"></div>
        {/* Mobile-only darker bottom gradient to make content pop */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 w-full pt-20 md:pt-0">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-2 bg-[#56b4bd]/10 text-[#56b4bd] text-[10px] font-black tracking-[0.3em] rounded-2xl mb-6 md:mb-8 uppercase backdrop-blur-sm border border-[#56b4bd]/10">
            {lang === 'en' ? 'YESICA SERRANO | OWNER & FULL SPECIALIST' : 'YÉSICA SERRANO | DUEÑA Y ESPECIALISTA'}
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-[#1a1a1a] mb-6 md:mb-8 leading-[1.1] tracking-tight">
            {heroData.title[lang]}
          </h1>
          <p className="text-base md:text-2xl text-gray-700 mb-4 leading-relaxed font-light italic max-w-lg">
            {CONTACT_INFO.tagline[lang]}
          </p>
          <p className="text-sm md:text-lg text-gray-500 mb-10 md:mb-12 leading-relaxed font-light max-w-lg">
            {lang === 'en'
              ? 'Personalized aesthetic experiences designed to reveal your skin\'s unique radiance and health.'
              : 'Experiencias estéticas personalizadas diseñadas para revelar la luminosidad y salud única de tu piel.'}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="#services"
              className="px-10 py-5 bg-[#1a1a1a] text-white rounded-[1.5rem] font-black shadow-2xl hover:bg-black transition-all text-center tracking-[0.2em] text-[10px] active:scale-95"
            >
              {lang === 'en' ? 'OUR SERVICES' : 'NUESTROS SERVICIOS'}
            </a>
            <a
              href="#contact"
              className="px-10 py-5 bg-white text-[#1a1a1a] border border-gray-100 rounded-[1.5rem] font-black shadow-xl hover:bg-gray-50 transition-all text-center tracking-[0.2em] text-[10px] active:scale-95"
            >
              {lang === 'en' ? 'GET IN TOUCH' : 'CONTÁCTANOS'}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-10 animate-pulse hidden lg:block">
        <div className="w-[1px] h-24 bg-gradient-to-b from-[#56b4bd] to-transparent"></div>
        <span className="absolute left-4 top-0 text-[10px] uppercase tracking-[0.3em] font-black text-[#56b4bd] whitespace-nowrap rotate-90 origin-left">
          {lang === 'en' ? 'Explore' : 'Explorar'}
        </span>
      </div>
    </section>
  );
};

export default Hero;
