import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { User, Package, Settings, LogOut, ChevronRight, Activity, ShieldCheck, MapPin, Truck, Calendar, Key, Check, Heart } from 'lucide-react';
import Toast from '../components/Toast';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Profile = () => {
    const { wishlist } = useWishlist();
    
    // User profile state
    const [user, setUser] = useState({
        name: 'MAX USER 04',
        email: 'hello@maxcollection.tech',
        rank: 'STREET LEGEND',
        joined: 'Sept 2025',
        bio: 'Tech wear collector and urban explorer based in Accra.',
        address: 'Sector 7, Block B9, Innovation District, Accra',
        phone: '+233 24 123 4567',
        style: 'Techwear'
    });

    const [activeTab, setActiveTab] = useState('hub');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [syncEnabled, setSyncEnabled] = useState(true);
    const [toast, setToast] = useState(null);
    const [selectedTrackOrder, setSelectedTrackOrder] = useState(null);

    // Edit form state
    const [editName, setEditName] = useState(user.name);
    const [editEmail, setEditEmail] = useState(user.email);
    const [editBio, setEditBio] = useState(user.bio);
    const [editPhone, setEditPhone] = useState(user.phone);
    const [editAddress, setEditAddress] = useState(user.address);
    const [editStyle, setEditStyle] = useState(user.style);

    // Password form state
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');

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
    }, [activeTab]);

    const handleSaveChanges = (e) => {
        e.preventDefault();
        setUser({
            ...user,
            name: editName,
            email: editEmail,
            bio: editBio,
            phone: editPhone,
            address: editAddress,
            style: editStyle
        });
        showToast('PROFILE SECURELY SYNCED');
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        if (!currentPass || !newPass) {
            showToast('ENTER VALID PASSWORDS');
            return;
        }
        setCurrentPass('');
        setNewPass('');
        showToast('DIGITAL KEYS UPDATED');
    };

    const handleSyncToggle = () => {
        const nextState = !syncEnabled;
        setSyncEnabled(nextState);
        showToast(nextState ? 'CLOUD SYNC INITIALIZED' : 'CLOUD SYNC SEVERED');
    };

    const showToast = (msg) => {
        setToast(msg);
    };

    const allDrops = [
        { id: '#MAX-9921', item: 'Aurora Silver Puffer', status: 'In Transit', items: '2 Pieces', price: 'GH₵1,280.00', date: '2026.05.31', courier: 'Accra Street Express', step: 2 },
        { id: '#MAX-8854', item: 'Stealth Black watch', status: 'Delivered', items: '1 Piece', price: 'GH₵450.00', date: '2026.05.15', courier: 'Max Drone Service #09', step: 4 },
        { id: '#MAX-7742', item: 'Technical Runners V1', status: 'Delivered', items: '1 Piece', price: 'GH₵299.99', date: '2026.04.02', courier: 'Accra Courier Protocol', step: 4 },
        { id: '#MAX-6512', item: 'Midnight polarized shade', status: 'Delivered', items: '2 Pieces', price: 'GH₵240.00', date: '2026.03.11', courier: 'Direct Dispatch', step: 4 },
    ];

    return (
        <div ref={containerRef} className="pt-24 md:pt-32 px-4 sm:px-8 md:px-12 pb-24 min-h-screen bg-black overflow-x-hidden">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Sidebar */}
                <aside className="profile-sidebar lg:col-span-3 space-y-6">
                    <div className="glass-card p-6 border-accent/20 text-center relative overflow-hidden bg-white/[0.01]">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4 relative z-10">
                            <User size={32} className="text-accent" />
                        </div>
                        <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-1">{user.name}</h2>
                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-6">{user.rank}</p>
                        <div className="flex justify-center space-x-2 relative z-10">
                            <div className="px-3 py-1 bg-white/5 rounded-full text-[7px] uppercase tracking-widest font-bold">VIP</div>
                            <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[7px] uppercase tracking-widest font-bold">Verified</div>
                        </div>
                    </div>

                    <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2 border-b lg:border-b-0 border-white/5 scrollbar-none">
                        {[
                            { id: 'hub', icon: Activity, label: 'The Hub' },
                            { id: 'wishlist', icon: Heart, label: 'My Favorites' },
                            { id: 'drops', icon: Package, label: 'Past Drops' },
                            { id: 'info', icon: Settings, label: 'Account Info' },
                            { id: 'signout', icon: LogOut, label: 'Sign Out', danger: true }
                        ].map((item) => (
                            <button 
                                key={item.id}
                                onClick={() => {
                                    if (item.id === 'signout') {
                                        setShowLogoutModal(true);
                                    } else {
                                        setActiveTab(item.id);
                                    }
                                }}
                                className={`flex items-center justify-between p-3 sm:p-4 rounded-sm transition-all text-[9px] uppercase tracking-widest font-bold shrink-0 md:shrink lg:shrink-0 ${activeTab === item.id && item.id !== 'signout' ? 'bg-white text-black' : 'text-white/40 hover:bg-white/5 hover:text-white'} ${item.danger ? 'hover:text-red-500' : ''}`}
                            >
                                <span className="flex items-center">
                                    <item.icon size={14} className="mr-3 shrink-0" /> {item.label}
                                </span>
                                <ChevronRight size={12} className={`hidden lg:block ${activeTab === item.id && item.id !== 'signout' ? 'opacity-100' : 'opacity-0'}`} />
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content */}
                <main className="profile-content lg:col-span-9 space-y-8">
                    {activeTab === 'hub' && (
                        <>
                            {/* Stats */}
                            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                                {[
                                    { label: 'Total Copped', value: '14 Items' },
                                    { label: 'Street Cred', value: '8,420 XP' },
                                    { label: 'Member Since', value: user.joined }
                                ].map((stat, i) => (
                                    <div key={i} className="glass-card p-6 border-white/5 group hover:border-accent/30 transition-colors text-center sm:text-left bg-white/[0.01]">
                                        <p className="text-[8px] uppercase tracking-widest text-white/40 mb-3">{stat.label}</p>
                                        <p className="text-xl md:text-2xl font-bold font-mono tracking-tighter">{stat.value}</p>
                                    </div>
                                ))}
                            </section>

                            {/* Recent Drops */}
                            <section className="glass-card p-6 border-white/5 bg-white/[0.01]">
                                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                                    <h2 className="text-[9px] uppercase tracking-[0.3em] font-bold">Recent Drops</h2>
                                    <button onClick={() => setActiveTab('drops')} className="text-[8px] uppercase tracking-widest text-accent hover:underline">View All</button>
                                </div>
                                <div className="space-y-4">
                                    {allDrops.slice(0, 2).map((order, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all gap-4">
                                            <div className="w-full sm:w-auto">
                                                <p className="text-[10px] font-bold uppercase tracking-tight mb-1">{order.id}</p>
                                                <p className="text-[8px] text-white/40 uppercase tracking-widest">{order.item} — {order.items}</p>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-12">
                                                <div className="text-left sm:text-right">
                                                    <p className="text-[9px] font-mono text-accent">{order.price}</p>
                                                    <p className="text-[7px] uppercase tracking-widest text-white/30">{order.date}</p>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <button 
                                                        onClick={() => setSelectedTrackOrder(order)}
                                                        className="px-3 py-1 border border-white/10 hover:border-accent hover:text-accent rounded-sm text-[7px] uppercase tracking-widest font-bold transition-all text-white/60"
                                                    >
                                                        Track
                                                    </button>
                                                    <div className="px-3 py-1 border border-accent/20 rounded-full text-[7px] uppercase tracking-widest font-bold text-accent whitespace-nowrap">
                                                        {order.status}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Bio & Fast Actions */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="glass-card p-6 border-white/5 bg-white/[0.01] flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-tight mb-4">Operational Bio</h3>
                                        <p className="text-xs text-white/60 uppercase tracking-wide leading-relaxed font-mono">
                                            "{user.bio}"
                                        </p>
                                    </div>
                                    <button onClick={() => setActiveTab('info')} className="mt-6 flex items-center text-[8px] uppercase tracking-widest font-bold text-accent hover:underline">
                                        Edit Profile Configurations <ChevronRight size={10} className="ml-1" />
                                    </button>
                                </div>
                                <div className="glass-card p-6 border-white/5 flex flex-col justify-center items-center text-center space-y-6 bg-white/[0.01]">
                                    <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center border border-accent/10">
                                        <ShieldCheck size={24} className="text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-tight mb-2">Cloud Synced</h3>
                                        <p className="text-[9px] text-white/40 uppercase tracking-widest leading-relaxed max-w-xs">
                                            Keep your client protocol and digital copping details secured to the cloud nodes.
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={syncEnabled} onChange={handleSyncToggle} />
                                        <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                        <span className="ml-3 text-[8px] uppercase tracking-widest text-white/60">Node Sync</span>
                                    </label>
                                </div>
                            </section>
                        </>
                    )}

                    {activeTab === 'drops' && (
                        <section className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-6">
                            <div className="border-b border-white/5 pb-4">
                                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">drops archive history</h2>
                                <p className="text-[8px] text-white/40 uppercase tracking-widest mt-1">Audit log of all copped streetwear units</p>
                            </div>
                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-left min-w-[600px]">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[8px] uppercase tracking-widest text-white/40">
                                            <th className="py-4 px-2">Order ID</th>
                                            <th className="py-4 px-2">Deployment Unit</th>
                                            <th className="py-4 px-2">Drop Date</th>
                                            <th className="py-4 px-2">Settlement</th>
                                            <th className="py-4 px-2">Status</th>
                                            <th className="py-4 px-2 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {allDrops.map((order, i) => (
                                            <tr key={i} className="text-[10px] hover:bg-white/[0.02] transition-colors">
                                                <td className="py-4 px-2 font-mono font-bold">{order.id}</td>
                                                <td className="py-4 px-2 uppercase font-bold text-white/80">
                                                    {order.item}
                                                    <span className="block text-[8px] text-white/30 font-normal mt-0.5">{order.items}</span>
                                                </td>
                                                <td className="py-4 px-2 font-mono text-white/60">{order.date}</td>
                                                <td className="py-4 px-2 font-mono text-accent">{order.price}</td>
                                                <td className="py-4 px-2">
                                                    <span className={`inline-block px-2 py-0.5 text-[7px] uppercase tracking-widest font-bold border rounded-full ${order.status === 'Delivered' ? 'border-green-500/20 text-green-400 bg-green-500/5' : 'border-accent/20 text-accent bg-accent/5'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-2 text-right">
                                                    <button 
                                                        onClick={() => setSelectedTrackOrder(order)}
                                                        className="px-3 py-1 bg-white/5 border border-white/10 hover:border-accent hover:text-accent rounded-sm text-[8px] uppercase tracking-widest font-bold transition-all text-white/70"
                                                    >
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {activeTab === 'wishlist' && (
                        <section className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-6">
                            <div className="border-b border-white/5 pb-4">
                                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose-500">My Favorites</h2>
                                <p className="text-[8px] text-white/40 uppercase tracking-widest mt-1 font-mono">Your secured and copped gear wishlist</p>
                            </div>
                            
                            {wishlist.length === 0 ? (
                                <div className="text-center py-16 space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-white/30">
                                        <Heart size={20} />
                                    </div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/40">No Gear Favorited Yet</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {wishlist.map(product => (
                                        <div key={product.id} className="animate-fadeIn">
                                            <ProductCard product={product} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {activeTab === 'info' && (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            {/* Profile Info */}
                            <form onSubmit={handleSaveChanges} className="glass-card p-6 md:p-8 border-white/5 bg-white/[0.01] space-y-6 md:col-span-7">
                                <div className="border-b border-white/5 pb-4">
                                    <h3 className="text-sm font-bold uppercase tracking-tight">Configuration Profile</h3>
                                    <p className="text-[8px] text-white/40 uppercase tracking-widest mt-1">Adjust client details safely</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Street Name</label>
                                        <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-all text-white font-bold tracking-wider" required />
                                    </div>
                                    <div>
                                        <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Digital Protocol (Email)</label>
                                        <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-all text-white" required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Secure Link (Phone)</label>
                                        <input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-all text-white font-mono" />
                                    </div>
                                    <div>
                                        <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Tactical Style Theme</label>
                                        <select value={editStyle} onChange={(e) => setEditStyle(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-all text-white bg-black">
                                            <option value="Techwear">TECHWEAR / UTILITY</option>
                                            <option value="Cyberpunk">CYBERPUNK / APOCALYPTIC</option>
                                            <option value="Streetwear">STREETWEAR / URBAN</option>
                                            <option value="Minimalist">MINIMALIST / ARCHIVE</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Fulfillment Address</label>
                                    <input type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-all text-white" />
                                </div>
                                <div>
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Street Intel (Bio)</label>
                                    <textarea rows="3" value={editBio} onChange={(e) => setEditBio(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-all text-white resize-none"></textarea>
                                </div>
                                <button type="submit" className="btn-primary w-full sm:w-auto py-3 px-8 text-[9px]">Secure Configurations</button>
                            </form>

                            {/* Digital Key Update */}
                            <form onSubmit={handlePasswordUpdate} className="glass-card p-6 md:p-8 border-white/5 bg-white/[0.01] space-y-6 md:col-span-5 h-fit">
                                <div className="border-b border-white/5 pb-4">
                                    <h3 className="text-sm font-bold uppercase tracking-tight">Security Protocol</h3>
                                    <p className="text-[8px] text-white/40 uppercase tracking-widest mt-1">Rotate digital access keys</p>
                                </div>
                                <div>
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Current Key</label>
                                    <input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} placeholder="••••••••••••" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-all text-white font-mono" />
                                </div>
                                <div>
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">New Access Key</label>
                                    <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="••••••••••••" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent transition-all text-white font-mono" />
                                </div>
                                <button type="submit" className="btn-primary w-full py-3 text-[9px] flex items-center justify-center">
                                    <Key size={12} className="mr-2" /> Rotate Access Keys
                                </button>
                            </form>
                        </div>
                    )}
                </main>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="glass-card p-8 border-red-500/20 max-w-sm w-full text-center space-y-6 bg-black">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-500">
                            <LogOut size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold uppercase tracking-tight">Sever Connection?</h3>
                            <p className="text-[9px] text-white/40 uppercase tracking-widest leading-relaxed mt-2">
                                Terminating this session will log you out of current command grids.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 py-3 border border-white/10 hover:bg-white/5 text-[9px] font-bold uppercase tracking-widest transition-all"
                            >
                                Stay Online
                            </button>
                            <button 
                                onClick={() => {
                                    setShowLogoutModal(false);
                                    showToast('SESSION SECURELY SEVERED');
                                }}
                                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest transition-all"
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Order Tracking Modal */}
            {selectedTrackOrder && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="glass-card p-8 border-accent/20 max-w-md w-full space-y-6 bg-black">
                        <div className="flex justify-between items-start border-b border-white/5 pb-4">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-tight">TRACK DROP {selectedTrackOrder.id}</h3>
                                <p className="text-[8px] text-accent uppercase tracking-widest font-mono mt-1">{selectedTrackOrder.courier}</p>
                            </div>
                            <span className="px-2 py-0.5 border border-accent/20 rounded-full text-[8px] uppercase tracking-widest font-bold text-accent">
                                {selectedTrackOrder.status}
                            </span>
                        </div>

                        <div className="space-y-6 relative py-2">
                            {/* Tracker Lines */}
                            <div className="absolute left-[13px] top-[24px] bottom-[24px] w-0.5 bg-white/10"></div>
                            <div 
                                className="absolute left-[13px] top-[24px] w-0.5 bg-accent transition-all duration-1000"
                                style={{ height: `${((selectedTrackOrder.step - 1) / 3) * 100}%` }}
                            ></div>

                            {[
                                { title: 'Protocol Authorized', desc: 'Secure drop checkout resolved.', step: 1 },
                                { title: 'Unit Dispatched', desc: 'Sourced and packaged at Flagship Terminal.', step: 2 },
                                { title: 'Transit Protocol Active', desc: 'Route locked. In custody of transit node.', step: 3 },
                                { title: 'Drop Delivered', desc: 'Safely copped at coordinates.', step: 4 }
                            ].map((s) => {
                                const isDone = selectedTrackOrder.step >= s.step;
                                const isCurrent = selectedTrackOrder.step === s.step;
                                return (
                                    <div key={s.step} className="flex items-start space-x-6 relative z-10">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${isDone ? 'bg-accent text-black border border-accent' : 'bg-black border border-white/10 text-white/30'} ${isCurrent ? 'ring-4 ring-accent/20' : ''}`}>
                                            {isDone ? <Check size={12} /> : <span className="text-[9px] font-bold font-mono">{s.step}</span>}
                                        </div>
                                        <div>
                                            <h4 className={`text-[10px] font-bold uppercase tracking-wide ${isDone ? 'text-white' : 'text-white/30'}`}>{s.title}</h4>
                                            <p className={`text-[8px] uppercase tracking-wider mt-1 ${isDone ? 'text-white/50' : 'text-white/20'}`}>{s.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button 
                            onClick={() => setSelectedTrackOrder(null)}
                            className="w-full py-3 bg-white text-black hover:bg-white/80 text-[9px] font-bold uppercase tracking-widest transition-all"
                        >
                            Close Protocol
                        </button>
                    </div>
                </div>
            )}

            {/* Global toast */}
            {toast && (
                <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
                    <Toast message={toast} onClose={() => setToast(null)} />
                </div>
            )}
        </div>
    );
};

export default Profile;
