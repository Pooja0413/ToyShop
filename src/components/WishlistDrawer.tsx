import React from 'react';
import { X, Trash2, Heart, Plus } from 'lucide-react';
import { ToyProduct } from '../types/toy';

interface WishlistDrawerProps {
  isOpen: boolean;
  wishlist: ToyProduct[];
  onClose: () => void;
  onRemove: (productId: string) => void;
  onMoveToCart: (product: ToyProduct) => void;
  onMoveAllToCart: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  wishlist,
  onClose,
  onRemove,
  onMoveToCart,
  onMoveAllToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col border-l border-[#E5DACB] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EAE1D3] flex items-center justify-between bg-[#F8F4EC]">
          <div>
            <div className="font-display text-lg font-bold text-[#2D2723]">Your Wishlist</div>
            <div className="text-xs text-[#7B6E61]">
              {wishlist.length === 0 ? 'No saved items' : `${wishlist.length} saved treasures`}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist drawer"
            className="p-2 text-[#4A3E33] hover:bg-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#F2EDE4] flex items-center justify-center text-[#8C7B6B] mb-3">
                <Heart size={24} />
              </div>
              <h3 className="font-display text-base font-bold text-[#2D2723]">No saved toys yet</h3>
              <p className="text-xs text-[#7C6E60] mt-1 max-w-xs">
                Click the heart icon on any toy card to save ideas for upcoming birthdays or holidays.
              </p>
            </div>
          ) : (
            wishlist.map((toy) => (
              <div
                key={toy.id}
                className="flex gap-3.5 pb-4 border-b border-[#EFE8DD] items-start"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F2EDE4] border border-[#E0D5C5] shrink-0">
                  <img
                    src={toy.imageUrl}
                    alt={toy.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#2D2723] line-clamp-1">{toy.name}</h4>
                      <div className="text-[11px] text-[#7A6E62]">{toy.ageRange}</div>
                    </div>
                    <button
                      onClick={() => onRemove(toy.id)}
                      aria-label="Remove from wishlist"
                      className="text-[#96897C] hover:text-[#C25E4B] transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="font-mono text-xs font-bold text-[#2D2723] tabular-nums">
                      ${toy.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onMoveToCart(toy)}
                      className="flex items-center gap-1 px-3 py-1 bg-[#2D2723] text-white text-xs font-semibold rounded-md hover:bg-[#433A33] transition-colors"
                    >
                      <Plus size={13} />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-5 border-t border-[#EAE1D3] bg-[#F8F4EC]">
            <button
              onClick={onMoveAllToCart}
              className="w-full py-3 bg-[#2D2723] hover:bg-[#433A33] text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Move All ({wishlist.length}) to Bag</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
