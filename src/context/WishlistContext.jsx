import { createContext, useContext, useState, useEffect } from 'react';
import Toast from '../components/Toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) return prev;
            return [...prev, product];
        });

        // Add feedback toast
        const id = Date.now();
        setToasts(prev => [...prev, { id, message: `${product.name} Saved to Favorites` }]);
    };

    const removeFromWishlist = (productId) => {
        const product = wishlist.find(item => item.id === productId);
        setWishlist(prev => prev.filter(item => item.id !== productId));
        
        if (product) {
            // Add feedback toast
            const id = Date.now();
            setToasts(prev => [...prev, { id, message: `${product.name} Removed from Favorites` }]);
        }
    };

    const toggleWishlist = (product) => {
        const isFav = wishlist.some(item => item.id === product.id);
        if (isFav) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const wishlistCount = wishlist.length;

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, wishlistCount }}>
            {children}
            
            {/* Wishlist Toast Container (Shifted up to bottom-28 right-8 to prevent overlap with Cart toasts) */}
            <div className="fixed bottom-28 right-8 z-[100] flex flex-col items-end pointer-events-none">
                {toasts.map(toast => (
                    <Toast 
                        key={toast.id} 
                        message={toast.message} 
                        onClose={() => removeToast(toast.id)} 
                    />
                ))}
            </div>
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
