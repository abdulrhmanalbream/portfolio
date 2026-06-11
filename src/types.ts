import { ReactNode } from "react";

// ========== PROJECT & PORTFOLIO TYPES ==========
export interface Project {
  id: string;
  title: string;
  category: string;
  status: "ACTIVE" | "STABLE" | "DEPRECATED" | "PROTOTYPE" | "IN DEVELOPMENT" | "COMPLETED";
  description: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
  link?: string;
  github?: string;
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  subValue: string;
  glowColor: "green" | "emerald";
  progressPercent: number;
  readouts: { label: string; value: string }[];
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: { name: string; status: string }[];
}

export interface TimelineLog {
  id: string;
  timestamp: string;
  event: string;
  category: string;
  details: string;
}

export interface CommandResponse {
  command: string;
  output: string | ReactNode;
  timestamp: string;
}

// ========== PAGE CONTENT TYPES ==========
export interface HeroContent {
  lines: string[];
  typingSpeed: number;
  deletingSpeed: number;
  pauseTime: number;
  cta: { label: string; href: string }[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url?: string;
  icon: ReactNode;
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
}

export interface FooterContent {
  copyright: string;
  buildInfo: string;
  techStack: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
}

export interface TerminalHelpText {
  intro: string;
  commands: TerminalCommand[];
  tip: string;
}

export interface PageMetadata {
  title: string;
  description: string;
}
