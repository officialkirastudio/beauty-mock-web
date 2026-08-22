import React, { useRef, useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';
import { HeroScene } from '../3d/HeroScene';

interface HeroSectionProps {
  onEnterStore: () => void;
  isEntered: boolean;
  mousePos?: { x: number; y: number };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnterStore, isEntered, mousePos = { x: 0, y: 0 } }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const videoPath = '/videos/Create_a_high_end_cinematic_D.mp4';

  useEffect(() => {
    const videoElem = videoRef.current;
    if (!videoElem) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElem.play().catch(() => {});
          } else {
            videoElem.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(videoElem);
    return () => observer.disconnect();
  }, []);

  const handleEnterStoreClick = () => {
    setIsTransitioning(true);
    onEnterStore();
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const videoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2 }
    }
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 px-5 sm:px-8 lg:px-12 flex items-center overflow-hidden">
      {/* 3D WebGL Background Canvas (Scoped strictly to HeroSection) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <HeroScene mousePos={mousePos} isEntered={isEntered} />
        </Canvas>
      </div>

      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* LEFT 40%: Typography & CTAs */}
          <div className="lg:col-span-5 text-left space-y-6 z-10">
            {/* Tag Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#E8DFD3] text-xs font-medium text-[#1A1918] uppercase tracking-[0.25em] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>FUTURISTIC LUXURY BEAUTY</span>
              </div>
            </motion.div>

            {/* Brand Title & Subtitle */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-7xl font-light tracking-[0.2em] text-[#1A1918] uppercase leading-none">
                LUMÉRA
              </h1>
              <p className="font-serif text-2xl sm:text-3xl italic text-[#D4AF37] tracking-widest font-normal">
                Beauty, Reimagined.
              </p>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-sm sm:text-base text-[#6E6C68] max-w-md leading-relaxed tracking-wide font-sans">
                Discover a new generation of cellular skincare, high-pigment couture makeup, and sensual fragrances crafted for your everyday glow.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#catalog-section"
                className="px-7 py-3.5 rounded-full bg-[#1A1918] text-white hover:bg-[#D4AF37] font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 shadow-md text-center border border-[#1A1918]"
              >
                EXPLORE COLLECTION
              </a>

              <button
                onClick={handleEnterStoreClick}
                className={`px-7 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#1A1918] font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 border border-[#1A1918] shadow-sm flex items-center justify-center gap-2.5 group ${
                  isTransitioning ? 'scale-105 bg-[#D4AF37] text-white border-[#D4AF37]' : ''
                }`}
              >
                <Compass className="w-4 h-4 text-[#D4AF37] group-hover:rotate-90 transition-transform duration-500" />
                <span>ENTER THE STORE</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT 60%: Integrated Hero Video Composition */}
          <motion.div
            variants={videoVariants}
            className={`lg:col-span-7 relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-[#E8DFD3] shadow-2xl transition-all duration-700 ${
              isTransitioning ? 'scale-105 blur-xs shadow-[#D4AF37]/30' : ''
            }`}
          >
            {/* Main Video Element */}
            <video
              ref={videoRef}
              src={videoPath}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            {/* Editorial Glass Overlay Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/40 via-transparent to-white/10 pointer-events-none" />

            {/* Corner Luxury Badge */}
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#E8DFD3] text-[#1A1918] shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="font-serif text-xs font-bold tracking-[0.2em] uppercase">
                LUMÉRA SHOWROOM
              </span>
            </div>

            {/* Poster Fallback State */}
            {(!videoLoaded || videoError) && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBF7] via-[#FAF5ED] to-[#EAD7CE] flex flex-col items-center justify-center p-8 text-center border border-[#E8DFD3]">
                <div className="w-16 h-16 rounded-full bg-white/90 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-3 shadow-md">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl tracking-[0.2em] font-light text-[#1A1918] uppercase">
                  LUMÉRA
                </h3>
                <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mt-1">
                  Beauty, Reimagined.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {!isEntered && (
          <div className="mt-12 flex flex-col items-center gap-2 text-[#6E6C68] animate-bounce">
            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to Explore</span>
            <ArrowDown className="w-4 h-4 text-[#D4AF37]" />
          </div>
        )}
      </div>
    </section>
  );
};
