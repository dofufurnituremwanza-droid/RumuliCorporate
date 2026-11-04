import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  CheckCircle, 
  Award, 
  Layers, 
  ArrowRight, 
  HardHat, 
  Leaf, 
  FileCheck2 
} from 'lucide-react';
import { COMPANY_INFO, SERVICES, PROJECTS, CLIENT_LOGOS } from '../data/companyData';
import { ProjectCard } from '../components/ProjectCard';

export const HomePage: React.FC = () => {
  const featuredProjects = PROJECTS.filter(p => p.featured);

  return (
    <div className="bg-[#F4F5F6]">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#10243A] text-white overflow-hidden min-h-[580px] lg:min-h-[660px] flex items-center">
        {/* Background Image with Controlled Engineering Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=85" 
            alt="High voltage electrical transmission line and power infrastructure"
            className="w-full h-full object-cover object-center opacity-25 filter brightness-90"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10243A] via-[#10243A]/90 to-[#10243A]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            {/* Slogan Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-sm bg-[#16314D] border border-[#26517D] text-xs font-semibold text-amber-brand uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-brand animate-pulse" />
              <span>{COMPANY_INFO.slogan}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
              Engineering Infrastructure. <br className="hidden sm:inline" />
              <span className="text-[#E3A129]">Powering Progress.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl text-gray-300 font-normal leading-relaxed mb-8 max-w-2xl">
              Delivering engineering, electrical infrastructure, construction and procurement solutions 
              through technical expertise, reliable execution and a commitment to quality.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm uppercase tracking-wider font-semibold rounded bg-[#E3A129] text-[#10243A] hover:bg-[#C88B1E] transition-all duration-150 shadow-md font-sans"
              >
                <span>Explore Our Services</span>
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm uppercase tracking-wider font-semibold rounded bg-transparent text-white border-2 border-white/80 hover:bg-white hover:text-[#10243A] transition-all duration-150"
              >
                <span>Discuss a Project</span>
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Bottom Proof Strip */}
            <div className="mt-12 pt-8 border-t border-gray-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-300">
              <div>
                <span className="block text-gray-400">Jurisdiction</span>
                <span className="font-semibold text-white">United Republic of Tanzania</span>
              </div>
              <div>
                <span className="block text-gray-400">Incorporation</span>
                <span className="font-semibold text-white">Est. 2016 • BRELA 123062</span>
              </div>
              <div>
                <span className="block text-gray-400">Accreditation</span>
                <span className="font-semibold text-white">CRB Registered Contractor</span>
              </div>
              <div>
                <span className="block text-gray-400">Core Specialty</span>
                <span className="font-semibold text-white">Substations & Live-Line</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
                  Tanzanian Engineering Excellence
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10243A] tracking-tight leading-tight">
                  Engineering With Purpose. <br />
                  <span className="text-[#667482]">Delivering With Confidence.</span>
                </h2>
              </div>

              <div className="prose text-[#4B5763] text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Established in 2016 in Tanzania, <strong>Rumuli Engineering & Live Line Technology Limited</strong> (operating commercially as <strong>RUMULI CORPORATE</strong>) has evolved into a trusted multidisciplinary engineering, power infrastructure, and procurement partner for government authorities, power utilities, telecommunications operators, and commercial contractors.
                </p>
                <p>
                  Our multidisciplinary engineering capabilities encompass electrical power infrastructure, transmission and distribution networks up to 220kV, electrical substations, specialized live-line works, telecommunications and fiber optics, civil and structural building works, mechanical plant maintenance, and engineering equipment procurement.
                </p>
                <p>
                  Rooted in an unyielding culture of safety, technical rigor, and accountability, we manage projects from initial site survey and engineering design through to field execution, testing, and regulatory commissioning.
                </p>
              </div>

              {/* Pillars checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#10243A] font-medium">
                  <CheckCircle className="w-4 h-4 text-amber-brand flex-shrink-0" />
                  <span>CRB Registered Electrical Contractor</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#10243A] font-medium">
                  <CheckCircle className="w-4 h-4 text-amber-brand flex-shrink-0" />
                  <span>220kV Substation & Reactor Experience</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#10243A] font-medium">
                  <CheckCircle className="w-4 h-4 text-amber-brand flex-shrink-0" />
                  <span>Trained Live-Line Maintenance Teams</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#10243A] font-medium">
                  <CheckCircle className="w-4 h-4 text-amber-brand flex-shrink-0" />
                  <span>Proven Delivery for TANESCO, REA & Vodacom</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center text-sm font-bold text-[#10243A] hover:text-amber-brand uppercase tracking-wider transition-colors"
                >
                  <span>Learn More About Our Company & Leadership</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-amber-brand" />
                </Link>
              </div>
            </div>

            {/* Right Column: Editorial Photograph (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative border-4 border-[#10243A] p-2 bg-white shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80" 
                  alt="Industrial power engineers reviewing technical engineering schematics"
                  className="w-full h-80 sm:h-96 object-cover"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -left-4 bg-[#10243A] text-white p-4 max-w-xs shadow-md border-l-4 border-amber-brand">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-brand">
                    Company Registration
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Certificate of Incorporation No. 123062 • Established 2016
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE CAPABILITIES */}
      <section className="py-16 sm:py-24 bg-[#F4F5F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
                Capabilities & Scope
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10243A] tracking-tight mt-1">
                Core Engineering Capabilities
              </h2>
            </div>
            <p className="text-sm text-[#667482] max-w-md mt-3 md:mt-0 leading-relaxed">
              Fully integrated engineering disciplines capable of handling turnkey utility projects, industrial installations, and infrastructure modernization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv) => (
              <div 
                key={srv.id}
                className="bg-white border border-gray-200 overflow-hidden flex flex-col justify-between hover:border-gray-400 transition-all duration-200 group"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-44 overflow-hidden bg-gray-100">
                    <img 
                      src={srv.image} 
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-bold text-white uppercase tracking-wider">
                      {srv.title}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-xs sm:text-sm text-[#667482] leading-relaxed mb-4">
                      {srv.shortDescription}
                    </p>

                    <div className="space-y-1.5 mb-2">
                      {srv.capabilities.slice(0, 3).map((cap, i) => (
                        <div key={i} className="flex items-start text-xs text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-brand mt-1.5 mr-2 flex-shrink-0" />
                          <span className="truncate">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to={`/services#${srv.id}`}
                    className="inline-flex items-center text-xs font-bold text-[#10243A] hover:text-amber-brand uppercase tracking-wider transition-colors"
                  >
                    <span>Full Technical Scope</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1 text-amber-brand" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Callout Card for Technical Inquiries */}
            <div className="bg-[#10243A] text-white p-8 border border-[#16314D] flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-amber-brand tracking-widest">
                  Custom Engineering Scope
                </span>
                <h3 className="text-xl font-bold mt-2 text-white">
                  Need a Specialized Project Consultation?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-3 leading-relaxed">
                  Our senior engineering directors provide site evaluations, technical specifications, and project scope estimates for institutional and private clients.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center px-4 py-3 text-xs uppercase tracking-wider font-semibold rounded bg-[#E3A129] text-[#10243A] hover:bg-[#C88B1E] transition-colors"
                >
                  <span>Inquire With Engineering Team</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPANY EXPERIENCE & VERIFIABLE CREDENTIALS */}
      <section className="py-14 bg-[#10243A] text-white border-y border-[#16314D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-brand">
                Foundation
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">
                Est. {COMPANY_INFO.establishedYear}
              </p>
              <p className="text-xs text-gray-400">
                Nearly a decade of registered engineering contracting in Tanzania
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-brand">
                Legal Incorporation
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">
                No. {COMPANY_INFO.registrationNumber}
              </p>
              <p className="text-xs text-gray-400">
                Registered by BRELA under the Companies Act of Tanzania
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-brand">
                Contractor Standing
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">
                CRB Certified
              </p>
              <p className="text-xs text-gray-400">
                Licensed Electrical & Substation/Powerline Contractor
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-brand">
                Safety Standard
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">
                Zero Harm
              </p>
              <p className="text-xs text-gray-400">
                Rigorous HSE protocol across all energized & live-line projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS SECTION */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
                Documented Execution
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10243A] tracking-tight mt-1">
                Featured Infrastructure Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="mt-4 md:mt-0 inline-flex items-center text-xs font-bold text-[#10243A] hover:text-amber-brand uppercase tracking-wider transition-colors"
            >
              <span>View All Documented Projects</span>
              <ArrowRight className="w-4 h-4 ml-1.5 text-amber-brand" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Verification / Transparency Note */}
          <div className="mt-10 p-4 bg-gray-50 border border-gray-200 rounded-sm text-xs text-[#667482] flex items-start space-x-3">
            <FileCheck2 className="w-5 h-5 text-amber-brand flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#10243A]">Documented Project Qualifications</p>
              <p className="mt-0.5">
                The above representative projects are documented in the corporate qualifications profile for Rumuli Engineering & Live Line Technology Limited. Photography represents actual engineering execution, technical scopes, and associated client installations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLIENTS & SECTORS WE SERVE */}
      <section className="py-12 bg-[#F4F5F6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase font-bold tracking-widest text-[#667482] text-center mb-6">
            Institutional, Utility & Corporate Experience
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {CLIENT_LOGOS.map((client, i) => (
              <div 
                key={i} 
                className="bg-white border border-gray-200 p-4 text-center flex flex-col justify-center items-center rounded-sm hover:border-gray-400 transition-colors"
              >
                <span className="font-bold text-sm text-[#10243A]">{client.name}</span>
                <span className="text-[10px] text-gray-500 mt-0.5 truncate max-w-full">{client.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OUR APPROACH */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
              Operational Tenets
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10243A] tracking-tight mt-1">
              Our Professional Approach
            </h2>
            <p className="text-sm sm:text-base text-[#667482] mt-3 leading-relaxed">
              Every infrastructure contract demands systematic execution, strict adherence to safety codes, and transparent communication. At Rumuli, our operational philosophy rests on six pillars:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-[#F4F5F6] border-l-4 border-amber-brand">
              <Award className="w-6 h-6 text-amber-brand mb-3" />
              <h3 className="font-bold text-[#10243A] text-base mb-2">Quality Workmanship</h3>
              <p className="text-xs sm:text-sm text-[#667482] leading-relaxed">
                Applying rigorous international engineering standards (IEC, BS, TBS) to ensure durable, long-term infrastructure stability.
              </p>
            </div>

            <div className="p-6 bg-[#F4F5F6] border-l-4 border-amber-brand">
              <Cpu className="w-6 h-6 text-amber-brand mb-3" />
              <h3 className="font-bold text-[#10243A] text-base mb-2">Technical Competence</h3>
              <p className="text-xs sm:text-sm text-[#667482] leading-relaxed">
                Qualified Tanzanian engineers trained in high-voltage switchgear, transformer diagnostics, and live-line technologies.
              </p>
            </div>

            <div className="p-6 bg-[#F4F5F6] border-l-4 border-amber-brand">
              <HardHat className="w-6 h-6 text-amber-brand mb-3" />
              <h3 className="font-bold text-[#10243A] text-base mb-2">Uncompromising Safety</h3>
              <p className="text-xs sm:text-sm text-[#667482] leading-relaxed">
                Zero Harm principles, complete PPE enforcement, daily toolbox briefings, and meticulous live-line insulation practices.
              </p>
            </div>

            <div className="p-6 bg-[#F4F5F6] border-l-4 border-amber-brand">
              <Leaf className="w-6 h-6 text-amber-brand mb-3" />
              <h3 className="font-bold text-[#10243A] text-base mb-2">Environmental Responsibility</h3>
              <p className="text-xs sm:text-sm text-[#667482] leading-relaxed">
                Responsible transformer oil handling, waste management, and ecological sensitivity during transmission corridor works.
              </p>
            </div>

            <div className="p-6 bg-[#F4F5F6] border-l-4 border-amber-brand">
              <ShieldCheck className="w-6 h-6 text-amber-brand mb-3" />
              <h3 className="font-bold text-[#10243A] text-base mb-2">Integrity & Accountability</h3>
              <p className="text-xs sm:text-sm text-[#667482] leading-relaxed">
                Transparent billing, zero tolerance for bribery, and compliance with Tanzanian anti-corruption and procurement laws.
              </p>
            </div>

            <div className="p-6 bg-[#F4F5F6] border-l-4 border-amber-brand">
              <Layers className="w-6 h-6 text-amber-brand mb-3" />
              <h3 className="font-bold text-[#10243A] text-base mb-2">Customer Satisfaction</h3>
              <p className="text-xs sm:text-sm text-[#667482] leading-relaxed">
                Dedicated project managers ensuring on-time milestone delivery, comprehensive documentation, and responsive warranty support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="bg-[#10243A] text-white py-16 sm:py-20 border-t-4 border-amber-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-brand">
              Partner With An Established Tanzanian Engineering Firm
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Discuss Your Infrastructure Requirements?
            </h2>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Whether you are planning a transmission network, substation upgrade, fiber deployment, or industrial electrical overhaul, our engineering team is ready to consult.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-wider font-semibold rounded bg-[#E3A129] text-[#10243A] hover:bg-[#C88B1E] transition-colors"
              >
                <span>Initiate Project Consultation</span>
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Link>
              <a
                href={`tel:${COMPANY_INFO.phones.primary.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-wider font-semibold rounded border border-gray-400 text-white hover:bg-white hover:text-[#10243A] transition-colors"
              >
                <span>Call {COMPANY_INFO.phones.primary}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
