import HeroSection from '@/components/home/HeroSection';
import PorQueElegirnos from '@/components/home/PorQueElegirnos';
import CategoriasDestacadas from '@/components/home/CategoriasDestacadas';
import ContactoSection from '@/components/home/ContactoSection';
import ScrollAnimator from '@/components/ui/ScrollAnimator';

export default function HomePage() {
  return (
    <main>
      <ScrollAnimator />
      <HeroSection />
      <PorQueElegirnos />
      <CategoriasDestacadas />
      <ContactoSection />
    </main>
  );
}
