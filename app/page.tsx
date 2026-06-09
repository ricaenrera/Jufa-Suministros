import HeroSection from '@/components/home/HeroSection';
import PorQueElegirnos from '@/components/home/PorQueElegirnos';
import CategoriasDestacadas from '@/components/home/CategoriasDestacadas';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PorQueElegirnos />
      <CategoriasDestacadas />
    </main>
  );
}
