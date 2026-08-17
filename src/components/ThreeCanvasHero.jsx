import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, MeshWobbleMaterial, Line, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Code, Users, TrendingUp, Cpu, Sparkles, ShieldCheck, Zap } from 'lucide-react';

// Background 3D Star / Particle Dust Field
const ParticleCloud = ({ count = 300 }) => {
  const points = useRef();

  const positions = React.useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 15;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 15;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return coords;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.05;
      points.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#D4AF37" size={0.04} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  );
};

// Central Ecosystem Core Orb
const CentralEcosystemOrb = () => {
  const meshRef = useRef();
  const ringRef = useRef();
  const secondaryRingRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3;
      ringRef.current.rotation.x += delta * 0.15;
    }
    if (secondaryRingRef.current) {
      secondaryRingRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Metallic Gold Orbit Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.3, 0.035, 16, 100]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.8} metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Secondary Cyan Accent Ring */}
      <mesh ref={secondaryRingRef} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.6, 0.02, 16, 100]} />
        <meshStandardMaterial color="#3B82F6" emissive="#1D4ED8" emissiveIntensity={0.7} metalness={0.8} />
      </mesh>

      {/* Core Glowing Sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.15, 3]} />
          <MeshWobbleMaterial
            color="#0B2545"
            emissive="#1E3A8A"
            emissiveIntensity={0.6}
            metalness={0.85}
            roughness={0.15}
            factor={0.18}
            speed={1.8}
          />
        </mesh>

        {/* Golden Nucleus */}
        <mesh>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1.8} metalness={1} roughness={0} />
        </mesh>
      </Float>
    </group>
  );
};

// Energy Line
const EnergyConnectorLine = ({ start, end, color = '#D4AF37' }) => {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  return (
    <Line
      points={points}
      color={color}
      lineWidth={2.5}
      dashed={true}
      dashScale={6}
      dashSize={0.6}
      gapSize={0.2}
    />
  );
};

// Floating 3D Node Module
const FloatingModuleCard = ({ position, title, subtitle, accentColor, emissiveColor, rotationSpeed = 0.5 }) => {
  const cardRef = useRef();

  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * rotationSpeed) * 0.12;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.8} position={position}>
      <group ref={cardRef}>
        {/* Card Backplate */}
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[2.5, 1.45, 0.08]} />
          <meshStandardMaterial
            color="#0B132B"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Border Frame Glow */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[2.54, 1.49, 0.04]} />
          <meshStandardMaterial color={accentColor} emissive={emissiveColor} emissiveIntensity={0.8} />
        </mesh>

        {/* Node Sphere Marker */}
        <mesh position={[-0.85, 0, 0.1]}>
          <sphereGeometry args={[0.24, 16, 16]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.2} />
        </mesh>

        {/* Title */}
        <Text
          position={[0.2, 0.25, 0.1]}
          fontSize={0.24}
          color="#FFFFFF"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>

        {/* Subtitle */}
        <Text
          position={[0.2, -0.15, 0.1]}
          fontSize={0.14}
          color="#CBD5E1"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
          anchorX="center"
          anchorY="middle"
        >
          {subtitle}
        </Text>
      </group>
    </Float>
  );
};

// Scene Content Component
const HeroSceneContent = ({ mousePos }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mousePos.x * 0.3, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mousePos.y * 0.2, 0.05);
    }
  });

  const techPos = [-3.1, 1.8, 0.5];
  const talentPos = [3.2, 1.2, 0.8];
  const bizPos = [-0.5, -2.3, 0.6];
  const corePos = [0, 0, 0];

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#D4AF37" />
      <pointLight position={[5, 5, 5]} intensity={1.8} color="#3B82F6" />

      {/* Background Particles */}
      <ParticleCloud count={250} />

      {/* Central Ecosystem Core Orb */}
      <CentralEcosystemOrb />

      {/* 3 Interconnected Modules */}
      <FloatingModuleCard
        position={techPos}
        title="TECHNOLOGY"
        subtitle="Software • Web • Cloud"
        accentColor="#3B82F6"
        emissiveColor="#1D4ED8"
        rotationSpeed={0.4}
      />

      <FloatingModuleCard
        position={talentPos}
        title="TALENT"
        subtitle="Recruitment • Staffing"
        accentColor="#D4AF37"
        emissiveColor="#F59E0B"
        rotationSpeed={0.6}
      />

      <FloatingModuleCard
        position={bizPos}
        title="BUSINESS"
        subtitle="Operations • Growth"
        accentColor="#10B981"
        emissiveColor="#047857"
        rotationSpeed={0.5}
      />

      {/* Energy Beams */}
      <EnergyConnectorLine start={corePos} end={techPos} color="#3B82F6" />
      <EnergyConnectorLine start={corePos} end={talentPos} color="#D4AF37" />
      <EnergyConnectorLine start={corePos} end={bizPos} color="#10B981" />
      <EnergyConnectorLine start={techPos} end={talentPos} color="#8B5CF6" />
    </group>
  );
};

// CSS 3D High-End Fallback Component
const CSS3DHeroFallback = () => {
  return (
    <div className="relative w-full h-[480px] sm:h-[580px] flex items-center justify-center p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl animate-pulse-glow"></div>
      <div className="absolute top-1/3 right-10 w-70 h-70 rounded-full bg-blue-600/20 blur-3xl animate-pulse"></div>

      {/* Central Card */}
      <div className="relative z-10 p-8 rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-slate-900/95 border-2 border-amber-500/50 backdrop-blur-2xl shadow-2xl shadow-amber-500/20 text-center max-w-xs animate-float-slow">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/20">
          <Zap className="w-8 h-8 animate-bounce" />
        </div>
        <h3 className="text-xl font-extrabold text-white tracking-tight">Renovia Ecosystem</h3>
        <p className="text-xs text-amber-300 font-bold mt-1 uppercase tracking-wider">Technology • Talent • Business</p>
      </div>

      {/* Floating Module 1: Technology */}
      <div className="absolute top-8 left-2 sm:left-6 z-20 p-4 rounded-2xl bg-slate-900/90 border border-blue-500/50 backdrop-blur-xl shadow-2xl text-left w-56 transform -rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-blue-400 font-bold uppercase tracking-wider">Technology</div>
            <div className="text-sm font-semibold text-white">Software & Web</div>
          </div>
        </div>
      </div>

      {/* Floating Module 2: Talent */}
      <div className="absolute bottom-12 right-2 sm:right-6 z-20 p-4 rounded-2xl bg-slate-900/90 border border-amber-500/50 backdrop-blur-xl shadow-2xl text-left w-56 transform rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Talent</div>
            <div className="text-sm font-semibold text-white">Recruitment & Staffing</div>
          </div>
        </div>
      </div>

      {/* Floating Module 3: Business */}
      <div className="absolute bottom-4 left-4 sm:left-12 z-20 p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/50 backdrop-blur-xl shadow-2xl text-left w-56 transform rotate-2 hover:rotate-0 transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Business</div>
            <div className="text-sm font-semibold text-white">Operations Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ThreeCanvasHero = () => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = -(e.clientY / innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  if (!hasWebGL) {
    return <CSS3DHeroFallback />;
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-[480px] sm:h-[580px] lg:h-[640px] rounded-3xl overflow-hidden glass-card border border-slate-700/80 shadow-2xl shadow-black/90"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/90 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <HeroSceneContent mousePos={mousePos} />
      </Canvas>

      <div className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] text-slate-300 flex items-center gap-2 pointer-events-none shadow-lg">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
        <span>Interactive 3D Matrix • Move cursor to tilt</span>
      </div>
    </div>
  );
};

export default ThreeCanvasHero;
