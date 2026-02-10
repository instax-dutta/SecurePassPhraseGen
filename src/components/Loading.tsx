import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  onLoadComplete: () => void;
}

export const Loading = ({ onLoadComplete }: LoadingProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadComplete, 500); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-64 h-64"
        >
          <source src="/loading.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white font-heading text-4xl uppercase animate-pulse">
            Loading...
          </div>
        </div>
      </div>
    </motion.div>
  );
};