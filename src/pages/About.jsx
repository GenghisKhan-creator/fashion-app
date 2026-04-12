import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const About = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-header", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(".about-section", {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 80%"
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen bg-black overflow-hidden">
            <header className="about-header mb-24 max-w-4xl">
                <p className="text-[10px] tracking-[0.5em] text-accent uppercase font-bold mb-6">Our Story</p>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-12">
                    THE NEXT<br />
                    <span className="text-white/20">FRONTIER</span>
                </h1>
                <p className="text-lg md:text-2xl text-white/60 leading-relaxed uppercase tracking-tight font-light">
                    Max Collection IS A PREMIUM TECHNICAL APPAREL STUDIO BASED IN ACCRA, GHANA. WE DESIGN PIECES FOR THE MODERN RETAIL LANDSCAPE AND THE ACTIVE URBAN LIFESTYLE.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                <section className="about-section space-y-8">
                    <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent border-b border-white/10 pb-4">The Vision</h2>
                    <p className="text-sm text-white/40 leading-loose uppercase tracking-widest font-light">
                        Founded in 2025, Max Collection was born out of a passion for retail excellence and innovative garments that bridge the gap between pure performance and high-end aesthetics. We believe that apparel should be as versatile as the individuals who wear them.
                    </p>
                    <p className="text-sm text-white/40 leading-loose uppercase tracking-widest font-light">
                        Every piece we produce is a result of rigorous testing in the humid, high-paced environment of West African cities. We use ballistic-grade materials, reflective membranes, and modular designs to ensure maximum utility.
                    </p>
                </section>

                <section className="about-section space-y-12">
                    <div className="glass-card p-10 border-white/5 relative group">
                        <div className="absolute top-0 right-0 p-8 text-[8px] font-mono text-white/10">ST-04 REV. 2</div>
                        <h3 className="text-2xl font-bold uppercase tracking-tighter mb-6">GHANAIAN CRAFT x GLOBAL TECH</h3>
                        <p className="text-xs text-white/50 leading-relaxed uppercase tracking-widest">
                            While our supply chain is global, our heart is local. We collaborate with Ghanaian talent to ensure our designs reflect the vibrant, resilient spirit of our home while meeting international technical standards.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 text-center border-t border-white/5 pt-12">
                        <div>
                            <p className="text-3xl font-bold font-mono tracking-tighter mb-2 text-accent">2025</p>
                            <p className="text-[8px] uppercase tracking-widest text-white/30">Established</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold font-mono tracking-tighter mb-2 text-white">400+</p>
                            <p className="text-[8px] uppercase tracking-widest text-white/30">Units Deployed</p>
                        </div>
                    </div>
                </section>
            </div>

            <section className="mt-48 relative h-[60vh] overflow-hidden glass-card flex items-center justify-center text-center px-12">
                <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-20" 
                    alt="" 
                />
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 leading-none">ENGINEERED<br />WITHOUT COMPROMISE</h2>
                    <div className="w-16 h-px bg-accent mx-auto mb-8"></div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">Designed in Accra. Tested globally.</p>
                </div>
            </section>
        </div>
    );
};

export default About;
