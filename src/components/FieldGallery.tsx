import React, { useState } from 'react';
import { 
  Camera, 
  X, 
  Eye, 
  Pickaxe, 
  Cpu, 
  Truck, 
  Zap, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { FIELD_GALLERY_IMAGES, GalleryPhoto } from '../data/companyData';
import { AnimatedSection } from './AnimatedSection';

interface FieldGalleryProps {
  initialCategory?: string;
  title?: string;
  subtitle?: string;
}

export const FieldGallery: React.FC<FieldGalleryProps> = ({
  initialCategory = 'All',
  title = 'Verified Field Operations & Mining Infrastructure',
  subtitle = 'Authentic photography from Rumuli active project sites across Tanzania: gold processing plants, concrete leaching tanks, heavy crane rigging, and substation energization.'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    'All',
    'Mining & Mineral Works',
    'Substations & Electrification',
    'Heavy Plant & Rigging',
    'Diagnostics & Switchgear'
  ];

  const filteredPhotos = selectedCategory === 'All'
    ? FIELD_GALLERY_IMAGES
    : FIELD_GALLERY_IMAGES.filter(p => p.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Mining & Mineral Works':
        return <Pickaxe className="w-4 h-4 text-amber-brand" />;
      case 'Substations & Electrification':
        return <Zap className="w-4 h-4 text-amber-brand" />;
      case 'Heavy Plant & Rigging':
        return <Truck className="w-4 h-4 text-amber-brand" />;
      case 'Diagnostics & Switchgear':
        return <Cpu className="w-4 h-4 text-amber-brand" />;
      default:
        return <Camera className="w-4 h-4 text-amber-brand" />;
    }
  };

  return (
    <section id="field-gallery" className="py-16 sm:py-24 bg-[#F4F5F6] border-t border-gray-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-[#10243A] text-xs font-bold text-amber-brand uppercase tracking-wider mb-2">
                <Camera className="w-4 h-4 text-amber-brand" />
                <span>On-Site Execution Evidence</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10243A] tracking-tight mt-1">
                {title}
              </h2>
              <p className="text-sm sm:text-base text-[#4B5763] mt-2 leading-relaxed">
                {subtitle}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center text-xs text-[#667482] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
              <span>16 Documented High-Resolution Site Records</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Filter Pills */}
        <AnimatedSection delay={100}>
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-2 border-b border-gray-200">
            {categories.map((cat) => {
              const count = cat === 'All'
                ? FIELD_GALLERY_IMAGES.length
                : FIELD_GALLERY_IMAGES.filter(p => p.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-[#10243A] text-amber-brand shadow-sm'
                      : 'bg-white text-[#4B5763] hover:bg-gray-100 hover:text-[#10243A] border border-gray-200'
                  }`}
                >
                  {getCategoryIcon(cat)}
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-amber-brand text-[#10243A]' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <AnimatedSection key={photo.id} delay={idx * 50} direction="up">
              <div 
                onClick={() => setActivePhoto(photo)}
                className="group relative bg-white border border-gray-200 rounded-sm overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer card-hover-lift flex flex-col justify-between h-full"
              >
                {/* Photo Container */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-3 left-3 bg-[#10243A]/90 text-amber-brand border border-amber-brand/40 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm shadow-xs backdrop-blur-xs">
                    {photo.category}
                  </span>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="p-3 bg-white/90 text-[#10243A] rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Eye className="w-5 h-5 text-amber-brand" />
                    </span>
                  </div>
                </div>

                {/* Caption Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#10243A] leading-snug group-hover:text-amber-brand transition-colors mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-[#667482] leading-relaxed line-clamp-2">
                      {photo.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="font-mono text-gray-400">Photo {idx + 1} of {filteredPhotos.length}</span>
                    <span className="text-amber-hover font-semibold">Inspect Full Size →</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Modal Lightbox */}
        {activePhoto && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-[#10243A] text-white rounded-sm overflow-hidden shadow-2xl border border-gray-700 animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 bg-[#0D1D2E] border-b border-gray-700 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-amber-brand tracking-wider">
                    {activePhoto.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {activePhoto.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-gray-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              {/* Modal Footer Description */}
              <div className="p-4 bg-[#10243A] border-t border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-300">
                <p className="leading-relaxed max-w-2xl">
                  {activePhoto.description}
                </p>
                <span className="text-[11px] font-semibold text-amber-brand whitespace-nowrap">
                  Rumuli Engineering & Live Line Technology Limited
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

