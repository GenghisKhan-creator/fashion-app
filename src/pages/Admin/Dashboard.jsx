import { useState, useEffect, useRef } from 'react';
import { Package, Users, ShoppingCart, BarChart3, Plus, Search, Edit2, Trash2, ShieldCheck, Check, X, RefreshCw, Layers, ArrowUpRight, TrendingUp, AlertTriangle } from 'lucide-react';
import Toast from '../../components/Toast';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState(null);

    // Products State (Catalog)
    const [products, setProducts] = useState([
        { id: 1, name: 'AURORA SILVER PUFFER', category: 'Outerwear', price: 999.00, stock: 12, sales: 45 },
        { id: 2, name: 'CARGO MODULAR PANTS', category: 'Outerwear', price: 220.00, stock: 5, sales: 78 },
        { id: 3, name: 'STEALTH MATTE WATCH', category: 'Watches', price: 450.00, stock: 2, sales: 32 },
        { id: 4, name: 'MIDNIGHT POLARIZED SHADE', category: 'Accessories', price: 120.00, stock: 18, sales: 110 }
    ]);

    // Inventory Transaction Logs State
    const [inventoryLogs, setInventoryLogs] = useState([
        { id: 1, pId: 1, code: 'AURORA SILVER PUFFER', type: 'Restock', qty: 10, reason: 'Factory production secure', time: '2026-06-02 10:14' },
        { id: 2, pId: 2, code: 'CARGO MODULAR PANTS', type: 'Deduction', qty: 2, reason: 'Fulfillment drop #MAX-8854', time: '2026-06-02 11:45' },
        { id: 3, pId: 3, code: 'STEALTH MATTE WATCH', type: 'Restock', qty: 5, reason: 'Correction audit verification', time: '2026-06-02 12:05' }
    ]);

    // Customer Transfers (Orders) State
    const [orders, setOrders] = useState([
        { id: '#MAX-9921', user: 'MAX USER 04', item: 'AURORA SILVER PUFFER', qty: 2, price: 'GH₵1,280.00', status: 'Pending', time: '2h ago' },
        { id: '#MAX-8854', user: 'MAX USER 02', item: 'STEALTH MATTE WATCH', qty: 1, price: 'GH₵450.00', status: 'Delivered', time: '1d ago' },
        { id: '#MAX-7712', user: 'MAX USER 09', item: 'CARGO MODULAR PANTS', qty: 1, price: 'GH₵220.00', status: 'Pending', time: '3d ago' }
    ]);

    // Users State
    const [users, setUsers] = useState([
        { name: 'MAX USER 04', email: 'hello@maxcollection.tech', rank: 'STREET LEGEND', joined: 'Sept 2025', vip: true, verified: true },
        { name: 'MAX USER 02', email: 'urban.rebel@frn.tech', rank: 'CORE MEMBER', joined: 'Oct 2025', vip: false, verified: true },
        { name: 'MAX USER 09', email: 'accra.explorer@ops.io', rank: 'STREET CADET', joined: 'Jan 2026', vip: false, verified: false }
    ]);

    // Modal Control States
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showStockModal, setShowStockModal] = useState(false);
    const [activeProduct, setActiveProduct] = useState(null);

    // Form inputs states
    const [newProdName, setNewProdName] = useState('');
    const [newProdPrice, setNewProdPrice] = useState('');
    const [newProdCategory, setNewProdCategory] = useState('Outerwear');
    const [newProdStock, setNewProdStock] = useState('');

    const [editProdName, setEditProdName] = useState('');
    const [editProdPrice, setEditProdPrice] = useState('');
    const [editProdCategory, setEditProdCategory] = useState('');

    const [stockTxType, setStockTxType] = useState('Restock');
    const [stockQty, setStockQty] = useState('');
    const [stockReason, setStockReason] = useState('');

    const showToast = (msg) => {
        setToast(msg);
    };

    // Product CRUD Operations
    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!newProdName || !newProdPrice || !newProdStock) {
            showToast('FILL ALL UNIT FIELDS');
            return;
        }

        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProd = {
            id: newId,
            name: newProdName.toUpperCase(),
            category: newProdCategory,
            price: parseFloat(newProdPrice),
            stock: parseInt(newProdStock),
            sales: 0
        };

        setProducts([...products, newProd]);
        
        // Add log
        const logId = inventoryLogs.length > 0 ? Math.max(...inventoryLogs.map(l => l.id)) + 1 : 1;
        setInventoryLogs([
            { id: logId, pId: newId, code: newProd.name, type: 'Restock', qty: newProd.stock, reason: 'Initial unit deployment injection', time: getFormattedTime() },
            ...inventoryLogs
        ]);

        // Clean
        setNewProdName('');
        setNewProdPrice('');
        setNewProdStock('');
        setShowAddModal(false);
        showToast('NEW UNIT DEPLOYED SECURELY');
    };

    const handleOpenEdit = (p) => {
        setActiveProduct(p);
        setEditProdName(p.name);
        setEditProdPrice(p.price);
        setEditProdCategory(p.category);
        setShowEditModal(true);
    };

    const handleEditProduct = (e) => {
        e.preventDefault();
        setProducts(products.map(p => p.id === activeProduct.id ? {
            ...p,
            name: editProdName.toUpperCase(),
            price: parseFloat(editProdPrice),
            category: editProdCategory
        } : p));
        setShowEditModal(false);
        showToast('UNIT CONFIGS MODIFIED');
    };

    const handleDeleteProduct = (id, name) => {
        if (confirm(`INITIATE DISPOSAL OF UNIT: ${name}?`)) {
            setProducts(products.filter(p => p.id !== id));
            showToast('UNIT PURGED FROM DATABASE');
        }
    };

    // Inventory Flow Controls (Restock / Deduction)
    const handleOpenStock = (p) => {
        setActiveProduct(p);
        setStockQty('');
        setStockReason('');
        setStockTxType('Restock');
        setShowStockModal(true);
    };

    const handleProcessStock = (e) => {
        e.preventDefault();
        const qty = parseInt(stockQty);
        if (isNaN(qty) || qty <= 0) {
            showToast('ENTER SECURE POSITIVE INT');
            return;
        }

        const modifier = stockTxType === 'Restock' ? 1 : -1;
        const currentStock = activeProduct.stock;
        
        if (stockTxType === 'Deduction' && currentStock < qty) {
            showToast('CRITICAL: DEDUCTION EXCEEDS STOCK');
            return;
        }

        // Update product stock
        setProducts(products.map(p => p.id === activeProduct.id ? {
            ...p,
            stock: p.stock + (qty * modifier)
        } : p));

        // Create log
        const logId = inventoryLogs.length > 0 ? Math.max(...inventoryLogs.map(l => l.id)) + 1 : 1;
        const newLog = {
            id: logId,
            pId: activeProduct.id,
            code: activeProduct.name,
            type: stockTxType,
            qty: qty,
            reason: stockReason || `${stockTxType} protocol processed`,
            time: getFormattedTime()
        };
        setInventoryLogs([newLog, ...inventoryLogs]);

        setShowStockModal(false);
        showToast(`INVENTORY ${stockTxType.toUpperCase()} SECURED`);
    };

    // Transfers Operations
    const handleOrderAction = (orderId, newStatus) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        showToast(`TRANSFER ${orderId} SECURED: ${newStatus.toUpperCase()}`);
    };

    // Users Operations
    const handleToggleVip = (email, name) => {
        setUsers(users.map(u => u.email === email ? { ...u, vip: !u.vip } : u));
        showToast(`USER ${name} PROTOCOL MODIFIED`);
    };

    const getFormattedTime = () => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    };

    // Filters
    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const lowStockCount = products.filter(p => p.stock <= 5).length;
    const totalInventoryCount = products.reduce((acc, curr) => acc + curr.stock, 0);

    return (
        <div className="pt-24 min-h-screen flex flex-col lg:flex-row bg-[#050505] overflow-x-hidden text-white font-body">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/5 pt-4 lg:pt-12 shrink-0 overflow-x-auto lg:overflow-x-visible scrollbar-none flex flex-row lg:flex-col">
                <div className="px-8 mb-12 hidden lg:block">
                    <h2 className="text-[10px] tracking-[0.4em] text-accent uppercase font-mono font-bold">TERMINAL V2.1</h2>
                    <p className="text-[7px] text-white/30 uppercase tracking-[0.2em] mt-1">Status: SECURE NODE</p>
                </div>
                <nav className="flex flex-row lg:flex-col w-full px-2 lg:px-0 pb-3 lg:pb-0 gap-1 lg:gap-2">
                    {[
                        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
                        { id: 'products', icon: Package, label: 'Catalog' },
                        { id: 'inventory', icon: Layers, label: 'Audit Ledger' },
                        { id: 'orders', icon: ShoppingCart, label: 'Transfers' },
                        { id: 'users', icon: Users, label: 'Units' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center px-6 lg:px-8 py-3 lg:py-4 transition-all shrink-0 md:shrink lg:shrink-0 lg:border-r-2 ${activeTab === item.id ? 'bg-white/5 lg:border-accent text-white font-bold' : 'border-transparent text-white/40 hover:text-white'}`}
                        >
                            <item.icon size={16} className="mr-4 text-accent" />
                            <span className="text-[9px] uppercase tracking-widest font-mono">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Command Console */}
            <main className="flex-grow p-4 sm:p-8 lg:p-12 overflow-x-hidden">
                
                {/* Header */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tighter">Command Center</h1>
                        <p className="text-[9px] tracking-widest text-white/40 mt-2 uppercase font-mono">Managing active deployment v24.0.2 // secure key loaded</p>
                    </div>
                    {activeTab === 'products' && (
                        <button 
                            onClick={() => setShowAddModal(true)}
                            className="btn-primary flex items-center px-6 py-3 text-[9px] w-full sm:w-auto justify-center"
                        >
                            <Plus size={14} className="mr-2" /> DEPLOY NEW UNIT
                        </button>
                    )}
                </header>

                {/* Stat Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12">
                    {[
                        { label: 'Tactical Revenue', val: 'GH₵142,500', change: '+12%', isPos: true },
                        { label: 'Active Transfers', val: orders.filter(o => o.status === 'Pending').length + ' Units', change: 'Transfers', isPos: true },
                        { label: 'Operational Catalog', val: products.length + ' Techs', change: 'Healthy', isPos: true },
                        { label: 'Critical Inventory Warnings', val: lowStockCount + ' Units', change: lowStockCount > 0 ? 'LOW STOCK' : 'IN STOCK', isPos: lowStockCount === 0 },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card p-6 bg-white/[0.01] border-white/5 hover:border-accent/15 transition-all">
                            <p className="text-[8px] uppercase tracking-widest text-white/40 mb-2 font-mono">{stat.label}</p>
                            <div className="flex justify-between items-end">
                                <h3 className="text-2xl font-bold font-mono tracking-tighter">{stat.val}</h3>
                                <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full border ${stat.isPos ? 'border-green-500/20 text-green-400 bg-green-500/5' : 'border-red-500/20 text-red-500 bg-red-500/5'}`}>{stat.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dashboard Tabs Rendering */}
                
                {/* 1. ANALYTICS TAB */}
                {activeTab === 'analytics' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="glass-card p-6 lg:col-span-2 bg-white/[0.01] border-white/5 space-y-6">
                                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest">Revenue Flow (Weekly Drops log)</h3>
                                    <div className="flex space-x-2 text-[8px] font-mono">
                                        <button className="px-2 py-0.5 border border-accent/20 text-accent rounded-sm">7 Days</button>
                                        <button className="px-2 py-0.5 border border-white/5 text-white/40 rounded-sm hover:border-white/20 hover:text-white transition-all">30 Days</button>
                                    </div>
                                </div>
                                {/* Responsive Custom CSS Bar Graph */}
                                <div className="flex items-end justify-between h-48 pt-6 border-b border-white/10 px-4">
                                    {[45, 68, 92, 74, 115, 95, 142].map((height, i) => (
                                        <div key={i} className="flex flex-col items-center w-full group">
                                            <div 
                                                style={{ height: `${(height / 150) * 100}%` }}
                                                className="bg-accent/30 group-hover:bg-accent w-6 sm:w-10 transition-all rounded-t-sm relative flex justify-center cursor-pointer"
                                            >
                                                <span className="absolute -top-7 text-[8px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-accent/20 px-1 rounded-sm whitespace-nowrap">{height} COPS</span>
                                            </div>
                                            <span className="text-[7px] font-mono mt-2 text-white/30">DROP 0{i+1}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between text-[8px] text-white/40 font-mono pt-2">
                                    <span className="flex items-center"><span className="w-1.5 h-1.5 bg-accent mr-2"></span>Settlement Flow Secured</span>
                                    <span>Active GMT Router</span>
                                </div>
                            </div>

                            <div className="glass-card p-6 bg-white/[0.01] border-white/5 space-y-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest">Inventory Distribution</h3>
                                        <TrendingUp size={14} className="text-accent" />
                                    </div>
                                    <div className="space-y-4">
                                        {products.map(p => (
                                            <div key={p.id} className="space-y-1">
                                                <div className="flex justify-between text-[9px] uppercase tracking-wide">
                                                    <span className="text-white/60 font-bold">{p.name}</span>
                                                    <span className="font-mono text-white/40">{p.stock} Units</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-white/5 rounded-sm overflow-hidden">
                                                    <div 
                                                        className={`h-full transition-all ${p.stock <= 5 ? 'bg-red-500' : 'bg-accent'}`}
                                                        style={{ width: `${(p.stock / 30) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-white/5 flex items-center space-x-3 text-white/40 text-[9px] uppercase tracking-wider font-mono">
                                    <AlertTriangle size={14} className="text-red-500 shrink-0" />
                                    <span>{lowStockCount} items at critical levels</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. CATALOG TAB */}
                {activeTab === 'products' && (
                    <div className="glass-card rounded-sm overflow-hidden bg-white/[0.01] border-white/5">
                        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest">Active Catalog Units ({filteredProducts.length})</h3>
                            <div className="relative w-full sm:w-auto">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type="text"
                                    placeholder="SEARCH CATALOG CODE..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-[9px] focus:outline-none focus:border-accent w-full sm:w-64 uppercase tracking-widest text-white"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left min-w-[700px]">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/5">
                                        <th className="p-6 text-[9px] uppercase tracking-widest text-white/50">Unit Name / Code</th>
                                        <th className="p-6 text-[9px] uppercase tracking-widest text-white/50">Category</th>
                                        <th className="p-6 text-[9px] uppercase tracking-widest text-white/50">Base Price</th>
                                        <th className="p-6 text-[9px] uppercase tracking-widest text-white/50">Inventory Level</th>
                                        <th className="p-6 text-[9px] uppercase tracking-widest text-white/50">Operational Activity</th>
                                        <th className="p-6 text-[9px] uppercase tracking-widest text-white/50 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredProducts.map(p => (
                                        <tr key={p.id} className="hover:bg-white/2 transition-colors text-[10px]">
                                            <td className="p-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-9 h-9 bg-white/5 border border-white/10 rounded flex items-center justify-center text-accent">
                                                        <Layers size={14} />
                                                    </div>
                                                    <span className="font-bold uppercase text-white">{p.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-white/60 uppercase font-mono">{p.category}</td>
                                            <td className="p-6 text-accent font-mono">GH₵{p.price.toFixed(2)}</td>
                                            <td className="p-6">
                                                <span className={`inline-block px-3 py-1 text-[8px] font-mono rounded-full border ${p.stock <= 5 ? 'border-red-500/30 text-red-400 bg-red-500/5' : 'border-green-500/20 text-green-400 bg-green-500/5'}`}>
                                                    {p.stock} Units
                                                </span>
                                            </td>
                                            <td className="p-6 text-white/40 font-mono">{p.sales} Secured Cops</td>
                                            <td className="p-6 text-right">
                                                <div className="flex items-center justify-end space-x-3">
                                                    <button 
                                                        onClick={() => handleOpenStock(p)}
                                                        className="px-2.5 py-1 border border-accent/20 hover:border-accent hover:text-accent rounded-sm text-[8px] uppercase tracking-widest font-mono transition-colors text-accent/80"
                                                    >
                                                        Stock
                                                    </button>
                                                    <button onClick={() => handleOpenEdit(p)} className="text-white/30 hover:text-white transition-colors p-1"><Edit2 size={13} /></button>
                                                    <button onClick={() => handleDeleteProduct(p.id, p.name)} className="text-white/30 hover:text-red-500 transition-colors p-1"><Trash2 size={13} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 3. AUDIT INVENTORY LOG TAB */}
                {activeTab === 'inventory' && (
                    <div className="glass-card rounded-sm overflow-hidden bg-white/[0.01] border-white/5 space-y-6 p-6">
                        <div className="border-b border-white/5 pb-4">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Inventory Audit Ledger</h3>
                            <p className="text-[8px] text-white/40 uppercase tracking-widest mt-1">Audit trail tracking catalog inputs and outputs</p>
                        </div>
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left min-w-[700px]">
                                <thead>
                                    <tr className="border-b border-white/5 text-[9px] uppercase tracking-widest text-white/40">
                                        <th className="py-4 px-2">Timestamp (GMT)</th>
                                        <th className="py-4 px-2">Unit Code</th>
                                        <th className="py-4 px-2">Transaction Protocol</th>
                                        <th className="py-4 px-2">Shift Quantity</th>
                                        <th className="py-4 px-2">Manifesto / Reason</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {inventoryLogs.map((log) => (
                                        <tr key={log.id} className="text-[10px] hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4 px-2 font-mono text-white/60">{log.time}</td>
                                            <td className="py-4 px-2 uppercase font-bold text-white/80">{log.code}</td>
                                            <td className="py-4 px-2">
                                                <span className={`inline-block px-2 py-0.5 text-[7px] uppercase tracking-widest font-bold border rounded-full ${log.type === 'Restock' ? 'border-green-500/20 text-green-400 bg-green-500/5' : 'border-red-500/20 text-red-500 bg-red-500/5'}`}>
                                                    {log.type === 'Restock' ? 'INPUT / RESTOCK' : 'OUTPUT / DEDUCTION'}
                                                </span>
                                            </td>
                                            <td className={`py-4 px-2 font-mono font-bold ${log.type === 'Restock' ? 'text-green-400' : 'text-red-400'}`}>
                                                {log.type === 'Restock' ? '+' : '-'}{log.qty} Units
                                            </td>
                                            <td className="py-4 px-2 text-white/60 font-mono">{log.reason}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 4. TRANSFERS TAB */}
                {activeTab === 'orders' && (
                    <div className="glass-card rounded-sm overflow-hidden bg-white/[0.01] border-white/5 p-6 space-y-6">
                        <div className="border-b border-white/5 pb-4">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Active Drops Transfers</h3>
                            <p className="text-[8px] text-white/40 uppercase tracking-widest mt-1">Approving and routing active client deployments</p>
                        </div>
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left min-w-[700px]">
                                <thead>
                                    <tr className="border-b border-white/5 text-[9px] uppercase tracking-widest text-white/40">
                                        <th className="py-4 px-2">Order ID</th>
                                        <th className="py-4 px-2">Client ID</th>
                                        <th className="py-4 px-2">Deployment Unit</th>
                                        <th className="py-4 px-2">Drop Cost</th>
                                        <th className="py-4 px-2">Temporal Node</th>
                                        <th className="py-4 px-2">Routing Status</th>
                                        <th className="py-4 px-2 text-right">Fulfillment Controls</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {orders.map((o) => (
                                        <tr key={o.id} className="text-[10px] hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4 px-2 font-mono font-bold">{o.id}</td>
                                            <td className="py-4 px-2 text-white/60 uppercase">{o.user}</td>
                                            <td className="py-4 px-2 uppercase font-bold text-white/80">{o.item} <span className="block text-[8px] text-white/40 font-mono mt-0.5">{o.qty} Pieces</span></td>
                                            <td className="py-4 px-2 font-mono text-accent">{o.price}</td>
                                            <td className="py-4 px-2 font-mono text-white/40">{o.time}</td>
                                            <td className="py-4 px-2">
                                                <span className={`inline-block px-2.5 py-0.5 text-[7px] uppercase tracking-widest font-bold border rounded-full ${o.status === 'Delivered' ? 'border-green-500/20 text-green-400 bg-green-500/5' : o.status === 'Canceled' ? 'border-red-500/20 text-red-500 bg-red-500/5' : 'border-accent/20 text-accent bg-accent/5'}`}>
                                                    {o.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                {o.status === 'Pending' ? (
                                                    <div className="flex justify-end space-x-2">
                                                        <button 
                                                            onClick={() => handleOrderAction(o.id, 'Delivered')}
                                                            className="p-1 border border-green-500/20 hover:bg-green-500 hover:text-black transition-colors rounded-sm text-green-400"
                                                            title="Approve Drop"
                                                        >
                                                            <Check size={12} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleOrderAction(o.id, 'Canceled')}
                                                            className="p-1 border border-red-500/20 hover:bg-red-500 hover:text-white transition-colors rounded-sm text-red-400"
                                                            title="Reject Drop"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-[7px] text-white/20 uppercase tracking-widest">Archived</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 5. UNITS TAB */}
                {activeTab === 'users' && (
                    <div className="glass-card rounded-sm overflow-hidden bg-white/[0.01] border-white/5 p-6 space-y-6">
                        <div className="border-b border-white/5 pb-4">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Active Operational Units</h3>
                            <p className="text-[8px] text-white/40 uppercase tracking-widest mt-1">Verified command members and street clients</p>
                        </div>
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left min-w-[700px]">
                                <thead>
                                    <tr className="border-b border-white/5 text-[9px] uppercase tracking-widest text-white/40">
                                        <th className="py-4 px-2">Street Name</th>
                                        <th className="py-4 px-2">Digital Protocol (Email)</th>
                                        <th className="py-4 px-2">Operational Rank</th>
                                        <th className="py-4 px-2">Member Since</th>
                                        <th className="py-4 px-2">Verification Grids</th>
                                        <th className="py-4 px-2 text-right">Node Security</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.map((u) => (
                                        <tr key={u.email} className="text-[10px] hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4 px-2 font-bold uppercase text-white">{u.name}</td>
                                            <td className="py-4 px-2 font-mono text-white/60">{u.email}</td>
                                            <td className="py-4 px-2 font-mono text-accent">{u.rank}</td>
                                            <td className="py-4 px-2 text-white/40 font-mono">{u.joined}</td>
                                            <td className="py-4 px-2">
                                                <div className="flex gap-2">
                                                    {u.vip && <span className="px-2 py-0.5 border border-yellow-500/20 text-yellow-500 bg-yellow-500/5 text-[7px] uppercase font-bold tracking-widest rounded-full">VIP</span>}
                                                    {u.verified && <span className="px-2 py-0.5 border border-accent/20 text-accent bg-accent/5 text-[7px] uppercase font-bold tracking-widest rounded-full">Verified</span>}
                                                </div>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <button 
                                                    onClick={() => handleToggleVip(u.email, u.name)}
                                                    className={`px-3 py-1 border rounded-sm text-[8px] uppercase tracking-widest font-mono transition-colors ${u.vip ? 'border-red-500/20 hover:border-red-500 text-red-400 bg-red-500/5' : 'border-yellow-500/20 hover:border-yellow-500 text-yellow-400 bg-yellow-500/5'}`}
                                                >
                                                    {u.vip ? 'Revoke VIP' : 'Verify VIP'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* A. ADD PRODUCT OVERLAY MODAL */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <form onSubmit={handleAddProduct} className="glass-card p-8 border-accent/20 max-w-md w-full space-y-6 bg-black text-white">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <h3 className="text-sm font-bold uppercase tracking-tight">Deploy New Techwear Unit</h3>
                            <button type="button" onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white"><X size={16} /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Unit Name / Code</label>
                                <input type="text" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} placeholder="E.G. GHOST JACKET" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent text-white uppercase tracking-wider font-bold" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Operational Category</label>
                                    <select value={newProdCategory} onChange={(e) => setNewProdCategory(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent text-white bg-black">
                                        <option value="Outerwear">OUTERWEAR / UTILITY</option>
                                        <option value="Watches">WATCHES / INTEL</option>
                                        <option value="Accessories">ACCESSORIES / GEAR</option>
                                        <option value="Footwear">FOOTWEAR / SPEED</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Base Cost (GH₵)</label>
                                    <input type="number" step="0.01" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} placeholder="0.00" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent text-white font-mono" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Initial Stock Capacity</label>
                                <input type="number" value={newProdStock} onChange={(e) => setNewProdStock(e.target.value)} placeholder="Starting units count" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent text-white font-mono" required />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary w-full py-3 text-[9px] uppercase tracking-widest font-bold">Inject Unit Deployment</button>
                    </form>
                </div>
            )}

            {/* B. EDIT PRODUCT OVERLAY MODAL */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <form onSubmit={handleEditProduct} className="glass-card p-8 border-accent/20 max-w-md w-full space-y-6 bg-black text-white">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <h3 className="text-sm font-bold uppercase tracking-tight">Configure Active Unit</h3>
                            <button type="button" onClick={() => setShowEditModal(false)} className="text-white/40 hover:text-white"><X size={16} /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Unit Name / Code</label>
                                <input type="text" value={editProdName} onChange={(e) => setEditProdName(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent text-white uppercase tracking-wider font-bold" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Operational Category</label>
                                    <select value={editProdCategory} onChange={(e) => setEditProdCategory(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent text-white bg-black">
                                        <option value="Outerwear">OUTERWEAR / UTILITY</option>
                                        <option value="Watches">WATCHES / INTEL</option>
                                        <option value="Accessories">ACCESSORIES / GEAR</option>
                                        <option value="Footwear">FOOTWEAR / SPEED</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Base Cost (GH₵)</label>
                                    <input type="number" step="0.01" value={editProdPrice} onChange={(e) => setEditProdPrice(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent text-white font-mono" required />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn-primary w-full py-3 text-[9px] uppercase tracking-widest font-bold">Lock Configurations</button>
                    </form>
                </div>
            )}

            {/* C. INVENTORY STOCK INPUT / OUTPUT DRAWER MODAL */}
            {showStockModal && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <form onSubmit={handleProcessStock} className="glass-card p-8 border-accent/20 max-w-md w-full space-y-6 bg-black text-white">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-tight">MANAGE STOCK PROTOCOL</h3>
                                <p className="text-[8px] text-accent uppercase tracking-widest font-mono mt-1">{activeProduct?.name}</p>
                            </div>
                            <button type="button" onClick={() => setShowStockModal(false)} className="text-white/40 hover:text-white"><X size={16} /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Current Capacity</label>
                                <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 text-xs font-mono font-bold text-accent tracking-widest rounded-sm w-full">
                                    {activeProduct?.stock} ACTIVE UNITS
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Transaction Grid</label>
                                    <select value={stockTxType} onChange={(e) => setStockTxType(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent text-white bg-black">
                                        <option value="Restock">INPUT / RESTOCK (+)</option>
                                        <option value="Deduction">OUTPUT / DEDUCTION (-)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Shift Quantity</label>
                                    <input type="number" value={stockQty} onChange={(e) => setStockQty(e.target.value)} placeholder="0" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent text-white font-mono" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Transaction manifesto (Reason)</label>
                                <input type="text" value={stockReason} onChange={(e) => setStockReason(e.target.value)} placeholder="E.G. FACTORY DROP #12, FAULTY SCRAP" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:outline-none focus:border-accent text-white uppercase tracking-wider font-bold" required />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary w-full py-3 text-[9px] uppercase tracking-widest font-bold flex items-center justify-center">
                            <RefreshCw size={12} className="mr-2 animate-spin-slow" /> PROCESS INVENTORY TRANSACTION
                        </button>
                    </form>
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

export default Dashboard;
