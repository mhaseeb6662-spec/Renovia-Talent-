import React from 'react';
import Hero3DExperience from './hero/Hero3DExperience';

export const HeroSection = ({ onOpenContact, onSelectService }) => {
  return <Hero3DExperience onOpenContact={onOpenContact} onSelectService={onSelectService} />;
};

export default HeroSection;
