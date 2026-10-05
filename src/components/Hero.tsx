import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, TreePine } from 'lucide-react';
import { HERO_IMAGE } from '../data/toys';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenAdvisor }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] border-b border-[#EAE3D9] pt-8 pb-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Brand & Intent */}
          <div className="lg:col-span-6 space-y-6">
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8A6341]">
              <span>Handcrafted in European Workshops</span>
              <span aria-hidden="true">·</span>
              <span>100% Non-Toxic</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2723] tracking-tight leading-[1.12] text-balance">
              Toys built for wonder, passed down through generations.
            </h1>

            <p className="text-[#5A4F45] text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Step away from fleeting plastic screens. Discover tactile wooden heirlooms, 
              organic flax plush, and mechanical marvels crafted to ignite boundless imagination.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#2D2723] hover:bg-[#453A32] text-[#FDFBF7] text-sm font-semibold rounded-lg shadow-sm transition-all hover:translate-y-[-1px]"
              >
                <span>Explore the Collection</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onOpenAdvisor}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#F0E8DC] hover:bg-[#E7DCCE] text-[#2D2723] text-sm font-semibold rounded-lg transition-colors border border-[#DDD3C4]"
              >
                <Sparkles size={16} className="text-[#A26D38]" />
                <span>Gift Finder Advisor</span>
              </button>
            </div>

            {/* Adjacency Proof Points (Zero pills: clean unboxed metadata with icons) */}
            <div className="pt-6 border-t border-[#E8DEC3]/70 grid grid-cols-3 gap-4 text-[#5F5347]">
              <div className="flex items-start gap-2.5">
                <TreePine size={18} className="text-[#5C7351] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#2D2723]">FSC Certified</div>
                  <div className="text-[11px] text-[#786D61] leading-tight">Beech & Linden</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck size={18} className="text-[#456C82] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#2D2723]">Baby Safe 0m+</div>
                  <div className="text-[11px] text-[#786D61] leading-tight">Saliva-safe oils</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles size={18} className="text-[#B87D3B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#2D2723]">Free Keepsake</div>
                  <div className="text-[11px] text-[#786D61] leading-tight">Custom engraving</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Anchor (Single dominant visual anchor) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E4DACD] bg-[#EFE9DF] aspect-[16/11]">
              <img
                src={HERO_IMAGE}
                alt="Cozy sunlit atelier with handcrafted wooden toys, railway express, and plush bunny on natural shelves"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
                onError={(e) => {
                  // Fallback container per zero-broken-image policy
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              
              {/* Subtle corner badge for craftsmanship */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FDFBF7]/90 backdrop-blur-md px-4 py-3 rounded-xl border border-[#E5DACB] flex items-center justify-between text-xs text-[#3E342B]">
                <div>
                  <span className="font-semibold text-[#2D2723]">The Artisan Atelier Collection</span>
                  <div className="text-[11px] text-[#6E6357]">Hand-turned beechwood & natural flax linen</div>
                </div>
                <div className="font-mono tabular-nums text-xs font-semibold text-[#8B5E34]">
                  Batch № 26
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
