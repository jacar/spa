import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from '../constants';
import { X } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

/* ─── Modal Component ─── */
const LegalModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#111] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'modalFadeIn 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <h2 className="text-white text-lg font-semibold tracking-wide">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 overflow-y-auto max-h-[60vh] text-gray-300 text-sm leading-relaxed space-y-4 custom-scrollbar">
          {children}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#56b4bd] hover:bg-[#4aa3ac] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
          >
            {title.includes('Privacy') || title.includes('Privacidad') ? 'OK' : 'OK'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
      `}</style>
    </div>
  );
};

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const [links, setLinks] = useState<any>(SOCIAL_LINKS);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data?.socials) setLinks(data.socials);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
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
                  ? 'Elevating natural beauty through Colombian expertise and premium aesthetic treatments in Saint Augustine.'
                  : 'Elevando la belleza natural a través de la experiencia colombiana y tratamientos estéticos premium en Saint Augustine.'}
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
            <p>© {new Date().getFullYear()} Divine Aesthetics Spa. Saint Augustine, FL.</p>
            <div className="mt-6 md:mt-0 space-x-8">
              <button
                onClick={() => setShowPrivacy(true)}
                className="hover:text-[#56b4bd] transition-colors cursor-pointer opacity-80 hover:opacity-100"
              >
                {lang === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}
              </button>
              <button
                onClick={() => setShowTerms(true)}
                className="hover:text-[#56b4bd] transition-colors cursor-pointer opacity-80 hover:opacity-100"
              >
                {lang === 'en' ? 'Terms of Service' : 'Términos de Servicio'}
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-[10px] text-gray-600 font-medium tracking-[0.15em]">
            <span className="normal-case tracking-normal">
              {lang === 'en' ? 'Developed by' : 'Desarrollado por'}{' '}
              <a
                href="https://www.jacomeovalle.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#56b4bd] hover:text-white transition-colors duration-300"
              >
                Armando Ovalle
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* ─── Privacy Policy Modal ─── */}
      <LegalModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title={lang === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}
      >
        <p className="text-white font-semibold text-base">
          {lang === 'en' ? 'Divine Aesthetics Spa — Privacy Policy' : 'Divine Aesthetics Spa — Política de Privacidad'}
        </p>
        <p className="text-gray-500 text-xs">
          {lang === 'en' ? 'Last updated: February 2026' : 'Última actualización: Febrero 2026'}
        </p>

        <h3 className="text-white font-semibold mt-4">
          {lang === 'en' ? '1. Information We Collect' : '1. Información que Recopilamos'}
        </h3>
        <p>
          {lang === 'en'
            ? 'We collect personal information you provide when booking appointments, contacting us, or using our services. This may include your name, email address, phone number, and treatment preferences.'
            : 'Recopilamos información personal que usted proporciona al reservar citas, contactarnos o utilizar nuestros servicios. Esto puede incluir su nombre, dirección de correo electrónico, número de teléfono y preferencias de tratamiento.'}
        </p>

        <h3 className="text-white font-semibold mt-4">
          {lang === 'en' ? '2. How We Use Your Information' : '2. Cómo Usamos su Información'}
        </h3>
        <p>
          {lang === 'en'
            ? 'Your information is used to provide and improve our services, communicate with you about appointments and promotions, and ensure a personalized experience at our spa.'
            : 'Su información se utiliza para proporcionar y mejorar nuestros servicios, comunicarnos con usted sobre citas y promociones, y garantizar una experiencia personalizada en nuestro spa.'}
        </p>

        <h3 className="text-white font-semibold mt-4">
          {lang === 'en' ? '3. Data Protection' : '3. Protección de Datos'}
        </h3>
        <p>
          {lang === 'en'
            ? 'We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. Your data is stored securely and only accessible to authorized personnel.'
            : 'Implementamos medidas de seguridad apropiadas para proteger su información personal contra acceso no autorizado, alteración o divulgación. Sus datos se almacenan de forma segura y solo son accesibles para personal autorizado.'}
        </p>

        <h3 className="text-white font-semibold mt-4">
          {lang === 'en' ? '4. Third-Party Sharing' : '4. Compartir con Terceros'}
        </h3>
        <p>
          {lang === 'en'
            ? 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or to provide our services.'
            : 'No vendemos, intercambiamos ni transferimos su información personal a terceros sin su consentimiento, excepto cuando lo exija la ley o para proporcionar nuestros servicios.'}
        </p>

        <h3 className="text-white font-semibold mt-4">
          {lang === 'en' ? '5. Contact Us' : '5. Contáctenos'}
        </h3>
        <p>
          {lang === 'en'
            ? 'If you have questions about this Privacy Policy, please contact us at our Saint Augustine, FL location or through our website.'
            : 'Si tiene preguntas sobre esta Política de Privacidad, contáctenos en nuestra ubicación de Saint Augustine, FL o a través de nuestro sitio web.'}
        </p>
      </LegalModal>

      {/* ─── Terms of Service Modal ─── */}
      <LegalModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title={lang === 'en' ? 'Terms of Service' : 'Términos de Servicio'}
      >
        <p className="text-white font-semibold text-base">
          {lang === 'en' ? 'Divine Aesthetics Spa — Terms of Service' : 'Divine Aesthetics Spa — Términos de Servicio'}
        </p>
        <p className="text-gray-500 text-xs">
          {lang === 'en' ? 'Last updated: February 2026' : 'Última actualización: Febrero 2026'}
        </p>

        <h3 className="text-white font-semibold mt-4">
          {lang === 'en' ? '1. Services' : '1. Servicios'}
        </h3>
        <p>
          {lang === 'en'
            ? 'Divine Aesthetics Spa provides aesthetic and beauty treatments at our Saint Augustine, FL location. All services are performed by licensed professionals. Results may vary depending on individual factors.'
            : 'Divine Aesthetics Spa ofrece tratamientos estéticos y de belleza en nuestra ubicación de Saint Augustine, FL. Todos los servicios son realizados por profesionales licenciados. Los resultados pueden variar según factores individuales.'}
        </p>

        <h3 className="text-white font-semibold mt-4">
          {lang === 'en' ? '2. Appointments & Cancellations' : '2. Citas y Cancelaciones'}
        </h3>
        <p>
          {lang === 'en'
            ? 'Appointments must be cancelled at least 24 hours in advance. Late cancellations or no-shows may be subject to a cancellation fee. We reserve the right to refuse service at our discretion.'
            : 'Las citas deben cancelarse con al menos 24 horas de anticipación. Las cancelaciones tardías o las ausencias pueden estar sujetas a una tarifa de cancelación. Nos reservamos el derecho de rechazar el servicio a nuestra discreción.'}
        </p>

        <h3 className="text-white font-semibold mt-4">
          {lang === 'en' ? '3. Payments' : '3. Pagos'}
        </h3>
        <p>
          {lang === 'en'
            ? 'Payment is due at the time of service unless otherwise arranged. We accept major credit cards, debit cards, and cash. Prices are subject to change without prior notice.'
            : 'El pago se debe realizar al momento del servicio, a menos que se acuerde lo contrario. Aceptamos las principales tarjetas de crédito, tarjetas de débito y efectivo. Los precios están sujetos a cambios sin previo aviso.'}
        </p>

        <h3 className="text-white font-semibold mt-4">
          {lang === 'en' ? '4. Liability' : '4. Responsabilidad'}
        </h3>
        <p>
          {lang === 'en'
            ? 'Divine Aesthetics Spa is not responsible for any adverse reactions resulting from undisclosed medical conditions, allergies, or failure to follow post-treatment care instructions.'
            : 'Divine Aesthetics Spa no se hace responsable de reacciones adversas resultantes de condiciones médicas no reveladas, alergias o incumplimiento de las instrucciones de cuidado post-tratamiento.'}
        </p>

        <h3 className="text-white font-semibold mt-4">
          {lang === 'en' ? '5. Changes to Terms' : '5. Cambios en los Términos'}
        </h3>
        <p>
          {lang === 'en'
            ? 'We reserve the right to update these Terms of Service at any time. Continued use of our services constitutes acceptance of any changes.'
            : 'Nos reservamos el derecho de actualizar estos Términos de Servicio en cualquier momento. El uso continuado de nuestros servicios constituye la aceptación de cualquier cambio.'}
        </p>
      </LegalModal>
    </>
  );
};

export default Footer;