"use client";

import type React from "react";
import { type SVGProps, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  MapPin,
  GraduationCap,
  Users,
  Trophy,
  Award,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Achievement {
  title: string;
  description: string;
  icon: string;
}

interface Educations {
  status: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  gpa: string;
  description: string;
  achievements: Achievement[];
}

const iconComponents: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  Calendar, Users, Trophy, Award, BookOpen, GraduationCap, MapPin,
};

export function Education() {
  const educationRef = useRef<HTMLElement>(null);
  const [educations, setEducations] = useState<Educations | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !educationRef.current) return;

    const ctx = gsap.context(() => {
        // Animation code here...
    }, educationRef);

    return () => ctx.revert();
  }, [educations]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch("/api/education");
        if (!response.ok) {
          throw new Error(`Failed to fetch education data: ${response.status}`);
        }
        const data = await response.json();
        setEducations(data);
      } catch (err) {
        console.error("Error fetching education data:", err);
        setEducations(null);
      }
    };

    fetchEducation();
  }, []);

  const getIconComponent = (iconName: string) => {
    const Icon = iconComponents[iconName];
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  return (
    <section id="education" ref={educationRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="section-header text-center mb-12">
            <div className="inline-flex items-center gap-2 border border-border bg-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <GraduationCap className="h-4 w-4" />
              Education
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Academic Background
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My Foundation Where Creativity Meets Code
            </p>
          </div>

          <div className="education-card space-y-8">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <Badge
                    variant="outline"
                    className="mb-3 bg-background/80  border-primary-foreground/30"
                  >
                    {educations?.status}
                  </Badge>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                    {educations?.degree}
                  </h3>
                  <p className="text-base md:text-lg opacity-90 mb-3">
                    {educations?.institution}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm opacity-90">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{educations?.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{educations?.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center bg-background dark:bg-card text-primary rounded-full h-20 w-20 flex-shrink-0 shadow-md border-2 border-primary/20">
                  <div className="text-center">
                    <div className="text-xl font-bold leading-none">
                      {educations?.gpa.split("/")[0]}
                    </div>
                    <div className="text-xs opacity-80 mt-1">SGPA / 4.00</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="overflow-hidden border border-border/60 shadow-sm">
                <CardContent className="p-5">
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Overview
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {educations?.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border border-border/60 shadow-sm">
                <CardContent className="p-5">
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Key Achievements
                  </h4>
                  <div className="space-y-3 achievements-section">
                    {educations?.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="achievement-item flex items-start gap-3 p-3 bg-secondary/50 dark:bg-secondary/30 rounded-lg border-l-2 border-primary"
                      >
                        <div className="p-1.5 bg-background dark:bg-card border rounded-full flex-shrink-0">
                          {getIconComponent(achievement.icon)}
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-medium text-sm mb-0.5">
                            {achievement.title}
                          </h5>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
