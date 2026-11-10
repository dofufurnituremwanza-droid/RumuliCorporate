import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Target, 
  Compass, 
  ChevronRight,
  FileBadge,
  Briefcase
} from 'lucide-react';
import { COMPANY_INFO, MANAGEMENT_TEAM, CLIENT_LOGOS } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { AnimatedSection } from '../components/AnimatedSection';
import { EquipmentSection } from '../components/EquipmentSection';

export const AboutPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [location.hash]);

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
                    <strong>Rumuli Engineering & Live Line Technology Limited</strong> is a private company registered in 2016 under the laws of the United Republic of Tanzania, with certificate number <strong>123062</strong>. The founders of the company are Tanzanian Citizens with extensive experience in the business of Civil, Building, Mechanical, Electrical and Electronics Engineering for many years.
                  </p>
                  <p>
                    Growing to become one of East Africa’s largest and most respected project management, engineering and procurement companies, Rumuli attribute their success to being known for reliability, flexibility and a pursuit of project excellence.
                  </p>
                  <p>
                    Success with delivering large infrastructure assets in developing countries rests in strong supply chain management, stringent quality control and a reliable, skilled workforce.
                  </p>
                </div>

                {/* Motives for Establishing the Company */}
                <div className="pt-4">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-[#10243A] mb-3">
                    The Motive for Establishing the Company:
                  </h3>
                  <div className="space-y-2.5 bg-[#F4F5F6] p-5 rounded-sm border-l-4 border-amber-brand text-xs sm:text-sm text-gray-800">
                    <p className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-brand mt-2 mr-2.5 flex-shrink-0" />
                      <span>To have a platform for the Founders to share their knowledge and experience.</span>
                    </p>
                    <p className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-brand mt-2 mr-2.5 flex-shrink-0" />
                      <span>To discover and develop new technology and put it into practice.</span>
                    </p>
                    <p className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-brand mt-2 mr-2.5 flex-shrink-0" />
                      <span>To offer electricity power services and by so doing earn income.</span>
                    </p>
                    <p className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-brand mt-2 mr-2.5 flex-shrink-0" />
                      <span>To contribute to government revenue through the payment of taxes.</span>
                    </p>
                    <p className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-brand mt-2 mr-2.5 flex-shrink-0" />
                      <span>To comply with the government call of establishing local and indigenous companies and economic empowerment for Tanzanians.</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-3.5 bg-[#F4F5F6] border-l-4 border-amber-brand card-hover-lift">
                    <span className="block font-bold text-[#10243A]">Incorporated</span>
                    <span className="text-[#667482]">2016 in Dar es Salaam, Tanzania (No. 123062)</span>
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
                    src="/images/img-wa0053.jpg" 
                    alt="Rumuli executive engineer supervising substation transformer installation plinth"
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

              {/* On-Site Technical Deployment Gallery */}
              <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative rounded overflow-hidden shadow-sm group">
                  <img 
                    src="/images/img-wa0054.jpg" 
                    alt="Rumuli certified field technicians executing transformer terminations"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <span className="text-white text-xs font-semibold">Field Crew Executing Substation Bushing Terminations</span>
                  </div>
                </div>
                <div className="relative rounded overflow-hidden shadow-sm group">
                  <img 
                    src="/images/img-wa0052.jpg" 
                    alt="Rumuli executive electrical engineer on site"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <span className="text-white text-xs font-semibold">Technical Leadership Supervising Energization Readiness</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Institutional Clients & Utility Partners */}
      <section className="py-16 bg-[#F4F5F6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mb-8">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
                National Footprint & Proven Relationships
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight mt-1">
                Institutional Clients & Utility Partners
              </h2>
              <p className="text-xs sm:text-sm text-[#667482] mt-2 leading-relaxed">
                Rumuli Corporate maintains documented engineering delivery records for Tanzania's major power utilities, rural infrastructure programs, telecommunication operators, municipal utilities, and premier hospitality groups.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {CLIENT_LOGOS.map((client, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-gray-200 p-4 rounded-sm flex flex-col justify-between items-center text-center group h-44 hover:border-amber-brand/50 transition-all duration-300 shadow-2xs card-hover-lift"
                >
                  <div className="w-full flex-1 flex items-center justify-center p-2">
                    <img 
                      src={client.logo} 
                      alt={`${client.name} official logo`} 
                      className="max-h-14 max-w-[110px] object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full border-t border-gray-100 pt-2.5 mt-auto">
                    <span className="font-bold text-xs text-[#10243A] block truncate" title={client.name}>
                      {client.name}
                    </span>
                    <span className="text-[10px] text-gray-500 block truncate" title={client.description}>
                      {client.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 6. LIST OF TOOLS, PLANTS AND EQUIPMENTS OWNED BY THE COMPANY */}
      <EquipmentSection />

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
