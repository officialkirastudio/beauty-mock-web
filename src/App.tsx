import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { ToastContainer } from './components/layout/ToastContainer';
import { CustomCursor } from './components/ui/CustomCursor';
import { HeroSection } from './components/sections/HeroSection';
import { ShowroomSection } from './components/sections/ShowroomSection';
import { ProductCatalogSection } from './components/sections/ProductCatalogSection';
import { FaceRitualSection } from './components/sections/FaceRitualSection';
import { RoutineBuilderSection } from './components/sections/RoutineBuilderSection';
import { MirrorSection } from './components/sections/MirrorSection';
import { IngredientSection } from './components/sections/IngredientSection';
import { FormulationShowcase } from './components/sections/FormulationShowcase';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { EditorialSection } from './components/sections/EditorialSection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { ProductDetailModal } from './components/shop/ProductDetailModal';
import { CartDrawer } from './components/shop/CartDrawer';
import { WishlistDrawer } from './components/shop/WishlistDrawer';
import { CheckoutModal } from './components/shop/CheckoutModal';
import { OrderConfirmationModal } from './components/shop/OrderConfirmationModal';
import { SearchModal } from './components/shop/SearchModal';
import { useStore } from './store/useStore';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const enteredStore = useStore((state) => state.enteredStore);
  const setEnteredStore = useStore((state) => state.setEnteredStore);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEnterStore = () => {
    setEnteredStore(true);
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      setTimeout(() => {
        catalogElem.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#1A1918] selection:bg-[#D4AF37] selection:text-white overflow-x-hidden">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Custom Trailing Luxury Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="relative z-10">
        {/* 1. Landing Hero Section with Video & 3D Scoped Canvas */}
        <HeroSection onEnterStore={handleEnterStore} isEntered={enteredStore} mousePos={mousePos} />

        {/* 2. 3D WebGL Showroom Galleries */}
        <ShowroomSection />

        {/* 3. Full Product Collection */}
        <ProductCatalogSection />

        {/* 4. Your Skin. Your Ritual. 3D Facial Hotspots */}
        <FaceRitualSection />

        {/* 5. Build Your Beauty Ritual Wizard */}
        <RoutineBuilderSection />

        {/* 6. SEE YOUR GLOW 3D Mirror Simulation */}
        <MirrorSection />

        {/* 7. What's Inside 3D Ingredient Explorer */}
        <IngredientSection />

        {/* 8. The Art of Formulation Showcase */}
        <FormulationShowcase />

        {/* 9. Customer Testimonials */}
        <ReviewsSection />

        {/* 10. The LUMÉRA Edit Instagram Grid */}
        <EditorialSection />

        {/* 11. Final Call To Action */}
        <FinalCTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <SearchModal />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
