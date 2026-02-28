import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Calendar, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PolicySection = ({ icon, title, children }) => (
    <div className="flex gap-8 group">
        <div className="w-14 h-14 rounded-3xl bg-sky-blue/10 flex items-center justify-center text-sapphire-blue shrink-0 group-hover:bg-sapphire-blue group-hover:text-white transition-all duration-500 shadow-sm">
            {icon}
        </div>
        <div>
            <h3 className="text-2xl font-black text-navy mb-4 tracking-tighter">{title}</h3>
            <div className="text-charcoal/60 text-lg font-light leading-relaxed space-y-4">
                {children}
            </div>
        </div>
    </div>
);

const ReturnPolicy = () => {
    return (
        <div className="min-h-screen bg-white pt-[120px] pb-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Back Link */}
                <Link to="/faq" className="inline-flex items-center gap-2 text-sapphire-blue font-bold text-sm mb-12 hover:translate-x-[-4px] transition-transform">
                    <ArrowLeft size={16} /> Back to FAQ
                </Link>

                {/* Header */}
                <div className="mb-16 md:mb-24 max-w-3xl">
                    <div className="flex items-center gap-3 text-sapphire-blue mb-4">
                        <ShieldAlert size={20} strokeWidth={2.5} />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Legal & Support</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-navy tracking-tighter leading-[1.05] mb-6">
                        Return <span className="text-sapphire-blue">Policy.</span>
                    </h1>
                    <p className="text-charcoal/50 text-xl font-light leading-relaxed">
                        At Justin Case, we stand by our engineering. If your product isn't perfect, we're here to make it right.
                    </p>
                </div>

                {/* Policies Content */}
                <div className="max-w-5xl space-y-20 lg:space-y-32">

                    <PolicySection icon={<Calendar size={24} />} title="7-Day Defect Warranty">
                        <p>
                            We offer a comprehensive 7-day return window from the date of delivery specifically for any <span className="text-navy font-bold">manufacturer defects</span>. This includes issues with the sapphire lens integrity, fabric stitching, or MagSafe alignment failures.
                        </p>
                        <p>
                            To initiate a return, please contact our support team with your order number and clear photos of the defect.
                        </p>
                    </PolicySection>

                    <PolicySection icon={<XCircle size={24} />} title="Exclusions & Conditions">
                        <p>
                            Please note that we cannot accept returns for products that have been damaged due to regular usage, accidental drops, or customer negligence.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex gap-3 items-center">
                                <CheckCircle2 size={18} className="text-sapphire-blue shrink-0" />
                                <span>Scratches, dents, or discolorations caused by the user.</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <CheckCircle2 size={18} className="text-sapphire-blue shrink-0" />
                                <span>Intentional stress-testing or thermal damage.</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <CheckCircle2 size={18} className="text-sapphire-blue shrink-0" />
                                <span>Missing original packaging or authentication cards.</span>
                            </li>
                        </ul>
                    </PolicySection>

                    {/* Final CTA */}
                    <div className="bg-navy rounded-[40px] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                        <div className="relative z-10 text-center md:text-left">
                            <h2 className="text-3xl font-black tracking-tighter mb-4">Need to start a return?</h2>
                            <p className="text-sky-blue/60 font-light max-w-sm">Contact our specialist team to identify and resolve your case issues immediately.</p>
                        </div>
                        <Link to="/contact" className="relative z-10 bg-white text-navy px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-electric-blue hover:text-white transition-all duration-300">
                            Start Return Request
                        </Link>
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-sapphire-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReturnPolicy;
