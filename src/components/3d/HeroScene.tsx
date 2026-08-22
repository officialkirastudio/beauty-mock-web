import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroSceneProps {
  mousePos: { x: number; y: number };
  isEntered: boolean;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ mousePos, isEntered }) => {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 5.5));

  useFrame((_, delta) => {
    // Parallax mouse tilt effect
    const mouseX = (mousePos.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mousePos.y / window.innerHeight) * 2 + 1;

    if (isEntered) {
      // Zoom forward into store environment
      targetCamPos.current.set(0, 0.2, 2.2);
    } else {
      // Subtle float camera on parallax
      targetCamPos.current.set(mouseX * 0.6, mouseY * 0.4 + 0.2, 5.5);
    }

    camera.position.lerp(targetCamPos.current, delta * 2.5);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Lighting System */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} color="#FFFBF0" castShadow />
      <spotLight position={[-5, 5, -2]} intensity={2.0} color="#E8DFD3" angle={0.6} penumbra={0.8} />
      <pointLight position={[0, -2, 2]} intensity={0.8} color="#D4AF37" />

      {/* Showroom Environment Architecture */}
      {/* Marble Reflective Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#FAF8F5" roughness={0.12} metalness={0.15} />
      </mesh>

      {/* Back Curved Wall */}
      <mesh position={[0, 4, -8]} rotation={[0, 0, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#F4ECE1" roughness={0.4} />
      </mesh>



      {/* Floating Ambient Pearl Particles */}
      <group position={[0, 0, 0]}>
        {Array.from({ length: 25 }).map((_, i) => {
          const x = (Math.sin(i * 99) - 0.5) * 8;
          const y = (Math.cos(i * 33) - 0.5) * 6;
          const z = (Math.sin(i * 12) - 0.5) * 6;
          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.02, 16, 16]} />
              <meshBasicMaterial color="#D4AF37" transparent opacity={0.6} />
            </mesh>
          );
        })}
      </group>
    </>
  );
};
