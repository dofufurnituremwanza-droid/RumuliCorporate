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

        {/* Prominent Staff & Operations Portal Access Bar at Bottom */}
        <div className="mt-12 p-6 bg-[#0B1726]/90 border border-white/10 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3.5 text-left">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-[#10243A] shadow-md flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm text-white tracking-wide">
                  RUMULI CORPORATE STAFF & FIELD OPERATIONS PORTAL
                </span>
                <span className="bg-amber-500/20 text-amber-brand border border-amber-500/30 text-[9px] uppercase px-1.5 py-0.2 rounded font-mono font-bold">
                  Restricted
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Internal management system for certified field engineers to view assigned tasks, submit daily project reports, requisition materials, and claim field per diem.
              </p>
            </div>
          </div>
          <Link
            to="/portal"
            className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#10243A] font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-1.5 hover:-translate-y-0.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Staff Portal Sign In</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.brandName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

