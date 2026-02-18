
import React, { useState, useEffect } from 'react';
import { Language, ServiceCategory } from '../types';
import { SERVICES, getIcon } from '../constants';

interface ServicesProps {
  lang: Language;
  previewData?: any;
}

const Services: React.FC<ServicesProps> = ({ lang, previewData }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    if (previewData) return;
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error(err));
  }, [previewData]);

  const categories: { id: ServiceCategory; label: { en: string; es: string } }[] = [
    { id: 'all', label: { en: 'All', es: 'Todos' } },
    { id: 'facial', label: { en: 'Facials', es: 'Faciales' } },
    { id: 'body', label: { en: 'Body', es: 'Corporales' } },
    { id: 'wellness', label: { en: 'Wellness', es: 'Bienestar' } },
  ];

  // Merge dynamic content with icons from constants
  const servicesToDisplay = (previewData || content?.services || SERVICES).map((s: any) => {
    const original = SERVICES.find(orig => orig.id === s.id);
    return {
      ...original,
      ...s
    };
  });

  const filteredServices = servicesToDisplay.filter(service =>
    activeCategory === 'all' || service.category === activeCategory
  );

  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#56b4bd] font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">
            {lang === 'en' ? 'Our Expertise' : 'Nuestra Experiencia'}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] mb-6">
            {lang === 'en' ? 'Premium Aesthetic Care' : 'Cuidado Estético Premium'}
          </h2>

          {/* Categories Filter - App style horizontal scroll on mobile */}
          <div className="flex flex-nowrap overflow-x-auto no-scrollbar md:justify-center gap-3 mt-8 mb-12 -mx-6 px-6 md:mx-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${activeCategory === cat.id
                  ? 'bg-[#56b4bd] text-white shadow-xl shadow-[#56b4bd]/20 scale-105'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-100'
                  }`}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative bg-[#fdfcfb] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 active:scale-[0.98]"
            >
              <div className="h-56 md:h-64 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg">
                  {getIcon(service.icon)}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-serif text-[#1a1a1a] mb-3">
                  {service.title[lang]}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light h-[3rem] line-clamp-2 overflow-hidden">
                  {service.description[lang]}
                </p>

                {/* Before & After - Results display if available */}
                {service.beforeImage && service.afterImage && (
                  <div className="mb-8">
                    <p className="text-[9px] font-black text-[#56b4bd] uppercase tracking-[0.2em] mb-4">
                      {lang === 'en' ? 'Real Results' : 'Resultados Reales'}
                    </p>
                    <div className="flex gap-3 h-32">
                      <div className="relative flex-1 rounded-2xl overflow-hidden group/result">
                        <img src={service.beforeImage} alt="Before" className="w-full h-full object-cover transition-transform duration-500 group-hover/result:scale-110" />
                        <span className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-[8px] text-white font-black uppercase tracking-widest rounded-lg">
                          {lang === 'en' ? 'Before' : 'Antes'}
                        </span>
                      </div>
                      <div className="relative flex-1 rounded-2xl overflow-hidden group/result">
                        <img src={service.afterImage} alt="After" className="w-full h-full object-cover transition-transform duration-500 group-hover/result:scale-110" />
                        <span className="absolute bottom-2 left-2 px-2 py-1 bg-[#56b4bd]/80 backdrop-blur-sm text-[8px] text-white font-black uppercase tracking-widest rounded-lg">
                          {lang === 'en' ? 'After' : 'Después'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <a
                    href="#contact"
                    className="inline-flex items-center text-[10px] font-black tracking-[0.2em] text-[#56b4bd] uppercase hover:text-[#479ea6] transition-colors"
                  >
                    {lang === 'en' ? 'BOOK NOW' : 'RESERVAR'}
                    <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;