import React from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const FinalCTASection: React.FC = () => {
  const setEnteredStore = useStore((state) => state.setEnteredStore);

  const handleExplore = () => {
    setEnteredStore(true);
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-28 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto text-center relative overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto space-y-6 bg-gradient-to-br from-white/90 via-[#FFFBF7] to-[#FAF5ED] p-10 sm:p-16 rounded-[3rem] border border-[#E8DFD3] shadow-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E8DFD3] text-xs font-semibold text-[#1A1918] uppercase tracking-[0.25em] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>BEGIN YOUR GLOW JOURNEY</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#1A1918] uppercase tracking-wider leading-tight">
          YOUR GLOW STARTS HERE.
        </h2>

        <p className="font-serif italic text-xl text-[#D4AF37]">
          "Discover a new way to experience beauty."
        </p>

        <p className="text-sm text-[#6E6C68] leading-relaxed max-w-lg mx-auto font-sans">
          Step into our virtual showroom, build your custom ritual, or explore our full collection of bio-cellular formulations.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleExplore}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#1A1918] text-white hover:bg-[#D4AF37] font-bold text-xs tracking-[0.25em] uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#E8DFD3]" />
            <span>EXPLORE LUMÉRA</span>
          </button>
        </div>
      </div>
    </section>
  );
};
