import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export type ExperienceState = {
  slug: string;
  title: string;
  company: string;
  company_url?: string;
  locations_url?: string;
  location: string;
  period: string;
  description: string;
  current_period?: string;
  type: string;
  responsibilities?: string[];
  technologies?: string[];
};
const experiences: ExperienceState[] = [
  {
    title: "Software Developer",
    slug: "internship-altus",
    company: "PT. Altus Logistics Services Indonesia",
    company_url: "https://altusindonesia.com/",
    locations_url: "https://maps.app.goo.gl/nRe9MzxrbqnnmVr86",
    location: "South Jakarta, Kuningan, DKI Jakarta, Indonesia",
    period: "Jul 2024 - Apr 2025",
    description:
      'At Altus Logistics Services Indonesia, I was responsible for maintaining and managing internal software systems. This role involved optimizing the internal database for enhanced performance, as well as implementing feature enhancements, performing updates, and resolving bugs to ensure the stability and functionality of the applications.',
    type: "Internship",
    current_period: "April 2025",
    responsibilities: [
      "Managed and maintained internal software applications built on the ASP.NET Framework using C#, ensuring their continuous stability, availability, and functionality to support the company's daily logistics operations.",
      "Utilized SQL Server Management Studio (SSMS) to design and execute efficient SQL queries for data management, while also optimizing internal database performance through query analysis, index management, and routine maintenance to ensure data integrity and speed.",
      "Actively developed applications by implementing new features and enhancements using C# for server-side logic and JavaScript for the client-side experience. This role also involved proactive debugging and troubleshooting to resolve bugs, as well as performing regular system updates to enhance security, performance, and technological relevance.",
    ],
    technologies: ["SQL Server Management Studio", "JavaScript", "ASP.NET", "C#"],
  },
  {
    title: "Graphic Designer",
    slug: "graphic-designer-freelance",
    company: "Signed a Non-Disclosure Agreement hence unable to provide company's detail.",
    //company_url: "https:",//
    location: "South Bekasi, West Java, Indonesia",
    //locations_url: "https:",//
    period: "Dec 2020 - Jul 2022",
    current_period: "July 2022",
    description:
      "My responsibilities included developing designs for social media feeds and managing the overall visual identity, which involved creating all necessary assets for each project. To streamline team collaboration and workflow, I designed and managed a comprehensive workspace in Notion, using it to organize project schedules, creative briefs, and all other essential items for my colleagues.",
    type: "Freelance",
    responsibilities: [
      "I designed and developed engaging visual concepts for social media feeds, utilizing Adobe Photoshop for image compositions and Adobe Illustrator for graphic elements to effectively reach the target audience. A key part of this role was managing the brand's visual keys to ensure a strong, consistent, and cohesive identity across all social media platforms.",
      "I produced a wide range of original graphic assets, including icons, illustrations, and custom typography, by leveraging vector-based software like Adobe Illustrator and CorelDRAW. I also used Adobe Photoshop for advanced image editing and manipulation to create the high-quality visual materials required for various campaigns and designs.",
    ],
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "CorelDRAW"],
  },
];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const exp = experiences.find((item) => item.slug === slug);

  if (!exp) {
    return NextResponse.json(
      { message: "Experience not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(exp);
}
