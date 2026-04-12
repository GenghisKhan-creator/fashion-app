import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Flame, TrendingUp } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
    const containerRef = useRef(null);

    const products = {
        newArrivals: [
            { id: 1, category: 'Outerwear', name: 'NEON GHOST', description: 'OVERSIZED REFLECTIVE HOODIE', price: 'GH₵189.00', colors: ['black'], image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
            { id: 6, category: 'Outerwear', name: 'CARGO X', description: 'MODULAR TECH PANTS', price: 'GH₵220.00', colors: ['olive'], image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800' },
        ],
        bestSelling: [
            { id: 2, category: 'Footwear', name: 'APEX ONE', description: 'TECHNICAL STREET RUNNERS', price: 'GH₵299.99', colors: ['white'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
            { id: 3, category: 'Watches', name: 'CHRONOS V4', description: 'STEALTH MATTE WATCH', price: 'GH₵450.00', colors: ['black'], image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' },
        ],
        trending: [
            { id: 4, category: 'Accessories', name: 'MIDNIGHT SHADE', description: 'POLARIZED CYBER FRAME', price: 'GH₵120.00', colors: ['black'], image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800' },
            { id: 8, category: 'Accessories', name: 'TITAN BELT', description: 'TACTICAL QUICK-RELEASE', price: 'GH₵85.00', colors: ['black'], image: 'https://images.unsplash.com/photo-1624222247344-550fb8ec5054?auto=format&fit=crop&q=80&w=800' },
        ]
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".shop-header", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.utils.toArray(".shop-section").forEach(section => {
                gsap.from(section.querySelectorAll(".section-item"), {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out"
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen bg-black overflow-hidden">
            <header className="shop-header mb-24 border-b border-white/10 pb-12 flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                    <p className="text-[10px] tracking-[0.5em] text-accent uppercase font-bold mb-4">Official Drop</p>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9]">THE<br /><span className="text-white/20">SCENE</span></h1>
                </div>
                <Link to="/catalog" className="btn-primary flex items-center group">
                    The Archive <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
            </header>

            <div className="space-y-32">
                {/* New Arrivals */}
                <section className="shop-section">
                    <div className="flex items-center justify-between mb-12 border-l-2 border-accent pl-6">
                        <div className="flex items-center space-x-4">
                            <Sparkles className="text-accent" size={20} />
                            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">Fresh Drops</h2>
                        </div>
                        <Link to="/catalog" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-accent transition-colors">See the Lineup</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.newArrivals.map(product => (
                            <div key={product.id} className="section-item">
                                <ProductCard product={product} />
                            </div>
                        ))}
                        {/* Filler for layout if data is sparse */}
                        <div className="hidden lg:flex section-item aspect-[3/4] glass-card items-center justify-center border-dashed opacity-20">
                            <p className="text-[10px] uppercase tracking-widest">Incoming Data...</p>
                        </div>
                    </div>
                </section>

                {/* Best Selling */}
                <section className="shop-section">
                    <div className="flex items-center justify-between mb-12 border-l-2 border-white/20 pl-6">
                        <div className="flex items-center space-x-4">
                            <Flame className="text-orange-500" size={20} />
                            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">Heavy Hitters</h2>
                        </div>
                        <Link to="/catalog" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-accent transition-colors">Legendary Gear</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.bestSelling.map(product => (
                            <div key={product.id} className="section-item">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Promotional Banner */}
                <section className="shop-section section-item">
                    <Link to="/catalog" className="block relative h-[400px] group overflow-hidden glass-card">
                        <img 
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" 
                            className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:scale-105 transition-transform duration-[2s]" 
                            alt="" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
                        <div className="absolute inset-0 flex flex-col justify-center p-12">
                            <p className="text-accent text-[10px] tracking-[0.5em] font-bold uppercase mb-4">Limited Release</p>
                            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 max-w-lg">THE NEON SERIES IS NOW LIVE</h2>
                            <div className="flex items-center text-xs font-bold uppercase tracking-widest">
                                Discover the Collection <ArrowRight size={16} className="ml-4" />
                            </div>
                        </div>
                    </Link>
                </section>

                {/* Trending */}
                <section className="shop-section">
                    <div className="flex items-center justify-between mb-12 border-l-2 border-white/20 pl-6">
                        <div className="flex items-center space-x-4">
                            <TrendingUp className="text-blue-400" size={20} />
                            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">Viral Now</h2>
                        </div>
                        <Link to="/catalog" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-accent transition-colors">Stay Locked</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.trending.map(product => (
                            <div key={product.id} className="section-item">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Shop;
