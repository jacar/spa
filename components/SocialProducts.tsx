import React, { useState, useEffect } from 'react';

interface SocialProductsProps {
    lang: 'en' | 'es';
    previewData?: any;
}

const SocialProducts: React.FC<SocialProductsProps> = ({ lang, previewData }) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (previewData) return;
        fetch('http://localhost:3005/api/content')
            .then(res => res.json())
            .then(d => setData(d?.products))
            .catch(err => console.error(err));
    }, [previewData]);

    const productsData = previewData || data;

    if (!productsData) return null;

    return (
        <section id="tienda" className="py-24 bg-[radial-gradient(circle_at_top,_#f6fbfc_0%,_#ffffff_100%)] overflow-hidden relative">
            <div className="absolute inset-0 bg-[#56b4bd]/[0.02] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-[#56b4bd] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
                        {lang === 'en' ? 'Shop Divine' : 'Tienda Divine'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] font-bold mb-6">
                        {productsData.title?.[lang]}
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-500 text-sm leading-relaxed">
                        {lang === 'en'
                            ? 'Discover our curated selection of premium skincare products used in our treatments.'
                            : 'Descubre nuestra selección curada de productos premium para el cuidado de la piel.'}
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="bg-[#fdfcfb] p-4 md:p-8 rounded-[3rem] shadow-xl border border-gray-50 max-w-[540px] w-full overflow-hidden">
                        <iframe
                            src={productsData.facebookEmbed}
                            width="100%"
                            height="574"
                            style={{ border: 'none', overflow: 'hidden' }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProducts;
