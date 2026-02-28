import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductGallery from '../components/ProductGallery';
import Features from '../components/Features';

const Home = () => {
    return (
        <>
            <Hero />
            <div className="space-y-0">
                <FeaturedProducts />
                <ProductGallery />
                <Features />
            </div>
        </>
    );
};

export default Home;
