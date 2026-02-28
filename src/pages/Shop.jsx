import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ChevronDown, ShoppingBag, X } from 'lucide-react';
import { Products, ProductAttributes, ProductPhotos } from '../data/mockDb';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Featured');
    const [priceRange, setPriceRange] = useState(100);

    const categories = ['All', ...new Set(Products.map(p => p.category))];

    const filteredProducts = useMemo(() => {
        return Products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesPrice = product.price <= priceRange;
            return matchesSearch && matchesCategory && matchesPrice;
        }).sort((a, b) => {
            if (sortBy === 'Price: Low to High') return a.price - b.price;
            if (sortBy === 'Price: High to Low') return b.price - a.price;
            return 0; // Featured or default
        });
    }, [searchQuery, selectedCategory, sortBy, priceRange]);

    return (
        <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto min-h-screen">
            {/* Page Header */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 font-serif">Justin Case Store</h1>
                <p className="text-charcoal/60 font-medium max-w-xl">
                    Explore our collection of military-grade, minimalist phone cases. Engineered for impact, designed for the modern lifestyle.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Filter */}
                <aside className="w-full lg:w-64 space-y-10">
                    {/* Search Input */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-navy mb-4">Search</h3>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 group-focus-within:text-primary-blue transition-colors" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Find your gear..."
                                className="w-full bg-sky-blue/20 border border-transparent focus:border-primary-blue/30 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all font-medium text-navy placeholder-charcoal/30 shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-navy/40 mb-6 font-sans">Explore Collections</h3>
                        <div className="space-y-3">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`w-full text-left px-5 py-3 rounded-2xl text-sm font-black transition-all duration-300 flex items-center justify-between group 
                                    ${selectedCategory === cat
                                            ? 'bg-sapphire-blue text-white shadow-[0_10px_20px_-5px_rgba(0,71,171,0.4)] scale-[1.02]'
                                            : 'text-charcoal/40 hover:bg-sky-blue/50 hover:text-sapphire-blue hover:scale-[1.03] hover:translate-x-1'
                                        }`}
                                >
                                    <span className="tracking-tight">{cat}</span>
                                    {selectedCategory === cat && (
                                        <motion.div layoutId="activeCat" className="w-1.5 h-1.5 bg-white rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-navy mb-4">Max Price: ${priceRange}</h3>
                        <input
                            type="range"
                            min="20"
                            max="100"
                            value={priceRange}
                            onChange={(e) => setPriceRange(parseInt(e.target.value))}
                            className="w-full accent-primary-blue cursor-pointer h-1.5 bg-sky-blue/50 rounded-lg appearance-none"
                        />
                        <div className="flex justify-between mt-2 text-[10px] font-black text-charcoal/40 uppercase tracking-widest">
                            <span>$20</span>
                            <span>$100</span>
                        </div>
                    </div>
                </aside>

                {/* Product Grid Area */}
                <div className="flex-1">
                    {/* Grid Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-sky-blue/20">
                        <div className="text-xs font-black text-charcoal/40 uppercase tracking-[0.2em]">
                            Showing <span className="text-primary-blue">{filteredProducts.length}</span> results
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-navy">Sort by:</span>
                            <div className="relative bg-sky-blue/30 px-4 py-2 rounded-full cursor-pointer hover:bg-sky-blue/50 transition-colors flex items-center gap-2 text-xs font-bold text-navy">
                                {sortBy}
                                <ChevronDown size={14} />
                                <select
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option>Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    attributes={ProductAttributes.filter(a => a.product_id === product.id)}
                                    photos={ProductPhotos.filter(p => p.product_id === product.id)}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <div className="py-24 flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-sky-blue/30 rounded-full flex items-center justify-center mb-6">
                                <Search size={40} className="text-primary-blue opacity-50" />
                            </div>
                            <h2 className="text-2xl font-black text-navy mb-2">No gear found</h2>
                            <p className="text-charcoal/60 mb-8 max-w-xs">We couldn't find any products matching your current filters.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('All');
                                    setPriceRange(100);
                                }}
                                className="btn-gradient-blue px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
