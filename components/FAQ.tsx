
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Language } from '../types';
import { FAQS } from '../constants';

interface FAQProps {
  lang: Language;
}

const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error(err));
  }, []);

  const faqsToDisplay = content?.faqs || FAQS;

  return (
    <section id="faq" className="py-32 bg-[#faf9f6]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#56b4bd] font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">
            {lang === 'en' ? 'Knowledge Base' : 'Base de Conocimientos'}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a]">
            {lang === 'en' ? 'Common Questions' : 'Preguntas Frecuentes'}
          </h2>
        </div>

        <div className="space-y-4">
          {faqsToDisplay.map((faq: any, idx: number) => (
            <div key={idx} className="bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-800 tracking-wide text-sm md:text-base">
                  {faq.question[lang]}
                </span>
                {openIndex === idx ? <ChevronUp size={20} className="text-[#56b4bd]" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              <div className={`transition-all duration-300 ${openIndex === idx ? 'max-h-96 opacity-100 p-8 pt-0' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <p className="text-gray-500 font-light leading-relaxed">
                  {faq.answer[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
