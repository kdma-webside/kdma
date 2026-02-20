'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { getProducts, updateProduct, deleteProduct, createProduct } from '@/app/actions/store';
import { getOrders, updateOrderStatus } from '@/app/actions/orders';
import { Edit2, Trash2, Plus, Save, X, Package, ShoppingBag, CheckCircle, Clock, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StoreManagement = () => {
    const [view, setView] = useState<'products' | 'orders'>('products');
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        loadData();
    }, [view]);

    const loadData = async () => {
        if (view === 'products') {
            const data = await getProducts();
            setProducts(data);
        } else {
            const data = await getOrders();
            setOrders(data);
        }
    };

    const handleEdit = (product: any) => {
        setEditingId(product.id);
        setFormData(product);
    };

    const handleSave = async () => {
        if (editingId) {
            await updateProduct(editingId, formData);
            setEditingId(null);
        } else {
            await createProduct(formData);
            setIsAdding(false);
        }
        loadData();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            loadData();
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        await updateOrderStatus(id, status);
        loadData();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            case 'processing': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            case 'shipped': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
            case 'delivered': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'cancelled': return 'text-red-500 bg-red-500/10 border-red-500/20';
            default: return 'text-gray-500';
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-12 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">ARMORY LOGISTICS</span>
                        <h2 className="text-white text-5xl font-black uppercase tracking-tighter">Store <span className="text-orange-600">Management</span></h2>
                    </div>

                    <div className="flex items-center gap-4 bg-[#0A0A0A] p-1.5 rounded-2xl border border-white/10">
                        <button
                            onClick={() => setView('products')}
                            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'products' ? 'bg-white/10 text-orange-500 shadow-md' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            <span className="flex items-center gap-2"><Package size={16} /> Inventory</span>
                        </button>
                        <button
                            onClick={() => setView('orders')}
                            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'orders' ? 'bg-white/10 text-orange-500 shadow-md' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            <span className="flex items-center gap-2"><ShoppingBag size={16} /> Orders</span>
                        </button>
                    </div>

                    {view === 'products' && (
                        <button
                            onClick={() => {
                                setIsAdding(true);
                                setFormData({ name: '', price: 0, category: 'Equipment', description: '', image: '/images/unified-hero-athlete.png' });
                            }}
                            className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center gap-3 shadow-[0_10px_20px_rgba(234,88,12,0.2)]"
                        >
                            <Plus size={18} />
                            Add Gear
                        </button>
                    )}
                </div>

                <div className="bg-[#080808] border border-white/5 rounded-[40px] overflow-hidden min-h-[500px]">
                    {view === 'products' ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-8 py-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">Product</th>
                                    <th className="px-8 py-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">Category</th>
                                    <th className="px-8 py-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">Price</th>
                                    <th className="px-8 py-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <AnimatePresence mode="popLayout">
                                    {(isAdding || editingId) && (
                                        <tr className="bg-orange-600/5">
                                            <td className="px-8 py-6">
                                                <input
                                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500 w-full mb-2"
                                                    placeholder="Product Name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                                <textarea
                                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-400 focus:outline-none focus:border-orange-500 w-full"
                                                    placeholder="Description"
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                />
                                            </td>
                                            <td className="px-8 py-6">
                                                <select
                                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                >
                                                    <option value="Equipment">Equipment</option>
                                                    <option value="Apparel">Apparel</option>
                                                    <option value="Essentials">Essentials</option>
                                                </select>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-orange-500">₹</span>
                                                    <input
                                                        type="number"
                                                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500 w-24"
                                                        value={formData.price}
                                                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex gap-2">
                                                    <button onClick={handleSave} className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors">
                                                        <Save size={18} />
                                                    </button>
                                                    <button onClick={() => { setEditingId(null); setIsAdding(false); }} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors">
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-white/[0.01] transition-all group">
                                            <td className="px-8 py-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/5 shrink-0 bg-white/5">
                                                        <img src={product.image} className="object-cover w-full h-full" alt="" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-black uppercase tracking-tight leading-none mb-2">{product.name}</h4>
                                                        <p className="text-gray-500 text-xs line-clamp-1 max-w-xs">{product.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-8">
                                                <span className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-8">
                                                <span className="text-white font-black text-lg">₹{product.price}</span>
                                            </td>
                                            <td className="px-8 py-8">
                                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleEdit(product)} className="text-gray-500 hover:text-orange-500 transition-colors">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(product.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-8 space-y-4">
                            {orders.length === 0 ? (
                                <div className="text-center py-20 text-white/30 text-sm font-bold uppercase tracking-widest">No orders found</div>
                            ) : orders.map((order) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={order.id}
                                    className="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-orange-600/30 transition-colors"
                                >
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500">
                                            <ShoppingBag size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-4 mb-1">
                                                <h4 className="text-white text-lg font-black uppercase tracking-tight">{order.customerName}</h4>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-xs mb-1">{order.customerEmail} • {order.customerPhone}</p>
                                            <p className="text-gray-400 text-xs">
                                                {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1 min-w-[150px]">
                                        <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Total Amount</span>
                                        <span className="text-white text-2xl font-black">₹{order.totalAmount}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                                        {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusUpdate(order.id, status)}
                                                disabled={order.status === status}
                                                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border ${order.status === status ? 'bg-white/10 text-white border-white/20' : 'text-gray-500 border-transparent hover:border-white/10 hover:bg-white/5'}`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default StoreManagement;
