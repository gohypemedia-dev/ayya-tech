"use client";

import { AppleStyleDock } from '@/components/apple-style-dock';
import HeroSection from '@/components/ui/dynamic-animated-hero-section-with-gradient';
import { HomeEditorial } from '@/components/home-editorial';
import { scrollToSection } from '@/components/smooth-scroll';

export default function Home() {
  const contact = () => scrollToSection('contact');

  return (
    <div id="home">
      <AppleStyleDock onContactClick={contact} />
      <main>
        <HeroSection />
        <HomeEditorial onContact={contact} />
      </main>
    </div>
  );
}
