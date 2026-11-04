import React, { useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { PROJECTS, CLIENT_LOGOS } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { Building2, Filter, FileCheck2, Info } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = [
    'All',
    'Power & Substations',
    'Transmission & Distribution',
    'Telecommunications & ICT',
    'Civil & Industrial'
  ];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div className="bg-[#F4F5F6]">
      <PageHeader 
        badge="Documented Engineering Portfolio"
        title="Infrastructure Projects & Practical Experience"
        description="A comprehensive record of completed and documented contracts delivered for public utilities, international telecommunication operators, industrial corporations, and commercial developments across Tanzania."
        breadcrumb="Projects"
      />

      {/* Filter and Overview Controls */}
      <section className="bg-white border-b border-gray-200 sticky top-[73px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-[#667482]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#10243A]">
              Filter By Sector:
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
                  activeFilter === category
                    ? 'bg-[#10243A] text-white shadow-xs'
                    : 'bg-gray-100 text-[#667482] hover:bg-gray-200 hover:text-[#10243A]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Project Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#10243A]">
              {activeFilter === 'All' ? 'All Documented Assignments' : `${activeFilter} Projects`}
              <span className="ml-2 text-sm font-normal text-[#667482]">
                ({filteredProjects.length} records)
              </span>
            </h2>

            <div className="hidden sm:flex items-center text-xs text-gray-500 space-x-1">
              <Info className="w-3.5 h-3.5 text-amber-brand" />
              <span>Select any project to review complete scope</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Institutional Clients Grid */}
          <div className="mt-16 bg-white border border-gray-200 p-8">
            <div className="max-w-2xl mb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-hover">
                Documented Client Relationships
              </span>
              <h3 className="text-xl font-bold text-[#10243A] mt-1">
                Organizations We Have Served
              </h3>
              <p className="text-xs text-[#667482] mt-1 leading-relaxed">
                Rumuli has successfully delivered contracts for Tanzania's leading power utilities, rural development agencies, multinational telecommunications firms, and municipal bodies.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {CLIENT_LOGOS.map((client, idx) => (
                <div key={idx} className="p-4 bg-[#F4F5F6] border border-gray-200 rounded-sm">
                  <div className="flex items-center space-x-2 text-[#10243A] font-bold text-sm">
                    <Building2 className="w-4 h-4 text-amber-brand flex-shrink-0" />
                    <span>{client.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {client.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Verification Notice */}
          <div className="mt-8 p-5 bg-[#10243A] text-white rounded-sm flex items-start space-x-4">
            <FileCheck2 className="w-5 h-5 text-amber-brand flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-amber-brand uppercase tracking-wider">
                Verifiable Project Track Record
              </p>
              <p className="text-gray-300 leading-relaxed">
                All listed projects represent actual documented assignments undertaken by Rumuli Engineering & Live Line Technology Limited. In accordance with strict corporate ethics and confidentiality policies, proprietary contract values and internal utility specifications are kept confidential. Complete completion certificates and client references are available upon formal request for tender evaluations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

