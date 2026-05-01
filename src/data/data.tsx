import type { Profile, SocialLink, NewsItem, Project, ResearchItem } from "../types";

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
      Hi! I&apos;m a software engineer with 15+ years of experience working at top
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
  cvUrl: "/resume.pdf",
  avatarUrl: "/images/dip.jpeg",
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
    imageUrl: "/images/facebook.jpg",
    link: "https://facebook.com",
  },
  {
    id: "2",
    title: "Previously at Microsoft",
    description:
      "Worked as a software development engineer at Microsoft on Office products, building enterprise-grade solutions.",
    date: "Previous",
    imageUrl: "/images/microsoft.jpg",
    link: "http://office.microsoft.com/",
  },
  {
    id: "3",
    title: "Previously at Amazon",
    description:
      "Worked as a software development engineer at Amazon, contributing to large-scale distributed systems and services.",
    date: "Previous",
    imageUrl: "/images/amazon.jpg",
    link: "https://www.amazon.co.in/",
  },
  {
    id: "4",
    title: "Based in London, UK",
    description:
      "Living and working in London, building software systems that scale globally.",
    date: "Present",
    imageUrl: "/images/london.jpg",
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
    imageUrl: "/images/fmradio.jpg",
    demoUrl:
      "https://play.google.com/store/apps/details?id=in.peerreview.fmradioindia",
  },
  {
    id: "2",
    title: "Khabar App",
    description:
      "A news aggregator app that delivers curated content in a simple and accessible format. Available on the Google Play Store.",
    tags: ["Android", "Java", "News"],
    imageUrl: "/images/khabar.jpg",
    demoUrl:
      "https://play.google.com/store/apps/details?id=in.peerreview.khabar",
  },
  {
    id: "3",
    title: "Online Compiler",
    description:
      "A web-based code compiler that allows you to write, compile, and run code directly in the browser.",
    tags: ["JavaScript", "Web", "Tools"],
    imageUrl: "/images/compiler.jpg",
    demoUrl: "http://dipankar08.github.io/apps/compiler/index.html",
    sourceUrl: "https://github.com/dipankar08/",
  },
  {
    id: "4",
    title: "QuickDraw",
    description:
      "A simple and intuitive drawing application built with TypeScript and Canvas API for quick sketches and diagrams.",
    tags: ["TypeScript", "Canvas", "Web"],
    imageUrl: "/images/quickdraw.jpg",
    demoUrl: "http://dipankar08.github.io/apps/simpledraw/index.html",
    sourceUrl: "https://github.com/dipankar08/",
  },
  {
    id: "5",
    title: "Interview Prep",
    description:
      "A comprehensive collection of interview preparation materials covering data structures, algorithms, and system design.",
    tags: ["Education", "CS", "Interview"],
    imageUrl: "/images/interview.jpg",
    demoUrl: "http://dipankar08.github.io/apps/interview/index.html",
  },
  {
    id: "6",
    title: "Tutorial Platform",
    description:
      "An interactive learning platform with tutorials and hands-on exercises for various programming topics.",
    tags: ["Education", "Web", "Learning"],
    imageUrl: "/images/tutorial.jpg",
    demoUrl: "http://dipankar08.github.io/apps/learling/index.html",
  },
];

// ─── Research & Blog ────────────────────────────────────────────────────────

export const researchItems: ResearchItem[] = [
  {
    id: "r1",
    title: "Intrusion Detection Techniques for Virtual Domains",
    description:
      "Proposes an intrusion detection architecture for virtual domains that groups related VMs into a single network domain with a unified security policy. The architecture accounts for VM-specific features and domain security policies to handle diverse attack types, with detailed performance analysis.",
    date: "Dec 2012",
    venue: "IEEE HiPC 2012 — 19th International Conference on High Performance Computing",
    link: "http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=6507491&isnumber=6507469",
    tags: ["Security", "Virtualization", "Intrusion Detection"],
  },
  {
    id: "r2",
    title: "A Genetic Algorithm Approach to Cost-Based Multi-QoS Job Scheduling in Cloud Computing",
    description:
      "Presents a genetic algorithm approach to cost-based multi-QoS job scheduling in cloud environments. Uses crossover operators (PMX, OX, CX) and mutation operators to produce optimal schedules that map user jobs to resources while satisfying varying QoS requirements.",
    date: "",
    venue: "ACM Digital Library",
    link: "http://dl.acm.org/citation.cfm?id=1980111",
    tags: ["Cloud Computing", "Genetic Algorithm", "Scheduling"],
  },
];
