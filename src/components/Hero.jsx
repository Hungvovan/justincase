import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    // Staggered text reveal variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white pt-28 md:pt-48 pb-20">
            {/* Light/Clean Background Image/Video rather than pure black */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1621330396167-f3ebf2bf8f4a?auto=format&fit=crop&q=80&w=2400"
                    alt="Cinematic background"
                    className="w-full h-full object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white via-sky-blue/20 to-white overflow-hidden" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Side: Art Direction Typography */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-start justify-center"
                >
                    <motion.div variants={itemVariants} className="mb-4 flex items-center gap-4">
                        <div className="w-12 h-[2px] bg-primary-blue" />
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-primary-blue uppercase">
                            The New Standard
                        </span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-navy leading-tight mb-6 md:mb-8 font-serif lowercase italic">
                        Protect your tech,<br />
                        <span className="text-primary-blue not-italic font-sans uppercase tracking-tighter">just in case.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-sm md:text-base text-charcoal/60 mb-8 md:mb-12 max-w-md font-medium leading-relaxed tracking-wide">
                        Military-grade engineering for the modern minimalist. Designed in the city, built for the elements.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <button className="btn-gradient-blue px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest">
                            Shop iPhone 15 Pro
                        </button>
                        <button className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-navy border-b border-navy/20 pb-1 hover:border-primary-blue transition-all">
                            View Tech Specs
                        </button>
                    </motion.div>
                </motion.div>

                {/* Right Side: Cinematic Product Shot Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                    className="relative flex items-center justify-center p-10"
                >
                    {/* Floating Product Image (Using a representative high-end iPhone 15 Pro shot) */}
                    <div className="relative z-20 w-full max-w-[500px] aspect-[4/5] overflow-hidden rounded-[3rem] shadow-[0_50px_100px_-20px_#0066ff33] group">
                        <img
                            src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1200"
                            alt="iPhone 15 Pro Max Rugged Case"
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                        />
                        {/* Subtle Logo Etching Simulation */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-[0.5em] text-white/20 uppercase pointer-events-none">
                            JUSTIN CASE
                        </div>
                        {/* Glass Overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent pointer-events-none" />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -z-10 w-[120%] h-[120%] bg-sky-blue/20 blur-[100px] rounded-full" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
