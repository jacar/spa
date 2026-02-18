
import React from 'react';
import {
  Sparkles,
  Wind,
  Droplets,
  Waves,
  Flower2,
  Scissors,
  Footprints,
  User,
  Eye,
  Gem,
  CheckCircle2,
  Brush
} from 'lucide-react';
import { ServiceItem, NavLink, Testimonial, FAQItem } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: { en: 'Home', es: 'Inicio' }, href: '#home' },
  { label: { en: 'Services', es: 'Servicios' }, href: '#services' },
  { label: { en: 'About', es: 'Sobre Mí' }, href: '#about' },
  { label: { en: 'Gallery', es: 'Galería' }, href: '#gallery' },
  { label: { en: 'Reviews', es: 'Reseñas' }, href: '#testimonials' },
  { label: { en: 'FAQ', es: 'Preguntas' }, href: '#faq' },
  { label: { en: 'Contact', es: 'Contacto' }, href: '#contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'facials',
    category: 'facial',
    title: { en: 'Facial Cleanings', es: 'Limpieza Facial' },
    description: { en: 'Deep cleaning to remove impurities and revitalize your skin.', es: 'Limpieza profunda para eliminar impurezas y revitalizar tu piel.' },
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'rejuvenation',
    category: 'facial',
    title: { en: 'Facial Rejuvenation', es: 'Rejuvenecimiento Facial' },
    description: { en: 'Advanced treatments to reduce signs of aging.', es: 'Tratamientos avanzados para reducir los signos del envejecimiento.' },
    icon: 'Gem',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'body-cleaning',
    category: 'body',
    title: { en: 'Body Cleansing (Back, Arms, Chest)', es: 'Limpieza (Espalda, Brazos, Pecho)' },
    description: { en: 'Specific cleansing for back, arms, and chest area.', es: 'Limpieza específica para espalda, brazos y el área del pecho.' },
    icon: 'Wind',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 'acne',
    category: 'facial',
    title: { en: 'Acne Treatments', es: 'Tratamientos para el Acné' },
    description: { en: 'Specialized solutions for clear, healthy skin.', es: 'Soluciones especializadas para una piel clara y saludable.' },
    icon: 'CheckCircle2',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop',
    beforeImage: 'https://www.webcincodev.com/blog/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-18-at-12.37.00-PM-1.jpeg',
    afterImage: 'https://www.webcincodev.com/blog/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-18-at-12.37.00-PM.jpeg'
  },
  {
    id: 'kobido',
    category: 'facial',
    title: { en: 'Kobido Facial Massages', es: 'Masajes Faciales Kobido' },
    description: { en: 'Ancient Japanese technique for a natural lifting effect.', es: 'Antigua técnica japonesa para un efecto de lifting natural.' },
    icon: 'Flower2',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'men-manipedi',
    category: 'wellness',
    title: { en: 'Manicure & Pedicure for Men', es: 'Manicura y Pedicura para Hombres' },
    description: { en: 'Complete grooming and care specifically for modern men.', es: 'Aseo y cuidado completo específico para el hombre moderno.' },
    icon: 'User',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'reflexology',
    category: 'wellness',
    title: { en: 'Foot Reflexology', es: 'Reflexología Podal' },
    description: { en: 'Targeted pressure points for full body wellness.', es: 'Puntos de presión específicos para el bienestar corporal total.' },
    icon: 'Footprints',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'whitening',
    category: 'body',
    title: { en: 'Body Areas Whitening', es: 'Blanqueamiento de Zonas Corporales' },
    description: { en: 'Advanced treatments to even out skin tone on specific body areas.', es: 'Tratamientos avanzados para unificar el tono de la piel en zonas específicas.' },
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Carolina Martinez",
    rating: 5,
    text: {
      en: "Yesica has a magical touch. My skin has never looked so clear and radiant. The Kobido massage is a must-try!",
      es: "Yésica tiene un toque mágico. Mi piel nunca se ha visto tan clara y radiante. ¡El masaje Kobido es algo que debes probar!"
    }
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 5,
    text: {
      en: "Best facial rejuvenation in Jacksonville. They look natural and last so long. Highly recommend Divine Aesthetics.",
      es: "El mejor rejuvenecimiento facial en Jacksonville. Se ve natural y los resultados son increíbles. Recomiendo mucho Divine Aesthetics."
    }
  },
  {
    id: 3,
    name: "Luis Rodriguez",
    rating: 5,
    text: {
      en: "The deep cleansing back treatment was exactly what I needed. Professional, clean, and very relaxing studio.",
      es: "El tratamiento de limpieza profunda de espalda era exactamente lo que necesitaba. Un estudio profesional, limpio y muy relajante."
    }
  }
];

export const FAQS: FAQItem[] = [
  {
    question: { en: "How do I book an appointment?", es: "¿Cómo reservo una cita?" },
    answer: {
      en: "You can book directly via WhatsApp using the floating button or fill out our contact form. We require a small deposit to secure your slot.",
      es: "Puedes reservar directamente vía WhatsApp usando el botón flotante o llenar nuestro formulario de contacto. Requerimos un pequeño depósito para asegurar tu cupo."
    }
  },
  {
    question: { en: "What should I do before a facial?", es: "¿Qué debo hacer antes de un facial?" },
    answer: {
      en: "Please arrive with a clean face if possible and avoid using strong exfoliants 48 hours before your treatment.",
      es: "Por favor llega con la cara limpia si es posible y evita usar exfoliantes fuertes 48 horas antes de tu tratamiento."
    }
  }
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?q=80&w=2070&auto=format&fit=crop'
];

export const CONTACT_INFO = {
  phone: '(904) 806-6898',
  phoneRaw: '19048066898',
  email: 'Spadivineaesthetics93@gmail.com',
  website: 'www.spadivineaesthetics.com',
  address: '42 Patina Pl, Saint Augustine FL 32092, USA',
  instagram: 'divineaesthetics93',
  tiktok: 'divineaesthetics93',
  facebook: 'YesicaSerranoSpa',
  tagline: {
    en: 'The Colombian woman who enhances your beauty',
    es: 'La mujer colombiana que realza tu belleza'
  }
};

export const SOCIAL_LINKS = {
  instagram: `https://www.instagram.com/${CONTACT_INFO.instagram}`,
  tiktok: `https://www.tiktok.com/@${CONTACT_INFO.tiktok}`,
  facebook: `https://www.facebook.com/search/top?q=${encodeURIComponent(CONTACT_INFO.facebook)}`
};

export const getIcon = (name: string) => {
  const props = { size: 24, className: "text-[#56b4bd]" };
  switch (name) {
    case 'Sparkles': return <Sparkles {...props} />;
    case 'Wind': return <Wind {...props} />;
    case 'Droplets': return <Droplets {...props} />;
    case 'Waves': return <Waves {...props} />;
    case 'Flower2': return <Flower2 {...props} />;
    case 'Scissors': return <Scissors {...props} />;
    case 'Footprints': return <Footprints {...props} />;
    case 'User': return <User {...props} />;
    case 'Eye': return <Eye {...props} />;
    case 'Gem': return <Gem {...props} />;
    case 'CheckCircle2': return <CheckCircle2 {...props} />;
    case 'Brush': return <Brush {...props} />;
    default: return <Sparkles {...props} />;
  }
};
