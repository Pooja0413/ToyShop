import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Sparkles, Heart, Check, ArrowUpDown } from 'lucide-react';
import { TOY_PRODUCTS } from './data/toys';
import { ToyProduct, CartItem, OrderDetails, ToyCategory, AgeGroup } from './types/toy';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GiftAdvisor } from './components/GiftAdvisor';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { BlockStackerToy } from './components/BlockStackerToy';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CraftStory } from './components/CraftStory';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

export default function App() {
  // Persistence state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wonderkind_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item): item is CartItem =>
          Boolean(
            item &&
            item.product &&
            typeof item.product.id === 'string' &&
            typeof item.product.price === 'number' &&
            typeof item.quantity === 'number'
          )
      );
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<ToyProduct[]>(() => {
    try {
      const saved = localStorage.getItem('wonderkind_wishlist');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (p): p is ToyProduct =>
          Boolean(p && typeof p.id === 'string' && typeof p.name === 'string')
      );
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ToyProduct | null>(null);
  const [checkoutGiftNote, setCheckoutGiftNote] = useState('');
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToyCategory>('all');
  const [selectedAge, setSelectedAge] = useState<AgeGroup | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('wonderkind_cart', JSON.stringify(cart));
    } catch {
      // ignore storage error
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('wonderkind_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore storage error
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: ToyProduct, quantity = 1, engravingText?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.engravingText === engravingText
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, engravingText }];
    });
    showToast(`Added “${product.name}” to bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: ToyProduct) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed from wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved “${product.name}” to wishlist`);
    }
  };

  const handleMoveWishlistToCart = (product: ToyProduct) => {
    handleAddToCart(product);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleMoveAllWishlistToCart = () => {
    wishlist.forEach((prod) => handleAddToCart(prod));
    setWishlist([]);
    showToast(`Moved all saved toys to bag`);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  // Navigation scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter products
  const filteredProducts = TOY_PRODUCTS.filter((toy) => {
    const matchesCategory =
      selectedCategory === 'all' || toy.category === selectedCategory;
    const matchesAge = selectedAge === 'all' || toy.ageGroup === selectedAge;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      toy.name.toLowerCase().includes(query) ||
      toy.subtitle.toLowerCase().includes(query) ||
      toy.materials.toLowerCase().includes(query) ||
      toy.description.toLowerCase().includes(query);

    return matchesCategory && matchesAge && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
  });

  const cartTotalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2D2723] font-body selection:bg-[#EBD8C3]">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D2723] text-[#FDFBF7] text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200">
          <Check size={16} className="text-[#96C782]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Strict Top Bar Contract Header */}
      <Header
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Campaign Hero Section */}
        <Hero
          onExploreCatalog={() => scrollToSection('catalog')}
          onOpenAdvisor={() => scrollToSection('gift-advisor')}
        />

        {/* Catalog & Filter Navigation Section */}
        <section id="catalog" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#EAE3D9]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8A6340] mb-1">
                Artisan Playroom Catalog
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2D2723] tracking-tight">
                Handcrafted Toys & Instruments
              </h2>
              <p className="text-xs sm:text-sm text-[#6A5E52] mt-1.5">
                Every toy is rigorously safety-certified, free of petroleum plastics, and tuned for joyful open-ended play.
              </p>
            </div>

            {/* Instant Search Bar */}
            <div className="w-full md:w-72 relative">
              <input
                type="text"
                placeholder="Search toys, wood, or age..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 pl-9 bg-white border border-[#DCD0C2] rounded-xl focus:outline-hidden focus:border-[#7A5129] shadow-2xs"
              />
              <Search size={15} className="absolute left-3 top-3 text-[#9A8D80]" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-[#9A8D80] hover:text-[#2D2723]"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Interactive Filters: Categories (Functional Segmented Buttons, Zero Static Pills) */}
          <div className="space-y-4 mb-10">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'all', label: 'All Creations' },
                { id: 'wooden', label: 'Wooden Heirlooms' },
                { id: 'stem', label: 'STEM & Wonder' },
                { id: 'plush', label: 'Soft Companions' },
                { id: 'creative', label: 'Creative Arts' },
                { id: 'puzzles', label: 'Puzzles & Games' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as ToyCategory)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#2D2723] text-white shadow-xs font-semibold'
                      : 'bg-[#F2ECE1] text-[#5C5043] hover:bg-[#E8DFC2]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Secondary Controls: Age Filter & Sorting */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#F0EAE0] text-xs">
              
              {/* Age Filter Segmented controls */}
              <div className="flex items-center gap-2">
                <span className="text-[#786C5F] font-medium">Age Group:</span>
                <div className="flex gap-1">
                  {[
                    { id: 'all', label: 'All' },
                    { id: '0-2', label: '0–2 yrs' },
                    { id: '3-5', label: '3–5 yrs' },
                    { id: '6-8', label: '6–8 yrs' },
                  ].map((age) => (
                    <button
                      key={age.id}
                      onClick={() => setSelectedAge(age.id as any)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        selectedAge === age.id
                          ? 'bg-[#E3D9CC] text-[#2D2723] font-bold'
                          : 'text-[#6D6052] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      {age.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-[#84786A]" />
                <span className="text-[#786C5F] font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#D5CABB] rounded-lg px-2.5 py-1 text-xs text-[#2D2723] focus:outline-hidden"
                >
                  <option value="featured">Atelier Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated by Parents</option>
                </select>
              </div>

            </div>
          </div>

          {/* Product Cards Grid (3 columns on desktop, generous gap-8, single elevation) */}
          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center bg-[#FAF6F0] rounded-2xl border border-dashed border-[#DACFBE]">
              <p className="text-sm font-semibold text-[#2D2723]">No toys matched your criteria</p>
              <p className="text-xs text-[#7A6D60] mt-1">Try resetting the age filter or clearing search keywords.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedAge('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-[#2D2723] text-white text-xs font-semibold rounded-lg hover:bg-[#433A33]"
              >
                Show All Toys
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((toy) => (
                <ProductCard
                  key={toy.id}
                  product={toy}
                  isWishlisted={wishlist.some((p) => p.id === toy.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onSelect={(product) => setSelectedProduct(product)}
                  onAddToCart={(product) => handleAddToCart(product)}
                />
              ))}
            </div>
          )}

        </section>

        {/* Interactive Gift Advisor Quiz */}
        <GiftAdvisor
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product)}
        />

        {/* Interactive Stacking Block Experiment (Playroom Lab) */}
        <BlockStackerToy
          onAddToCart={(product) => handleAddToCart(product)}
        />

        {/* Craftsmanship, Safety Rigor & Wood Sourcing */}
        <CraftStory />

        {/* Attributable Parent Stories & Endorsements */}
        <ReviewsSection />

      </main>

      {/* Footer */}
      <Footer onScrollToSection={scrollToSection} />

      {/* Detailed Product Modal (PDP) */}
      <ProductModal
        product={selectedProduct}
        isWishlisted={selectedProduct ? wishlist.some((p) => p.id === selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={(giftNote, promoCode, discount) => {
          setCheckoutGiftNote(giftNote);
          setCheckoutDiscount(discount);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Slide-over Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        wishlist={wishlist}
        onClose={() => setIsWishlistOpen(false)}
        onRemove={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onMoveToCart={handleMoveWishlistToCart}
        onMoveAllToCart={handleMoveAllWishlistToCart}
      />

      {/* Multi-step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cart}
        giftNote={checkoutGiftNote}
        promoDiscount={checkoutDiscount}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={(order) => {
          // Clear cart on successful order
          setCart([]);
          showToast(`Order ${order.orderId} successfully placed!`);
        }}
      />
    </div>
  );
}
