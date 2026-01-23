import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Instagram, Twitter, Facebook } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const { addToCart } = useCart();

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Neon');

    const products = [
        {
            id: 0,
            name: 'GHOST SHELL',
            price: 'GH₵899.99',
            image: '/images/hero-ghost.png',
            description: 'TECHNICAL WATERPROOF OUTERWEAR'
        },
        {
            id: 1,
            name: 'ARCTIC VEST',
            price: 'GH₵549.00',
            image: '/images/hero-arctic.png',
            description: 'ULTRA-LIGHT THERMAL LAYER'
        },
        {
            id: 2,
            name: 'NEBULA CORE',
            price: 'GH₵1,100.00',
            image: '/images/hero-nebula.png',
            description: 'DEEP SPACE INSULATION TECH'
        }
    ];

    const activeProduct = products[activeIndex];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current.children, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out"
            });

            gsap.from(imageRef.current, {
                scale: 1.1,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out"
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const handleSwitchProduct = (index) => {
        if (index === activeIndex) return;

        const tl = gsap.timeline();

        // Out animation
        tl.to(imageRef.current, {
            x: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                setActiveIndex(index);
            }
        });

        // In animation
        tl.fromTo(imageRef.current,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );

        // Title refresh
        gsap.fromTo(titleRef.current.querySelector('h1'),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
    };

    const handleAddToCart = () => {
        addToCart({ ...activeProduct, size: selectedSize, color: selectedColor });
        gsap.to(imageRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    };

    return (
        <section ref={heroRef} className="relative min-h-screen pt-32 px-6 lg:px-12 flex items-center overflow-hidden">
            {/* Background Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-10">
                <h1 className="text-[25vw] font-bold text-center leading-none text-white select-none transition-all duration-700">
                    {activeIndex === 0 ? 'URBN' : activeIndex === 1 ? 'SNOW' : 'CORE'}
                </h1>
            </div>

            <div className="grid grid-cols-12 w-full items-center">
                {/* Left Content */}
                <div className="col-span-12 lg:col-span-4 z-10" ref={titleRef}>
                    <div className="mb-4">
                        <span className="text-[10px] tracking-[0.5em] text-accent border border-accent/20 px-2 py-1 rounded">
                            {`// DROP : 2026.Q1 / STREET //`}
                        </span>
                    </div>
                    <h1 className="text-7xl font-bold leading-[0.9] mb-8 uppercase">
                        {activeProduct.name.split(' ')[0]}<br />
                        {activeProduct.name.split(' ')[1]}<sup className="text-2xl ml-2">™</sup>
                    </h1>

                    <div className="space-y-8">
                        <div className="flex space-x-12">
                            <div>
                                <p className="text-[10px] tracking-widest text-white/40 uppercase mb-2">Select Size</p>
                                <div className="flex space-x-4">
                                    {['S', 'M', 'L', 'XL'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`text-sm font-mono transition-colors ${selectedSize === size ? 'text-accent' : 'text-white/50 hover:text-white'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] tracking-widest text-white/40 uppercase mb-2">Finish</p>
                                <div className="flex space-x-4">
                                    {['Neon', 'Matte'].map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`text-sm font-mono transition-colors uppercase ${selectedColor === color ? 'text-accent' : 'text-white/50 hover:text-white'}`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-8 pt-4">
                            <button
                                onClick={handleAddToCart}
                                className="group relative"
                            >
                                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                    <ArrowUpRight className="transform group-hover:rotate-45 transition-transform" />
                                </div>
                                <div className="absolute left-20 top-1/2 -translate-y-1/2 whitespace-nowrap">
                                    <p className="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-accent transition-colors">Deploy to cart</p>
                                    <p className="text-xl font-bold">{activeProduct.price}</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Center Image */}
                <div className="col-span-12 lg:col-span-5 flex justify-center h-[50vh] lg:h-[80vh] my-12 lg:my-0">
                    <img
                        ref={imageRef}
                        src={activeProduct.image}
                        alt={activeProduct.name}
                        className="h-full object-contain drop-shadow-[0_0_80px_rgba(56,189,248,0.2)]"
                    />
                </div>

                {/* Right Gallery */}
                <div className="col-span-12 lg:col-span-3 flex flex-col justify-end items-center lg:items-end space-y-8 mt-12 lg:mt-0">
                    <div className="flex space-x-4 mb-8 lg:mb-32">
                        {products.map((product, idx) => (
                            <div
                                key={product.id}
                                onClick={() => handleSwitchProduct(idx)}
                                className={`w-20 h-28 lg:w-24 lg:h-32 glass-card rounded-sm overflow-hidden p-1 group border-2 transition-colors cursor-pointer ${activeIndex === idx ? 'border-accent' : 'border-transparent'}`}
                            >
                                <img
                                    src={product.image}
                                    className={`w-full h-full object-cover transition-all duration-500 ${activeIndex === idx ? 'grayscale-0 scale-110' : 'grayscale group-hover:grayscale-0'}`}
                                    alt={product.name}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center space-x-8 lg:space-x-0 lg:flex-col lg:items-center lg:space-y-4 lg:mr-4">
                        <div className="hidden lg:block h-32 w-[1px] bg-white/20 relative">
                            <div className="absolute top-0 w-full bg-white transition-all duration-700" style={{ height: activeIndex === 0 ? '33.33%' : activeIndex === 1 ? '66.66%' : '100%' }}></div>
                        </div>
                        <span className="text-[10px] font-mono tracking-tighter">0{activeIndex + 1} — 0{products.length}</span>

                        <div className="flex space-x-6 lg:pt-12">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <Instagram size={18} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <Twitter size={18} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <Facebook size={18} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
