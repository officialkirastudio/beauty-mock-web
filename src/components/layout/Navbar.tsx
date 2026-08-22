import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Category } from '../../types/product';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const setSearchOpen = useStore((state) => state.setSearchOpen);
  const setCartOpen = useStore((state) => state.setCartOpen);
  const setWishlistOpen = useStore((state) => state.setWishlistOpen);
  const setFilter = useStore((state) => state.setFilter);
  const activeCategory = useStore((state) => state.filters.category);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (cat: Category) => {
    setFilter({ category: cat });
    setMobileMenuOpen(false);
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navCategories: { label: string; value: Category }[] = [
    { label: 'SHOP', value: 'all' },
    { label: 'SKINCARE', value: 'skincare' },
    { label: 'MAKEUP', value: 'makeup' },
    { label: 'FRAGRANCE', value: 'fragrance' },
    { label: 'HAIRCARE', value: 'haircare' },
    { label: 'TOOLS', value: 'tools' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-3.5' : 'bg-gradient-to-b from-black/15 via-black/5 to-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#1A1918] lg:hidden hover:text-[#D4AF37] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Brand Logo (Left) */}
        <div
          className="cursor-pointer hidden lg:block shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <h1 className="font-serif text-2xl font-light tracking-[0.25em] uppercase text-[#1A1918] leading-none">
            LUMÉRA
          </h1>
          <span className="text-[8px] tracking-[0.3em] uppercase text-[#6E6C68] block mt-0.5">
            Beauty, Reimagined.
          </span>
        </div>

        {/* Mobile Brand Logo (Center) */}
        <div
          className="cursor-pointer lg:hidden text-center"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <h1 className="font-serif text-2xl font-light tracking-[0.25em] uppercase text-[#1A1918] leading-none">
            LUMÉRA
          </h1>
        </div>

        {/* Desktop Navigation Links (Center) */}
        <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
          {navCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`text-[11px] tracking-[0.18em] font-medium transition-all duration-300 relative py-1 hover:text-[#D4AF37] ${
                activeCategory === cat.value ? 'text-[#D4AF37] font-bold' : 'text-[#1A1918]/85'
              }`}
            >
              {cat.label}
              {activeCategory === cat.value && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Action Icons (Search, Wishlist, Bag) */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-1.5 text-[#1A1918] hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-1.5"
            aria-label="Search formulations"
          >
            <Search className="w-4 h-4" />
            <span className="text-[11px] tracking-[0.15em] font-medium uppercase hidden sm:inline">
              SEARCH
            </span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setWishlistOpen(true)}
            className="p-1.5 text-[#1A1918] hover:text-[#D4AF37] transition-colors duration-300 relative flex items-center gap-1.5"
            aria-label="View Wishlist"
          >
            <Heart className="w-4 h-4" />
            <span className="text-[11px] tracking-[0.15em] font-medium uppercase hidden sm:inline">
              WISHLIST
            </span>
            {totalWishlistCount > 0 && (
              <span className="w-4 h-4 bg-[#D4AF37] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {totalWishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1918] text-white hover:bg-[#D4AF37] transition-all duration-300 shadow-sm active:scale-95 group"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E8DFD3] group-hover:text-white transition-colors" />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase">BAG</span>
            {totalCartCount > 0 && (
              <span className="px-1.5 py-0.5 bg-[#D4AF37] text-[#1A1918] text-[9px] font-bold rounded-full">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[64px] bg-[#FAF8F5]/95 backdrop-blur-2xl border-b border-[#E8DFD3] px-6 py-8 shadow-2xl animate-fade-in">
          <div className="flex flex-col space-y-4 max-w-sm mx-auto">
            {navCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryClick(cat.value)}
                className={`text-left text-sm tracking-[0.2em] font-medium py-3 border-b border-[#E8DFD3]/40 flex items-center justify-between ${
                  activeCategory === cat.value ? 'text-[#D4AF37] font-bold' : 'text-[#1A1918]'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-xs text-[#D4AF37]">→</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
