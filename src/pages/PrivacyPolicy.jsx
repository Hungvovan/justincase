import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Database, Share2, UserCheck, Cookie } from 'lucide-react';

const PrivacyPolicy = () => {
    const sections = [
        {
            icon: <Database size={20} />,
            title: "1. Information We Collect",
            content: "We collect various types of information in connection with the services we provide, including: Personal identification information (Name, email address, phone number, shipping address) and Payment information (processed securely through encrypted third-party gateways)."
        },
        {
            icon: <Eye size={20} />,
            title: "2. How We Use Your Data",
            content: "Justin Case uses your data to: Process your orders and manage your account, Email you with special offers on other products and services we think you might like (if you opted in), and Improve our website experience and product design based on usage analytics."
        },
        {
            icon: <Share2 size={20} />,
            title: "3. Sharing with Third Parties",
            content: "We do not sell your personal data. We share information only with trusted partners necessary to fulfill our service: Payment gateways (e.g., Stripe, PayPal) for secure transactions, and Shipping partners (e.g., FedEx, DHL) for order delivery."
        },
        {
            icon: <UserCheck size={20} />,
            title: "4. Your Data Rights",
            content: "You have the right to request copies of your personal data. You also have the right to request that we correct any information you believe is inaccurate or request that we erase your personal data, under certain conditions."
        },
        {
            icon: <Cookie size={20} />,
            title: "5. Cookie Policy",
            content: "Cookies are text files placed on your computer to collect standard Internet log information and visitor behavior information. When you visit our website, we may collect information from you automatically through cookies or similar technology."
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-[120px] pb-24 min-h-screen bg-white"
        >
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="mb-16 border-b border-sky-blue/20 pb-12">
                    <h1 className="text-5xl md:text-6xl font-black text-navy tracking-tighter leading-tight mb-6">
                        Privacy <span className="text-sapphire-blue">Policy.</span>
                    </h1>
                    <p className="text-charcoal/50 text-xl font-light">
                        Your privacy is our priority. This policy outlines how we protect and manage your personal data.
                    </p>
                </div>

                {/* Main Policy Content */}
                <div className="mb-12 p-8 bg-sapphire-blue text-white rounded-[32px] shadow-xl shadow-sapphire-blue/20">
                    <div className="flex gap-4 items-center mb-4">
                        <Shield size={32} className="text-sky-blue" />
                        <h2 className="text-2xl font-black uppercase tracking-tight">Data Protection Commitment</h2>
                    </div>
                    <p className="font-light leading-relaxed opacity-90">
                        At Justin Case, we implement industry-leading encryption and security protocols to ensure your data remains confidential and secure. We follow global standards for data protection and transparency.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-sapphire-blue/5 text-sapphire-blue flex items-center justify-center group-hover:bg-sapphire-blue group-hover:text-white transition-all duration-300">
                                    {section.icon}
                                </div>
                                <h2 className="text-xl font-black text-navy uppercase tracking-tight">
                                    {section.title}
                                </h2>
                            </div>
                            <div className="pl-14">
                                <p className="text-charcoal/70 leading-relaxed font-light text-lg">
                                    {section.content}
                                </p>
                            </div>
                        </motion.section>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <p className="text-charcoal/40 text-sm font-medium">
                        Need more information? Email us at <span className="text-navy font-bold">privacy@justincase.com</span>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default PrivacyPolicy;
