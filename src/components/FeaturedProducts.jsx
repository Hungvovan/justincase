import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap } from 'lucide-react';
import { Products, ProductAttributes, ProductPhotos } from '../data/mockDb';
import ProductCard from './ProductCard';

// Curate 6 products: best-sellers first, then premiums
const FEATURED_IDS = [4, 7, 11, 1, 9, 5];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const FeaturedProducts = () => {
    const featuredProducts = FEATURED_IDS
        .map(id => Products.find(p => p.id === id))
        .filter(Boolean);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <span className="inline-flex items-center gap-1.5 bg-sapphire-blue/10 text-sapphire-blue text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                                <Star size={11} fill="currentColor" /> Best Sellers
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 }}
                            className="text-4xl md:text-5xl font-black tracking-tighter text-navy"
                        >
                            Customer Favourites
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-charcoal/60 font-light mt-3 max-w-md"
                        >
                            The cases our customers keep coming back for — curated by real-world demand.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                    >
                        <Link
                            to="/shop"
                            className="group inline-flex items-center gap-2 bg-sapphire-blue text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-navy transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,71,171,0.4)] hover:scale-[1.02]"
                        >
                            Shop All Cases
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12"
                >
                    {featuredProducts.map((product, index) => {
                        const attributes = ProductAttributes.filter(a => a.product_id === product.id);
                        const photos = ProductPhotos.filter(p => p.product_id === product.id);
                        return (
                            <motion.div key={product.id} variants={cardVariants}>
                                <ProductCard
                                    product={product}
                                    attributes={attributes}
                                    photos={photos}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-20 rounded-3xl bg-gradient-to-r from-navy via-sapphire-blue to-primary-blue p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
                >
                    {/* Decorative blobs */}
                    <div className="absolute -top-10 -right-10 w-60 h-60 bg-electric-blue/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <Zap size={16} className="text-electric-blue" fill="currentColor" />
                            <span className="text-electric-blue text-xs font-black uppercase tracking-widest">Limited Drop</span>
                        </div>
                        <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight mb-2">
                            New Season. New Armour.
                        </h3>
                        <p className="text-white/70 font-light max-w-sm">
                            Explore 13 premium designs built for real life. Every case, every drop, handled.
                        </p>
                    </div>
                    <Link
                        to="/shop"
                        className="relative z-10 shrink-0 inline-flex items-center gap-2 bg-white text-navy font-bold text-sm px-8 py-4 rounded-full hover:bg-electric-blue hover:text-white transition-all duration-300 hover:scale-[1.04] shadow-xl"
                    >
                        Explore Full Collection <ArrowRight size={16} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default FeaturedProducts;
