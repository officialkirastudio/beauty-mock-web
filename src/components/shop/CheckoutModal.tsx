import React, { useState } from 'react';
import { X, CreditCard, CheckCircle2, Truck, ArrowRight, Lock } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../utils/format';

export const CheckoutModal: React.FC = () => {
  const isOpen = useStore((state) => state.isCheckoutOpen);
  const setCheckoutOpen = useStore((state) => state.setCheckoutOpen);
  const cart = useStore((state) => state.cart);
  const placeOrder = useStore((state) => state.placeOrder);

  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [formData, setFormData] = useState({
    fullName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    address: '42 Lotus Boulevard, Bandra West',
    city: 'Mumbai',
    pincode: '400050'
  });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal >= 2000 ? 0 : 250;
  const total = subtotal + tax + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'shipping') {
      setStep('payment');
    } else {
      placeOrder(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-[8000] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-lumera-champagne overflow-hidden my-auto max-h-[92vh] flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setCheckoutOpen(false)}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/80 hover:bg-white text-lumera-charcoal border border-lumera-champagne shadow-md"
          aria-label="Close checkout modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Order Summary */}
        <div className="w-full lg:w-5/12 p-6 sm:p-8 bg-lumera-pearl/50 border-b lg:border-b-0 lg:border-r border-lumera-champagne/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-4 h-4 text-lumera-gold" />
              <span className="text-xs font-bold uppercase tracking-widest text-lumera-charcoal">
                256-BIT ENCRYPTED CHECKOUT
              </span>
            </div>

            <h3 className="font-serif text-2xl text-lumera-charcoal mb-4">Order Summary</h3>

            {/* Cart Items List */}
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-lumera-champagne flex items-center justify-center font-serif text-[10px]">
                      LUM
                    </div>
                    <div>
                      <p className="font-semibold text-lumera-charcoal line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] text-lumera-muted">
                        Qty: {item.quantity} • {item.selectedSize}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-lumera-charcoal">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-4 border-t border-lumera-champagne/60 text-xs">
              <div className="flex justify-between text-lumera-muted">
                <span>Subtotal</span>
                <span className="font-semibold text-lumera-charcoal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-lumera-muted">
                <span>Estimated GST (18%)</span>
                <span className="font-semibold text-lumera-charcoal">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-lumera-muted">
                <span>Express Courier Shipping</span>
                <span className="font-semibold text-lumera-gold">
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-lumera-charcoal pt-3 border-t border-lumera-champagne/40">
                <span>Grand Total</span>
                <span className="text-xl text-lumera-gold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex items-center gap-2 text-[11px] text-lumera-muted">
            <Truck className="w-4 h-4 text-lumera-gold shrink-0" />
            <span>Delivered in luxury velvet padded box via Blue Dart Express</span>
          </div>
        </div>

        {/* Right Side: Form Controls */}
        <div className="w-full lg:w-7/12 p-6 sm:p-8 overflow-y-auto">
          {/* Progress Indicator */}
          <div className="flex items-center space-x-4 mb-6">
            <div className={`flex items-center gap-2 text-xs font-bold ${step === 'shipping' ? 'text-lumera-gold' : 'text-lumera-charcoal'}`}>
              <span className="w-6 h-6 rounded-full bg-lumera-gold text-white flex items-center justify-center text-[10px]">1</span>
              <span>SHIPPING</span>
            </div>
            <div className="w-8 h-[1px] bg-lumera-champagne" />
            <div className={`flex items-center gap-2 text-xs font-bold ${step === 'payment' ? 'text-lumera-gold' : 'text-lumera-muted'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-lumera-gold text-white' : 'bg-lumera-pearl text-lumera-muted'}`}>2</span>
              <span>PAYMENT</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 'shipping' ? (
              <>
                <h3 className="font-serif text-2xl text-lumera-charcoal mb-4">Shipping Destination</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-lumera-charcoal mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-lumera-champagne text-xs focus:outline-none focus:border-lumera-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-lumera-charcoal mb-1">
                      Email Address (Order Confirmation)
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-lumera-champagne text-xs focus:outline-none focus:border-lumera-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-lumera-charcoal mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-lumera-champagne text-xs focus:outline-none focus:border-lumera-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-lumera-charcoal mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-lumera-champagne text-xs focus:outline-none focus:border-lumera-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-lumera-charcoal mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-lumera-champagne text-xs focus:outline-none focus:border-lumera-gold"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-4 rounded-full bg-lumera-charcoal text-white hover:bg-lumera-gold font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <h3 className="font-serif text-2xl text-lumera-charcoal mb-4">Payment Method</h3>
                <div className="space-y-3 mb-6">
                  {/* UPI Option */}
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-lumera-gold bg-lumera-gold/10'
                        : 'border-lumera-champagne hover:border-lumera-gold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-lumera-gold flex items-center justify-center">
                        {paymentMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-lumera-gold" />}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-lumera-charcoal">UPI / Instant QR Code</p>
                        <p className="text-[10px] text-lumera-muted">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-lumera-gold">RECOMMENDED</span>
                  </label>

                  {/* Credit Card Option */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-lumera-gold bg-lumera-gold/10'
                        : 'border-lumera-champagne hover:border-lumera-gold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-lumera-gold flex items-center justify-center">
                        {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-lumera-gold" />}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-lumera-charcoal">Credit / Debit Card</p>
                        <p className="text-[10px] text-lumera-muted">Visa, Mastercard, Amex, RuPay</p>
                      </div>
                    </div>
                    <CreditCard className="w-4 h-4 text-lumera-muted" />
                  </label>

                  {/* COD Option */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-lumera-gold bg-lumera-gold/10'
                        : 'border-lumera-champagne hover:border-lumera-gold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-lumera-gold flex items-center justify-center">
                        {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-lumera-gold" />}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-lumera-charcoal">Cash / Pay on Delivery</p>
                        <p className="text-[10px] text-lumera-muted">Pay at doorstep upon package arrival</p>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="px-6 py-4 rounded-full border border-lumera-champagne text-lumera-charcoal font-semibold text-xs uppercase"
                  >
                    BACK
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-full bg-lumera-gold text-lumera-charcoal hover:bg-white border border-lumera-gold font-bold text-xs tracking-widest uppercase transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CONFIRM & PLACE ORDER</span>
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
