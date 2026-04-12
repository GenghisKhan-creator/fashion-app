import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import MobileMenu from './MobileMenu';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const navItems = [
        { name: 'Shop', path: '/shop' },
        { name: 'Catalog', path: '/catalog' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[60] bg-transparent backdrop-blur-sm border-b border-white/10 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500">
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold tracking-tighter font-heading">
                        MAX<span className="text-accent">™</span>
                    </Link>
                </div>

                <div className="hidden lg:flex space-x-12">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/70 hover:text-white transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6">
                    <button className="text-white/70 hover:text-white transition-colors group hidden sm:block">
                        <Search size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <Link to="/cart" className="text-white/70 hover:text-white transition-colors relative group">
                        <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-white text-black text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/profile" className="text-white/70 hover:text-white transition-colors group hidden sm:block">
                        <User size={18} className="group-hover:scale-110 transition-transform" />
                    </Link>
                    
                    {/* Mobile Toggle */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-white hover:text-accent transition-colors relative z-[110] p-1"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Navbar;
