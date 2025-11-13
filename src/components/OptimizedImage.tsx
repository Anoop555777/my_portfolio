import { useState } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage = ({ src, alt, className = '', loading = 'lazy' }: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Placeholder/Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
      )}

      {/* Actual Image */}
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ display: hasError ? 'none' : 'block' }}
      />

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <span className="text-gray-500">Image not available</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;

