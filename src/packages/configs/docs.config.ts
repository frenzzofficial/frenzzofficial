import { getFilePath } from "../utils/get-file";

export const docsConfig = {
  key: "DOCS",
  title: "Docs",
  description: "Documentation",
  path: "docs",

  children: [
    {
      key: "AI-NEXTJS-PLAYBOOK",
      title: "AI Next.js Playbook",
      description: "AI Next.js Playbook - AI Integration & LLM Architecture",
      path: "ai-nextjs-playbook",
      file: getFilePath("/data/clients/ai-nextjs-playbook.md"),
    },

    {
      key: "NEXTJS-PERFORMANCE-PLAYBOOK",
      title: "Next.js Performance Playbook",
      description:
        "Next.js Performance Playbook - Next.js App Router, RSC & Performance Engineering",
      path: "nextjs-performance-playbook",
      file: getFilePath("/data/clients/nextjs-performance-playbook.md"),
    },

    {
      key: "SEO-OPTIMIZATION-PLAYBOOK",
      title: "SEO Optimization Playbook",
      description:
        "SEO Optimization Playbook - High-Performance Technical SEO & Optimization Suite",
      path: "seo-optimization-playbook",
      file: getFilePath("/data/clients/seo-optimization-suite.md"),
    },

    {
      key: "BAAS-SUPABASE-FIREBASE-PLAYBOOK",
      title: "BaaS Supabase/Firebase Playbook",
      description:
        "BaaS Supabase/Firebase Playbook - BaaS (Supabase/Firebase) vs. Custom Node.js",
      path: "baas-supabse-firebase",
      file: getFilePath("/data/clients/baas-supabse-firebase.md"),
    },

    {
      key: "AR-VTO-PLAYBOOK",
      title: "AR VTO Playbook",
      description: "AR VTO Playbook - VR/AR Filters & E-Commerce VTO",
      path: "ar-vto-playbook",
      file: getFilePath("/data/clients/ar-vto-playbook.md"),
    },
  ],
} as const;
