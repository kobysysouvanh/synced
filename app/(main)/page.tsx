"use client";

import Hero from "@/components/LandingPage/Hero";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full flex-1 flex flex-col">
      <Hero/>
    </div>
  );
}
