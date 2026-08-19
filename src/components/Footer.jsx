import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Globe } from 'lucide-react';
import Container from './common/Container';

export const Footer = ({ onOpenLegal }) => {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-[#030509] text-slate-400 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-blue-600 via-blue-400 to-indigo-900 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <img
                  src="/renovia-logo.jpg"
                  alt="Renovia Talent Logo"
                  className="w-full h-full object-cover rounded-full bg-slate-950"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-h3 font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                  RENOVIA <span className="blue-gradient-text">TALENT</span>
                </span>
                <span className="text-label text-blue-400 font-semibold -mt-1">
                  Technology • Talent • Business Solutions
                </span>
              </div>
            </Link>

            <p className="text-body text-slate-400 font-normal leading-relaxed max-w-md">
              Technology solutions, professional talent, and business support designed around your needs. Connecting businesses with practical technology and skilled workforce capabilities.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101621] border border-slate-800 text-xs text-slate-300 font-medium">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Global Client & Talent Delivery Model</span>
            </div>
          </div>

          {/* Column 2: Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-body font-semibold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3 text-body font-medium">
              <li>
                <Link to="/" className="hover:text-blue-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-300 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-blue-300 transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-300 transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-blue-300 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-300 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Services (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-body font-semibold text-white uppercase tracking-wider">Core Services</h4>
            <ul className="space-y-3 text-body font-medium">
              <li>
                <Link to="/services" className="hover:text-blue-300 transition-colors flex items-center justify-between group">
                  <span>Software & Technology Solutions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-300 transition-colors flex items-center justify-between group">
                  <span>Recruitment & Staffing</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-300 transition-colors flex items-center justify-between group">
                  <span>IT & Digital Services</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-300 transition-colors flex items-center justify-between group">
                  <span>Professional & Business Support</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© Renovia Talent. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal('Privacy Policy')}
              className="hover:text-blue-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('Terms of Service')}
              className="hover:text-blue-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
