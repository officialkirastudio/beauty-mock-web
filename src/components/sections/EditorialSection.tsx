import React from 'react';
import { Camera } from 'lucide-react';

export const EditorialSection: React.FC = () => {
  const editorialItems = [
    {
      title: 'THE CRYSTAL SHINE RITUAL',
      handle: '@lumera.official',
      tag: '#LumeraGlow',
      gradient: 'from-[#FAF2EB] to-[#F5E6DA]',
      image: '/products/lum-sk-01.png'
    },
    {
      title: 'ROSE QUARTZ SCULPTING',
      handle: '@lumera.official',
      tag: '#BeautyReimagined',
      gradient: 'from-[#FDF4F6] to-[#F7E2E7]',
      image: '/products/lum-tl-01.png'
    },
    {
      title: 'EXTRAIT DE PARFUM FLACON',
      handle: '@lumera.official',
      tag: '#LOrDeRose',
      gradient: 'from-[#FAF6ED] to-[#F2E5D0]',
      image: '/products/lum-fr-01.png'
    },
    {
      title: 'MORNING HYDRATION MIST',
      handle: '@lumera.official',
      tag: '#SkinRitual',
      gradient: 'from-[#F3F8F5] to-[#E2EFE7]',
      image: '/products/lum-sk-03.png'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-lumera-champagne/60">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-lumera-gold block mb-2">
          SOCIAL LIFESTYLE EDIT
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-lumera-charcoal uppercase tracking-wider mb-4">
          THE LUMÉRA EDIT
        </h2>
        <p className="text-sm text-lumera-muted leading-relaxed">
          Follow <strong className="text-lumera-charcoal">@lumera.official</strong> on Instagram to join our global community of glow lovers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {editorialItems.map((item, idx) => (
          <div
            key={idx}
            className={`group relative h-80 rounded-3xl p-6 bg-gradient-to-b ${item.gradient} border border-lumera-champagne/70 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
          >
            <div className="flex justify-between items-center z-10">
              <span className="px-3 py-1 rounded-full bg-white/80 text-[10px] font-bold text-lumera-charcoal tracking-wider uppercase backdrop-blur-md">
                {item.tag}
              </span>
              <Camera className="w-5 h-5 text-lumera-charcoal group-hover:text-lumera-gold transition-colors" />
            </div>

            {/* Realistic Premium Beauty Editorial Product Visual */}
            <div className="relative my-auto w-full aspect-square flex items-center justify-center p-2 transform group-hover:scale-105 transition-transform duration-500 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain object-center drop-shadow-md"
              />
            </div>

            <div className="z-10">
              <h4 className="font-serif text-lg font-normal text-lumera-charcoal group-hover:text-lumera-gold transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-lumera-muted">{item.handle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
