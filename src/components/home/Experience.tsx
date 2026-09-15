import { ArrowUpRight } from "lucide-react";
import { EXPERIENCE } from "@/data/experience";
import { SectionHeading } from "./SectionHeading";
import { TimelineRow } from "./TimelineRow";

const Experience = () => {
  return (
    <section className="border-t border-border py-14">
      <SectionHeading title="Experience" />

      <div>
        {EXPERIENCE.map((exp) => (
          <TimelineRow
            key={exp.id}
            date={exp.duration}
            title={exp.title}
            org={exp.organization}
            orgUrl={exp.organizationUrl}
          >
            <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
              {exp.description}
            </p>

            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="mt-2 max-w-[62ch] space-y-1">
                {exp.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0.5 before:top-[0.65em] before:size-1 before:rounded-full before:bg-faint"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            {exp.links && exp.links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {exp.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-xs text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="size-3 shrink-0 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            )}
          </TimelineRow>
        ))}
      </div>
    </section>
  );
};

export default Experience;
