import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Facebook, PhoneCall, HelpCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingSupport = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLabel, setShowLabel] = useState(false);

    useEffect(() => {
        // Show the "Chat with us" label after a short delay
        const timer = setTimeout(() => setShowLabel(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const chatOptions = [
        { name: 'Messenger', icon: <Facebook size={18} />, color: 'bg-[#0084FF]', link: '#' },
        { name: 'Zalo Support', icon: <MessageCircle size={18} />, color: 'bg-[#0068FF]', link: '#' },
        { name: 'WhatsApp', icon: <PhoneCall size={18} />, color: 'bg-[#25D366]', link: '#' },
        { name: 'View FAQ', icon: <HelpCircle size={18} />, color: 'bg-navy', link: '/faq' },
    ];

    return (
        <div className="fixed bottom-24 md:bottom-8 right-6 z-[100] flex flex-col items-end">

            {/* Expansion Dashboard */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-72 bg-white rounded-[32px] shadow-[0_24px_64px_rgba(0,71,171,0.25)] border border-sky-blue/20 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-br from-navy to-sapphire-blue p-6 text-white">
                            <h3 className="text-lg font-black tracking-tight mb-1">Instant Support</h3>
                            <p className="text-xs text-white/70 font-light italic">Average response time: 5 mins</p>
                        </div>

                        {/* Options */}
                        <div className="p-4 space-y-3">
                            {chatOptions.map((opt) => (
                                <Link
                                    key={opt.name}
                                    to={opt.link}
                                    onClick={() => opt.link !== '#' && setIsOpen(false)}
                                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-sky-blue/5 transition-all group"
                                >
                                    <div className={`w-10 h-10 rounded-xl ${opt.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                        {opt.icon}
                                    </div>
                                    <span className="text-sm font-bold text-navy">{opt.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="bg-sky-blue/10 p-4 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-navy/40">Powered by Justin Case Engineers</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <div className="relative group">
                <AnimatePresence>
                    {showLabel && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full border border-sky-blue/20 shadow-xl whitespace-nowrap pointer-events-none"
                        >
                            <span className="text-xs font-black text-navy uppercase tracking-widest">Chat with us</span>
                            {/* Arrow */}
                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { setIsOpen(!isOpen); setShowLabel(false); }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 overflow-hidden ${isOpen ? 'bg-navy rotate-90' : 'bg-gradient-to-br from-sapphire-blue to-electric-blue'
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <X size={28} strokeWidth={2.5} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative"
                            >
                                <MessageCircle size={28} strokeWidth={2.5} />
                                {/* Pulsing indicator */}
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
};

export default FloatingSupport;
