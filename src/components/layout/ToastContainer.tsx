import React from 'react';
import { useStore } from '../../store/useStore';
import { ShoppingBag, Heart, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const toasts = useStore((state) => state.toasts);
  const removeToast = useStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9000] flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-white/90 backdrop-blur-xl border border-lumera-champagne shadow-xl transition-all duration-300 transform translate-y-0"
        >
          <div className="p-2 rounded-full bg-lumera-gold/15 text-lumera-gold shrink-0">
            {t.type === 'cart' && <ShoppingBag className="w-4 h-4" />}
            {t.type === 'wishlist' && <Heart className="w-4 h-4 fill-lumera-gold" />}
            {t.type === 'info' && <Info className="w-4 h-4" />}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-lumera-charcoal uppercase tracking-wider">{t.title}</h4>
            <p className="text-xs text-lumera-muted truncate mt-0.5">{t.message}</p>
          </div>

          <button
            onClick={() => removeToast(t.id)}
            className="text-lumera-muted hover:text-lumera-charcoal p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
