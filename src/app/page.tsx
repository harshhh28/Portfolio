"use client";

import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
// import BackgroundAnimation from "../components/BackgroundAnimation";

export default function About() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      {/* <BackgroundAnimation /> */}
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-lg bg-black/40 rounded-3xl border border-white/10 p-8 animate-in slide-in-from-bottom duration-700">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 pb-4">
            <TypeAnimation
              sequence={[
                "Hello, I'm Harsh Gajjar", // Types the text
                1000, // Waits 1s
                "", // Deletes the text
                100, // Waits 0.1s
                "Full Stack Developer", // Types the text again
                1000, // Waits 1s
                "", // Deletes the text
                100, // Waits 0.1s
                "Creative Blogger", // Types the text again
                1000, // Waits 1s
                "", // Deletes the text
                100, // Waits 0.1s
                "Lifelong Learner", // Types the text again
                1000, // Waits 1s
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ display: "inline-block" }}
            />
          </h1>
          <p className="text-xl text-white/80 mb-8">
            A Full Stack Developer passionate about crafting beautiful and
            functional web experiences. A Creative Blogger who enjoys sharing
            knowledge and experiences with a touch of humor. A Lifelong Learner,
            always curious to explore new technologies and ideas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "Next.js",
                  "Node.js",
                  "Express.js",
                  "React.js",
                  "React Native",
                  "TypeScript",
                  "JavaScript",
                  "CSS",
                  "Tailwind CSS",
                  "HTML",
                  "Firebase",
                  "MongoDB",
                  "PostgreSQL",
                  "Cloudinary",
                  "Google Cloud",
                  "Vercel",
                  "Machine Learning",
                  "Python",
                  "NumPy",
                  "Pandas",
                  "Matplotlib",
                  "Scikit-learn",
                  "TensorFlow",
                  "Keras",
                  "SeaBorn",
                  "C++",
                  "C",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* <div className="space-y-4">
              <h2 className="text-2xl font-bold">Experience</h2>
              <ul className="space-y-3 text-white/80">
                <li>• Senior Developer at Tech Corp</li>
                <li>• Lead Developer at StartUp Inc</li>
                <li>• Freelance Web Developer</li>
              </ul>
            </div> */}
          </div>

          <div className="flex gap-6 items-center">
            <Link
              href="https://github.com/harshhh28"
              target="_blank"
              className="hover:text-white/70 transition-colors">
              <SiGithub size={28} />
            </Link>
            <Link
              href="https://linkedin.com/in/harsh-gajjar-936536209"
              target="_blank"
              className="hover:text-white/70 transition-colors">
              <SiLinkedin size={28} />
            </Link>
            <Link
              href="https://x.com/harshgajjar_28"
              target="_blank"
              className="hover:text-white/70 transition-colors">
              <SiX size={28} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
