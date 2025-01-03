import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Spring Talk - AI Powered ChatApp",
    description:
      "A mobile chat app with Atomic Pattern Design, MVC model and Gemini API integration.",
    image: "/images/projects/chatApp.gif",
    github: "https://github.com/harshhh28/G12_Chat_Application",
    demo: "https://github.com/harshhh28/G12_Chat_Application",
    tags: ["React Native", "Expo", "Firebase", "Cloudinary", "Jest"],
  },
  {
    title: "Stock Price Predictor - for HDFC Bank",
    description:
      "A stock price forecasting model for HDFC Bank using Linear Regression.",
    image: "/images/projects/stockPricePredictor.gif",
    github: "https://github.com/harshhh28/Stock-Price-Predictor",
    demo: "https://github.com/harshhh28/Stock-Price-Predictor/blob/main/stock_predictor.ipynb",
    tags: ["Python", "NumPy", "pandas", "Scikit-Learn"],
  },
  {
    title: "Bank Database Management System",
    description:
      "A DBMS designed with ERD, normalization, and robust structures for efficient banking workflows.",
    image: "/images/projects/bankDBMS.gif",
    github: "https://github.com/harshhh28/Bank-DBMS",
    demo: "https://drive.google.com/file/d/114hIJA8mLtuOb-HweuiwDbd_qzyFauaR/view?usp=sharing",
    tags: ["PostgreSQL"],
  },
  {
    title: "An E-Commerce Clone",
    description:
      "Successfully crafted a fully-fledged responsive Amazon clone using the dynamic duo - HTML and CSS!",
    image: "/images/projects/ecommerce.gif",
    github: "https://github.com/harshhh28/amazon-clone",
    demo: "https://amazon-clone-eta-self.vercel.app/",
    tags: ["HTML5", "CSS3"],
  },
  {
    title: "Convolutional Codes",
    description:
      "Tackled minimum distance search path problem using Viterbi soft and hard decoding",
    image: "/images/projects/convolutionCodes.gif",
    github: "https://github.com/harshhh28/Convolution-Coding",
    demo: "https://github.com/harshhh28/Convolution-Coding",
    tags: ["Viterbi Algorithm", "Dynamic Programming", "Backtracking"],
  },
  {
    title: "RailNet Optimizer",
    description:
      "Reduced cost and time of transportation in railway networks using Graph Theory.",
    image: "/images/projects/railNetOptimizer.gif",
    github: "https://github.com/harshhh28/RailNet-Optimizer/",
    demo: "https://transportationrouteproblem.weebly.com/",
    tags: ["Dijkstra's Algorithm", "Chinese Postman", "Yard location"],
  },
  {
    title: "Vehicle Theft Detector",
    description:
      "Created a real-time monitoring system, improving fleet management, security, and tracking efficiency.",
    image: "/images/projects/vehicleTheftDetector.gif",
    github: "https://github.com/harshhh28/Vehicle-Theft-Detector/",
    demo: "https://youtu.be/QJU5-LBFimQ",
    tags: ["Arduino Uno R3", "GSM", "GPS", "Accelerometer"],
  },
  {
    title: "Variational Calculus",
    description:
      "Explored Euler-Lagrange Equation, the Brachistochrone, Geodesic Sphere, and Catenary problems.",
    image: "/images/projects/variationalCalculus.gif",
    github: "https://github.com/harshhh28/Variational-Calculus/",
    demo: "https://variationalcalculus.weebly.com/",
    tags: ["Brachistochrone", "Geodesic Sphere", "Catenary"],
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 p-4">
          My Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="backdrop-blur-lg bg-black/40 rounded-3xl border border-white/10 overflow-hidden hover:scale-[1.02] transition-transform duration-300 animate-in slide-in-from-bottom"
              style={{ animationDelay: `${index * 200}ms` }}>
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-white/80 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link
                    href={project.github}
                    target="_blank"
                    className="flex items-center gap-2 hover:text-white/70 transition-colors">
                    <SiGithub size={20} />
                    Code
                  </Link>
                  <Link
                    href={project.demo}
                    target="_blank"
                    className="flex items-center gap-2 hover:text-white/70 transition-colors">
                    <ExternalLink size={20} />
                    Demo
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
