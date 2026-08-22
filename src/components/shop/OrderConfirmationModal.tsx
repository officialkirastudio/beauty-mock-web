import React, { useEffect } from 'react';
import { X, CheckCircle2, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../utils/format';

export const OrderConfirmationModal: React.FC = () => {
  const isOpen = useStore((state) => state.isOrderConfirmationOpen);
  const setOrderConfirmationOpen = useStore((state) => state.setOrderConfirmationOpen);
  const completedOrder = useStore((state) => state.completedOrder);

  useEffect(() => {
    if (isOpen) {
      // Trigger gold luxury confetti explosion
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E8DFD3', '#FFFFFF', '#1A1918']
      });
    }
  }, [isOpen]);

  if (!isOpen || !completedOrder) return null;

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-lumera-champagne p-6 sm:p-8 my-auto text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setOrderConfirmationOpen(false)}
          className="absolute top-4 right-4 z-50 p-2 text-lumera-muted hover:text-lumera-charcoal rounded-full"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Icon */}
        <div className="w-20 h-20 rounded-full bg-lumera-gold/15 border border-lumera-gold text-lumera-gold flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Title */}
        <h2 className="font-serif text-3xl text-lumera-charcoal uppercase tracking-wider mb-1">
          ORDER CONFIRMED
        </h2>
        <p className="text-xs tracking-[0.25em] text-lumera-gold uppercase font-semibold mb-6">
          Thank you for choosing LUMÉRA.
        </p>

        {/* Order Card */}
        <div className="bg-lumera-pearl/60 rounded-2xl p-5 border border-lumera-champagne/60 text-left space-y-3 mb-6 text-xs">
          <div className="flex justify-between items-center pb-3 border-b border-lumera-champagne/40">
            <span className="text-lumera-muted uppercase">Order Reference:</span>
            <span className="font-mono font-bold text-lumera-charcoal text-sm">{completedOrder.id}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lumera-muted">Estimated Delivery:</span>
            <span className="font-semibold text-lumera-charcoal flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-lumera-gold" /> 3–5 Business Days
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lumera-muted">Delivery Address:</span>
            <span className="font-semibold text-lumera-charcoal truncate max-w-[200px]">
              {completedOrder.shippingDetails.address}, {completedOrder.shippingDetails.city}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-lumera-champagne/40 font-bold text-sm">
            <span>Amount Paid:</span>
            <span className="text-lumera-gold text-base">{formatPrice(completedOrder.total)}</span>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <button
          onClick={() => setOrderConfirmationOpen(false)}
          className="w-full py-4 rounded-full bg-lumera-charcoal text-white hover:bg-lumera-gold font-bold text-xs tracking-widest uppercase transition-all shadow-xl"
        >
          CONTINUE EXPLORING LUMÉRA
        </button>
      </div>
    </div>
  );
};
