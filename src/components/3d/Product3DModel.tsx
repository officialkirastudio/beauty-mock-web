import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ModelType3D } from '../../types/product';

interface Product3DModelProps {
  modelType: ModelType3D;
  colorHex?: string;
  accentColor?: string;
  autoRotate?: boolean;
  scale?: number;
}

export const Product3DModel: React.FC<Product3DModelProps> = ({
  modelType,
  colorHex = '#EAD7CE',
  accentColor = '#D4AF37',
  autoRotate = true,
  scale = 1.0
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const bulletRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.5;
    }
    if (bulletRef.current && modelType === 'lipstick') {
      bulletRef.current.rotation.y += delta * 0.8;
    }
  });

  const liquidColor = new THREE.Color(colorHex);
  const goldColor = new THREE.Color(accentColor);

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {modelType === 'serum' && (
        <group>
          {/* Glass Outer Bottle */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 2.2, 32, 1, true]} />
            <meshPhysicalMaterial
              transmission={0.92}
              roughness={0.08}
              ior={1.5}
              thickness={0.4}
              color="#FFFFFF"
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Bottle Base & Top Caps */}
          <mesh position={[0, -1.1, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.2} metalness={0.1} />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.2} metalness={0.1} />
          </mesh>

          {/* Liquid Core Inside */}
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.62, 0.62, 1.9, 32]} />
            <meshPhysicalMaterial
              color={liquidColor}
              transmission={0.5}
              roughness={0.25}
              ior={1.33}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
            />
          </mesh>

          {/* Luxury Metallic Gold Collar */}
          <mesh position={[0, 1.25, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.3, 32]} />
            <meshStandardMaterial color={goldColor} metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Soft Matte Dropper Bulb */}
          <mesh position={[0, 1.55, 0]}>
            <sphereGeometry args={[0.32, 32, 16]} />
            <meshStandardMaterial color="#2B2826" roughness={0.6} metalness={0.0} />
          </mesh>

          {/* Pearl Brand Label Ring */}
          <mesh position={[0, 0.1, 0.02]}>
            <cylinderGeometry args={[0.71, 0.71, 0.7, 32, 1, true, -Math.PI / 3, (Math.PI * 2) / 3]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.05} />
          </mesh>
        </group>
      )}

      {modelType === 'cream' && (
        <group position={[0, -0.3, 0]}>
          {/* Glass/Ceramic Jar Body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.1, 0.95, 1.2, 32]} />
            <meshPhysicalMaterial
              color="#FDFBF7"
              transmission={0.3}
              roughness={0.15}
              metalness={0.05}
              clearcoat={0.8}
            />
          </mesh>

          {/* Cream Product Fill */}
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[1.0, 1.0, 0.08, 32]} />
            <meshStandardMaterial color={liquidColor} roughness={0.4} />
          </mesh>

          {/* Gold Luxury Lid */}
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[1.15, 1.15, 0.35, 32]} />
            <meshStandardMaterial color={goldColor} metalness={0.92} roughness={0.12} />
          </mesh>
        </group>
      )}

      {modelType === 'perfume' && (
        <group position={[0, -0.2, 0]}>
          {/* Faceted Crystal Flacon */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.3, 1.8, 0.9]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.95}
              roughness={0.05}
              ior={1.52}
              thickness={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Perfume Liquid */}
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[1.1, 1.5, 0.7]} />
            <meshPhysicalMaterial
              color={liquidColor}
              transmission={0.6}
              roughness={0.1}
              clearcoat={1.0}
            />
          </mesh>

          {/* Gold Neck & Pump */}
          <mesh position={[0, 1.05, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.3, 32]} />
            <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Crystal Rectangular Cap */}
          <mesh position={[0, 1.45, 0]}>
            <boxGeometry args={[0.6, 0.5, 0.5]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.92}
              roughness={0.05}
              ior={1.5}
              thickness={0.3}
            />
          </mesh>
        </group>
      )}

      {modelType === 'lipstick' && (
        <group position={[0, -0.6, 0]}>
          {/* Rose Gold Metal Case Base */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 1.4, 32]} />
            <meshStandardMaterial color={goldColor} metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Inner Golden Mechanism Collar */}
          <mesh position={[0, 0.85, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.3, 32]} />
            <meshStandardMaterial color="#E8DFD3" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Rotating Lipstick Bullet */}
          <mesh ref={bulletRef} position={[0, 1.2, 0]} rotation={[0.2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.7, 32]} />
            <meshStandardMaterial color={liquidColor} roughness={0.35} metalness={0.1} />
          </mesh>
        </group>
      )}

      {modelType === 'roller' && (
        <group position={[0, 0, 0]} rotation={[0, 0, Math.PI / 8]}>
          {/* Metallic Sculpted Handle */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.12, 0.18, 1.8, 32]} />
            <meshStandardMaterial color={goldColor} metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Top Roller Fork */}
          <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.35, 0.06, 16, 32, Math.PI]} />
            <meshStandardMaterial color={goldColor} metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Gemstone Roller Sphere */}
          <mesh position={[0, 0.7, 0]}>
            <sphereGeometry args={[0.36, 32, 32]} />
            <meshPhysicalMaterial
              color={liquidColor}
              roughness={0.1}
              transmission={0.4}
              clearcoat={1.0}
              clearcoatRoughness={0.05}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};
