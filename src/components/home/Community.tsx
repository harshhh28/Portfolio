import { POSITIONS } from "@/data/community-leadership";
import { SectionHeading } from "./SectionHeading";
import { TimelineRow } from "./TimelineRow";

const Community = () => {
  return (
    <section className="border-t border-border py-14">
      <SectionHeading title="Community" />

      <div>
        {POSITIONS.map((pos) => (
          <TimelineRow
            key={pos.id}
            date={pos.duration}
            title={pos.title}
            org={pos.organization}
            orgUrl={pos.organizationUrl}
          >
            <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
              {pos.description}
            </p>

            {pos.events && pos.events.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {pos.events.map((event) => (
                  <a
                    key={event.name}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary underline-offset-4 hover:underline"
                  >
                    {event.name}
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

export default Community;
