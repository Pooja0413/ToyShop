import React, { useState } from 'react';
import { Sparkles, Gift, ArrowRight } from 'lucide-react';
import { TOY_PRODUCTS } from '../data/toys';
import { ToyProduct, AgeGroup } from '../types/toy';

interface GiftAdvisorProps {
  onSelectProduct: (product: ToyProduct) => void;
  onAddToCart: (product: ToyProduct) => void;
}

export const GiftAdvisor: React.FC<GiftAdvisorProps> = ({ onSelectProduct, onAddToCart }) => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup | 'all'>('3-5');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(100);

  // Filter recommendations based on answers
  const recommendations = TOY_PRODUCTS.filter((toy) => {
    const matchesAge = selectedAge === 'all' || toy.ageGroup === selectedAge;
    const matchesCategory = selectedCategory === 'all' || toy.category === selectedCategory;
    const matchesBudget = toy.price <= maxBudget;
    return matchesAge && matchesCategory && matchesBudget;
  });

  return (
    <section id="gift-advisor" className="py-16 bg-[#F6F2EA] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C6239] mb-2">
            <Gift size={15} />
            <span>Interactive Play Advisor</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2D2723] tracking-tight">
            Find the perfect gift for their developmental milestone
          </h2>
          <p className="text-sm sm:text-base text-[#685B4E] mt-3">
            Select the child’s age, play style, and budget to view curated heirloom recommendations.
          </p>
        </div>

        {/* Advisor Controls Container */}
        <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-2xl border border-[#E2D7C8] shadow-xs max-w-4xl mx-auto mb-10 space-y-6">
          
          {/* 1. Age Selector (Interactive functional buttons) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3F35] mb-2.5">
              1. Child's Age Group
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: '0-2', label: '0–2 Years', sub: 'Sensory & Snuggle' },
                { id: '3-5', label: '3–5 Years', sub: 'Pretend & Building' },
                { id: '6-8', label: '6–8 Years', sub: 'STEM & Logic' },
                { id: 'all', label: 'Any Age', sub: 'All Collections' }
              ].map((age) => (
                <button
                  key={age.id}
                  onClick={() => setSelectedAge(age.id as AgeGroup | 'all')}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    selectedAge === age.id
                      ? 'border-[#2D2723] bg-[#2D2723] text-white shadow-xs'
                      : 'border-[#E5DACB] bg-white text-[#4A3F35] hover:border-[#BFAF9C]'
                  }`}
                >
                  <div className="text-sm font-semibold">{age.label}</div>
                  <div className={`text-[11px] ${selectedAge === age.id ? 'text-[#D0C5B8]' : 'text-[#877A6D]'}`}>
                    {age.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Play Style / Category */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3F35] mb-2.5">
              2. Play Interest & Material
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Play Styles' },
                { id: 'wooden', label: 'Wooden & Sensory' },
                { id: 'stem', label: 'STEM & Wonder' },
                { id: 'plush', label: 'Organic Plush' },
                { id: 'creative', label: 'Creative Arts' },
                { id: 'puzzles', label: 'Puzzles & Games' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#EADECE] text-[#2D2723] border-[#7F6B56] font-semibold'
                      : 'bg-white text-[#5C5044] border-[#E2D8CC] hover:bg-[#F7F3EC]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Budget Slider */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider text-[#4A3F35]">
                3. Maximum Budget: <span className="font-mono text-sm text-[#2D2723] font-bold">${maxBudget}</span>
              </span>
              <span className="text-[#84776A]">Up to $100+</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              aria-label="Filter products by maximum budget"
              className="w-full accent-[#2D2723] bg-[#E8DEC3] rounded-lg h-2 cursor-pointer"
            />
          </div>

        </div>

        {/* Results Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-[#54483C]">
              Showing <span className="font-bold text-[#2D2723] tabular-nums">{recommendations.length}</span> curated matches
            </div>
            {recommendations.length > 0 && (
              <div className="text-xs text-[#87796B]">
                Eligible for free gift wrapping & custom engraving
              </div>
            )}
          </div>

          {recommendations.length === 0 ? (
            <div className="bg-[#FAF7F1] border border-dashed border-[#DACDBE] rounded-2xl p-12 text-center">
              <Sparkles size={28} className="mx-auto text-[#B58A59] mb-3" />
              <p className="text-sm font-semibold text-[#2D2723]">No items match this exact combination</p>
              <p className="text-xs text-[#7B6E61] mt-1">Try expanding your budget slider or choosing "All Play Styles".</p>
              <button
                onClick={() => {
                  setSelectedAge('all');
                  setSelectedCategory('all');
                  setMaxBudget(100);
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold bg-[#2D2723] text-white rounded-lg hover:bg-[#433A33]"
              >
                Reset Advisor Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.slice(0, 3).map((toy) => (
                <div
                  key={toy.id}
                  className="bg-white rounded-xl border border-[#E5DACB] overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                >
                  <div
                    onClick={() => onSelectProduct(toy)}
                    className="relative bg-[#F7F4EE] aspect-[4/3] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={toy.imageUrl}
                      alt={toy.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 text-[11px] font-semibold tracking-wide text-[#594B3C] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded">
                      {toy.ageRange}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-[11px] uppercase tracking-wider text-[#8A6340] font-semibold mb-1">
                      {toy.categoryLabel}
                    </div>
                    <h3
                      onClick={() => onSelectProduct(toy)}
                      className="font-display text-lg font-bold text-[#2D2723] hover:text-[#7A4B29] cursor-pointer transition-colors"
                    >
                      {toy.name}
                    </h3>
                    <p className="text-xs text-[#685C50] mt-1 line-clamp-2 leading-relaxed">
                      {toy.description}
                    </p>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#F0E9DF]">
                      <span className="font-mono text-base font-bold text-[#2D2723] tabular-nums">
                        ${toy.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectProduct(toy)}
                          className="px-3 py-1.5 text-xs text-[#52463B] hover:text-[#2D2723] hover:bg-[#F6F1EA] rounded-md transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onAddToCart(toy)}
                          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2D2723] hover:bg-[#433A33] rounded-md transition-colors"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
