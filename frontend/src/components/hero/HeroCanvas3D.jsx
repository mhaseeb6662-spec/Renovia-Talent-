import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Background Floating Ambient Dust Particles
const AmbientParticleField = () => {
  const points = useRef();
  const count = 300;

  const positions = React.useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 20;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 15;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return coords;
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#D4AF37" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.5} />
    </Points>
  );
};

// Fluid Energy Blobs (Behind Ecosystem & Entrance)
const FluidEnergyBlob = ({ position, color = '#3B82F6', scale = 1.5 }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.6} position={position}>
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshWobbleMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          factor={0.4}
          speed={1.2}
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
};

// Architectural Light Strips (Corridor perspective guide lines)
const CorridorArchitecturalStrips = () => {
  return (
    <group>
      {/* Ceiling Light Strips */}
      <mesh position={[-3.5, 3.2, -5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.08, 25]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[3.5, 3.2, -5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.08, 25]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1.2} />
      </mesh>

      {/* Floor Edge Light Strips */}
      <mesh position={[-3.5, -3.2, -5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.08, 25]} />
        <meshStandardMaterial color="#3B82F6" emissive="#1D4ED8" emissiveIntensity={1.0} />
      </mesh>
      <mesh position={[3.5, -3.2, -5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.08, 25]} />
        <meshStandardMaterial color="#D4AF37" emissive="#F59E0B" emissiveIntensity={1.0} />
      </mesh>
    </group>
  );
};

// Camera Controller linked to Progress State (0 = Entrance, 0.5 = Corridor, 1.0 = Main Room)
const CameraTravelController = ({ progress, mousePos }) => {
  useFrame(({ camera }) => {
    // Target Z position: Entrance at Z=12, Corridor at Z=6, Main Room at Z=0
    const targetZ = THREE.MathUtils.lerp(12, 0, progress);
    
    // Smooth lerp camera position
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);

    // Subtle parallax on desktop when settled
    if (progress > 0.8) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePos.x * 0.5, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePos.y * 0.3, 0.05);
    }
  });

  return null;
};

export const HeroCanvas3D = ({ progress, mousePos }) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[0, 0, 10]} intensity={1.0} color="#D4AF37" />
        <pointLight position={[-5, 2, -2]} intensity={1.2} color="#3B82F6" />
        <pointLight position={[5, -2, -2]} intensity={1.2} color="#8B5CF6" />

        {/* Spatial Camera Controller */}
        <CameraTravelController progress={progress} mousePos={mousePos} />

        {/* Ambient Particles & Corridor Architecture */}
        <AmbientParticleField />
        <CorridorArchitecturalStrips />

        {/* Fluid Energy Blobs */}
        <FluidEnergyBlob position={[-4, 1.5, -4]} color="#3B82F6" scale={1.8} />
        <FluidEnergyBlob position={[4, -1.5, -2]} color="#D4AF37" scale={1.6} />
        <FluidEnergyBlob position={[0, 0, -8]} color="#8B5CF6" scale={2.2} />
      </Canvas>
    </div>
  );
};

export default HeroCanvas3D;
