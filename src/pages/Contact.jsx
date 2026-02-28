import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, PhoneCall, CheckCircle, Facebook } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    const inputClass = "w-full bg-sky-blue/5 border border-sky-blue/10 rounded-2xl py-4 px-6 text-navy placeholder-charcoal/30 focus:outline-none focus:border-sapphire-blue focus:ring-4 focus:ring-sapphire-blue/5 transition-all transition-all duration-300";

    return (
        <div className="min-h-screen bg-white pt-[120px] pb-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="mb-16 md:mb-24 max-w-2xl">
                    <div className="flex items-center gap-3 text-sapphire-blue mb-4">
                        <MessageCircle size={20} strokeWidth={2.5} />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Contact Us</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-navy tracking-tighter leading-[1.05] mb-6">
                        We're here to <span className="text-sapphire-blue">help.</span>
                    </h1>
                    <p className="text-charcoal/50 text-xl font-light leading-relaxed">
                        Have a question about our technology or need help with an order? Our support team is available 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">

                    {/* Left: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-sky-blue/5 border border-sky-blue/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-500/20">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h2 className="text-3xl font-black text-navy mb-4">Message Sent!</h2>
                                    <p className="text-charcoal/60 font-medium">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-8 text-sapphire-blue font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-navy/50 ml-1">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Justin Case"
                                            className={inputClass}
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-navy/50 ml-1">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="hello@example.com"
                                            className={inputClass}
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-navy/50 ml-1">Message</label>
                                        <textarea
                                            required
                                            rows="5"
                                            placeholder="How can we help you?"
                                            className={`${inputClass} resize-none`}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-navy to-sapphire-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-2xl hover:shadow-sapphire-blue/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <><Send size={18} /> Send Message</>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Right: Company Info & Support */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div>
                            <h3 className="text-2xl font-black text-navy mb-8 tracking-tighter">Global Headquarters</h3>
                            <div className="space-y-8">
                                <div className="flex gap-6 items-start group">
                                    <div className="w-12 h-12 rounded-2xl bg-sky-blue/10 flex items-center justify-center text-sapphire-blue shrink-0 group-hover:bg-sapphire-blue group-hover:text-white transition-all duration-500">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-navy/30 mb-1">Hotline</p>
                                        <p className="text-xl font-bold text-navy">+84 123 456 789</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start group">
                                    <div className="w-12 h-12 rounded-2xl bg-sky-blue/10 flex items-center justify-center text-sapphire-blue shrink-0 group-hover:bg-sapphire-blue group-hover:text-white transition-all duration-500">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-navy/30 mb-1">Address</p>
                                        <p className="text-xl font-bold text-navy leading-snug">123 JustinCase St, Tech City,<br />Vietnam</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start group">
                                    <div className="w-12 h-12 rounded-2xl bg-sky-blue/10 flex items-center justify-center text-sapphire-blue shrink-0 group-hover:bg-sapphire-blue group-hover:text-white transition-all duration-500">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-navy/30 mb-1">Support Email</p>
                                        <p className="text-xl font-bold text-navy leading-snug">support@justincase.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Instant Chat */}
                        <div>
                            <h3 className="text-xl font-black text-navy mb-6 tracking-tighter">Instant Support</h3>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { name: 'Messenger', icon: <Facebook size={18} />, color: 'bg-[#0084FF]' },
                                    { name: 'Zalo', icon: <MessageCircle size={18} />, color: 'bg-[#0068FF]' },
                                    { name: 'WhatsApp', icon: <PhoneCall size={18} />, color: 'bg-[#25D366]' }
                                ].map(chat => (
                                    <button
                                        key={chat.name}
                                        className={`flex items-center gap-3 px-6 py-4 rounded-full text-white font-bold text-sm transition-all hover:scale-110 shadow-lg ${chat.color}`}
                                    >
                                        {chat.icon}
                                        <span>{chat.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
