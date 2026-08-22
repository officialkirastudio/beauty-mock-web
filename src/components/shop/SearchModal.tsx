import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { LUMERA_PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/format';

export const SearchModal: React.FC = () => {
  const isOpen = useStore((state) => state.isSearchOpen);
  const setSearchOpen = useStore((state) => state.setSearchOpen);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);

  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? LUMERA_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const suggestedTerms = ['Serum', 'Lipstick', 'Rose Quartz', 'Perfume', 'Hydration', 'Vitamin C'];

  return (
    <div className="fixed inset-0 z-[7500] flex flex-col bg-white/95 backdrop-blur-2xl animate-fade-in p-6 sm:p-12 overflow-y-auto">
      {/* Header Close */}
      <div className="flex justify-end">
        <button
          onClick={() => setSearchOpen(false)}
          className="p-3 rounded-full bg-lumera-pearl hover:bg-lumera-champagne text-lumera-charcoal transition-colors"
          aria-label="Close search overlay"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full mt-6">
        {/* Search Input */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-lumera-gold" />
          <input
            type="text"
            autoFocus
            placeholder="Search LUMÉRA skincare, makeup, ingredients or fragrance..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 rounded-full bg-lumera-pearl/60 border-2 border-lumera-champagne text-base sm:text-xl font-serif text-lumera-charcoal placeholder-lumera-muted focus:outline-none focus:border-lumera-gold shadow-inner"
          />
        </div>

        {/* Suggested Quick Terms */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <span className="text-xs font-semibold text-lumera-muted uppercase tracking-wider">
            Popular Searches:
          </span>
          {suggestedTerms.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-3.5 py-1.5 rounded-full bg-lumera-pearl hover:bg-lumera-champagne text-xs text-lumera-charcoal transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results Grid */}
        {query.trim() && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-lumera-muted mb-4">
              Found {filteredProducts.length} Matching Formulations
            </h3>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-lumera-muted">
                <p className="font-serif text-xl mb-2">No matching products found</p>
                <p className="text-xs">Try searching for "serum", "hydrating", "lipstick", or "perfume".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product);
                      setSearchOpen(false);
                    }}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-lumera-champagne hover:border-lumera-gold cursor-pointer transition-all hover:-translate-y-1 shadow-sm"
                  >
                    <div className="w-14 h-14 rounded-xl bg-lumera-pearl flex items-center justify-center shrink-0 p-1 overflow-hidden">
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
                      <p className="text-[10px] text-lumera-gold uppercase font-bold">
                        {product.category}
                      </p>
                      <p className="text-xs font-bold text-lumera-charcoal mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
