import { EDUCATION } from "@/data/education";
import { SectionHeading } from "./SectionHeading";
import { TimelineRow } from "./TimelineRow";

const Education = () => {
  return (
    <section className="border-t border-border py-14">
      <SectionHeading title="Education" />

      <div>
        {EDUCATION.map((edu) => (
          <TimelineRow
            key={edu.school}
            date={edu.duration}
            title={edu.degree}
            org={edu.school}
            orgUrl={edu.schoolUrl}
          >
            <p className="mt-1 text-xs text-faint">{edu.location}</p>
          </TimelineRow>
        ))}
      </div>
    </section>
  );
};

export default Education;
