import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { IngredientParticles } from '../3d/IngredientParticles';
import { LUMERA_PRODUCTS } from '../../data/products';
import { Atom } from 'lucide-react';

export const IngredientSection: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState('ha');

  const ingredientsList = [
    {
      id: 'ha',
      name: 'Triple Hyaluronic Acid',
      benefit: 'Holds 1,000x its weight in water to plump deep dehydration lines.',
      color: '#A0C4FF',
      position: [0, 0, 0] as [number, number, number]
    },
    {
      id: 'vitc',
      name: 'THD Ascorbate 15%',
      benefit: 'Ultra-pure lipid-soluble Vitamin C that ignites collagen & fades spots.',
      color: '#FFD6A5',
      position: [2.2, 1.2, -0.8] as [number, number, number]
    },
    {
      id: 'niac',
      name: 'Niacinamide 5%',
      benefit: 'Smoothes rough pore texture and reinforces lipid moisture barriers.',
      color: '#CAFFBF',
      position: [-2.2, -1.0, 0.5] as [number, number, number]
    },
    {
      id: 'ceramides',
      name: 'Bio-Identical Ceramides',
      benefit: 'Restores essential skin lipids to seal 72-hour humidity.',
      color: '#FDFFB6',
      position: [1.8, -1.5, 0.8] as [number, number, number]
    },
    {
      id: 'peptides',
      name: 'Matrixyl 3000 Peptides',
      benefit: 'Clinical signal peptides that enhance tissue firmness & elasticity.',
      color: '#FFADAD',
      position: [-1.8, 1.4, -0.5] as [number, number, number]
    }
  ];

  const current = ingredientsList.find((i) => i.id === selectedIngredient) || ingredientsList[0];

  const matchingProducts = LUMERA_PRODUCTS.filter((p) =>
    p.ingredients.some((ing) => ing.toLowerCase().includes(current.name.split(' ')[0].toLowerCase()))
  ).slice(0, 3);

  return (
    <section id="ingredient-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-lumera-gold block mb-2">
          BOTANICAL & BIO-CELLULAR SCIENCE
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-lumera-charcoal uppercase tracking-wider mb-4">
          WHAT'S INSIDE
        </h2>
        <p className="text-sm text-lumera-muted leading-relaxed">
          Interact with 3D molecular ingredient particles to explore active bio-complexes powering LUMÉRA elixirs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Ingredient Particles Canvas */}
        <div className="lg:col-span-7 h-[420px] sm:h-[500px] bg-gradient-to-b from-[#FFFBF7] to-[#FAF3EA] rounded-3xl border border-lumera-champagne/80 shadow-inner relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-lumera-champagne text-xs font-medium text-lumera-charcoal shadow-sm">
            <Atom className="w-3.5 h-3.5 text-lumera-gold" />
            <span className="uppercase tracking-widest text-[10px]">Click Floating Molecules</span>
          </div>

          <Canvas camera={{ position: [0, 0, 6.0], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[4, 5, 4]} intensity={2.0} color="#FFFBF0" />
            <pointLight position={[0, -2, 2]} intensity={0.8} color="#D4AF37" />

            <IngredientParticles
              ingredients={ingredientsList}
              selectedId={selectedIngredient}
              onSelect={setSelectedIngredient}
            />

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
          </Canvas>
        </div>

        {/* Right: Ingredient Detail Card & Formulations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-lumera-champagne/80 shadow-md">
            <span className="text-[10px] font-bold tracking-widest text-lumera-gold uppercase block mb-1">
              ACTIVE MOLECULE MATRIX
            </span>
            <h3 className="font-serif text-3xl font-normal text-lumera-charcoal mb-2">
              {current.name}
            </h3>
            <p className="text-xs text-lumera-muted leading-relaxed mb-6">
              {current.benefit}
            </p>

            <div className="pt-4 border-t border-lumera-champagne/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-lumera-charcoal mb-3">
                Formulations Containing {current.name.split(' ')[0]}
              </h4>
              <div className="space-y-3">
                {matchingProducts.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl bg-lumera-pearl/50 border border-lumera-champagne/50 flex items-center justify-between text-xs">
                    <span className="font-serif font-semibold text-lumera-charcoal">{p.name}</span>
                    <span className="text-lumera-gold font-bold">{p.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
