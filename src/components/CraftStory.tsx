import React from 'react';
import { TreePine, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { CRAFT_PILLARS } from '../data/toys';

export const CraftStory: React.FC = () => {
  return (
    <section id="craft-story" className="py-20 bg-[#FDFBF7] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6340] mb-2">
            <Award size={15} />
            <span>The Wonderkind Standard</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2723] tracking-tight leading-tight">
            How we craft toys worthy of passing through generations.
          </h2>
          <p className="text-[#645749] text-base sm:text-lg mt-4 leading-relaxed font-normal">
            Modern toy shelves are inundated with breakable polymers and flashing LEDs designed for planned obsolescence. 
            We return to the warmth of living wood, vegetable-derived pigments, and tactile physics that engage the senses.
          </p>
        </div>

        {/* 3 Craft Pillars Grid (Whitespace over cards-in-cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {CRAFT_PILLARS.map((pillar, idx) => (
            <div key={idx} className="p-6 sm:p-7 bg-[#FAF6F0] rounded-2xl border border-[#E7DDCE] space-y-3">
              <div className="font-mono text-xs text-[#8E633C] font-semibold">
                0{idx + 1}. {pillar.subtitle}
              </div>
              <h3 className="font-display text-xl font-bold text-[#2D2723]">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#66584B] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Attributable Pediatric & Educator Testimonials adjacent to claims */}
        <div className="p-8 sm:p-10 bg-[#FAF4EA] rounded-2xl border border-[#E5DACB]">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#7E5733]">
              Educator & Specialist Endorsement
            </div>
            <blockquote className="font-display text-lg sm:text-xl font-medium text-[#2D2723] italic leading-relaxed">
              “Open-ended wooden toys do not dictate how a child must play. Instead of passive button-pressing, children practice active hypotheses: balance, friction, cause, and spatial relationships. Wonderkind represents the gold standard of childhood design.”
            </blockquote>
            <div className="pt-2 text-xs text-[#5D5043]">
              <span className="font-bold text-[#2D2723]">Dr. Charlotte Lindqvist</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>Associate Professor of Pediatric Cognitive Development, Stockholm</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
