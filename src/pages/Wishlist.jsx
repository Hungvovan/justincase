import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductAttributes, ProductPhotos } from '../data/mockDb';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleMoveToCart = (product) => {
        addToCart(product, 1);
        removeFromWishlist(product.id);
    };

    return (
        <div className="pt-[120px] pb-24 min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 text-sapphire-blue mb-4">
                        <Heart size={20} strokeWidth={2.5} fill="currentColor" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Your Favorites</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-navy tracking-tighter leading-[1.05] mb-6">
                        Personal <span className="text-sapphire-blue">Collection.</span>
                    </h1>
                    <p className="text-charcoal/50 text-xl font-light leading-relaxed max-w-2xl">
                        A curated list of your favorite Justin Case gear. Move them to your cart when you're ready for military-grade protection.
                    </p>
                </div>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        <AnimatePresence mode="popLayout">
                            {wishlistItems.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                    className="relative flex flex-col pt-5"
                                >
                                    <ProductCard
                                        product={product}
                                        attributes={ProductAttributes.filter(a => a.product_id === product.id)}
                                        photos={ProductPhotos.filter(p => p.product_id === product.id)}
                                        isCompact={true}
                                    />

                                    {/* Action footer */}
                                    <div className="mt-4 flex gap-3">
                                        <button
                                            onClick={() => handleMoveToCart(product)}
                                            className="flex-1 bg-navy text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-sapphire-blue transition-all flex items-center justify-center gap-2"
                                        >
                                            <ShoppingBag size={14} /> Move to Cart
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="w-14 h-14 bg-sky-blue/10 text-navy/30 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all flex items-center justify-center"
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-32 flex flex-col items-center text-center"
                    >
                        <div className="w-24 h-24 bg-sky-blue/5 rounded-full flex items-center justify-center mb-8">
                            <Heart size={40} className="text-navy/10" />
                        </div>
                        <h2 className="text-3xl font-black text-navy mb-4">Your wishlist is empty</h2>
                        <p className="text-charcoal/50 mb-10 max-w-sm">Save your favorite gear here to keep track of what you love most.</p>
                        <Link
                            to="/shop"
                            className="bg-sapphire-blue text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:shadow-2xl hover:shadow-sapphire-blue/30 transition-all hover:scale-105"
                        >
                            Explore Shop <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
