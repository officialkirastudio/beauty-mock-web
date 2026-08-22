import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import type { Product } from '../../types/product';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../utils/format';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist(product.id));
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);

  const isSaved = isInWishlist;
  const imageSrc = product.image || `/products/${product.id}.png`;

  return (
    <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#E8DFD3] transition-all duration-500 hover:shadow-2xl hover:border-[#D4AF37]/60 flex flex-col justify-between hover:-translate-y-1.5">
      {/* Top Badges & Wishlist Button */}
      <div className="flex items-center justify-between mb-3 z-10">
        <div className="flex flex-wrap gap-1.5">
          {product.bestseller && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-white text-[9px] font-bold tracking-wider uppercase shadow-xs">
              BESTSELLER
            </span>
          )}
          {product.newArrival && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#1A1918] text-white text-[9px] font-bold tracking-wider uppercase shadow-xs">
              NEW
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            isSaved
              ? 'bg-rose-50 text-rose-500 border border-rose-200'
              : 'bg-white/90 text-[#6E6C68] hover:text-[#D4AF37] border border-[#E8DFD3]'
          }`}
          aria-label={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Visual Container (Procedural Luxury Visual Representation) */}
      <div
        onClick={() => setSelectedProduct(product)}
        className="relative w-full aspect-square rounded-xl bg-gradient-to-b from-[#FFFBF7] to-[#F5EFE6] flex items-center justify-center cursor-pointer overflow-hidden group/img mb-4 border border-[#E8DFD3]/50"
      >
        {/* Soft Glow Halo */}
        <div
          className="absolute w-32 h-32 rounded-full blur-2xl opacity-40 group-hover/img:opacity-80 transition-opacity duration-500"
          style={{ backgroundColor: product.colorHex || '#EAD7CE' }}
        />

        {/* Product Visual Image with Procedural Fallback */}
        {imageSrc && !imgError ? (
          <img
            src={imageSrc}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain object-center p-3 relative z-10 transform group-hover/img:scale-105 group-hover/img:-rotate-2 transition-transform duration-500 drop-shadow-sm"
          />
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center transform group-hover/img:scale-105 group-hover/img:-rotate-2 transition-transform duration-500">
            <div
              className="w-16 h-28 rounded-t-xl rounded-b-md border-2 border-white/90 shadow-md flex items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(180deg, rgba(255,255,255,0.95) 0%, ${product.colorHex || '#EAD7CE'} 100%)`
              }}
            >
              {/* Metallic Gold Cap */}
              <div
                className="absolute top-0 inset-x-0 h-5 shadow-inner"
                style={{ backgroundColor: product.accentColor || '#D4AF37' }}
              />
              {/* Brand Label */}
              <div className="w-10 h-10 bg-white/90 rounded-xs shadow-xs flex items-center justify-center p-1 text-[8px] font-serif font-bold text-[#1A1918] text-center tracking-tighter uppercase">
                LUMÉRA
              </div>
            </div>
            <span className="text-[9px] tracking-[0.2em] text-[#6E6C68] uppercase mt-2 font-medium">
              {product.modelType}
            </span>
          </div>
        )}

        {/* Quick Inspect Hover Overlay */}
        <div className="absolute inset-0 bg-[#1A1918]/25 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="px-3.5 py-2 rounded-full bg-white text-[#1A1918] font-semibold text-xs shadow-lg flex items-center gap-1.5 hover:bg-[#D4AF37] hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>360° INSPECT</span>
          </button>
        </div>
      </div>

      {/* Details & Pricing */}
      <div>
        <div className="flex items-center gap-1 text-xs text-[#D4AF37] mb-1">
          <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
          <span className="font-bold">{product.rating}</span>
          <span className="text-[#6E6C68] text-[11px]">({product.reviewsCount})</span>
        </div>

        <h3
          onClick={() => setSelectedProduct(product)}
          className="font-serif text-lg font-normal text-[#1A1918] hover:text-[#D4AF37] transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </h3>

        <p className="text-xs text-[#6E6C68] line-clamp-2 mt-1 mb-3 font-sans">
          {product.shortDescription}
        </p>

        {/* Price & Quick Add Button */}
        <div className="flex items-center justify-between pt-2.5 border-t border-[#E8DFD3]/60">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#6E6C68] block -mb-0.5">PRICE</span>
            <span className="font-sans font-bold text-base text-[#1A1918]">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="px-4 py-2 rounded-full bg-[#1A1918] text-white hover:bg-[#D4AF37] font-semibold text-xs transition-all duration-300 flex items-center gap-1.5 shadow-sm active:scale-95"
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E8DFD3]" />
            <span>ADD</span>
          </button>
        </div>
      </div>
    </div>
  );
};
