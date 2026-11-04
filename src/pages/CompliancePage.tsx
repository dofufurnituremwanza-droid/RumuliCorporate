import React, { useState } from 'react';
import { 
  Leaf, 
  Scale, 
  FileCheck, 
  HardHat, 
  CheckCircle2, 
  X,
  Eye,
  Lock
} from 'lucide-react';
import { CREDENTIALS, Credential } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';

export const CompliancePage: React.FC = () => {
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);

  return (
    <div className="bg-[#F4F5F6]">
      <PageHeader 
        badge="Safety, Ethics & Statutory Verification"
        title="HSE & Regulatory Compliance"
        description="Rumuli Engineering & Live Line Technology Limited upholds rigorous Health, Safety and Environmental (HSE) standards, a zero-tolerance anti-corruption policy, and complete regulatory registrations across all Tanzanian regulatory authorities."
        breadcrumb="HSE & Compliance"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        {/* 1. HEALTH & SAFETY POLICY */}
        <section className="bg-white border border-gray-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 bg-amber-light text-amber-brand flex items-center justify-center rounded-sm">
                <HardHat className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
                Occupational Health & Safety
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight">
                Our "Zero Harm" Safety Commitment
              </h2>
              <p className="text-sm text-[#4B5763] leading-relaxed">
                Operating in high-voltage environments, substation switchyards, and tower construction demands an uncompromising attitude toward safety. At Rumuli Corporate, the protection of our employees, sub-contractors, clients, and host communities takes precedence over every operational milestone.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4 bg-[#F4F5F6] p-6 sm:p-8 border border-gray-200">
              <h3 className="font-bold text-base text-[#10243A]">
                Key Health & Safety Protocols Enforced On-Site:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start text-xs sm:text-sm text-[#4B5763]">
                  <CheckCircle2 className="w-4 h-4 text-amber-brand mr-2.5 mt-0.5 flex-shrink-0" />
                  <span><strong>Mandatory Certified PPE:</strong> Dielectric safety boots, arc-rated fire-resistant clothing, safety harnesses with shock-absorbing lanyards, and high-voltage insulating gloves tested to IEC 60903 standards.</span>
                </div>
                <div className="flex items-start text-xs sm:text-sm text-[#4B5763]">
                  <CheckCircle2 className="w-4 h-4 text-amber-brand mr-2.5 mt-0.5 flex-shrink-0" />
                  <span><strong>Daily Toolbox Briefings & Job Safety Analysis (JSA):</strong> Pre-work hazard identification assessments executed prior to any energized, elevated, or trenching task.</span>
                </div>
                <div className="flex items-start text-xs sm:text-sm text-[#4B5763]">
                  <CheckCircle2 className="w-4 h-4 text-amber-brand mr-2.5 mt-0.5 flex-shrink-0" />
                  <span><strong>Live-Line Operational Clearances:</strong> Strictly calculated minimum approach distances, secondary isolation barriers, and continuous safety watch during live-line hot-stick operations.</span>
                </div>
                <div className="flex items-start text-xs sm:text-sm text-[#4B5763]">
                  <CheckCircle2 className="w-4 h-4 text-amber-brand mr-2.5 mt-0.5 flex-shrink-0" />
                  <span><strong>Certified First Aid & Emergency Readiness:</strong> Dedicated first-aiders, on-site rescue equipment, and pre-established medical evacuation routes for all rural distribution projects.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ENVIRONMENTAL MANAGEMENT */}
        <section className="bg-white border border-gray-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 bg-green-50 text-emerald-700 flex items-center justify-center rounded-sm">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
                Environmental Stewardship
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight">
                Environmental Management
              </h2>
              <p className="text-sm text-[#4B5763] leading-relaxed">
                Rumuli Engineering integrates environmental consciousness into all project stages. We adhere to the Environmental Management Act of Tanzania and the guidelines of the National Environment Management Council (NEMC).
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F4F5F6] border-l-2 border-emerald-600">
                <h4 className="font-bold text-sm text-[#10243A] mb-1">Pollution Prevention</h4>
                <p className="text-xs text-[#4B5763] leading-relaxed">
                  Careful containment of hydraulic oils, insulating transformer mineral oils, and diesel fuels during transport, filling, and filtration.
                </p>
              </div>

              <div className="p-4 bg-[#F4F5F6] border-l-2 border-emerald-600">
                <h4 className="font-bold text-sm text-[#10243A] mb-1">Responsible Waste Management</h4>
                <p className="text-xs text-[#4B5763] leading-relaxed">
                  Systematic segregation of construction debris, scrap conductors, defective batteries, and inert materials with licensed recycling partners.
                </p>
              </div>

              <div className="p-4 bg-[#F4F5F6] border-l-2 border-emerald-600">
                <h4 className="font-bold text-sm text-[#10243A] mb-1">Ecological Corridor Care</h4>
                <p className="text-xs text-[#4B5763] leading-relaxed">
                  Selective right-of-way clearing along overhead transmission lines to avoid unnecessary tree felling and soil erosion.
                </p>
              </div>

              <div className="p-4 bg-[#F4F5F6] border-l-2 border-emerald-600">
                <h4 className="font-bold text-sm text-[#10243A] mb-1">Environmental Awareness</h4>
                <p className="text-xs text-[#4B5763] leading-relaxed">
                  Regular environmental training for site personnel to promote energy efficiency and water conservation during construction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ANTI-CORRUPTION & ETHICAL CONDUCT */}
        <section className="bg-white border border-gray-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-[#10243A] flex items-center justify-center rounded-sm">
                <Scale className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#10243A]">
                Business Ethics & Integrity
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight">
                Anti-Corruption Policy
              </h2>
              <p className="text-sm text-[#4B5763] leading-relaxed">
                Rumuli Engineering maintains a strict, non-negotiable zero-tolerance policy regarding bribery, extortion, embezzlement, fraud, and collusive practices. We operate in total alignment with the Prevention and Combating of Corruption Bureau (PCCB) regulations and international business ethics.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-gray-700">
                  <Lock className="w-4 h-4 text-amber-brand flex-shrink-0 mt-0.5" />
                  <span><strong>Strict Prohibition of Bribery:</strong> No employee, director, or agent may offer, promise, give, request, or accept any undue financial or other advantage in connection with any tender or contract.</span>
                </div>
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-gray-700">
                  <Lock className="w-4 h-4 text-amber-brand flex-shrink-0 mt-0.5" />
                  <span><strong>Accurate Books & Records:</strong> Complete and transparent accounting records maintained under International Financial Reporting Standards, subject to statutory audits.</span>
                </div>
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-gray-700">
                  <Lock className="w-4 h-4 text-amber-brand flex-shrink-0 mt-0.5" />
                  <span><strong>Fair Competition & Public Procurement:</strong> Compliance with the Public Procurement Act of Tanzania, ensuring fair bidding on all public utility and REA tenders.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. COMPANY REGISTRATION & CREDENTIALS */}
        <section className="bg-white border border-gray-200 p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
              Verifiable Statutory Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight mt-1">
              Statutory Registrations & Licences
            </h2>
            <p className="text-sm text-[#667482] mt-2">
              Every infrastructure contract requires verifiable legal and technical compliance. Below are the registered corporate certificates established in the official company records for Rumuli Engineering & Live Line Technology Limited.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CREDENTIALS.map((cred) => (
              <div
                key={cred.id}
                className="bg-[#F4F5F6] border border-gray-200 p-6 flex flex-col justify-between hover:border-gray-400 transition-colors group cursor-pointer"
                onClick={() => setSelectedCredential(cred)}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-hover bg-white px-2 py-0.5 border border-gray-200">
                      {cred.category}
                    </span>
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                  </div>

                  <h3 className="font-bold text-sm text-[#10243A] mb-2 leading-snug group-hover:text-amber-hover transition-colors">
                    {cred.name}
                  </h3>

                  <p className="text-xs text-[#667482] mb-3">
                    <strong>Issuing Body:</strong> {cred.issuingBody}
                  </p>

                  <p className="text-xs text-gray-600 line-clamp-3">
                    {cred.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200 flex items-center justify-between text-xs font-semibold text-[#10243A]">
                  <span className="text-emerald-700 font-mono text-[11px]">
                    {cred.referenceNo || 'Verified'}
                  </span>
                  <span className="text-amber-brand flex items-center group-hover:translate-x-1 transition-transform">
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    Inspect
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Disclaimer Notice */}
          <div className="mt-8 p-4 bg-gray-50 border-l-4 border-amber-brand text-xs text-[#667482]">
            <p>
              <strong>Corporate Transparency Notice:</strong> All statutory registrations listed above are certified and held by Rumuli Engineering & Live Line Technology Limited in the United Republic of Tanzania. In accordance with strict truth-in-advertising guidelines, Rumuli does not claim ISO certifications or third-party endorsements not supported by actual documentation.
            </p>
          </div>
        </section>
      </div>

      {/* Credential Detail Modal */}
      {selectedCredential && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCredential(null)}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#10243A] text-white p-6 relative">
              <button
                type="button"
                onClick={() => setSelectedCredential(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <span className="text-xs uppercase font-bold text-amber-brand tracking-wider">
                {selectedCredential.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-1 pr-6">
                {selectedCredential.name}
              </h3>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm text-gray-700">
              <div>
                <strong className="block text-[#10243A] uppercase tracking-wider text-xs mb-1">
                  Issuing Authority / Regulatory Body
                </strong>
                <p className="text-gray-800">{selectedCredential.issuingBody}</p>
              </div>

              {selectedCredential.referenceNo && (
                <div>
                  <strong className="block text-[#10243A] uppercase tracking-wider text-xs mb-1">
                    Registration Reference / Certificate Identifier
                  </strong>
                  <p className="font-mono text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200 inline-block">
                    {selectedCredential.referenceNo}
                  </p>
                </div>
              )}

              <div>
                <strong className="block text-[#10243A] uppercase tracking-wider text-xs mb-1">
                  Scope of Authorization & Compliance Detail
                </strong>
                <p className="text-gray-600 leading-relaxed">
                  {selectedCredential.description}
                </p>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500">
                <p>
                  Official certified true copies are submitted directly with formal pre-qualification packages, joint venture documents, and institutional bids.
                </p>
              </div>
            </div>

            <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <span className="text-xs text-gray-500">Official Rumuli Corporate Document</span>
              <button
                type="button"
                onClick={() => setSelectedCredential(null)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#10243A] hover:bg-[#16314D] rounded-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
