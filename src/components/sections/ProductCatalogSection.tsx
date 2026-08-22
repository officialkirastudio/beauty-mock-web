import React, { useState } from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ProductCard } from '../shop/ProductCard';
import { FilterPanel } from '../shop/FilterPanel';
import { LUMERA_PRODUCTS } from '../../data/products';

export const ProductCatalogSection: React.FC = () => {
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const filters = useStore((state) => state.filters);

  const filteredProducts = LUMERA_PRODUCTS.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.skinConcern !== 'all' && !product.skinConcern.includes(filters.skinConcern)) return false;
    if (product.price > filters.maxPrice) return false;
    if (filters.minRating > 0 && product.rating < filters.minRating) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-low') return a.price - b.price;
    if (filters.sortBy === 'price-high') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <section id="catalog-section" className="py-24 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E8DFD3]/60 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">
            FORMULATION CATALOG
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1918] uppercase tracking-wider mb-2">
            THE LUMÉRA COLLECTION
          </h2>
          <p className="font-serif italic text-base text-[#D4AF37]">
            "Curated beauty essentials for every ritual."
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-xs font-medium text-[#6E6C68]">
            Showing <strong className="text-[#1A1918]">{filteredProducts.length}</strong> of {LUMERA_PRODUCTS.length} luxury formulations
          </p>

          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="lg:hidden px-4 py-2.5 rounded-full bg-white border border-[#E8DFD3] text-xs font-semibold text-[#1A1918] flex items-center gap-2 shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28">
            <FilterPanel />
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {showFiltersMobile && (
          <div className="lg:hidden mb-6">
            <FilterPanel />
          </div>
        )}

        {/* Product Grid: 4 Columns on Large Desktop */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white/60 rounded-3xl p-12 text-center border border-[#E8DFD3]/60">
              <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
              <h3 className="font-serif text-2xl text-[#1A1918] mb-2">No Formulations Match Criteria</h3>
              <p className="text-xs text-[#6E6C68] max-w-sm mx-auto mb-6">
                Try widening your max price slider or resetting selected skin concern filters.
              </p>
              <button
                onClick={() => useStore.getState().resetFilters()}
                className="px-6 py-3 rounded-full bg-[#1A1918] text-white font-semibold text-xs uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
