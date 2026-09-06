import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

function InteractiveShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const { theme } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Gentle floating
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  const materialColor = theme === 'dark' ? '#4f46e5' : '#6366f1'; // indigo-500 : indigo-400

  return (
    <Sphere
      ref={meshRef}
      args={[1, 64, 64]}
      scale={hovered ? 1.4 : 1.2}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      position={[0, 0, 0]}
    >
      <MeshDistortMaterial
        color={materialColor}
        envMapIntensity={1}
        clearcoat={theme === 'dark' ? 1 : 0.8}
        clearcoatRoughness={0.1}
        metalness={theme === 'dark' ? 0.8 : 0.4}
        roughness={0.1}
        distort={0.5}
        speed={2}
      />
    </Sphere>
  );
}

export function Background3D() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={theme === 'dark' ? 0.5 : 0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#e0e7ff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#818cf8" />
        
        {/* The interactive center shape - enable pointer events just for this */}
        <group className="pointer-events-auto">
          <InteractiveShape />
        </group>

        {/* Particles for depth */}
        <Sparkles 
          count={150} 
          scale={12} 
          size={1.5} 
          speed={0.3} 
          opacity={theme === 'dark' ? 0.3 : 0.6} 
          color={theme === 'dark' ? "#a5b4fc" : "#6366f1"}
        />
      </Canvas>
    </div>
  );
}
