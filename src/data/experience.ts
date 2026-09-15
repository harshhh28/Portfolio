import type { Experience } from "@/types";

export const EXPERIENCE: Experience[] = [
  {
    id: "unifyapps-2026",
    title: "Forward Deployed Engineer (FDE) Intern",
    organization: "UnifyApps",
    organizationUrl: "https://unifyapps.com",
    duration: "May 2026 - Present",
    location: "Gurugram, India",
    description:
      "Embedded with UnifyApps' enterprise clients, building automation workflows and AI agents directly against real production data.",
    highlights: [
      "Leading the agent and workflow build-out for the Bayer engagement.",
      "Designing pipelines that ingest, transform, and reconcile hundreds of thousands of records.",
      "Turning ambiguous business processes into dependable automated systems.",
    ],
  },
  {
    id: "hidevs-2026",
    title: "Software Engineer (AI) Intern",
    organization: "HiDevs",
    organizationUrl: "https://hidevs.xyz",
    duration: "Jan 2026 - Apr 2026",
    location: "San Francisco, CA (Remote)",
    description:
      "Drove backend development on Node.js and MongoDB for a production platform serving 4,000+ users on GCP.",
    highlights: [
      "Cut API latency from 4-5s to ~40-50ms with indexing, query optimization, and multi-layer caching.",
      "Built a GenAI natural-language admin interface that brought query time under 10s.",
      "Shipped competition lifecycle systems, AI-powered evaluation pipelines, analytics dashboards, automated email workflows, and user lifecycle systems.",
      "Improved reliability with Docker and CI/CD, and integrated AI tools for learning and discovery.",
    ],
  },
  {
    id: "aden-2026",
    title: "Open Source Contributor",
    organization: "Aden (YC W20)",
    organizationUrl: "https://adenhq.com",
    duration: "Mar 2026 - Apr 2026",
    location: "Remote",
    description:
      "Contributed a full Freshdesk integration to Aden's Hive, their MCP (Model Context Protocol) tools platform.",
    highlights: [
      "17 tools, a credential system, centralized HTTP handling, and explicit error mapping.",
      "90+ tests, built for production-readiness: reliable and observable, not just working.",
    ],
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
      "Designed and deployed scalable Node.js APIs with MongoDB and AWS for 2.5k+ users.",
    highlights: [
      "Reduced API latency by 30%.",
      "Built React and Next.js dashboards.",
      "Mentored engineers, helping drive an 80% increase in user engagement.",
    ],
  },
  {
    id: "irlab",
    title: "Software Engineer (Freelance)",
    organization: "IR Lab, DA-IICT",
    organizationUrl: "https://irlab.daiict.ac.in",
    duration: "May 2025 - Jul 2025",
    location: "Gandhinagar, India",
    description:
      "Built a full-stack machine translation evaluation platform with React, Vite, and Supabase, in collaboration with IR researchers.",
    highlights: [
      "Secure REST APIs and PostgreSQL-backed dashboards, deployed to the cloud.",
      "Supported BLEU (a standard machine-translation accuracy score) and other NLP metric analysis.",
    ],
  },
];
