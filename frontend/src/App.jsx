import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScrollProvider from './components/common/SmoothScrollProvider';
import CustomCursor from './components/common/CustomCursor';
import ContactModal from './components/ContactModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import LegalModal from './components/LegalModal';
import WhatsAppFloatingButton from './components/common/WhatsAppFloatingButton';
import AIAssistantChatbot from './components/common/AIAssistantChatbot';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SolutionsPage from './pages/SolutionsPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Portal Pages & Context
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import AdminProtectedRoute from './admin/components/AdminProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminATS from './admin/pages/AdminATS';
import AdminCRM from './admin/pages/AdminCRM';
import AdminBlogs from './admin/pages/AdminBlogs';
import AdminJobs from './admin/pages/AdminJobs';
import AdminAITools from './admin/pages/AdminAITools';

// SEO Title Manager
const RouteMetadata = () => {
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      '/': 'Renovia Talent | Technology, Talent & Business Solutions',
      '/about': 'About Renovia Talent | Technology & Professional Services',
      '/services': 'Technology, Recruitment & Business Services | Renovia Talent',
      '/solutions': 'Technology & Talent Solutions | Renovia Talent',
      '/careers': 'Careers at Renovia Talent | Join Our Team',
      '/blog': 'Blog & Insights | Renovia Talent',
      '/contact': 'Contact & Consultation | Renovia Talent',
      '/admin/login': 'Admin Login | Renovia Talent Console',
      '/admin/dashboard': 'Dashboard | Renovia Talent Admin',
      '/admin/ats': 'Applicant Tracking System (ATS) | Renovia Admin',
      '/admin/crm': 'Leads CRM | Renovia Admin',
      '/admin/blogs': 'Blogs CMS | Renovia Admin',
      '/admin/jobs': 'Jobs Manager | Renovia Admin',
      '/admin/ai-tools': 'AI Studio & Tools | Renovia Admin',
    };

    const title = routeTitles[location.pathname] || 'Renovia Talent';
    document.title = title;
  }, [location]);

  return null;
};

export const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

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
    <AdminAuthProvider>
      <SmoothScrollProvider>
        {/* Custom Cursor for Desktop */}
        {!isAdminRoute && <CustomCursor />}

        <div className="min-h-screen bg-[#05070D] text-slate-100 font-sans antialiased flex flex-col justify-between selection:bg-blue-600/30 selection:text-blue-200">
          <RouteMetadata />

          {/* Public Navbar (Hidden on Admin routes) */}
          {!isAdminRoute && <Navbar onOpenContact={handleOpenContact} />}

          {/* Routes */}
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<HomePage onSelectService={handleSelectService} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage onSelectService={handleSelectService} />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Portal Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Console Routes */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="ats" element={<AdminATS />} />
              <Route path="crm" element={<AdminCRM />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="jobs" element={<AdminJobs />} />
              <Route path="ai-tools" element={<AdminAITools />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* Public Footer & Floating Widgets (Hidden on Admin routes) */}
          {!isAdminRoute && (
            <>
              <Footer onOpenLegal={handleOpenLegal} />
              <WhatsAppFloatingButton />
              <AIAssistantChatbot />

              {/* Public Modals */}
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
            </>
          )}
        </div>
      </SmoothScrollProvider>
    </AdminAuthProvider>
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
