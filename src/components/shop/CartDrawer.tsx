import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../utils/format';

export const CartDrawer: React.FC = () => {
  const isOpen = useStore((state) => state.isCartOpen);
  const setCartOpen = useStore((state) => state.setCartOpen);
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const setCheckoutOpen = useStore((state) => state.setCheckoutOpen);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 2000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleProceedCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[7000] flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-lumera-champagne animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-lumera-champagne/60 flex items-center justify-between bg-lumera-pearl/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-lumera-gold" />
            <h2 className="font-serif text-xl tracking-wider text-lumera-charcoal uppercase">
              YOUR BEAUTY BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 text-lumera-muted hover:text-lumera-charcoal rounded-full hover:bg-lumera-pearl transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-lumera-champagne/20 px-6 py-3 border-b border-lumera-champagne/40">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            {remainingForFreeShipping > 0 ? (
              <span className="text-lumera-charcoal">
                Add <strong className="text-lumera-gold">{formatPrice(remainingForFreeShipping)}</strong> more for FREE Express Shipping
              </span>
            ) : (
              <span className="text-lumera-gold font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Congratulations! You unlocked FREE Express Shipping!
              </span>
            )}
          </div>
          <div className="w-full h-1.5 bg-lumera-champagne/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-lumera-gold transition-all duration-300 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-lumera-pearl flex items-center justify-center text-lumera-muted mb-4">
                <ShoppingBag className="w-8 h-8 text-lumera-gold/60" />
              </div>
              <h3 className="font-serif text-xl text-lumera-charcoal mb-2">Your Bag is Empty</h3>
              <p className="text-xs text-lumera-muted max-w-xs mb-6">
                Discover our luxury skincare, makeup, and fragrance elixirs to begin your ritual.
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="px-6 py-3 rounded-full bg-lumera-charcoal text-white font-semibold text-xs tracking-wider uppercase hover:bg-lumera-gold transition-colors"
              >
                EXPLORE COLLECTION
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex items-center gap-4 pb-6 border-b border-lumera-champagne/40"
              >
                {/* Item Thumbnail */}
                <div className="w-20 h-20 rounded-xl bg-lumera-pearl/60 border border-lumera-champagne/50 flex items-center justify-center shrink-0 p-1.5 relative overflow-hidden">
                  <img
                    src={item.product.image || `/products/${item.product.id}.png`}
                    alt={item.product.name}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-full object-contain object-center"
                  />
                </div>

                {/* Details & Controls */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-semibold text-lumera-charcoal truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-lumera-muted uppercase tracking-wider mb-1">
                    {item.selectedSize}
                  </p>
                  <p className="text-xs font-bold text-lumera-charcoal mb-2">
                    {formatPrice(item.product.price)}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-lumera-champagne rounded-full bg-lumera-pearl/30">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity - 1, item.selectedSize)
                        }
                        className="w-6 h-6 rounded-full text-lumera-charcoal text-xs font-bold flex items-center justify-center hover:bg-lumera-champagne"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + 1, item.selectedSize)
                        }
                        className="w-6 h-6 rounded-full text-lumera-charcoal text-xs font-bold flex items-center justify-center hover:bg-lumera-champagne"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Item */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="text-lumera-muted hover:text-red-500 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-lumera-champagne/60 bg-lumera-pearl/20 space-y-4">
            <div className="space-y-1.5 text-xs text-lumera-muted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-lumera-charcoal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes (GST 18%)</span>
                <span className="font-semibold text-lumera-charcoal">
                  {formatPrice(Math.round(subtotal * 0.18))}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-lumera-gold">
                  {subtotal >= 2000 ? 'FREE' : formatPrice(250)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-lumera-charcoal pt-2 border-t border-lumera-champagne/40">
                <span>Total</span>
                <span className="text-base text-lumera-gold">
                  {formatPrice(subtotal + Math.round(subtotal * 0.18) + (subtotal >= 2000 ? 0 : 250))}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedCheckout}
              className="w-full py-4 rounded-full bg-lumera-charcoal text-white hover:bg-lumera-gold font-bold text-xs tracking-widest uppercase transition-all shadow-xl flex items-center justify-center gap-2 group active:scale-98"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
