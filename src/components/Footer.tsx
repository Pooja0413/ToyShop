import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#26201B] text-[#D8CEBE] pt-16 pb-12 border-t border-[#3D332B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3D332B]">
          
          {/* Brand & Ethos */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-display text-2xl font-bold text-[#FDFBF7] tracking-tight">
              Wonderkind Toys
            </span>
            <p className="text-xs text-[#A89D8E] leading-relaxed max-w-sm">
              An independent European play studio dedicated to wholesome childhoods. 
              Carved from certified Baltic birch and finished with non-toxic botanical oils.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E8BF87]">
              <ShieldCheck size={16} />
              <span>Complies with EN71 & ASTM F963 Standards</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FDFBF7]">
              Explore
            </div>
            <ul className="space-y-2 text-xs text-[#B5A897]">
              <li>
                <button
                  onClick={() => onScrollToSection('catalog')}
                  className="hover:text-white transition-colors"
                >
                  All Toys & Heirlooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('gift-advisor')}
                  className="hover:text-white transition-colors"
                >
                  Play & Gift Advisor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('interactive-toybox')}
                  className="hover:text-white transition-colors"
                >
                  Playroom Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('craft-story')}
                  className="hover:text-white transition-colors"
                >
                  Sustainable Materials
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FDFBF7]">
              Atelier Support
            </div>
            <ul className="space-y-2 text-xs text-[#B5A897]">
              <li>Free Keepsake Engraving</li>
              <li>Heirloom Parts Replacement</li>
              <li>Shipping & Global Delivery</li>
              <li>30-Day Family Happiness Return</li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FDFBF7]">
              The Playroom Gazette
            </div>
            <p className="text-xs text-[#A89D8E] leading-relaxed">
              Receive seasonal developmental guides, small-batch release announcements, and Montessori play tips.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#384A31] text-[#C5E3B8] rounded-lg text-xs flex items-center gap-2">
                <Check size={14} />
                <span>You're subscribed to the Gazette!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter parent email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#362E27] border border-[#4D4238] rounded-lg text-[#FDFBF7] placeholder-[#8C7E70] focus:outline-hidden focus:border-[#C5B39A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#E8BF87] hover:bg-[#F2CD99] text-[#26201B] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Quiet Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8F8374] gap-4">
          <div>
            © {new Date().getFullYear()} Wonderkind Toys Atelier. Handcrafted with reverence for natural childhood play.
          </div>
          <div className="flex items-center gap-6">
            <span>FSC Certified Timber</span>
            <span aria-hidden="true">·</span>
            <span>Plastic-Free Packaging</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              Made with <Heart size={12} className="text-[#C25E4B] fill-[#C25E4B]" /> for curious minds
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
