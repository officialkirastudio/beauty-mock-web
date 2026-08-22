import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-lumera-charcoal text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-lumera-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Brand Promises Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-white/10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 rounded-full bg-white/5 border border-white/10 text-lumera-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg tracking-wide text-white">100% Authentic & Dermatological</h4>
              <p className="text-xs text-lumera-muted">Formulated in luxury laboratories</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 rounded-full bg-white/5 border border-white/10 text-lumera-gold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg tracking-wide text-white">Complimentary Express Shipping</h4>
              <p className="text-xs text-lumera-muted">On all orders above ₹2,000 across India</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 rounded-full bg-white/5 border border-white/10 text-lumera-gold">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg tracking-wide text-white">30-Day Sacred Guarantee</h4>
              <p className="text-xs text-lumera-muted">Seamless returns & exchanges</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-4">
            <h2 className="font-serif text-3xl tracking-[0.25em] text-white uppercase font-light mb-2">
              LUMÉRA
            </h2>
            <p className="text-xs tracking-[0.3em] uppercase text-lumera-gold mb-6">
              Beauty, Reimagined.
            </p>
            <p className="text-sm text-lumera-muted leading-relaxed mb-6">
              Pioneering futuristic bio-cellular skincare, high-pigment couture makeup, and sensual artisanal fragrances crafted to transform everyday rituals.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-lumera-gold mb-4">
              COLLECTIONS
            </h3>
            <ul className="space-y-2.5 text-xs text-lumera-muted">
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Skincare Elixirs</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Couture Makeup</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Parfum Extrait</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Silk Hair Treatments</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Sculpting Crystal Tools</a></li>
            </ul>
          </div>

          {/* Experience */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-lumera-gold mb-4">
              WORLD OF LUMÉRA
            </h3>
            <ul className="space-y-2.5 text-xs text-lumera-muted">
              <li><a href="#face-ritual" className="hover:text-white transition-colors">Skin Ritual Analyzer</a></li>
              <li><a href="#routine-builder" className="hover:text-white transition-colors">Routine Builder</a></li>
              <li><a href="#mirror-section" className="hover:text-white transition-colors">Interactive Mirror</a></li>
              <li><a href="#ingredient-section" className="hover:text-white transition-colors">Ingredient Library</a></li>
              <li><a href="#reviews-section" className="hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-lumera-gold mb-2">
              JOIN THE LUMÉRA WORLD
            </h3>
            <p className="text-xs text-lumera-muted mb-4">
              Subscribe for private previews, invitations to new formulation launches, and exclusive member rituals.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-lumera-gold/10 border border-lumera-gold text-lumera-gold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Welcome to the LUMÉRA inner circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-l-lg text-xs text-white placeholder-lumera-muted focus:outline-none focus:border-lumera-gold"
                />
                <button
                  type="submit"
                  className="px-5 bg-lumera-gold text-lumera-charcoal font-semibold text-xs rounded-r-lg hover:bg-white transition-colors flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-lumera-muted">
          <p>© {new Date().getFullYear()} LUMÉRA Luxury Beauty Inc. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
