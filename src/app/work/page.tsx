import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { SOCIALS } from "@/data/socials";
import ProjectCard from "@/components/projects/ProjectCard";
import { baseOpenGraph } from "@/lib/site";

const description = "Selected projects: live products, experiments, and open source.";

export const metadata: Metadata = {
  title: "Work",
  description,
  alternates: { canonical: "/work" },
  openGraph: { ...baseOpenGraph, url: "/work", title: "Work | Harsh Gajjar", description },
};

export default function WorkPage() {
  const github = SOCIALS.find((social) => social.name === "GitHub");

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 pb-20">
      <header className="pb-8 pt-14">
        <h1 className="text-[17px] font-semibold">Selected work</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Things I&apos;ve built and shipped, with source and demos.
        </p>
      </header>

      {PROJECTS.length > 0 ? (
        <div>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-sm text-muted-foreground">
          Nothing here yet. Check back soon.
        </p>
      )}

      {github && (
        <a
          href={github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 inline-flex items-center gap-1 border-t border-border pt-6 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          More projects on GitHub
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
            aria-hidden="true"
          />
        </a>
      )}
    </div>
  );
}
