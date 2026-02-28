import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, ArrowRight, ShoppingBag } from 'lucide-react';
import { Products, ProductAttributes, ProductPhotos } from '../data/mockDb';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') || '';

    const results = useMemo(() => {
        if (!query.trim()) return [];
        const lowerQuery = query.toLowerCase();
        return Products.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        );
    }, [query]);

    return (
        <div className="min-h-screen bg-white pt-[120px] pb-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 text-sapphire-blue mb-4">
                        <Search size={20} strokeWidth={2.5} />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Search Results</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy tracking-tighter leading-[1.1]">
                        {results.length > 0 ? (
                            <>Showing results for <span className="text-sapphire-blue">"{query}"</span></>
                        ) : (
                            <>No results for <span className="text-sapphire-blue">"{query}"</span></>
                        )}
                    </h1>
                    <p className="text-charcoal/40 text-lg font-light mt-4">
                        {results.length} premium cases found matching your criteria.
                    </p>
                </div>

                {/* Grid - Denser for a cleaner search experience */}
                {results.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
                        {results.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                attributes={ProductAttributes.filter(a => a.product_id === product.id)}
                                photos={ProductPhotos.filter(p => p.product_id === product.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-sky-blue/5 border border-sky-blue/10 rounded-[40px] p-12 lg:p-24 text-center">
                        <div className="w-20 h-20 bg-white shadow-xl rounded-3xl flex items-center justify-center text-sapphire-blue mx-auto mb-8">
                            <Search size={32} strokeWidth={2.5} />
                        </div>
                        <h2 className="text-3xl font-black text-navy mb-4 tracking-tighter">Try different keywords</h2>
                        <p className="text-charcoal/60 mb-10 text-lg font-light max-w-md mx-auto">
                            We couldn't find any products matching your search. Try searching for "Fabric", "Softcore", or "Sapphire".
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/shop" className="bg-gradient-to-r from-navy to-sapphire-blue text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-sapphire-blue/30 transition-all flex items-center gap-2 group">
                                Browse Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
