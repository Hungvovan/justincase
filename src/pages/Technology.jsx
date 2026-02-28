import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Layers, Cpu, Wind, Droplets } from 'lucide-react';

const Technology = () => {
    const sections = [
        {
            icon: Shield,
            title: "Military-Grade Bumper",
            description: "Shock-absorbent TPU and polycarbonate layers dissipate energy from drops up to 15 feet. Certified to exceed MIL-STD-810G standards.",
            color: "bg-primary-blue",
            image: "https://images.unsplash.com/photo-1621330396167-f3ebf2bf8f4a?auto=format&fit=crop&q=80&w=1200"
        },
        {
            icon: Zap,
            title: "MagSafe Optimized",
            description: "A ring of 38 N52 neodymium magnets ensures perfect alignment for lightning-fast wireless charging and secure accessory attachment.",
            color: "bg-electric-blue",
            image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=1200"
        },
        {
            icon: Layers,
            title: "Carbon Fiber Plate",
            description: "A rigid back panel made from 100% aviation-grade 3K carbon fiber adds structural strength while remaining incredibly thin.",
            color: "bg-navy",
            image: "https://images.unsplash.com/photo-1550505393-5c46f1a0911a?auto=format&fit=crop&q=80&w=1200"
        }
    ];

    return (
        <div className="pt-32 pb-20 bg-white">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                >
                    <div className="w-16 h-[1px] bg-primary-blue mb-6" />
                    <h1 className="text-xs font-black uppercase tracking-[0.6em] text-primary-blue mb-6">Internal Anatomy</h1>
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-navy mb-8 font-serif lowercase italic">Built to be invincible.</h2>
                    <p className="text-charcoal/60 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                        Precision-mapped engineering meets the ultimate materials science. Explore how Justin Case protects your world.
                    </p>
                </motion.div>
            </div>

            {/* Scroll-Triggered Storytelling */}
            <div className="space-y-20 md:space-y-48 mb-20 md:mb-48">
                {sections.map((section, idx) => (
                    <div key={idx} className={`max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                        <motion.div
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`${idx % 2 !== 0 ? 'lg:order-2' : ''}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl ${section.color} flex items-center justify-center text-white mb-8 shadow-2xl`}>
                                <section.icon size={28} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-navy mb-6 tracking-tight leading-tight">{section.title}</h3>
                            <p className="text-charcoal/60 text-lg font-medium leading-relaxed mb-8">{section.description}</p>
                            <div className="flex items-center gap-4 text-xs font-black text-primary-blue tracking-widest uppercase">
                                <span className="w-10 h-[1px] bg-primary-blue/30" />
                                Engineered Innovation
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: idx % 2 === 0 ? 5 : -5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }}
                            className={`relative aspect-square rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,102,255,0.15)] ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}
                        >
                            <img
                                src={section.image}
                                alt={section.title}
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/images/default-product.png';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent flex items-end p-12">
                                <div className="text-[8px] font-black uppercase tracking-[0.5em] text-white/50">Internal Component View V.3.1</div>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Technical Grid */}
            <div className="bg-sky-blue/20 py-16 md:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-navy mb-4">Ultimate Specs</h2>
                        <p className="text-charcoal/60 font-medium">No compromises. Ever.</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Droplets, title: "Hydro-Coating", value: "S-Grade Nano Layer" },
                            { icon: Cpu, title: "AI Alignment", value: "Laser Precision" },
                            { icon: Wind, title: "Heat Dissipation", value: "Hex-Internal Grid" },
                            { icon: Zap, title: "Wireless Speed", value: "25W Certified" }
                        ].map((spec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-sky-blue/30 text-center flex flex-col items-center hover:shadow-xl transition-shadow"
                            >
                                <spec.icon className="text-primary-blue mb-6" size={32} />
                                <h4 className="text-xs font-black text-charcoal/40 uppercase tracking-widest mb-2">{spec.title}</h4>
                                <p className="text-lg font-bold text-navy">{spec.value}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Technology;
