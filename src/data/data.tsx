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
    id: "1b",
    title: "Founding Member — Portal for Workplace",
    description:
      "As a founding member of the Portal team starting with just 6 engineers, helped architect and ship Facebook Portal from the ground up. In Oct 2019, Portal expanded into the enterprise with Portal for Workplace — a smart video-calling device reimagined for business. It brought one-touch video conferencing, Workplace contacts and group integration, smart camera tracking, and centralized IT management to offices worldwide.",
    date: "Oct 2019",
    imageUrl: "/images/portal_workplace.png",
    link: "https://www.engadget.com/2019-10-08-facebook-portal-workplace.html",
  },
  {
    id: "1",
    title: "Joining Facebook London",
    description:
      "After 3.5 years at Microsoft, Dipankar interviewed through Facebook's APAC loop in Singapore and received an offer for the MPK office in the US. When the H-1B lottery didn't come through, Facebook relocated him to their London office instead. In 2017, Facebook London was still a small team of around 200 people, working out of a three-floor building on Brock Street. What started as a plan B turned into the beginning of an 8+ year journey — shipping Portal, Meta RTC, Horizon, and Meta AI.",
    date: "Jul 2017",
    imageUrl: "/images/facebook.png",
    link: "https://about.meta.com/",
  },
  {
    id: "3",
    title: "Shipped Office for Android — Project K2",
    description:
      "Worked with Microsoft's Core Experience Engineering team out of Hyderabad to ship Office for Android. Built the cross-app threading model, dispatch queue, and multi-threading architecture in the shared Office C++ codebase. The project, internally codenamed K2, landed in 9 months — enabling Word, Excel, and PowerPoint to run natively on Android with a unified, high-performance runtime.",
    date: "2015",
    imageUrl: "/images/office.png",
    link: "https://www.youtube.com/watch?v=untLDcPPdsw",
  },
  {
    id: "6",
    title: "DST, India Govt. sponsored my Research Internship in Macquarie University, Australia",
    description:
      "In the final year of his Master's at IIT Roorkee, Dipankar secured a joint research opportunity with Macquarie University, Sydney in collaboration with IIT Roorkee's CS division. The Department of Science and Technology (DST), Government of India, sponsored the programme — covering travel and visa expenses through a DST grant. Dipankar joined Macquarie University as a Visiting Research Scholar for 4 months to continue his research work. The extended stay meant he had to defer his joining at Citrix Systems by a month due to the delayed submission of his Master's thesis.",
    date: "2011",
    imageUrl: "/images/mq-uni.png",
    link: "https://www.mq.edu.au/",
  },
  {
    id: "4",
    title: "M.Tech CS from IIT Roorkee",
    description:
      "Graduated with a Master of Technology in Computer Science from the Indian Institute of Technology, Roorkee — one of India's premier engineering institutions. Research focused on cloud computing and network security, with publications at IEEE HiPC and ACM. The rigorous curriculum and research culture at IIT Roorkee laid the foundation for a career in building large-scale software systems at top technology companies.",
    date: "2009 – 2011",
    imageUrl: "/images/iitr.png",
    link: "https://www.iitr.ac.in/",
  },
  {
    id: "5",
    title: "Joining IIT Roorkee — Declining an PhD offer from IIT Kharagpur",
    description:
      "In 2009, Dipankar secured an All India GATE Rank of 284 in Computer Science and topped the written entrance test conducted by IIT Roorkee, earning admission to the M.Tech program. He also held an offer from the Indian Statistical Institute (ISI), Kolkata for a Master's in Computer Science after clearing their notoriously tough interview rounds. Shortly after joining IIT Roorkee, an Integrated PhD offer in Computer Science arrived from IIT Kharagpur — but by then he had already settled into IITR. He declined the PhD and chose to continue his Master's at Roorkee, a decision that set the course for a career in industry rather than academia.",
    date: "Jul 2009",
    imageUrl: "/images/phd-offer.png",
    link: "https://www.iitr.ac.in/",
  },
  {
    id: "7",
    title: "Rejected by Wipro — A Blessing in Disguise",
    description:
      "In his 3rd year of college, Dipankar faced a campus placement interview with Wipro that didn't go as planned. The technical round was scheduled at 9 PM, and the conversation turned into a heated disagreement over the implementation of Quick Sort. The conflict with the interviewer led to a rejection — despite Dipankar being the topper of his batch at HIT in 2009. He held an offer from TCS but ultimately chose a different path altogether, joining IIT Roorkee for a Master's in Computer Science. What felt like a setback turned out to be the turning point that led to IIT Roorkee, and eventually to Amazon, Microsoft, and Meta.",
    date: "2009",
    imageUrl: "/images/rejection-wipro.png",
    link: "https://www.iitr.ac.in/",
  },
];

// ─── Projects ───────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "3",
    title: "SkyFrame Analytics",
    description:
      "Advanced crack detection for high-rise buildings and structures using drones and AI. SkyFrame eliminates the need for dangerous manual inspections — drones equipped with high-resolution optical zoom cameras (up to 45x) capture fine surface detail from a safe distance, detecting hairline cracks, spalling, and structural anomalies with exceptional clarity.\n\nThe AI-powered analysis pipeline processes drone imagery to detect and measure cracks with high accuracy, delivering comprehensive reports with maintenance recommendations within 7 days. Clients typically see a 30–70% reduction in inspection costs compared to conventional methods, with a 4-step workflow: consultation, drone inspection, AI analysis, and detailed reporting.\n\nOperating across Florida and the wider US, SkyFrame is built on SimpleStore Cloud. In-house drone engineers capture imagery that is processed by an advanced neural network to detect cracks across thousands of images. Contact the sales team via the website to get started.",
    tags: ["AI", "Drones", "Computer Vision", "SaaS"],
    imageUrl: "/images/skyframe.png",
    demoUrl: "https://skyframeanalytics.com/",
  },
  {
    id: "2",
    title: "SimpleStore Cloud Infra",
    description:
      "SimpleStore Cloud Infra is a common backend built on a proprietary codebase that allows you to build serverless clients without reimplementing the backend. It is a highly efficient client-backend infrastructure written in a combination of Node.js and Go — initially built in Python/Django in 2014, rewritten in Node.js/Express in 2020, and rewritten again in Go in 2023.\n\nRunning on a single AWS t2.micro instance (1 vCPU, 1 GB RAM), it handles ~3,000 requests per second with sub-50ms p95 latency, sustaining 5–10 million API calls per day. The architecture focuses on reliability, extensibility, and minimizing infrastructure cost — running production-grade workloads at under $5/month on AWS free-tier eligible instances.",
    tags: ["Go", "Node.js", "AWS", "Backend"],
    imageUrl: "/images/simplestore.png",
    demoUrl: "https://admin.grodok.com/",
  },
  {
    id: "1",
    title: "FM Radio",
    description:
      "Best Bengali FM Radio is an Android app built natively on Android that allows users to play internet radio in 10+ languages across India. Built around mid-2014 when radio was at its peak popularity, it was supported by a community of 3,000 active members, reached 50K+ downloads with a 4.5+ Play Store rating, and streamed over 1 million minutes every single day.\n\nThe app was powered by the SimpleStore infrastructure, which included a proprietary ranking algorithm and a lightweight recommendation system. Initially a free project, it was later supported by ad revenue. However, the ROI of the pet project was not sufficient to sustain it, and the decision was made to sunset the project in mid-2020.",
    tags: ["Android", "Java", "Mobile"],
    imageUrl: "/images/radio.png",
    demoUrl:
      "https://play.google.com/store/apps/details?id=in.peerreview.fmradioindia",
  },
];

// ─── Research & Blog ────────────────────────────────────────────────────────

export const researchItems: ResearchItem[] = [
  {
    id: "r0",
    title: "Achieving Secure Role-based Access Control on Encrypted Data in Cloud Storage",
    description:
      "Developed a system that implements the proposed RBE scheme, which allows the owner to store data in an encrypted form in the cloud and grant access to data for users with specific roles. Developed an administration interface for the system and conducted performance analysis of the role management, encryption and decryption operations in the implemented system.",
    date: "2012",
    venue: "IEEE Transactions on Parallel and Distributed Systems (TPDS-2012-12-1229)",
    link: "",
    tags: ["Cloud Security", "Access Control", "Encryption", "RBAC"],
    authors: "Lan Zhou, Vijay Varadharajan, Michael Hitchens, Dipankar Dutta",
  },
  {
    id: "r1",
    title: "Intrusion Detection Techniques for Virtual Domains",
    description:
      "Proposes an intrusion detection architecture for virtual domains that groups related VMs into a single network domain with a unified security policy. The architecture accounts for VM-specific features and domain security policies to handle diverse attack types, with detailed performance analysis.",
    date: "Dec 2012",
    venue: "IEEE HiPC 2012 — 19th Annual International Conference on High Performance Computing, Le Meridien Hotel, Pune, India",
    link: "http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=6507491&isnumber=6507469",
    tags: ["Security", "Virtualization", "Intrusion Detection"],
    authors: "Udaya Tupakula, Vijay Varadharajan, Dipankar Dutta",
  },
  {
    id: "r2",
    title: "A Genetic Algorithm Approach to Cost-Based Multi-QoS Job Scheduling in Cloud Computing Environment",
    description:
      "Presents a genetic algorithm approach to cost-based multi-QoS job scheduling in cloud environments. Uses crossover operators (PMX, OX, CX) and mutation operators to produce optimal schedules that map user jobs to resources while satisfying varying QoS requirements.",
    date: "Feb 2011",
    venue: "ICWET'11, February 25–26, 2011",
    link: "http://portal.acm.org/citation.cfm?id=1980111",
    tags: ["Cloud Computing", "Genetic Algorithm", "Scheduling"],
    authors: "Dipankar Dutta, R. C. Joshi",
  },
  {
    id: "r2b",
    title: "A Genetic Algorithm Approach to Job Scheduling in Cloud Computing Environment",
    description:
      "Proposed a framework for applying genetic algorithms to job scheduling in cloud computing environments, addressing resource allocation and optimization challenges.",
    date: "Nov 2010",
    venue: "19th Annual Symposium, IEEE Bangalore Section, 17th November 2010",
    link: "",
    tags: ["Cloud Computing", "Genetic Algorithm", "Scheduling"],
    authors: "Dipankar Dutta, R. C. Joshi",
  },
  {
    id: "r3",
    title: "Techniques for Optimized Node Placement in Multihop Lightwave Based De Bruijn Graph Network",
    description:
      "Presents techniques for optimized node placement in multihop lightwave networks based on De Bruijn graph topology. The paper explores efficient strategies for placing nodes to minimize hop count and maximize throughput in optical networks, addressing key challenges in large-scale lightwave network design.",
    date: "Aug 2009",
    venue: "PITM Journal of Research, Vol. 2, No. 1, pp. 36–41",
    tags: ["Optical Networks", "Graph Theory", "Network Optimization"],
    authors: "Tarun Kumar Ghosh, Dipankar Dutta, S. M. Hossein",
  },
  {
    id: "r4",
    title: "Rainfall Prediction Algorithm Using Back Propagation Neural Network Approach",
    description:
      "Adopted Artificial Neural Network as a soft computing technique to anticipate average monsoon rainfall. Designed a back propagation neural network that can learn rainfall statistics and predict future rainfall status, addressing the complexity inherent in atmospheric parameters.",
    date: "2010",
    venue: "Geomatics Dept, Indian Institute of Technology, Roorkee, India",
    link: "",
    tags: ["Neural Networks", "Machine Learning", "Back Propagation", "Prediction"],
    authors: "Dipankar Dutta",
  },
  {
    id: "r5",
    title: "GA & Neural Network Approach to Implement SCT Without System Parameter Restriction and Controller for Continuous Time System",
    description:
      "Achieved dead-beat response in time-invariant control systems by injecting a suitable pulse at a suitable time using genetic algorithm and neural network approaches. Compared the performance between both approaches for achieving compensated response without overshoot.",
    date: "2009",
    venue: "Computer Science Dept, Haldia Institute of Technology, Haldia, WB, India",
    link: "",
    tags: ["Genetic Algorithm", "Neural Networks", "Control Systems", "SCT"],
    authors: "Dipankar Dutta",
  },
];
