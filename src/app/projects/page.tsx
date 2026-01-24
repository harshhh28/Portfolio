"use client";

import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";

export default function Projects() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            My Projects
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            A collection of my work spanning web/app development, machine
            learning, and hardware projects. Each project represents a unique
            challenge and learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden border-b border-border bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-1 p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-2">
                  <Link
                    href={project.github}
                    target="_blank"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <SiGithub size={18} />
                    <span>Code</span>
                  </Link>
                  <Link
                    href={project.demo}
                    target="_blank"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span>Demo</span>
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
