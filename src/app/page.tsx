"use client";

import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const SKILLS = [
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
    name: "React.js",
    url: "https://react.dev/",
  },
  {
    name: "React Native",
    url: "https://reactnative.dev/docs/getting-started",
  },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/docs/",
  },
  {
    name: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "CSS",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/docs",
  },
  {
    name: "HTML",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
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
    name: "Cloudinary",
    url: "https://cloudinary.com/documentation",
  },
  {
    name: "Google Cloud",
    url: "https://cloud.google.com/docs",
  },
  {
    name: "Vercel",
    url: "https://vercel.com/docs",
  },
  {
    name: "Machine Learning",
    url: "https://developers.google.com/machine-learning",
  },
  {
    name: "Python",
    url: "https://docs.python.org/3/",
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
    name: "Scikit-learn",
    url: "https://scikit-learn.org/stable/documentation.html",
  },
  {
    name: "TensorFlow",
    url: "https://www.tensorflow.org/api_docs",
  },
  {
    name: "Keras",
    url: "https://keras.io/api/",
  },
  {
    name: "SeaBorn",
    url: "https://seaborn.pydata.org/api.html",
  },
  {
    name: "C++",
    url: "https://cplusplus.com/doc/",
  },
  {
    name: "C",
    url: "https://devdocs.io/c/",
  },
];

const EDUCATION = [
  {
    school:
      "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)",
    schoolUrl: "https://www.daiict.ac.in",
    degree:
      "Bachelor of Technology in Information and Communication Technology (ICT)",
    duration: "2022 - Present",
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
    courses: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
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
            animate-in slide-in-from-bottom">
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
            <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-8 min-h-[64px] bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              <TypeAnimation
                sequence={[
                  "Hello, I'm Harsh Gajjar",
                  1000,
                  "",
                  100,
                  "Full Stack Developer",
                  1000,
                  "",
                  100,
                  "Creative Blogger",
                  1000,
                  "",
                  100,
                  "Lifelong Learner",
                  1000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ display: "inline-block", lineHeight: "1.2" }}
              />
            </h1>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed transform transition-all duration-300 group-hover:text-white/90">
              A Full Stack Developer passionate about crafting beautiful and
              functional web experiences. A Creative Blogger who enjoys sharing
              knowledge and experiences with a touch of humor. A Lifelong
              Learner, always curious to explore new technologies and ideas.
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Skills & Technologies
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {SKILLS.map((skill) => (
                    <Link
                      key={skill.name}
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-lg border border-white/10 
                        hover:bg-white/10 hover:border-white/20 
                        transition-all duration-300 hover:-translate-y-1
                        backdrop-blur-sm group/skill
                        text-sm sm:text-base">
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
            </div>

            <div className="space-y-8">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Education
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.school}
                    className="backdrop-blur-sm bg-white/5 rounded-lg border border-white/10 
                      p-4 sm:p-6 hover:bg-white/10 hover:border-white/20 
                      transition-all duration-300 group/edu">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <Link
                        href={edu.schoolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg sm:text-xl font-semibold hover:text-white/80 transition-colors">
                        <h3>{edu.school}</h3>
                      </Link>
                      <span className="text-white/60 text-sm">
                        {edu.duration}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-white/80 mb-3">
                      {edu.degree}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-white/5 border border-white/10 
                            rounded-full group-hover/edu:bg-white/10 
                            group-hover/edu:border-white/20 transition-all duration-300">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 sm:gap-6 items-center">
              {[
                { icon: SiGithub, href: "https://github.com/harshhh28" },
                {
                  icon: SiLinkedin,
                  href: "https://linkedin.com/in/harsh-gajjar-936536209",
                },
                { icon: SiX, href: "https://x.com/harshgajjar_28" },
              ].map((social, index) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  className="p-2 sm:p-3 hover:bg-white/10 rounded-lg transition-all duration-300
                    border border-transparent hover:border-white/10
                    hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 50}ms` }}>
                  <social.icon size={20} className="sm:w-6 sm:h-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
