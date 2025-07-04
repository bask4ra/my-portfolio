"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ExperienceState } from "@/app/api/experiences/route";
import { useDisclosure } from "@/hooks/use-disclosure";
import ExperienceDetail from "./modals/experience-detail";
import { Button } from "./ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const { isOpen, setIsOpenAction } = useDisclosure();
  const experienceRef = useRef<HTMLElement>(null);
  const [experiences, setExperiences] = useState<ExperienceState[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/experiences")
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
        setIsLoaded(true);
      })
      .catch((err) => console.error("Failed to fetch experiences", err));
  }, []);

  const handleOpen = (slug: string) => {
    setSelectedSlug(slug);
    setIsOpenAction(true);
  };

  useEffect(() => {
    if (typeof window === "undefined" || !experienceRef.current || !isLoaded)
      return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-title",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".experience-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );

      document.querySelectorAll(".timeline-item").forEach((item) => {
          gsap.fromTo(item, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            }
        );
      });
    }, experienceRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      id="experience"
      ref={experienceRef}
      className="py-12 md:py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="experience-title text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 md:mb-16">
            Work Experience
          </h2>

          <div className="timeline-container relative">
            <div className="timeline-line absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

            <div className="space-y-8 md:space-y-16">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`timeline-item relative ${
                    index % 2 === 0
                      ? "md:flex md:flex-row"
                      : "md:flex md:flex-row-reverse"
                  }`}
                >
                  <div className="timeline-dot absolute left-6 md:left-1/2 w-4 h-4 md:w-5 md:h-5 bg-primary rounded-full transform -translate-x-1/2 md:-translate-x-1/2 z-10 border-4 border-background shadow-lg top-6 flex items-center justify-center">
                  </div>

                  <div
                    className={`w-full md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    } pl-12 md:pl-0 pr-4 md:pr-0`}
                  >
                    <Card className="timeline-card hover:shadow-xl transition-all duration-300 border hover:border-primary/20 relative overflow-hidden group">
                      <CardContent className="p-4 md:p-6 relative z-10">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-3">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                          <span className="font-medium">{exp.period}</span>
                        </div>

                        <h3 className="job-title text-lg md:text-xl font-bold mb-2 text-foreground leading-tight">
                          {exp.title}
                        </h3>
                        <h4 className="company-name text-base md:text-lg font-semibold mb-2 leading-tight text-muted-foreground">
                          {exp.company}
                        </h4>

                        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-4">
                          <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                          <span className="truncate">{exp.location}</span>
                        </div>
                        <p className="job-description text-sm md:text-base text-muted-foreground mb-4 line-clamp-3">
                          {exp.description}
                        </p>

                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleOpen(exp.slug)}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedSlug && (
        <ExperienceDetail
          isOpen={isOpen}
          setIsOpenAction={setIsOpenAction}
          slug={selectedSlug}
        />
      )}
    </section>
  );
}
