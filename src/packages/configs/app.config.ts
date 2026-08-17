export const appConfig = {
  baseUrl: "https://frenzz.xyz",
  brand: {
    name: "Frenzz",
    logo: "/logo.png",
    avatar: "/avatar_logo.png",
    handle: "@frenzzofficial",
    title: "Frenzz",
    description:
      "Frenzz is a platform connecting passionate developers, gamers, and creators — people who don't just work in tech and culture, they live it.",
  },

  nav: {
    links: [
      { label: "Ventures", href: "#ventures" },
      { label: "Stack", href: "#stack" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    actions: [
      { label: "Sign in", href: "#", variant: "destructive" as const },
      {
        label: "Start a project",
        href: "#contact",
        variant: "primary" as const,
      },
    ],
  },

  hero: {
    eyebrow: "MULTI-VENTURE DIGITAL ENGINEERING",
    title: ["Five ventures.", "One operating system."],
    accentWord: "operating system",
    subtitle:
      "Frenzz is a portfolio of digital ventures — engineering, esports, music, news, and content — all built and run by the same team, at the same standard.",
    ctas: [
      {
        label: "Start a project →",
        href: "#contact",
        variant: "primary" as const,
      },
      {
        label: "See what we build",
        href: "#ventures",
        variant: "secondary" as const,
      },
    ],
    tags: ["@FrenzzEsports", "@FrenzzX", "@sparkverse"],
  },

  techStack: [
    "TypeScript",
    "Next.js",
    "React",
    "Hono",
    "Bun",
    "Tailwind CSS",
    "Zod",
    "Node.js",
    "Axios",
    "vercel",
    "supabase",
    "redis",
  ],

  ventures: [
    {
      id: "web-ai-dev",
      index: "01",
      category: "ENGINEERING",
      title: "Web & AI Development",
      description:
        "Full-stack products, client engagements, and AI-driven tooling — from marketing sites to auth systems, built type-safe and production-grade.",
      handle: "github/@frenzzofficial",
      side: "left" as const,
    },
    {
      id: "esports",
      index: "02",
      category: "ESPORTS",
      title: "Esports",
      description:
        "Competitive gaming under the Frenzz banner — Valorant, CS2, and GTA RP, building a name through skill, consistency, and community.",
      handle: "@FrenzzEsports",
      side: "right" as const,
    },
    {
      id: "music",
      index: "03",
      category: "MUSIC",
      title: "Music",
      description:
        "Original sound and production under the Frenzz name — soundtracking streams, releases, and everything the brand touches.",
      handle: "@FrenzzX",
      side: "left" as const,
    },
    {
      id: "news",
      index: "04",
      category: "NEWS",
      title: "Tech & AI News",
      description:
        "Sparkverse covers what's moving in tech and AI — sharp, fast, and built for people who'd rather skim signal than noise.",
      handle: "@sparkverse",
      side: "right" as const,
    },
    {
      id: "content",
      index: "05",
      category: "CONTENT",
      title: "Content Creation",
      description:
        "Streaming and social presence as FrenzzBaby — building toward day-one GTA6 coverage and a growing creator ecosystem.",
      handle: "FrenzzBaby",
      side: "left" as const,
    },
  ],

  faq: [
    {
      id: "what",
      question: "What does Frenzz actually do?",
      answer:
        "Frenzz is a multi-venture group — we build web and AI products, compete in esports, produce music, publish tech and AI news through Sparkverse, and create content, all under one team.",
    },
    {
      id: "clients",
      question: "Do you take on client projects?",
      answer:
        "Yes. Web & AI Development is our client-facing venture — full-stack builds, dashboards, auth systems, and product design work, delivered to the same standard as our internal projects.",
    },
    {
      id: "stack",
      question: "What's your engineering stack?",
      answer:
        "TypeScript in strict mode, Next.js, React, Hono, Bun, Tailwind CSS, and Zod as the single source of validation truth across frontend and backend.",
    },
    {
      id: "follow",
      question: "How can I follow FrenzzEsports or FrenzzBaby?",
      answer:
        "FrenzzEsports covers our competitive Valorant, CS2, and GTA RP presence, while FrenzzBaby is the content and streaming side. Both are linked in the footer below.",
    },
    {
      id: "sparkverse",
      question: "What is Sparkverse?",
      answer:
        "Sparkverse is Frenzz's tech and AI news venture — fast, sharp coverage of what's shipping and what matters in the space.",
    },
    {
      id: "start",
      question: "How do I start a project with you?",
      answer:
        "Use the \"Start a project\" button anywhere on this page — tell us what you're building and we'll follow up with scope and timeline.",
    },
  ],

  footer: {
    blurb:
      "A multi-venture digital group spanning engineering, esports, music, news, and content — one team, five disciplines.",
    columns: [
      {
        title: "Ventures",
        links: [
          { label: "Web & AI Development", href: "#ventures" },
          { label: "Esports", href: "#ventures" },
          { label: "Music", href: "#ventures" },
          { label: "Tech & AI News", href: "#ventures" },
          { label: "Content Creation", href: "#ventures" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Stack", href: "#stack" },
          { label: "FAQ", href: "#faq" },
          { label: "Contact", href: "#contact" },
          { label: "Careers", href: "#" },
        ],
      },
      {
        title: "Social",
        links: [
          { label: "@FrenzzEsports", href: "#" },
          { label: "@FrenzzX", href: "#" },
          { label: "@sparkverse", href: "#" },
          { label: "FrenzzBaby", href: "#" },
        ],
      },
    ],
    legalLinks: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Status", href: "#" },
    ],
    copyright: "© 2026 FRENZZ — ALL RIGHTS RESERVED",
  },
} as const;

export type Venture = (typeof appConfig.ventures)[number];
export type FaqItem = (typeof appConfig.faq)[number];
