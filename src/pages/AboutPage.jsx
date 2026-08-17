import React from 'react';
import PageHero from '../components/common/PageHero';
import AboutSection from '../components/AboutSection';
import VisionMission from '../components/VisionMission';
import CommitmentSection from '../components/CommitmentSection';
import FinalCTA from '../components/FinalCTA';

export const AboutPage = () => {
  return (
    <main className="min-h-screen">
      <PageHero
        badge="About Renovia Talent"
        title="Connecting Technology, People, and Business"
        subtitle="Renovia Talent is a technology and professional services company focused on delivering reliable digital solutions, technology talent, and business support services to organizations globally."
        breadcrumb="About Us"
      />
      <AboutSection />
      <VisionMission />
      <CommitmentSection />
      <FinalCTA />
    </main>
  );
};

export default AboutPage;
