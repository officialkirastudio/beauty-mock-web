import React from 'react';
import { Award, Feather, Sparkles } from 'lucide-react';

export const FormulationShowcase: React.FC = () => {
  const videoPath = '/videos/Create_an_ultra_premium_cinema.mp4';

  return (
    <section className="py-24 bg-gradient-to-br from-[#FFFBF7] via-[#FAF5ED] to-[#F3EEE7] text-[#1C1B19] relative overflow-hidden border-y border-[#E8DFD3]">
      {/* Subtle Glow Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B18A32]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#777168] block">
              COUTURE SCIENCE STANDARDS
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-wide text-[#1C1B19] uppercase leading-tight">
              THE ART OF FORMULATION
            </h2>

            <p className="text-sm text-[#5C5851] leading-relaxed font-sans">
              Thoughtfully designed beauty essentials for your everyday ritual. Each LUMÉRA elixir is crafted in small artisanal batches, marrying rare botanical actives with bio-engineered cellular transport systems.
            </p>

            {/* Feature Cards with High Contrast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-white/80 border border-[#E8DFD3] shadow-sm">
                <Feather className="w-6 h-6 text-[#8C7750] mb-2" />
                <h4 className="font-serif text-lg font-medium text-[#1C1B19] mb-1">Weightless Textures</h4>
                <p className="text-xs text-[#5C5851]">Melts into deep skin layers with zero greasy residue.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/80 border border-[#E8DFD3] shadow-sm">
                <Award className="w-6 h-6 text-[#8C7750] mb-2" />
                <h4 className="font-serif text-lg font-medium text-[#1C1B19] mb-1">Clinical Efficacy</h4>
                <p className="text-xs text-[#5C5851]">98% barrier improvement in independent clinical trials.</p>
              </div>
            </div>
          </div>

          {/* Right Visual Glass Card with Muted Preview Video */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-white/85 border border-[#E8DFD3] backdrop-blur-xl text-center overflow-hidden shadow-2xl">
              {/* Secondary Muted Video Preview */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#E8DFD3] shadow-xl mb-6">
                <video
                  src={videoPath}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover object-center opacity-95 hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B19]/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1B19]/80 backdrop-blur-md text-[10px] text-[#E8DFD3] uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-[#B18A32]" />
                  <span>Couture Laboratory</span>
                </div>
              </div>

              <div>
                <p className="font-serif text-2xl italic text-[#1C1B19] mb-1">
                  "Purity in every drop."
                </p>
                <p className="text-xs text-[#777168] uppercase tracking-widest font-medium">
                  HAND-CRAFTED • DERMATOLOGICALLY APPROVED
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
