import { createContext, useContext, useState, useEffect } from 'react';
import Toast from '../components/Toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });

        // Add feedback toast
        const id = Date.now();
        setToasts(prev => [...prev, { id, message: `${product.name} Added to Bag` }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQty = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = Math.max(1, item.qty + delta);
                return { ...item, qty: newQty };
            }
            return item;
        }));
    };

    const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
    const cartTotal = cart.reduce((acc, item) => {
        const price = typeof item.price === 'string' 
            ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) 
            : item.price;
        return acc + (price * item.qty);
    }, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, cartCount, cartTotal }}>
            {children}
            
            {/* Toast Container */}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end pointer-events-none">
                {toasts.map(toast => (
                    <Toast 
                        key={toast.id} 
                        message={toast.message} 
                        onClose={() => removeToast(toast.id)} 
                    />
                ))}
            </div>
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
