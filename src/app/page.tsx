// app/page.tsx

import WednesdayNotice from './components/client/WednesdayNotice';
import HeroSection from './components/sections/HeroSection';
import IntroSection from './components/sections/IntroSection';
import JuridiqueSection from './components/sections/CadreJuridiqueSection';
import DocumentsRessourcesSection from './components/sections/DocumentsSection';
import OrganigrammeSection from './components/sections/OrganigrammeSection';
import GestionCongesSection from './components/sections/GestionCongesSection';
import FormationsSection from './components/sections/FormationsSection';
import IRPSection from './components/sections/IRPSection';
import FaqSection from './components/sections/FaqSection';

export default async function Home() {
  return (
    <main>
      <WednesdayNotice />
      <HeroSection />
      <IntroSection />
      <JuridiqueSection />
      <DocumentsRessourcesSection />
      <OrganigrammeSection />
      <GestionCongesSection />
      <FormationsSection />
      <IRPSection />
      <FaqSection />
    </main>
  );
}