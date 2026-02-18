import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, LogOut, Image, Type, Settings, Sparkles, Star, Grid, ChevronRight, Split, MessageCircle, Share2, Plus, Trash2, ShoppingBag, Eye } from 'lucide-react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import SocialProducts from '../components/SocialProducts';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import About from '../components/About';
import Contact from '../components/Contact';

const AdminDashboard: React.FC = () => {
    const [content, setContent] = useState<any>(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('hero');

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await axios.get('http://localhost:3005/api/content');
            setContent(res.data);
        } catch (err) {
            console.error('Error fetching content', err);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.post('http://localhost:3005/api/content', content);
            setMessage('¡Contenido guardado con éxito!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Error al guardar');
        } finally {
            setSaving(false);
        }
    };

    const updateField = (section: string, field: string, value: any, lang?: string) => {
        const newContent = { ...content };
        if (lang) {
            if (!newContent[section][field]) newContent[section][field] = {};
            newContent[section][field][lang] = value;
        } else {
            newContent[section][field] = value;
        }
        setContent(newContent);
    };

    const updateArrayItem = (section: string, index: number, field: string | null, value: any, lang?: string) => {
        const newContent = { ...content };
        if (field) {
            if (lang) {
                if (!newContent[section][index][field]) newContent[section][index][field] = {};
                newContent[section][index][field][lang] = value;
            } else {
                newContent[section][index][field] = value;
            }
        } else {
            newContent[section][index] = value;
        }
        setContent({ ...newContent });
    };

    const addItem = (section: string, template: any) => {
        const newContent = { ...content };
        newContent[section].push(template);
        setContent(newContent);
    };

    const removeItem = (section: string, index: number) => {
        const newContent = { ...content };
        newContent[section].splice(index, 1);
        setContent(newContent);
    };

    const renderPreview = () => {
        if (!content) return null;

        const previewProps = { lang: 'es' as const };

        switch (activeTab) {
            case 'hero':
                return <Hero {...previewProps} previewData={content.hero} />;
            case 'services':
                return <Services {...previewProps} previewData={content.services} />;
            case 'beforeAfter':
                return <BeforeAfterSlider {...previewProps} previewData={content.beforeAfter} />;
            case 'products':
                return <SocialProducts {...previewProps} previewData={content.products} />;
            case 'testimonials':
                return <Testimonials {...previewProps} previewData={content.testimonials} />;
            case 'gallery':
                return <Gallery {...previewProps} previewData={content.gallery} />;
            case 'about':
                return <About {...previewProps} previewData={content.about} />;
            case 'contact':
                return <Contact {...previewProps} previewData={content} />;
            case 'socials':
                return <Contact {...previewProps} previewData={content} />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                        <Eye size={48} className="mb-4 opacity-20" />
                        <p className="text-sm font-medium">Vista previa no disponible para esta sección</p>
                    </div>
                );
        }
    };

    if (!content) return <div className="p-10 font-black uppercase text-[#56b4bd] animate-pulse">Cargando base de datos...</div>;

    const tabs = [
        { id: 'hero', label: 'Portada', icon: Type },
        { id: 'services', label: 'Servicios', icon: Sparkles },
        { id: 'beforeAfter', label: 'Comparador', icon: Split },
        { id: 'products', label: 'Productos', icon: ShoppingBag },
        { id: 'socials', label: 'Redes Sociales', icon: Share2 },
        { id: 'chat', label: 'Chat Flotante', icon: MessageCircle },
        { id: 'testimonials', label: 'Reseñas', icon: Star },
        { id: 'gallery', label: 'Galería', icon: Grid },
        { id: 'about', label: 'Fundadora', icon: Image },
        { id: 'contact', label: 'Contacto', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex">
            {/* Sidebar Slim */}
            <aside className="w-24 md:w-64 bg-white border-r border-gray-100 flex flex-col p-4 md:p-8 shadow-sm relative z-20">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="hidden md:block text-2xl font-serif font-bold text-[#1a1a1a] uppercase tracking-tight">Divine CMS</h2>
                    <div className="md:hidden w-10 h-10 bg-[#56b4bd] rounded-xl mx-auto flex items-center justify-center text-white font-bold">D</div>
                    <p className="text-[8px] md:text-[10px] text-[#56b4bd] font-black uppercase tracking-widest mt-1">Full Admin v2.5</p>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center justify-center md:justify-start space-x-0 md:space-x-4 p-4 rounded-2xl transition-all ${activeTab === tab.id
                                ? 'bg-[#56b4bd] text-white shadow-lg shadow-[#56b4bd]/30'
                                : 'text-gray-400 hover:bg-gray-50'
                                }`}
                        >
                            <tab.icon size={20} />
                            <span className="hidden md:block font-bold text-sm tracking-tight">{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <button
                    onClick={() => { localStorage.removeItem('isAdmin'); window.location.href = '/admin'; }}
                    className="flex flex-col md:flex-row items-center justify-center md:justify-start space-x-0 md:space-x-3 text-red-400 font-bold text-[8px] md:text-[10px] uppercase tracking-widest p-4 hover:bg-red-50 rounded-2xl transition-colors mt-4"
                >
                    <LogOut size={16} />
                    <span className="mt-2 md:mt-0">Salir</span>
                </button>
            </aside>

            {/* Main Editor */}
            <div className="flex-1 flex flex-col lg:flex-row h-screen overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6 md:p-12 border-r border-gray-100 bg-[#fdfcfb]">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h1 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-1">Panel de Edición</h1>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Modo edición total activado</p>
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-6 py-4 bg-[#1a1a1a] text-white rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase shadow-xl hover:scale-105 transition-transform flex items-center space-x-2"
                            >
                                <Save size={16} />
                                <span>{saving ? '...' : 'GUARDAR CAMBIOS'}</span>
                            </button>
                        </div>

                        {message && (
                            <div className="mb-8 p-4 bg-green-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-center shadow-lg shadow-green-500/20">
                                {message}
                            </div>
                        )}

                        <div className="space-y-8 pb-20">
                            {/* HERO */}
                            {activeTab === 'hero' && (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                        <h3 className="text-sm font-black text-[#56b4bd] uppercase tracking-widest mb-6">Portada</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Título (ES)</label>
                                                <textarea className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.hero.title.es} onChange={(e) => updateField('hero', 'title', e.target.value, 'es')} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Título (EN)</label>
                                                <textarea className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.hero.title.en} onChange={(e) => updateField('hero', 'title', e.target.value, 'en')} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Subtítulo (ES)</label>
                                                <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.hero.subtitle.es} onChange={(e) => updateField('hero', 'subtitle', e.target.value, 'es')} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Imagen de Fondo (URL)</label>
                                                <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.hero.backgroundImage} onChange={(e) => updateField('hero', 'backgroundImage', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SERVICES */}
                            {activeTab === 'services' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center px-4">
                                        <h3 className="text-sm font-black text-[#56b4bd] uppercase tracking-widest">Servicios</h3>
                                        <button onClick={() => addItem('services', { id: `service-${Date.now()}`, title: { en: '', es: '' }, image: '' })} className="p-2 bg-[#56b4bd] text-white rounded-full hover:scale-110 transition-transform"><Plus size={20} /></button>
                                    </div>
                                    {content.services.map((s: any, idx: number) => (
                                        <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col space-y-4">
                                            <div className="flex justify-between">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase">Servicio #{idx + 1}</label>
                                                <button onClick={() => removeItem('services', idx)} className="text-red-300 hover:text-red-500"><Trash2 size={16} /></button>
                                            </div>
                                            <input className="w-full p-3 bg-gray-50 rounded-xl font-bold" placeholder="Título ES" value={s.title.es} onChange={(e) => updateArrayItem('services', idx, 'title', e.target.value, 'es')} />
                                            <input className="w-full p-3 bg-gray-50 rounded-xl font-bold" placeholder="Título EN" value={s.title.en} onChange={(e) => updateArrayItem('services', idx, 'title', e.target.value, 'en')} />
                                            <input className="w-full p-3 bg-gray-50 rounded-xl" placeholder="URL de Imagen" value={s.image} onChange={(e) => updateArrayItem('services', idx, 'image', e.target.value)} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* BEFORE & AFTER */}
                            {activeTab === 'beforeAfter' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center px-4">
                                        <h3 className="text-sm font-black text-[#56b4bd] uppercase tracking-widest">Comparadores</h3>
                                        <button onClick={() => addItem('beforeAfter', { id: Date.now(), title: { en: '', es: '' }, beforeImage: '', afterImage: '' })} className="p-2 bg-[#56b4bd] text-white rounded-full hover:scale-110 transition-transform"><Plus size={20} /></button>
                                    </div>
                                    {content.beforeAfter.map((item: any, idx: number) => (
                                        <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-4">
                                            <div className="flex justify-between">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase">Caso #{idx + 1}</label>
                                                <button onClick={() => removeItem('beforeAfter', idx)} className="text-red-300 hover:text-red-500"><Trash2 size={16} /></button>
                                            </div>
                                            <input className="w-full p-3 bg-gray-50 rounded-xl font-bold" placeholder="Título ES" value={item.title.es} onChange={(e) => updateArrayItem('beforeAfter', idx, 'title', e.target.value, 'es')} />
                                            <input className="w-full p-3 bg-gray-50 rounded-xl font-bold" placeholder="Título EN" value={item.title.en} onChange={(e) => updateArrayItem('beforeAfter', idx, 'title', e.target.value, 'en')} />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input className="w-full p-3 bg-gray-50 rounded-xl text-xs" placeholder="Imagen Antes" value={item.beforeImage} onChange={(e) => updateArrayItem('beforeAfter', idx, 'beforeImage', e.target.value)} />
                                                <input className="w-full p-3 bg-gray-50 rounded-xl text-xs" placeholder="Imagen Después" value={item.afterImage} onChange={(e) => updateArrayItem('beforeAfter', idx, 'afterImage', e.target.value)} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* PRODUCTS */}
                            {activeTab === 'products' && (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
                                        <h3 className="text-sm font-black text-[#56b4bd] uppercase tracking-widest border-b border-gray-50 pb-4">Sección Productos</h3>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Título (ES)</label>
                                            <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.products.title.es} onChange={(e) => updateField('products', 'title', e.target.value, 'es')} />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Título (EN)</label>
                                            <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.products.title.en} onChange={(e) => updateField('products', 'title', e.target.value, 'en')} />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Facebook Embed Code (URL)</label>
                                            <textarea className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none font-mono text-[10px]" rows={4} value={content.products.facebookEmbed} onChange={(e) => updateField('products', 'facebookEmbed', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SOCIALS */}
                            {activeTab === 'socials' && (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                        <h3 className="text-sm font-black text-[#56b4bd] uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Enlaces de Redes Sociales</h3>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Instagram URL</label>
                                                <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none text-xs font-mono" value={content.socials.instagram} onChange={(e) => updateField('socials', 'instagram', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">TikTok URL</label>
                                                <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none text-xs font-mono" value={content.socials.tiktok} onChange={(e) => updateField('socials', 'tiktok', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Facebook URL</label>
                                                <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none text-xs font-mono" value={content.socials.facebook} onChange={(e) => updateField('socials', 'facebook', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CHAT */}
                            {activeTab === 'chat' && (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
                                        <h3 className="text-sm font-black text-[#56b4bd] uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Chat Flotante</h3>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Foto del Asesor (URL)</label>
                                            <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.chat.instructorImage} onChange={(e) => updateField('chat', 'instructorImage', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Mensaje (ES)</label>
                                            <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.chat.message.es} onChange={(e) => updateField('chat', 'message', e.target.value, 'es')} />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Mensaje (EN)</label>
                                            <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.chat.message.en} onChange={(e) => updateField('chat', 'message', e.target.value, 'en')} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TESTIMONIALS */}
                            {activeTab === 'testimonials' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center px-4">
                                        <h3 className="text-sm font-black text-[#56b4bd] uppercase tracking-widest">Reseñas</h3>
                                        <button onClick={() => addItem('testimonials', { id: Date.now(), name: '', text: { en: '', es: '' } })} className="p-2 bg-[#56b4bd] text-white rounded-full hover:scale-110 transition-transform"><Plus size={20} /></button>
                                    </div>
                                    {content.testimonials.map((t: any, idx: number) => (
                                        <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-4">
                                            <div className="flex justify-between">
                                                <input className="p-2 bg-transparent border-b border-gray-100 focus:outline-none font-bold text-[#1a1a1a]" placeholder="Nombre Cliente" value={t.name} onChange={(e) => updateArrayItem('testimonials', idx, 'name', e.target.value)} />
                                                <button onClick={() => removeItem('testimonials', idx)} className="text-red-300 hover:text-red-500"><Trash2 size={16} /></button>
                                            </div>
                                            <textarea className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none text-xs" placeholder="Reseña ES" rows={3} value={t.text.es} onChange={(e) => updateArrayItem('testimonials', idx, 'text', e.target.value, 'es')} />
                                            <textarea className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none text-xs" placeholder="Reseña EN" rows={3} value={t.text.en} onChange={(e) => updateArrayItem('testimonials', idx, 'text', e.target.value, 'en')} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* GALLERY */}
                            {activeTab === 'gallery' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center px-4">
                                        <h3 className="text-sm font-black text-[#56b4bd] uppercase tracking-widest">Galería</h3>
                                        <button onClick={() => addItem('gallery', '')} className="p-2 bg-[#56b4bd] text-white rounded-full hover:scale-110 transition-transform"><Plus size={20} /></button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {content.gallery.map((img: string, idx: number) => (
                                            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center space-x-3">
                                                <input className="flex-1 p-2 bg-gray-50 rounded-lg text-[10px] focus:outline-none" value={img} onChange={(e) => updateArrayItem('gallery', idx, null, e.target.value)} />
                                                <button onClick={() => removeItem('gallery', idx)} className="text-red-300 hover:text-red-500"><Trash2 size={16} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ABOUT (FOUNDER) */}
                            {activeTab === 'about' && (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
                                        <h3 className="text-sm font-black text-[#56b4bd] uppercase tracking-widest border-b border-gray-50 pb-4">Sobre la Fundadora</h3>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Nombre completo</label>
                                            <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.about.founderName} onChange={(e) => updateField('about', 'founderName', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Foto (URL)</label>
                                            <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.about.founderPhoto} onChange={(e) => updateField('about', 'founderPhoto', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CONTACT */}
                            {activeTab === 'contact' && (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
                                        <h3 className="text-sm font-black text-[#56b4bd] uppercase tracking-widest border-b border-gray-50 pb-4">Información de Contacto</h3>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Teléfono</label>
                                            <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.contact.phone} onChange={(e) => updateField('contact', 'phone', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Email</label>
                                            <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.contact.email} onChange={(e) => updateField('contact', 'email', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Dirección Física</label>
                                            <input className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none" value={content.contact.address} onChange={(e) => updateField('contact', 'address', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <aside className="hidden lg:block w-[500px] bg-[#1a1a1a] p-4 border-l border-white/5">
                    <div className="h-full bg-white rounded-[2rem] flex flex-col overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-20">
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#56b4bd]">Vista Previa</h4>
                                <p className="text-[10px] text-gray-400">Cambios en tiempo real</p>
                            </div>
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto preview-container bg-[#fafafa]">
                            <div className="scale-[0.6] origin-top border-4 border-gray-100 rounded-[3rem] overflow-hidden shadow-2xl mx-auto my-8 max-w-[800px]" style={{ height: '140%' }}>
                                {renderPreview()}
                            </div>
                        </div>

                        <div className="p-6 bg-white border-t border-gray-50">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-2 bg-[#56b4bd]/10 text-[#56b4bd] rounded-lg">
                                    <Sparkles size={16} />
                                </div>
                                <p className="text-[10px] text-gray-500 leading-relaxed italic">
                                    "Vista previa redimensionada para mostrar el layout completo."
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AdminDashboard;
