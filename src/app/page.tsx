// app/page.tsx

import HeroSection from './components/sections/HeroSection';
import IntroSection from './components/sections/IntroSection';

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <IntroSection />
    </main>
  );
}