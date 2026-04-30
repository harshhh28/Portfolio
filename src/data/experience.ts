import type { Experience } from "@/types";

export const EXPERIENCE: Experience[] = [
  {
    id: "hidevs-2026",
    title: "Software Engineer (AI) Intern",
    organization: "HiDevs",
    organizationUrl: "https://hidevs.xyz",
    duration: "Jan 2026 - Present",
    location: "San Francisco, CA (Remote)",
    description:
      "Driving backend development on Node.js and MongoDB for a production platform serving 4,000+ users on GCP, scaling core systems with indexing, query optimization, and multi-layer caching to reduce API latency from 4–5s to ~40–50ms. Built end-to-end competition lifecycle systems, AI-powered evaluation pipelines, and a GenAI-based natural language admin interface reducing query time to <10s. Developed analytics dashboards, automated email workflows, and user lifecycle systems, while improving reliability through Docker and CI/CD, and integrating AI tools for learning and discovery.",
  },
  {
    id: "aden-2026",
    title: "Open Source Contributor",
    organization: "Aden (YC W20)",
    organizationUrl: "https://adenhq.com",
    duration: "Mar 2026 - Apr 2026",
    location: "Remote",
    description:
      "Contributed to Aden's Hive, a full Freshdesk integration for their MCP tools platform. 17 tools, a credential system, centralized HTTP handling, explicit error mapping, and 90+ tests. The focus was production-readiness: not just making API calls work, but making them reliable, observable, and safe to fail.",
    links: [
      {
        label: "aden-hive/hive #6099",
        url: "https://github.com/aden-hive/hive/pull/6099",
      },
    ],
  },
  {
    id: "hidevs-2025",
    title: "Software Engineer Intern",
    organization: "HiDevs",
    organizationUrl: "https://hidevs.xyz",
    duration: "Mar 2025 - Jun 2025",
    location: "San Francisco, CA (Remote)",
    description:
      "Designed and deployed scalable Node.js APIs with MongoDB and AWS for 2.5k+ users, reducing latency by 30%, while building React and Next.js dashboards and mentoring Engineers to drive an 80% increase in user engagement.",
  },
  {
    id: "irlab",
    title: "Software Engineer (Freelance)",
    organization: "IR Lab, DA-IICT",
    organizationUrl: "https://irlab.daiict.ac.in",
    duration: "May 2025 - Jul 2025",
    location: "Gandhinagar, India",
    description:
      "Built a full-stack machine translation evaluation platform using React, Vite, and Supabase, designing secure REST APIs, PostgreSQL-backed dashboards, and cloud deployment to support BLEU and NLP metric analysis in collaboration with IR researchers.",
  },
];
