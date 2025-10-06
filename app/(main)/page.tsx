"use client";

import Footer from "@/components/Footer";
import FAQ from "@/components/LandingPage/FAQ";
import Features from "@/components/LandingPage/Features";
import FinalCTA from "@/components/LandingPage/FinalCTA";
import Hero from "@/components/LandingPage/Hero";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import LivePreview from "@/components/LandingPage/LivePreview";
import Pricing from "@/components/LandingPage/Pricing";
import Testimonials from "@/components/LandingPage/Testimonials";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full flex-1 flex flex-col pt-8">
      <Hero/>
      <Features/>
      <HowItWorks/>
      <LivePreview/>
      {/* <Testimonials/> */}
      <Pricing/>
      <FAQ/>
      <FinalCTA/>
      <Footer/>
    </div>
  );
}
