import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Shield, Truck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState('M');
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const allProducts = [
        {
            id: 1,
            name: 'NEON GHOST',
            subName: 'OVERSIZED REFLECTIVE HOODIE',
            price: 'GH₵189.00',
            description: 'Stand out in the dark. The Neon Ghost features an oversized fit constructed with fully reflective technical threads and a high-density water-resistant cotton blend.',
            details: [
                'Oversized drop-shoulder pattern',
                'Reflective safety weave detailing',
                'Reinforced double-layered hood',
                'Kangaroo pocket with hidden zip compartment'
            ],
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 2,
            name: 'APEX ONE',
            subName: 'TECHNICAL STREET RUNNERS',
            price: 'GH₵299.99',
            description: 'Engineered for the ultimate urban explorer. These trainers combine futuristic aesthetics with maximum cushioning, grip, and durability.',
            details: [
                'Responsive ultra-foam midsole',
                'Water-resistant ripstop knit upper',
                'Quick-lace speed toggle system',
                'High-traction rubber outsole tread'
            ],
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 3,
            name: 'CHRONOS V4',
            subName: 'STEALTH MATTE WATCH',
            price: 'GH₵450.00',
            description: 'A masterpiece of sleek timekeeping. The Chronos V4 features a matte black titanium case and custom tech straps for a tactical, lightweight look.',
            details: [
                'Scratch-resistant sapphire crystal lens',
                'Tactical matte black titanium alloy casing',
                'Waterproof depth rating up to 50M',
                'Luminous stealth hands and markers'
            ],
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 4,
            name: 'MIDNIGHT SHADE',
            subName: 'POLARIZED CYBER FRAME',
            price: 'GH₵120.00',
            description: 'Deflect glare with cybernetic poise. Designed with polarized lenses and a futuristic semi-rimless construction.',
            details: [
                'UV400 polarized optical protection',
                'Ultra-lightweight alloy framing',
                'Shatterproof polycarbonate lens',
                'Adjustable silicone nose grip pads'
            ],
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 5,
            name: 'VECTOR SOCKS',
            subName: 'COMPRESSION URBAN SOCKS',
            price: 'GH₵35.00',
            description: 'Step into structural comfort. Built with advanced compression technology to keep you moving comfortably throughout long street missions.',
            details: [
                'Targeted arch compression bands',
                'Moisture-wicking mesh ventilation zones',
                'Cushioned impact heel and toe boxes',
                'Anti-friction flat toe seams'
            ],
            image: 'https://images.unsplash.com/photo-1582966236302-5d95f4abb28d?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 6,
            name: 'CARGO X',
            subName: 'MODULAR TECH PANTS',
            price: 'GH₵220.00',
            description: 'The ultimate utility trousers. Featuring water-repellent nylon canvas, multi-pocket modular storage, and ankle adjustment toggles.',
            details: [
                'Abrasion-resistant heavy nylon fabric',
                'Detachable side utility pockets',
                'Articulated knee pleats for movement',
                'Elastic drawcords at cuffs'
            ],
            image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 7,
            name: 'ORBIT BEANIE',
            subName: 'THERMAL LOGO BEANIE',
            price: 'GH₵45.00',
            description: 'Lock in heat. A high-performance double-knit thermal watch cap detailed with our signature reflective micro-patch.',
            details: [
                'Double-layer thermal heat retention',
                'Soft itch-free acrylic blend knit',
                'Classic folded cuff silhouette',
                'Reflective brand micro-label'
            ],
            image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 8,
            name: 'TITAN BELT',
            subName: 'TACTICAL QUICK-RELEASE',
            price: 'GH₵85.00',
            description: 'Instant locking utility. The Titan features a heavy-duty quick-release buckle mounted onto a high-tensile nylon webbing strap.',
            details: [
                'Zinc-alloy quick-release buckle',
                'High-tensile heavy nylon canvas webbing',
                'Fully adjustable slide-to-lock sizing',
                'Low-profile matte black hardware'
            ],
            image: 'https://images.unsplash.com/photo-1624222247344-550fb8ec5054?auto=format&fit=crop&q=80&w=800'
        }
    ];

    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    const product = foundProduct || allProducts[0];
    const isFav = isInWishlist(product.id);

    return (
        <div className="pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen">
            <Link to="/shop" className="inline-flex items-center text-[10px] uppercase tracking-widest text-white/50 hover:text-white mb-12 transition-colors">
                <ArrowLeft size={12} className="mr-2" /> Back to catalog
            </Link>

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Gallery */}
                <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                    <div className="col-span-2 aspect-[4/5] glass-card overflow-hidden">
                        <img src={product.image} className="w-full h-full object-cover hover:scale-102 transition-transform duration-500" alt={product.name} />
                    </div>
                    <div className="aspect-square glass-card overflow-hidden">
                        <img src={product.image} className="w-full h-full object-cover grayscale brightness-50 hover:brightness-90 transition-all duration-500" alt="" />
                    </div>
                    <div className="aspect-square glass-card overflow-hidden">
                        <img src={product.image} className="w-full h-full object-cover sepia brightness-50 hover:brightness-90 transition-all duration-500" alt="" />
                    </div>
                </div>

                {/* Info */}
                <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                    <div className="mb-8">
                        <p className="text-[10px] tracking-[0.5em] text-accent uppercase mb-2">New Release</p>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 uppercase">{product.name}</h1>
                        <p className="text-xl text-white/60 mb-6 uppercase tracking-widest">{product.subName}</p>
                        <p className="text-3xl font-bold">{product.price}</p>
                    </div>

                    <div className="mb-12">
                        <p className="text-[10px] tracking-widest text-white/40 uppercase mb-4">Select Size</p>
                        <div className="flex flex-wrap gap-3">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 sm:w-14 sm:h-14 border flex items-center justify-center transition-all uppercase font-mono text-sm ${selectedSize === size ? 'border-white bg-white text-black' : 'border-white/20 text-white/50 hover:border-white'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 mb-12">
                        <button 
                            onClick={() => addToCart({ ...product, size: selectedSize })}
                            className="btn-primary w-full"
                        >
                            Add to Bag
                        </button>
                        <button 
                            onClick={() => toggleWishlist(product)}
                            className={`w-full py-3 border text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 ${
                                isFav 
                                    ? 'border-rose-500 bg-rose-950/20 text-rose-500 hover:bg-rose-950/30' 
                                    : 'border-white/20 text-white hover:bg-white/5 hover:border-white'
                            }`}
                        >
                            <span>{isFav ? 'WISHLISTED' : 'ADD TO WISHLIST'}</span>
                            <span className="text-xs">{isFav ? '♥' : '♡'}</span>
                        </button>
                    </div>

                    <div className="space-y-8 pt-12 border-t border-white/10">
                        <div>
                            <p className="text-[10px] tracking-widest text-white/40 uppercase mb-4">Technical Details</p>
                            <ul className="space-y-2">
                                {product.details.map((detail, i) => (
                                    <li key={i} className="text-[11px] text-white/60 uppercase tracking-wider flex items-center">
                                        <span className="w-1 h-1 bg-accent mr-3"></span> {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
                            <div className="text-center">
                                <Shield size={20} className="mx-auto mb-2 text-white/30" />
                                <p className="text-[8px] uppercase tracking-widest text-white/40">Lifetime<br />Guarantee</p>
                            </div>
                            <div className="text-center">
                                <Truck size={20} className="mx-auto mb-2 text-white/30" />
                                <p className="text-[8px] uppercase tracking-widest text-white/40">Carbon Neutral<br />Shipping</p>
                            </div>
                            <div className="text-center">
                                <RefreshCw size={20} className="mx-auto mb-2 text-white/30" />
                                <p className="text-[8px] uppercase tracking-widest text-white/40">30-Day Free<br />Returns</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
