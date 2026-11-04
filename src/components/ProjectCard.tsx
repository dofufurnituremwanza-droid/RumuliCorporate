import React, { useState } from 'react';
import { Project } from '../data/companyData';
import { MapPin, Building2, CheckCircle2, X, ChevronRight, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-200 overflow-hidden flex flex-col h-full hover:border-gray-400 transition-all duration-200 group">
        {/* Project Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-[#10243A] text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow">
            {project.category}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Client / Location Header */}
            <div className="space-y-1 mb-3">
              <div className="flex items-center text-xs font-semibold text-amber-hover">
                <Building2 className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                <span>Client: {project.client}</span>
              </div>
              <div className="flex items-center text-xs text-[#667482]">
                <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0 text-gray-400" />
                <span className="truncate">{project.location}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-[#10243A] leading-snug mb-3 group-hover:text-amber-hover transition-colors">
              {project.title}
            </h3>

            {/* Summary */}
            <p className="text-sm text-[#667482] leading-relaxed mb-4">
              {project.summary}
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">
              Documented Record
            </span>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center text-xs font-bold text-[#10243A] hover:text-amber-brand uppercase tracking-wider transition-colors"
            >
              <span>View Technical Scope</span>
              <ChevronRight className="w-4 h-4 ml-1 text-amber-brand" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#10243A] text-white p-6 relative">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="text-xs uppercase font-bold text-amber-brand tracking-wider">
                {project.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 pr-8 leading-tight">
                {project.title}
              </h2>
              
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-300">
                <div className="flex items-center">
                  <Building2 className="w-3.5 h-3.5 mr-1.5 text-amber-brand" />
                  <span><strong>Client:</strong> {project.client}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-brand" />
                  <span><strong>Location:</strong> {project.location}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              {/* Project Image */}
              <div className="h-48 rounded overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Project Overview */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#10243A] mb-2 flex items-center">
                  <Layers className="w-4 h-4 mr-1.5 text-amber-brand" />
                  Project Executive Overview
                </h4>
                <p className="text-sm text-[#4B5763] leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Scope of Work */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#10243A] mb-3">
                  Scope of Technical Execution
                </h4>
                <div className="space-y-2.5">
                  {project.scope.map((item, idx) => (
                    <div key={idx} className="flex items-start text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-amber-brand mr-2.5 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimers & Authentic record */}
              <div className="p-3 bg-gray-50 border-l-4 border-amber-brand text-xs text-gray-600">
                <p>
                  <strong>Verification Note:</strong> Project documented in official company qualifications for Rumuli Engineering & Live Line Technology Limited.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <span className="text-xs text-gray-500">
                Rumuli Engineering • Project Archive
              </span>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#10243A] hover:bg-[#16314D] transition-colors rounded-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

