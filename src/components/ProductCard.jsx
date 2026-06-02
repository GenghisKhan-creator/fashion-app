import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, Plus, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product, large = false }) => {
    const cardRef = useRef(null);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const navigate = useNavigate();

    const isFav = isInWishlist(product.id);

    const handleWishlist = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
        
        // Pop scale animation on click for interactive micro-feedback
        gsap.fromTo(e.currentTarget,
            { scale: 0.8 },
            { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }
        );
    };

    const handleAdd = (e) => {
        e.stopPropagation();
        addToCart(product);
        
        // Button animation feedback
        gsap.to(e.currentTarget, { 
            scale: 0.9, 
            duration: 0.1, 
            yoyo: true, 
            repeat: 1, 
            ease: "power2.inOut" 
        });
        
        // Card subtle feedback
        gsap.to(cardRef.current, { 
            y: -5, 
            duration: 0.2, 
            yoyo: true, 
            repeat: 1 
        });
    };

    const handleNavigate = () => {
        navigate(`/product/${product.id}`);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(cardRef.current, { y: 50, opacity: 0 });

            gsap.to(cardRef.current, {
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto"
            });
        }, cardRef);

        return () => ctx.revert();
    }, []);

    if (large) {
        return (
            <div
                ref={cardRef}
                onClick={handleNavigate}
                className="relative group cursor-pointer overflow-hidden rounded-sm glass-card h-[500px] opacity-0"
            >
                <div className="absolute top-8 left-8 z-20">
                    <h3 className="text-4xl font-bold">{product.name}<sup className="text-sm">™</sup></h3>
                    <div className="flex items-center space-x-4 mt-4">
                        <button 
                            onClick={handleAdd}
                            className="w-12 h-12 rounded-full bg-accent text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-accent/20"
                        >
                            <ShoppingBag size={20} />
                        </button>
                        <button
                            onClick={handleWishlist}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg ${isFav ? 'bg-rose-600 text-white shadow-rose-600/30 border border-rose-500/20' : 'glass-card text-white hover:bg-white/10'}`}
                        >
                            <Heart size={20} fill={isFav ? "currentColor" : "none"} />
                        </button>
                        <div className="text-[10px] tracking-widest text-white/50 uppercase">
                            Add to Bag<br />
                            <span className="text-white text-base font-bold">{product.price}</span>
                        </div>
                    </div>
                </div>
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
        );
    }

    return (
        <div
            ref={cardRef}
            className="group cursor-pointer opacity-0"
        >
            <div 
                className="aspect-[3/4] glass-card rounded-sm overflow-hidden mb-4 relative"
                onClick={handleNavigate}
            >
                {/* Floating Heart Icon for Standard Cards */}
                <button
                    onClick={handleWishlist}
                    className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md ${isFav ? 'bg-rose-600/90 text-white shadow-rose-600/30 border border-rose-500/20' : 'bg-black/40 text-white/70 hover:text-white backdrop-blur-md border border-white/10'}`}
                >
                    <Heart size={14} fill={isFav ? "currentColor" : "none"} className={isFav ? "scale-110" : ""} />
                </button>

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 lg:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                    {/* Desktop Button */}
                    <button 
                        onClick={handleAdd}
                        className="hidden lg:flex bg-white text-black px-6 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest items-center space-x-2 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent"
                    >
                        <Plus size={14} /> <span>Quick Add</span>
                    </button>
                </div>

                {/* Mobile Button - Always Visible */}
                <button 
                    onClick={handleAdd}
                    className="lg:hidden absolute bottom-3 right-3 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg border border-white/10 z-10 active:scale-90 transition-transform"
                >
                    <Plus size={18} />
                </button>
            </div>
            <div onClick={handleNavigate}>
                <p className="text-[10px] font-bold tracking-[0.2em] mb-1">{product.name}</p>
                <p className="text-[9px] text-white/40 uppercase tracking-widest mb-2 h-8 leading-tight">
                    {product.description}
                </p>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-1">
                        {product.colors.map(color => (
                            <div key={color} className={`w-2 h-2 rounded-full border border-white/20 ${color === 'white' ? 'bg-white' : color === 'black' ? 'bg-black' : color === 'silver' ? 'bg-slate-300' : 'bg-accent'}`}></div>
                        ))}
                    </div>
                    <p className="text-[11px] font-bold">{product.price}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
