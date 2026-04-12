import { useState } from 'react';
import { CreditCard, Truck, ShieldCheck, ChevronRight, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
    const { cart, cartTotal } = useCart();
    const navigate = useNavigate();
    const shipping = 0;
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [momoNetwork, setMomoNetwork] = useState('mtn');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAuthorize = () => {
        setIsProcessing(true);
        // Simulate Paystack processing
        setTimeout(() => {
            navigate('/checkout-success');
        }, 2000);
    };

    return (
        <div className="pt-24 md:pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-8 md:mb-12">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white">Information</span>
                <ChevronRight size={10} className="text-white/20" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40">Shipping</span>
                <ChevronRight size={10} className="text-white/20" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40">Payment</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 uppercase tracking-tighter">Checkout</h1>

            <div className="grid grid-cols-12 gap-8 lg:gap-16">
                {/* Left: Form */}
                <div className="col-span-12 lg:col-span-7 space-y-10 md:space-y-12 order-2 lg:order-1">
                    <section>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 md:mb-8 flex items-center">
                            <Truck size={14} className="mr-3 text-accent" /> Delivery Address
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <div className="sm:col-span-1">
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">First Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-colors" />
                            </div>
                            <div className="sm:col-span-1">
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Last Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-colors" />
                            </div>
                            <div className="col-span-1 sm:col-span-2">
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Address</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-colors" />
                            </div>
                            <div className="sm:col-span-1">
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">City</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-colors" />
                            </div>
                            <div className="sm:col-span-1">
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Postal Code</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-colors" />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 md:mb-8 flex items-center">
                            <CreditCard size={14} className="mr-3 text-accent" /> Secure Payment
                        </h3>
                        
                        <div className="glass-card overflow-hidden">
                            {/* Payment Method Selector */}
                            <div className="flex border-b border-white/5">
                                <button 
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex-1 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${paymentMethod === 'card' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
                                >
                                    Debit / Credit Card
                                </button>
                                <button 
                                    onClick={() => setPaymentMethod('momo')}
                                    className={`flex-1 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${paymentMethod === 'momo' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
                                >
                                    Mobile Money (GH)
                                </button>
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                                        <span className="text-[9px] uppercase tracking-widest text-white/60">Powered by Paystack</span>
                                    </div>
                                    <ShieldCheck size={16} className="text-accent" />
                                </div>

                                {paymentMethod === 'card' ? (
                                    <div className="space-y-4 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
                                        <div className="relative">
                                            <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2 ml-1">Card Number</label>
                                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 p-4 text-xs font-mono focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2 ml-1">Expiry</label>
                                                <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 p-4 text-xs font-mono focus:outline-none focus:border-accent transition-colors" />
                                            </div>
                                            <div>
                                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2 ml-1">CVC</label>
                                                <input type="text" placeholder="***" className="w-full bg-white/5 border border-white/10 p-4 text-xs font-mono focus:outline-none focus:border-accent transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { id: 'mtn', name: 'MTN', color: 'bg-yellow-400' },
                                                { id: 'telecel', name: 'Telecel', color: 'bg-red-600' },
                                                { id: 'at', name: 'AT', color: 'bg-blue-600' }
                                            ].map(net => (
                                                <button 
                                                    key={net.id}
                                                    onClick={() => setMomoNetwork(net.id)}
                                                    className={`p-3 border transition-all rounded-sm flex flex-col items-center justify-center space-y-2 ${momoNetwork === net.id ? 'border-accent bg-accent/5' : 'border-white/5 hove border-white/20'}`}
                                                >
                                                    <div className={`w-8 h-8 rounded-full ${net.color} flex items-center justify-center text-[10px] font-bold text-black`}>
                                                        {net.name[0]}
                                                    </div>
                                                    <span className="text-[8px] uppercase tracking-widest font-bold">{net.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <div>
                                            <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2 ml-1">Phone Number</label>
                                            <div className="flex">
                                                <span className="bg-white/10 border-y border-l border-white/10 p-4 text-xs font-mono text-white/60">+233</span>
                                                <input type="text" placeholder="2X XXX XXXX" className="flex-1 bg-white/5 border border-white/10 p-4 text-xs font-mono focus:outline-none focus:border-accent transition-colors" />
                                            </div>
                                            <p className="mt-4 text-[9px] text-white/30 leading-relaxed font-light italic">
                                                * Check your phone for a payment prompt after clicking complete.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <button className="btn-primary w-full py-5 text-center block text-sm sm:text-base border-0 focus:ring-2 focus:ring-accent/50 outline-none">
                        Authorize GH₵{(cartTotal + shipping).toFixed(2)}
                    </button>
                    
                    <p className="text-center text-[8px] uppercase tracking-widest text-white/20 pb-8">
                        Securely processed by Paystack. Your financial data is never stored on our servers.
                    </p>
                </div>

                {/* Right: Cart Summary */}
                <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
                    <div className="lg:sticky lg:top-32 space-y-8">
                        <div className="glass-card p-6 sm:p-8 rounded-sm">
                            <h2 className="text-[10px] font-bold mb-8 uppercase tracking-widest border-b border-white/5 pb-4">Order Review</h2>
                            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                        <div className="w-16 h-20 glass-card rounded-sm overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-center">
                                            <p className="text-[10px] font-bold uppercase leading-tight mb-1">{item.name}</p>
                                            <p className="text-[8px] text-white/40 uppercase tracking-widest mb-2">
                                                Size: {item.size || 'N/A'} | Qty: {item.qty}
                                            </p>
                                            <p className="text-[10px] font-mono text-accent">{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/10">
                                <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50">
                                    <span>Subtotal</span>
                                    <span>GH₵{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50">
                                    <span>Shipping</span>
                                    <span className="text-accent">Complimentary</span>
                                </div>
                                <div className="flex justify-between text-lg sm:text-xl font-bold uppercase pt-4 border-t border-white/10">
                                    <span>Total Due</span>
                                    <span>GH₵{(cartTotal + shipping).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-center space-x-6 opacity-30 grayscale hidden sm:flex">
                            <div className="w-12 h-6 bg-white/20 rounded-xs"></div>
                            <div className="w-12 h-6 bg-white/20 rounded-xs"></div>
                            <div className="w-12 h-6 bg-white/20 rounded-xs"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
