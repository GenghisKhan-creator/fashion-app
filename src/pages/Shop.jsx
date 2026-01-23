import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Categories');

    const allProducts = [
        { id: 1, category: 'Outerwear', name: 'NEON GHOST', description: 'OVERSIZED REFLECTIVE HOODIE', price: 'GH₵189.00', colors: ['black'], image: '/images/product-hoodie.png' },
        { id: 2, category: 'Footwear', name: 'APEX ONE', description: 'TECHNICAL STREET RUNNERS', price: 'GH₵299.99', colors: ['white'], image: '/images/product-shoes.png' },
        { id: 3, category: 'Watches', name: 'CHRONOS V4', description: 'STEALTH MATTE WATCH', price: 'GH₵450.00', colors: ['black'], image: '/images/product-watch.png' },
        { id: 4, category: 'Accessories', name: 'MIDNIGHT SHADE', description: 'POLARIZED CYBER FRAME', price: 'GH₵120.00', colors: ['black'], image: '/images/product-shades.png' },
        { id: 5, category: 'Accessories', name: 'VECTOR SOCKS', description: 'COMPRESSION URBAN SOCKS', price: 'GH₵35.00', colors: ['white', 'black'], image: '/images/product-socks.png' },
        { id: 6, category: 'Outerwear', name: 'CARGO X', description: 'MODULAR TECH PANTS', price: 'GH₵220.00', colors: ['olive'], image: '/images/product-pants.png' },
        { id: 7, category: 'Accessories', name: 'ORBIT BEANIE', description: 'THERMAL LOGO BEANIE', price: 'GH₵45.00', colors: ['navy'], image: '/images/product-socks.png' },
        { id: 8, category: 'Accessories', name: 'TITAN BELT', description: 'TACTICAL QUICK-RELEASE', price: 'GH₵85.00', colors: ['black'], image: '/images/product-watch.png' },
    ];

    const filteredProducts = selectedCategory === 'All Categories'
        ? allProducts
        : allProducts.filter(p => p.category === selectedCategory);

    return (
        <div className="pt-32 px-12 pb-24 min-h-screen">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-16 border-b border-white/10 pb-8 space-y-6 lg:space-y-0">
                <div>
                    <h1 className="text-5xl font-bold tracking-tighter uppercase">Catalog</h1>
                    <p className="text-[10px] tracking-widest text-white/40 mt-2">Showing all {filteredProducts.length} items</p>
                </div>
                <div className="flex space-x-4">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-transparent border border-white/20 px-4 py-2 text-[10px] uppercase tracking-widest focus:outline-none focus:border-accent transition-colors"
                    >
                        <option className="bg-bg-dark">All Categories</option>
                        <option className="bg-bg-dark">Outerwear</option>
                        <option className="bg-bg-dark">Footwear</option>
                        <option className="bg-bg-dark">Watches</option>
                        <option className="bg-bg-dark">Accessories</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Shop;
