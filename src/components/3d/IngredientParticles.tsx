import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface IngredientItem {
  id: string;
  name: string;
  benefit: string;
  color: string;
  position: [number, number, number];
}

interface IngredientParticlesProps {
  ingredients: IngredientItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const IngredientParticles: React.FC<IngredientParticlesProps> = ({
  ingredients,
  selectedId,
  onSelect
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {ingredients.map((ing) => {
        const isSelected = selectedId === ing.id;

        return (
          <group key={ing.id} position={ing.position}>
            {/* Glass Molecule Sphere */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelect(ing.id);
              }}
              onPointerOver={() => {
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default';
              }}
              scale={isSelected ? [1.3, 1.3, 1.3] : [1, 1, 1]}
            >
              <sphereGeometry args={[0.42, 32, 32]} />
              <meshPhysicalMaterial
                color={ing.color}
                transmission={0.7}
                roughness={0.15}
                ior={1.4}
                thickness={0.5}
                clearcoat={1.0}
              />
            </mesh>

            {/* HTML Label */}
            <Html distanceFactor={6} position={[0, 0.65, 0]}>
              <button
                onClick={() => onSelect(ing.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg transition-all duration-300 ${
                  isSelected
                    ? 'bg-lumera-charcoal text-lumera-gold border border-lumera-gold scale-110'
                    : 'bg-white/85 text-lumera-charcoal border border-lumera-champagne hover:bg-white'
                }`}
              >
                {ing.name}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
