import { NextResponse } from "next/server";

export type ExperienceState = {
  slug: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  type: string;
};

const experiences: ExperienceState[] = [
  {
    title: "Software Developer",
    slug: "internship-altus",
    company: "Altus Logistics Services",
    location: "South Jakarta, Kuningan, DKI Jakarta, Indonesia",
    period: "Jul 2024 - Apr 2025",
    description:
      "At Altus Logistics Services Indonesia, I was responsible for maintaining and managing internal software systems. This role involved optimizing the internal database for enhanced performance, as well as implementing feature enhancements, performing updates, and resolving bugs to ensure the stability and functionality of the applications.",
    type: "Internship",
  },
  {
    title: "Graphic Designer",
    slug: "graphic-designer-freelance",
    company: "Signed a Non-Disclosure Agreement hence unable to provide company's detail.",
    location: "South Bekasi, West Java, Indonesia",
    period: "Dec 2020 - Jul 2022",
    description:
      "My responsibilities included developing designs for social media feeds and managing the overall visual identity, which involved creating all necessary assets for each project. To streamline team collaboration and workflow, I designed and managed a comprehensive workspace in Notion, using it to organize project schedules, creative briefs, and all other essential items for my colleagues.",
    type: "Freelance",
  },
];

export async function GET() {
  return NextResponse.json(experiences);
}
