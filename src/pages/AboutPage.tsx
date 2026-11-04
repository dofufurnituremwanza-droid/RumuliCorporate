import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Compass, 
  ChevronRight,
  FileBadge,
  Briefcase
} from 'lucide-react';
import { COMPANY_INFO, MANAGEMENT_TEAM } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { AnimatedSection } from '../components/AnimatedSection';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#F4F5F6] overflow-x-hidden">
      <PageHeader 
        badge="About Rumuli Corporate"
        title="Engineering Expertise. Local Commitment."
        description="Rumuli Engineering & Live Line Technology Limited is an established Tanzanian engineering contractor providing specialized power infrastructure, live-line techniques, civil construction, and technical procurement."
        breadcrumb="About Us"
      />

      {/* 1. WHO WE ARE */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <AnimatedSection direction="left">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-hover block mb-1">
                  Corporate Background
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight">
                  Who We Are
                </h2>
              </AnimatedSection>
              
              <AnimatedSection delay={150}>
                <div className="prose text-[#4B5763] text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    <strong>Rumuli Engineering & Live Line Technology Limited</strong> is a private Tanzanian engineering and procurement company incorporated in 2016 (Certificate of Incorporation No. 123062). Operating under the commercial identity <strong>RUMULI CORPORATE</strong>, we provide specialized engineering solutions to utility corporations, government agencies, telecommunications enterprises, and industrial clients throughout Tanzania.
                  </p>
                  <p>
                    Over the years, Rumuli has built a reputation for tackling complex infrastructure assignments—from high-voltage 220kV substation reactor commissioning and turnkey overhead transmission lines to live-line maintenance on energized networks and nationwide fiber optic rollouts.
                  </p>
                  <p>
                    Our team combines registered electrical and civil engineers, certified high-voltage technicians, specialized linemen, and experienced procurement professionals. Headquartered in Tegeta Azania, Dar es Salaam, our operations span national grid projects, rural electrification initiatives, and private commercial developments.
                  </p>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-3.5 bg-[#F4F5F6] border-l-4 border-amber-brand card-hover-lift">
                    <span className="block font-bold text-[#10243A]">Incorporated</span>
                    <span className="text-[#667482]">2016 in Dar es Salaam, Tanzania</span>
                  </div>
                  <div className="p-3.5 bg-[#F4F5F6] border-l-4 border-amber-brand card-hover-lift">
                    <span className="block font-bold text-[#10243A]">Contractor Status</span>
                    <span className="text-[#667482]">CRB Certified Electrical & Power Lines</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-5">
              <AnimatedSection direction="right" delay={200}>
                <div className="relative border-4 border-[#10243A] p-2 bg-white shadow-xl card-hover-lift">
                  <img 
                    src="https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1000&q=80" 
                    alt="Engineering team supervising infrastructure construction site"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="p-4 bg-[#10243A] text-white">
                    <p className="text-xs uppercase tracking-wider font-bold text-amber-brand">
                      Registered Headquarters
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      {COMPANY_INFO.address.physical}, Dar es Salaam, Tanzania
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISION & MISSION */}
      <section className="py-16 bg-[#F4F5F6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <AnimatedSection direction="up" delay={100}>
              <div className="bg-white p-8 border border-gray-200 border-t-4 border-t-amber-brand shadow-sm flex flex-col justify-between h-full card-hover-lift">
                <div>
                  <div className="w-12 h-12 bg-amber-light flex items-center justify-center rounded-sm text-amber-brand mb-6 animate-pulse-subtle">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#667482]">
                    Strategic Aspiration
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#10243A] mt-1 mb-4">
                    Our Vision
                  </h3>
                  <blockquote className="text-base sm:text-lg italic text-[#10243A] leading-relaxed border-l-2 border-amber-brand pl-4 font-serif">
                    "{COMPANY_INFO.vision}"
                  </blockquote>
                </div>
                <p className="text-xs text-[#667482] mt-6 pt-4 border-t border-gray-100">
                  Guiding our long-term expansion as an indigenous Tanzanian powerhouse in electrical engineering and power solutions.
                </p>
              </div>
            </AnimatedSection>

            {/* Mission */}
            <AnimatedSection direction="up" delay={200}>
              <div className="bg-white p-8 border border-gray-200 border-t-4 border-t-[#10243A] shadow-sm flex flex-col justify-between h-full card-hover-lift">
                <div>
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-sm text-[#10243A] mb-6">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#667482]">
                    Corporate Purpose
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#10243A] mt-1 mb-4">
                    Our Mission
                  </h3>
                  <blockquote className="text-base sm:text-lg italic text-[#10243A] leading-relaxed border-l-2 border-[#10243A] pl-4 font-serif">
                    "{COMPANY_INFO.mission}"
                  </blockquote>
                </div>
                <p className="text-xs text-[#667482] mt-6 pt-4 border-t border-gray-100">
                  Translating engineering precision and technical compliance into tangible infrastructure for public and private prosperity.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. CORPORATE VALUES */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
                Core Principles
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight mt-1">
                Our Values
              </h2>
              <p className="text-sm sm:text-base text-[#667482] mt-2">
                The fundamental standards that govern our commercial conduct, client relationships, and engineering practices on every project.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMPANY_INFO.values.map((val, idx) => (
              <AnimatedSection key={idx} delay={idx * 100} direction="up">
                <div className="p-6 sm:p-8 bg-[#F4F5F6] border border-gray-200 card-hover-lift h-full">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#10243A] text-amber-brand flex items-center justify-center font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h3 className="text-lg font-bold text-[#10243A]">
                      {val.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#4B5763] leading-relaxed pl-11">
                    {val.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR PHILOSOPHY */}
      <section className="py-16 bg-[#10243A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-brand">
                Guiding Ethos
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Our Operating Philosophy
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                At Rumuli Corporate, we operate with a strictly customer-centred philosophy. We believe that exceptional engineering is not merely about erecting steel or energizing circuits, but understanding the precise operational, financial, and regulatory realities of each client.
              </p>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pt-2">
                By pairing technical excellence with transparent milestone accountability and zero-compromise safety protocols, we build lasting partnerships with utility providers, industrial facilities, and regional governments.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. MANAGEMENT & TECHNICAL EXPERTISE */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
                Organizational Structure
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight mt-1">
                Management & Technical Leadership
              </h2>
              <p className="text-sm sm:text-base text-[#667482] mt-2">
                Our executive and technical leadership coordinates cross-functional teams of certified engineers, safety leads, and procurement specialists.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MANAGEMENT_TEAM.map((member, idx) => (
              <AnimatedSection key={idx} delay={idx * 100} direction="up">
                <div className="bg-[#F4F5F6] border border-gray-200 p-6 flex flex-col justify-between h-full card-hover-lift">
                  <div>
                    <div className="w-10 h-10 bg-[#10243A] text-amber-brand flex items-center justify-center rounded-sm mb-4">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-hover block mb-1">
                      {member.department}
                    </span>
                    <h3 className="font-bold text-base text-[#10243A] mb-1 leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#667482] font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                    Verified Executive Function
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Technical Resource Capabilities */}
          <AnimatedSection delay={300}>
            <div className="mt-12 p-6 sm:p-8 bg-gray-50 border border-gray-200 rounded-sm card-hover-lift">
              <h3 className="text-base font-bold text-[#10243A] mb-4 flex items-center">
                <FileBadge className="w-5 h-5 text-amber-brand mr-2" />
                Technical Workforce Deployment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#4B5763]">
                <div>
                  <strong className="block text-[#10243A] text-sm mb-1">Engineering Corps</strong>
                  <p>Registered electrical, civil, and mechanical engineers overseeing design calculation, load studies, and regulatory compliance.</p>
                </div>
                <div>
                  <strong className="block text-[#10243A] text-sm mb-1">Specialized Field Linemen</strong>
                  <p>Trained high-voltage overhead linemen certified in conductor tensioning, tower assembly, and live-line hot-stick work.</p>
                </div>
                <div>
                  <strong className="block text-[#10243A] text-sm mb-1">HSE & Quality Inspectors</strong>
                  <p>Dedicated on-site safety officers enforcing Zero Harm guidelines, OSHA standards, and environmental mitigation protocols.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="py-12 bg-[#F4F5F6] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold text-[#10243A]">Review Our Statutory Compliance</h4>
            <p className="text-xs text-[#667482]">Verify our licenses, CRB certificates, and statutory incorporation records.</p>
          </div>
          <Link
            to="/compliance"
            className="inline-flex items-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#10243A] text-white hover:bg-[#16314D] transition-all duration-200 rounded-sm hover:-translate-y-0.5"
          >
            <span>Inspect Compliance & Registrations</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1.5 text-amber-brand" />
          </Link>
        </div>
      </section>
    </div>
  );
};
