import { useState } from 'react';
import { CreditCard, Truck, ShieldCheck, ChevronRight } from 'lucide-react';

const Checkout = () => {
    return (
        <div className="pt-32 px-12 pb-24 min-h-screen max-w-7xl mx-auto">
            <div className="flex items-center space-x-4 mb-12">
                <span className="text-[10px] uppercase tracking-widest text-white">Information</span>
                <ChevronRight size={12} className="text-white/20" />
                <span className="text-[10px] uppercase tracking-widest text-white/40">Shipping</span>
                <ChevronRight size={12} className="text-white/20" />
                <span className="text-[10px] uppercase tracking-widest text-white/40">Payment</span>
            </div>

            <h1 className="text-5xl font-bold mb-12 uppercase tracking-tighter">Mission Order</h1>

            <div className="grid grid-cols-12 gap-16">
                {/* Left: Form */}
                <div className="col-span-12 lg:col-span-7 space-y-12">
                    <section>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 flex items-center">
                            <Truck size={14} className="mr-3" /> Delivery Destination
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">First Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent" />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Last Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Address</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent" />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">City</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent" />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Postal Code</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent" />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 flex items-center">
                            <CreditCard size={14} className="mr-3" /> Secure Payment
                        </h3>
                        <div className="glass-card p-6 border-accent/20">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-[9px] uppercase tracking-widest">Encrypted Credit Card Payment</span>
                                <ShieldCheck size={16} className="text-accent" />
                            </div>
                            <div className="space-y-4">
                                <input type="text" placeholder="CARD NUMBER" className="w-full bg-white/5 border border-white/10 p-3 text-xs font-mono focus:outline-none focus:border-accent" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="EXP (MM/YY)" className="w-full bg-white/5 border border-white/10 p-3 text-xs font-mono focus:outline-none focus:border-accent" />
                                    <input type="text" placeholder="CVC" className="w-full bg-white/5 border border-white/10 p-3 text-xs font-mono focus:outline-none focus:border-accent" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <button className="btn-primary w-full py-4 text-center block">
                        Complete Transfer
                    </button>
                </div>

                {/* Right: Cart Summary */}
                <div className="col-span-12 lg:col-span-5">
                    <div className="glass-card p-8 rounded-sm">
                        <h2 className="text-[10px] font-bold mb-8 uppercase tracking-widest">Order Review</h2>
                        <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
                            {[1, 2].map(i => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-16 h-20 bg-white/10 rounded-sm shrink-0"></div>
                                    <div className="flex-grow">
                                        <p className="text-[10px] font-bold uppercase">Aurora Silver Puffer</p>
                                        <p className="text-[8px] text-white/40 uppercase">Size: M | Qty: 1</p>
                                        <p className="text-[10px] font-mono mt-2">GH₵999.00</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-white/10">
                            <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50">
                                <span>Subtotal</span>
                                <span>GH₵2,198.99</span>
                            </div>
                            <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold uppercase pt-3 border-t border-white/10">
                                <span>Total Due</span>
                                <span>GH₵2,198.99</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
