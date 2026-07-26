import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiTailwindcss,
  SiAngular,
  SiHtml5,
  SiDotnet,
  SiNodedotjs,
  SiFastapi,
  SiPython,
  SiSharp,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiGooglecloud,
  SiDocker,
  SiGit,
  SiGithub,
  SiPostman,
  SiOpencv,
  SiExpo,
} from "react-icons/si";
import { DiJava, DiDatabase } from "react-icons/di";
import { TbBrandOpenai, TbApi } from "react-icons/tb";

export const profile = {
  name: "Kchitiz Shukla",
  firstName: "Kchitiz",
  role: "Software Engineer",
  titles: [
    "production-ready web and mobile apps",
    "seamless cross-platform experiences",
    "high-performance Node.js APIs",
    "AI-powered automation workflows",
  ],
  tagline:
    "I build scalable web and mobile products end-to-end, from pixel-perfect React interfaces to high-throughput Node.js APIs.",
  location: "New Delhi, India",
  email: "kchitizshukla@gmail.com",
  phone: "+91 63892 27183",
  github: "https://github.com/kchitizshukla",
  linkedin: "https://linkedin.com/in/kchitiz-shukla",
  resume: "/Kchitiz-Shukla-Resume.pdf",
  avatar: "/images/kchitiz-shukla-portrait.jpeg",
  summary:
    "Results-driven Full-Stack Software Engineer with 1+ years of hands-on experience delivering scalable web and mobile applications using React.js, React Native, and .NET (ASP.NET Core), backed by SQL Server, PostgreSQL, and MongoDB. Shipped 10+ production screens and 2 enterprise applications within one year, including an in-house platform that cut software licensing costs by INR 85,000/month.",
  summarySecondary:
    "Proficient in RESTful API design, microservices architecture, CI/CD pipelines on GCP, and Agile/Scrum methodologies, with a demonstrated ability to collaborate across cross-functional teams and drive end-to-end SDLC delivery.",
};

export const stats = [
  { value: "1+", label: "Years of Experience" },
  { value: "30+", label: "Production Screens Shipped" },
  { value: "500+", label: "Users Served" },
  { value: "₹10.2L", label: "Annual Licensing Saved" },
];

export type SkillCategory = {
  id: string;
  title: string;
  blurb: string;
  skills: { name: string; level: number; icon: IconType }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Interfaces that stay fast, accessible and responsive at scale.",
    skills: [
      { name: "React.js", level: 92, icon: SiReact },
      { name: "Next.js", level: 85, icon: SiNextdotjs },
      { name: "TypeScript", level: 88, icon: SiTypescript },
      { name: "JavaScript (ES6+)", level: 92, icon: SiJavascript },
      { name: "Redux", level: 84, icon: SiRedux },
      { name: "Angular", level: 70, icon: SiAngular },
      { name: "Tailwind CSS", level: 88, icon: SiTailwindcss },
      { name: "HTML5 / CSS3", level: 94, icon: SiHtml5 },
    ],
  },
  {
    id: "backend",
    title: "Backend & Databases",
    blurb: "RESTful services, microservices and query-tuned data layers.",
    skills: [
      { name: ".NET / ASP.NET Core", level: 90, icon: SiDotnet },
      { name: "C#", level: 88, icon: SiSharp },
      { name: "Node.js", level: 80, icon: SiNodedotjs },
      { name: "FastAPI", level: 74, icon: SiFastapi },
      { name: "REST APIs & Microservices", level: 90, icon: TbApi },
      { name: "SQL Server", level: 88, icon: DiDatabase },
      { name: "PostgreSQL", level: 82, icon: SiPostgresql },
      { name: "MongoDB", level: 80, icon: SiMongodb },
      { name: "MySQL", level: 78, icon: SiMysql },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    blurb: "Cross-platform apps with offline support and real-time sync.",
    skills: [
      { name: "React Native", level: 92, icon: SiReact },
      { name: "Expo", level: 82, icon: SiExpo },
      { name: "Cross-Platform UI", level: 90, icon: SiReact },
      { name: "Offline & Realtime Sync", level: 82, icon: DiDatabase },
    ],
  },
  {
    id: "ai-tools",
    title: "AI, Cloud & Tools",
    blurb: "Automation, LLM integration and ship-it-safely pipelines.",
    skills: [
      { name: "Python", level: 85, icon: SiPython },
      { name: "Machine Learning / ETL", level: 78, icon: TbBrandOpenai },
      { name: "LLM Integration & AI Agents", level: 80, icon: TbBrandOpenai },
      { name: "OpenCV", level: 76, icon: SiOpencv },
      { name: "Google Cloud Platform", level: 76, icon: SiGooglecloud },
      { name: "Docker & CI/CD", level: 75, icon: SiDocker },
      { name: "Git / GitHub", level: 92, icon: SiGit },
      { name: "Postman", level: 88, icon: SiPostman },
      { name: "Java", level: 70, icon: DiJava },
      { name: "GitHub Actions", level: 74, icon: SiGithub },
    ],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "Vensysco Technologies",
    role: "Software Engineer",
    period: "Jul 2026 – Present",
    location: "Noida, Uttar Pradesh",
    current: true,
    points: [
      "Building a comprehensive Observer Management System (OMS) to streamline onboarding, registration, duty allocation and real-time tracking of observers for government examinations.",
    ],
    stack: ["React.js", ".NET", "SQL Server", "REST APIs"],
  },
  {
    company: "BlueKaktus",
    role: "Software Engineer",
    period: "Sep 2024 – Jun 2026",
    location: "New Delhi, India (On-Site)",
    points: [
      "Designed and deployed 10+ end-to-end web and mobile screens for order tracking and production management, reducing order-status lookup time by ~40%.",
      "Architected a real-time ledger management system processing 1,000+ daily transactions and cutting manual reconciliation effort by ~30%.",
      "Automated an ML-driven ETL workflow that standardized 500+ unstructured Excel files, slashing manual processing time by ~90%.",
      "Delivered a full-stack machine-maintenance application adopted by 20+ technicians, with unit testing and debugging to maintain low defect rates.",
      "Spearheaded an in-house ticketing and service-management platform for 50+ users, replacing JIRA and saving INR 85,000/month in licensing costs.",
    ],
    stack: [
      "React Native",
      "React.js",
      ".NET",
      "SQL Server",
      "PostgreSQL",
      "Python",
      "MongoDB",
    ],
  },
];

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  stack: string[];
  github?: string;
  live?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "FixMyRide",
    subtitle: "Cross-Platform Automotive Service Management System",
    description:
      "A cross-platform application with two role-based modules, customer and mechanic, featuring real-time tracking, service booking and analytics dashboards across 15+ screens.",
    highlights: [
      "End-to-end workflows for vehicle management, job assignments and inspections",
      "Payments and invoicing pipeline with responsive, optimized UI",
      "15+ screens across two role-based modules",
    ],
    stack: ["React Native", "Next.js", "TypeScript", "REST APIs"],
    github: "https://github.com/kchitizshukla",
    accent: "#00f0ff",
  },
  {
    title: "Facial Recognition Security",
    subtitle: "Real-Time Identification & Alerting System",
    description:
      "A real-time facial recognition system achieving ~95% identification accuracy on live camera feeds, with automated alerting and third-party camera integration.",
    highlights: [
      "~95% identification accuracy on live feeds",
      "Automated alerting pipeline for unrecognized faces",
      "Third-party IP camera integration",
    ],
    stack: ["Python", "OpenCV", "face_recognition"],
    github: "https://github.com/kchitizshukla",
    accent: "#7c5cff",
  },
  {
    title: "In-House Service Desk",
    subtitle: "Ticketing & Service Management Platform",
    description:
      "A full-stack ticketing and service-management platform built for 50+ internal users that replaced JIRA entirely and saved INR 85,000/month in licensing costs.",
    highlights: [
      "Replaced a paid SaaS tool across the organisation",
      "Role-based ticket routing, SLAs and audit trails",
      "₹10.2 lakh saved annually",
    ],
    stack: ["React Native", ".NET", "PostgreSQL"],
    accent: "#00ffa3",
  },
  {
    title: "Real-Time Ledger System",
    subtitle: "Financial Reconciliation at Scale",
    description:
      "A real-time ledger management system processing 1,000+ daily transactions, cutting manual reconciliation effort by ~30% through automated matching.",
    highlights: [
      "1,000+ transactions processed daily",
      "~30% reduction in manual reconciliation",
      "Optimized stored procedures and indexed queries",
    ],
    stack: ["React.js", ".NET", "SQL Server"],
    accent: "#00f0ff",
  },
  {
    title: "ML-Driven ETL Automation",
    subtitle: "Unstructured Data Standardization",
    description:
      "An ML-powered ETL workflow that standardized 500+ unstructured Excel files into a clean schema, reducing manual processing time by ~90%.",
    highlights: [
      "500+ unstructured files normalized",
      "~90% reduction in manual processing time",
      "Deployed to production client pipelines",
    ],
    stack: ["Python", "MongoDB", "Machine Learning"],
    accent: "#ff5cf0",
  },
  {
    title: "Machine Maintenance App",
    subtitle: "Shop-Floor Operations Tooling",
    description:
      "A full-stack machine-maintenance application adopted by 20+ technicians, covering breakdown logging, scheduled servicing and downtime analytics.",
    highlights: [
      "Adopted by 20+ shop-floor technicians",
      "Unit-tested modules with low defect rates",
      "Offline-first mobile capture",
    ],
    stack: ["React Native", ".NET", "SQL Server"],
    accent: "#7c5cff",
  },
];

export const education = [
  {
    degree: "B.Tech, Artificial Intelligence and Data Science",
    institute: "VIPS-TC (GGSIPU), New Delhi",
    period: "Aug 2021 – Jun 2025",
    score: "CGPA: 8.3 / 10.0",
  },
  {
    degree: "Class XII (ICSE)",
    institute: "Boys' High School and College, Prayagraj",
    period: "2019 – 2020",
    score: "Score: 91%",
  },
];

export const achievements = [
  "Saved INR 85,000/month (~INR 10.2 lakh/year) in licensing by replacing JIRA with a custom in-house service-management platform.",
  "Reduced manual Excel processing time by ~90% across multiple client pipelines through an AI/ML-driven ETL automation workflow.",
  "Shipped 10+ production screens and 2 full-stack enterprise applications within the first year, consistently meeting sprint deadlines.",
  "Optimized 20+ RESTful APIs and SQL Server stored procedures, improving response times by up to 40%.",
  "Delivered cross-platform features used by 500+ users with secure authentication, offline support and real-time data sync.",
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
