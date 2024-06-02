"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/Presentation/HeroSolutions";
import Features from "@/components/Presentation/Features";
import OverviewSection from "@/components/Presentation/Overview";
import TwoTiersPricing from '@/components/Presentation/TwoTiersPricing';

export default async function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <OverviewSection />
      <Features />
      <TwoTiersPricing />
      <Footer />
    </>
  );
}
