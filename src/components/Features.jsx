import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, Leaf } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay }}
            className="flex flex-col items-center text-center p-8 group"
        >
            <div className="w-20 h-20 bg-sky-blue/30 rounded-2xl flex items-center justify-center mb-6 text-primary-blue group-hover:btn-gradient-blue transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2">
                <Icon size={32} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-semibold mb-3 tracking-wide">{title}</h3>
            <p className="text-gray-500 font-light leading-relaxed max-w-xs">{description}</p>
        </motion.div>
    );
};

const Features = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-3"
                    >
                        Why Justin Case
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tighter text-navy"
                    >
                        Engineered for the Everyday
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
                    <FeatureItem
                        icon={Shield}
                        title="Military Grade Protection"
                        description="Tested to withstand 10ft drops. Aramid fiber core absorbs impact so your phone doesn't have to."
                        delay={0.1}
                    />
                    <FeatureItem
                        icon={Zap}
                        title="Wireless Charging Compatible"
                        description="Ultra-slim profile allows for seamless MagSafe and Qi-certified wireless charging without removing the case."
                        delay={0.3}
                    />
                    <FeatureItem
                        icon={Leaf}
                        title="Eco-friendly Materials"
                        description="Crafted from 60% recycled ocean plastics. Protecting your phone and the planet simultaneously."
                        delay={0.5}
                    />
                </div>
            </div>

            {/* Decorative subtle lines */}
            <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-gray-100 to-transparent hidden md:block" />
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-gray-100 to-transparent hidden md:block" />
        </section>
    );
};

export default Features;
