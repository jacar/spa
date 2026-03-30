import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
    lang: 'en' | 'es';
    previewData?: any;
}

const SliderItem: React.FC<{ item: any, lang: 'en' | 'es' }> = ({ item, lang }) => {
    const [sliderPos, setSliderPos] = useState(50);
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isResizing || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const position = ((x - rect.left) / rect.width) * 100;
        if (position >= 0 && position <= 100) setSliderPos(position);
    };

    useEffect(() => {
        const endResize = () => setIsResizing(false);
        window.addEventListener('mouseup', endResize);
        window.addEventListener('touchend', endResize);
        return () => {
            window.removeEventListener('mouseup', endResize);
            window.removeEventListener('touchend', endResize);
        };
    }, []);

    return (
        <div className="mb-20 last:mb-0">
            <div className="text-center mb-10 px-4">
                <h3 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] font-bold mb-4">
                    {item.title?.[lang]}
                </h3>
            </div>

            <div
                ref={containerRef}
                className="relative max-w-4xl mx-auto aspect-[4/3] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden cursor-ew-resize shadow-[0_50px_100px_-20px_rgba(86,180,189,0.15)] border-[12px] border-white group select-none"
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                onMouseDown={() => setIsResizing(true)}
                onTouchStart={() => setIsResizing(true)}
            >
                {/* After Image */}
                <div className="absolute inset-0">
                    <img src={item.afterImage} alt="After" className="w-full h-full object-cover pointer-events-none" />
                    <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 bg-white/10 backdrop-blur-xl px-6 py-2 rounded-full text-white text-[9px] font-black uppercase tracking-widest border border-white/20 z-10">
                        {lang === 'en' ? 'After' : 'Después'}
                    </div>
                </div>

                {/* Before Image */}
                <div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ width: `${sliderPos}%`, borderRight: '2px solid white' }}
                >
                    <div className="absolute inset-0 w-[100vw]">
                        <img
                            src={item.beforeImage}
                            alt="Before"
                            className="h-full object-cover"
                            style={{ width: containerRef.current?.offsetWidth || '100%' }}
                        />
                    </div>
                    <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 bg-[#56b4bd]/80 backdrop-blur-xl px-6 py-2 rounded-full text-white text-[9px] font-black uppercase tracking-widest border border-white/20 z-10">
                        {lang === 'en' ? 'Before' : 'Antes'}
                    </div>
                </div>

                {/* Slider Handle */}
                <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${sliderPos}%` }}>
                    <div className="absolute inset-0 w-0.5 bg-white/50 backdrop-blur-md"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-[#56b4bd] group-active:scale-90 transition-transform">
                        <div className="flex space-x-1">
                            <div className="w-1 h-3 bg-[#56b4bd] rounded-full"></div>
                            <div className="w-1 h-3 bg-[#56b4bd] rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ lang, previewData }) => {
    const [content, setContent] = useState<any[]>([]);

    useEffect(() => {
        if (previewData) return;

        const loadLocalData = () => {
            fetch('/data/content.json')
                .then(res => res.json())
                .then(localData => {
                    const localBa = localData?.beforeAfter;
                    setContent(Array.isArray(localBa) ? localBa : (localBa ? [localBa] : []));
                })
                .catch(err => console.error('Local fallback error:', err));
        };

        fetch('/api/content')
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                const ba = data?.beforeAfter;
                const items = Array.isArray(ba) ? ba : (ba ? [ba] : []);
                if (items.length === 0) {
                    loadLocalData();
                } else {
                    setContent(items);
                }
            })
            .catch(err => {
                console.warn('API fetch failed, trying local fallback:', err);
                loadLocalData();
            });
    }, [previewData]);

    const baToDisplay = previewData ? (Array.isArray(previewData) ? previewData : [previewData]) : content;

    if (!baToDisplay || baToDisplay.length === 0) return null;

    return (
        <section id="results" className="py-24 bg-[#fdfcfb] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 px-4">
                    <span className="text-[#56b4bd] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
                        {lang === 'en' ? 'Interactive Results' : 'Resultados Interactivos'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] font-bold">
                        {lang === 'en' ? 'Real Transformations' : 'Transformaciones Reales'}
                    </h2>
                </div>

                {baToDisplay.map((item: any, idx: number) => (
                    <SliderItem key={item.id || idx} item={item} lang={lang} />
                ))}
            </div>
        </section>
    );
};

export default BeforeAfterSlider;
