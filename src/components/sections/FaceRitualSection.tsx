import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { StylizedFace3D } from '../3d/StylizedFace3D';
import type { SkinConcern } from '../../types/product';
import { LUMERA_PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { Compass } from 'lucide-react';

export const FaceRitualSection: React.FC = () => {
  const [activeConcern, setActiveConcern] = useState<SkinConcern>('hydration');

  const recommendedProducts = LUMERA_PRODUCTS.filter((p) =>
    p.skinConcern.includes(activeConcern)
  ).slice(0, 3);

  const concernTitles: Record<SkinConcern, { title: string; desc: string }> = {
    hydration: {
      title: 'CELLULAR HYDRATION RITUAL',
      desc: 'Targeted multi-layer hyaluronic acid & snow mushroom polysaccharides to plump dehydration lines.'
    },
    glow: {
      title: 'LUMINOUS GLASS RADIANCE RITUAL',
      desc: 'Liquid crystal lipids & stabilized THD ascorbate Vitamin C to ignite an inner crystal sheen.'
    },
    brightening: {
      title: 'PERI-ORBITAL BRIGHTENING RITUAL',
      desc: 'Green caffeine micro-circulation & matrixyl peptides to dissolve shadow discoloration.'
    },
    firmness: {
      title: 'CONTOUR SCULPT & TONE RITUAL',
      desc: 'Grade-A Rose Quartz lymphatic drainage paired with bio-identical ceramide restructuring.'
    },
    'anti-aging': {
      title: 'ETERNAL REGENERATIVE RITUAL',
      desc: 'Plant-based bakuchiol & ATP microcurrent stimulation to smooth fine stress lines.'
    },
    texture: {
      title: 'PORE REFINING RITUAL',
      desc: 'Gentle micro-exfoliating AHAs & 10% niacinamide concentrate for velvet satin smoothness.'
    },
    calming: {
      title: 'BARRIER CALMING RITUAL',
      desc: 'Air-whipped white camellia & centella asiatica to soothe flushing and redness.'
    },
    protection: {
      title: 'SOLAR & ENVIRONMENTAL DEFENSE',
      desc: 'Broad-spectrum Tinosorb & resveratrol photostable solar shield.'
    }
  };

  return (
    <section id="face-ritual" className="py-24 bg-gradient-to-b from-[#FAF8F5] via-[#FFFBF5] to-[#FAF8F5] border-y border-lumera-champagne/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-lumera-gold block mb-2">
            INTERACTIVE SKIN ANALYZER
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-lumera-charcoal uppercase tracking-wider mb-4">
            YOUR SKIN. YOUR RITUAL.
          </h2>
          <p className="text-sm text-lumera-muted leading-relaxed">
            Click on the interactive 3D skin hotspots below to analyze facial zones and reveal targeted LUMÉRA formulations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive 3D Stylized Face Canvas */}
          <div className="lg:col-span-6 h-[420px] sm:h-[500px] bg-gradient-to-b from-[#FFFBF7] to-[#F5EFE6] rounded-3xl border border-lumera-champagne/80 shadow-inner relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-[#E8DFD3] text-[9px] font-semibold text-[#1C1B19] uppercase tracking-[0.2em] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B5913C] animate-pulse" />
              <span>CLICK GLOWING NODES</span>
            </div>

            <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }} dpr={[1, 2]}>
              <ambientLight intensity={1.4} />
              <directionalLight position={[4, 5, 4]} intensity={2.0} color="#FFFBF0" />
              <pointLight position={[-4, 2, 2]} intensity={0.8} color="#D4AF37" />

              <StylizedFace3D activeConcern={activeConcern} onSelectConcern={setActiveConcern} />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.8}
              />
            </Canvas>
          </div>

          {/* Right: Recommended Product Ritual Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-lumera-champagne/60 shadow-sm">
              <span className="text-[10px] font-bold tracking-widest text-lumera-gold uppercase block mb-1">
                ANALYZED ZONE PRESCRIPTION
              </span>
              <h3 className="font-serif text-2xl font-normal text-lumera-charcoal mb-2">
                {concernTitles[activeConcern]?.title}
              </h3>
              <p className="text-xs text-lumera-muted leading-relaxed">
                {concernTitles[activeConcern]?.desc}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-lumera-charcoal flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-lumera-gold" />
                <span>RECOMMENDED RITUAL FORMULATIONS</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
