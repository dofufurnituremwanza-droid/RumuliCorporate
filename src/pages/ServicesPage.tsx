import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Zap, 
  Activity, 
  Cpu, 
  Building, 
  Radio, 
  Wrench, 
  PackageCheck,
  CheckCircle2, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { AnimatedSection } from '../components/AnimatedSection';

export const ServicesPage: React.FC = () => {
  const location = useLocation();

  // Scroll to hash if present
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-amber-brand" />;
      case 'Activity': return <Activity className="w-5 h-5 text-amber-brand" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-brand" />;
      case 'Building': return <Building className="w-5 h-5 text-amber-brand" />;
      case 'Radio': return <Radio className="w-5 h-5 text-amber-brand" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-amber-brand" />;
      case 'PackageCheck': return <PackageCheck className="w-5 h-5 text-amber-brand" />;
      default: return <Zap className="w-5 h-5 text-amber-brand" />;
    }
  };

  return (
    <div className="bg-[#F4F5F6] overflow-x-hidden">
      <PageHeader 
        badge="Engineering & Procurement Solutions"
        title="Comprehensive Infrastructure Services"
        description="Providing turnkey engineering execution across high-voltage power networks, substations, civil construction, live-line maintenance, telecommunications, and industrial equipment procurement."
        breadcrumb="Services"
      />

      {/* Services Quick Nav Strip */}
      <section className="bg-white border-b border-gray-200 sticky top-[73px] z-30 shadow-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 overflow-x-auto py-2.5 text-xs font-semibold text-[#667482]">
            <span className="text-[#10243A] uppercase mr-2 flex-shrink-0 font-bold">Quick Jump:</span>
            {SERVICES.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-2.5 py-1 rounded hover:bg-gray-100 hover:text-[#10243A] whitespace-nowrap transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        {SERVICES.map((service, index) => {
          const isEven = index % 2 === 0;

          return (
            <AnimatedSection key={service.id} direction="up" delay={index * 50}>
              <section
                id={service.id}
                className="bg-white border border-gray-200 shadow-sm scroll-mt-36 overflow-hidden card-hover-lift"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left/Right Image depending on parity */}
                  <div className={`lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-gray-100 overflow-hidden group ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#10243A] text-white p-2.5 rounded-sm shadow-md flex items-center space-x-2">
                      {getServiceIcon(service.iconName)}
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-brand">
                        Category 0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
                          Technical Discipline
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight mb-4">
                        {service.title}
                      </h2>

                      <p className="text-sm sm:text-base text-[#4B5763] leading-relaxed mb-6">
                        {service.fullDescription}
                      </p>

                      {/* Capabilities checklist */}
                      <div className="mb-6">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-[#10243A] mb-3">
                          Key Capabilities & Operational Scope:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.capabilities.map((cap, i) => (
                            <div key={i} className="flex items-start text-xs text-gray-700">
                              <CheckCircle2 className="w-4 h-4 text-amber-brand mr-2 mt-0.5 flex-shrink-0" />
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technical Standards */}
                      <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Compliance Standards:
                        </span>
                        {service.standards.map((std, i) => (
                          <span 
                            key={i} 
                            className="text-[11px] font-medium bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded"
                          >
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Consultation link */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        to="/contact"
                        className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#10243A] hover:text-amber-brand transition-colors group"
                      >
                        <span>Inquire About {service.title}</span>
                        <ArrowRight className="w-4 h-4 ml-1.5 text-amber-brand transition-transform group-hover:translate-x-1" />
                      </Link>

                      <Link
                        to="/projects"
                        className="text-xs text-[#667482] hover:text-[#10243A] underline transition-colors"
                      >
                        View related projects
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Live-Line Safety & Methodology Callout */}
      <section className="bg-[#10243A] text-white py-16 border-t-4 border-amber-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-brand">
                  Specialized Capability
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Live Line Technology & High-Voltage Maintenance
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  As reflected in our registered corporate name—<strong>Rumuli Engineering & Live Line Technology Limited</strong>—we possess specialized capabilities in live-line maintenance. This critical discipline enables maintenance, repairs, and inspections on energized electrical lines without requiring power shutdowns, preserving uptime for hospitals, industrial centers, and essential public services.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-300">
                  <span className="flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-brand mr-1.5" />
                    Hot-stick & bare-hand qualified methods
                  </span>
                  <span className="flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-brand mr-1.5" />
                    Certified dielectric personal protective equipment
                  </span>
                  <span className="flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-brand mr-1.5" />
                    Minimizes costly grid outages
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider bg-[#E3A129] text-[#10243A] hover:bg-[#C88B1E] transition-all duration-200 rounded-sm shadow-md hover:-translate-y-0.5"
                >
                  <span>Request Live-Line Service</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};
