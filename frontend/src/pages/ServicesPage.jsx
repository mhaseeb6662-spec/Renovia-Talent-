import React from 'react';
import ServicesHeroCinematic from '../components/services/ServicesHeroCinematic';
import TechTalentEcosystemSection from '../components/TechTalentEcosystemSection';
import ServiceProcessSection from '../components/services/ServiceProcessSection';
import TechStackSection from '../components/services/TechStackSection';

import VideoBackground from '../components/common/VideoBackground';

export const ServicesPage = () => {
  return (
    <main className="min-h-screen">
      <VideoBackground 
        videoSrc="https://cdn.coverr.co/videos/coverr-server-rack-room-2516/1080p.mp4" 
        posterSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
      >
        <ServicesHeroCinematic />
        <TechTalentEcosystemSection transparent={true} />
      </VideoBackground>
      
      <ServiceProcessSection />
      <TechStackSection />
    </main>
  );
};

export default ServicesPage;
