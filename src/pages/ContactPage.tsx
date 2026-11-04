import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  organization: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  serviceInterest?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceInterest: '',
    organization: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<'idle' | 'validated_ready_to_send' | 'sent'>('idle');

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Full name must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please provide a valid corporate or personal email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email format (e.g. name@domain.com).';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Please provide a contact phone number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errs.phone = 'Phone number must have at least 8 digits.';
    }

    if (!formData.serviceInterest) {
      errs.serviceInterest = 'Please select a service or engineering area.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please describe your project or enquiry.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Please provide more details (minimum 15 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear individual error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (submissionState !== 'idle') {
      setSubmissionState('idle');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // In accordance with instructions: Real validation, no fake API success.
      // Generate genuine mailto action to open user's default email client with exact formatted details.
      const mailtoSubject = encodeURIComponent(`Project Enquiry: ${formData.serviceInterest} - ${formData.organization || formData.fullName}`);
      const mailtoBody = encodeURIComponent(
        `Dear Rumuli Corporate Engineering Team,\n\n` +
        `Enquiry Details:\n` +
        `Name: ${formData.fullName}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Organization: ${formData.organization || 'N/A'}\n` +
        `Service Interest: ${formData.serviceInterest}\n\n` +
        `Project Description & Requirements:\n` +
        `${formData.message}\n\n` +
        `Sent via Rumuli Corporate Website (www.rumuli.co.tz)`
      );

      // Open email client
      window.location.href = `mailto:${COMPANY_INFO.emails.corporate}?subject=${mailtoSubject}&body=${mailtoBody}`;
      setSubmissionState('validated_ready_to_send');
    }
  };

  return (
    <div className="bg-[#F4F5F6]">
      <PageHeader 
        badge="Direct Corporate Communication"
        title="Contact Rumuli Corporate"
        description="Our engineering directors, project managers, and procurement specialists are available to discuss tenders, joint ventures, power infrastructure projects, and technical consultations."
        breadcrumb="Contact Us"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Contact Details & Office (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-gray-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
                  Official Corporate Headquarters
                </span>
                <h2 className="text-2xl font-bold text-[#10243A] mt-1">
                  Dar es Salaam Office
                </h2>
                <p className="text-xs text-[#667482] mt-1">
                  {COMPANY_INFO.legalName}
                </p>
              </div>

              {/* Physical Address */}
              <div className="flex items-start space-x-3.5 pt-2">
                <div className="p-2.5 bg-amber-light text-amber-brand rounded-sm flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm text-[#4B5763]">
                  <strong className="block text-[#10243A] font-bold">Physical Address:</strong>
                  <p className="font-medium text-gray-800">{COMPANY_INFO.address.physical}</p>
                  <p>{COMPANY_INFO.address.city}, {COMPANY_INFO.address.country}</p>
                  <p className="mt-1 text-gray-500">Postal: {COMPANY_INFO.address.postalBox}</p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start space-x-3.5 pt-2">
                <div className="p-2.5 bg-amber-light text-amber-brand rounded-sm flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm text-[#4B5763] space-y-1">
                  <strong className="block text-[#10243A] font-bold">Telephone Contacts:</strong>
                  <a 
                    href={`tel:${COMPANY_INFO.phones.primary.replace(/\s+/g, '')}`} 
                    className="block text-[#10243A] font-bold hover:text-amber-brand text-sm"
                  >
                    {COMPANY_INFO.phones.primary} (Direct / Switchboard)
                  </a>
                  {COMPANY_INFO.phones.secondary.map((num, i) => (
                    <a 
                      key={i} 
                      href={`tel:${num.replace(/\s+/g, '')}`} 
                      className="block text-[#4B5763] hover:text-amber-brand"
                    >
                      {num}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email Addresses */}
              <div className="flex items-start space-x-3.5 pt-2">
                <div className="p-2.5 bg-amber-light text-amber-brand rounded-sm flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm text-[#4B5763] space-y-1">
                  <strong className="block text-[#10243A] font-bold">Email Addresses:</strong>
                  <a 
                    href={`mailto:${COMPANY_INFO.emails.corporate}`} 
                    className="block text-[#10243A] font-semibold hover:text-amber-brand"
                  >
                    {COMPANY_INFO.emails.corporate}
                  </a>
                  <a 
                    href={`mailto:${COMPANY_INFO.emails.secondary}`} 
                    className="block text-[#4B5763] hover:text-amber-brand"
                  >
                    {COMPANY_INFO.emails.secondary}
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start space-x-3.5 pt-2 border-t border-gray-100">
                <div className="p-2.5 bg-gray-100 text-[#10243A] rounded-sm flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm text-[#4B5763]">
                  <strong className="block text-[#10243A] font-bold">Office Hours:</strong>
                  <p>Monday – Friday: 08:00 – 17:00 (East Africa Time)</p>
                  <p className="text-gray-500">Saturday: 08:30 – 13:00 (Engineering Ops)</p>
                  <p className="text-xs text-amber-hover font-medium mt-1">24/7 Live-Line & Emergency Response On Call</p>
                </div>
              </div>
            </div>

            {/* Statutory Corporate Badge */}
            <div className="p-5 bg-[#10243A] text-white rounded-sm border-l-4 border-amber-brand text-xs space-y-1.5">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-brand" />
                <span className="font-bold uppercase tracking-wider text-amber-brand">Registration Verified</span>
              </div>
              <p className="text-gray-300">
                Incorporation No. {COMPANY_INFO.registrationNumber} • CRB Registered Electrical Contractor
              </p>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form (7 cols) */}
          <div className="lg:col-span-7" id="enquiry">
            <div className="bg-white p-8 sm:p-10 border border-gray-200 shadow-sm">
              <div className="mb-6">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
                  Project Discussions & Tenders
                </span>
                <h3 className="text-2xl font-bold text-[#10243A] mt-1">
                  Submit an Engineering Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-[#667482] mt-1">
                  Fill in your project specifications below. Our technical evaluation team will review and respond promptly.
                </p>
              </div>

              {submissionState === 'validated_ready_to_send' && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-sm text-xs sm:text-sm flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Enquiry Prepared & Validated</strong>
                    <p className="mt-1">
                      Your details have been verified and your mail client has been opened addressed directly to <strong>{COMPANY_INFO.emails.corporate}</strong>. If your email application did not launch automatically, you can email us directly with the same details at <strong>{COMPANY_INFO.emails.corporate}</strong>.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10243A] mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Eng. Joseph Mwamba"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#F4F5F6] border rounded-sm focus:outline-none focus:bg-white transition-colors ${
                        errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#10243A]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-[11px] text-red-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10243A] mb-1.5">
                      Corporate / Personal Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. j.mwamba@company.co.tz"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#F4F5F6] border rounded-sm focus:outline-none focus:bg-white transition-colors ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#10243A]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Organization Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10243A] mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +255 788 000000"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#F4F5F6] border rounded-sm focus:outline-none focus:bg-white transition-colors ${
                        errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#10243A]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-[11px] text-red-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#10243A] mb-1.5">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="e.g. TANESCO / Vodacom / Private Firm"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F4F5F6] border border-gray-300 rounded-sm focus:outline-none focus:bg-white focus:border-[#10243A] transition-colors"
                    />
                  </div>
                </div>

                {/* Service Area Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10243A] mb-1.5">
                    Engineering Discipline / Service Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#F4F5F6] border rounded-sm focus:outline-none focus:bg-white transition-colors ${
                      errors.serviceInterest ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#10243A]'
                    }`}
                  >
                    <option value="">-- Select Relevant Service --</option>
                    {SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                    <option value="Tender / EPC Bid Request">Tender / EPC Bid Request</option>
                    <option value="General Engineering Procurement">General Engineering Procurement</option>
                    <option value="Other Technical Query">Other Technical Query</option>
                  </select>
                  {errors.serviceInterest && (
                    <p className="mt-1 text-[11px] text-red-600 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.serviceInterest}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#10243A] mb-1.5">
                    Project Scope, Location & Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details on scope, site location, timeline, voltage class (if electrical), or specific materials needed..."
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#F4F5F6] border rounded-sm focus:outline-none focus:bg-white transition-colors ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#10243A]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-red-600 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-wider font-semibold rounded bg-[#10243A] text-white hover:bg-[#16314D] border border-[#10243A] transition-colors shadow-sm"
                  >
                    <span>Transmit Project Enquiry</span>
                    <Send className="w-4 h-4 ml-2 text-amber-brand" />
                  </button>
                  <span className="block text-[11px] text-gray-400 mt-2">
                    Directly handled by the Rumuli Corporate Engineering Operations desk.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* 2. GOOGLE MAPS LOCATION AREA */}
        <section className="mt-16 bg-white border border-gray-200 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
                Location Map
              </span>
              <h3 className="text-xl font-bold text-[#10243A] mt-1">
                Our Office Location in Dar es Salaam
              </h3>
              <p className="text-xs text-[#667482] mt-0.5">
                Chief House Building, 3rd Floor, Bagamoyo Road, Tegeta Azania
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Tegeta+Azania+Bagamoyo+Road+Dar+es+Salaam+Tanzania"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 md:mt-0 inline-flex items-center text-xs font-bold text-[#10243A] hover:text-amber-brand uppercase tracking-wider"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 text-amber-brand" />
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-sm overflow-hidden border border-gray-200 relative bg-gray-100">
            <iframe
              title="Rumuli Corporate Office Location - Tegeta Azania, Dar es Salaam"
              src="https://maps.google.com/maps?q=Tegeta+Azania+Dar+es+Salaam+Tanzania&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </div>
  );
};
