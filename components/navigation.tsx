"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Moon, Sun, Menu, X, Cat } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-item",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.5 }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "experience",
      "education",
      "contact",
    ];
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -20% 0px",
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sectionElements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      sectionElements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
    setActiveSection(sectionId);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b"
    >
      <div className="absolute top-0 left-0 h-1 bg-primary/20 w-full">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-28 py-4">
        <div className="flex items-center justify-between">
          <div
            className="nav-item font-bold text-xl flex items-center gap-2 group cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <Cat
              size={30}
              className="text-primary group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {[
              "home",
              "about",
              "skills",
              "experience",
              "education",
              "contact",
            ].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={cn(
                  "nav-item capitalize transition-all duration-300 relative",
                  "hover:text-primary hover:translate-y-[-2px]",
                  "after:content-[''] after:absolute after:left-0 after:bottom-[-6px]",
                  "after:h-[3px] after:bg-primary after:transition-all after:duration-300",
                  activeSection === item
                    ? "text-primary font-medium after:w-full"
                    : "after:w-0 hover:after:w-full"
                )}
              >
                {item}
              </button>
            ))}
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="nav-item hover:bg-accent transition-colors hover:scale-105 active:scale-95"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="nav-item hover:bg-accent transition-colors hover:scale-105 active:scale-95"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="nav-item hover:bg-accent/50 transition-colors hover:scale-105 active:scale-95"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-4 pt-4">
              {[
                "home",
                "about",
                "skills",
                "experience",
                "education",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={cn(
                    "capitalize transition-colors text-left px-3 py-2 rounded-md",
                    "hover:bg-accent/50 hover:pl-5",
                    activeSection === item
                      ? "text-primary font-medium border-l-4 border-primary pl-4 bg-accent/30"
                      : "pl-3"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
