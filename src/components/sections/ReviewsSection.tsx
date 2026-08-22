import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { LUMERA_REVIEWS } from '../../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-lumera-gold block mb-2">
          CLIENT TESTIMONIALS
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-lumera-charcoal uppercase tracking-wider mb-4">
          VOICES OF RADIANCE
        </h2>
        <p className="text-sm text-lumera-muted leading-relaxed">
          Discover how LUMÉRA formulations have transformed daily skincare and makeup rituals across the globe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {LUMERA_REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-lumera-champagne/70 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center gap-1 text-lumera-gold mb-4">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-lumera-gold" />
                ))}
              </div>

              <p className="font-serif italic text-sm text-lumera-charcoal leading-relaxed mb-6">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-lumera-champagne/40 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-lumera-charcoal">{rev.author}</h4>
                <p className="text-[10px] text-lumera-muted">{rev.location}</p>
              </div>

              {rev.verified && (
                <div className="flex items-center gap-1 text-[10px] text-lumera-gold font-semibold">
                  <CheckCircle className="w-3 h-3" />
                  <span>VERIFIED</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
