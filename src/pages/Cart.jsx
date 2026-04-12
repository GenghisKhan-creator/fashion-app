import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQty, cartTotal } = useCart();
    const shipping = cart.length > 0 ? 25.00 : 0;

    if (cart.length === 0) {
        return (
            <div className="pt-32 md:pt-48 pb-24 text-center min-h-screen px-4">
                <ShoppingBag size={48} className="sm:w-16 sm:h-16 mx-auto text-white/10 mb-8" />
                <h1 className="text-2xl sm:text-4xl font-bold uppercase mb-4">Inventory Empty</h1>
                <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest mb-12">No gear deployed to cart yet.</p>
                <Link to="/shop" className="btn-primary">Return to base</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 md:pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 uppercase tracking-tighter">
                Shopping Bag <span className="text-white/20 ml-2 md:ml-4">({cart.length})</span>
            </h1>

            <div className="grid grid-cols-12 gap-8 lg:gap-16">
                {/* Left: Items */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    {cart.map(item => (
                        <div key={item.id} className="flex gap-4 sm:gap-8 pb-8 border-b border-white/5">
                            <div className="w-24 sm:w-40 aspect-[3/4] glass-card overflow-hidden shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow flex flex-col justify-between py-1 sm:py-2">
                                <div>
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                        <h3 className="text-lg sm:text-xl font-bold uppercase leading-tight">{item.name}</h3>
                                        <p className="font-bold whitespace-nowrap">{item.price}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                                        {item.size && <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest whitespace-nowrap">Size: {item.size}</p>}
                                        {item.color && <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest whitespace-nowrap">Type: {item.color}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mt-4 sm:mt-0">
                                    <div className="flex items-center border border-white/10 rounded-sm bg-white/5">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="p-1.5 sm:p-2 hover:bg-white/10 transition-colors"
                                        >
                                            <Minus size={12} className="sm:w-3.5 sm:h-3.5" />
                                        </button>
                                        <span className="px-3 sm:px-4 text-[10px] sm:text-xs font-mono">{item.qty}</span>
                                        <button
                                            onClick={() => updateQty(item.id, 1)}
                                            className="p-1.5 sm:p-2 hover:bg-white/10 transition-colors"
                                        >
                                            <Plus size={12} className="sm:w-3.5 sm:h-3.5" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-white/40 hover:text-white transition-colors flex items-center text-[9px] sm:text-[10px] uppercase tracking-widest"
                                    >
                                        <Trash2 size={12} className="mr-1.5 sm:mr-2 sm:w-3.5 sm:h-3.5" /> <span>Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Summary */}
                <div className="col-span-12 lg:col-span-4 self-start">
                    <div className="glass-card p-6 sm:p-8 rounded-sm lg:sticky lg:top-32">
                        <h2 className="text-base sm:text-lg font-bold mb-6 sm:mb-8 uppercase tracking-widest border-b border-white/10 pb-4">Order Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-[10px] sm:text-[11px] uppercase tracking-widest text-white/60">
                                <span>Subtotal</span>
                                <span>GH₵{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[10px] sm:text-[11px] uppercase tracking-widest text-white/60">
                                <span>Shipping</span>
                                <span>GH₵{shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[10px] sm:text-[11px] uppercase tracking-widest text-white/60">
                                <span>Tax</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-lg sm:text-xl font-bold uppercase pt-6 border-t border-white/10 mb-8">
                            <span>Total</span>
                            <span>GH₵{(cartTotal + shipping).toFixed(2)}</span>
                        </div>

                        <Link to="/checkout" className="btn-primary w-full text-center block text-sm sm:text-base py-4 sm:py-3">
                            Checkout Now
                        </Link>

                        <div className="mt-8 space-y-4">
                            <p className="text-[8px] sm:text-[9px] text-white/30 uppercase tracking-[0.2em] text-center leading-relaxed">
                                Complimentary carbon-neutral shipping available on all orders over $500.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

