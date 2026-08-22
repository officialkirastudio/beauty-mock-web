import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { SkinConcern } from '../../types/product';

interface StylizedFace3DProps {
  activeConcern: SkinConcern;
  onSelectConcern: (concern: SkinConcern) => void;
}

export const StylizedFace3D: React.FC<StylizedFace3DProps> = ({ activeConcern, onSelectConcern }) => {
  const headGroupRef = useRef<THREE.Group>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<SkinConcern | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (headGroupRef.current) {
      // Gentle floating head rotation
      headGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.12;
    }
  });

  const hotspots: {
    concern: SkinConcern;
    label: string;
    position: [number, number, number];
    benefit: string;
    align: 'top' | 'left' | 'right' | 'bottom';
  }[] = [
    {
      concern: 'hydration',
      label: 'FOREHEAD ZONE',
      position: [0, 1.15, 0.72],
      benefit: 'Cellular Moisture Lock',
      align: 'top'
    },
    {
      concern: 'brightening',
      label: 'UNDER EYE CONTOUR',
      position: [-0.45, 0.45, 0.78],
      benefit: 'Dark Circle Revival',
      align: 'left'
    },
    {
      concern: 'glow',
      label: 'CHEEKBONE RADIANCE',
      position: [0.75, 0.2, 0.65],
      benefit: 'Lit-From-Within Sheen',
      align: 'right'
    },
    {
      concern: 'firmness',
      label: 'JAWLINE SCULPT',
      position: [0, -0.75, 0.75],
      benefit: 'Elasticity Lift & Tone',
      align: 'bottom'
    }
  ];

  // Currently displayed target concern (hovered takes priority, else active)
  const activeTargetConcern = hoveredHotspot || activeConcern;

  return (
    <group ref={headGroupRef} position={[0, -0.2, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Head Base Mesh */}
      <mesh position={[0, 0.2, 0]} scale={[0.85, 1.25, 0.85]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#FAF5EE"
          roughness={0.25}
          metalness={0.05}
          transmission={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Nose Contour */}
      <mesh position={[0, 0.18, 0.82]} scale={[0.15, 0.45, 0.2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#F2ECE4" roughness={0.3} />
      </mesh>

      {/* Cheekbone Curves */}
      <mesh position={[0.65, 0.15, 0.5]} scale={[0.3, 0.25, 0.3]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#F7EEE6" roughness={0.3} />
      </mesh>
      <mesh position={[-0.65, 0.15, 0.5]} scale={[0.3, 0.25, 0.3]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#F7EEE6" roughness={0.3} />
      </mesh>

      {/* Neck Base */}
      <mesh position={[0, -1.2, -0.1]}>
        <cylinderGeometry args={[0.42, 0.55, 1.1, 32]} />
        <meshStandardMaterial color="#FAF5EE" roughness={0.3} />
      </mesh>

      {/* Minimal Hotspot Nodes */}
      {hotspots.map((hs) => {
        const isActive = activeConcern === hs.concern;
        const isTooltipVisible = activeTargetConcern === hs.concern;

        return (
          <group key={hs.concern} position={hs.position}>
            {/* Soft Glowing Halo Ring around Node */}
            <mesh scale={isTooltipVisible ? [1.3, 1.3, 1.3] : [1, 1, 1]}>
              <sphereGeometry args={[0.07, 24, 24]} />
              <meshBasicMaterial
                color={isActive ? '#D4AF37' : '#C5A059'}
                transparent
                opacity={isTooltipVisible ? 0.35 : 0.15}
              />
            </mesh>

            {/* Glowing Center Core Node */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectConcern(hs.concern);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredHotspot(hs.concern);
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                setHoveredHotspot(null);
                document.body.style.cursor = 'default';
              }}
            >
              <sphereGeometry args={[isTooltipVisible ? 0.05 : 0.04, 32, 32]} />
              <meshStandardMaterial
                color={isActive ? '#D4AF37' : '#B5913C'}
                emissive={isActive ? '#D4AF37' : '#9E7E45'}
                emissiveIntensity={isTooltipVisible ? 2.2 : 0.8}
                roughness={0.1}
              />
            </mesh>

            {/* Single Active Compact Tooltip with Connecting Line */}
            {isTooltipVisible && (
              <Html distanceFactor={6.5} zIndexRange={[100, 0]} center>
                <div
                  onClick={() => onSelectConcern(hs.concern)}
                  className="cursor-pointer select-none transition-all duration-300 ease-out"
                >
                  {hs.align === 'right' && (
                    <div className="flex items-center gap-0 animate-fade-in">
                      <div className="w-5 sm:w-7 h-[1px] bg-gradient-to-r from-[#B5913C] to-[#B5913C]/40 shrink-0" />
                      <div className="px-3 py-1.5 rounded-[18px] bg-white/92 backdrop-blur-md border border-[#B5913C]/35 shadow-lg flex flex-col text-left whitespace-nowrap min-w-[130px] max-w-[200px]">
                        <span className="text-[10px] font-bold tracking-widest text-[#1C1B19] uppercase font-serif">
                          {hs.label}
                        </span>
                        <span className="text-[9px] text-[#B5913C] font-sans font-medium">
                          {hs.benefit}
                        </span>
                      </div>
                    </div>
                  )}

                  {hs.align === 'left' && (
                    <div className="flex items-center gap-0 animate-fade-in">
                      <div className="px-3 py-1.5 rounded-[18px] bg-white/92 backdrop-blur-md border border-[#B5913C]/35 shadow-lg flex flex-col text-right whitespace-nowrap min-w-[130px] max-w-[200px]">
                        <span className="text-[10px] font-bold tracking-widest text-[#1C1B19] uppercase font-serif">
                          {hs.label}
                        </span>
                        <span className="text-[9px] text-[#B5913C] font-sans font-medium">
                          {hs.benefit}
                        </span>
                      </div>
                      <div className="w-5 sm:w-7 h-[1px] bg-gradient-to-l from-[#B5913C] to-[#B5913C]/40 shrink-0" />
                    </div>
                  )}

                  {hs.align === 'top' && (
                    <div className="flex flex-col items-center gap-0 animate-fade-in -translate-y-4">
                      <div className="px-3 py-1.5 rounded-[18px] bg-white/92 backdrop-blur-md border border-[#B5913C]/35 shadow-lg flex flex-col text-center whitespace-nowrap min-w-[130px] max-w-[200px]">
                        <span className="text-[10px] font-bold tracking-widest text-[#1C1B19] uppercase font-serif">
                          {hs.label}
                        </span>
                        <span className="text-[9px] text-[#B5913C] font-sans font-medium">
                          {hs.benefit}
                        </span>
                      </div>
                      <div className="h-5 sm:h-7 w-[1px] bg-gradient-to-b from-[#B5913C]/40 to-[#B5913C] shrink-0" />
                    </div>
                  )}

                  {hs.align === 'bottom' && (
                    <div className="flex flex-col items-center gap-0 animate-fade-in translate-y-4">
                      <div className="h-5 sm:h-7 w-[1px] bg-gradient-to-t from-[#B5913C]/40 to-[#B5913C] shrink-0" />
                      <div className="px-3 py-1.5 rounded-[18px] bg-white/92 backdrop-blur-md border border-[#B5913C]/35 shadow-lg flex flex-col text-center whitespace-nowrap min-w-[130px] max-w-[200px]">
                        <span className="text-[10px] font-bold tracking-widest text-[#1C1B19] uppercase font-serif">
                          {hs.label}
                        </span>
                        <span className="text-[9px] text-[#B5913C] font-sans font-medium">
                          {hs.benefit}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};

