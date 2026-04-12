import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, Package } from 'lucide-react';

const CheckoutSuccess = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".success-node", {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "expo.out"
            });
            gsap.from(".order-number", {
                width: 0,
                duration: 1.5,
                ease: "power4.inOut"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const orderId = "MAX-" + Math.floor(Math.random() * 900000 + 100000);

    return (
        <div ref={containerRef} className="pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen bg-black flex flex-col items-center justify-center">
            <div className="max-w-3xl w-full text-center space-y-12">
                <div className="success-node inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/10 border border-accent/20 mb-8 mx-auto relative">
                    <CheckCircle size={48} className="text-accent" />
                    <div className="absolute inset-0 animate-ping rounded-full bg-accent opacity-10"></div>
                </div>

                <div className="success-node space-y-4">
                    <p className="text-[12px] tracking-[0.6em] text-accent uppercase font-bold">Good Look</p>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
                        DROP<br />
                        <span className="text-white/20">SECURED</span>
                    </h1>
                </div>

                <div className="success-node flex flex-col items-center py-10 border-y border-white/5 space-y-10">
                    <div className="text-center group">
                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-3">Drop ID</p>
                        <div className="relative inline-block">
                            <h2 className="text-2xl font-mono font-bold tracking-[0.2em]">{orderId}</h2>
                            <div className="order-number absolute bottom-0 left-0 h-px bg-accent w-full"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-center">
                        <div>
                            <p className="text-[8px] uppercase tracking-widest text-white/40 mb-2">Status</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></div> Processing
                            </p>
                        </div>
                        <div>
                            <p className="text-[8px] uppercase tracking-widest text-white/40 mb-2">Delivery Time</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest">3-5 Business Days</p>
                        </div>
                        <div>
                            <p className="text-[8px] uppercase tracking-widest text-white/40 mb-2">Network</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Paystack Secure</p>
                        </div>
                    </div>
                </div>

                <div className="success-node grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link to="/profile" className="flex items-center justify-center p-5 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all">
                        <Package size={16} className="mr-3" /> Track the Drop
                    </Link>
                    <button className="flex items-center justify-center p-5 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Download size={16} className="mr-3" /> Get Receipt
                    </button>
                    <Link to="/shop" className="col-span-1 sm:col-span-2 flex items-center justify-center p-5 border border-white/5 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all">
                        Back to the Scene <ArrowRight size={14} className="ml-3" />
                    </Link>
                </div>

                <div className="success-node pt-12">
                    <p className="text-[9px] text-white/20 uppercase tracking-[0.5em] leading-relaxed max-w-sm mx-auto">
                        A confirmation signal has been sent to your registered communication channel.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
