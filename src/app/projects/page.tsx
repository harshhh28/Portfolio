"use client";

import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";

export default function Projects() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header removed for minimalist view */}

        <div className="flex flex-col space-y-4">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="group flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-5 rounded-lg border border-border/40 hover:border-primary/20 bg-card/30 hover:bg-card/60 transition-all duration-300"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
                    <Link
                      href={project.github}
                      target="_blank"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title="View Code"
                    >
                      <SiGithub size={16} />
                    </Link>
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title="View Demo"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile-only visible links (kept accessible) */}
              <div className="flex sm:hidden gap-4 mt-2">
                 <Link
                    href={project.github}
                    target="_blank"
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <SiGithub size={14} />
                    <span>Code</span>
                  </Link>
                  <Link
                    href={project.demo}
                    target="_blank"
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>Demo</span>
                  </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
