import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Partners = () => {
    const brands = [
        { name: 'PAYSTACK', role: 'Payment Infrastructure', logo: 'P' },
        { name: 'VODAFONE', role: 'Connectivity Partner', logo: 'V' },
        { name: 'DHL GLOBAL', role: 'Logistics / Supply', logo: 'D' },
        { name: 'GORE-TEX', role: 'Technical Textile', logo: 'G' },
        { name: 'CORDURA', role: 'Durability Tech', logo: 'C' },
        { name: 'UNSPLASH', role: 'Visual Archive', logo: 'U' }
    ];

    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".brand-node", {
                opacity: 0,
                scale: 0.5,
                duration: 0.8,
                stagger: {
                    each: 0.1,
                    from: "center"
                },
                ease: "expo.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen bg-black overflow-hidden">
            <header className="mb-24 text-center max-w-3xl mx-auto">
                <p className="text-[10px] tracking-[0.5em] text-accent uppercase font-bold mb-6">Strategic Alliances</p>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-tight mb-8">THE ECOSYSTEM</h1>
                <p className="text-sm text-white/40 uppercase tracking-[0.2em] leading-loose">
                    COLLABORATING WITH GLOBAL LEADERS IN PERFORMANCE, TECHNOLOGY, AND INFRASTRUCTURE TO REDEFINE THE FUTURE OF THE URBAN WARDROBE.
                </p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-0 border-t border-l border-white/5">
                {brands.map((brand, i) => (
                    <div 
                        key={brand.name} 
                        className="brand-node group aspect-square border-r border-b border-white/5 flex flex-col items-center justify-center p-8 hover:bg-white/[0.02] transition-colors relative"
                    >
                        <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center text-4xl font-bold text-white/20 group-hover:text-accent group-hover:border-accent group-hover:scale-110 transition-all duration-500 mb-6">
                            {brand.logo}
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-tighter mb-2">{brand.name}</h3>
                        <p className="text-[9px] uppercase tracking-widest text-white/30">{brand.role}</p>
                        
                        {/* Interactive Corner */}
                        <div className="absolute top-4 right-4 text-[8px] font-mono text-white/10 group-hover:text-white/40 transition-colors">
                            REF: {1024 + i}
                        </div>
                    </div>
                ))}
            </div>

            <section className="mt-48 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                    <h2 className="text-3xl font-bold uppercase mb-8 tracking-tighter">Become a Node</h2>
                    <p className="text-sm text-white/40 leading-relaxed uppercase tracking-[0.2em] mb-12">
                        We are constantly expanding our network of innovation partners. If your technology or brand aligns with our mission for urban performance, we invite you to connect.
                    </p>
                    <div className="space-y-4">
                        <div className="flex border-b border-white/10 pb-4 justify-between items-center group cursor-pointer">
                            <span className="text-[11px] uppercase tracking-widest group-hover:text-accent transition-colors">Partnership Protocol</span>
                            <span className="text-white/20 text-xs">— PDF — 2.4MB</span>
                        </div>
                        <div className="flex border-b border-white/10 pb-4 justify-between items-center group cursor-pointer">
                            <span className="text-[11px] uppercase tracking-widest group-hover:text-accent transition-colors">Technical Standards</span>
                            <span className="text-white/20 text-xs">— PDF — 1.8MB</span>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-video glass-card overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale opacity-50" alt="" />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-accent"></div>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-accent"></div>
                </div>
            </section>
        </div>
    );
};

export default Partners;
