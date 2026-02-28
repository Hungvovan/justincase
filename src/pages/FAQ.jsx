import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className={`border-b border-sky-blue/20 last:border-0 transition-all duration-500 ${isOpen ? 'bg-sky-blue/5' : ''}`}>
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-8 px-8 text-left group"
            >
                <span className={`text-xl font-black tracking-tighter transition-colors duration-300 ${isOpen ? 'text-sapphire-blue' : 'text-navy group-hover:text-sapphire-blue'}`}>
                    {question}
                </span>
                <div className={`shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-sapphire-blue text-white rotate-180' : 'bg-sky-blue/10 text-sapphire-blue group-hover:bg-sapphire-blue group-hover:text-white'}`}>
                    <ChevronDown size={20} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="px-8 pb-8 text-charcoal/60 text-lg font-light leading-relaxed max-w-3xl">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "Does the case fit iPhone 13?",
            answer: "Yes, all our current case designs are fully compatible with iPhone 13, including the standard, Pro, and Pro Max variations. We ensure precision cutouts for all ports and button alignments."
        },
        {
            question: "How long is delivery?",
            answer: "Standard shipping typically takes 3-5 business days within metropolitan areas. High-priority shipping is available at checkout for 1-2 day delivery. International shipping varies by destination."
        },
        {
            question: "Can I check the goods before paying?",
            answer: "For COD (Cash on Delivery) orders, you are welcome to inspect the packaging and the product integrity before final payment. We pride ourselves on the build quality of our sapphire and fabric cases."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 7-day return period for any manufacturer defects. Please ensure the product is in its original packaging. For full details, please visit our dedicated Return Policy page."
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-[120px] pb-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
                    <div className="flex items-center justify-center gap-3 text-sapphire-blue mb-4">
                        <HelpCircle size={20} strokeWidth={2.5} />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Customer FAQ</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-navy tracking-tighter leading-[1.05] mb-6">
                        Your questions, <span className="text-sapphire-blue">answered.</span>
                    </h1>
                    <p className="text-charcoal/50 text-xl font-light leading-relaxed">
                        Find quick answers to common inquiries about our products, shipping, and specialized case technology.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="max-w-4xl mx-auto bg-white border border-sky-blue/20 rounded-[40px] shadow-2xl shadow-sky-blue/10 overflow-hidden">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>

                {/* Still have questions? */}
                <div className="mt-20 text-center">
                    <p className="text-charcoal/40 font-medium mb-6">Still have questions that aren't addressed here?</p>
                    <Link to="/contact" className="inline-flex items-center gap-3 bg-navy text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-sapphire-blue hover:shadow-2xl hover:shadow-sapphire-blue/20 hover:scale-105 transition-all duration-300">
                        Contact Support Team <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
