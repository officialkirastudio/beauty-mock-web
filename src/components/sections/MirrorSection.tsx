import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mirror3D } from '../3d/Mirror3D';
import { Scan, Activity } from 'lucide-react';

export const MirrorSection: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(true);

  const metrics = [
    { label: 'Hydration Level', value: '94%', bar: 94 },
    { label: 'Radiance Glow', value: '91%', bar: 91 },
    { label: 'Smooth Texture', value: '96%', bar: 96 },
    { label: 'Elasticity Lift', value: '88%', bar: 88 }
  ];

  const handleScan = () => {
    setScanning(true);
    setScanned(false);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2000);
  };

  return (
    <section id="mirror-section" className="py-24 bg-lumera-charcoal text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lumera-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-lumera-gold block mb-2">
            FUTURISTIC SKIN SCANNER SIMULATION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white uppercase tracking-wider mb-4">
            SEE YOUR GLOW
          </h2>
          <p className="text-xs sm:text-sm text-lumera-muted leading-relaxed">
            *Visual interactive demonstration only. Does not replace clinical dermatological consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Mirror Floating Canvas */}
          <div className="lg:col-span-6 h-[400px] sm:h-[480px] bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden backdrop-blur-md">
            {scanning && (
              <div className="absolute inset-0 z-20 bg-lumera-gold/10 flex items-center justify-center backdrop-blur-xs">
                <div className="text-center animate-pulse">
                  <Scan className="w-12 h-12 text-lumera-gold mx-auto mb-2 animate-spin-slow" />
                  <p className="text-xs font-mono tracking-widest text-lumera-gold uppercase">
                    SIMULATING BIO-CELLULAR SCAN...
                  </p>
                </div>
              </div>
            )}

            <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 2]}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[4, 5, 4]} intensity={2.0} color="#FFFBF0" />
              <pointLight position={[0, 0, 3]} intensity={1.2} color="#D4AF37" />

              <Mirror3D />

              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.0} />
            </Canvas>
          </div>

          {/* Right: Simulated Skin Metrics UI */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-white">Bio-Texture Analysis</h3>
                  <p className="text-xs text-lumera-muted">Simulated facial luminescence score</p>
                </div>

                <button
                  onClick={handleScan}
                  disabled={scanning}
                  className="px-5 py-2.5 rounded-full bg-lumera-gold text-lumera-charcoal hover:bg-white font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  <span>{scanning ? 'SCANNING...' : 'RE-SCAN GLOW'}</span>
                </button>
              </div>

              {/* Metrics Progress */}
              <div className="space-y-5">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span className="text-lumera-muted uppercase tracking-wider">{m.label}</span>
                      <span className="text-lumera-gold font-mono">{m.value}</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-lumera-gold to-white transition-all duration-1000 rounded-full"
                        style={{ width: scanned ? `${m.bar}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
