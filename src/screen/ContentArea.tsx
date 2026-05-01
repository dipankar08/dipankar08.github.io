import { useRef, useState, useEffect, useCallback } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { profile, newsItems, projects, researchItems } from "../data/data";
import NewsItem from "./NewsItem";
import ProjectCardItem from "./ProjectCardItem";
import ResearchCardItem from "./ResearchCardItem";

export default function ContentArea() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -220 : 220,
      behavior: "smooth",
    });
  };

  return (
    <main className="flex-1 min-h-screen overflow-y-auto py-14 pr-8">
      {/* Hero */}
      <section className="mb-14">
        <h1 className="text-[36px] font-medium text-[#222] mb-5 leading-tight">
          {profile.name}
        </h1>
        {profile.bio.map((paragraph, i) => (
          <p key={i} className="text-[15px] text-[#555] leading-[1.7] mb-4">
            {paragraph}
          </p>
        ))}
      </section>

      {/* News */}
      <section className="mb-14">
        <h2 className="text-[28px] font-medium text-[#222] mb-5">News</h2>
        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[#555] hover:text-[#222] cursor-pointer"
            >
              <HiChevronLeft size={20} />
            </button>
          )}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {newsItems.map((item) => (
              <NewsItem key={item.id} item={item} />
            ))}
          </div>
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[#555] hover:text-[#222] cursor-pointer"
            >
              <HiChevronRight size={20} />
            </button>
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-14">
        <h2 className="text-[28px] font-medium text-[#222] mb-5">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <ProjectCardItem key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Research & Blog */}
      <section className="mb-14">
        <h2 className="text-[28px] font-medium text-[#222] mb-5">
          Research & Blog
        </h2>
        <div className="flex flex-col gap-4">
          {researchItems.map((item) => (
            <ResearchCardItem key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
