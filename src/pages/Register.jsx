import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Shield, ChevronRight, Lock, User, Mail, Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const containerRef = useRef(null);
    const formRef = useRef(null);
    const bgTextRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering...', { name, email });
        gsap.to(formRef.current, { 
            scale: 0.98, 
            duration: 0.2, 
            yoyo: true, 
            repeat: 1,
            ease: "power2.inOut" 
        });
        setTimeout(() => alert('Account initialization successful. Welcome to the archive.'), 400);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
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

            gsap.to(bgTextRef.current, {
                x: 50,
                duration: 25,
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
            
            <div ref={bgTextRef} className="absolute -top-20 -right-20 text-[20vw] font-bold text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase tracking-tighter">
                Personnel Entry 02
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
                {/* Left Side: Branding/Intro */}
                <div className="hidden lg:block space-y-8">
                    <div className="overflow-hidden">
                        <h2 className="text-[10px] tracking-[0.5em] text-accent uppercase font-bold reveal-text">Recruitment Protocol</h2>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="text-7xl xl:text-8xl font-bold uppercase tracking-tighter leading-[0.9] reveal-text">
                            Join<br />Base
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-white/40 text-sm max-w-sm tracking-wide leading-relaxed reveal-text">
                            Initialize your digital identity to start compiling your collection of state-of-the-art fashion gear.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div ref={formRef} className="glass-card p-8 sm:p-12 md:p-16 rounded-sm relative border-white/5 reveal-form">
                    <div className="absolute -top-px -left-px w-20 h-px bg-gradient-to-r from-accent to-transparent"></div>
                    <div className="absolute -top-px -left-px w-px h-20 bg-gradient-to-b from-accent to-transparent"></div>
                    
                    <div className="mb-12">
                        <div className="flex items-center space-x-3 mb-6 lg:hidden">
                            <Shield size={16} className="text-accent" />
                            <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-bold">New Identity</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">Initialize</h2>
                        <p className="text-[10px] tracking-widest text-white/30 uppercase">Create your access credentials</p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="group relative">
                            <label className="flex items-center text-[9px] uppercase tracking-[0.3em] text-white/40 mb-3 group-focus-within:text-accent transition-colors">
                                <User size={10} className="mr-2" /> Callsign
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent border-b border-white/10 pb-3 text-sm focus:outline-none focus:border-accent transition-all placeholder:text-white/10 font-mono"
                                placeholder="Operator Zero"
                            />
                        </div>

                        <div className="group relative">
                            <label className="flex items-center text-[9px] uppercase tracking-[0.3em] text-white/40 mb-3 group-focus-within:text-accent transition-colors">
                                <Mail size={10} className="mr-2" /> Digital Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b border-white/10 pb-3 text-sm focus:outline-none focus:border-accent transition-all placeholder:text-white/10 font-mono"
                                placeholder="operator@frn.tech"
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
                                    className="w-full bg-transparent border-b border-white/10 pb-3 text-sm focus:outline-none focus:border-accent transition-all placeholder:text-white/10"
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
                                <span className="relative z-10">Confirm Identity</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform relative z-10" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 pt-8 border-t border-white/5 text-center text-[9px] uppercase tracking-[0.2em] text-white/30">
                        Already in our database? <Link to="/login" className="text-accent hover:text-white transition-colors ml-2">Return to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
