import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ChevronRight,
  Clock
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#10243A] text-white pt-16 pb-12 border-t-4 border-[#E3A129]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#1D4064]">
          {/* Brand & Corporate Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo with transparent background */}
            <div className="py-1">
              <img 
                src={COMPANY_INFO.logoWhiteUrl} 
                alt="RUMULI CORPORATE Official Logo" 
                className="h-10 sm:h-11 md:h-12 w-auto object-contain"
                loading="lazy"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-bold tracking-tight text-white">
                {COMPANY_INFO.brandName}
              </h3>
              <p className="text-xs text-amber-brand font-semibold tracking-wide uppercase mt-0.5">
                {COMPANY_INFO.legalName}
              </p>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed pr-4">
              Established in {COMPANY_INFO.establishedYear} in Tanzania (Reg. No. {COMPANY_INFO.registrationNumber}), 
              Rumuli is a specialized engineering and procurement enterprise delivering high-voltage power infrastructure, 
              substations, transmission and distribution networks, civil engineering, telecommunications and live-line services.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 text-xs bg-[#16314D] text-gray-200 px-3 py-1.5 rounded border border-[#26517D]">
                <ShieldCheck className="w-4 h-4 text-[#E3A129]" />
                <span className="font-medium">Licensed Electrical Contractor & Power Line Specialist</span>
              </div>
            </div>

            <div className="pt-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Corporate Slogan:
              </p>
              <p className="text-sm italic font-medium text-amber-brand mt-0.5">
                "{COMPANY_INFO.slogan}"
              </p>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-[#1D4064] pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-amber-brand transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-brand" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-brand transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-brand" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about#equipment" className="hover:text-amber-brand transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-brand" />
                  Owned Equipment & Fleet
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-brand transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-brand" />
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-amber-brand transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-brand" />
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="hover:text-amber-brand transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-brand" />
                  HSE & Compliance
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-brand transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-amber-brand" />
                  Contact Us
                </Link>
              </li>
              <li className="pt-2 border-t border-[#1D4064]">
                <Link to="/portal" className="text-amber-brand hover:text-amber-hover transition-colors flex items-center font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-amber-brand" />
                  Staff Operations Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-[#1D4064] pb-2">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <Link 
                    to={`/services#${srv.id}`} 
                    className="hover:text-amber-brand transition-colors flex items-start text-xs leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-brand mt-1.5 mr-2 flex-shrink-0" />
                    <span>{srv.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-[#1D4064] pb-2">
              Corporate Office
            </h4>
            
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-brand mt-1 flex-shrink-0" />
                <div className="text-xs leading-relaxed">
                  <p className="font-semibold text-white">{COMPANY_INFO.address.physical}</p>
                  <p>{COMPANY_INFO.address.postalBox}</p>
                  <p>{COMPANY_INFO.address.city}, {COMPANY_INFO.address.country}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 pt-1">
                <Phone className="w-4 h-4 text-amber-brand mt-0.5 flex-shrink-0" />
                <div className="text-xs space-y-1">
                  <a 
                    href={`tel:${COMPANY_INFO.phones.primary.replace(/\s+/g, '')}`} 
                    className="block text-white hover:text-amber-brand font-medium"
                  >
                    {COMPANY_INFO.phones.primary} (Main)
                  </a>
                  {COMPANY_INFO.phones.secondary.slice(0, 2).map((p, idx) => (
                    <a 
                      key={idx} 
                      href={`tel:${p.replace(/\s+/g, '')}`} 
                      className="block text-gray-300 hover:text-amber-brand text-[11px]"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-2.5 pt-1">
                <Mail className="w-4 h-4 text-amber-brand mt-0.5 flex-shrink-0" />
                <div className="text-xs space-y-1">
                  <a 
                    href={`mailto:${COMPANY_INFO.emails.corporate}`} 
                    className="block text-white hover:text-amber-brand"
                  >
                    {COMPANY_INFO.emails.corporate}
                  </a>
                  <a 
                    href={`mailto:${COMPANY_INFO.emails.secondary}`} 
                    className="block text-gray-300 hover:text-amber-brand text-[11px]"
                  >
                    {COMPANY_INFO.emails.secondary}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 pt-1 text-xs text-gray-400">
                <Clock className="w-4 h-4 text-amber-brand flex-shrink-0" />
                <span>Mon – Fri: 08:00 – 17:00 EAT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.brandName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

