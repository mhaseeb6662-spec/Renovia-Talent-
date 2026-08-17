import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScrollProvider from './components/common/SmoothScrollProvider';
import CustomCursor from './components/common/CustomCursor';
import ContactModal from './components/ContactModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import LegalModal from './components/LegalModal';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WhyRenoviaPage from './pages/WhyRenoviaPage';
import ValuesPage from './pages/ValuesPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// SEO Title & Description Manager per route
const RouteMetadata = () => {
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      '/': 'Renovia Talent | Technology, Talent & Business Solutions',
      '/about': 'About Renovia Talent | Technology & Professional Services',
      '/services': 'Technology, Recruitment & Business Services | Renovia Talent',
      '/why-renovia': 'Why Renovia Talent | Practical Technology & Talent Partner',
      '/values': 'Our Values & Principles | Renovia Talent',
      '/contact': 'Contact & Consultation | Renovia Talent',
    };

    const title = routeTitles[location.pathname] || '404 Page Not Found | Renovia Talent';
    document.title = title;
  }, [location]);

  return null;
};

export const AppContent = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [legalModalState, setLegalModalState] = useState({ open: false, title: '' });

  const handleOpenContact = () => setContactModalOpen(true);
  const handleCloseContact = () => setContactModalOpen(false);

  const handleSelectService = (service) => setSelectedService(service);
  const handleCloseService = () => setSelectedService(null);

  const handleOpenLegal = (title) => setLegalModalState({ open: true, title });
  const handleCloseLegal = () => setLegalModalState({ open: false, title: '' });

  return (
    <SmoothScrollProvider>
      {/* 2-Layer Desktop Custom Cursor */}
      <CustomCursor />

      <div className="min-h-screen bg-[#05070D] text-slate-100 font-sans antialiased flex flex-col justify-between selection:bg-blue-600/30 selection:text-blue-200">
        <RouteMetadata />

        {/* Global Navbar */}
        <Navbar onOpenContact={handleOpenContact} />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<HomePage onSelectService={handleSelectService} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage onSelectService={handleSelectService} />} />
          <Route path="/why-renovia" element={<WhyRenoviaPage />} />
          <Route path="/values" element={<ValuesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Global Footer */}
        <Footer onOpenLegal={handleOpenLegal} />

        {/* Modals */}
        <ContactModal isOpen={contactModalOpen} onClose={handleCloseContact} />
        <ServiceDetailModal
          service={selectedService}
          onClose={handleCloseService}
          onOpenContact={handleOpenContact}
        />
        <LegalModal
          title={legalModalState.title}
          isOpen={legalModalState.open}
          onClose={handleCloseLegal}
        />
      </div>
    </SmoothScrollProvider>
  );
};

export const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
