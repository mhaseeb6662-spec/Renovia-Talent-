import React from 'react';
import PageHero from '../components/common/PageHero';
import ValuesSection from '../components/ValuesSection';
import VisionMission from '../components/VisionMission';

export const ValuesPage = () => {
  return (
    <main className="min-h-screen">
      <PageHero
        badge="What Guides Us"
        title="Our Principles & Values"
        subtitle="Our core values define how we operate, build partnerships, and deliver consistent quality across technology solutions and professional workforce placement."
        breadcrumb="Values"
      />
      <ValuesSection />
      <VisionMission />
    </main>
  );
};

export default ValuesPage;
