import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ShoppingBag, Star, Shield, Zap, Truck, Check, Plus, Minus, ArrowRight } from 'lucide-react';
import { Products, ProductAttributes, ProductPhotos } from '../data/mockDb';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = useMemo(() => Products.find(p => p.id === parseInt(id)), [id]);
    const attributes = useMemo(() => ProductAttributes.filter(a => a.product_id === parseInt(id)), [id]);
    const photos = useMemo(() => ProductPhotos.filter(p => p.product_id === parseInt(id)), [id]);

    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        if (photos.length > 0) {
            setSelectedPhoto(photos.find(p => p.is_primary) || photos[0]);
        }
        window.scrollTo(0, 0);
    }, [photos]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-black text-navy mb-4">Product Not Found</h1>
                <p className="text-charcoal/60 mb-8 text-lg font-light">The case you're looking for doesn't exist or has been discontinued.</p>
                <Link to="/shop" className="bg-sapphire-blue text-white px-8 py-4 rounded-full font-bold hover:bg-navy transition-all">
                    Back to Shop
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 3000);
    };

    return (
        <div className="min-h-screen bg-white pt-[90px] pb-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Breadcrumbs / Back Link */}
                <Link to="/shop" className="inline-flex items-center gap-2 text-charcoal/40 hover:text-sapphire-blue transition-colors font-bold text-sm mb-10 group">
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* ── Left: Image Gallery ─────────────────────────── */}
                    <div className="space-y-6">
                        <div className="aspect-square bg-sky-blue/10 rounded-[40px] overflow-hidden group relative">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedPhoto?.id}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    src={selectedPhoto?.image_url}
                                    alt={selectedPhoto?.alt_text || product.name}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Tags */}
                            <div className="absolute top-8 left-8 flex flex-col gap-2">
                                {product.is_new && (
                                    <span className="bg-electric-blue text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-electric-blue/30">New Drop</span>
                                )}
                                {product.is_premium && (
                                    <span className="bg-navy text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-navy/30">Premium</span>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                            {photos.map((photo) => (
                                <button
                                    key={photo.id}
                                    onClick={() => setSelectedPhoto(photo)}
                                    className={`relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${selectedPhoto?.id === photo.id
                                            ? 'border-sapphire-blue scale-95 shadow-lg'
                                            : 'border-transparent hover:border-sky-blue opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img src={photo.image_url} alt={photo.alt_text} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Product Info ─────────────────────────── */}
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sapphire-blue font-black text-xs uppercase tracking-[0.2em]">{product.category}</span>
                                <span className="w-1 h-1 rounded-full bg-charcoal/20" />
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-sm font-black mt-0.5">4.9 (124 reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy tracking-tighter leading-[1.1] mb-6">
                                {product.name}
                            </h1>
                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="text-4xl font-black text-sapphire-blue tracking-tighter">${product.price}</span>
                                {product.is_premium && <span className="text-charcoal/30 line-through text-xl font-light">$89.99</span>}
                            </div>
                            <p className="text-charcoal/60 text-lg font-light leading-relaxed max-w-xl">
                                {product.description}
                            </p>
                        </div>

                        {/* Specs / Features Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {[
                                { icon: Shield, title: 'Military Grade', text: '10ft drop rated' },
                                { icon: Zap, title: 'MagSafe Ready', text: '3.0 Built-in magnets' },
                                { icon: Truck, title: 'Free Delivery', text: 'Orders over $100' },
                                { icon: Check, title: 'Lifetime Warranty', text: 'Against yellowing' }
                            ].map((spec, i) => (
                                <div key={i} className="flex flex-col p-5 bg-sky-blue/5 border border-sky-blue/10 rounded-3xl">
                                    <spec.icon size={20} className="text-sapphire-blue mb-3" />
                                    <h4 className="text-sm font-black text-navy mb-1 uppercase tracking-wider">{spec.title}</h4>
                                    <p className="text-xs text-charcoal/50 font-medium">{spec.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="space-y-8 mt-auto">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                {/* Quantity */}
                                <div className="flex items-center bg-white border-2 border-sky-blue/20 rounded-2xl p-2 px-4 h-[64px]">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 hover:bg-sky-blue/10 rounded-xl transition-colors text-navy disabled:opacity-30"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus size={18} strokeWidth={3} />
                                    </button>
                                    <span className="w-12 text-center text-lg font-black text-navy">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 hover:bg-sky-blue/10 rounded-xl transition-colors text-navy"
                                    >
                                        <Plus size={18} strokeWidth={3} />
                                    </button>
                                </div>

                                {/* Add To Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-1 h-[64px] rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ${isAdded
                                            ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30'
                                            : 'bg-gradient-to-r from-navy to-sapphire-blue text-white hover:shadow-2xl hover:shadow-sapphire-blue/40 hover:-translate-y-1 active:translate-y-0'
                                        }`}
                                >
                                    {isAdded ? (
                                        <><Check size={20} strokeWidth={3} /> Added to Bag</>
                                    ) : (
                                        <><ShoppingBag size={20} strokeWidth={2.5} /> Add to Cart — ${(product.price * quantity).toFixed(2)}</>
                                    )}
                                </button>
                            </div>

                            {/* Toast Notification Container (Relative to button for MVP) */}
                            <AnimatePresence>
                                {isAdded && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="flex items-center justify-between gap-4 p-4 bg-navy text-white rounded-2xl shadow-2xl border border-white/10"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                                                <img src={selectedPhoto?.image_url} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-electric-blue">Added to Cart</p>
                                                <p className="text-sm font-bold truncate max-w-[200px]">{product.name}</p>
                                            </div>
                                        </div>
                                        <Link to="/cart" className="shrink-0 flex items-center gap-1.5 text-xs font-black text-white hover:text-electric-blue transition-colors group">
                                            View Cart <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
