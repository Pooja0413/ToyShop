import React, { useState } from 'react';
import { X, Heart, Star, ShieldCheck, TreePine, Sparkles, Check, Send } from 'lucide-react';
import { ToyProduct, ToyReview } from '../types/toy';

interface ProductModalProps {
  product: ToyProduct | null;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (product: ToyProduct) => void;
  onAddToCart: (product: ToyProduct, quantity: number, engravingText?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'craft' | 'reviews'>('overview');
  const [reviewsList, setReviewsList] = useState<ToyReview[]>(product.reviews);
  
  // New review form states
  const [newAuthor, setNewAuthor] = useState('');
  const [newRelation, setNewRelation] = useState('Parent of 3-year-old');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: ToyReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      relation: newRelation,
      rating: newRating,
      date: 'Just now',
      title: newTitle || 'Wonderful heirloom toy',
      comment: newComment,
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FDFBF7] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E0D5C5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE3D7] bg-[#F7F2E9]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#825C37]">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.ageRange}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product)}
              aria-label="Toggle wishlist"
              className="p-2 text-[#4A3E33] hover:bg-white rounded-full transition-colors"
            >
              <Heart
                size={18}
                className={isWishlisted ? "fill-[#C25E4B] text-[#C25E4B]" : ""}
              />
            </button>
            <button
              onClick={onClose}
              aria-label="Close details dialog"
              className="p-2 text-[#4A3E33] hover:bg-white rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Product Visual Presentation */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F2EDE4] border border-[#E5DACB]">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.isBestseller && (
                  <div className="absolute top-3 left-3 bg-[#2D2723] text-white text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded">
                    Atelier Bestseller
                  </div>
                )}
              </div>

              {/* Complimentary Keepsake Engraving Simulator */}
              {product.engravable && (
                <div className="bg-[#FAF4EC] rounded-xl p-4 border border-[#E5DACB] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#6B4B28] uppercase tracking-wide">
                    <Sparkles size={14} />
                    <span>Free Heirloom Keepsake Engraving</span>
                  </div>
                  <p className="text-xs text-[#6E6153]">
                    Personalize your toy with a pyrographic laser inscription on the solid wood tender or base.
                  </p>
                  
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={24}
                      placeholder="e.g., To Oliver, With Love 2026"
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DACFBF] rounded-lg focus:outline-hidden focus:border-[#825C37] text-[#2D2723]"
                    />
                    <span className="absolute right-2.5 top-2 text-[10px] text-[#A39688]">
                      {24 - engravingText.length} left
                    </span>
                  </div>

                  {/* Live Wooden Plaque Simulation Preview */}
                  <div className="mt-2 bg-[#EADCC7] border border-[#C5B39A] rounded-lg py-2.5 px-4 text-center shadow-inner relative overflow-hidden">
                    <div className="text-[10px] uppercase tracking-widest text-[#7C664F] mb-0.5">
                      Engraved Plaque Preview
                    </div>
                    <div className="font-display italic text-sm text-[#45311E] tracking-wide font-semibold">
                      {engravingText ? `“ ${engravingText} ”` : "“ Enter a child's name or note ”"}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2D2723] leading-tight">
                  {product.name}
                </h2>
                <p className="text-sm text-[#736556] mt-1 font-medium">
                  {product.subtitle}
                </p>
              </div>

              {/* Rating & In-Stock indicator */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-[#D9822B]">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? "fill-[#D9822B]" : "text-[#DCD1C4]"}
                      />
                    ))}
                  </div>
                  <span className="font-mono font-bold text-[#2D2723] tabular-nums">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-[#847769]">({reviewsList.length} verified reviews)</span>
                </div>
                <span aria-hidden="true" className="text-[#C8BCAF]">·</span>
                <span className="text-[#4E7A4A] font-semibold flex items-center gap-1">
                  <Check size={14} /> Ready to ship in 24h
                </span>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-mono text-3xl font-bold text-[#2D2723] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-base text-[#9C8F80] line-through tabular-nums">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-[#7A6E61]">Taxes & standard packing included</span>
              </div>

              {/* Short description */}
              <p className="text-sm text-[#574A3D] leading-relaxed">
                {product.description}
              </p>

              {/* Core Safety & Material Callouts */}
              <div className="bg-[#FAF5EC] rounded-xl p-3.5 border border-[#E8DEC3] space-y-2 text-xs text-[#524538]">
                <div className="flex items-center gap-2">
                  <TreePine size={16} className="text-[#59784D] shrink-0" />
                  <span><strong>Materials:</strong> {product.materials}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#416982] shrink-0" />
                  <span><strong>Certifications:</strong> {product.safetyCertifications.join(', ')}</span>
                </div>
              </div>

              {/* Quantity Selector & Add to Bag */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#D5CABB] rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="px-3 py-2 text-[#4A3E33] hover:bg-[#F2ECE1] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-mono text-sm font-semibold tabular-nums text-[#2D2723]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                      className="px-3 py-2 text-[#4A3E33] hover:bg-[#F2ECE1] transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(product, quantity, engravingText);
                      onClose();
                    }}
                    className="flex-1 py-3 px-6 bg-[#2D2723] hover:bg-[#433932] text-white font-semibold text-sm rounded-lg shadow-sm transition-colors text-center"
                  >
                    Add {quantity > 1 ? `${quantity} items` : 'to Bag'} · ${(product.price * quantity).toFixed(2)}
                  </button>
                </div>

                <div className="text-center text-[11px] text-[#7C6E61]">
                  Need it wrapped? Choose complimentary gift wrapping at checkout.
                </div>
              </div>

            </div>

          </div>

          {/* Tabbed In-Depth Sections (Overview / Craftsmanship / Reviews) */}
          <div className="border-t border-[#EAE1D3] pt-6">
            <div className="flex items-center gap-2 border-b border-[#EAE1D3] pb-3 mb-6">
              {[
                { id: 'overview', label: 'Developmental Benefits' },
                { id: 'craft', label: 'Woodcraft & Safety Standards' },
                { id: 'reviews', label: `Parent Stories (${reviewsList.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#2D2723] text-white'
                      : 'text-[#615447] hover:bg-[#F2ECE2]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Developmental Benefits */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h4 className="font-display text-base font-bold text-[#2D2723]">
                  Why this toy supports open-ended play:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#54483C]">
                  {product.playBenefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8E633C] mt-2 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 text-xs text-[#7B6E61]">
                  <strong>Dimensions:</strong> {product.dimensions}
                </div>
              </div>
            )}

            {/* Tab 2: Craftsmanship & Safety */}
            {activeTab === 'craft' && (
              <div className="space-y-4 text-xs sm:text-sm text-[#54483C] leading-relaxed">
                <p>
                  Every piece undergoes four stages of progressive hand-sanding down to a 400-grit velvet finish, ensuring no splinter hazards or sharp arrises. Finished with linseed oil, beeswax, and food-grade mineral pigments safe for teething infants.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-[#FAF5EC] rounded-lg border border-[#E5DACB]">
                    <div className="font-bold text-[#2D2723] mb-1">Non-Toxic Guarantee</div>
                    <div className="text-xs text-[#706355]">
                      Free of phthalates, BPA, PVC, heavy metals, formaldehyde, and azo colorants.
                    </div>
                  </div>
                  <div className="p-3 bg-[#FAF5EC] rounded-lg border border-[#E5DACB]">
                    <div className="font-bold text-[#2D2723] mb-1">Care & Longevity</div>
                    <div className="text-xs text-[#706355]">
                      Wipe with a damp cloth and mild organic soap. Re-buff with coconut oil or beeswax once a year.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews & Review Submission */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Submit a review form */}
                <form onSubmit={handleAddReview} className="bg-[#FAF5EC] p-4 sm:p-5 rounded-xl border border-[#E5DACB] space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6D4E2C]">
                    Leave a Parent Note & Review
                  </div>
                  {reviewSubmitted && (
                    <div className="p-2.5 bg-[#EAF2E4] text-[#345929] rounded-lg text-xs font-medium">
                      Thank you! Your verified note has been published.
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="px-3 py-2 text-xs bg-white border border-[#D5CABB] rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="e.g. Parent of 4-year-old"
                      value={newRelation}
                      onChange={(e) => setNewRelation(e.target.value)}
                      className="px-3 py-2 text-xs bg-white border border-[#D5CABB] rounded-lg"
                    />
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="px-3 py-2 text-xs bg-white border border-[#D5CABB] rounded-lg text-[#2D2723]"
                    >
                      <option value={5}>★★★★★ (5 Stars)</option>
                      <option value={4}>★★★★☆ (4 Stars)</option>
                      <option value={3}>★★★☆☆ (3 Stars)</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder="Review headline (e.g. Wonderful durability)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5CABB] rounded-lg"
                  />

                  <textarea
                    required
                    rows={3}
                    placeholder="Share how your child interacted with this toy..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5CABB] rounded-lg"
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2D2723] text-white text-xs font-semibold rounded-lg hover:bg-[#433932] transition-colors"
                  >
                    <Send size={13} />
                    <span>Publish Parent Note</span>
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="border-b border-[#EAE1D3] pb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#2D2723]">{rev.author}</span>
                          <span aria-hidden="true" className="text-[#C5B7A5]">·</span>
                          <span className="text-[#84776A]">{rev.relation}</span>
                        </div>
                        <span className="text-[#968778]">{rev.date}</span>
                      </div>
                      <div className="flex text-[#D9822B] mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < rev.rating ? "fill-[#D9822B]" : "text-[#DCD1C4]"}
                          />
                        ))}
                      </div>
                      <div className="text-xs font-semibold text-[#2D2723] mb-1">{rev.title}</div>
                      <p className="text-xs text-[#5E5144] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
