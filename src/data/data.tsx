import type { Profile, SocialLink, NewsItem, Project, ResearchItem } from "../types";
import avatarImg from "../assets/img/dip.jpeg";
import facebookImg from "../assets/img/facebook.jpg";
import microsoftImg from "../assets/img/microsoft.jpg";
import amazonImg from "../assets/img/amazon.jpg";
import londonImg from "../assets/img/london.jpg";
import fmradioImg from "../assets/img/fmradio.jpg";
import khabarImg from "../assets/img/khabar.jpg";
import compilerImg from "../assets/img/compiler.jpg";
import quickdrawImg from "../assets/img/quickdraw.jpg";
import interviewImg from "../assets/img/interview.jpg";
import tutorialImg from "../assets/img/tutorial.jpg";
import typescriptImg from "../assets/img/typescript.jpg";
import androidImg from "../assets/img/android.jpg";
import designImg from "../assets/img/design.jpg";
import cvImg from "../assets/img/computervision.jpg";
import linuxImg from "../assets/img/linux.jpg";
import resumePdf from "../assets/pdf/resume.pdf";

const linkClass =
  "text-[#555] underline decoration-[#ccc] underline-offset-2 hover:bg-yellow-200 hover:decoration-yellow-300 transition-colors rounded-sm px-0.5 -mx-0.5";

function L({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

// ─── Profile ────────────────────────────────────────────────────────────────

export const profile: Profile = {
  name: "Dipankar Dutta",
  title: "Software Engineering Lead at Facebook",
  bio: [
    <>
      Hi! I'm a software engineer with 15+ years of experience working at top
      technology companies. I think, write and talk about Software Systems
      Architecture: how they are built, how they break, how they scale, and the
      people that maintain them.
    </>,
    <>
      Based in <L href="https://www.visitlondon.com/">London</L>, UK. I have
      worked on products like{" "}
      <L href="https://portal.facebook.com/">Portal</L>,{" "}
      <L href="https://about.meta.com/realitylabs/">Meta RTC</L>,{" "}
      <L href="https://horizon.meta.com/">Horizon</L>, and{" "}
      <L href="https://ai.meta.com/">Meta AI</L> at{" "}
      <L href="https://about.meta.com/">Meta / Facebook</L>. Previously, I
      worked as a software development engineer at{" "}
      <L href="https://www.office.com/">Microsoft</L> and{" "}
      <L href="https://www.amazon.co.in/">Amazon</L>.
    </>,
  ],
  email: "dutta.dipankar08@gmail.com",
  location: "London, UK",
  cvUrl: resumePdf,
  avatarUrl: avatarImg,
};

export const socialLinks: SocialLink[] = [
  { platform: "github", url: "https://github.com/dipankar08/" },
  { platform: "linkedin", url: "https://www.linkedin.com/in/dipankar08/" },
  { platform: "facebook", url: "https://www.facebook.com/dipankar089" },
];

// ─── News ───────────────────────────────────────────────────────────────────

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Working at Facebook",
    description:
      "Currently working as a software engineering lead at Facebook, building software components and tools for Portal to enhance experiences for billions of people.",
    date: "Present",
    imageUrl: facebookImg,
    link: "https://facebook.com",
  },
  {
    id: "2",
    title: "Previously at Microsoft",
    description:
      "Worked as a software development engineer at Microsoft on Office products, building enterprise-grade solutions.",
    date: "Previous",
    imageUrl: microsoftImg,
    link: "http://office.microsoft.com/",
  },
  {
    id: "3",
    title: "Previously at Amazon",
    description:
      "Worked as a software development engineer at Amazon, contributing to large-scale distributed systems and services.",
    date: "Previous",
    imageUrl: amazonImg,
    link: "https://www.amazon.co.in/",
  },
  {
    id: "4",
    title: "Based in London, UK",
    description:
      "Living and working in London, building software systems that scale globally.",
    date: "Present",
    imageUrl: londonImg,
    link: "https://www.visitlondon.com/",
  },
];

// ─── Projects ───────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "1",
    title: "FM Radio",
    description:
      "A fully featured FM Radio app for Android with a clean interface and smooth listening experience. Available on the Google Play Store.",
    tags: ["Android", "Java", "Mobile"],
    imageUrl: fmradioImg,
    demoUrl:
      "https://play.google.com/store/apps/details?id=in.peerreview.fmradioindia",
  },
  {
    id: "2",
    title: "Khabar App",
    description:
      "A news aggregator app that delivers curated content in a simple and accessible format. Available on the Google Play Store.",
    tags: ["Android", "Java", "News"],
    imageUrl: khabarImg,
    demoUrl:
      "https://play.google.com/store/apps/details?id=in.peerreview.khabar",
  },
  {
    id: "3",
    title: "Online Compiler",
    description:
      "A web-based code compiler that allows you to write, compile, and run code directly in the browser.",
    tags: ["JavaScript", "Web", "Tools"],
    imageUrl: compilerImg,
    demoUrl: "http://dipankar08.github.io/apps/compiler/index.html",
    sourceUrl: "https://github.com/dipankar08/",
  },
  {
    id: "4",
    title: "QuickDraw",
    description:
      "A simple and intuitive drawing application built with TypeScript and Canvas API for quick sketches and diagrams.",
    tags: ["TypeScript", "Canvas", "Web"],
    imageUrl: quickdrawImg,
    demoUrl: "http://dipankar08.github.io/apps/simpledraw/index.html",
    sourceUrl: "https://github.com/dipankar08/",
  },
  {
    id: "5",
    title: "Interview Prep",
    description:
      "A comprehensive collection of interview preparation materials covering data structures, algorithms, and system design.",
    tags: ["Education", "CS", "Interview"],
    imageUrl: interviewImg,
    demoUrl: "http://dipankar08.github.io/apps/interview/index.html",
  },
  {
    id: "6",
    title: "Tutorial Platform",
    description:
      "An interactive learning platform with tutorials and hands-on exercises for various programming topics.",
    tags: ["Education", "Web", "Learning"],
    imageUrl: tutorialImg,
    demoUrl: "http://dipankar08.github.io/apps/learling/index.html",
  },
];

// ─── Research & Blog ────────────────────────────────────────────────────────

export const researchItems: ResearchItem[] = [
  {
    id: "1",
    title: "TypeScript - All in One Guide",
    description:
      "A comprehensive guide covering TypeScript fundamentals, advanced types, generics, decorators, and best practices for building large-scale applications.",
    date: "",
    venue: "Book / Reference",
    link: "http://dipankar08.github.io/apps/books/allinone_typescript.txt.html",
    imageUrl: typescriptImg,
    tags: ["TypeScript", "Programming", "Guide"],
  },
  {
    id: "2",
    title: "Android Examples",
    description:
      "A collection of practical Android development examples covering activities, services, content providers, and modern Android architecture components.",
    date: "",
    venue: "Book / Reference",
    link: "http://dipankar08.github.io/apps/books/android_examples.txt.html",
    imageUrl: androidImg,
    tags: ["Android", "Mobile", "Java"],
  },
  {
    id: "3",
    title: "Design Principles",
    description:
      "An exploration of software design principles including SOLID, DRY, KISS, and architectural patterns for building maintainable software systems.",
    date: "",
    venue: "Book / Reference",
    link: "http://dipankar08.github.io/apps/books/design_principles.txt.html",
    imageUrl: designImg,
    tags: ["Design", "Architecture", "Principles"],
  },
  {
    id: "4",
    title: "Pro Computer Vision",
    description:
      "A deep dive into computer vision concepts, image processing techniques, and practical applications using modern frameworks and tools.",
    date: "",
    venue: "Book / Reference",
    link: "http://dipankar08.github.io/apps/books/pro_computervision.txt.html",
    imageUrl: cvImg,
    tags: ["Computer Vision", "AI", "Python"],
  },
  {
    id: "5",
    title: "Linux for Pro Developers",
    description:
      "A guide for professional developers on mastering Linux systems, shell scripting, system administration, and development workflows.",
    date: "",
    venue: "Book / Reference",
    link: "http://dipankar08.github.io/apps/books/pro_devlopers.txt.html",
    imageUrl: linuxImg,
    tags: ["Linux", "DevOps", "Systems"],
  },
];
