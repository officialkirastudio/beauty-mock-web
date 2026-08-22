import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Star, Check, Shield, RotateCcw } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ProductViewer360 } from '../3d/ProductViewer360';
import { formatPrice } from '../../utils/format';

export const ProductDetailModal: React.FC = () => {
  const selectedProduct = useStore((state) => state.selectedProduct);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist(selectedProduct?.id || ''));
  const setCheckoutOpen = useStore((state) => state.setCheckoutOpen);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!selectedProduct) return null;

  const currentSize = selectedSize || (selectedProduct.sizes ? selectedProduct.sizes[0] : 'Standard');
  const isSaved = isInWishlist;

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, currentSize);
    setSelectedProduct(null);
    setCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-5xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E8DFD3] overflow-hidden my-auto max-h-[92vh] flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Modal Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1A1918] border border-[#E8DFD3] shadow-md transition-all hover:scale-105"
          aria-label="Close product detail modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: 360° Interactive WebGL 3D Inspector */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 bg-gradient-to-b from-[#FFFBF7] to-[#FAF5ED] flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#E8DFD3]/60">
          <div className="w-full h-80 sm:h-96 my-auto">
            <ProductViewer360 product={selectedProduct} autoRotate={true} />
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-[#6E6C68] border-t border-[#E8DFD3]/40">
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>360° Touch Rotate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Dermatologically Tested</span>
            </div>
          </div>
        </div>

        {/* Right Side: Product Meta & Purchase Controls */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div>
            {/* Category Tag & Rating */}
            <div className="flex items-center justify-between mb-2 pr-10">
              <span className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
                {selectedProduct.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-[#D4AF37] font-bold">
                <Star className="w-4 h-4 fill-[#D4AF37]" />
                <span>{selectedProduct.rating}</span>
                <span className="text-[#6E6C68]">({selectedProduct.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1918] mb-2">
              {selectedProduct.name}
            </h2>

            {/* Price Display */}
            <div className="text-2xl font-sans font-bold text-[#1A1918] mb-4">
              {formatPrice(selectedProduct.price)}
              <span className="text-xs font-normal text-[#6E6C68] ml-2">Inclusive of all taxes</span>
            </div>

            <p className="text-sm text-[#6E6C68] leading-relaxed mb-6 font-sans">
              {selectedProduct.description}
            </p>

            {/* Size Selector (If Applicable) */}
            {selectedProduct.sizes && (
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-2">
                  Select Size / Shade
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                        currentSize === sz
                          ? 'bg-[#1A1918] text-white border-[#1A1918] shadow-md'
                          : 'bg-white text-[#1A1918] border-[#E8DFD3] hover:border-[#D4AF37]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Benefits */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2">
                Proven Clinical Benefits
              </h4>
              <ul className="space-y-1.5">
                {selectedProduct.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#1A1918]">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients */}
            <div className="mb-6 p-4 rounded-xl bg-white border border-[#E8DFD3]/60 shadow-xs">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1">
                Active Key Ingredients
              </h4>
              <p className="text-xs text-[#6E6C68]">
                {selectedProduct.ingredients.join(' • ')}
              </p>
            </div>
          </div>

          {/* Action Buttons: Quantity, Add to Bag, Buy Now */}
          <div className="space-y-3 pt-4 border-t border-[#E8DFD3]/60">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#E8DFD3] rounded-full bg-white p-1 shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#1A1918] font-bold flex items-center justify-center hover:bg-[#E8DFD3]"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#1A1918] font-bold flex items-center justify-center hover:bg-[#E8DFD3]"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={() => {
                  addToCart(selectedProduct, quantity, currentSize);
                  setSelectedProduct(null);
                }}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#1A1918] text-white hover:bg-[#D4AF37] font-semibold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-[#E8DFD3]" />
                <span>ADD TO BAG</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className={`p-3.5 rounded-full border transition-all ${
                  isSaved
                    ? 'bg-rose-50 text-rose-500 border-rose-200'
                    : 'bg-white text-[#1A1918] border-[#E8DFD3] hover:border-[#D4AF37]'
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Instant Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 rounded-full bg-[#D4AF37] text-[#1A1918] hover:bg-[#1A1918] hover:text-white border border-[#D4AF37] font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95"
            >
              BUY NOW INSTANT CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
