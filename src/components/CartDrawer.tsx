import React, { useState } from 'react';
import { X, Trash2, Gift, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types/toy';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (giftNote: string, promoCode: string, discount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  const FREE_SHIPPING_THRESHOLD = 60;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.percent) / 100 : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 7.50;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (code === 'WONDER10') {
      setAppliedPromo({ code: 'WONDER10', percent: 10 });
    } else if (code === 'PLAYROOM15') {
      setAppliedPromo({ code: 'PLAYROOM15', percent: 15 });
    } else {
      setPromoError('Invalid code. Try "WONDER10" for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col border-l border-[#E5DACB] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EAE1D3] flex items-center justify-between bg-[#F8F4EC]">
          <div>
            <div className="font-display text-lg font-bold text-[#2D2723]">Your Toy Bag</div>
            <div className="text-xs text-[#7B6E61]">
              {items.length === 0 ? 'Empty bag' : `${items.reduce((s, i) => s + i.quantity, 0)} handcrafted treasures`}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close bag drawer"
            className="p-2 text-[#4A3E33] hover:bg-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-5 py-3 bg-[#FAF5EB] border-b border-[#EAE1D3] text-xs">
          {subtotal >= FREE_SHIPPING_THRESHOLD ? (
            <div className="text-[#366127] font-semibold flex items-center gap-1.5">
              <span>✓ You've unlocked Complimentary Express Delivery!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="text-[#594B3D]">
                Add <span className="font-mono font-bold text-[#2D2723]">${amountToFreeShipping.toFixed(2)}</span> more to qualify for Free Shipping
              </div>
              <div className="w-full bg-[#E5DACB] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#2D2723] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#F2EDE4] flex items-center justify-center text-[#8C7B6B] mb-3">
                <Gift size={24} />
              </div>
              <h3 className="font-display text-base font-bold text-[#2D2723]">Your bag is currently empty</h3>
              <p className="text-xs text-[#7C6E60] mt-1 max-w-xs">
                Explore our wooden heirlooms, soft companions, and wonder sets to start building childhood memories.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-[#2D2723] text-white text-xs font-semibold rounded-lg hover:bg-[#433A33]"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3.5 pb-4 border-b border-[#EFE8DD] items-start"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F2EDE4] border border-[#E0D5C5] shrink-0">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#2D2723] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-[#7A6E62]">
                        {item.product.ageRange}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      aria-label="Remove item"
                      className="text-[#96897C] hover:text-[#C25E4B] transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Engraving notice if attached */}
                  {item.engravingText && (
                    <div className="text-[11px] text-[#7B5934] italic mt-1 bg-[#F5ECE0] px-2 py-0.5 rounded border border-[#E4D5C2]">
                      Engraving: "{item.engravingText}"
                    </div>
                  )}

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center border border-[#D5CABB] rounded bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#4A3E33] hover:bg-[#F2ECE1]"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-mono font-semibold tabular-nums text-[#2D2723]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#4A3E33] hover:bg-[#F2ECE1]"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono text-xs font-bold text-[#2D2723] tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Complimentary Gift Wrap & Handwritten Card Option */}
          {items.length > 0 && (
            <div className="bg-[#FAF5EB] p-4 rounded-xl border border-[#E5DACB] space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="rounded accent-[#2D2723]"
                />
                <span className="text-xs font-semibold text-[#2D2723]">
                  Complimentary Gift Box & Wax Ribbon Wrap
                </span>
              </label>

              {giftWrap && (
                <div className="pt-2 animate-in fade-in">
                  <textarea
                    rows={2}
                    placeholder="Write a warm note for the handwritten calligraphic card..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-[#DACFBF] rounded-lg"
                  />
                  <div className="text-[10px] text-[#7B6E61] mt-0.5">
                    Sealed with our botanical studio wax stamp.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Promo code input */}
          {items.length > 0 && (
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Promo code (try WONDER10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#D5CABB] rounded-lg uppercase"
                  />
                  <Tag size={13} className="absolute right-2.5 top-2.5 text-[#9E9081]" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#EAE2D5] hover:bg-[#DDD3C4] text-[#2D2723] text-xs font-semibold rounded-lg transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="text-[11px] text-[#346029] font-medium">
                  ✓ Code {appliedPromo.code} applied ({appliedPromo.percent}% off)
                </div>
              )}
              {promoError && (
                <div className="text-[11px] text-[#9E3E2E]">
                  {promoError}
                </div>
              )}
            </form>
          )}
        </div>

        {/* Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#EAE1D3] bg-[#F8F4EC] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5D5043]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-[#356328]">
                  <span>Discount ({appliedPromo.percent}%)</span>
                  <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2D2723] pt-2 border-t border-[#E8DEC3]">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => onCheckout(giftNote, appliedPromo?.code || '', discountAmount)}
              className="w-full py-3.5 bg-[#2D2723] hover:bg-[#433A33] text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#7B6E60]">
              <ShieldCheck size={14} className="text-[#5F7C51]" />
              <span>30-Day Happiness Guarantee & Free Returns</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
