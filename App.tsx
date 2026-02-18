import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import SocialProducts from './components/SocialProducts';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileNav from './components/MobileNav';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { Language } from './types';

function MainApp({ lang, toggleLang }: { lang: Language, toggleLang: () => void }) {
  return (
    <div className="min-h-screen bg-white selection:bg-[#56b4bd]/20 selection:text-[#56b4bd]">
      <Header lang={lang} toggleLang={toggleLang} />
      <MobileNav lang={lang} />
      <main>
        <Hero lang={lang} />
        <Services lang={lang} />
        <BeforeAfterSlider lang={lang} />
        <SocialProducts lang={lang} />
        <About lang={lang} />
        <Gallery lang={lang} />
        <Testimonials lang={lang} />
        <FAQ lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <FloatingSocials lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? <>{children}</> : <Navigate to="/admin" />;
};

function App() {
  const [lang, setLang] = useState<Language>('es');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'es' : 'en');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp lang={lang} toggleLang={toggleLang} />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
