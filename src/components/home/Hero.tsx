import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SOCIALS } from "@/data/socials";
import { EXPERIENCE } from "@/data/experience";

const Hero = () => {
  const current = EXPERIENCE[0];

  return (
    <section className="pb-12 pt-12 sm:pt-16">
      <h1 className="text-balance text-[2rem] font-bold tracking-tight sm:text-4xl">
        Harsh Gajjar
      </h1>
      <p className="mt-3 max-w-[62ch] text-base text-muted-foreground">
        Building automation workflows and AI agents for enterprise teams.
      </p>

      <p className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
        <span
          className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary"
          aria-hidden="true"
        />
        <span>
          Currently {current.title} at {current.organization}, {current.location}
        </span>
      </p>

      <p className="mt-6 max-w-[62ch] text-[0.9375rem] leading-relaxed text-foreground/80">
        I build automation workflows and AI agents that hold up against real
        production data, working hands-on with enterprise clients to turn
        messy business processes into reliable, automated systems. That
        builds on a background of scalable backend and GenAI systems.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-foreground"
        >
          Get in touch
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
        {SOCIALS.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            {social.name === "X (Twitter)" ? "X" : social.name}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
