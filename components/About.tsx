
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO } from '../constants';

interface AboutProps {
  lang: Language;
  previewData?: any;
}

const About: React.FC<AboutProps> = ({ lang, previewData }) => {
  const [content, setContent] = React.useState<any>(null);

  React.useEffect(() => {
    if (previewData) return;
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error(err));
  }, [previewData]);

  const aboutData = previewData || content?.about || {
    founderName: 'Yésica Serrano',
    founderPhoto: 'https://www.webcincodev.com/blog/wp-content/uploads/2026/02/yesica.png'
  };

  return (
    <section id="about" className="py-32 bg-[#fdfcfb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <img
                src={aboutData.founderPhoto}
                alt={lang === 'en' ? `${aboutData.founderName} - Owner & Full Specialist` : `${aboutData.founderName} - Dueña y Especialista`}
                className="w-full aspect-[3/4] object-cover hover:scale-105 transition-all duration-700"
              />
            </div>
            {/* Artistic accents */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#56b4bd]/10 rounded-full z-0 blur-2xl"></div>
            <div className="absolute -top-10 -right-10 w-64 h-64 border-[1px] border-[#56b4bd]/20 rounded-[4rem] z-0"></div>

            <div className="absolute -right-8 bottom-20 bg-white p-8 rounded-3xl shadow-2xl z-20 hidden md:block border border-gray-50 text-center">
              <p className="text-[#56b4bd] font-serif text-5xl mb-2 font-bold">10+</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-black leading-tight">
                {lang === 'en' ? 'Years of\nExcellence' : 'Años de\nExperiencia'}
              </p>
            </div>
          </div>

          <div className="lg:w-1/2">
            <span className="text-[#56b4bd] font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">
              {lang === 'en' ? 'The Founder' : 'La Fundadora'}
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-[#1a1a1a] mb-2 leading-tight">
              Yésica Serrano
            </h2>
            <p className="text-[#56b4bd] font-serif italic text-xl mb-10">
              {CONTACT_INFO.tagline[lang]}
            </p>

            <div className="space-y-6 text-gray-600 font-light text-lg leading-relaxed">
              <p>
                {lang === 'en'
                  ? 'I am a Colombian Owner & Full Specialist esthetician dedicated to the art of non-invasive beauty. My journey began with a simple belief: that skin health is the ultimate reflection of internal harmony.'
                  : 'Soy una esteticista colombiana Owner & Full Specialist dedicada al arte de la belleza no invasiva. Mi viaje comenzó con una creencia simple: que la salud de la piel es el reflejo máximo de la armonía interna.'}
              </p>
              <p>
                {lang === 'en'
                  ? 'At Divine Aesthetics, I merge advanced skincare science with soulful ancestral techniques. Whether it\'s a deep facial cleansing or the rhythmic flow of a Kobido massage, every touch is intentional, professional, and personalized to your unique anatomy.'
                  : 'En Divine Aesthetics, fusiono la ciencia avanzada del cuidado de la piel con técnicas ancestrales con alma. Ya sea una limpieza facial profunda o el flujo rítmico de un masaje Kobido, cada toque es intencional, profesional y personalizado para tu anatomía única.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 my-12">
              {[
                { en: 'Certified Professional', es: 'Profesional Certificada' },
                { en: 'Premium Product Selection', es: 'Productos Premium' },
                { en: 'Full Bilingual Care', es: 'Atención Bilingüe' },
                { en: 'Clinical Standards', es: 'Estándares Clínicos' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#56b4bd]/10 flex items-center justify-center text-[#56b4bd]">
                    <Sparkles size={18} />
                  </div>
                  <span className="text-xs font-bold text-gray-800 tracking-wider uppercase">{lang === 'en' ? item.en : item.es}</span>
                </div>
              ))}
            </div>

            <div className="pt-10 border-t border-gray-100 flex items-center justify-between">
              <div>
                <div className="font-serif italic text-2xl text-gray-400 opacity-60">{aboutData.founderName}</div>
                <div className="text-[10px] text-gray-300 uppercase tracking-[0.3em] font-black mt-1">
                  {lang === 'en' ? 'Owner & Full Specialist' : 'Dueña y Especialista'}
                </div>
              </div>
              <div className="text-[#56b4bd]">
                <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 20C40 20 30 30 30 50C30 70 40 80 50 80C60 80 70 70 70 50C70 30 60 20 50 20ZM50 70C45 70 40 65 40 50C40 35 45 30 50 30C55 30 60 35 60 50C60 65 55 70 50 70Z" opacity="0.1" />
                  <circle cx="50" cy="50" r="5" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
