import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ProductCard from '../components/ProductCard';

const Boots = () => {
    const bootsProducts = [
        { id: 101, category: 'Footwear', name: 'TITAN BOOT V1', description: 'ALL-TERRAIN ARMORED FOOTWEAR', price: 'GH₵399.00', colors: ['black'], image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800' },
        { id: 102, category: 'Footwear', name: 'ORBIT RUNNER', description: 'LOW-PROFILE URBAN SPIKE', price: 'GH₵280.00', colors: ['white'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
        { id: 103, category: 'Footwear', name: 'STRIKE FORCE', description: 'COMPRESSION FIT COMBAT SHOE', price: 'GH₵350.00', colors: ['olive'], image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800' },
        { id: 104, category: 'Footwear', name: 'NEON STEP', description: 'REFLECTIVE HIGH-TOP', price: 'GH₵320.00', colors: ['neon'], image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800' },
    ];

    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".boot-header", {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(".product-card-anim", {
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen bg-black">
            <div className="boot-header mb-16 border-b border-white/10 pb-12">
                <p className="text-[10px] tracking-[0.5em] text-accent uppercase font-bold mb-4">Footwear Division</p>
                <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">BOOTS &<br />FOOTWEAR</h1>
                        <p className="text-sm text-white/40 mt-6 max-w-md uppercase tracking-widest leading-relaxed">
                            Engineered for high-intensity movement across diverse urban landscapes. Our footwear combines ballistic-grade materials with responsive cushioning.
                        </p>
                    </div>
                    <div className="flex space-x-12">
                        <div>
                            <p className="text-[24px] font-bold font-mono text-accent">4</p>
                            <p className="text-[8px] uppercase tracking-widest text-white/30">Active Units</p>
                        </div>
                        <div>
                            <p className="text-[24px] font-bold font-mono text-white">100%</p>
                            <p className="text-[8px] uppercase tracking-widest text-white/30">Durability Verified</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {bootsProducts.map(product => (
                    <div key={product.id} className="product-card-anim">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            <div className="mt-32 glass-card p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-[8px] uppercase tracking-widest text-white/20">
                    Proprietary Tech 44.02
                </div>
                <div className="max-w-xl relative z-10">
                    <h2 className="text-3xl font-bold uppercase mb-6 tracking-tighter">BALLISTIC SOLE TECHNOLOGY</h2>
                    <p className="text-sm text-white/60 leading-relaxed uppercase tracking-widest mb-10">
                        The strike zone features our patented high-density polymer, designed to absorb 99% of kinetic impact while providing maximum energy return for the next move.
                    </p>
                    <button className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-accent pb-2 hover:text-accent transition-colors">
                        View Technical Schematics
                    </button>
                </div>
                {/* Visual Decoration */}
                <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] group-hover:bg-accent/10 transition-colors duration-1000"></div>
            </div>
        </div>
    );
};

export default Boots;
