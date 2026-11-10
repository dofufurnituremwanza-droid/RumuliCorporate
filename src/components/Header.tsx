import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
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
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Main Navigation Bar - Liquid Glass Translucent (Zero White) with Crisp White Logo */}
      <div className={`transition-all duration-300 ${isScrolled ? 'py-2.5 sm:py-3 liquid-glass-header-scrolled' : 'py-3.5 sm:py-4 liquid-glass-header'} px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand Identity - White & Amber on Dark Liquid Glass */}
          <Link 
            to="/" 
            className="flex items-center group focus:outline-none py-0.5" 
            aria-label="RUMULI CORPORATE Home"
          >
            <img 
              src={COMPANY_INFO.logoWhiteUrl} 
              alt="RUMULI CORPORATE - Rumuli Engineering & Live Line Technology Limited" 
              className="h-11 sm:h-12 md:h-14 w-auto object-contain logo-glass-halo transition-transform duration-200 group-hover:scale-[1.02]"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 text-sm font-semibold transition-colors relative ${
                    active 
                      ? 'text-white' 
                      : 'text-gray-300 hover:text-amber-brand'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2.5px] bg-[#E3A129] rounded-full shadow-xs" />
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
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-sm bg-[#E3A129] text-[#10243A] hover:bg-[#C88B1E] border border-amber-brand transition-all duration-150 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Request Consultation</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 text-[#10243A]" />
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-brand"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer - Dark Liquid Glass */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#10243A]/95 backdrop-blur-xl text-white shadow-2xl flex flex-col justify-between border-l border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#1D4064] flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={COMPANY_INFO.logoWhiteUrl} 
                  alt="RUMULI CORPORATE" 
                  className="h-10 sm:h-11 w-auto object-contain logo-glass-halo"
                />
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-gray-300 hover:text-white focus:outline-none"
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
                        ? 'bg-[#16314D] text-white font-semibold border-l-4 border-amber-brand' 
                        : 'text-gray-300 hover:bg-[#16314D]/50 hover:text-white'
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
                  className="w-full flex items-center justify-center px-4 py-3 text-xs uppercase tracking-wider font-bold rounded bg-[#E3A129] text-[#10243A] hover:bg-[#C88B1E] transition-colors shadow"
                >
                  <span>Request a Consultation</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </nav>

            {/* Mobile Drawer Footer Info */}
            <div className="p-5 bg-[#0D1D2E] border-t border-[#1D4064] space-y-2 text-xs text-gray-300">
              <p className="font-semibold text-white">{COMPANY_INFO.legalName}</p>
              <div className="space-y-1">
                <a href={`tel:${COMPANY_INFO.phones.primary.replace(/\s+/g, '')}`} className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <Phone className="w-3.5 h-3.5 text-amber-brand flex-shrink-0" />
                  <span>{COMPANY_INFO.phones.primary}</span>
                </a>
                <a href={`mailto:${COMPANY_INFO.emails.corporate}`} className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <Mail className="w-3.5 h-3.5 text-amber-brand flex-shrink-0" />
                  <span className="truncate">{COMPANY_INFO.emails.corporate}</span>
                </a>
              </div>
              <p className="text-[11px] text-gray-400 pt-1">
                Slogan: "{COMPANY_INFO.slogan}"
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

