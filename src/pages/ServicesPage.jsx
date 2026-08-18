import React from 'react';
import ServicesHeroCinematic from '../components/services/ServicesHeroCinematic';
import TechTalentEcosystemSection from '../components/TechTalentEcosystemSection';
import ServiceProcessSection from '../components/services/ServiceProcessSection';
import TechStackSection from '../components/services/TechStackSection';

export const ServicesPage = () => {
  return (
    <main className="min-h-screen">
      <ServicesHeroCinematic />
      <TechTalentEcosystemSection />
      <ServiceProcessSection />
      <TechStackSection />
    </main>
  );
};

export default ServicesPage;
