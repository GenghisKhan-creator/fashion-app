import { useState } from 'react';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Categories');

    const allProducts = [
        { id: 1, category: 'Outerwear', name: 'NEON GHOST', description: 'OVERSIZED REFLECTIVE HOODIE', price: 'GH₵189.00', colors: ['black'], image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
        { id: 2, category: 'Footwear', name: 'APEX ONE', description: 'TECHNICAL STREET RUNNERS', price: 'GH₵299.99', colors: ['white'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
        { id: 3, category: 'Watches', name: 'CHRONOS V4', description: 'STEALTH MATTE WATCH', price: 'GH₵450.00', colors: ['black'], image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' },
        { id: 4, category: 'Accessories', name: 'MIDNIGHT SHADE', description: 'POLARIZED CYBER FRAME', price: 'GH₵120.00', colors: ['black'], image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800' },
        { id: 5, category: 'Accessories', name: 'VECTOR SOCKS', description: 'COMPRESSION URBAN SOCKS', price: 'GH₵35.00', colors: ['white', 'black'], image: 'https://images.unsplash.com/photo-1582966236302-5d95f4abb28d?auto=format&fit=crop&q=80&w=800' },
        { id: 6, category: 'Outerwear', name: 'CARGO X', description: 'MODULAR TECH PANTS', price: 'GH₵220.00', colors: ['olive'], image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800' },
        { id: 7, category: 'Accessories', name: 'ORBIT BEANIE', description: 'THERMAL LOGO BEANIE', price: 'GH₵45.00', colors: ['navy'], image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800' },
        { id: 8, category: 'Accessories', name: 'TITAN BELT', description: 'TACTICAL QUICK-RELEASE', price: 'GH₵85.00', colors: ['black'], image: 'https://images.unsplash.com/photo-1624222247344-550fb8ec5054?auto=format&fit=crop&q=80&w=800' },
    ];

    const filteredProducts = selectedCategory === 'All Categories'
        ? allProducts
        : allProducts.filter(p => p.category === selectedCategory);

    return (
        <div className="pt-24 md:pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen bg-black">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-12 md:mb-16 border-b border-white/10 pb-8 space-y-6 lg:space-y-0">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter uppercase">Catalog</h1>
                    <p className="text-[9px] sm:text-[10px] tracking-widest text-white/40 mt-2">Showing all {filteredProducts.length} items</p>
                </div>
                <div className="flex space-x-4">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-black/80 border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest focus:outline-none focus:border-accent transition-colors w-full sm:w-auto"
                    >
                        <option>All Categories</option>
                        <option>Outerwear</option>
                        <option>Footwear</option>
                        <option>Watches</option>
                        <option>Accessories</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Catalog;
