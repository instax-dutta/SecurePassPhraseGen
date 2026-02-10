import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Shield } from 'lucide-react';

export const LoadingAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Animation duration in seconds
  const duration = 2;
  const totalFrames = duration * fps;
  
  // Calculate progress (0 to 1)
  const progress = Math.min(frame / totalFrames, 1);
  
  // Scale animation
  const scale = 1 + progress * 0.5;
  
  // Rotation animation
  const rotation = progress * 360;
  
  // Opacity animation
  const opacity = progress < 0.5 ? progress * 2 : 1 - (progress - 0.5) * 2;
  
  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <div 
        className="relative"
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          opacity,
          transition: 'all 0.3s ease-out'
        }}
      >
        <Shield className="w-32 h-32 text-red-500" strokeWidth={3} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-yellow-400 opacity-50" />
        </div>
      </div>
      <div 
        className="absolute bottom-20 text-white font-heading text-4xl uppercase"
        style={{
          opacity: progress > 0.5 ? (progress - 0.5) * 2 : 0,
          transform: `translateY(${progress > 0.5 ? 0 : 20}px)`,
          transition: 'all 0.3s ease-out'
        }}
      >
        Loading...
      </div>
    </div>
  );
};