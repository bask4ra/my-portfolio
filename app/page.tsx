"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";

// Register GSAP plugin if we are in a browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Portfolio() {
  const mainRef = useRef<HTMLElement>(null);

  // Effect for page load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main content container to fade in and slide up
      gsap.fromTo(
        ".page-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }, mainRef);

    // Cleanup function to revert animations when the component unmounts
    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-background text-foreground transition-colors duration-300"
    >
      {/* Navigation component is placed here, it will be fixed at the top */}
      <Navigation />

      {/* This div wraps all the main sections of the page */}
      <div className="page-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </div>
    </main>
  );
}
