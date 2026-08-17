import React from 'react';
import PageHero from '../components/common/PageHero';
import WhyChooseUs from '../components/WhyChooseUs';
import TechTalentEcosystemSection from '../components/TechTalentEcosystemSection';
import CommitmentSection from '../components/CommitmentSection';
import FinalCTA from '../components/FinalCTA';

export const WhyRenoviaPage = () => {
  return (
    <main className="min-h-screen">
      <PageHero
        badge="Why Renovia"
        title="A Practical Partner for Technology and Talent"
        subtitle="Renovia Talent provides a combination of technology expertise, professional talent, responsive service, and business understanding tailored to your operational goals."
        breadcrumb="Why Renovia"
      />
      <WhyChooseUs />
      <TechTalentEcosystemSection />
      <CommitmentSection />
      <FinalCTA />
    </main>
  );
};

export default WhyRenoviaPage;
