import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail, MapPin, PhoneCall, Layers, Zap } from 'lucide-react';

const About = () => {
    const values = [
        {
            title: "Clean Aesthetics",
            description: "Minimalism is not about nothing. It's about just enough to keep the focus where it belongs: on your life.",
            image: "https://images.unsplash.com/photo-1621330396167-f3ebf2bf8f4a?auto=format&fit=crop&q=80&w=1200"
        },
        {
            title: "Witty Protection",
            description: "Our cases are built to be smart. We design for every possible 'just in case' scenario with precision engineering.",
            image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1200"
        },
        {
            title: "Global Resilience",
            description: "From NYC subways to mountain trails. Justin Case isn't just gear; it's a companion for the adventurous modern spirit.",
            image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=1200"
        }
    ];

    return (
        <div className="pt-32 pb-20 bg-white min-h-screen">
            {/* Story Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-16 md:mb-32">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <div className="w-16 h-[2px] bg-primary-blue mb-8 shadow-[0_0_10px_#0066ff88]" />
                    <h1 className="text-xs font-black uppercase tracking-[0.6em] text-primary-blue mb-8">The Philosophy</h1>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-navy mb-12 font-serif lowercase italic leading-[1.1]">The art of <span className="text-primary-blue not-italic font-sans uppercase tracking-tighter">unseen protection.</span></h2>

                    <div className="space-y-8">
                        <p className="text-charcoal/70 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                            Established in 2025, Justin Case emerged as a definitive response to the vulnerability of modern technology. Our vision was clear: to craft a shield that feels as premium as the device it guards.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-sky-blue/30 rounded-2xl text-primary-blue shadow-sm">
                                    <Layers size={22} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-navy uppercase tracking-widest mb-1">3K Carbon Fiber</h4>
                                    <p className="text-xs text-charcoal/50 font-bold leading-relaxed">Aviation-grade rigidity for structural dominance.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-sky-blue/30 rounded-2xl text-primary-blue shadow-sm">
                                    <Zap size={22} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-navy uppercase tracking-widest mb-1">N52 Magnets</h4>
                                    <p className="text-xs text-charcoal/50 font-bold leading-relaxed">High-density neodymium for flawless MagSafe unity.</p>
                                </div>
                            </div>
                        </div>

                        <p className="border-l-2 border-primary-blue/30 pl-6 text-charcoal/60 text-base font-medium leading-relaxed max-w-xl italic">
                            "We build for the perfectionist who demands military reliability without sacrificing a centimeter of minimalism."
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="relative aspect-[3/4] rounded-[4rem] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,102,255,0.2)]"
                >
                    <img
                        src="https://images.unsplash.com/photo-1512446813931-437843d67046?auto=format&fit=crop&q=80&w=1200"
                        alt="Lifestyle brand story"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/default-product.png';
                        }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy/60 to-transparent flex items-end p-12">
                        <div className="text-white">
                            <h4 className="text-3xl font-black font-serif italic mb-2 tracking-tight">Justin Case</h4>
                            <p className="text-sky-blue uppercase text-[10px] font-black tracking-widest leading-loose">Where the future is mapped.</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Values Grid */}
            <div className="bg-sky-blue/20 py-16 md:py-32 mb-16 md:mb-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[3rem] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 group"
                        >
                            <h3 className="text-2xl font-black text-navy mb-6 group-hover:text-primary-blue transition-colors font-serif italic">{v.title}</h3>
                            <p className="text-charcoal/60 font-medium leading-relaxed mb-8">{v.description}</p>
                            <div className="w-full aspect-video rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                <img
                                    src={v.image}
                                    className="w-full h-full object-cover transform scale-125 group-hover:scale-100 transition-transform duration-1000"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/images/default-product.png';
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Contact Preview Section */}
            <div className="max-w-3xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-black text-navy mb-12 font-serif lowercase italic">Want to join the mission?</h2>
                <div className="flex flex-col md:flex-row gap-8 justify-center">
                    <a href="mailto:hello@justincase.com" className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary-blue hover:text-navy transition-colors">
                        <Mail size={16} /> hello@justincase.com
                    </a>
                    <a href="#" className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary-blue hover:text-navy transition-colors">
                        <Instagram size={16} /> @justincase.muse
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
