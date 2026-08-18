import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Server, Users, Globe, Headphones, TrendingUp } from 'lucide-react';

export const AboutHeroCinematicCanvas = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [hasVideo, setHasVideo] = useState(false);

  const scenes = [
    { id: 1, name: 'Digital Technology', icon: Cpu, desc: 'Web development, software engineering & custom applications' },
    { id: 2, name: 'IT Infrastructure', icon: Server, desc: 'Cloud servers, network monitoring & technical operations' },
    { id: 3, name: 'Recruitment & Staffing', icon: Users, desc: 'Global talent discovery, technical hiring & candidate placement' },
    { id: 4, name: 'Remote Teams', icon: Globe, desc: 'Distributed workforce collaboration & global workspace nodes' },
    { id: 5, name: 'Customer Support', icon: Headphones, desc: 'Multi-channel communication & high-availability response' },
    { id: 6, name: 'Unified Ecosystem', icon: TrendingUp, desc: 'Technology + Talent + Business Operations connected together' },
  ];

  // Check if an MP4 video exists in /public/about-hero-bg.mp4
  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/about-hero-bg.mp4';
    video.oncanplay = () => setHasVideo(true);
    video.onerror = () => setHasVideo(false);
  }, []);

  // 18-second smooth continuous scene loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [scenes.length]);

  // Render 6-Scene Cinematic Canvas Animation
  useEffect(() => {
    if (hasVideo || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle & node network setup
    const nodeCount = 45;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: (Math.random() * 0.6 + 0.35) * canvas.width, // Positioned primarily on right side
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      pulse: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background ambient dark gradients
      const grad = ctx.createRadialGradient(
        canvas.width * 0.7,
        canvas.height * 0.4,
        50,
        canvas.width * 0.7,
        canvas.height * 0.4,
        canvas.width * 0.5
      );
      grad.addColorStop(0, 'rgba(37, 99, 235, 0.15)');
      grad.addColorStop(0.5, 'rgba(13, 22, 43, 0.08)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw node connections & pulse lines (Scene dependent accents)
      for (let i = 0; i < nodeCount; i++) {
        const nodeA = nodes[i];
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        if (nodeA.x < canvas.width * 0.3) nodeA.vx *= -1;
        if (nodeA.x > canvas.width * 0.95) nodeA.vx *= -1;
        if (nodeA.y < 0) nodeA.vy *= -1;
        if (nodeA.y > canvas.height) nodeA.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < nodeCount; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.25 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw glowing nodes
        nodeA.pulse += 0.03;
        const currentRadius = nodeA.radius + Math.sin(nodeA.pulse) * 0.8;
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#60A5FA';
        ctx.shadowColor = '#3B82F6';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasVideo]);

  const ActiveIcon = scenes[currentScene].icon;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      
      {/* 1. Cinematic Background Image Layer */}
      <img
        src="/about-hero-cinematic-bg.jpg"
        alt="About Hero Cinematic Background"
        className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 transition-transform duration-1000"
      />

      {/* 2. Optional Video Element (if /about-hero-bg.mp4 is provided) */}
      {hasVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          src="/about-hero-bg.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      )}

      {/* 3. Dynamic HTML5 3D Canvas Journey Overlay */}
      {!hasVideo && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />}

      {/* 4. Left/Center Text Safety Vignette Overlay (Guarantees 100% Text Readability) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070D] via-[#05070D]/85 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-[#05070D]/80 z-10" />

      {/* 5. Live Scene Progression Badge (Right Side) */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#080B12]/90 border border-blue-500/30 backdrop-blur-xl shadow-2xl animate-in fade-in duration-500">
        <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0">
          <ActiveIcon className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase">
              SCENE {currentScene + 1}/6
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
          </div>
          <p className="text-xs font-semibold text-white leading-tight">
            {scenes[currentScene].name}
          </p>
        </div>
      </div>

    </div>
  );
};

export default AboutHeroCinematicCanvas;
