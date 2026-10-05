import React, { useState } from 'react';
import { Heart, ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE3D9]">
      {/* Promotional Top Banner (≤ 40px, dismissible) */}
      {!announcementDismissed && (
        <div className="bg-[#3D332A] text-[#F4EFEA] px-4 py-2 text-xs text-center flex items-center justify-between">
          <div className="mx-auto flex items-center gap-2">
            <span>Complimentary handwritten gift note & free delivery on orders over $60</span>
            <span aria-hidden="true" className="opacity-50">·</span>
            <span className="font-medium text-[#E8BF87]">Heirloom craft guarantee</span>
          </div>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            aria-label="Dismiss promotional banner"
            className="text-stone-400 hover:text-white transition-colors p-1"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Strict 1-Row, 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single element wordmark in display face */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-2xl font-bold tracking-tight text-[#2D2723] hover:text-[#7A4B29] transition-colors"
        >
          Wonderkind Toys
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#5E5246]">
          <button
            onClick={() => onScrollToSection('catalog')}
            className="hover:text-[#2D2723] transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#B89B72]"
          >
            Curated Catalog
          </button>
          <button
            onClick={() => onScrollToSection('gift-advisor')}
            className="hover:text-[#2D2723] transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#B89B72]"
          >
            Gift Advisor
          </button>
          <button
            onClick={() => onScrollToSection('interactive-toybox')}
            className="hover:text-[#2D2723] transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#B89B72]"
          >
            Playroom Lab
          </button>
          <button
            onClick={() => onScrollToSection('craft-story')}
            className="hover:text-[#2D2723] transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#B89B72]"
          >
            Woodcraft & Safety
          </button>
          <button
            onClick={() => onScrollToSection('reviews')}
            className="hover:text-[#2D2723] transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#B89B72]"
          >
            Parent Stories
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenWishlist}
            aria-label={`Wishlist with ${wishlistCount} items`}
            className="relative p-2 text-[#4A3F35] hover:text-[#2D2723] hover:bg-[#F2ECE1] rounded-full transition-colors"
          >
            <Heart size={20} className={wishlistCount > 0 ? "fill-[#C25E4B] text-[#C25E4B]" : ""} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C25E4B] text-white text-[11px] font-semibold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            aria-label={`Shopping bag with ${cartCount} items`}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#FDFBF7] bg-[#2D2723] hover:bg-[#433A34] rounded-lg transition-colors shadow-xs"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-mono text-xs bg-[#4A3F35] px-1.5 py-0.5 rounded text-[#EFEAE2]">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-[#4A3F35] hover:bg-[#F2ECE1] rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF8F2] border-b border-[#EAE3D9] px-6 py-4 flex flex-col gap-3 text-sm font-medium text-[#4A3F35]">
          <button
            onClick={() => {
              onScrollToSection('catalog');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 hover:text-[#2D2723]"
          >
            Curated Catalog
          </button>
          <button
            onClick={() => {
              onScrollToSection('gift-advisor');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 hover:text-[#2D2723]"
          >
            Gift Advisor
          </button>
          <button
            onClick={() => {
              onScrollToSection('interactive-toybox');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 hover:text-[#2D2723]"
          >
            Playroom Lab
          </button>
          <button
            onClick={() => {
              onScrollToSection('craft-story');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 hover:text-[#2D2723]"
          >
            Woodcraft & Safety
          </button>
          <button
            onClick={() => {
              onScrollToSection('reviews');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 hover:text-[#2D2723]"
          >
            Parent Stories
          </button>
        </div>
      )}
    </header>
  );
};
