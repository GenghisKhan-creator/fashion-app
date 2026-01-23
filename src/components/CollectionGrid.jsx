import { useState } from 'react';
import ProductCard from './ProductCard';

const CollectionGrid = () => {
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const products = [
        { id: 1, category: 'OUTERWEAR', name: 'NEON GHOST', description: 'OVERSIZED REFLECTIVE HOODIE', price: 'GH₵189.00', colors: ['black'], image: '/images/product-hoodie.png' },
        { id: 2, category: 'FOOTWEAR', name: 'APEX ONE', description: 'TECHNICAL STREET RUNNERS', price: 'GH₵299.99', colors: ['white'], image: '/images/product-shoes.png' },
        { id: 3, category: 'WATCHES', name: 'CHRONOS V4', description: 'STEALTH MATTE WATCH', price: 'GH₵450.00', colors: ['black'], image: '/images/product-watch.png' },
        { id: 4, category: 'ACCESSORIES', name: 'MIDNIGHT SHADE', description: 'POLARIZED CYBER FRAME', price: 'GH₵120.00', colors: ['black'], image: '/images/product-shades.png' },
        { id: 5, category: 'ACCESSORIES', name: 'VECTOR SOCKS', description: 'COMPRESSION URBAN SOCKS', price: 'GH₵35.00', colors: ['white', 'black'], image: '/images/product-socks.png' },
        { id: 6, category: 'OUTERWEAR', name: 'CARGO X', description: 'MODULAR TECH PANTS', price: 'GH₵220.00', colors: ['olive'], image: '/images/product-pants.png' },
        { id: 7, category: 'ACCESSORIES', name: 'ORBIT BEANIE', description: 'THERMAL LOGO BEANIE', price: 'GH₵45.00', colors: ['navy'], image: '/images/product-socks.png' }, // Reusing socks for beanie for now or just using another one
        { id: 8, category: 'ACCESSORIES', name: 'TITAN BELT', description: 'TACTICAL QUICK-RELEASE', price: 'GH₵85.00', colors: ['black'], image: '/images/product-watch.png' }, // Reusing watch for belt
    ];

    const categories = ['ALL', 'OUTERWEAR', 'FOOTWEAR', 'WATCHES', 'ACCESSORIES'];

    const filteredProducts = selectedCategory === 'ALL'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <section className="px-12 py-24 bg-primary/10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 space-y-8 lg:space-y-0">
                <div>
                    <h2 className="text-4xl font-bold tracking-tighter uppercase mb-4">New Collection</h2>
                    <div className="flex flex-wrap gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-[9px] tracking-[0.3em] uppercase py-1 px-2 border transition-all ${selectedCategory === cat ? 'bg-white text-black border-white' : 'text-white/40 border-white/10 hover:border-white/30'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="text-left lg:text-right">
                    <p className="text-[9px] tracking-widest text-white/40 uppercase mb-4 max-w-[250px] leading-relaxed">
                        STREETWEAR EVOLUTION SERIES // TECH AND URBAN GEAR FOR THE 2026 ARCHIVE
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default CollectionGrid;

