import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, Line, Points, PointMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Code, Users, Layers, Headphones } from 'lucide-react';

// Surface Connection Network Nodes
const GlobeSurfaceNodes = ({ count = 60 }) => {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    const radius = 2.05;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      coords[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      coords[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      coords[i * 3 + 2] = radius * Math.cos(phi);
    }
    return coords;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#60A5FA" size={0.07} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
    </Points>
  );
};

// Central Rotating Digital Planet Mesh
const CentralDigitalGlobe = () => {
  const innerGlobeRef = useRef();
  const wireframeRef = useRef();
  const atmosphereRingRef = useRef();

  useFrame((state, delta) => {
    if (innerGlobeRef.current) {
      innerGlobeRef.current.rotation.y += delta * 0.12;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.15;
      wireframeRef.current.rotation.x += delta * 0.05;
    }
    if (atmosphereRingRef.current) {
      atmosphereRingRef.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Inner Glowing Navy Core Sphere */}
      <mesh ref={innerGlobeRef}>
        <sphereGeometry args={[1.95, 32, 32]} />
        <MeshWobbleMaterial
          color="#0B1C3D"
          emissive="#1E3A8A"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          factor={0.1}
          speed={1.0}
        />
      </mesh>

      {/* Fine Digital Wireframe Overlay */}
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[2.0, 24, 24]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#1D4ED8"
          emissiveIntensity={0.6}
          wireframe={true}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Outer Electric Blue Atmosphere Orbit Ring */}
      <mesh ref={atmosphereRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.45, 0.02, 16, 100]} />
        <meshStandardMaterial color="#2563EB" emissive="#3B82F6" emissiveIntensity={0.8} metalness={0.9} />
      </mesh>

      {/* Globe Surface Connection Points */}
      <GlobeSurfaceNodes />
    </group>
  );
};

// Orbiting Service Node Component
const OrbitingServiceNode = ({
  radius,
  speed,
  angleOffset,
  tiltAngle,
  title,
  subtitle,
  icon: Icon,
  accentColor
}) => {
  const [nodeData, setNodeData] = React.useState({ x: 0, y: 0, z: 0, isBehind: false });

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed + angleOffset;
    
    // Orbital coordinates with tilt angle
    const rawX = Math.cos(time) * radius;
    const rawZ = Math.sin(time) * radius;
    const rawY = Math.sin(time * 0.5) * tiltAngle;

    const isBehind = rawZ < 0;

    setNodeData({ x: rawX, y: rawY, z: rawZ, isBehind });
  });

  const opacity = nodeData.isBehind ? 0.35 : 1.0;
  const zIndex = nodeData.isBehind ? 5 : 25;

  return (
    <group position={[nodeData.x, nodeData.y, nodeData.z]}>
      {/* Thin Connector Line to Central Globe Center */}
      <Line
        points={[[0, 0, 0], [-nodeData.x, -nodeData.y, -nodeData.z]]}
        color={accentColor}
        lineWidth={1.5}
        transparent
        opacity={nodeData.isBehind ? 0.15 : 0.4}
        dashed={true}
        dashScale={8}
        dashSize={0.4}
      />

      {/* HTML Small Glass Label */}
      <Html center style={{ transition: 'opacity 0.3s ease', opacity, zIndex }}>
        <div className="p-2.5 sm:p-3 rounded-2xl bg-[#080B12]/90 border border-slate-700/70 backdrop-blur-xl shadow-xl flex items-center gap-2.5 w-44 sm:w-52 pointer-events-auto transform hover:scale-105 transition-all">
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-md"
            style={{ backgroundColor: `${accentColor}20`, borderColor: accentColor, color: accentColor }}
          >
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-white leading-tight">{title}</h4>
            <p className="text-[10px] font-medium text-slate-300 mt-0.5">{subtitle}</p>
          </div>
        </div>
      </Html>
    </group>
  );
};

// Static Fallback for non-WebGL environments
const PlanetCSSFallback = () => {
  return (
    <div className="relative w-full aspect-square max-w-[580px] mx-auto flex items-center justify-center p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl"></div>
      
      <div className="relative z-10 w-64 h-64 rounded-full bg-gradient-to-tr from-[#05070D] via-[#0B1C3D] to-[#05070D] border-2 border-blue-500/50 shadow-2xl flex flex-col items-center justify-center text-center p-6 animate-float-slow">
        <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-blue-300 to-indigo-900 mb-3 shadow-lg">
          <img src="/renovia-logo.jpg" alt="Renovia Logo" className="w-full h-full object-cover rounded-full bg-slate-950" />
        </div>
        <h3 className="text-lg font-extrabold text-white">RENOVIA <span className="blue-gradient-text">TALENT</span></h3>
        <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mt-1">Global Ecosystem</p>
      </div>
    </div>
  );
};

export const RenoviaPlanet3D = () => {
  const [hasWebGL, setHasWebGL] = React.useState(true);

  React.useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return <PlanetCSSFallback />;
  }

  return (
    <div className="relative w-full aspect-square max-w-[580px] sm:max-w-[620px] lg:max-w-[660px] mx-auto bg-transparent border-none shadow-none flex items-center justify-center">
      
      {/* Soft Blue Circular Radial Ambient Glow directly behind globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-blue-600/20 via-blue-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* R3F 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full bg-transparent"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#2563EB" />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#3B82F6" />

        {/* Central 3D Digital Planet */}
        <CentralDigitalGlobe />

        {/* Mounted Center Logo Badge */}
        <Html center position={[0, 0, 2.05]}>
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-blue-300 to-indigo-900 shadow-2xl shadow-blue-500/40 backdrop-blur-md pointer-events-auto hover:scale-105 transition-transform">
            <img src="/renovia-logo.jpg" alt="Renovia Logo" className="w-full h-full object-cover rounded-full bg-slate-950" />
          </div>
        </Html>

        {/* 4 Orbiting Service Nodes */}
        <OrbitingServiceNode
          radius={3.4}
          speed={0.25}
          angleOffset={0}
          tiltAngle={0.6}
          title="Software & Technology"
          subtitle="Web • Software • Apps"
          icon={Code}
          accentColor="#3B82F6"
        />

        <OrbitingServiceNode
          radius={3.4}
          speed={0.25}
          angleOffset={Math.PI / 2}
          tiltAngle={-0.5}
          title="Recruitment & Staffing"
          subtitle="Tech • Sales • Support"
          icon={Users}
          accentColor="#2563EB"
        />

        <OrbitingServiceNode
          radius={3.4}
          speed={0.25}
          angleOffset={Math.PI}
          tiltAngle={0.4}
          title="IT & Digital Services"
          subtitle="Digital Transformation"
          icon={Layers}
          accentColor="#8B5CF6"
        />

        <OrbitingServiceNode
          radius={3.4}
          speed={0.25}
          angleOffset={(3 * Math.PI) / 2}
          tiltAngle={-0.6}
          title="Business Support"
          subtitle="Ops • Remote Workforce"
          icon={Headphones}
          accentColor="#10B981"
        />

      </Canvas>

    </div>
  );
};

export default RenoviaPlanet3D;
