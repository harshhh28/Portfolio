import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    title: "HIA - Health Insights Agent (Python)",
    description: "Healthcare platform (250+ users) with multi-model cascade (Llama-4/3.3/3.1), analyzing 350+ reports. Retrieval-augmented (RAG) conversational AI using a FAISS vector index and Hugging Face (HF) embeddings; secure auth, session management, rate limiting (15/day), PDF parsing (up to 20MB) with Supabase. Won global Streamlit Connect Challenge; 100+ stars, 50+ forks on GitHub.",
    github: "https://github.com/harshhh28/hia",
    demo: "https://hiahealth.streamlit.app",
    tags: ["Python", "Streamlit", "Groq", "Supabase", "LangChain", "FAISS", "Llama"],
  },
  {
    title: "HIA - Health Analysis Agent (Next.js)",
    description: "AI-powered health agent to analyze reports and deliver personalized diagnostics using Groq AI. Contextual embeddings via pgvector (vector search built into Postgres); secure JWT-based sessions with OAuth sign-in for privacy and usability. PDF extraction and validation pipeline handling up to 10MB reports with offline analysis fallback.",
    github: "https://github.com/harshhh28/hia-js",
    demo: "https://hiahealth.vercel.app",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Docker", "Hugging Face", "Groq", "NextAuth.js", "pgvector"],
  },
  {
    title: "Spring Talk - AI Powered ChatApp",
    description: "Atomic Design Pattern and MVC architecture. Real-time data and authentication with Firebase; Gemini API for one-tap message enhancement and queries. Integrated Cloudinary for media.",
    github: "https://github.com/harshhh28/G12_Chat_Application",
    demo: "https://youtu.be/UtoEn-mm9b0",
    demoLabel: "Demo",
    tags: ["React Native", "Expo", "Firebase", "Cloudinary", "Babel", "Gradle", "Jest", "Gemini API"],
  },
];
