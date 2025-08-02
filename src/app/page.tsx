"use client";

import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const SKILLS = {
  languages: [
    {
      name: "C",
      url: "https://devdocs.io/c/",
    },
    {
      name: "C++",
      url: "https://cplusplus.com/doc/",
    },
    {
      name: "Python",
      url: "https://docs.python.org/3/",
    },
    {
      name: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      name: "TypeScript",
      url: "https://www.typescriptlang.org/docs/",
    },
    {
      name: "SQL",
      url: "https://www.w3schools.com/sql/",
    },
    {
      name: "HTML",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      name: "CSS",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      name: "Verilog",
      url: "https://sutherland-hdl.com/pdfs/verilog_2001_ref_guide.pdf",
    },
  ],
  developerTools: [
    {
      name: "Git",
      url: "https://git-scm.com/doc",
    },
    {
      name: "GitHub",
      url: "https://docs.github.com/",
    },
    {
      name: "Docker",
      url: "https://docs.docker.com/",
    },
    {
      name: "Postman",
      url: "https://learning.postman.com/docs/",
    },
    {
      name: "pgAdmin",
      url: "https://www.pgadmin.org/docs/",
    },
    {
      name: "VS Code",
      url: "https://code.visualstudio.com/docs",
    },
    {
      name: "Android Studio",
      url: "https://developer.android.com/docs",
    },
    {
      name: "Cursor",
      url: "https://docs.cursor.com/introduction",
    },
    {
      name: "MATLAB",
      url: "https://www.mathworks.com/help/matlab/",
    },
    {
      name: "Jupyter Notebook",
      url: "https://jupyter-notebook.readthedocs.io/",
    },
  ],
  frameworks: [
    {
      name: "Next.js",
      url: "https://nextjs.org/docs",
    },
    {
      name: "Node.js",
      url: "https://nodejs.org/docs/latest/api/",
    },
    {
      name: "Express.js",
      url: "https://expressjs.com/",
    },
    {
      name: "FastAPI",
      url: "https://fastapi.tiangolo.com/"
    },
    {
      name: "Flask",
      url: "https://flask.palletsprojects.com/"
    },
    {
      name: "React",
      url: "https://react.dev/",
    },
    {
      name: "React Native",
      url: "https://reactnative.dev/docs/getting-started",
    },
    {
      name: "Vite",
      url: "https://vitejs.dev/guide/",
    },
    {
      name: "Tailwind CSS",
      url: "https://tailwindcss.com/docs",
    },
  ],
  mlAndDataScience: [
    {
      name: "TensorFlow",
      url: "https://www.tensorflow.org/api_docs",
    },
    {
      name: "Keras",
      url: "https://keras.io/api/",
    },
    {
      name: "Scikit-learn",
      url: "https://scikit-learn.org/stable/documentation.html",
    },
    {
      name: "NumPy",
      url: "https://numpy.org/doc/",
    },
    {
      name: "Pandas",
      url: "https://pandas.pydata.org/docs/",
    },
    {
      name: "Matplotlib",
      url: "https://matplotlib.org/stable/contents.html",
    },
    {
      name: "Seaborn",
      url: "https://seaborn.pydata.org/api.html",
    },
    {
      name: "Agno (Phidata)",
      url: "https://docs.agno.com/introduction",
    },
    {
      name: "Groq",
      url: "https://console.groq.com/docs",
    },
    {
      name: "Streamlit",
      url: "https://docs.streamlit.io/library",
    },
  ],
  cloudDatabases: [
    {
      name: "GCP",
      url: "https://cloud.google.com/docs",
    },
    {
      name: "AWS",
      url: "https://docs.aws.amazon.com/",
    },
    {
      name: "Vercel",
      url: "https://vercel.com/docs",
    },
    {
      name: "Render",
      url: "https://render.com/docs",
    },
    {
      name: "Supabase",
      url: "https://supabase.io/docs",
    },
    {
      name: "Firebase",
      url: "https://firebase.google.com/docs",
    },
    {
      name: "MongoDB",
      url: "https://www.mongodb.com/docs/",
    },
    {
      name: "PostgreSQL",
      url: "https://www.postgresql.org/docs/",
    },
    {
      name: "Docker",
      url: "https://docs.docker.com/"
    },
    {
      name: "Cloudinary",
      url: "https://cloudinary.com/documentation",
    },
  ],
  coursework: [
    {
      name: "Machine Learning",
      url: null,
    },
    {
      name: "Software Engineering",
      url: null,
    },
    {
      name: "Computer Networks",
      url: null,
    },
    {
      name: "Database Management System",
      url: null,
    },
    {
      name: "Object Oriented Programming",
      url: null,
    },
    {
      name: "Data Structures",
      url: null,
    },
    {
      name: "Design and Analysis of Algorithms",
      url: null,
    },
    {
      name: "Computer System Programming",
      url: null,
    },
    {
      name: "Augmented Reality and Virtual Reality Systems",
      url: null,
    },
  ],
  areasOfInterest: [
    {
      name: "Scalable Backend Systems",
      url: null,
    },
    {
      name: "API & Microservices Design",
      url: null,
    },
    {
      name: "DevOps & CI/CD",
      url: null,
    },
    {
      name: "MLOps",
      url: null,
    },
  ],
};

const EDUCATION = [
  {
    school:
      "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)",
    schoolUrl: "https://www.daiict.ac.in",
    degree:
      "Bachelor of Technology in Information and Communication Technology (ICT)",
    duration: "2022 - Present",
    location: "Gandhinagar, Gujarat, India",
    courses: [
      "Machine Learning",
      "Augmented and Virtual Reality Systems",
      "Software Engineering",
      "Computer Networks",
      "System Programming",
      "Design and Analysis of Algorithms",
      "Data Structures",
      "Object Oriented Programming",
    ],
  },
  {
    school: "The H. B. Kapadia New High School",
    schoolUrl: "https://www.hbkapadia.com",
    degree: "Higher Secondary Education (XII) - Science",
    duration: "2021 - 2022",
    location: "Ahmedabad, Gujarat, India",
    courses: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
  },
];

const POSITIONS = [
  {
    title: "Core Member",
    organization: "Hostel Management Committee, DA-IICT",
    organizationUrl: null,
    duration: "Feb 2025 - Present",
    location: "Gandhinagar, Gujarat, India",
    description:
      "Managing hostel operations and coordinating events to enhance student life, working on improving facilities and organizing activities for resident satisfaction.",
    events: null,
  },
  {
    title: "Core Member",
    organization: "Google Developer Group on Campus, DA-IICT",
    organizationUrl: "https://dscdaiict.in/",
    duration: "Feb 2024 - Jul 2025",
    location: "Gandhinagar, Gujarat, India",
    description:
      "Contributing to the developer community as a core member of GDG, organizing technical events and workshops to foster learning and collaboration among students and various communities.",
    events: [
      {
        name: "Dev-o-lution'25",
        url: "https://devolution.dscdaiict.in",
      },
      {
        name: "SLoP 4.0",
        url: "https://slop.dscdaiict.in",
      },
    ],
  },
];

const EXPERIENCE = [
  {
    title: "Product Developer Intern",
    organization: "HiDevs",
    organizationUrl: "https://hidevs.xyz",
    duration: "Mar 2025 - Jun 2025",
    location: "San Francisco, California, United States · (Remote)",
    description:
      "Independently led the design and deployment of scalable APIs and data pipelines, reducing API latency by 30% and supporting 1,500+ concurrent users. Spearheaded React modules for dashboards, global leaderboards, and personalized roadmaps, driving an 80% boost in user engagement.",
  },
  {
    title: "Full Stack Developer (Freelance)",
    organization: "Information Retrieval Lab, DA-IICT",
    organizationUrl: "https://irlab.daiict.ac.in",
    duration: "May 2025 - Jul 2025",
    location: "Gandhinagar, Gujarat, India",
    description:
      "Built a full-stack machine translation evaluation platform enabling users to submit translations, compute BLEU and other NLP metrics and view real-time leaderboards. Engineered secure APIs, dynamic dashboards and managed complete deployment in collaboration with lab researchers.",
  },
];

export default function About() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div
          className="backdrop-blur-lg bg-gradient-to-br from-black/50 to-black/30 
            rounded-3xl border border-white/10 p-8 
            hover:border-white/20 transition-all duration-500 
            group relative overflow-hidden
            animate-in slide-in-from-bottom"
        >
          {/* Gradient overlay effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          {/* Content container */}
          <div className="relative space-y-8">
            <div className="flex justify-center">
              <Image
                src="/images/about/profilePic.jpg"
                alt="Profile Picture"
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
            <div className="space-y-2 sm:space-y-4">
              <h1
                className="text-2xl md:text-3xl lg:text-5xl font-bold py-3 mb-2 text-center 
                bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
              >
                नमस्ते, I'm Harsh Gajjar
              </h1>
              <div
                className="text-xl md:text-2xl lg:text-4xl font-bold text-center min-h-[40px] md:min-h-[48px] 
                bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
              >
                <TypeAnimation
                  sequence={[
                    "Software Developer",
                    1000,
                    "Lazy blogger",
                    1000,
                    "Hardcore tweeter",
                    1000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  style={{ display: "inline-block", lineHeight: "1.2" }}
                />
              </div>
            </div>

            <p
              className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed md:leading-loose 
              max-w-full sm:text-left px-2 sm:px-0
              transform transition-all duration-300 group-hover:text-white/90"
            >
              A developer crafting web solutions with modern tech stacks and
              frameworks. Passionate about AI/ML, I work on prediction models
              and AI agents while constantly exploring new technologies to
              create impactful solutions.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Link
                href="https://linktr.ee/harshgajjar"
                target="_blank"
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-white/10 
                  hover:bg-white/10 hover:border-white/20 
                  transition-all duration-300 hover:-translate-y-1
                  backdrop-blur-sm group/skill
                  text-sm sm:text-base
                  flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  imageRendering="optimizeQuality"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  viewBox="0 0 417 512.238"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    fill="#ffffff"
                    fillRule="nonzero"
                    d="M171.274 344.942h74.09v167.296h-74.09V344.942zM0 173.468h126.068l-89.622-85.44 49.591-50.985 85.439 87.829V0h74.086v124.872L331 37.243l49.552 50.785-89.58 85.24H417v70.502H290.252l90.183 87.629L331 381.192 208.519 258.11 86.037 381.192l-49.591-49.591 90.218-87.631H0v-70.502z"
                  />
                </svg>
                Linktree
              </Link>

              <a
                href="/docs/Harsh_Gajjar_CV.pdf"
                download
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-white/10 
                  hover:bg-white/10 hover:border-white/20 
                  transition-all duration-300 hover:-translate-y-1
                  backdrop-blur-sm
                  text-sm sm:text-base
                  flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sm:w-5 sm:h-5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
              </a>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Skills & Technologies
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-white/80">
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {SKILLS.languages.map((skill) => (
                        <Link
                          key={skill.name}
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-white/10 
                            hover:bg-white/10 hover:border-white/20 
                            transition-all duration-300 hover:-translate-y-1
                            backdrop-blur-sm group/skill
                            text-sm sm:text-base"
                        >
                          <span className="relative">
                            {skill.name}
                            <span
                              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                              opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"
                            />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-white/80">
                      Developer Tools
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {SKILLS.developerTools.map((skill) => (
                        <Link
                          key={skill.name}
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-white/10 
                            hover:bg-white/10 hover:border-white/20 
                            transition-all duration-300 hover:-translate-y-1
                            backdrop-blur-sm group/skill
                            text-sm sm:text-base"
                        >
                          <span className="relative">
                            {skill.name}
                            <span
                              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                              opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"
                            />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-white/80">
                      Frameworks
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {SKILLS.frameworks.map((skill) => (
                        <Link
                          key={skill.name}
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-white/10 
                            hover:bg-white/10 hover:border-white/20 
                            transition-all duration-300 hover:-translate-y-1
                            backdrop-blur-sm group/skill
                            text-sm sm:text-base"
                        >
                          <span className="relative">
                            {skill.name}
                            <span
                              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                              opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"
                            />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-white/80">
                      Machine Learning/Data Science
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {SKILLS.mlAndDataScience.map((skill) => (
                        <Link
                          key={skill.name}
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-white/10 
                            hover:bg-white/10 hover:border-white/20 
                            transition-all duration-300 hover:-translate-y-1
                            backdrop-blur-sm group/skill
                            text-sm sm:text-base"
                        >
                          <span className="relative">
                            {skill.name}
                            <span
                              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                              opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"
                            />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-white/80">
                      Cloud/Databases
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {SKILLS.cloudDatabases.map((skill) => (
                        <Link
                          key={skill.name}
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-white/10 
                            hover:bg-white/10 hover:border-white/20 
                            transition-all duration-300 hover:-translate-y-1
                            backdrop-blur-sm group/skill
                            text-sm sm:text-base"
                        >
                          <span className="relative">
                            {skill.name}
                            <span
                              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                              opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"
                            />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-white/80">
                      Coursework
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {SKILLS.coursework.map((skill) => (
                        <span
                          key={skill.name}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-white/10 
                            hover:bg-white/10 hover:border-white/20 
                            transition-all duration-300 hover:-translate-y-1
                            backdrop-blur-sm group/skill
                            text-sm sm:text-base"
                        >
                          <span className="relative">
                            {skill.name}
                            <span
                              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                              opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"
                            />
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-white/80">
                      Areas of Interest
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {SKILLS.areasOfInterest.map((skill) => (
                        <span
                          key={skill.name}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-white/10 
                            hover:bg-white/10 hover:border-white/20 
                            transition-all duration-300 hover:-translate-y-1
                            backdrop-blur-sm group/skill
                            text-sm sm:text-base"
                        >
                          <span className="relative">
                            {skill.name}
                            <span
                              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                              opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"
                            />
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Experience
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {EXPERIENCE.map((exp) => (
                  <div
                    key={exp.title}
                    className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 
                      p-4 sm:p-6 hover:bg-white/10 hover:border-white/20 
                      transition-all duration-300 group/exp"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      {exp.organizationUrl ? (
                        <Link
                          href={exp.organizationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg sm:text-xl font-semibold hover:text-white/80 transition-colors"
                        >
                          <h3>{exp.organization}</h3>
                        </Link>
                      ) : (
                        <h3 className="text-lg sm:text-xl font-semibold">
                          {exp.organization}
                        </h3>
                      )}
                      <span className="text-white/60 text-sm">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-white/80 mb-2">
                      {exp.title}
                    </p>
                    <p className="text-sm text-white/60 mb-3">{exp.location}</p>
                    <p className="text-sm text-white/70">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Positions of Responsibility
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {POSITIONS.map((pos) => (
                  <div
                    key={pos.title}
                    className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 
                    p-4 sm:p-6 hover:bg-white/10 hover:border-white/20 
                    transition-all duration-300 group/edu"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      {pos.organizationUrl ? (
                        <Link
                          href={pos.organizationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg sm:text-xl font-semibold hover:text-white/80 transition-colors"
                        >
                          <h3>{pos.organization}</h3>
                        </Link>
                      ) : (
                        <h3 className="text-lg sm:text-xl font-semibold">
                          {pos.organization}
                        </h3>
                      )}
                      <span className="text-white/60 text-sm">
                        {pos.duration}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-white/80 mb-2">
                      {pos.title}
                    </p>
                    <p className="text-sm text-white/60 mb-3">{pos.location}</p>
                    <p className="text-sm text-white/70">{pos.description}</p>
                    {pos.events && pos.events.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                        {pos.events.map((event) => (
                          <Link
                            key={event.name}
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-white/5 border border-white/10 
                              rounded-full group-hover/edu:bg-white/10 
                              group-hover/edu:border-white/20 transition-all duration-300 hover:text-white/80"
                          >
                            {event.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Education
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.school}
                    className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 
                      p-4 sm:p-6 hover:bg-white/10 hover:border-white/20 
                      transition-all duration-300 group/edu rounded-2xl"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <Link
                        href={edu.schoolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg sm:text-xl font-semibold hover:text-white/80 transition-colors"
                      >
                        <h3>{edu.school}</h3>
                      </Link>
                      <span className="text-white/60 text-sm">
                        {edu.duration}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-white/80 mb-2">
                      {edu.degree}
                    </p>
                    <p className="text-sm text-white/60 mb-3">{edu.location}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-white/5 border border-white/10 
                            rounded-full group-hover/edu:bg-white/10 
                            group-hover/edu:border-white/20 transition-all duration-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
