// app/page.tsx

import HeroSection from './components/sections/HeroSection';
import IntroSection from './components/sections/IntroSection';
import JuridiqueSection from './components/sections/CadreJuridiqueSection';
import DocumentsRessourcesSection from './components/sections/DocumentsSection';

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <IntroSection />
      <JuridiqueSection />
      <DocumentsRessourcesSection />
    </main>
  );
}