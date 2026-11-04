import React, { useState } from 'react';
import { 
  Wrench, 
  Cpu, 
  Truck, 
  Hammer, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Info,
  Car
} from 'lucide-react';
import { COMPANY_EQUIPMENT_GROUPS, EQUIPMENT_ON_DEMAND_NOTE } from '../data/companyData';
import { AnimatedSection } from './AnimatedSection';

interface EquipmentSectionProps {
  compact?: boolean;
}

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({ compact = false }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'hand-tools':
        return <Wrench className="w-5 h-5 text-amber-brand" />;
      case 'instruments':
        return <Cpu className="w-5 h-5 text-amber-brand" />;
      case 'light-machines':
        return <Hammer className="w-5 h-5 text-amber-brand" />;
      case 'plants-transport':
        return <Truck className="w-5 h-5 text-amber-brand" />;
      default:
        return <Zap className="w-5 h-5 text-amber-brand" />;
    }
  };

  const filteredGroups = activeTab === 'all' 
    ? COMPANY_EQUIPMENT_GROUPS 
    : COMPANY_EQUIPMENT_GROUPS.filter(g => g.id === activeTab);

  const totalItemsCount = COMPANY_EQUIPMENT_GROUPS.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <section id="equipment" className="py-16 sm:py-20 bg-white border-b border-gray-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection>
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-[#10243A] text-xs font-bold text-amber-brand uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-brand" />
              <span>Asset Ownership & Technical Readiness</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10243A] tracking-tight mt-1">
              List of Tools, Plants and Equipments Owned by the Company
            </h2>
            <p className="text-sm sm:text-base text-[#4B5763] mt-3 leading-relaxed">
              Our company owns the following tools, plants and equipments, guaranteeing rapid site mobilization, calibrated diagnostic testing, and self-sufficient field execution without dependency on third-party availability.
            </p>
          </div>
        </AnimatedSection>

        {/* Filter Navigation Tabs */}
        {!compact && (
          <AnimatedSection delay={100}>
            <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 ${
                  activeTab === 'all'
                    ? 'bg-[#10243A] text-amber-brand shadow-sm'
                    : 'bg-gray-100 text-[#4B5763] hover:bg-gray-200 hover:text-[#10243A]'
                }`}
              >
                All Equipment ({totalItemsCount})
              </button>
              {COMPANY_EQUIPMENT_GROUPS.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setActiveTab(group.id)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === group.id
                      ? 'bg-[#10243A] text-amber-brand shadow-sm'
                      : 'bg-gray-100 text-[#4B5763] hover:bg-gray-200 hover:text-[#10243A]'
                  }`}
                >
                  <span>{group.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    activeTab === group.id ? 'bg-amber-brand text-[#10243A]' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {group.items.length}
                  </span>
                </button>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Equipment Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredGroups.map((group, groupIdx) => (
            <AnimatedSection key={group.id} delay={groupIdx * 100} direction="up">
              <div className="bg-[#F4F5F6] border border-gray-200 rounded-sm overflow-hidden h-full flex flex-col justify-between card-hover-lift shadow-xs">
                {/* Category Header */}
                <div className="p-6 bg-white border-b border-gray-200 flex items-start justify-between">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-sm bg-[#10243A] flex items-center justify-center flex-shrink-0">
                      {getCategoryIcon(group.id)}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-amber-hover block">
                        Category 0{groupIdx + 1} • {group.items.length} Verified Assets
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#10243A]">
                        {group.title}
                      </h3>
                      <p className="text-xs text-[#667482] mt-0.5">
                        {group.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    {group.items.map((item, itemIdx) => (
                      <li 
                        key={item.id}
                        className="bg-white p-3 rounded-sm border border-gray-200/80 flex items-start justify-between gap-3 text-xs sm:text-sm text-gray-800 shadow-2xs hover:border-amber-brand/60 transition-colors"
                      >
                        <div className="flex items-start space-x-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#10243A] text-amber-brand flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                            {itemIdx + 1}
                          </span>
                          <div>
                            <span className="font-semibold text-[#10243A] block">
                              {item.name}
                            </span>
                            {item.specification && (
                              <span className="text-xs text-[#4B5763] block mt-0.5">
                                {item.specification}
                              </span>
                            )}
                          </div>
                        </div>

                        {item.registration && (
                          <div className="flex-shrink-0 flex items-center space-x-1.5 bg-[#10243A] text-amber-brand px-2.5 py-1 rounded-sm text-xs font-mono font-bold tracking-wider shadow-xs">
                            <Car className="w-3 h-3 text-amber-brand" />
                            <span>{item.registration}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Category Footer Indicator */}
                <div className="px-6 py-3 bg-gray-100/80 border-t border-gray-200 text-[11px] text-[#667482] flex items-center justify-between">
                  <span className="flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                    100% Company-Owned & Maintained
                  </span>
                  <span className="font-medium text-gray-500">
                    Inspected for Field Readiness
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Note: Heavy Equipment & Cranes on Standby */}
        <AnimatedSection delay={300}>
          <div className="mt-10 p-6 sm:p-7 bg-[#10243A] text-white rounded-sm border-l-4 border-amber-brand shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-amber-brand flex-shrink-0" />
                  <span className="text-xs uppercase font-bold tracking-widest text-amber-brand">
                    Logistical Flexibility & Plant Hire
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Heavy Transport, Long-Reach Mobile Cranes & Specialised Machinery
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  <strong>NB:</strong> Other equipment not listed above, such as big trucks and cranes, are available for hire almost instantly through our long-standing, pre-negotiated plant hire partnerships across all regions of Tanzania.
                </p>
              </div>

              <div className="flex-shrink-0">
                <a
                  href="/contact"
                  className="inline-flex items-center px-5 py-2.5 text-xs uppercase tracking-wider font-bold rounded-sm bg-[#E3A129] text-[#10243A] hover:bg-[#C88B1E] transition-all duration-200 shadow-sm whitespace-nowrap hover:-translate-y-0.5"
                >
                  <span>Request Mobilization</span>
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

