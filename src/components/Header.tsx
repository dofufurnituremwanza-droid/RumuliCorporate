import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'HSE & Compliance', path: '/compliance' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-200">
      {/* Top Utility Bar (Desktop & Tablet) */}
      <div className="bg-[#10243A] text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#16314D]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1">
          <div className="flex items-center space-x-6 text-gray-300">
            <span className="flex items-center space-x-1.5 font-medium text-amber-brand">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-brand" />
              <span>Registered in Tanzania • Cert No. {COMPANY_INFO.registrationNumber}</span>
            </span>
            <span className="hidden md:inline-block text-gray-400">|</span>
            <span className="hidden md:flex items-center space-x-1 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-amber-brand" />
              <span>Tegeta Azania, Dar es Salaam</span>
            </span>
          </div>

          <div className="flex items-center space-x-5 text-gray-300">
            <a 
              href={`tel:${COMPANY_INFO.phones.primary.replace(/\s+/g, '')}`}
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-brand" />
              <span>{COMPANY_INFO.phones.primary}</span>
            </a>
            <span className="text-gray-500">|</span>
            <a 
              href={`mailto:${COMPANY_INFO.emails.corporate}`}
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-brand" />
              <span className="hidden sm:inline">{COMPANY_INFO.emails.corporate}</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`transition-all duration-200 ${isScrolled ? 'py-3' : 'py-4'} px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-white`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-amber-brand rounded p-1">
            {/* White clean background container for optimal contrast */}
            <div className="bg-white p-1 rounded flex items-center justify-center">
              <img 
                src={COMPANY_INFO.logoUrl} 
                alt="RUMULI CORPORATE Logo - Rumuli Engineering & Live Line Technology Limited" 
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#10243A] leading-tight group-hover:text-amber-brand transition-colors">
                {COMPANY_INFO.brandName}
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold text-[#667482]">
                {COMPANY_INFO.positioning}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 text-sm font-medium transition-colors relative ${
                    active 
                      ? 'text-[#10243A] font-semibold' 
                      : 'text-[#667482] hover:text-[#10243A]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#E3A129]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Consultation Button & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <Link
              to="/contact"
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded bg-[#10243A] text-white hover:bg-[#16314D] border border-[#10243A] transition-all duration-150 shadow-sm hover:shadow"
            >
              <span>Request Consultation</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 text-[#E3A129]" />
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-[#10243A] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-brand"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#10243A]" />
              ) : (
                <Menu className="w-6 h-6 text-[#10243A]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-none" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img 
                  src={COMPANY_INFO.logoUrl} 
                  alt="RUMULI CORPORATE" 
                  className="h-9 w-auto object-contain"
                />
                <span className="font-bold text-sm text-[#10243A]">RUMULI CORPORATE</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-gray-500 hover:text-gray-900 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-3 py-3 rounded text-sm font-medium transition-colors ${
                      active 
                        ? 'bg-gray-100 text-[#10243A] font-semibold border-l-4 border-amber-brand' 
                        : 'text-[#667482] hover:bg-gray-50 hover:text-[#10243A]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                );
              })}

              <div className="pt-6">
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center px-4 py-3 text-xs uppercase tracking-wider font-semibold rounded bg-[#10243A] text-white hover:bg-[#16314D] transition-colors"
                >
                  <span>Request a Consultation</span>
                  <ChevronRight className="w-4 h-4 ml-1.5 text-amber-brand" />
                </Link>
              </div>
            </nav>

            {/* Mobile Drawer Footer Info */}
            <div className="p-5 bg-gray-50 border-t border-gray-100 space-y-2 text-xs text-[#667482]">
              <p className="font-semibold text-[#10243A]">{COMPANY_INFO.legalName}</p>
              <div className="space-y-1">
                <a href={`tel:${COMPANY_INFO.phones.primary.replace(/\s+/g, '')}`} className="flex items-center space-x-2 text-gray-700">
                  <Phone className="w-3.5 h-3.5 text-amber-brand flex-shrink-0" />
                  <span>{COMPANY_INFO.phones.primary}</span>
                </a>
                <a href={`mailto:${COMPANY_INFO.emails.corporate}`} className="flex items-center space-x-2 text-gray-700">
                  <Mail className="w-3.5 h-3.5 text-amber-brand flex-shrink-0" />
                  <span className="truncate">{COMPANY_INFO.emails.corporate}</span>
                </a>
              </div>
              <p className="text-[11px] text-gray-500 pt-1">
                Slogan: "{COMPANY_INFO.slogan}"
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

