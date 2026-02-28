import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, ShieldCheck, RefreshCw, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductPhotos } from '../data/mockDb';

const Cart = () => {
    const { cartItems, cartTotal, totalItems, updateQuantity, removeFromCart } = useCart();

    const shipping = cartTotal > 100 || totalItems === 0 ? 0 : 15;
    const tax = cartTotal * 0.1; // 10% tax for demo
    const grandTotal = cartTotal + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-[90px] flex flex-col items-center justify-center p-6 text-center bg-white">
                <div className="w-24 h-24 bg-sky-blue/10 rounded-full flex items-center justify-center mb-8 text-sapphire-blue">
                    <ShoppingBag size={40} />
                </div>
                <h1 className="text-4xl font-black text-navy mb-4 tracking-tighter">Your Bag is Empty</h1>
                <p className="text-charcoal/60 mb-10 text-lg font-light max-w-md">
                    Looks like you haven't added any premium protection to your collection yet.
                </p>
                <Link to="/shop" className="group bg-gradient-to-r from-navy to-sapphire-blue text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-sapphire-blue/30 transition-all flex items-center gap-2">
                    Start Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-[90px] pb-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* ── Left: Cart Items ───────────────────────────── */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between border-b border-sky-blue/20 pb-8 mb-8">
                            <h1 className="text-4xl font-black text-navy tracking-tighter flex items-center gap-4">
                                Shopping Bag
                                <span className="text-lg font-light text-charcoal/30">({totalItems} items)</span>
                            </h1>
                            <Link to="/shop" className="text-sm font-black text-sapphire-blue hover:text-navy transition-colors uppercase tracking-widest flex items-center gap-2 group">
                                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
                            </Link>
                        </div>

                        <div className="space-y-10">
                            <AnimatePresence mode="popLayout">
                                {cartItems.map((item) => {
                                    const primaryPhoto = ProductPhotos.find(p => p.product_id === item.id && p.is_primary)?.image_url;
                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="flex flex-col sm:flex-row gap-8 items-start sm:items-center"
                                        >
                                            {/* Product Image */}
                                            <Link to={`/product/${item.id}`} className="w-full sm:w-32 aspect-square bg-sky-blue/10 rounded-3xl overflow-hidden shrink-0 group">
                                                <img
                                                    src={primaryPhoto}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </Link>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row justify-between gap-4">
                                                    <div>
                                                        <p className="text-sapphire-blue font-black text-[10px] uppercase tracking-widest mb-1">{item.category}</p>
                                                        <Link to={`/product/${item.id}`} className="hover:text-sapphire-blue transition-colors">
                                                            <h3 className="text-xl font-black text-navy truncate tracking-tight">{item.name}</h3>
                                                        </Link>
                                                        <p className="text-sm text-charcoal/40 font-medium mt-1">In Stock. Ships in 24h.</p>
                                                    </div>
                                                    <div className="text-right sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
                                                        <p className="text-xl font-black text-navy tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                                                        <p className="text-xs text-charcoal/40 font-bold">${item.price} each</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-6">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center bg-white border border-sky-blue/20 rounded-xl p-1 px-3">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1.5 hover:bg-sky-blue/10 rounded-lg transition-colors text-charcoal hover:text-navy disabled:opacity-20"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus size={14} strokeWidth={3} />
                                                        </button>
                                                        <span className="w-10 text-center text-sm font-black text-navy">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1.5 hover:bg-sky-blue/10 rounded-lg transition-colors text-charcoal hover:text-navy"
                                                        >
                                                            <Plus size={14} strokeWidth={3} />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="flex items-center gap-2 text-charcoal/40 hover:text-red-500 transition-colors text-xs font-black uppercase tracking-widest"
                                                    >
                                                        <Trash2 size={14} /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* ── Right: Order Summary ────────────────────────── */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-sky-blue/5 border border-sky-blue/10 rounded-[40px] p-8 lg:p-10 sticky top-[120px]">
                            <h2 className="text-2xl font-black text-navy mb-8 tracking-tighter">Order Summary</h2>

                            <div className="space-y-5 mb-8 text-sm">
                                <div className="flex justify-between font-bold text-charcoal/60">
                                    <span>Subtotal</span>
                                    <span className="text-navy">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-charcoal/60">
                                    <div className="flex items-center gap-2">
                                        Shipping
                                        {shipping === 0 && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">Free</span>}
                                    </div>
                                    <span className="text-navy">{shipping === 0 ? '$0.00' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between font-bold text-charcoal/60">
                                    <span>Sales Tax (10%)</span>
                                    <span className="text-navy">${tax.toFixed(2)}</span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-[11px] font-bold text-sapphire-blue uppercase tracking-wider bg-sapphire-blue/5 p-3 rounded-2xl text-center">
                                        Add ${(100 - cartTotal).toFixed(2)} more for <span className="text-navy">Free Express Shipping</span>
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-sky-blue/20 pt-8 mb-10">
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-black text-navy uppercase tracking-tighter">Total</span>
                                    <div className="text-right">
                                        <p className="text-4xl font-black text-sapphire-blue tracking-tighter leading-none">${grandTotal.toFixed(2)}</p>
                                        <p className="text-[10px] font-bold text-charcoal/30 uppercase mt-2">VAT Included where applicable</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-5 rounded-full bg-gradient-to-r from-navy to-sapphire-blue text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-sapphire-blue/40 hover:scale-[1.02] active:scale-100 transition-all flex items-center justify-center gap-3 group">
                                Checkout Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Trust Badges */}
                            <div className="mt-10 grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center text-center p-3 bg-white/50 rounded-3xl border border-sky-blue/5">
                                    <ShieldCheck size={20} className="text-sapphire-blue mb-2" />
                                    <p className="text-[10px] font-black uppercase text-navy">Secure Pay</p>
                                </div>
                                <div className="flex flex-col items-center text-center p-3 bg-white/50 rounded-3xl border border-sky-blue/5">
                                    <RefreshCw size={20} className="text-sapphire-blue mb-2" />
                                    <p className="text-[10px] font-black uppercase text-navy">Easy Return</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
