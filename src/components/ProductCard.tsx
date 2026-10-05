import React from 'react';
import { Heart, Plus, Eye, Star } from 'lucide-react';
import { ToyProduct } from '../types/toy';

interface ProductCardProps {
  product: ToyProduct;
  isWishlisted: boolean;
  onToggleWishlist: (product: ToyProduct) => void;
  onSelect: (product: ToyProduct) => void;
  onAddToCart: (product: ToyProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelect,
  onAddToCart,
}) => {
  return (
    <div className="group flex flex-col bg-white rounded-xl border border-[#E5DACB] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      
      {/* Visual Canvas (65%-75% visual prominence) */}
      <div className="relative aspect-[4/3] bg-[#F7F4EE] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
          onError={(e) => {
            // Elegant fallback container
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />

        {/* Quiet top corner indicators (Text only or functional icon, no colored pill badges) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-xs text-[#4E4135] bg-[#FDFBF7]/90 backdrop-blur-xs px-2.5 py-1 rounded">
          <span>{product.ageRange}</span>
          {product.piecesCount && (
            <>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>{product.piecesCount} pcs</span>
            </>
          )}
        </div>

        {/* Wishlist toggle action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 p-2 bg-[#FDFBF7]/90 backdrop-blur-xs hover:bg-white text-[#4A3F35] rounded-full shadow-xs transition-colors"
        >
          <Heart
            size={16}
            className={isWishlisted ? "fill-[#C25E4B] text-[#C25E4B]" : "text-[#5C5044]"}
          />
        </button>

        {/* Quick View overlay trigger on hover */}
        <button
          onClick={() => onSelect(product)}
          className="absolute inset-x-3 bottom-3 py-2 bg-[#2D2723]/90 hover:bg-[#2D2723] text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 backdrop-blur-xs"
        >
          <Eye size={14} />
          <span>Inspect Craft & Details</span>
        </button>
      </div>

      {/* Card Content & Metadata (Zero pill enclosure discipline) */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Unboxed Metadata line with typographic separators */}
        <div className="flex items-center gap-2 text-xs text-[#8A6340] font-semibold tracking-wide uppercase mb-1">
          <span>{product.categoryLabel}</span>
          {product.engravable && (
            <>
              <span aria-hidden="true" className="text-[#C5B4A1]">·</span>
              <span className="text-[#6D8056]">Engravable</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(product)}
          className="font-display text-lg font-bold text-[#2D2723] hover:text-[#7A4B29] transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Subtitle / Material hint */}
        <p className="text-xs text-[#736659] mt-0.5 line-clamp-1">
          {product.subtitle}
        </p>

        {/* Rating proof point */}
        <div className="flex items-center gap-1.5 mt-2.5 text-xs text-[#63574A]">
          <div className="flex items-center text-[#D9822B]">
            <Star size={13} className="fill-[#D9822B]" />
          </div>
          <span className="font-mono tabular-nums font-semibold text-[#2D2723]">{product.rating.toFixed(1)}</span>
          <span className="text-[#96887B]">({product.reviewCount} reviews)</span>
        </div>

        {/* Price & Primary Action */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#EFE8DE]">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-[#2D2723] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-[#9E9081] line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2D2723] bg-[#EFE9DF] hover:bg-[#E2D8CC] rounded-lg transition-colors"
          >
            <Plus size={14} />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
};
