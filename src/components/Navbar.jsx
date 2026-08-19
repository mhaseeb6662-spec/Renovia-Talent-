import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import Container from './common/Container';
import Button from './common/Button';

export const Navbar = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#05070D]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-blue-600 via-blue-400 to-indigo-900 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/renovia-logo.jpg"
                alt="Renovia Talent Logo"
                className="w-full h-full object-cover rounded-full bg-slate-950"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                RENOVIA <span className="blue-gradient-text">TALENT</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-blue-400 font-semibold -mt-1 hidden sm:block">
                Technology • Talent • Business Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-[#101621]/80 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-nav transition-all duration-200 rounded-full ${
                    isActive
                      ? 'text-blue-400 font-semibold bg-blue-600/15 border border-blue-500/30'
                      : 'font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800/70'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Action (Compact Let's Talk CTA) */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/contact')}
              icon={Sparkles}
              iconPosition="right"
              className="w-auto flex-none whitespace-nowrap"
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#101621] border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-6 rounded-2xl bg-[#080B12]/95 border border-slate-800 backdrop-blur-2xl shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-nav rounded-xl transition-colors flex items-center justify-between ${
                      isActive
                        ? 'text-blue-400 font-semibold bg-blue-600/15 border border-blue-500/30'
                        : 'font-medium text-slate-200 hover:text-blue-400 hover:bg-slate-900'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </NavLink>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/contact');
                }}
                icon={Sparkles}
                className="w-full justify-center"
              >
                Let's Talk
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;
