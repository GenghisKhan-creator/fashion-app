import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartCount } = useCart();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm border-b border-white/10 px-8 py-6 flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold tracking-tighter font-heading">
                    FRN<span className="text-accent">™</span>
                </Link>
            </div>

            <div className="hidden md:flex space-x-12">
                {['Catalog', 'Players', 'Boots', 'Partners'].map((item) => (
                    <Link
                        key={item}
                        to="/shop"
                        className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/70 hover:text-white transition-colors"
                    >
                        {item}
                    </Link>
                ))}
            </div>

            <div className="flex items-center space-x-6">
                <button className="text-white/70 hover:text-white transition-colors group">
                    <Search size={20} className="group-hover:scale-110 transition-transform" />
                </button>
                <Link to="/cart" className="text-white/70 hover:text-white transition-colors relative group">
                    <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-white text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                            {cartCount}
                        </span>
                    )}
                </Link>
                <Link to="/login" className="text-white/70 hover:text-white transition-colors group">
                    <User size={20} className="group-hover:scale-110 transition-transform" />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
