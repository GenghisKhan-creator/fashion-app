import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product, large = false }) => {
    const cardRef = useRef(null);
    const { addToCart } = useCart();

    const handleAdd = (e) => {
        e.stopPropagation();
        addToCart(product);
        gsap.to(cardRef.current, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });
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
                onClick={handleAdd}
                className="relative group cursor-pointer overflow-hidden rounded-sm glass-card h-[500px] opacity-0"
            >
                <div className="absolute top-8 left-8 z-10">
                    <h3 className="text-4xl font-bold">{product.name}<sup className="text-sm">™</sup></h3>
                    <div className="flex items-center space-x-4 mt-4">
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[8px]">
                            +
                        </div>
                        <div className="text-[10px] tracking-widest text-white/50 uppercase">
                            Add to cart<br />
                            <span className="text-white text-base font-bold">{product.price}</span>
                        </div>
                    </div>
                </div>
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
        );
    }

    return (
        <div
            ref={cardRef}
            className="group cursor-pointer opacity-0"
            onClick={handleAdd}
        >
            <div className="aspect-[3/4] glass-card rounded-sm overflow-hidden mb-4 relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div>
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
