import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home as HomeIcon, Search, Heart, ShoppingBag, Send, Instagram, Twitter, Facebook, Menu, X, User, LogOut, UserPlus, ChevronDown } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { useWishlist, WishlistProvider } from './context/WishlistContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Technology from './pages/Technology';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import SearchResults from './pages/SearchResults';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ReturnPolicy from './pages/ReturnPolicy';
import FloatingSupport from './components/FloatingSupport';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Technology', path: '/technology' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/faq' },
];

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { wishlistItems, lastAction } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const policiesRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsSearchOpen(false);
    setIsPoliciesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (policiesRef.current && !policiesRef.current.contains(event.target)) {
        setIsPoliciesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-sapphire-blue after:transition-all ${isActive ? 'text-sapphire-blue after:w-full' : 'hover:text-sapphire-blue after:w-0 hover:after:w-full'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block text-2xl font-black tracking-tight py-4 border-b border-sky-blue/20 transition-colors ${isActive ? 'text-sapphire-blue' : 'text-navy hover:text-sapphire-blue'
    }`;

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0 font-sans text-charcoal">
      <ScrollToTop />

      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-5 md:px-12 flex justify-between items-center bg-white/90 backdrop-blur-lg border-b border-primary-blue/10 shadow-sm transition-all duration-300">
        <Link to="/" className="text-2xl font-black tracking-tighter text-primary-blue cursor-pointer whitespace-nowrap">
          JUSTIN CASE<span className="text-electric-blue">.</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden xl:flex gap-8 items-center text-sm font-bold text-charcoal tracking-wide">
          {NAV_LINKS.map((item) => (
            <NavLink key={item.name} to={item.path} end={item.path === '/'} className={navLinkClass}>
              {item.name}
            </NavLink>
          ))}

          {/* Policies Dropdown */}
          <div className="relative" ref={policiesRef}>
            <button
              onClick={() => setIsPoliciesOpen(!isPoliciesOpen)}
              className="flex items-center gap-1 hover:text-sapphire-blue transition-colors py-1"
            >
              Policies <ChevronDown size={14} className={`transition-transform duration-300 ${isPoliciesOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isPoliciesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-2 w-48 bg-white border border-sky-blue/20 shadow-xl rounded-2xl py-2 z-50 overflow-hidden"
                >
                  <Link to="/return-policy" className="block px-4 py-3 text-sm hover:bg-sky-blue/5 hover:text-sapphire-blue transition-colors">Return Policy</Link>
                  <Link to="/terms-of-service" className="block px-4 py-3 text-sm hover:bg-sky-blue/5 hover:text-sapphire-blue transition-colors">Terms of Service</Link>
                  <Link to="/privacy-policy" className="block px-4 py-3 text-sm hover:bg-sky-blue/5 hover:text-sapphire-blue transition-colors">Privacy Policy</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Icons & Actions */}
        <div className="flex gap-4 items-center">
          {/* Desktop Search */}
          <div className="hidden md:relative md:flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  onSubmit={handleSearchSubmit}
                  className="flex items-center overflow-hidden mr-2"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-sky-blue/10 border border-sky-blue/20 rounded-full py-2 pl-4 pr-4 text-xs font-medium text-navy focus:outline-none focus:border-sapphire-blue transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </motion.form>
              )}
            </AnimatePresence>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:scale-110 hover:text-navy transition-all p-2 rounded-full hover:bg-sky-blue text-primary-blue"
            >
              {isSearchOpen ? <X size={20} strokeWidth={2.5} /> : <Search size={20} strokeWidth={2.5} />}
            </button>
          </div>

          <Link to="/wishlist" className="hidden sm:block hover:scale-110 hover:text-navy transition-all p-2 rounded-full hover:bg-sky-blue text-primary-blue relative group">
            <motion.div
              animate={lastAction ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
              key={lastAction} // To trigger animation on each change
            >
              <Heart size={20} strokeWidth={2.5} className={wishlistItems.length > 0 ? 'text-sapphire-blue fill-sapphire-blue' : ''} />
            </motion.div>
            {wishlistItems.length > 0 && (
              <span className="absolute top-1 right-0 w-[16px] h-[16px] rounded-full bg-sapphire-blue text-white text-[9px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(0,71,171,0.3)]">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative hover:scale-110 transition-all cursor-pointer p-2 rounded-full hover:bg-sky-blue group">
            <ShoppingBag size={20} strokeWidth={2.5} className="text-primary-blue group-hover:text-navy" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-0 w-[18px] h-[18px] rounded-full bg-electric-blue text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_#00ffff99]">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User Section (Desktop Only) */}
          <div className="hidden md:block">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(o => !o)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-sapphire-blue/5 hover:bg-sapphire-blue/10 text-sapphire-blue font-bold text-xs transition-all border border-sapphire-blue/10"
                >
                  <div className="w-6 h-6 rounded-full bg-sapphire-blue text-white flex items-center justify-center text-[10px] font-black">
                    {user.username[0].toUpperCase()}
                  </div>
                  {user.username}
                </button>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-sky-blue/20 shadow-2xl rounded-2xl overflow-hidden py-1 z-50"
                    >
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors">
                        <LogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-xs font-bold text-sapphire-blue hover:text-navy px-4 py-2 rounded-full transition-all">Sign In</Link>
                <Link to="/register" className="text-xs font-bold text-white bg-sapphire-blue px-4 py-2 rounded-full transition-all shadow-sm">Register</Link>
              </div>
            )}
          </div>

          {/* Hamburger (Mobile/Tablet) */}
          <button
            className="xl:hidden p-2 text-navy"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[73px] left-0 w-full z-40 bg-white shadow-2xl px-6 py-8 xl:hidden max-h-[calc(100vh-73px)] overflow-y-auto"
          >
            <div className="max-w-sm mx-auto space-y-2">
              <form onSubmit={handleSearchSubmit} className="mb-6">
                <div className="relative">
                  <input
                    type="text" placeholder="Search..."
                    className="w-full bg-sky-blue/10 border border-sky-blue/20 rounded-2xl py-4 pl-12 pr-4 text-navy font-bold focus:outline-none focus:border-sapphire-blue transition-all"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-sapphire-blue" strokeWidth={2.5} />
                </div>
              </form>

              {NAV_LINKS.map((item) => (
                <NavLink key={item.name} to={item.path} end={item.path === '/'} className={mobileNavLinkClass}>
                  {item.name}
                </NavLink>
              ))}

              <Link to="/return-policy" className={mobileNavLinkClass}>Return Policy</Link>

              <div className="pt-8 space-y-4">
                {user ? (
                  <button onClick={handleLogout} className="w-full bg-red-50 text-red-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
                    <LogOut size={20} /> Logout
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <Link to="/login" className="flex-1 text-center font-bold text-sapphire-blue border border-sapphire-blue/20 py-4 rounded-2xl">Login</Link>
                    <Link to="/register" className="flex-1 text-center font-bold text-white bg-sapphire-blue py-4 rounded-2xl">Register</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>

      <FloatingSupport />

      {/* Footer */}
      <footer className="bg-navy text-sky-blue pt-16 pb-12 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="text-2xl font-black tracking-tighter text-white mb-6 inline-block">JUSTIN CASE<span className="text-electric-blue">.</span></Link>
            <p className="text-sky-blue/70 text-sm font-light leading-relaxed mb-6">Military-grade protection for the modern minimalist.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Facebook size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Customer Care</h4>
            <ul className="space-y-3 text-sm text-sky-blue/60 font-light">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/return-policy" className="hover:text-white transition-colors">Returns & Policies</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty Info</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-sky-blue/60 font-light">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/technology" className="hover:text-white transition-colors">Our Tech</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Sizing Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Subscribe</h4>
            <p className="text-sm text-sky-blue/60 font-light mb-4">Join our elite community for exclusive drops.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm outline-none focus:border-electric-blue transition-colors" />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-electric-blue text-navy rounded-full font-black text-[10px] uppercase">Join</button>
            </form>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto border-t border-white/5 pt-8 text-center md:text-left text-xs text-sky-blue/30 font-light">
          <p>&copy; {new Date().getFullYear()} Justin Case. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-sky-blue/10 z-50 px-6 py-4 flex justify-between items-center shadow-lg">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1.5 ${isActive ? 'text-primary-blue' : 'text-gray-400'}`}>
          <HomeIcon size={20} strokeWidth={2.5} /><span className="text-[9px] font-black uppercase tracking-widest">Home</span>
        </NavLink>
        <NavLink to="/shop" className={({ isActive }) => `flex flex-col items-center gap-1.5 ${isActive ? 'text-primary-blue' : 'text-gray-400'}`}>
          <Search size={20} strokeWidth={2.5} /><span className="text-[9px] font-black uppercase tracking-widest">Shop</span>
        </NavLink>
        <Link to="/cart" className="relative flex flex-col items-center gap-1.5 text-gray-400">
          <ShoppingBag size={20} strokeWidth={2.5} />
          {totalItems > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-electric-blue text-white text-[8px] font-bold flex items-center justify-center">{totalItems}</span>}
          <span className="text-[9px] font-black uppercase tracking-widest">Cart</span>
        </Link>
        {user ? (
          <button onClick={handleLogout} className="flex flex-col items-center gap-1.5 text-red-400">
            <LogOut size={20} strokeWidth={2.5} /><span className="text-[9px] font-black uppercase tracking-widest">Out</span>
          </button>
        ) : (
          <Link to="/login" className="flex flex-col items-center gap-1.5 text-gray-400">
            <User size={20} strokeWidth={2.5} /><span className="text-[9px] font-black uppercase tracking-widest">User</span>
          </Link>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </BrowserRouter>
  );
}

export default App;
