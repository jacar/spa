import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Music2 } from 'lucide-react';
import { Language } from '../types';
import { CONTACT_INFO, SOCIAL_LINKS, SERVICES } from '../constants';

interface ContactProps {
  lang: Language;
  previewData?: any;
}

const Contact: React.FC<ContactProps> = ({ lang, previewData }) => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    if (previewData) return;
    fetch('http://localhost:3005/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error(err));
  }, [previewData]);

  const activeContent = previewData ? { contact: previewData.contact, socials: previewData.socials } : content;
  const tagline = activeContent?.contact?.tagline?.[lang] || (lang === 'en' ? 'Begin Your\nTransformation' : 'Comienza Tu\nTransformación');
  const phone = activeContent?.contact?.phone || CONTACT_INFO.phone;
  const email = activeContent?.contact?.email || CONTACT_INFO.email;
  const address = activeContent?.contact?.address || CONTACT_INFO.address;
  const socials = activeContent?.socials || SOCIAL_LINKS;

  return (
    <section id="contact" className="py-24 md:py-32 bg-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-5/12">
            <span className="text-[#56b4bd] font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">
              {lang === 'en' ? 'Connectivity' : 'Conectividad'}
            </span>
            <h2 className="text-5xl font-serif text-[#1a1a1a] mb-8 leading-tight">
              {lang === 'en' ? 'Begin Your\nTransformation' : 'Comienza Tu\nTransformación'}
            </h2>
            <p className="text-gray-400 mb-12 leading-relaxed font-light text-lg">
              {lang === 'en'
                ? "Experience the divine touch. Reach out to schedule your private consultation or book a premium session."
                : "Vive el toque divino. Contáctanos para programar tu consulta privada o reservar una sesión premium."}
            </p>

            <div className="space-y-6">
              <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="flex items-center space-x-5 p-8 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all group border border-gray-50">
                <div className="p-4 bg-[#56b4bd]/10 text-[#56b4bd] rounded-2xl group-hover:bg-[#56b4bd] group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-1">
                    {lang === 'en' ? 'Direct Line' : 'Línea Directa'}
                  </p>
                  <p className="text-xl font-bold text-[#1a1a1a]">{phone}</p>
                </div>
              </a>

              <a href={`mailto:${email}`} className="flex items-center space-x-5 p-8 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all group border border-gray-50">
                <div className="p-4 bg-[#56b4bd]/10 text-[#56b4bd] rounded-2xl group-hover:bg-[#56b4bd] group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-1">
                    {lang === 'en' ? 'Email Address' : 'Correo Electrónico'}
                  </p>
                  <p className="text-sm font-bold text-[#1a1a1a] truncate">{email}</p>
                </div>
              </a>

              <div className="flex items-center space-x-5 p-8 bg-white rounded-[2rem] shadow-sm border border-gray-50">
                <div className="p-4 bg-[#56b4bd]/10 text-[#56b4bd] rounded-2xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-1">
                    {lang === 'en' ? 'Studio Location' : 'Ubicación del Estudio'}
                  </p>
                  <p className="text-sm font-bold text-[#1a1a1a] leading-snug">{address}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-200">
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-black mb-6">
                {lang === 'en' ? 'Social Experiences' : 'Experiencias Sociales'}
              </p>
              <div className="flex space-x-6">
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 bg-white shadow-xl rounded-2xl text-[#56b4bd] hover:scale-110 active:scale-95 transition-all duration-300 border border-gray-50 hover:text-[#E4405F]"
                >
                  <Instagram size={22} />
                </a>
                <a
                  href={socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 bg-white shadow-xl rounded-2xl text-[#56b4bd] hover:scale-110 active:scale-95 transition-all duration-300 border border-gray-50 hover:text-black"
                >
                  <Music2 size={22} />
                </a>
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 bg-white shadow-xl rounded-2xl text-[#56b4bd] hover:scale-110 active:scale-95 transition-all duration-300 border border-gray-50 hover:text-[#1877F2]"
                >
                  <Facebook size={22} />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:w-7/12 bg-white rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden border border-gray-50">
            <h3 className="text-3xl font-serif text-[#1a1a1a] mb-10 relative z-10">
              {lang === 'en' ? 'Booking Inquiry' : 'Consulta de Reserva'}
            </h3>
            <form
              className="space-y-12 relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('full_name');
                const treatment = (document.getElementById('treatment') as HTMLSelectElement).value;
                const message = formData.get('message');
                const whatsappMessage = encodeURIComponent(
                  lang === 'en'
                    ? `Hello Yesica! I would like to make a booking inquiry.\n\n*Name:* ${name}\n*Treatment:* ${treatment || 'Not specified'}\n*Message:* ${message}`
                    : `¡Hola Yesica! Me gustaría realizar una consulta de reserva.\n\n*Nombre:* ${name}\n*Tratamiento:* ${treatment || 'No especificado'}\n*Message:* ${message}`
                );
                window.open(`https://wa.me/${CONTACT_INFO.phoneRaw}?text=${whatsappMessage}`, '_blank');
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative z-0 w-full group">
                  <input type="text" name="full_name" id="full_name" required placeholder=" " className="peer block py-4 px-0 w-full text-sm font-medium text-gray-900 bg-transparent border-0 border-b border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#56b4bd] transition-all duration-300" />
                  <label htmlFor="full_name" className="absolute text-[10px] font-black uppercase tracking-widest text-gray-400 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#56b4bd] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
                    {lang === 'en' ? 'Full Name' : 'Nombre Completo'}
                  </label>
                </div>
                <div className="relative z-0 w-full group text-left">
                  <select id="treatment" name="treatment" className="peer block py-4 px-0 w-full text-sm font-medium text-gray-900 bg-transparent border-0 border-b border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#56b4bd] transition-all duration-300" defaultValue="">
                    <option value="" disabled hidden></option>
                    {SERVICES.map(service => (
                      <option key={service.id} value={service.id}>{service.title[lang]}</option>
                    ))}
                    <option value="other">{lang === 'en' ? 'Other' : 'Otro'}</option>
                  </select>
                  <label htmlFor="treatment" className="absolute text-[10px] font-black uppercase tracking-widest text-gray-400 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#56b4bd] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
                    {lang === 'en' ? 'Select treatment' : 'Selecciona tratamiento'}
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full group">
                <textarea name="message" id="message" rows={4} required placeholder=" " className="peer block py-4 px-0 w-full text-sm font-medium text-gray-900 bg-transparent border-0 border-b border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#56b4bd] transition-all duration-300 resize-none"></textarea>
                <label htmlFor="message" className="absolute text-[10px] font-black uppercase tracking-widest text-gray-400 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#56b4bd] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
                  {lang === 'en' ? 'How can we help you?' : '¿Cómo podemos ayudarte?'}
                </label>
              </div>
              <button type="submit" className="w-full py-6 bg-[#1a1a1a] text-white rounded-2xl font-black text-[10px] tracking-[0.4em] uppercase shadow-2xl hover:bg-black transition-all transform active:scale-95">
                {lang === 'en' ? 'SEND INQUIRY' : 'ENVIAR CONSULTA'}
              </button>
            </form>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fdfcfb] rounded-full -mr-32 -mt-32 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
