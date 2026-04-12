import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { User, Package, Settings, LogOut, ChevronRight, Activity, ShieldCheck } from 'lucide-react';

const Profile = () => {
    const user = {
        name: 'MAX USER 04',
        email: 'hello@maxcollection.tech',
        rank: 'STREET LEGEND',
        joined: 'Sept 2025',
        bio: 'Tech wear collector and urban explorer based in Accra.'
    };

    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".profile-sidebar", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(".profile-content", {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="pt-24 md:pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen bg-black">
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
                {/* Sidebar */}
                <aside className="profile-sidebar col-span-12 lg:col-span-3 space-y-6 md:space-y-8">
                    <div className="glass-card p-6 md:p-8 border-accent/20 text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                            <User size={32} className="text-accent" />
                        </div>
                        <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-1">{user.name}</h2>
                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-6">{user.rank}</p>
                        <div className="flex justify-center space-x-2">
                            <div className="px-3 py-1 bg-white/5 rounded-full text-[7px] uppercase tracking-widest font-bold">VIP</div>
                            <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[7px] uppercase tracking-widest font-bold">Verified</div>
                        </div>
                    </div>

                    <nav className="flex flex-col space-y-1 md:space-y-2">
                        {[
                            { icon: Activity, label: 'The Hub', active: true },
                            { icon: Package, label: 'Past Drops' },
                            { icon: Settings, label: 'Account Info' },
                            { icon: LogOut, label: 'Sign Out', danger: true }
                        ].map((item, i) => (
                            <button 
                                key={i}
                                className={`flex items-center justify-between p-4 rounded-sm transition-all text-[9px] uppercase tracking-widest font-bold ${item.active ? 'bg-white text-black' : 'text-white/40 hover:bg-white/5 hover:text-white'} ${item.danger ? 'hover:text-red-500' : ''}`}
                            >
                                <span className="flex items-center">
                                    <item.icon size={14} className="mr-3" /> {item.label}
                                </span>
                                <ChevronRight size={12} className={item.active ? 'opacity-100' : 'opacity-0'} />
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content */}
                <main className="profile-content col-span-12 lg:col-span-9 space-y-8 md:space-y-12">
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        {[
                            { label: 'Total Copped', value: '14' },
                            { label: 'Street Cred', value: '8,420' },
                            { label: 'Member Since', value: '2025.09.12' }
                        ].map((stat, i) => (
                            <div key={i} className="glass-card p-6 md:p-8 border-white/5 group hover:border-accent/30 transition-colors text-center sm:text-left">
                                <p className="text-[8px] uppercase tracking-widest text-white/40 mb-3 md:mb-4">{stat.label}</p>
                                <p className="text-2xl md:text-3xl font-bold font-mono tracking-tighter">{stat.value}</p>
                            </div>
                        ))}
                    </section>

                    <section className="glass-card p-6 md:p-8 border-white/5">
                        <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-white/5 pb-4">
                            <h2 className="text-[9px] uppercase tracking-[0.3em] font-bold">Recent Drops</h2>
                            <button className="text-[8px] uppercase tracking-widest text-accent hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { id: '#MAX-9921', status: 'In Transit', items: '2 Pieces', price: 'GH₵1,280.00' },
                                { id: '#MAX-8854', status: 'Delivered', items: '1 Piece', price: 'GH₵450.00' }
                            ].map((order, i) => (
                                <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 md:p-6 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all gap-4">
                                    <div className="w-full sm:w-auto">
                                        <p className="text-[10px] font-bold uppercase tracking-tight mb-1">{order.id}</p>
                                        <p className="text-[8px] text-white/40 uppercase tracking-widest">{order.items} — Copped 2d ago</p>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-12">
                                        <div className="text-left sm:text-right">
                                            <p className="text-[9px] font-mono text-accent">{order.price}</p>
                                            <p className="text-[7px] uppercase tracking-widest text-white/40">Secured Settlement</p>
                                        </div>
                                        <div className="px-3 py-1 border border-accent/20 rounded-full text-[7px] uppercase tracking-widest font-bold text-accent whitespace-nowrap">
                                            {order.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="glass-card p-8 md:p-10 border-white/5 space-y-6">
                            <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight">Profile Info</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Street Name</label>
                                    <input type="text" defaultValue={user.name} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-all" />
                                </div>
                                <div>
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Digital ID</label>
                                    <input type="email" defaultValue={user.email} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-all" />
                                </div>
                            </div>
                            <button className="btn-primary w-full sm:w-auto py-3 px-8 text-[9px]">Save Changes</button>
                        </div>
                        <div className="glass-card p-8 md:p-10 border-white/5 flex flex-col justify-center items-center text-center space-y-6">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent/5 flex items-center justify-center border border-accent/10">
                                <ShieldCheck size={24} className="text-accent" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight">Stay Locked In</h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                                Your gear and info are synced. Stay locked in for early access to the next big drops.
                            </p>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                <span className="ml-3 text-[8px] uppercase tracking-widest text-white/60">Cloud Sync</span>
                            </label>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Profile;
