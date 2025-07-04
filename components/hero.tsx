"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Download, Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-buttons",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".hero-social",
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      gsap.to(".hero-title", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/assets/CV_UPDATE_BARU.pdf";
    link.download = "CV - Adam Pratama.pdf";
    link.click();
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center pt-20"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Adam Pratama
          </h1>

          <h2 className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6">
            Illustrator & Graphic Designer
          </h2>

          <p className="hero-description text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting visual stories and brand identities with passion and precision.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={downloadCV} className="group">
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Download CV
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToContact}>
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <Button
              href="https://github.com/bask4ra"
              variant="ghost"
              size="icon"
              className="hero-social hover:scale-110 transition-transform"
              newTab
            >
              <Github className="h-6 w-6" />
            </Button>
            <Button
              href="https://www.linkedin.com/in/adamprtma"
              variant="ghost"
              size="icon"
              className="hero-social hover:scale-110 transition-transform"
              newTab
            >
              <Linkedin className="h-6 w-6" />
            </Button>
            <Button
              href="https://www.instagram.com/bbsskara"
              variant="ghost"
              size="icon"
              className="hero-social hover:scale-110 transition-transform"
              newTab
            >
              <Instagram className="h-6 w-6" />
            </Button>
                        <Button
              href="https://x.com/bbskara"
              variant="ghost"
              size="icon"
              className="hero-social hover:scale-110 transition-transform"
              newTab
            >
              <Twitter className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
