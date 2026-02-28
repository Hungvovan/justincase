import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

// ─── OAuth placeholders ──────────────────────────────────────────────────────
// Replace with real credentials from Google Cloud Console / Facebook Developers
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';   // → set in main.jsx GoogleOAuthProvider
const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';
// ────────────────────────────────────────────────────────────────────────────

// Google icon SVG
const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
);

// Facebook icon SVG
const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const Login = () => {
    const { login, loginWithOAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [form, setForm] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState('');

    const validate = () => {
        const e = {};
        if (!form.email) e.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
        if (!form.password) e.password = 'Password is required.';
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
        await new Promise(r => setTimeout(r, 600));
        const result = login({ email: form.email, password: form.password });
        setIsLoading(false);
        if (result.ok) navigate(from, { replace: true });
        else setApiError(result.error);
    };

    // Real Google OAuth — fires consent screen when a valid clientId is set in main.jsx
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setOauthLoading('google');
            try {
                // Fetch basic profile from Google's userinfo endpoint
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const profile = await res.json();
                loginWithOAuth({
                    provider: 'google',
                    name: profile.name || profile.email.split('@')[0],
                    email: profile.email,
                    picture: profile.picture,
                });
                navigate(from, { replace: true });
            } catch {
                setApiError('Google sign-in failed. Please try again.');
            } finally {
                setOauthLoading('');
            }
        },
        onError: () => {
            // Fallback mock for dev (when no real Client ID is set)
            loginWithOAuth({ provider: 'google', name: 'Google User', email: 'demo.google@gmail.com' });
            navigate(from, { replace: true });
            setOauthLoading('');
        },
    });

    const handleFacebookLogin = () => {
        setOauthLoading('facebook');
        // Real FB SDK flow would open a popup; for now use mock login
        setTimeout(() => {
            loginWithOAuth({ provider: 'facebook', name: 'Facebook User', email: 'demo.facebook@fb.com' });
            setOauthLoading('');
            navigate(from, { replace: true });
        }, 800);
        // When FACEBOOK_APP_ID is real, replace with:
        // window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/facebook/callback')}&scope=email,public_profile`;
    };

    const inputClass = (field) =>
        `w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm font-medium text-navy placeholder-charcoal/30 bg-white/60 focus:outline-none focus:ring-2 focus:bg-white transition-all ${errors[field]
            ? 'border-red-300 focus:ring-red-200'
            : 'border-white/60 focus:border-sapphire-blue focus:ring-sapphire-blue/20'
        }`;

    return (
        <div className="min-h-screen flex flex-col lg:flex-row pt-[73px]">

            {/* ── Left Column: Lifestyle Image ─────────────────────────── */}
            <div className="relative w-full lg:w-1/2 h-56 sm:h-72 lg:h-auto lg:min-h-screen overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?auto=format&fit=crop&q=80&w=1400"
                    alt="Justin Case in use"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-sapphire-blue/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

                {/* Brand copy — hidden on xs, shown sm+ */}
                <div className="relative z-10 h-full hidden sm:flex flex-col justify-end p-10 lg:p-14">
                    <div className="w-12 h-[2px] bg-electric-blue mb-5" />
                    <h2 className="text-white text-3xl lg:text-4xl font-black tracking-tight leading-snug mb-4">
                        Military-grade protection<br />
                        <span className="text-electric-blue">starts here.</span>
                    </h2>
                    <p className="text-white/60 text-sm font-light max-w-xs leading-relaxed">
                        Sign in to manage your orders, save favourites, and access exclusive member pricing.
                    </p>

                    {/* Trust badges */}
                    <div className="flex items-center gap-6 mt-8">
                        {['MIL-STD-810G', 'MagSafe Ready', 'IP68 Rated'].map(badge => (
                            <span key={badge} className="text-[10px] font-black uppercase tracking-widest text-electric-blue/80 border border-electric-blue/30 px-3 py-1.5 rounded-full">
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Right Column: Form ────────────────────────────────────── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-sky-blue/40 via-white to-white px-6 py-12 lg:py-0">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full max-w-md"
                >
                    {/* Frosted glass card */}
                    <div className="bg-white/75 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_24px_64px_rgba(0,71,171,0.12)] p-8 sm:p-10">

                        {/* Header */}
                        <div className="mb-8">
                            <Link to="/" className="text-xl font-black tracking-tighter text-primary-blue">
                                JUSTIN CASE<span className="text-electric-blue">.</span>
                            </Link>
                            <h1 className="text-2xl font-black text-navy mt-4 mb-1">Welcome back</h1>
                            <p className="text-charcoal/50 text-sm font-light">Sign in to your account to continue.</p>
                        </div>

                        {/* API Error */}
                        {apiError && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-2xl mb-6"
                            >
                                <AlertCircle size={15} className="shrink-0" />
                                {apiError}
                            </motion.div>
                        )}

                        {/* ── OAuth Buttons ── */}
                        <div className="space-y-3 mb-6">
                            <button
                                onClick={() => { setOauthLoading('google'); handleGoogleLogin(); }}
                                disabled={!!oauthLoading}
                                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm py-3.5 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
                            >
                                {oauthLoading === 'google'
                                    ? <span className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                                    : <GoogleIcon />
                                }
                                Continue with Google
                            </button>

                            <button
                                onClick={handleFacebookLogin}
                                disabled={!!oauthLoading}
                                className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1565D8] text-white font-semibold text-sm py-3.5 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
                            >
                                {oauthLoading === 'facebook'
                                    ? <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    : <FacebookIcon />
                                }
                                Continue with Facebook
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-charcoal/10" />
                            <span className="text-xs font-bold text-charcoal/30 uppercase tracking-widest whitespace-nowrap">or continue with email</span>
                            <div className="flex-1 h-px bg-charcoal/10" />
                        </div>

                        {/* ── Email Form ── */}
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-black uppercase tracking-widest text-navy/50">Email</label>
                                <div className="relative group">
                                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30 group-focus-within:text-sapphire-blue transition-colors" />
                                    <input
                                        type="email" name="email" value={form.email}
                                        onChange={handleChange} placeholder="you@example.com"
                                        className={inputClass('email')}
                                    />
                                </div>
                                {errors.email && <p className="text-xs text-red-500 font-medium pl-1">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-black uppercase tracking-widest text-navy/50">Password</label>
                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-sapphire-blue hover:text-navy transition-colors"
                                        onClick={() => alert('Password reset link would be sent to your email.')}
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="relative group">
                                    <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30 group-focus-within:text-sapphire-blue transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'} name="password" value={form.password}
                                        onChange={handleChange} placeholder="Your password"
                                        className={`${inputClass('password')} pr-12`}
                                    />
                                    <button type="button" onClick={() => setShowPassword(s => !s)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-sapphire-blue transition-colors">
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-xs text-red-500 font-medium pl-1">{errors.password}</p>}
                            </div>

                            {/* Remember Me */}
                            <label className="flex items-center gap-3 cursor-pointer group select-none">
                                <div className="relative">
                                    <input
                                        type="checkbox" checked={rememberMe}
                                        onChange={e => setRememberMe(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-5 h-5 rounded-md border-2 border-charcoal/20 peer-checked:bg-sapphire-blue peer-checked:border-sapphire-blue transition-all flex items-center justify-center">
                                        {rememberMe && (
                                            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                                                <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm text-charcoal/60 group-hover:text-charcoal transition-colors font-medium">Remember me for 30 days</span>
                            </label>

                            {/* Submit */}
                            <button
                                type="submit" disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-navy to-sapphire-blue text-white font-bold py-4 rounded-2xl hover:shadow-[0_8px_30px_rgba(0,71,171,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mt-2"
                            >
                                {isLoading
                                    ? <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    : <><LogIn size={16} /> Sign In</>
                                }
                            </button>
                        </form>

                        <p className="text-center text-sm text-charcoal/50 mt-6">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-sapphire-blue font-bold hover:text-navy transition-colors">
                                Create one free
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
