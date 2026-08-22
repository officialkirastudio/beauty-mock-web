import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { Product3DModel } from './Product3DModel';
import type { Product } from '../../types/product';

interface ProductViewer360Props {
  product: Product;
  autoRotate?: boolean;
}

export const ProductViewer360: React.FC<ProductViewer360Props> = ({ product, autoRotate = true }) => {
  return (
    <div className="w-full h-full relative min-h-[320px] sm:min-h-[420px] flex items-center justify-center bg-gradient-to-b from-[#FFFBF7] to-[#FAF5ED] rounded-2xl overflow-hidden shadow-inner border border-lumera-champagne/40">
      {/* 360 Drag Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-lumera-champagne text-xs font-medium text-lumera-charcoal shadow-sm">
        <span className="w-2 h-2 rounded-full bg-lumera-gold animate-ping" />
        <span className="uppercase tracking-widest text-[10px]">360° Interactive Inspector</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 text-[11px] tracking-wider text-lumera-muted uppercase pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 5]} intensity={2.2} color="#FFFBF5" castShadow />
        <spotLight position={[-5, 5, -2]} intensity={1.8} color="#E8DFD3" />
        <pointLight position={[0, -2, 2]} intensity={0.6} color="#D4AF37" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <group position={[0, 0, 0]}>
              <Product3DModel
                modelType={product.modelType}
                colorHex={product.colorHex}
                accentColor={product.accentColor}
                autoRotate={false}
                scale={1.2}
              />
            </group>
          </Float>

          <ContactShadows
            position={[0, -1.3, 0]}
            opacity={0.5}
            scale={4}
            blur={2}
            far={3}
            color="#2B2826"
          />

          <OrbitControls
            enableZoom={true}
            minDistance={2.5}
            maxDistance={6}
            autoRotate={autoRotate}
            autoRotateSpeed={2.5}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
