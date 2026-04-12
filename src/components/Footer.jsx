import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative min-h-[600px] flex flex-col justify-end px-12 pb-12 overflow-hidden bg-black/50">
            {/* Background Image - Street Theme */}
            <div className="absolute inset-0 -z-10 bg-[url('/images/footer-bg.png')] bg-cover bg-center grayscale brightness-[0.3]"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center opacity-10 select-none pointer-events-none">
                <h2 className="text-[20vw] font-bold leading-none tracking-tighter text-white">
                    STREET
                </h2>
            </div>

            <div className="grid grid-cols-12 w-full gap-12 z-10">
                <div className="col-span-12 lg:col-span-4 self-end">
                    <Link to="/" className="text-3xl font-bold tracking-tighter mb-8 block">
                        MAX<span className="text-accent">™</span>
                    </Link>
                    <p className="text-[10px] tracking-widest text-white/40 uppercase mb-8 max-w-[300px] leading-loose">
                        ENGINEERING URBAN GEAR FOR THE EXTREME. NOT JUST CLOTHING, BUT A RESPONSE TO THE CONCRETE JUNGLE.
                    </p>
                    <div className="flex space-x-8 text-[9px] uppercase tracking-[0.2em] text-white/60">
                        <a href="#" className="hover:text-accent transition-colors">Privacy</a>
                        <a href="#" className="hover:text-accent transition-colors">Terms</a>
                        <a href="#" className="hover:text-accent transition-colors">Cookies</a>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-end items-start lg:items-end space-y-6">
                    <div className="flex flex-col items-start lg:items-end w-full">
                        <p className="text-[10px] tracking-widest text-white/40 uppercase mb-4">
                            [ JOIN THE ARCHIVE ]
                        </p>
                        <div className="flex w-full lg:w-auto">
                            <input
                                type="email"
                                placeholder="YOUR EMAIL"
                                className="bg-white/5 border border-white/10 px-4 py-2 text-[10px] tracking-widest focus:outline-none focus:border-accent w-full lg:w-64"
                            />
                            <button className="bg-white text-black px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white/80 transition-colors">
                                SUBMIT
                            </button>
                        </div>
                    </div>

                    <div className="text-left lg:text-right pt-8 border-t border-white/10 w-full flex flex-col lg:items-end">
                        <h3 className="text-4xl font-bold leading-[0.9] uppercase mb-6">
                            URBAN ARMOR<br />
                            TECH WEAR<br />
                            STREET READY
                        </h3>
                        <div className="flex items-center space-x-6">
                            <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.3em]">
                                ©2026 Max Collection. ALL RIGHTS RESERVED.
                            </span>
                            <button
                                onClick={scrollToTop}
                                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                            >
                                <ArrowUp size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

