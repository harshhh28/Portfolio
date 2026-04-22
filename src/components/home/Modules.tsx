"use client";

import { SKILLS } from "@/data/skills";
import Link from "next/link";

type Status = "RUNNING" | "EXPERIMENTAL" | "DEPRECATED" | "CRITICAL";

interface ModuleRow {
  name: string;
  url: string | null;
  version: string;
  status: Status;
  description: string;
}

const STATUS_COLORS: Record<Status, string> = {
  RUNNING: "#4ade80",
  EXPERIMENTAL: "#fbbf24",
  DEPRECATED: "#6b7280",
  CRITICAL: "#f87171",
};

// Map every skill from SKILLS data into table rows — no additions or removals
const MODULE_ROWS: ModuleRow[] = [
  // Languages
  { name: "Python",       url: "https://docs.python.org/3/",       version: "3.12.x", status: "RUNNING",      description: "Does everything. Sometimes too cleverly." },
  { name: "TypeScript",   url: "https://www.typescriptlang.org/docs/", version: "5.x",   status: "RUNNING",      description: "JavaScript with a helmet on." },
  { name: "JavaScript",   url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", version: "ES2024", status: "RUNNING", description: "Keeps the frontend alive. Barely." },
  { name: "C++",          url: "https://cplusplus.com/doc/",        version: "17",      status: "RUNNING",      description: "Suffers gladly for performance." },
  { name: "C",            url: "https://devdocs.io/c/",             version: "C11",     status: "RUNNING",      description: "Close to the metal. Close to the pain." },
  { name: "SQL",          url: "https://www.w3schools.com/sql/",    version: "ANSI",    status: "RUNNING",      description: "SELECT * FROM answers WHERE correct = true." },
  { name: "HTML",         url: "https://developer.mozilla.org/en-US/docs/Web/HTML", version: "5", status: "RUNNING", description: "It's not a programming language but it holds everything together." },
  { name: "CSS",          url: "https://developer.mozilla.org/en-US/docs/Web/CSS", version: "3", status: "RUNNING", description: "Centering a div took years off my life." },
  { name: "Verilog",      url: "https://sutherland-hdl.com/pdfs/verilog_2001_ref_guide.pdf", version: "2001", status: "DEPRECATED", description: "Used once for a digital circuits course. Never again." },

  // Frameworks
  { name: "Next.js",      url: "https://nextjs.org/docs",           version: "15.x",   status: "RUNNING",      description: "This very site runs on it. Meta." },
  { name: "Node.js",      url: "https://nodejs.org/docs/latest/api/", version: "20 LTS", status: "RUNNING",    description: "Server-side JS — event loop and prayers." },
  { name: "Express.js",   url: "https://expressjs.com/",            version: "4.x",     status: "RUNNING",     description: "Minimal, unopinionated, and very dependable." },
  { name: "FastAPI",      url: "https://fastapi.tiangolo.com/",     version: "0.111.x", status: "RUNNING",     description: "Python APIs that are actually fast. Who knew." },
  { name: "React",        url: "https://react.dev/",                version: "19.x",    status: "RUNNING",     description: "State management with existential crises included." },
  { name: "NextAuth.js",  url: "https://next-auth.js.org/",         version: "4.x",     status: "EXPERIMENTAL", description: "Auth that works until your session config is slightly off." },
  { name: "Flask",        url: "https://flask.palletsprojects.com/", version: "3.x",    status: "DEPRECATED",  description: "Retired to prototypes and weekend experiments." },
  { name: "React Native", url: "https://reactnative.dev/docs/getting-started", version: "0.74.x", status: "EXPERIMENTAL", description: "Mobile apps that look suspiciously like websites." },
  { name: "Vite",         url: "https://vitejs.dev/guide/",         version: "5.x",     status: "EXPERIMENTAL", description: "Blazing fast bundler. Lives in dev mode only." },
  { name: "Tailwind CSS", url: "https://tailwindcss.com/docs",      version: "3.x",     status: "RUNNING",     description: "Inline styles with better PR." },

  // Cloud & Data
  { name: "PostgreSQL",   url: "https://www.postgresql.org/docs/",  version: "16.x",   status: "RUNNING",      description: "The only database that hasn't disappointed me yet." },
  { name: "Redis",        url: "https://redis.io/docs/",            version: "7.x",     status: "RUNNING",     description: "Goes fast. Loses data on restart if you forget persistence." },
  { name: "AWS",          url: "https://docs.aws.amazon.com/",      version: "∞",       status: "RUNNING",     description: "Infinitely powerful, infinitely confusing, infinitely billed." },
  { name: "MongoDB",      url: "https://www.mongodb.com/docs/",     version: "7.x",     status: "RUNNING",     description: "Schema-free and chaos-friendly." },
  { name: "GCP",          url: "https://cloud.google.com/docs",     version: "∞",       status: "EXPERIMENTAL", description: "AWS's quieter cousin. Used cautiously." },
  { name: "Supabase",     url: "https://supabase.io/docs",          version: "2.x",     status: "EXPERIMENTAL", description: "Firebase but it speaks SQL. Much better." },
  { name: "Firebase",     url: "https://firebase.google.com/docs",  version: "10.x",    status: "DEPRECATED",  description: "Retired after discovering I missed real SQL." },
  { name: "pgvector",     url: "https://github.com/pgvector/pgvector", version: "0.7.x", status: "EXPERIMENTAL", description: "Postgres doing AI things. Surprisingly effective." },
  { name: "Vercel",       url: "https://vercel.com/docs",           version: "∞",       status: "RUNNING",     description: "Push to deploy. Try not to bankrupt yourself." },
  { name: "Railway",      url: "https://docs.railway.com/",         version: "∞",       status: "EXPERIMENTAL", description: "Heroku but the prices won't give you a heart attack." },
  { name: "Render",       url: "https://render.com/docs",           version: "∞",       status: "EXPERIMENTAL", description: "Spins down on inactivity. Great for demos, rough for prod." },
  { name: "Cloudinary",   url: "https://cloudinary.com/documentation", version: "∞",   status: "RUNNING",     description: "Turns image uploads into someone else's problem." },

  // Developer Tools
  { name: "Git",          url: "https://git-scm.com/doc",           version: "2.x",    status: "RUNNING",      description: "The only version control. Non-negotiable." },
  { name: "GitHub",       url: "https://docs.github.com/",          version: "∞",      status: "RUNNING",      description: "Where code goes to get judged by strangers." },
  { name: "Docker",       url: "https://docs.docker.com/",          version: "25.x",   status: "RUNNING",      description: "It works in the container. Ship the container." },
  { name: "Postman",      url: "https://learning.postman.com/docs/", version: "10.x",  status: "RUNNING",      description: "Talking to APIs without writing a single curl command." },
  { name: "pgAdmin",      url: "https://www.pgadmin.org/docs/",     version: "8.x",    status: "RUNNING",      description: "GUI for when the terminal query is 200 lines long." },
  { name: "VS Code",      url: "https://code.visualstudio.com/docs", version: "∞",     status: "RUNNING",      description: "Home. Also: 47 extensions and counting." },
  { name: "Android Studio", url: "https://developer.android.com/docs", version: "2023.x", status: "DEPRECATED", description: "Opened once. RAM never fully recovered." },
  { name: "Cursor",       url: "https://docs.cursor.com/introduction", version: "∞",   status: "EXPERIMENTAL", description: "AI pair programmer. Surprisingly good advice." },
  { name: "MATLAB",       url: "https://www.mathworks.com/help/matlab/", version: "R2023a", status: "DEPRECATED", description: "Used for signals. Left behind with the curriculum." },
  { name: "Jupyter Notebook", url: "https://jupyter-notebook.readthedocs.io/", version: "7.x", status: "RUNNING", description: "Where data science experiments go to live forever." },

  // AI/ML
  { name: "TensorFlow",   url: "https://www.tensorflow.org/api_docs", version: "2.x",  status: "RUNNING",     description: "Deep learning framework. Deep patience required." },
  { name: "Keras",        url: "https://keras.io/api/",              version: "3.x",    status: "DEPRECATED",  description: "Wrapped by TensorFlow. Now mostly a memory." },
  { name: "LangChain",    url: "https://python.langchain.com/docs/", version: "0.2.x", status: "RUNNING",     description: "Chains of AI calls. What could go wrong?" },
  { name: "Hugging Face", url: "https://huggingface.co/docs",        version: "∞",      status: "EXPERIMENTAL", description: "Unlimited model downloads. Finite disk space." },
  { name: "Scikit-learn", url: "https://scikit-learn.org/stable/documentation.html", version: "1.5.x", status: "RUNNING", description: "Classical ML before everything became a transformer." },
  { name: "NumPy",        url: "https://numpy.org/doc/",             version: "2.x",    status: "RUNNING",     description: "Matrices. Broadcasting. Tears." },
  { name: "Pandas",       url: "https://pandas.pydata.org/docs/",    version: "2.x",    status: "RUNNING",     description: "DataFrames that answer every data question except the important ones." },
  { name: "Matplotlib",   url: "https://matplotlib.org/stable/contents.html", version: "3.x", status: "RUNNING", description: "Makes graphs. Spent 80% of the time on axis labels." },
  { name: "Seaborn",      url: "https://seaborn.pydata.org/api.html", version: "0.13.x", status: "DEPRECATED", description: "Pretty plots. Now I just use Matplotlib and suffer." },
  { name: "Agno (Phidata)", url: "https://docs.agno.com/introduction", version: "∞",   status: "EXPERIMENTAL", description: "Agentic AI framework. Still figuring out if it's magic or madness." },
  { name: "Groq",         url: "https://console.groq.com/docs",      version: "∞",      status: "EXPERIMENTAL", description: "Inference at ludicrous speed. The future, uncomfortably fast." },
  { name: "Streamlit",    url: "https://docs.streamlit.io/library",  version: "1.x",    status: "RUNNING",     description: "Turns Python scripts into apps. Demos love it." },
];

const Modules = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 fade-in duration-500">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-mono font-bold">Installed Modules</h2>
        <p className="text-sm text-muted-foreground font-mono mt-1">
          Listing all active packages and dependencies.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full font-mono text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-4 text-xs text-muted-foreground uppercase tracking-wider font-bold whitespace-nowrap">
                MODULE
              </th>
              <th className="text-left py-2 pr-4 text-xs text-muted-foreground uppercase tracking-wider font-bold whitespace-nowrap">
                VERSION
              </th>
              <th className="text-left py-2 pr-4 text-xs text-muted-foreground uppercase tracking-wider font-bold whitespace-nowrap">
                STATUS
              </th>
              <th className="text-left py-2 text-xs text-muted-foreground uppercase tracking-wider font-bold">
                DESCRIPTION
              </th>
            </tr>
          </thead>
          <tbody>
            {MODULE_ROWS.map((row) => (
              <tr
                key={row.name}
                className="border-b border-border/30 hover:bg-secondary/20 transition-colors group"
              >
                {/* MODULE */}
                <td className="py-2 pr-4 whitespace-nowrap">
                  {row.url ? (
                    <Link
                      href={row.url}
                      target="_blank"
                      className="text-foreground hover:text-primary hover:underline underline-offset-4 transition-colors"
                    >
                      {row.name}
                    </Link>
                  ) : (
                    <span className="text-foreground">{row.name}</span>
                  )}
                </td>

                {/* VERSION */}
                <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">
                  {row.version}
                </td>

                {/* STATUS */}
                <td className="py-2 pr-4 whitespace-nowrap">
                  <span
                    style={{ color: STATUS_COLORS[row.status] }}
                    className="font-bold text-xs"
                  >
                    {row.status}
                  </span>
                </td>

                {/* DESCRIPTION */}
                <td className="py-2 text-muted-foreground text-xs leading-relaxed">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modules;
