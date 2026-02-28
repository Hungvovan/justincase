import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, attributes, photos, isCompact = false }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const inWishlist = isInWishlist(product.id);

    // Determine default color attributes and photos
    const defaultAttributeId = attributes[0]?.id;
    const primaryPhotos = photos.filter(p => p.attribute_id === defaultAttributeId);

    const [isHovered, setIsHovered] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState(defaultAttributeId);
    const [isAdded, setIsAdded] = useState(false);

    // Get current photos based on selected color swatch
    const activePhotos = photos.filter(p => p.attribute_id === selectedAttribute);
    const activeFrontPhoto = activePhotos.find(p => p.angle === 'front') || primaryPhotos[0] || { image_url: '/images/default-product.png' };
    const activeSidePhoto = activePhotos.find(p => p.angle === 'side') || activeFrontPhoto;

    // Format currency
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(product.price);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigating to PDP if clicked Add
        e.stopPropagation();
        addToCart(product, 1);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group flex flex-col w-full bg-white rounded-[32px] overflow-hidden border-none shadow-sm card-blue-shadow transition-all duration-700 relative h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Contextual Badges Container */}
            <div className="absolute top-5 left-5 z-20 flex flex-col gap-2 pointer-events-none">
                {product.is_premium && (
                    <span className="bg-navy text-sky-blue text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        Premium
                    </span>
                )}
                {product.is_new && (
                    <span className="bg-sapphire-blue text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        New Drop
                    </span>
                )}
            </div>

            {/* Wishlist Icon */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                }}
                className={`absolute top-5 right-5 z-20 w-11 h-11 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-sm border border-white/40 ${inWishlist ? 'text-sapphire-blue scale-110' : 'text-navy/40 hover:text-sapphire-blue hover:scale-110'
                    }`}
            >
                <motion.div
                    animate={inWishlist ? { scale: [1, 1.4, 1] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    <Heart size={18} fill={inWishlist ? "currentColor" : "none"} strokeWidth={2.5} />
                </motion.div>
            </button>

            {/* Image Container: Link to PDP */}
            <Link to={`/product/${product.id}`} className="relative aspect-[1/1.1] bg-sky-blue/5 flex items-center justify-center p-8 overflow-hidden transition-colors duration-500 overflow-hidden">
                {/* Primary Image */}
                <img
                    src={activeFrontPhoto?.image_url || '/images/default-product.png'}
                    alt={activeFrontPhoto?.alt_text || product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform group-hover:scale-110"
                />

                {/* Secondary Image - Overlays and fades in on hover */}
                {activeSidePhoto && activeSidePhoto.id !== activeFrontPhoto.id && (
                    <img
                        src={activeSidePhoto?.image_url || '/images/default-product.png'}
                        alt={activeSidePhoto?.alt_text || `${product.name} back angle`}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-105"
                    />
                )}

                {/* Quick-view overlay */}
                <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="bg-white/95 backdrop-blur-md text-navy font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        View Details
                    </span>
                </div>
            </Link>

            {/* Product Details */}
            <div className={`${isCompact ? 'p-3' : 'p-4 sm:p-6'} flex flex-col flex-grow bg-white z-10`}>
                <div className="mb-2">
                    <p className="text-sapphire-blue font-black text-[8px] uppercase tracking-widest mb-1">{product.category}</p>
                    <Link to={`/product/${product.id}`} className="hover:text-sapphire-blue transition-colors">
                        <h3 className={`${isCompact ? 'text-sm' : 'text-base sm:text-lg lg:text-xl'} font-black text-navy tracking-tighter leading-tight line-clamp-2`}>{product.name}</h3>
                    </Link>
                </div>

                <p className={`${isCompact ? 'text-sm' : 'text-base sm:text-lg'} font-black text-navy/40 tracking-tighter mb-4 sm:mb-5`}>{formattedPrice}</p>

                {/* Color Swatches and Actions */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-sky-blue/20">
                    <div className="flex items-center gap-1.5">
                        {attributes.map(attr => (
                            <button
                                key={attr.id}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSelectedAttribute(attr.id);
                                }}
                                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300 ${selectedAttribute === attr.id
                                    ? 'border-sapphire-blue scale-125 ring-2 ring-sky-blue ring-offset-1 sm:ring-offset-2'
                                    : 'border-transparent hover:scale-110'
                                    }`}
                                style={{ backgroundColor: attr.color_hex }}
                                aria-label={`Select ${attr.color_name}`}
                                title={attr.color_name}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className={`group/btn flex items-center gap-1 px-3 py-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 ${isAdded
                            ? 'bg-emerald-500 text-white'
                            : 'bg-sapphire-blue/10 text-sapphire-blue hover:bg-sapphire-blue hover:text-white hover:shadow-xl hover:shadow-sapphire-blue/20'
                            }`}
                    >
                        {isAdded ? (
                            <Check size={isCompact ? 10 : 12} strokeWidth={3} />
                        ) : (
                            <ShoppingBag size={isCompact ? 10 : 12} strokeWidth={2.5} />
                        )}
                        {isAdded ? 'Added' : 'Add'}
                    </button>
                </div>
            </div>

            {/* Success Toast Overlay inside the card */}
            <AnimatePresence>
                {isAdded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-x-4 bottom-24 z-30 pointer-events-none"
                    >
                        <div className="bg-navy/95 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest py-3 px-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between">
                            <span>Item Added</span>
                            <div className="flex items-center gap-1 text-electric-blue">
                                <Link to="/cart" className="pointer-events-auto hover:underline uppercase tracking-widest">Go to Cart</Link>
                                <ArrowRight size={10} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProductCard;
