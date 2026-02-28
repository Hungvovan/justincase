// Mock Database mapping the user's requested SQL schema
// (Products, ProductAttributes, ProductPhotos)

export const Products = [
    // ── Original 5 ──────────────────────────────────────────────────────────
    {
        id: 1,
        name: 'Justin Case Fabric — Slate Linen',
        price: 49.99,
        description: 'Elite protection wrapped in premium slate linen fabric. A tactile masterpiece for the modern professional.',
        is_premium: true,
        category: 'Fabric Case',
        is_new: true,
        is_best_seller: false,
        units_in_stock: 12,
    },
    {
        id: 2,
        name: 'Justin Case Softcore — Matte Mist',
        price: 39.99,
        description: 'Ultra-soft silicone with a liquid-repellent matte finish. Sleek, invisible protection.',
        is_premium: false,
        category: 'Softcore Case',
        is_new: false,
        is_best_seller: true,
        units_in_stock: 0,
    },
    {
        id: 3,
        name: 'Justin Case JustClear — Crystal Armor',
        price: 54.99,
        description: 'Bionic-grade transparency with 99.9% anti-yellowing technology. Maximum drop protection.',
        is_premium: true,
        category: 'JustClear Case',
        is_new: false,
        is_best_seller: false,
        units_in_stock: 5,
    },
    {
        id: 4,
        name: 'Justin Case Softcore — Midnight Silk',
        price: 29.99,
        description: 'Deep midnight silicone with a silk-touch texture. Balanced protection for daily use.',
        is_premium: false,
        category: 'Softcore Case',
        is_new: false,
        is_best_seller: true,
        units_in_stock: 25,
    },
    {
        id: 5,
        name: 'Justin Case Fabric — Indigo Denim',
        price: 59.99,
        description: 'Rugged indigo denim fused with a high-impact core. Engineered for the extreme.',
        is_premium: true,
        category: 'Fabric Case',
        is_new: true,
        is_best_seller: false,
        units_in_stock: 8,
    },

    // ── New Products (6–13) ──────────────────────────────────────────────────
    {
        id: 6,
        name: 'Justin Case JustClear — Phantom Void',
        price: 64.99,
        description: 'Near-invisible clarity meets reactive impact-dispersion tech. Your phone, amplified — not hidden.',
        is_premium: true,
        category: 'JustClear Case',
        is_new: true,
        is_best_seller: false,
        units_in_stock: 7,
    },
    {
        id: 7,
        name: 'Justin Case Fabric — Ash Canvas',
        price: 44.99,
        description: 'Woven ash-tone canvas with micro-fiber lining. Rugged meets refined in every stitch.',
        is_premium: false,
        category: 'Fabric Case',
        is_new: false,
        is_best_seller: true,
        units_in_stock: 20,
    },
    {
        id: 8,
        name: 'Justin Case Softcore — Blush Dust',
        price: 34.99,
        description: 'Velvet-soft blush silicone that absorbs shock without making a scene. Protection in pastels.',
        is_premium: false,
        category: 'Softcore Case',
        is_new: true,
        is_best_seller: false,
        units_in_stock: 18,
    },
    {
        id: 9,
        name: 'Justin Case JustClear — Frost Shield',
        price: 49.99,
        description: 'Frosted anti-glare clarity with military-grade corner shields. Your screen\'s best bodyguard.',
        is_premium: false,
        category: 'JustClear Case',
        is_new: false,
        is_best_seller: true,
        units_in_stock: 14,
    },
    {
        id: 10,
        name: 'Justin Case Fabric — Burnt Sienna',
        price: 59.99,
        description: 'Heritage burnt-sienna tweed with carbon-fiber inner core. Bold colour, brutal toughness.',
        is_premium: true,
        category: 'Fabric Case',
        is_new: false,
        is_best_seller: false,
        units_in_stock: 9,
    },
    {
        id: 11,
        name: 'Justin Case Softcore — Arctic Haze',
        price: 29.99,
        description: 'Cool arctic-grey silicone with a frosted grip boost. The everyday essential, perfected.',
        is_premium: false,
        category: 'Softcore Case',
        is_new: false,
        is_best_seller: true,
        units_in_stock: 30,
    },
    {
        id: 12,
        name: 'Justin Case JustClear — Sapphire Lens',
        price: 69.99,
        description: 'Sapphire-coated optical clarity and self-healing back panel. Scratch resistance meets beauty.',
        is_premium: true,
        category: 'JustClear Case',
        is_new: true,
        is_best_seller: false,
        units_in_stock: 4,
    },
    {
        id: 13,
        name: 'Justin Case Fabric — Storm Weave',
        price: 54.99,
        description: 'Charcoal storm-grey weave with aramid fiber construction. Weatherproof, boardroom-ready.',
        is_premium: false,
        category: 'Fabric Case',
        is_new: true,
        is_best_seller: false,
        units_in_stock: 11,
    },
];

export const ProductAttributes = [
    // ── Original Attributes ──────────────────────────────────────────────────
    { id: 1, product_id: 1, color_name: 'Charcoal Gray', color_hex: '#36454F', material: 'Aramid Fiber' },
    { id: 2, product_id: 1, color_name: 'Starlight Silver', color_hex: '#E5E4E2', material: 'Aramid Fiber' },
    { id: 3, product_id: 2, color_name: 'Matte Black', color_hex: '#28282B', material: 'Polycarbonate' },

    // ── New Attributes ───────────────────────────────────────────────────────
    { id: 4, product_id: 6, color_name: 'Crystal Clear', color_hex: '#E8F4FD', material: 'Polycarbonate + TPU' },
    { id: 5, product_id: 7, color_name: 'Ash Gray', color_hex: '#B2BEB5', material: 'Woven Canvas + TPU' },
    { id: 6, product_id: 7, color_name: 'Ivory Canvas', color_hex: '#F5F0E8', material: 'Woven Canvas + TPU' },
    { id: 7, product_id: 8, color_name: 'Blush Pink', color_hex: '#FFB6C1', material: 'Liquid Silicone' },
    { id: 8, product_id: 8, color_name: 'Rose Lavender', color_hex: '#DDA0DD', material: 'Liquid Silicone' },
    { id: 9, product_id: 9, color_name: 'Frosted White', color_hex: '#F8F8FF', material: 'Matte PC + TPU' },
    { id: 10, product_id: 10, color_name: 'Burnt Sienna', color_hex: '#E97451', material: 'Tweed + Carbon Fiber' },
    { id: 11, product_id: 11, color_name: 'Arctic Gray', color_hex: '#D3D8E0', material: 'Liquid Silicone' },
    { id: 12, product_id: 11, color_name: 'Steel Blue', color_hex: '#4682B4', material: 'Liquid Silicone' },
    { id: 13, product_id: 12, color_name: 'Sapphire Blue', color_hex: '#0F52BA', material: 'Self-Healing PC' },
    { id: 14, product_id: 13, color_name: 'Storm Charcoal', color_hex: '#4A4E57', material: 'Aramid Weave' },
    { id: 15, product_id: 13, color_name: 'Slate Indigo', color_hex: '#6A5ACD', material: 'Aramid Weave' },
];

export const ProductPhotos = [
    // ── Original Photos ──────────────────────────────────────────────────────
    {
        id: 1, product_id: 1, attribute_id: 1,
        // Fabric case — dark textured phone case on iPhone
        image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Fabric Slate Linen — Charcoal', is_primary: true, angle: 'front'
    },
    {
        id: 2, product_id: 1, attribute_id: 1,
        // Fabric case — phone with case in hand, lifestyle
        image_url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Fabric Slate Linen — Lifestyle', is_primary: false, angle: 'side'
    },
    {
        id: 3, product_id: 1, attribute_id: 2,
        // Fabric case — light/silver toned phone case
        image_url: 'https://images.unsplash.com/photo-1605201100110-4b2c7b5e1b2f?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Fabric Slate Linen — Starlight', is_primary: true, angle: 'front'
    },
    {
        id: 4, product_id: 2, attribute_id: 3,
        // Softcore matte black silicone case
        image_url: '/images/products/matte-mist-front.png',
        alt_text: 'Justin Case Softcore Matte Mist', is_primary: true, angle: 'front'
    },
    {
        id: 21, product_id: 2, attribute_id: 3,
        // Lifestyle shot of matte black case
        image_url: '/images/products/matte-mist-lifestyle.png',
        alt_text: 'Justin Case Softcore Matte Mist — Lifestyle', is_primary: false, angle: 'side'
    },
    {
        id: 5, product_id: 4, attribute_id: 1,
        // Softcore midnight/dark silicone case on phone
        image_url: 'https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Softcore Midnight Silk', is_primary: true, angle: 'front'
    },
    {
        id: 6, product_id: 5, attribute_id: 1,
        // Fabric denim-style phone case, blue tones
        image_url: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Fabric Indigo Denim', is_primary: true, angle: 'front'
    },
    {
        id: 7, product_id: 5, attribute_id: 1,
        // Back angle of phone in fabric case
        image_url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Fabric Indigo Denim — Back', is_primary: false, angle: 'side'
    },

    // ── New Product Photos ───────────────────────────────────────────────────
    {
        id: 8, product_id: 3, attribute_id: 1,
        // JustClear — transparent/clear iPhone case
        image_url: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case JustClear Crystal Armor', is_primary: true, angle: 'front'
    },
    {
        id: 9, product_id: 6, attribute_id: 4,
        // JustClear Phantom — ultra-clear case on black phone
        image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case JustClear Phantom Void', is_primary: true, angle: 'front'
    },
    {
        id: 10, product_id: 7, attribute_id: 5,
        // Fabric Ash Canvas — grey woven phone case
        image_url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Fabric Ash Canvas — Gray', is_primary: true, angle: 'front'
    },
    {
        id: 11, product_id: 7, attribute_id: 6,
        // Fabric Ash Canvas — ivory/cream phone case
        image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Fabric Ash Canvas — Ivory', is_primary: true, angle: 'front'
    },
    {
        id: 12, product_id: 8, attribute_id: 7,
        // Softcore Blush — pink silicone phone case
        image_url: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Softcore Blush Dust — Pink', is_primary: true, angle: 'front'
    },
    {
        id: 13, product_id: 8, attribute_id: 8,
        // Softcore Blush — lavender silicone phone case
        image_url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Softcore Blush Dust — Lavender', is_primary: true, angle: 'front'
    },
    {
        id: 14, product_id: 9, attribute_id: 9,
        // JustClear Frost Shield — frosted matte clear case
        image_url: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case JustClear Frost Shield', is_primary: true, angle: 'front'
    },
    {
        id: 15, product_id: 10, attribute_id: 10,
        // Fabric Burnt Sienna — phone case
        image_url: '/images/products/burnt-sienna-front.png',
        alt_text: 'Justin Case Fabric Burnt Sienna', is_primary: true, angle: 'front'
    },
    {
        id: 22, product_id: 10, attribute_id: 10,
        // Lifestyle shot of burnt sienna fabric case
        image_url: '/images/products/burnt-sienna-lifestyle.png',
        alt_text: 'Justin Case Fabric Burnt Sienna — Lifestyle', is_primary: false, angle: 'side'
    },
    {
        id: 16, product_id: 11, attribute_id: 11,
        // Softcore Arctic Haze — cool grey silicone phone case
        image_url: 'https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Softcore Arctic Haze — Gray', is_primary: true, angle: 'front'
    },
    {
        id: 17, product_id: 11, attribute_id: 12,
        // Softcore Arctic Haze — steel blue silicone phone case
        image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Softcore Arctic Haze — Blue', is_primary: true, angle: 'front'
    },
    {
        id: 18, product_id: 12, attribute_id: 13,
        // JustClear Sapphire Lens — phone case (confirmed working)
        image_url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case JustClear Sapphire Lens', is_primary: true, angle: 'front'
    },
    {
        id: 19, product_id: 13, attribute_id: 14,
        // Fabric Storm Weave — dark charcoal woven phone case
        image_url: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Fabric Storm Weave — Charcoal', is_primary: true, angle: 'front'
    },
    {
        id: 20, product_id: 13, attribute_id: 15,
        // Fabric Storm Weave — indigo-toned woven phone case
        image_url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80&w=800',
        alt_text: 'Justin Case Fabric Storm Weave — Indigo', is_primary: true, angle: 'front'
    },
];
