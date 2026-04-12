import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Players = () => {
    const players = [
        {
            id: 1,
            name: 'Kofi Arhin',
            role: 'Forward / Tech Wear Pioneer',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
            handle: '@kofi_arhin',
            description: 'Leading the bridge between athletic performance and urban aesthetics.'
        },
        {
            id: 2,
            name: 'Ama Serwaa',
            role: 'Creative Director / Model',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
            handle: '@ama_serwaa',
            description: 'Defining the visual language of the next generation of West African fashion.'
        },
        {
            id: 3,
            name: 'Nana Yaw',
            role: 'Street Stylist / Athlete',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
            handle: '@nana_stylist',
            description: 'Pushing boundaries in functional movement and high-fashion utility.'
        }
    ];

    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".player-card", {
                scrollTrigger: {
                    trigger: ".player-grid",
                    start: "top 80%",
                },
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power4.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen bg-black">
            <header className="mb-24">
                <p className="text-[10px] tracking-[0.5em] text-accent uppercase font-bold mb-4">The Collective</p>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9]">
                    PRO<br />
                    <span className="text-white/20">PLAYERS</span>
                </h1>
                <div className="mt-12 max-w-xl">
                    <p className="text-lg text-white/60 leading-relaxed uppercase tracking-tight">
                        Our collective of athletes, designers, and pioneers who define the Max Collection aesthetic across the globe.
                    </p>
                </div>
            </header>

            <div className="player-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {players.map(player => (
                    <div key={player.id} className="player-card group relative">
                        <div className="aspect-[3/4] overflow-hidden glass-card border-white/5 bg-white/5">
                            <img 
                                src={player.image} 
                                alt={player.name} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                        
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-[10px] tracking-widest text-accent uppercase font-bold mb-2">{player.role}</p>
                                <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4">{player.name}</h3>
                                <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <Instagram size={16} className="text-white hover:text-accent cursor-pointer" />
                                    <Twitter size={16} className="text-white hover:text-accent cursor-pointer" />
                                    <span className="text-[10px] uppercase font-bold tracking-widest ml-auto flex items-center">
                                        View Profile <ArrowRight size={12} className="ml-2" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <section className="mt-48 pt-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="max-w-md">
                    <h2 className="text-3xl font-bold uppercase mb-6 tracking-tighter">Join the Collective</h2>
                    <p className="text-sm text-white/40 leading-relaxed uppercase tracking-widest mb-8">
                        We are looking for individuals who embody the spirit of high-performance urban living.
                    </p>
                    <button className="btn-primary">Apply for Direct Entry</button>
                </div>
                <div className="flex-grow grid grid-cols-2 gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">
                    <div className="space-y-4">
                        <p>01. Performance</p>
                        <p>02. Aesthetics</p>
                        <p>03. Innovation</p>
                    </div>
                    <div className="space-y-4">
                        <p>04. Global Presence</p>
                        <p>05. Technical Edge</p>
                        <p>06. Community</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Players;
