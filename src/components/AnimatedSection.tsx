import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const current = elementRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translate-y-8';
        case 'down': return '-translate-y-8';
        case 'left': return 'translate-x-8';
        case 'right': return '-translate-x-8';
        case 'none': return 'scale-95';
        default: return 'translate-y-8';
      }
    }
    return 'translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={elementRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 ' + getTransform() : 'opacity-0 ' + getTransform()
      } ${className}`}
    >
      {children}
    </div>
  );
};
