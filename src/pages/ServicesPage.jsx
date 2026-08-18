import React from 'react';
import PageHero from '../components/common/PageHero';
import TechTalentEcosystemSection from '../components/TechTalentEcosystemSection';
import ServiceProcessSection from '../components/services/ServiceProcessSection';
import TechStackSection from '../components/services/TechStackSection';

export const ServicesPage = () => {
  return (
    <main className="min-h-screen">
      <PageHero
        badge="What We Do"
        title="Services Designed Around Business Needs"
        subtitle="From building digital products to finding skilled professionals and managing back-office operations, Renovia Talent provides practical services that move organizations forward."
        breadcrumb="Services"
      />
      <TechTalentEcosystemSection />
      <ServiceProcessSection />
      <TechStackSection />
    </main>
  );
};

export default ServicesPage;
