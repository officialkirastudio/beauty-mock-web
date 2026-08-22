import React, { useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import type { SkinConcern } from '../../types/product';
import { LUMERA_PRODUCTS } from '../../data/products';
import { useStore } from '../../store/useStore';
import { formatPrice } from '../../utils/format';

export const RoutineBuilderSection: React.FC = () => {
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern>('hydration');
  const [routineTime, setRoutineTime] = useState<'morning' | 'night' | 'complete'>('morning');

  const addToCart = useStore((state) => state.addToCart);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);

  const concerns: { id: SkinConcern; label: string }[] = [
    { id: 'hydration', label: 'Dryness & Dehydration' },
    { id: 'glow', label: 'Dullness & Lack of Radiance' },
    { id: 'brightening', label: 'Uneven Tone & Dark Spots' },
    { id: 'anti-aging', label: 'Fine Lines & Elasticity' },
    { id: 'texture', label: 'Pores & Rough Texture' },
    { id: 'calming', label: 'Sensitivities & Redness' }
  ];

  // Pick 4 curated steps: 01 Cleanse, 02 Treat, 03 Hydrate, 04 Protect
  const routineSteps = [
    {
      step: '01 CLEANSE',
      product: LUMERA_PRODUCTS.find((p) => p.modelType === 'serum' && p.category === 'skincare') || LUMERA_PRODUCTS[3]
    },
    {
      step: '02 TREAT',
      product: LUMERA_PRODUCTS.find((p) => p.skinConcern.includes(selectedConcern)) || LUMERA_PRODUCTS[0]
    },
    {
      step: '03 HYDRATE',
      product: LUMERA_PRODUCTS.find((p) => p.modelType === 'cream' && p.category === 'skincare') || LUMERA_PRODUCTS[1]
    },
    {
      step: '04 PROTECT / SCULPT',
      product: LUMERA_PRODUCTS.find((p) => p.modelType === 'roller' || p.modelType === 'perfume') || LUMERA_PRODUCTS[6]
    }
  ];

  const handleAddFullRoutine = () => {
    routineSteps.forEach((s) => addToCart(s.product, 1));
  };

  return (
    <section id="routine-builder" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-lumera-gold block mb-2">
          BESPOKE CURATION WIZARD
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-lumera-charcoal uppercase tracking-wider mb-4">
          BUILD YOUR BEAUTY RITUAL
        </h2>
        <p className="text-sm text-lumera-muted leading-relaxed">
          Select your primary skin concern and routine cadence to generate a personalized 4-step LUMÉRA formulation sequence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Step Wizard Selection Controls */}
        <div className="lg:col-span-4 bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-lumera-champagne/70 shadow-sm space-y-8">
          {/* Step 1: Concern */}
          <div>
            <span className="text-[10px] font-bold tracking-widest text-lumera-gold uppercase block mb-1">
              STEP 1 OF 2
            </span>
            <h3 className="font-serif text-xl font-normal text-lumera-charcoal mb-4">
              Select Primary Concern
            </h3>
            <div className="space-y-2">
              {concerns.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedConcern(c.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between border ${
                    selectedConcern === c.id
                      ? 'bg-lumera-charcoal text-white border-lumera-charcoal shadow-md'
                      : 'bg-lumera-pearl/40 text-lumera-charcoal border-lumera-champagne hover:border-lumera-gold'
                  }`}
                >
                  <span>{c.label}</span>
                  {selectedConcern === c.id && <Check className="w-4 h-4 text-lumera-gold" />}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Time of Day */}
          <div>
            <span className="text-[10px] font-bold tracking-widest text-lumera-gold uppercase block mb-1">
              STEP 2 OF 2
            </span>
            <h3 className="font-serif text-xl font-normal text-lumera-charcoal mb-4">
              Select Cadence
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {(['morning', 'night', 'complete'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setRoutineTime(t)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                    routineTime === t
                      ? 'bg-lumera-gold text-white border-lumera-gold shadow-sm'
                      : 'bg-lumera-pearl/40 text-lumera-charcoal border-lumera-champagne hover:border-lumera-gold'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generated 4-Step Routine Showcase */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[#FFFBF7] to-[#F7F2EA] rounded-3xl p-6 sm:p-8 border border-lumera-champagne/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-lumera-champagne/60 gap-4 mb-8">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-lumera-gold uppercase block mb-1">
                  CURATED RITUAL SEQUENCE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-lumera-charcoal">
                  4-Step Prescribed Formulation
                </h3>
              </div>

              <button
                onClick={handleAddFullRoutine}
                className="px-6 py-3 rounded-full bg-lumera-gold text-lumera-charcoal hover:bg-white border border-lumera-gold font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD COMPLETE RITUAL TO BAG</span>
              </button>
            </div>

            {/* 4 Step Stack Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {routineSteps.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedProduct(s.product)}
                  className="group bg-white rounded-2xl p-4 border border-lumera-champagne/60 hover:border-lumera-gold cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-lumera-gold block mb-2">
                      {s.step}
                    </span>
                    <div className="w-full aspect-square rounded-xl bg-lumera-pearl flex items-center justify-center mb-3 p-2 overflow-hidden">
                      <img
                        src={s.product.image || `/products/${s.product.id}.png`}
                        alt={s.product.name}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                        className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-lumera-charcoal line-clamp-1 mb-1">
                      {s.product.name}
                    </h4>
                    <p className="text-[11px] text-lumera-muted line-clamp-2">
                      {s.product.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-lumera-champagne/40 flex items-center justify-between mt-3">
                    <span className="text-xs font-bold text-lumera-charcoal">
                      {formatPrice(s.product.price)}
                    </span>
                    <span className="text-[10px] font-bold text-lumera-gold group-hover:underline">
                      VIEW
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
