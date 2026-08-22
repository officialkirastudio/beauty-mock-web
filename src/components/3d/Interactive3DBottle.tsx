import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Category } from '../../types/product';

interface Interactive3DBottleProps {
  category?: Category;
  colorHex?: string;
  accentColor?: string;
  onUserInteract?: () => void;
}

export const Interactive3DBottle: React.FC<Interactive3DBottleProps> = ({
  colorHex = '#EAD7CE',
  accentColor = '#D4AF37',
  onUserInteract
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const previousPointerX = useRef(0);
  const targetRotationY = useRef(0);
  const currentRotationY = useRef(0);

  // Department colors mapping
  const liquidColor = useMemo(() => new THREE.Color(colorHex), [colorHex]);
  const goldColor = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  // Generate 360° cylindrical canvas label (Front branding & Back details)
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Cream background with subtle paper texture feel
      ctx.fillStyle = '#FAF7F2';
      ctx.fillRect(0, 0, 1024, 512);

      // Gold border accent
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 6;
      ctx.strokeRect(16, 16, 992, 480);

      // --- FRONT LABEL (x: 0 .. 512) ---
      ctx.fillStyle = '#1A1918';
      ctx.font = '300 46px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('LUMÉRA', 256, 175);

      ctx.fillStyle = '#D4AF37';
      ctx.font = '600 22px sans-serif';
      ctx.fillText('HYDRAGLOW', 256, 235);

      ctx.fillStyle = '#5A5752';
      ctx.font = '400 16px sans-serif';
      ctx.fillText('CELLULAR SERUM', 256, 280);

      ctx.fillStyle = '#8C8880';
      ctx.font = '400 14px sans-serif';
      ctx.fillText('50 ML / 1.7 FL. OZ.', 256, 325);

      // Divider line
      ctx.fillStyle = '#D4AF37';
      ctx.fillRect(206, 360, 100, 2);

      // --- BACK LABEL (x: 512 .. 1024) ---
      ctx.fillStyle = '#1A1918';
      ctx.font = '300 28px Georgia, serif';
      ctx.fillText('LUMÉRA FORMULATION', 768, 140);

      ctx.fillStyle = '#6E6C68';
      ctx.font = '400 14px sans-serif';
      ctx.fillText('TRIPLE-WEIGHT HYALURONIC ACID', 768, 200);
      ctx.fillText('BIO-FERMENTED PEPTIDE COMPLEX', 768, 235);
      ctx.fillText('DAMASK ROSE & PEARL RADIANCE', 768, 270);
      ctx.fillText('DERMATOLOGICALLY TESTED', 768, 310);

      ctx.fillStyle = '#8C8880';
      ctx.font = '400 13px sans-serif';
      ctx.fillText('MADE IN FRANCE • ARTISANAL BATCH', 768, 365);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);

  // Frame update loop with smooth inertia & auto-rotation
  useFrame((_, delta) => {
    if (!isDragging.current) {
      // Auto-rotation at ~0.25 rpm when idle
      targetRotationY.current += delta * 0.35;
    }
    // Smooth interpolation (lerp)
    currentRotationY.current += (targetRotationY.current - currentRotationY.current) * 0.08;

    if (groupRef.current) {
      groupRef.current.rotation.y = currentRotationY.current;
    }
  });

  // Pointer event handlers for 360° Y-axis rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    isDragging.current = true;
    previousPointerX.current = e.clientX;
    if (onUserInteract) onUserInteract();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    e.stopPropagation();
    const deltaX = e.clientX - previousPointerX.current;
    targetRotationY.current += deltaX * 0.008;
    previousPointerX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    isDragging.current = false;
  };

  return (
    <group
      ref={groupRef}
      position={[0, 0.05, 0]}
      scale={[1.1, 1.1, 1.1]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* --- 3D BOTTLE GEOMETRY --- */}

      {/* 1. Transparent Glass Outer Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.68, 0.68, 1.8, 64]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.94}
          roughness={0.06}
          ior={1.5}
          thickness={0.45}
          transparent
          opacity={0.88}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Glass Base Ring */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.68, 0.68, 0.1, 64]} />
        <meshPhysicalMaterial color="#FAF5EE" roughness={0.1} transmission={0.7} />
      </mesh>

      {/* Glass Shoulder Curve */}
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.42, 0.68, 0.15, 64]} />
        <meshPhysicalMaterial color="#FFFFFF" transmission={0.92} roughness={0.08} />
      </mesh>

      {/* 2. Inner Translucent Liquid Volume */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 1.55, 64]} />
        <meshPhysicalMaterial
          color={liquidColor}
          transmission={0.55}
          roughness={0.2}
          ior={1.33}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 3. 360° Cylindrical Pearl Label */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.685, 0.685, 0.9, 64]} />
        <meshStandardMaterial
          map={labelTexture}
          roughness={0.25}
          metalness={0.05}
          transparent
        />
      </mesh>

      {/* 4. Metallic Champagne Gold Neck Collar */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.38, 0.42, 0.25, 64]} />
        <meshStandardMaterial color={goldColor} metalness={0.92} roughness={0.12} />
      </mesh>

      {/* Gold Ring Trim */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.08, 64]} />
        <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.08} />
      </mesh>

      {/* 5. Soft Matte Black/Dark Dropper Top */}
      <mesh position={[0, 1.5, 0]} scale={[1, 1.25, 1]}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial color="#242220" roughness={0.6} metalness={0.1} />
      </mesh>
    </group>
  );
};
