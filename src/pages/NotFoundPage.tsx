import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] bg-[#F4F5F6] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white border border-gray-200 p-8 sm:p-12 text-center shadow-sm">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-hover block mb-2">
          HTTP 404 Error
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#10243A] tracking-tight mb-4">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-[#667482] leading-relaxed mb-8">
          The requested page or resource could not be located on the Rumuli Corporate website. It may have been moved, renamed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded bg-[#10243A] text-white hover:bg-[#16314D] transition-colors"
          >
            <Home className="w-4 h-4 mr-2 text-amber-brand" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded border border-gray-300 text-[#10243A] hover:bg-gray-100 transition-colors"
          >
            <span>Explore Services</span>
            <ChevronRight className="w-4 h-4 ml-1 text-amber-brand" />
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500">
          Need immediate engineering assistance? Call us at{' '}
          <a href={`tel:${COMPANY_INFO.phones.primary.replace(/\s+/g, '')}`} className="font-semibold text-[#10243A] hover:text-amber-brand">
            {COMPANY_INFO.phones.primary}
          </a>
        </div>
      </div>
    </div>
  );
};
