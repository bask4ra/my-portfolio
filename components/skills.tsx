"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Skills() {
  const skillsRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !skillsRef.current) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const titleElement = skillsRef.current?.querySelector(".skills-title");
        if (titleElement) {
          gsap.fromTo(
            titleElement,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: titleElement,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        const skillsContainer =
          skillsRef.current?.querySelector(".skills-container");
        if (skillsContainer) {
          gsap.fromTo(
            skillsContainer,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: skillsContainer,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (row1Ref.current) {
          gsap.set(row1Ref.current, { x: "0%" });
          gsap.to(row1Ref.current, {
            x: "-50%",
            duration: 30,
            ease: "none",
            repeat: -1,
          });
        }

        if (row2Ref.current) {
          gsap.set(row2Ref.current, { x: "-50%" });
          gsap.to(row2Ref.current, {
            x: "0%",
            duration: 30,
            ease: "none",
            repeat: -1,
          });
        }
      }, skillsRef);

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const skillsRow1 = [
    { name: "Adobe Illustrator", image: "/assets/svg/illustrator.svg" },
    { name: "Adobe Photoshop", image: "/assets/svg/photoshop.svg" },
    { name: "Adobe Xd", image: "/assets/svg/adobexd.svg" },
    { name: "Clip Studio Paint", image: "/assets/svg/csp.svg" },
    { name: "Procreate", image: "/assets/svg/procreate.svg" },
    { name: "Figma", image: "/assets/svg/figma.svg" },
  ];

  const skillsRow2 = [
    { name: "SQL Server", image: "/assets/svg/sqlserver.svg" },
    { name: "C#", image: "/assets/svg/csharp.svg" },
    { name: "React", image: "/assets/svg/react.svg" },
    { name: "Next JS", image: "/assets/svg/nextjs.svg" },
    { name: "Tailwind CSS", image: "/assets/svg/tailwindcss.svg" },
    { name: "Javascript", image: "/assets/svg/javascript.svg" },
  ];

  const duplicatedRow1 = [...skillsRow1, ...skillsRow1];
  const duplicatedRow2 = [...skillsRow2, ...skillsRow2];

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto ">
          <div className="skills-container space-y-12">
            <div className="relative overflow-hidden ">
              <div ref={row1Ref} className="flex gap-4 sm:gap-6 md:gap-8 w-max">
                {duplicatedRow1.map((skill, index) => (
                  <Card
                    key={`row1-${index}`}
                    className="skill-item group cursor-pointer border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex-shrink-0 w-64 sm:w-72 md:w-80 my-2"
                  >
                    <CardContent className="flex items-center gap-3 sm:gap-4 md:gap-6 p-4">
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex-shrink-0">
                        <Image
                          src={skill.image}
                          alt={skill.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm sm:text-base md:text-xl mb-1 group-hover:text-primary transition-colors truncate">
                          {skill.name}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden ">
              <div ref={row2Ref} className="flex gap-4 sm:gap-6 md:gap-8 w-max">
                {duplicatedRow2.map((skill, index) => (
                  <Card
                    key={`row2-${index}`}
                    className="skill-item group cursor-pointer border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex-shrink-0 w-64 sm:w-72 md:w-80 my-2"
                  >
                    <CardContent className="flex items-center gap-3 sm:gap-4 md:gap-6 p-4">
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex-shrink-0">
                        <Image
                          src={skill.image}
                          alt={skill.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm sm:text-base md:text-xl mb-1 group-hover:text-primary transition-colors truncate">
                          {skill.name}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
