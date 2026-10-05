import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';

const PARENT_STORIES = [
  {
    author: 'Hannah & Markus Berg',
    role: 'Parents of 3 & 6-year-olds (Berlin)',
    toy: 'Artisan Magnetic Rail Express',
    quote: 'We threw out three plastic train sets that broke at the couplers within months. This wooden rail set has survived two toddlers, heavy daily drops, and still clicks together with that delightful magnetic thud. It is easily the best investment we’ve made for their playroom.',
    rating: 5
  },
  {
    author: 'Dr. Alistair MacIntyre',
    role: 'Pediatric Neurologist & Father of 8-year-old',
    toy: 'Celestial Stargazer Telescope',
    quote: 'Children today are overwhelmed by hyper-stimulation and instant gratification. Watching my daughter patiently adjust the brass focus ring until lunar craters sprang into crystal clarity was a profound moment of stillness and genuine curiosity.',
    rating: 5
  },
  {
    author: 'Sophie Dumont',
    role: 'Montessori Infant Guide & Mother (Lyon)',
    toy: 'Flora Heirloom Linen Bunny',
    quote: 'The unbleached flax linen has such an earthy, calming scent and texture. Unlike synthetic stuffed animals that shed microscopic microplastics, Flora is pure and completely safe for newborn cheeks.',
    rating: 5
  }
];

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#FAF6F0] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6340] mb-2">
            <MessageSquareQuote size={15} />
            <span>Family Stories</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2D2723] tracking-tight">
            Loved by parents, cherished by children
          </h2>
          <p className="text-sm sm:text-base text-[#685B4E] mt-3">
            Real experiences from households that made the conscious choice to embrace screen-free, slow play.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PARENT_STORIES.map((story, i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-2xl border border-[#E5DACB] shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex text-[#D9822B]">
                  {[...Array(story.rating)].map((_, idx) => (
                    <Star key={idx} size={14} className="fill-[#D9822B]" />
                  ))}
                </div>

                <div className="text-xs font-semibold uppercase tracking-wide text-[#8C6239]">
                  Verified Purchase: {story.toy}
                </div>

                <p className="text-xs sm:text-sm text-[#4E4135] leading-relaxed italic">
                  “{story.quote}”
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0E9DF]">
                <div className="font-display text-sm font-bold text-[#2D2723]">
                  {story.author}
                </div>
                <div className="text-xs text-[#7A6D60] mt-0.5">
                  {story.role}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
