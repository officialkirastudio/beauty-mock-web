import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Mirror3D: React.FC = () => {
  const mirrorGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (mirrorGroupRef.current) {
      mirrorGroupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.08;
    }
  });

  return (
    <group ref={mirrorGroupRef} position={[0, 0, 0]}>
      {/* Outer Metallic Champagne Mirror Frame */}
      <mesh position={[0, 0, 0]} scale={[1.3, 1.8, 0.15]}>
        <cylinderGeometry args={[1, 1, 0.2, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.12} />
      </mesh>

      {/* Reflective Glass Inner Mirror */}
      <mesh position={[0, 0, 0.1]} scale={[1.2, 1.7, 0.05]}>
        <cylinderGeometry args={[0.96, 0.96, 0.2, 64]} />
        <meshPhysicalMaterial
          color="#FAF8F5"
          metalness={0.98}
          roughness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.0}
        />
      </mesh>

      {/* Futuristic Scan Lines Hologram */}
      <mesh position={[0, 0, 0.15]} scale={[1.15, 1.65, 0.01]}>
        <planeGeometry args={[1.8, 2.6]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.08} wireframe />
      </mesh>
    </group>
  );
};
