import React from 'react';
import PageHero from '../components/common/PageHero';
import TechTalentEcosystemSection from '../components/TechTalentEcosystemSection';
import CommitmentSection from '../components/CommitmentSection';

export const WhyRenoviaPage = () => {
  return (
    <main className="min-h-screen">
      <PageHero
        badge="Why Renovia"
        title="A Practical Partner for Technology and Talent"
        subtitle="Renovia Talent provides a combination of technology expertise, professional talent, responsive service, and business understanding tailored to your operational goals."
        breadcrumb="Why Renovia"
      />
      <TechTalentEcosystemSection />
      <CommitmentSection />
    </main>
  );
};

export default WhyRenoviaPage;
