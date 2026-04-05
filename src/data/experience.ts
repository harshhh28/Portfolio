import type { Experience } from "@/types";

export const EXPERIENCE: Experience[] = [
  {
    id: "hidevs-2026",
    title: "Software Developer Intern",
    organization: "HiDevs",
    organizationUrl: "https://hidevs.xyz",
    duration: "Jan 2026 - Present",
    location: "San Francisco, CA (Remote)",
    description:
      "Driving backend development on Node.js and MongoDB for 3,500+ users on GCP, implementing in-process caching, request-level memoization, Sentry observability, Docker containerization, and Cashfree payments, while optimizing queries and data access patterns to reduce latency from 4-5s to 200-300ms and ~40-50ms with caching.",
  },
  {
    id: "aden-2026",
    title: "Open Source Contributor",
    organization: "Aden",
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
    title: "Software Developer Intern",
    organization: "HiDevs",
    organizationUrl: "https://hidevs.xyz",
    duration: "Mar 2025 - Jun 2025",
    location: "San Francisco, CA (Remote)",
    description:
      "Designed and deployed scalable Node.js APIs with MongoDB and AWS for 2.5k+ users, reducing latency by 30%, while building React and Next.js dashboards and mentoring developers to drive an 80% increase in user engagement.",
  },
  {
    id: "irlab",
    title: "Software Developer (Freelance)",
    organization: "IR Lab, DA-IICT",
    organizationUrl: "https://irlab.daiict.ac.in",
    duration: "May 2025 - Jul 2025",
    location: "Gandhinagar, India",
    description:
      "Built a full-stack machine translation evaluation platform using React, Vite, and Supabase, designing secure REST APIs, PostgreSQL-backed dashboards, and cloud deployment to support BLEU and NLP metric analysis in collaboration with IR researchers.",
  },
];
