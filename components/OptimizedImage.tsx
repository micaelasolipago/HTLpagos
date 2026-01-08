import React, { useState, useEffect, useRef } from 'react';
import { Loader } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23f3f4f6%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E'
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [isVisible, setIsVisible] = useState(priority);
  const [imageSrc, setImageSrc] = useState(placeholder);
  const ref = useRef<HTMLImageElement>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [priority]);

  // Cargar imagen cuando sea visible
  useEffect(() => {
    if (!isVisible) return;

    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setIsLoaded(true);
    };
    
    // Usar WebP si está disponible, sino JPG
    img.srcset = `${src}?w=400&format=webp 400w, ${src}?w=800&format=webp 800w, ${src} 1x`;
    img.src = src;
  }, [isVisible, src]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-gray-200 ${className}`}
      style={{ width, height, aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {/* Placeholder / Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <Loader className="animate-spin text-gray-400" size={24} />
        </div>
      )}

      {/* Imagen actual */}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
      />
    </div>
  );
};

export default OptimizedImage;
