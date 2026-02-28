import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Check, PackageX, ListFilter } from 'lucide-react';
import { Products, ProductAttributes, ProductPhotos } from '../data/mockDb';
import ProductCard from './ProductCard';

const ProductGallery = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high
    const [isSortOpen, setIsSortOpen] = useState(false);

    const sortDropdownRef = useRef(null);

    const categories = ['All', ...Array.from(new Set(Products.map(p => p.category)))];

    // Simulate network fetch
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, [activeCategory, sortBy]); // Re-trigger skeleton on heavy filter changes for effect

    // Click outside to close sort dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [sortDropdownRef]);

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...Products];

        // Search
        if (searchQuery) {
            result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // Category
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        // Sort
        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else {
            // Featured priority: premium first, then best-sellers
            result.sort((a, b) => (b.is_premium ? 1 : 0) - (a.is_premium ? 1 : 0));
        }

        return result;
    }, [Products, searchQuery, activeCategory, sortBy]);

    // Skeleton Component
    const SkeletonCard = () => (
        <div className="flex flex-col w-full bg-white rounded-3xl overflow-hidden border-none shadow-sm animate-pulse">
            <div className="relative aspect-square bg-gray-200"></div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="mt-auto flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                </div>
            </div>
        </div>
    );

    const sortOptions = [
        { id: 'featured', label: 'Featured' },
        { id: 'price-low', label: 'Price: Low to High' },
        { id: 'price-high', label: 'Price: High to Low' },
    ];

    return (
        <section id="shop" className="py-24 bg-gray-50/50 min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header Area */}
                <div className="mb-12 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tighter text-navy mb-4"
                    >
                        Collection
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-charcoal/70 max-w-2xl font-light"
                    >
                        Precision-mapped cases engineered for impact. Discover your device's ultimate companion.
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Floating Sidebar Filter */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-8">

                            {/* Search */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Search size={18} strokeWidth={2} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search gear..."
                                    className="w-full pl-10 pr-4 py-3 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary-blue focus:outline-none transition-all text-sm font-medium text-navy placeholder-gray-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                    <ListFilter size={14} /> Categories
                                </h3>
                                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 text-left ${activeCategory === cat
                                                ? 'btn-gradient-blue transform scale-[1.02]'
                                                : 'bg-transparent text-charcoal/60 hover:bg-sky-blue/30'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Main Gallery Area */}
                    <div className="flex-1 flex flex-col min-h-[500px]">

                        {/* Toolbar (Results count & Sort) */}
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-primary-blue/10">
                            <p className="text-sm font-medium text-charcoal/60">
                                Showing <span className="text-primary-blue font-black">{filteredAndSortedProducts.length}</span> results
                            </p>

                            {/* Custom Sort Dropdown */}
                            <div className="relative z-30" ref={sortDropdownRef}>
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 text-sm font-bold text-navy hover:text-primary-blue transition-colors py-2 px-3 rounded-lg hover:bg-sky-blue/30"
                                >
                                    Sort by: <span className="text-primary-blue">{sortOptions.find(o => o.id === sortBy)?.label}</span>
                                    <ChevronDown size={16} className={`transform transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isSortOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-56 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden py-2"
                                        >
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option.id}
                                                    onClick={() => { setSortBy(option.id); setIsSortOpen(false); }}
                                                    className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-sky-blue/30 flex items-center justify-between transition-colors text-charcoal hover:text-primary-blue"
                                                >
                                                    {option.label}
                                                    {sortBy === option.id && <Check size={16} className="text-electric-blue" />}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Grid Content */}
                        <div className="relative flex-1">
                            {isLoading ? (
                                // Skeletons Grid
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                                    {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                                </div>
                            ) : filteredAndSortedProducts.length === 0 ? (
                                // Empty State
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white rounded-3xl border border-dashed border-gray-200"
                                >
                                    <div className="w-24 h-24 bg-sky-blue/30 rounded-full flex items-center justify-center mb-6 text-primary-blue/30">
                                        <PackageX size={48} strokeWidth={1} />
                                    </div>
                                    <h3 className="text-2xl font-black text-navy mb-2">No gear found</h3>
                                    <p className="text-charcoal/60 max-w-sm mb-8 text-center leading-relaxed">
                                        We couldn't find any products matching your current filters. Try adjusting your search or category.
                                    </p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                                        className="btn-gradient-blue px-6 py-3 rounded-full font-bold"
                                    >
                                        Clear all filters
                                    </button>
                                </motion.div>
                            ) : (
                                // Dynamic CSS Grid
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12"
                                >
                                    {filteredAndSortedProducts.map((product) => {
                                        const attributes = ProductAttributes.filter(a => a.product_id === product.id);
                                        const photos = ProductPhotos.filter(p => p.product_id === product.id);
                                        return (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                attributes={attributes}
                                                photos={photos}
                                            />
                                        );
                                    })}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductGallery;
