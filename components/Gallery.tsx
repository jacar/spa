
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { GALLERY_IMAGES } from '../constants';
import { Grid } from 'lucide-react';

interface GalleryProps {
  lang: Language;
  previewData?: any;
}

const Gallery: React.FC<GalleryProps> = ({ lang, previewData }) => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    if (previewData) return;
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error(err));
  }, [previewData]);

  const galleryToDisplay = previewData || content?.gallery || GALLERY_IMAGES;

  return (
    <section id="gallery" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#56b4bd] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
            {lang === 'en' ? 'Visual Journey' : 'Viaje Visual'}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] font-bold">
            {lang === 'en' ? 'The Studio' : 'El Estudio'}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryToDisplay.map((image: string, index: number) => (
            <div key={index} className="relative aspect-square rounded-[2rem] overflow-hidden group">
              <img
                src={image}
                alt={lang === 'en' ? `Spa ambience ${index + 1}` : `Ambiente del spa ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#1a1a1a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform duration-500">
                  <Grid size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
