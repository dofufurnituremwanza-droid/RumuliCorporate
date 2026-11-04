import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  breadcrumb?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  breadcrumb
}) => {
  return (
    <div className="bg-[#10243A] text-white py-14 sm:py-20 border-b-4 border-[#E3A129] relative overflow-hidden">
      {/* Subtle architectural grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-medium text-gray-400 mb-4">
          <Link to="/" className="hover:text-amber-brand transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-amber-brand">{breadcrumb || title}</span>
        </nav>

        <div className="max-w-3xl">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-amber-brand mb-2">
            {badge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

