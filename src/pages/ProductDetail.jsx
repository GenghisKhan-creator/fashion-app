import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Shield, Truck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState('M');
    const { addToCart } = useCart();

    // Dummy data
    const product = {
        id: 1,
        name: 'AURORA SILVER',
        subName: 'REFLECTIVE PUFFER JACKET',
        price: '$999.00',
        description: 'Designed for the highest peaks and coldest conditions. The Aurora Silver Puffer features our proprietary reflective membrane for high visibility and heat retention.',
        details: [
            'Water-repellent technical exterior',
            'High-density synthetic down fill',
            'Adjustable storm hood with toggle system',
            'Micro-fleece lined utility pockets'
        ],
        image: '/puffer-white.png'
    };

    return (
        <div className="pt-32 px-12 pb-24 min-h-screen">
            <Link to="/shop" className="inline-flex items-center text-[10px] uppercase tracking-widest text-white/50 hover:text-white mb-12 transition-colors">
                <ArrowLeft size={12} className="mr-2" /> Back to catalog
            </Link>

            <div className="grid grid-cols-12 gap-16">
                {/* Gallery */}
                <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-4">
                    <div className="col-span-2 aspect-[4/5] glass-card overflow-hidden">
                        <img src={product.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="aspect-square glass-card overflow-hidden">
                        <img src="/puffer-blue.png" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="aspect-square glass-card overflow-hidden">
                        <img src="/puffer-black.png" className="w-full h-full object-cover" alt="" />
                    </div>
                </div>

                {/* Info */}
                <div className="col-span-12 lg:col-span-5 sticky top-32 h-fit">
                    <div className="mb-8">
                        <p className="text-[10px] tracking-[0.5em] text-accent uppercase mb-2">New Release</p>
                        <h1 className="text-6xl font-bold mb-2 uppercase">{product.name}</h1>
                        <p className="text-xl text-white/60 mb-6 uppercase tracking-widest">{product.subName}</p>
                        <p className="text-3xl font-bold">{product.price}</p>
                    </div>

                    <div className="mb-12">
                        <p className="text-[10px] tracking-widest text-white/40 uppercase mb-4">Select Size</p>
                        <div className="flex space-x-4">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-14 h-14 border flex items-center justify-center transition-all uppercase font-mono text-sm ${selectedSize === size ? 'border-white bg-white text-black' : 'border-white/20 text-white/50 hover:border-white'}`}
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
                        <button className="w-full py-3 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                            Wishlist
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

                        <div className="grid grid-cols-3 gap-4 pt-4">
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
