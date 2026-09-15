import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

const linkClass =
  "inline-flex items-center gap-1 transition-colors hover:text-primary";

const ProjectCard = ({ project, compact = false }: ProjectCardProps) => {
  const demoLabel = project.demoLabel ?? "Live";

  return (
    <article className="border-t border-border py-5 first:border-t-0 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-[15px] font-semibold leading-snug">{project.title}</h3>

        <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title}: source code`}
            className={linkClass}
          >
            <Github size={12} aria-hidden="true" />
            Source
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title}: ${demoLabel.toLowerCase()}`}
            className={linkClass}
          >
            <ExternalLink size={12} aria-hidden="true" />
            {demoLabel}
          </a>
        </div>
      </div>

      {!compact && (
        <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      )}
      <p className="mt-1.5 text-xs text-faint">{project.tags.join(", ")}</p>
    </article>
  );
};

export default ProjectCard;
