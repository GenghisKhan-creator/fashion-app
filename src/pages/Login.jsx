import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Shield, ChevronRight, Lock, User, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const containerRef = useRef(null);
    const formRef = useRef(null);
    const bgTextRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Authenticating...', { email });
        // Add a small success animation feedback
        gsap.to(formRef.current, { 
            scale: 0.98, 
            duration: 0.2, 
            yoyo: true, 
            repeat: 1,
            ease: "power2.inOut" 
        });
        setTimeout(() => alert('Authentication sequence initiated. Access granted.'), 400);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animation
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
            
            tl.fromTo(".reveal-text", 
                { y: 100, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 }
            )
            .fromTo(".reveal-form", 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 
                "-=0.8"
            )
            .fromTo(".bg-accent-blob", 
                { scale: 0, opacity: 0 }, 
                { scale: 1, opacity: 0.3, duration: 2, ease: "elastic.out(1, 0.3)" }, 
                "-=1.5"
            );

            // Floating background text animation
            gsap.to(bgTextRef.current, {
                x: -50,
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-black">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] bg-accent-blob"></div>
            
            <div ref={bgTextRef} className="absolute -bottom-20 -left-20 text-[20vw] font-bold text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase tracking-tighter">
                Authentication Sequence 01
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
                {/* Left Side: Branding/Intro */}
                <div className="hidden lg:block space-y-8">
                    <div className="overflow-hidden">
                        <h2 className="text-[10px] tracking-[0.5em] text-accent uppercase font-bold reveal-text">Security Protocol</h2>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="text-7xl xl:text-8xl font-bold uppercase tracking-tighter leading-[0.9] reveal-text">
                            Gate<br />Way
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-white/40 text-sm max-w-sm tracking-wide leading-relaxed reveal-text">
                            Access your personalized fashion inventory and manage your deployed gear through our secure encrypted portal.
                        </p>
                    </div>
                    <div className="flex space-x-12 pt-8 reveal-form">
                        <div>
                            <p className="text-[10px] text-white/20 uppercase tracking-widest mb-2">Version</p>
                            <p className="text-xs font-mono">v4.0.1-RC</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-white/20 uppercase tracking-widest mb-2">Encryption</p>
                            <p className="text-xs font-mono">AES-256-GCM</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div ref={formRef} className="glass-card p-8 sm:p-12 md:p-16 rounded-sm relative border-white/5 reveal-form">
                    {/* Visual accents for 'Awards' feel */}
                    <div className="absolute -top-px -left-px w-20 h-px bg-gradient-to-r from-accent to-transparent"></div>
                    <div className="absolute -top-px -left-px w-px h-20 bg-gradient-to-b from-accent to-transparent"></div>
                    
                    <div className="mb-12">
                        <div className="flex items-center space-x-3 mb-6 lg:hidden">
                            <Shield size={16} className="text-accent" />
                            <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-bold">Protocol Active</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">Identity Check</h2>
                        <p className="text-[10px] tracking-widest text-white/30 uppercase">Authorized access only</p>
                    </div>

                    <form className="space-y-10" onSubmit={handleSubmit}>
                        <div className="group relative">
                            <label className="flex items-center text-[9px] uppercase tracking-[0.3em] text-white/40 mb-3 group-focus-within:text-accent transition-colors">
                                <User size={10} className="mr-2" /> Identification
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b border-white/10 pb-3 text-sm focus:outline-none focus:border-accent transition-all placeholder:text-white/10 font-mono"
                                placeholder="hello@maxcollection.tech"
                            />
                        </div>
                        
                        <div className="group relative">
                            <label className="flex items-center text-[9px] uppercase tracking-[0.3em] text-white/40 mb-3 group-focus-within:text-accent transition-colors">
                                <Lock size={10} className="mr-2" /> Access Key
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent border-b border-white/10 pb-3 text-sm focus:outline-none focus:border-accent transition-all placeholder:text-white/10 font-mono"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors p-2"
                                >
                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button type="submit" className="btn-primary w-full group py-4 flex items-center justify-center space-x-3 overflow-hidden relative">
                                <span className="relative z-10">Initialize Access</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform relative z-10" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4 text-[9px] uppercase tracking-[0.2em] text-white/30">
                        <Link to="/register" className="hover:text-accent transition-colors flex items-center">
                            Register Identity <ChevronRight size={10} className="ml-1" />
                        </Link>
                        <a href="#" className="hover:text-white transition-colors">Emergency Reset</a>
                    </div>
                </div>
            </div>
            
            {/* Decorative Footer */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none opacity-20 hidden sm:flex">
                <div className="text-[8px] uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
                    System.Status: Online
                </div>
                <div className="text-[8px] uppercase tracking-[0.5em]">
                    © 2026 Max Collection
                </div>
            </div>
        </div>
    );
};

export default Login;
