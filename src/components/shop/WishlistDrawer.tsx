import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../utils/format';

export const WishlistDrawer: React.FC = () => {
  const isOpen = useStore((state) => state.isWishlistOpen);
  const setWishlistOpen = useStore((state) => state.setWishlistOpen);
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const addToCart = useStore((state) => state.addToCart);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[7000] flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-lumera-champagne animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-lumera-champagne/60 flex items-center justify-between bg-lumera-pearl/30">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-lumera-gold fill-lumera-gold" />
            <h2 className="font-serif text-xl tracking-wider text-lumera-charcoal uppercase">
              SAVED RITUALS ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={() => setWishlistOpen(false)}
            className="p-2 text-lumera-muted hover:text-lumera-charcoal rounded-full hover:bg-lumera-pearl transition-colors"
            aria-label="Close wishlist drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-lumera-pearl flex items-center justify-center text-lumera-muted mb-4">
                <Heart className="w-8 h-8 text-lumera-gold/60" />
              </div>
              <h3 className="font-serif text-xl text-lumera-charcoal mb-2">Your Wishlist is Empty</h3>
              <p className="text-xs text-lumera-muted max-w-xs mb-6">
                Save your favorite products to curate your personal daily beauty ritual.
              </p>
              <button
                onClick={() => setWishlistOpen(false)}
                className="px-6 py-3 rounded-full bg-lumera-charcoal text-white font-semibold text-xs tracking-wider uppercase hover:bg-lumera-gold transition-colors"
              >
                DISCOVER PRODUCTS
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 pb-6 border-b border-lumera-champagne/40"
              >
                <div className="w-20 h-20 rounded-xl bg-lumera-pearl/60 border border-lumera-champagne/50 flex items-center justify-center shrink-0 p-1.5 relative overflow-hidden">
                  <img
                    src={product.image || `/products/${product.id}.png`}
                    alt={product.name}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-full object-contain object-center"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-semibold text-lumera-charcoal truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs font-bold text-lumera-charcoal mb-2">
                    {formatPrice(product.price)}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        toggleWishlist(product);
                      }}
                      className="px-3 py-1.5 rounded-full bg-lumera-charcoal text-white hover:bg-lumera-gold text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>MOVE TO BAG</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-1.5 text-lumera-muted hover:text-red-500 transition-colors"
                      aria-label="Remove item from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
