import { NextResponse } from "next/server";

export type Achievement = {
  title: string;
  description: string;
  icon: string;
};

export type StatItem = {
  label: string;
  value: string;
  icon: string;
};

export type Educations = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: string;
  gpa: string;
  description: string;
  achievements: Achievement[];
  stats: StatItem[];
};

export async function GET(): Promise<NextResponse<Educations>> {
  const education: Educations = {
    degree: "Undergraduate of Informatics Engineering",
    institution: "Paramadina University",
    location: "Jakarta, Indonesia",
    period: "Sep 2022 - Present",
    status: "Ungraduate",
    gpa: "3.36/4.00",
    description:
      "With a specialization in IoT Software Engineering and user-centered design, I recently led the end-to-end development of a full-stack IoT management platform. My role encompassed the entire project lifecycle, from UI/UX design in Figma and the Adobe Suite to the full implementation of the front-end, back-end, and database.",

    achievements: [
      {
        title: "Paid Internship at Altus Logistics",
        description:
          "Demonstrating technical skills that exceeded the standard curriculum, I successfully secured a paid professional internship as a Website Developer at PT. Altus Logistics Services Indonesia at the end of my 4th semester. This early entry into a professional role, complete with significant responsibilities and compensation, served as key recognition of my industry-ready capabilities",
        icon: "Users",
      },
    ],
    stats: [
      { label: "Years", value: "4", icon: "Calendar" },
      { label: "SGPA", value: "3.36", icon: "Award" },
    ],
  };

  return NextResponse.json(education);
}
