import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Language, Testimonial } from '../types';
import { TESTIMONIALS } from '../constants';

interface TestimonialsProps {
  lang: Language;
  previewData?: any;
}

const Testimonials: React.FC<TestimonialsProps> = ({ lang, previewData }) => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    if (previewData) return;
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error(err));
  }, [previewData]);

  const testimonialsToDisplay = previewData || content?.testimonials || TESTIMONIALS;

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#56b4bd] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
            {lang === 'en' ? 'Client Voices' : 'Voces de Clientes'}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] font-bold">
            {lang === 'en' ? 'The Experience' : 'La Experiencia'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsToDisplay.map((testimonial: any) => (
            <div key={testimonial.id} className="bg-[#fdfcfb] p-10 rounded-[3rem] border border-gray-50 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="#56b4bd" color="#56b4bd" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed mb-6">
                  "{testimonial.text[lang]}"
                </blockquote>
              </div>
              <div className="flex items-center space-x-4 border-t border-gray-50 pt-6">
                <div className="w-10 h-10 rounded-full bg-[#56b4bd]/10 flex items-center justify-center text-[#56b4bd] font-bold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a1a] text-sm">{testimonial.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Abstract background shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-[#fdfcfb]/50 rounded-[50%] -z-0 blur-3xl"></div>
    </section>
  );
};

export default Testimonials;
