import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin, Globe, ArrowUpRight } from 'lucide-react';

const Contact = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".contact-info", {
                x: -50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
            gsap.from(".contact-form", {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen bg-black">
            <header className="mb-24">
                <p className="text-[10px] tracking-[0.5em] text-accent uppercase font-bold mb-4">Connect With Us</p>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9]">
                    GET IN<br />
                    <span className="text-white/20">TOUCH</span>
                </h1>
            </header>

            <div className="grid grid-cols-12 gap-12 lg:gap-24">
                {/* Info */}
                <div className="col-span-12 lg:col-span-5 space-y-16">
                    <div className="contact-info space-y-8">
                        <section>
                            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-6">Our Flagship</h3>
                            <div className="flex items-start space-x-6">
                                <MapPin size={24} className="text-white/20 shrink-0" />
                                <p className="text-sm text-white/60 leading-relaxed uppercase tracking-widest">
                                    Terminal 4, Sector 7<br />
                                    Innovation District, Accra<br />
                                    Ghana, West Africa
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-6">Communication Channels</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-6 group cursor-pointer">
                                    <Mail size={20} className="text-white/20 shrink-0 group-hover:text-accent transition-colors" />
                                    <span className="text-sm uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">ops@frn.tech</span>
                                </div>
                                <div className="flex items-center space-x-6 group cursor-pointer">
                                    <Phone size={20} className="text-white/20 shrink-0 group-hover:text-accent transition-colors" />
                                    <span className="text-sm uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">+233 24 000 0000</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="contact-info glass-card p-10 border-white/5 space-y-8">
                        <h3 className="text-xl font-bold uppercase tracking-tighter">Customer Support</h3>
                        <p className="text-xs text-white/40 uppercase tracking-widest leading-relaxed">
                            Our support team is available from 09:00 to 18:00 GMT for all inquiries, order adjustments, and general assistance.
                        </p>
                        <button className="flex items-center text-[10px] uppercase tracking-widest font-bold text-accent group">
                            Visit Help Center <ArrowUpRight size={14} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="contact-form col-span-12 lg:col-span-7">
                    <div className="glass-card p-8 sm:p-12 border-white/5 relative bg-white/[0.01]">
                        <h2 className="text-2xl font-bold uppercase tracking-tighter mb-12">SEND A MESSAGE</h2>
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-3 ml-1 group-focus-within:text-accent transition-colors">Your Name</label>
                                    <input type="text" placeholder="FULL NAME" className="w-full bg-transparent border-b border-white/10 pb-4 text-xs focus:outline-none focus:border-accent transition-all uppercase tracking-widest" />
                                </div>
                                <div className="group">
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-3 ml-1 group-focus-within:text-accent transition-colors">Return Channel</label>
                                    <input type="email" placeholder="EMAIL@PROTOCOL.IO" className="w-full bg-transparent border-b border-white/10 pb-4 text-xs focus:outline-none focus:border-accent transition-all uppercase tracking-widest" />
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-3 ml-1 group-focus-within:text-accent transition-colors">Operational Subject</label>
                                <select className="w-full bg-transparent border-b border-white/10 pb-4 text-xs focus:outline-none focus:border-accent transition-all uppercase tracking-widest">
                                    <option className="bg-black">Deployment Status</option>
                                    <option className="bg-black">Technical Support</option>
                                    <option className="bg-black">Collaboration Protocol</option>
                                    <option className="bg-black">Press / Intelligence</option>
                                </select>
                            </div>
                            <div className="group">
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-3 ml-1 group-focus-within:text-accent transition-colors">Manifesto / Inquiry</label>
                                <textarea placeholder="ENTER YOUR MESSAGE HERE..." rows="4" className="w-full bg-transparent border-b border-white/10 pb-4 text-xs focus:outline-none focus:border-accent transition-all uppercase tracking-widest resize-none"></textarea>
                            </div>
                            <button className="btn-primary w-full py-5 text-[11px]">Initiate Transmission</button>
                        </form>
                    </div>
                </div>
            </div>
            
            {/* World Map Background Suggestion */}
            <div className="fixed bottom-0 right-0 p-12 opacity-5 pointer-events-none hidden lg:block">
                <Globe size={400} />
            </div>
        </div>
    );
};

export default Contact;
