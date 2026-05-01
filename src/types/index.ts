import type { ReactNode } from "react";

export interface Profile {
  name: string;
  title: string;
  bio: ReactNode[];
  email: string;
  location: string;
  cvUrl?: string;
  avatarUrl: string;
}

export interface SocialLink {
  platform: "github" | "scholar" | "twitter" | "linkedin" | "facebook";
  url: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  demoUrl?: string;
  sourceUrl?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  date: string;
  venue?: string;
  link?: string;
  imageUrl?: string;
  tags: string[];
  authors?: string;
}
