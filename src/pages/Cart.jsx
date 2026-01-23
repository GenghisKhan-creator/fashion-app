import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQty, cartTotal } = useCart();
    const shipping = cart.length > 0 ? 25.00 : 0;

    if (cart.length === 0) {
        return (
            <div className="pt-48 pb-24 text-center min-h-screen">
                <ShoppingBag size={64} className="mx-auto text-white/10 mb-8" />
                <h1 className="text-4xl font-bold uppercase mb-4">Inventory Empty</h1>
                <p className="text-white/40 uppercase tracking-widest mb-12">No gear deployed to cart yet.</p>
                <Link to="/shop" className="btn-primary">Return to base</Link>
            </div>
        );
    }

    return (
        <div className="pt-32 px-12 pb-24 min-h-screen max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold mb-12 uppercase tracking-tighter">
                Shopping Bag <span className="text-white/20 ml-4">({cart.length})</span>
            </h1>

            <div className="grid grid-cols-12 gap-16">
                {/* Left: Items */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    {cart.map(item => (
                        <div key={item.id} className="flex gap-8 pb-8 border-b border-white/5">
                            <div className="w-40 aspect-[3/4] glass-card overflow-hidden shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow flex flex-col justify-between py-2">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold uppercase">{item.name}</h3>
                                        <p className="font-bold">{item.price}</p>
                                    </div>
                                    <div className="flex space-x-4 mt-2">
                                        {item.size && <p className="text-[10px] text-white/40 uppercase tracking-widest">Size: {item.size}</p>}
                                        {item.color && <p className="text-[10px] text-white/40 uppercase tracking-widest">Type: {item.color}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="flex items-center border border-white/10 rounded-sm">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="p-2 hover:bg-white/5 transition-colors"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="px-4 text-xs font-mono">{item.qty}</span>
                                        <button
                                            onClick={() => updateQty(item.id, 1)}
                                            className="p-2 hover:bg-white/5 transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-white/40 hover:text-white transition-colors flex items-center text-[10px] uppercase tracking-widest"
                                    >
                                        <Trash2 size={14} className="mr-2" /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Summary */}
                <div className="col-span-12 lg:col-span-4 self-start">
                    <div className="glass-card p-8 rounded-sm sticky top-32">
                        <h2 className="text-lg font-bold mb-8 uppercase tracking-widest border-b border-white/10 pb-4">Order Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/60">
                                <span>Subtotal</span>
                                <span>GH₵{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/60">
                                <span>Shipping</span>
                                <span>GH₵{shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/60">
                                <span>Tax</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-xl font-bold uppercase pt-6 border-t border-white/10 mb-8">
                            <span>Total</span>
                            <span>GH₵{(cartTotal + shipping).toFixed(2)}</span>
                        </div>

                        <Link to="/checkout" className="btn-primary w-full text-center block">
                            Checkout Now
                        </Link>

                        <div className="mt-8 space-y-4">
                            <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] text-center leading-relaxed">
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

