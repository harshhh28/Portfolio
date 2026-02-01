"use client";

import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { SKILLS } from "@/data/skills";
import { EXPERIENCE } from "@/data/experience";
import { POSITIONS } from "@/data/community-leadership";
import { EDUCATION } from "@/data/education";

export default function Home() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16 max-w-3xl mx-auto space-y-12">
      
      {/* Header / Intro */}
      <section className="flex flex-col items-center text-center space-y-5">
        <div className="relative w-28 h-28 md:w-32 md:h-32 overflow-hidden rounded-full border border-border/50 shadow-sm">
           <Image
            src="/images/about/profilePic.jpeg"
            alt="Harsh Gajjar"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Harsh Gajjar
          </h1>
          <div className="text-lg md:text-xl text-muted-foreground font-medium h-7">
            <TypeAnimation
              sequence={[
                "Writes Code",
                2000,
                "Breaks Code",
                2000,
                "Fixes Code",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
            />
          </div>
          <p className="max-w-lg mx-auto text-base text-muted-foreground leading-relaxed">
            Hi. My favorite programming language is Humor. I leave code for you to fix. But don't worry, I'll be there to help you :)
          </p>
          
          <div className="flex justify-center gap-3 pt-3">
             <Link
                href="https://linktr.ee/harshgajjar"
                target="_blank"
                className="px-5 py-1.5 text-sm rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Linktree
              </Link>
              <a
                href="/docs/Harsh_Gajjar_CV.pdf"
                download
                className="px-5 py-1.5 text-sm rounded-full border border-border hover:bg-muted/50 transition-colors font-medium"
              >
                Download CV
              </a>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-xl font-bold mb-6 border-b border-border/40 pb-2">Experience</h2>
        <div className="space-y-6">
          {EXPERIENCE.map((exp) => (
            <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
              <div className="col-span-1 text-xs text-muted-foreground font-medium pt-1 uppercase tracking-wider">
                {exp.duration}
              </div>
              <div className="col-span-3 space-y-1.5">
                <h3 className="font-semibold text-base">
                  {exp.title} 
                  <span className="text-muted-foreground font-normal"> @ </span>
                  {exp.organizationUrl ? (
                    <Link href={exp.organizationUrl} target="_blank" className="hover:underline hover:text-primary transition-colors">
                      {exp.organization}
                    </Link>
                  ) : (
                    exp.organization
                  )}
                </h3>
                <p className="text-xs text-muted-foreground">{exp.location}</p>
                <p className="text-sm text-muted-foreground/90 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Positions of Responsibility */}
      <section>
        <h2 className="text-xl font-bold mb-6 border-b border-border/40 pb-2">Community & Leadership</h2>
        <div className="space-y-6">
          {POSITIONS.map((pos) => (
            <div key={pos.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
              <div className="col-span-1 text-xs text-muted-foreground font-medium pt-1 uppercase tracking-wider">
                {pos.duration}
              </div>
              <div className="col-span-3 space-y-1.5">
                <h3 className="font-semibold text-base">
                  {pos.title}
                  <span className="text-muted-foreground font-normal"> @ </span>
                   {pos.organizationUrl ? (
                    <Link href={pos.organizationUrl} target="_blank" className="hover:underline hover:text-primary transition-colors">
                      {pos.organization}
                    </Link>
                  ) : (
                    pos.organization
                  )}
                </h3>
                 <p className="text-sm text-muted-foreground/90 leading-relaxed">
                  {pos.description}
                </p>
                {pos.events && (
                  <div className="flex gap-2 pt-1">
                    {pos.events.map(ev => (
                      <Link key={ev.name} href={ev.url} target="_blank" className="text-[10px] px-2 py-0.5 bg-muted/50 rounded border border-border/30 hover:bg-muted hover:border-border/60 transition-colors">
                        {ev.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xl font-bold mb-6 border-b border-border/40 pb-2">Education</h2>
        <div className="space-y-6">
          {EDUCATION.map((edu) => (
            <div key={edu.school} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
              <div className="col-span-1 text-xs text-muted-foreground font-medium pt-1 uppercase tracking-wider">
                {edu.duration}
              </div>
              <div className="col-span-3 space-y-1.5">
                <h3 className="font-semibold text-base">
                  {edu.schoolUrl ? (
                    <Link href={edu.schoolUrl} target="_blank" className="hover:underline hover:text-primary transition-colors">
                      {edu.school}
                    </Link>
                  ) : (
                    edu.school
                  )}
                </h3>
                <p className="text-sm text-foreground/90">{edu.degree}</p>
                <p className="text-xs text-muted-foreground">{edu.location}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {edu.courses.map((course) => (
                    <span
                      key={course}
                      className="text-[10px] px-2 py-0.5 bg-muted/50 rounded border border-border/30"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-xl font-bold mb-6 border-b border-border/40 pb-2">Skills</h2>
        <div className="space-y-5">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill: any) => (
                  <Link 
                    key={skill.name} 
                    href={skill.url || '#'} 
                    target={skill.url ? "_blank" : undefined}
                    className="px-2.5 py-1 bg-muted/30 border border-border/40 rounded text-xs hover:bg-muted hover:border-border/80 transition-colors"
                  >
                    {skill.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
