import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale, FileText, Lock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
    const sections = [
        {
            icon: <Globe size={20} />,
            title: "1. Acceptance of Terms",
            content: "By accessing or using the Justin Case website and services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services."
        },
        {
            icon: <Lock size={20} />,
            title: "2. User Account Obligations",
            content: "To access certain features of the service, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during the registration process."
        },
        {
            icon: <FileText size={20} />,
            title: "3. Product Descriptions & Pricing",
            content: "Justin Case attempts to be as accurate as possible in product descriptions. However, we do not warrant that product descriptions or other content are accurate, complete, reliable, current, or error-free. Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice."
        },
        {
            icon: <Scale size={20} />,
            title: "4. Return & Refund Policy",
            content: "Your purchase is governed by our Return & Refund Policy. Please review our policy carefully to understand your rights and our obligations. You can find the full policy at ",
            link: { text: "Return Policy", path: "/return-policy" }
        },
        {
            icon: <ShieldCheck size={20} />,
            title: "5. Limitation of Liability",
            content: "Justin Case shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service."
        },
        {
            icon: <Scale size={20} />,
            title: "6. Governing Law",
            content: "These Terms shall be governed and construed in accordance with the laws of Vietnam, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
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
                        Terms of <span className="text-sapphire-blue">Service.</span>
                    </h1>
                    <p className="text-charcoal/50 text-xl font-light">
                        Last updated: March 1, 2026. Please read these terms carefully before using our platform.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
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
                                    {section.link && (
                                        <Link to={section.link.path} className="text-sapphire-blue font-bold hover:underline">
                                            {section.link.text}.
                                        </Link>
                                    )}
                                </p>
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-24 p-8 bg-sky-blue/5 rounded-[32px] border border-sky-blue/10">
                    <p className="text-charcoal/60 text-sm font-medium leading-relaxed italic text-center">
                        If you have any questions regarding these Terms of Service, please contact our legal department at <span className="text-sapphire-blue font-black">legal@justincase.com</span>.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default TermsOfService;
