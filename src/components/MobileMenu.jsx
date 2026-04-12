import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { X, Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react';

const MobileMenu = ({ isOpen, onClose }) => {
    const menuRef = useRef(null);
    const overlayRef = useRef(null);
    const linksRef = useRef([]);

    useEffect(() => {
        const menu = menuRef.current;
        const overlay = overlayRef.current;
        const links = linksRef.current;

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            
            const tl = gsap.timeline();
            
            tl.to(overlay, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            })
            .to(menu, {
                x: 0,
                duration: 0.8,
                ease: "expo.out"
            }, "-=0.3")
            .fromTo(links, {
                y: 50,
                opacity: 0,
                rotateX: -45
            }, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power4.out"
            }, "-=0.5")
            .fromTo(".menu-footer", {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.5
            }, "-=0.3");
        } else {
            document.body.style.overflow = 'auto';
            
            const tl = gsap.timeline();
            
            tl.to(links, {
                y: -20,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05
            })
            .to(menu, {
                x: "100%",
                duration: 0.6,
                ease: "expo.in"
            }, "-=0.2")
            .to(overlay, {
                opacity: 0,
                duration: 0.4
            }, "-=0.4");
        }
    }, [isOpen]);

    const addToLinksRef = (el) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el);
        }
    };

    const navItems = [
        { name: 'Shop', path: '/shop' },
        { name: 'Catalog', path: '/catalog' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Identity', path: '/profile' }
    ];

    return (
        <div className={`fixed inset-0 z-[100] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {/* Overlay */}
            <div 
                ref={overlayRef}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 transition-opacity"
            ></div>

            {/* Menu Panel */}
            <div 
                ref={menuRef}
                className="absolute top-0 right-0 w-full sm:w-[450px] h-full bg-[#050505] border-l border-white/5 translate-x-full shadow-2xl flex flex-col pt-12 sm:pt-32 pb-12 px-8 sm:px-12"
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
                    aria-label="Close Menu"
                >
                    <X size={32} strokeWidth={1} />
                </button>

                {/* Floating Bg Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vh] font-bold text-white/[0.01] pointer-events-none select-none -rotate-90">
                    MAX
                </div>

                <div className="flex-grow">
                    <p className="text-[10px] tracking-[0.5em] text-accent uppercase font-bold mb-12">Navigation</p>
                    <nav className="space-y-6">
                        {navItems.map((item, index) => (
                            <div key={item.name} className="overflow-hidden group">
                                <Link
                                    to={item.path}
                                    onClick={onClose}
                                    ref={addToLinksRef}
                                    className="block text-4xl sm:text-5xl font-bold uppercase tracking-tighter leading-none hover:text-accent transition-colors flex items-center justify-between"
                                >
                                    <span>{item.name}</span>
                                    <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all" />
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Footer */}
                <div className="menu-footer space-y-12">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-[8px] uppercase tracking-widest text-white/20 mb-4">Location</p>
                            <p className="text-[10px] uppercase tracking-wider text-white/60 leading-relaxed">
                                Terminal 4, Sector 7<br />
                                Global Hub
                            </p>
                        </div>
                        <div>
                            <p className="text-[8px] uppercase tracking-widest text-white/20 mb-4">Contact</p>
                            <p className="text-[10px] uppercase tracking-wider text-white/60 leading-relaxed">
                                hello@maxcollection.tech<br />
                                +233 (0) 50 000 0000
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/5 pt-8">
                        <div className="flex space-x-6">
                            <Instagram size={18} className="text-white/40 hover:text-accent cursor-pointer transition-colors" />
                            <Twitter size={18} className="text-white/40 hover:text-accent cursor-pointer transition-colors" />
                            <Youtube size={18} className="text-white/40 hover:text-accent cursor-pointer transition-colors" />
                        </div>
                        <p className="text-[8px] uppercase tracking-[0.3em] text-white/20">
                            © 2026 Max Collection
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
