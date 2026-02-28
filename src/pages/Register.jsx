import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const passwordRules = [
    { label: 'At least 8 characters', test: v => v.length >= 8 },
    { label: 'One uppercase letter', test: v => /[A-Z]/.test(v) },
    { label: 'One number', test: v => /\d/.test(v) },
];

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.username.trim()) e.username = 'Username is required.';
        else if (form.username.trim().length < 3) e.username = 'Username must be at least 3 characters.';

        if (!form.email) e.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';

        const failedRules = passwordRules.filter(r => !r.test(form.password));
        if (!form.password) e.password = 'Password is required.';
        else if (failedRules.length) e.password = `Password must meet all requirements.`;

        if (!form.confirm) e.confirm = 'Please confirm your password.';
        else if (form.confirm !== form.password) e.confirm = 'Passwords do not match.';

        return e;
    };

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
        setErrors(er => ({ ...er, [e.target.name]: '' }));
        setApiError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setIsLoading(true);
        await new Promise(r => setTimeout(r, 700));
        const result = register({ username: form.username.trim(), email: form.email, password: form.password });
        setIsLoading(false);

        if (result.ok) {
            navigate('/', { replace: true });
        } else {
            setApiError(result.error);
        }
    };

    const inputClass = (field) =>
        `w-full pl-10 pr-4 py-3.5 rounded-2xl border text-sm font-medium text-navy placeholder-charcoal/30 focus:outline-none focus:ring-2 transition-all ${errors[field]
            ? 'border-red-300 bg-red-50 focus:ring-red-200'
            : 'border-sky-blue/40 bg-sky-blue/10 focus:border-sapphire-blue focus:ring-sapphire-blue/20 focus:bg-white'
        }`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-blue/30 via-white to-white flex items-center justify-center px-4 pt-24 pb-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,71,171,0.12)] border border-sky-blue/20 overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-navy via-sapphire-blue to-primary-blue px-10 py-10 text-center relative overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-electric-blue/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                        <Link to="/" className="inline-block text-2xl font-black tracking-tighter text-white mb-4 relative z-10">
                            JUSTIN CASE<span className="text-electric-blue">.</span>
                        </Link>
                        <p className="text-white/70 text-sm font-light relative z-10">Create your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-10 py-10 space-y-5" noValidate>

                        {apiError && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-2xl"
                            >
                                <AlertCircle size={16} className="shrink-0" />
                                {apiError}
                            </motion.div>
                        )}

                        {/* Username */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-navy/50">Username</label>
                            <div className="relative group">
                                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30 group-focus-within:text-sapphire-blue transition-colors" />
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="your_handle"
                                    className={inputClass('username')}
                                />
                            </div>
                            {errors.username && <p className="text-xs text-red-500 font-medium pl-1">{errors.username}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-navy/50">Email Address</label>
                            <div className="relative group">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30 group-focus-within:text-sapphire-blue transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={inputClass('email')}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 font-medium pl-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-navy/50">Password</label>
                            <div className="relative group">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30 group-focus-within:text-sapphire-blue transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    placeholder="Create a strong password"
                                    className={`${inputClass('password')} pr-12`}
                                />
                                <button type="button" onClick={() => setShowPassword(s => !s)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-sapphire-blue transition-colors">
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-500 font-medium pl-1">{errors.password}</p>}

                            {/* Password Strength Checklist */}
                            {(passwordFocused || form.password) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-2 space-y-1.5 px-1"
                                >
                                    {passwordRules.map(rule => {
                                        const passed = rule.test(form.password);
                                        return (
                                            <div key={rule.label} className={`flex items-center gap-2 text-xs font-medium transition-colors ${passed ? 'text-green-600' : 'text-charcoal/40'}`}>
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${passed ? 'bg-green-500' : 'bg-charcoal/10'}`}>
                                                    {passed && <Check size={10} strokeWidth={3} className="text-white" />}
                                                </div>
                                                {rule.label}
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-navy/50">Confirm Password</label>
                            <div className="relative group">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30 group-focus-within:text-sapphire-blue transition-colors" />
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    name="confirm"
                                    value={form.confirm}
                                    onChange={handleChange}
                                    placeholder="Repeat your password"
                                    className={`${inputClass('confirm')} pr-12`}
                                />
                                <button type="button" onClick={() => setShowConfirm(s => !s)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-sapphire-blue transition-colors">
                                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.confirm && <p className="text-xs text-red-500 font-medium pl-1">{errors.confirm}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-navy to-sapphire-blue text-white font-bold py-4 rounded-2xl hover:shadow-[0_8px_30px_rgba(0,71,171,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mt-2"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <UserPlus size={17} /> Create Account
                                </>
                            )}
                        </button>

                        <p className="text-center text-sm text-charcoal/50 pt-2">
                            Already have an account?{' '}
                            <Link to="/login" className="text-sapphire-blue font-bold hover:text-navy transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
