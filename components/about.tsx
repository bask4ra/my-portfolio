"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !aboutRef.current) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const titleElement = aboutRef.current?.querySelector(".about-title");
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

        const contentElements =
          aboutRef.current?.querySelectorAll(".about-content");
        if (contentElements && contentElements.length > 0) {
          contentElements.forEach((element, index) => {
            gsap.fromTo(
              element,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        }
      }, aboutRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="about-title text-3xl md:text-4xl font-bold text-center mb-12">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="about-content">
              <h3 className="text-2xl font-semibold mb-6">
                Hello! I&apos;m Adam Pratama
              </h3>
              <p className="text-muted-foreground mb-3 leading-relaxed">
                I am a design enthusiast and programming student based in Bekasi, Indonesia. 
                With a strong eye for visual detail, I am passionate about blending beautiful 
                aesthetics with meaningful functionality, ensuring every product not only looks 
                good but also works exceptionally well. 
              </p>
              <p className="text-muted-foreground mb-3 text- leading-relaxed">
                Currently, I am actively expanding my skills in programming with a focus on 
                Front-End, Back-End Development, and Software Engineer. 
                My motivation stems from a deep curiosity to design and build intuitive, user-friendly digital experiences from start to finish.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I Fluent in Bahasa Indonesia and proficient in English, I can collaborate effectively in diverse work environments. 
                This bilingual ability serves as a bridge for clear and efficient communication in multicultural teams.
              </p>
            </div>

            <div className="about-content">
              <div className="bg-gradient-to-br from-muted/50 to-accent/50 rounded-lg text-center border">
                <Image
                  src="/assets/Adam_Image.png"
                  width={400}
                  height={400}
                  className="w-full h-full rounded-lg"
                  alt="portofolio image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
