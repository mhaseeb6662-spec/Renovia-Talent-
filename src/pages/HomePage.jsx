import React from 'react';
import Hero3DExperience from '../components/hero/Hero3DExperience';
import CapabilityStrip from '../components/CapabilityStrip';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';

export const HomePage = ({ onSelectService }) => {
  return (
    <main className="min-h-screen">
      <Hero3DExperience />
      <CapabilityStrip />
      <AboutSection />
      <ServicesSection onSelectService={onSelectService} />
      <WhyChooseUs />
    </main>
  );
};

export default HomePage;
