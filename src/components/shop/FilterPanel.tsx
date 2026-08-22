import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Category, SkinConcern } from '../../types/product';
import { formatPrice } from '../../utils/format';

export const FilterPanel: React.FC = () => {
  const filters = useStore((state) => state.filters);
  const setFilter = useStore((state) => state.setFilter);
  const resetFilters = useStore((state) => state.resetFilters);

  const categories: { label: string; value: Category }[] = [
    { label: 'All Categories', value: 'all' },
    { label: 'Skincare', value: 'skincare' },
    { label: 'Makeup', value: 'makeup' },
    { label: 'Fragrance', value: 'fragrance' },
    { label: 'Haircare', value: 'haircare' },
    { label: 'Beauty Tools', value: 'tools' }
  ];

  const concerns: { label: string; value: SkinConcern | 'all' }[] = [
    { label: 'All Concerns', value: 'all' },
    { label: 'Deep Hydration', value: 'hydration' },
    { label: 'Glass Glow', value: 'glow' },
    { label: 'Skin Brightening', value: 'brightening' },
    { label: 'Anti-Aging', value: 'anti-aging' },
    { label: 'Texture Refining', value: 'texture' },
    { label: 'Firming & Lifting', value: 'firmness' },
    { label: 'Calming & Soothing', value: 'calming' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-lumera-champagne/60 shadow-sm space-y-6">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-4 border-b border-lumera-champagne/60">
        <div className="flex items-center gap-2 text-lumera-charcoal font-serif font-semibold text-lg">
          <SlidersHorizontal className="w-4 h-4 text-lumera-gold" />
          <span>Filter Formulations</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-[11px] font-semibold text-lumera-gold hover:text-lumera-charcoal flex items-center gap-1 uppercase tracking-wider transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-lumera-charcoal mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilter({ sortBy: e.target.value as any })}
          className="w-full px-4 py-2.5 rounded-xl bg-lumera-pearl/60 border border-lumera-champagne text-xs font-semibold text-lumera-charcoal focus:outline-none focus:border-lumera-gold"
        >
          <option value="featured">Featured Curations</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-lumera-charcoal mb-2">
          Category
        </label>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter({ category: cat.value })}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filters.category === cat.value
                  ? 'bg-lumera-charcoal text-white font-bold'
                  : 'text-lumera-charcoal/80 hover:bg-lumera-pearl'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Maximum Price Range Slider */}
      <div>
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-lumera-charcoal mb-2">
          <span>Max Price</span>
          <span className="text-lumera-gold font-sans font-bold">{formatPrice(filters.maxPrice)}</span>
        </div>
        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={filters.maxPrice}
          onChange={(e) => setFilter({ maxPrice: Number(e.target.value) })}
          className="w-full accent-lumera-gold cursor-pointer"
        />
      </div>

      {/* Skin Concern Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-lumera-charcoal mb-2">
          Skin Concern Focus
        </label>
        <div className="flex flex-wrap gap-1.5">
          {concerns.map((cn) => (
            <button
              key={cn.value}
              onClick={() => setFilter({ skinConcern: cn.value })}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all border ${
                filters.skinConcern === cn.value
                  ? 'bg-lumera-gold text-white border-lumera-gold font-bold shadow-xs'
                  : 'bg-lumera-pearl/40 text-lumera-charcoal border-lumera-champagne hover:border-lumera-gold'
              }`}
            >
              {cn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
