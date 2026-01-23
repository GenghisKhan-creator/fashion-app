import { useState } from 'react';
import { Package, Users, ShoppingCart, BarChart3, Plus, Search, Edit2, Trash2 } from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('products');

    const products = [
        { id: 1, name: 'Aurora Silver', price: '$899.99', stock: 12, sales: 45 },
        { id: 2, name: 'Stealth Black', price: '$1,199.99', stock: 5, sales: 78 },
        { id: 3, name: 'Glacier White', price: '$1,299.99', stock: 2, sales: 32 },
    ];

    return (
        <div className="pt-24 min-h-screen flex bg-bg-dark">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 pt-12">
                <div className="px-8 mb-12">
                    <h2 className="text-[10px] tracking-widest text-white/40 uppercase">Terminal V2.1</h2>
                </div>
                <nav className="space-y-2">
                    {[
                        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
                        { id: 'products', icon: Package, label: 'Catalog' },
                        { id: 'orders', icon: ShoppingCart, label: 'Transfers' },
                        { id: 'users', icon: Users, label: 'Units' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center px-8 py-4 transition-all border-r-2 ${activeTab === item.id ? 'bg-white/5 border-accent text-white' : 'border-transparent text-white/40 hover:text-white'}`}
                        >
                            <item.icon size={18} className="mr-4" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-12">
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-tighter">Command Center</h1>
                        <p className="text-[10px] tracking-widest text-white/40 mt-2 uppercase">Managing active deployment v24.0.2</p>
                    </div>
                    <button className="btn-primary flex items-center px-6 py-2 text-[10px]">
                        <Plus size={14} className="mr-2" /> Add New Unit
                    </button>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-8 mb-12">
                    {[
                        { label: 'Revenue', val: '$142,500', change: '+12%' },
                        { label: 'Active Orders', val: '24', change: '-2%' },
                        { label: 'Conversion', val: '3.42%', change: '+0.5%' },
                        { label: 'Low Stock', val: '8 Units', change: 'Critical' },
                    ].map((stat, i) => (
                        <div key={stat.label} className="glass-card p-6 rounded-sm">
                            <p className="text-[8px] uppercase tracking-widest text-white/40 mb-2">{stat.label}</p>
                            <div className="flex justify-between items-end">
                                <h3 className="text-2xl font-bold">{stat.val}</h3>
                                <span className={`text-[8px] font-mono ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table/Content */}
                <div className="glass-card rounded-sm overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest">Active Catalog Units</h3>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="text"
                                placeholder="SEARCH CODE..."
                                className="bg-white/5 border border-white/10 rounded-full py-1 pl-10 pr-4 text-[9px] focus:outline-none focus:border-accent w-64 uppercase tracking-widest"
                            />
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5">
                                <th className="p-6 text-[9px] uppercase tracking-widest text-white/50">Unit Code</th>
                                <th className="p-6 text-[9px] uppercase tracking-widest text-white/50">Base Price</th>
                                <th className="p-6 text-[9px] uppercase tracking-widest text-white/50">Inventory</th>
                                <th className="p-6 text-[9px] uppercase tracking-widest text-white/50">Operational Activity</th>
                                <th className="p-6 text-[9px] uppercase tracking-widest text-white/50">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-white/10 rounded-sm"></div>
                                            <span className="text-[10px] font-bold uppercase">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-[10px] font-mono">{p.price}</td>
                                    <td className="p-6">
                                        <span className={`px-2 py-1 text-[8px] rounded-full border ${p.stock < 5 ? 'border-red-500/50 text-red-500' : 'border-white/20 text-white/50'}`}>
                                            {p.stock} Units
                                        </span>
                                    </td>
                                    <td className="p-6 text-[10px]">{p.sales} Orders</td>
                                    <td className="p-6">
                                        <div className="flex space-x-4">
                                            <button className="text-white/30 hover:text-white transition-colors"><Edit2 size={14} /></button>
                                            <button className="text-white/30 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
