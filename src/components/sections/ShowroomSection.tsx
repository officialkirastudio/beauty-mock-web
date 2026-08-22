import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';
import { Sparkles, ArrowRight, RotateCw } from 'lucide-react';
import { Interactive3DBottle } from '../3d/Interactive3DBottle';
import { useStore } from '../../store/useStore';
import type { Category, ModelType3D } from '../../types/product';

interface Department {
  id: Category;
  label: string;
  tagline: string;
  description: string;
  modelType: ModelType3D;
  colorHex: string;
  accentColor: string;
}

export const ShowroomSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('skincare');
  const [hasInteracted, setHasInteracted] = useState(false);
  const setFilter = useStore((state) => state.setFilter);

  const departments: Department[] = [
    {
      id: 'skincare',
      label: 'SKINCARE SANCTUARY',
      tagline: 'Bio-Cellular Elixirs & Barrier Hydration',
      description: 'Step into our pure pearl laboratory. Experience triple-weight hyaluronic acid, 15% Vitamin C nectar, and cloud cream formulations.',
      modelType: 'serum',
      colorHex: '#EAD7CE',
      accentColor: '#D4AF37'
    },
    {
      id: 'makeup',
      label: 'COUTURE MAKEUP LOUNGE',
      tagline: 'Liquid Silk & Wet Glass Radiance',
      description: 'Explore high-pigment satin lipsticks in magnetic cases, liquid serum foundations, and light-reflecting wet-look highlighters.',
      modelType: 'lipstick',
      colorHex: '#B23B4A',
      accentColor: '#D4AF37'
    },
    {
      id: 'fragrance',
      label: 'PARFUM EXTRAIT ATELIER',
      tagline: 'Sensual Botanical Sillage',
      description: 'Immerse your senses in Grasse rose, Madagascar vanilla mists, and Florentine iris white oud crystal flacons.',
      modelType: 'perfume',
      colorHex: '#F4DFD0',
      accentColor: '#D4AF37'
    },
    {
      id: 'haircare',
      label: 'SILK HAIR BOTANICALS',
      tagline: 'Restorative Hair Silk & Keratin Rebuilding',
      description: 'Discover Moroccan argan hair silk serums, green caviar keratin repair masks, and biotin scalp stimulants.',
      modelType: 'serum',
      colorHex: '#F0DFBF',
      accentColor: '#C49A45'
    },
    {
      id: 'tools',
      label: 'SCULPTING CRYSTAL STUDIO',
      tagline: 'Architectural Facial Sculpting',
      description: 'Hand-carved Grade-A Rose Quartz Gua Sha, cryo-cooling dual quartz rollers, and microcurrent sculpting devices.',
      modelType: 'roller',
      colorHex: '#F6D9E3',
      accentColor: '#C47890'
    }
  ];

  const currentDept = departments.find((d) => d.id === activeCategory) || departments[0];

  const handleExploreCategory = (cat: Category) => {
    setFilter({ category: cat });
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="showroom-galleries" className="py-24 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto border-t border-[#E8DFD3]/60">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">
          3D SHOWROOM GALLERIES
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1918] uppercase tracking-wider mb-3">
          EXPLORE THE DEPARTMENTS
        </h2>
        <p className="text-sm text-[#6E6C68] leading-relaxed">
          Navigate through our five curated beauty sanctuaries in 3D. Select a department below to inspect its centerpiece formulation.
        </p>
      </div>

      {/* Interactive Category Selector Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setActiveCategory(dept.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 border ${
              activeCategory === dept.id
                ? 'bg-[#1A1918] text-white border-[#1A1918] shadow-md scale-105'
                : 'bg-white/80 text-[#1A1918] border-[#E8DFD3] hover:border-[#D4AF37]'
            }`}
          >
            {dept.id}
          </button>
        ))}
      </div>

      {/* Main 3D Showroom Environment Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#FFFBF7] via-[#FAF5ED] to-[#F3EEE7] rounded-[2.5rem] p-6 sm:p-10 border border-[#E8DFD3] shadow-2xl relative overflow-hidden">
        {/* Left: 3D Interactive WebGL Showroom Canvas */}
        <div className="lg:col-span-7 h-[400px] sm:h-[480px] w-full relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/80 to-[#FAF5ED] border border-[#E8DFD3]">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#E8DFD3] text-[11px] font-medium text-[#1A1918] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="uppercase tracking-widest text-[10px]">3D Interactive Podium</span>
          </div>

          {!hasInteracted && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D4AF37]/50 text-[10px] font-semibold text-[#1A1918] uppercase tracking-[0.2em] shadow-md animate-pulse transition-opacity duration-500">
              <RotateCw className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>DRAG TO ROTATE 360°</span>
            </div>
          )}

          <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={1.6} />
            <directionalLight position={[5, 8, 5]} intensity={2.2} color="#FFFBF0" />
            <spotLight position={[-5, 5, -2]} intensity={1.8} color="#E8DFD3" />
            <pointLight position={[0, -2, 2]} intensity={0.8} color="#D4AF37" />

            <Suspense fallback={null}>
              {/* Marble Pedestal Base */}
              <group position={[0, -1.3, 0]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[1.8, 2.0, 0.25, 64]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.1} />
                </mesh>
                <mesh position={[0, 0.13, 0]}>
                  <cylinderGeometry args={[1.82, 1.82, 0.04, 64]} />
                  <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
                </mesh>
              </group>

              {/* True 3D Interactive LUMÉRA Serum Bottle */}
              <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.2}>
                <Interactive3DBottle
                  category={currentDept.id}
                  colorHex={currentDept.colorHex}
                  accentColor={currentDept.accentColor}
                  onUserInteract={() => setHasInteracted(true)}
                />
              </Float>

              {/* Contact Shadow on Pedestal */}
              <ContactShadows
                position={[0, -1.25, 0]}
                opacity={0.6}
                scale={4.0}
                blur={1.8}
                far={3}
                color="#1A1918"
              />

              <OrbitControls
                enableZoom={true}
                minDistance={3.2}
                maxDistance={6.0}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.8}
                onStart={() => setHasInteracted(true)}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Right: Department Information & Direct Shop CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E8DFD3] shadow-md space-y-4">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase block">
              SELECTED DEPARTMENT
            </span>
            <h3 className="font-serif text-3xl font-light text-[#1A1918] uppercase">
              {currentDept.label}
            </h3>
            <p className="font-serif italic text-lg text-[#D4AF37]">
              "{currentDept.tagline}"
            </p>
            <p className="text-xs text-[#6E6C68] leading-relaxed font-sans">
              {currentDept.description}
            </p>

            <div className="pt-4 border-t border-[#E8DFD3]/60">
              <button
                onClick={() => handleExploreCategory(currentDept.id)}
                className="w-full py-4 rounded-full bg-[#1A1918] text-white hover:bg-[#D4AF37] font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>SHOP {currentDept.id.toUpperCase()} COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
