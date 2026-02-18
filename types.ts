
export type Language = 'en' | 'es';

export type ServiceCategory = 'all' | 'facial' | 'body' | 'wellness';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  icon: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface NavLink {
  label: {
    en: string;
    es: string;
  };
  href: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: {
    en: string;
    es: string;
  };
  rating: number;
}

export interface FAQItem {
  question: {
    en: string;
    es: string;
  };
  answer: {
    en: string;
    es: string;
  };
}
