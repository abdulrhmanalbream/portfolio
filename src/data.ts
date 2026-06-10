import { 
  Project, 
  Metric, 
  SkillCategory, 
  TimelineLog,
  HeroContent,
  NavItem,
  SocialLink,
  ContactInfo,
  FooterContent,
  TerminalHelpText,
  TerminalCommand
} from "./types";

export const HERO_CONTENT = {
  lines: [
    "Hi, I'm Abdulrahman Alburaym.",
    "CS Student & AI Developer.",
    "Building intelligent systems."
  ],
  opportunityBanner: "Open to research collaborations and software development opportunities.",
  typingSpeed: 50,
  deletingSpeed: 30,
  pauseTime: 2500,
  cta: [
    { label: "[VIEW PROJECTS]", href: "#projects" },
    { label: "[OPEN TERMINAL]", href: "#terminal" }
  ]
};

export const EDUCATION = {
  degree: "Bachelor of Computer Science",
  university: "Islamic University of Madinah",
  graduation: "Expected Graduation: 2027",

  interests: [
    "Digital Transformation",
    "Artificial Intelligence",
    "Data Science",
    "Software Engineering",
    "Cybersecurity",
    "Cloud Computing",
    "Quantum Computing"
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "basira",
    title: "Basira",

    category:
      "ANDROID DIGITAL WELLBEING PLATFORM",

    status: "COMPLETED",

    description:
      "An Android digital wellbeing platform designed to help users reduce excessive screen usage and build healthier digital habits. The system monitors application usage, provides behavioral insights, and applies intelligent intervention mechanisms while maintaining minimal resource consumption.",

    tech: [
      "Kotlin",
      "Android",
      "Jetpack Compose",
      "Room Database",
      "WorkManager"
    ]
  },
  {
    id: "smart-software",

    title: "SmartSoftware",

    category:
      "AI AGENT WORKFLOW PLATFORM",

    status: "IN DEVELOPMENT",

    description:
      "An AI-powered software management platform that assists development teams in planning sprints, assigning tasks, estimating workloads, and identifying potential bottlenecks using intelligent agent workflows.",

    tech: [
      "React",
      "TypeScript",
      "PostgreSQL",
      "LangChain",
      "Express"
    ]
  },  
  {
    id: "ai-books-library",

    title: "AI Books Library",

    category:
      "SEMANTIC SEARCH & KNOWLEDGE RETRIEVAL",

    status: "PROTOTYPE",

    description:
      "A semantic search engine for academic books that combines vector embeddings and large language models to enable natural-language exploration across educational resources and large collections of learning materials.",

    tech: [
      "React",
      "FastAPI",
      "Python",
      "Gemini API",
      "ChromaDB"
    ]
  },
  {
    id: "tebyan",

    title: "Tebyan",

    category:
      "AI KNOWLEDGE GRAPH PLATFORM",

    status: "PROTOTYPE",

    description:
      "An AI-powered learning platform that transforms books, PDFs, and study materials into interactive knowledge graphs and mind maps, helping learners understand relationships between concepts rather than memorizing isolated information.",

    tech: [
      "Next.js",
      "TypeScript",
      "D3.js",
      "Node.js",
      "Gemini"
    ]
  }

];

export const METRICS: Metric[] = [
  {
    id: "HEALTHCARE_SERVING",
    label: "Al-Madinah Care Integration",
    value: "400+",
    subValue: "ACTIVE CLINICS & USER PROFILES",
    glowColor: "green",
    progressPercent: 88,
    readouts: [
      { label: "SYS_STABILITY", value: "99.98%" },
      { label: "DB_TRANSACTIONS", value: "Secure SSL" }
    ]
  },
  {
    id: "MEDIA_IMPRESSIONS",
    label: "Sadat Al-Mabani Platform",
    value: "1M+",
    subValue: "CONSTRUCTION ESTIMATIONS & IMPRESSIONS",
    glowColor: "emerald",
    progressPercent: 95,
    readouts: [
      { label: "COMPLETED_MODULES", value: "14/14" },
      { label: "REGIONAL_TRAFFIC", value: "High Intensity" }
    ]
  },
  {
    id: "ANDROID_WELLBEING",
    label: "Basira App (Digital Well-being)",
    value: "< 100MB",
    subValue: "ANDROID WELLBEING SYSTEM",
    glowColor: "green",
    progressPercent: 90,
    readouts: [
      { label: "SCREEN_MONITORING", value: "Live Refract" },
      { label: "BACKGROUND_EFFICIENCY", value: "Minimal Impact" }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "ai-data",
    categoryName: "AI / DATA",
    skills: [
      { name: "Machine Learning", status: "ACTIVE" },
      { name: "Data Science", status: "ACTIVE" },
      { name: "NLP & Semantic Search", status: "ACTIVE" },
      { name: "RAG Systems", status: "ACTIVE" },
      { name: "Knowledge Graphs", status: "ACTIVE" },
      { name: "Prompt Engineering", status: "ACTIVE" }
    ]
  },

  {
    id: "engineering",
    categoryName: "ENGINEERING",
    skills: [
      { name: "React & Next.js", status: "ACTIVE" },
      { name: "Python & FastAPI", status: "ACTIVE" },
      { name: "Node.js & Express", status: "ACTIVE" },
      { name: "PostgreSQL & MongoDB", status: "ACTIVE" },
      { name: "REST APIs", status: "ACTIVE" },
      { name: "Software Architecture", status: "ACTIVE" }
    ]
  },

  {
    id: "tools",
    categoryName: "TOOLS",
    skills: [
      { name: "Git & GitHub", status: "ACTIVE" },
      { name: "Docker", status: "ACTIVE" },
      { name: "Linux", status: "ACTIVE" },
      { name: "VS Code", status: "ACTIVE" },
      { name: "Figma", status: "ACTIVE" },
      { name: "AWS & Firebase", status: "ACTIVE" }
    ]
  }
];

export const TIMELINE_LOGS: TimelineLog[] = [
  {
    id: "kaust-intro-ai",
    timestamp: "2024-01-15",
    event: "KAUST INTRODUCTION TO AI PROGRAM",
    category: "EDUCATION",
    details:
      "Started my journey in Artificial Intelligence through KAUST's Introduction to AI Program, gaining foundational knowledge in machine learning and modern AI systems."
  },

  {
    id: "kaust-advanced-ai",
    timestamp: "2024-02-20",
    event: "KAUST ADVANCED AI PROGRAM",
    category: "EDUCATION",
    details:
      "Completed advanced AI training focused on machine learning concepts, practical AI applications, and problem-solving using intelligent systems."
  },

  {
    id: "satr-ai-ds",
    timestamp: "2024-05-10",
    event: "AI & DATA SCIENCE TRACK",
    category: "EDUCATION",
    details:
      "Completed the Artificial Intelligence and Data Science learning track on SATR Platform, covering data analysis, machine learning, and applied AI concepts."
  },

  {
    id: "kaggle-learning",
    timestamp: "2024-07-01",
    event: "KAGGLE COMPETITIONS & DATA SCIENCE",
    category: "COMPETITION",
    details:
      "Participated in multiple Kaggle competitions to strengthen practical machine learning and data science skills. Achieved rank 97 among more than 1,200 participants in a competitive challenge."
  },

  {
    id: "ai-center",
    timestamp: "2025-01-20",
    event: "AI CENTER & AI CLUB CONTRIBUTIONS",
    category: "LEADERSHIP",
    details:
      "Joined the Artificial Intelligence Center and AI Club. Organized multiple technical events attended by over 50 students and contributed to planning educational workshops, training programs, and technical initiatives."
  },

  {
    id: "maharati-chatbot",
    timestamp: "2025-02-15",
    event: "MAHARATI CLUB CHATBOT",
    category: "DEVELOPMENT",
    details:
      "Developed an informational chatbot for Maharati Club to provide students with easy access to club information, events, and resources."
  },

  {
    id: "housing-system",
    timestamp: "2025-03-15",
    event: "HOUSING MANAGEMENT SYSTEM",
    category: "FULLSTACK",
    details:
      "Worked as a Full-Stack Developer with Al-Madinah Student Care Association. Built a housing management system serving more than 400 users for student housing allocation and data management."
  },

  {
    id: "mining-hackathon",
    timestamp: "2025-10-12",
    event: "FUTURE MINERALS HACKATHON",
    category: "HACKATHON",
    details:
      "Participated in the Future Minerals Hackathon. Developed an AI-based predictive maintenance concept capable of forecasting equipment failures and reducing excessive operational stress in mining environments."
  },

  {
    id: "sadat-almabani",
    timestamp: "2025-10-25",
    event: "SADAT AL-MABANI DIGITAL TRANSFORMATION",
    category: "FREELANCE",
    details:
      "Developed the company's digital presence, website, and Google Business Profile. Contributed to generating more than 1 million impressions and over 60,000 clicks within four months."
  },

  {
    id: "smartsoftware",
    timestamp: "2025-11-10",
    event: "SMARTSOFTWARE PLATFORM",
    category: "PRODUCT",
    details:
      "Started building SmartSoftware after conducting interviews with business owners, managers, employees, designers, and clients. Designed the platform to bridge communication and workflow gaps between organizations, teams, and customers."
  },

  {
    id: "basira-release",
    timestamp: "2025-12-15",
    event: "BASIRA APP RELEASE",
    category: "DEPLOYMENT",
    details:
      "Released Basira, an Android digital wellbeing platform focused on helping users reduce unhealthy screen habits through intelligent monitoring, interventions, and behavioral insights."
  },

  {
    id: "tebyan-start",
    timestamp: "2026-01-10",
    event: "TEBYAN PLATFORM DEVELOPMENT",
    category: "AI SYSTEM",
    details:
      "Started developing Tebyan, an AI-powered educational platform combining knowledge graphs, mind maps, semantic search, and intelligent learning assistance to improve knowledge acquisition."
  },

  {
    id: "mena-ml",
    timestamp: "2026-01-25",
    event: "MENA MACHINE LEARNING PROGRAM",
    category: "RESEARCH",
    details:
      "Selected as one of approximately 350 participants from more than 1,200 applicants in the MENA Machine Learning Program. Presented SmartSoftware and received valuable feedback from researchers and AI professionals."
  },

  {
    id: "current-status",
    timestamp: "CURRENT__TIME",
    event: "AI, SOFTWARE ENGINEERING & DIGITAL TRANSFORMATION",
    category: "CURRENT",
    details:
      "Currently focused on building intelligent software systems that combine Artificial Intelligence, Data Science, Software Engineering, and Digital Transformation to solve real-world problems."
  }
];
// ========== PAGE CONTENT ==========

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'INIT' },
  { id: 'terminal', label: 'SHELL' },
  { id: 'projects', label: 'DATA' },
  { id: 'metrics', label: 'PERF' },
  { id: 'skills', label: 'PROTO' },
  { id: 'timeline', label: 'LOG' },
  { id: 'contact', label: 'TX' }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GITHUB',
    url: 'https://github.com/albrymbdalrhmn',
    icon: null // Will be rendered as SVG in component
  },
  {
    name: 'LINKEDIN',
    url: 'https://linkedin.com/in/abdulrahman-alburaym/',
    icon: null
  },
  {
    name: 'EMAIL',
    url: 'mailto:albrymbdalrhmn477@gmail.com',
    icon: null
  }
];

export const CONTACT_INFO: ContactInfo = {
  email: 'albrymbdalrhmn477@gmail.com',
  github: 'https://github.com/albrymbdalrhmn',
  linkedin: 'https://linkedin.com/in/abdulrahman-alburaym/'
};

export const FOOTER_CONTENT: FooterContent = {
  copyright: `Abdulrahman Alburaym — ${new Date().getFullYear()}`,
  buildInfo: `dev`,
  techStack: `react + tailwind + framer-motion`
};

export const TERMINAL_HELP: TerminalHelpText = {
  intro: "AVAILABLE SYSTEM PROTOCOLS:",
  commands: [
    { command: "about", description: "Personal profile & background" },
    { command: "education", description: "Academic information" },
    { command: "certifications", description: "Professional achievements" },
    { command: "projects", description: "Project portfolio" },
    { command: "skills", description: "Technical competencies" },
    { command: "timeline", description: "Development journey" },
    { command: "contact", description: "Contact information" },
    { command: "ping", description: "Test gateway latency" },
    { command: "clear", description: "Flush terminal logs" }
  ],
  tip: "Tip: Use commands above or click the shortcut buttons."
};

export const TERMINAL_CONTENT = {
  bootMessage: {
    line1: "SECURE TERMINAL TERMINIUS v4.0.9 ACTIVE...",
    line2: "INITIALIZED: TUE JUN 09 2026 || ALBURAYM_CORE_ONLINE",
    line3: "Welcome, reviewer. This terminal parses secure logs from Abdulrahman's credentials vault. Type help below or click the protocols shortcuts to query data modules."
  },
  about: {
    operative: "ABDULRAHMAN ALBURAYM",
    classification: "Computer Science Student | Islamic University of Madinah",
    specialization: "Artificial Intelligence, Data Science, Software Engineering, and Digital Transformation",
    ethos: "Computer Science student at the Islamic University of Madinah with a strong interest in Artificial Intelligence, Data Science, Software Engineering, and Digital Transformation. I enjoy building intelligent systems that combine AI technologies with practical software solutions. My work focuses on semantic search, educational technology, AI-powered learning systems, knowledge representation, and modern full-stack development."
  },
  education: {
    degree: "Bachelor of Computer Science",
    university: "Islamic University of Madinah",
    graduation: "Expected Graduation: 2027",
    interests: "Digital Transformation, Artificial Intelligence, Data Science, Software Engineering, Cybersecurity, Cloud Computing"
  },
  certifications: {
    intro: "Professional achievements and certifications:",
    items: [
      "AI & Machine Learning Fundamentals",
      "Full-Stack Web Development",
      "Cloud Architecture & Deployment",
      "Data Science & Analytics"
    ]
  },
  projectsLabel: "RETRIEVED DATA MODULES (PROJECTS):",
  metricsLabel: "PERFORMANCE INDICATOR REGISTERS:",
  skillsLabel: "OPERATIONAL ENVIRONMENT SKILLS SUITE:",
  timelineLabel: "SYSTEM CHRONOLOGICAL OPERATIONS LOG:",
  contactLabel: "ESTABLISHING SECURE PORTAL CHANNEL...",
  contactMessage: "Send secure transmission packet via the form below or standard routing protocols:",
  contactDetails: {
    email: "albrymbdalrhmn477@gmail.com",
    github: "https://github.com/albrymbdalrhmn",
    linkedin: "https://linkedin.com/in/abdulrahman-alburaym/"
  },
  pingMessage: {
    header: "PING gateway.alburaym.dev (1.1.1.1) 56(84) bytes of data.",
    packetFormat: "64 bytes from 1.1.1.1: icmp_seq={{seq}} ttl=56 time={{time}} ms",
    stats: "--- alburaym.dev ping statistics ---"
  }
};
