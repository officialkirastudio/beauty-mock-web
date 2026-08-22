import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10000] bg-[#FAF8F5] flex flex-col items-center justify-center p-6 select-none transition-opacity duration-700">
      {/* Glow Center */}
      <div className="absolute w-72 h-72 bg-lumera-gold/15 rounded-full blur-3xl animate-pulse-slow" />

      {/* Brand Title */}
      <div className="relative text-center mb-8">
        <h1 className="font-serif text-4xl sm:text-6xl tracking-[0.3em] font-light text-lumera-charcoal uppercase mb-2">
          LUMÉRA
        </h1>
        <div className="flex items-center justify-center gap-2 text-xs tracking-[0.35em] text-lumera-gold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Beauty, Reimagined.</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 sm:w-80 h-1 bg-lumera-champagne/60 rounded-full overflow-hidden mb-4 relative">
        <div
          className="h-full bg-gradient-to-r from-lumera-champagne via-lumera-gold to-lumera-charcoal transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Status Text */}
      <p className="text-xs font-serif italic text-lumera-muted tracking-widest animate-pulse">
        Entering the world of beauty... {progress}%
      </p>
    </div>
  );
};
