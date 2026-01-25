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
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16 max-w-4xl mx-auto space-y-16">
      
      {/* Header / Intro */}
      <section className="flex flex-col items-center text-center space-y-6">
        <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-2 border-muted">
           <Image
            src="/images/about/profilePic.jpeg"
            alt="Harsh Gajjar"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Harsh Gajjar
          </h1>
          <div className="text-xl md:text-2xl text-muted-foreground font-medium h-8">
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
          <p className="max-w-xl mx-auto text-lg text-muted-foreground leading-relaxed">
            Hi. My favorite programming language is Humor. I leave code for you to fix. But don't worry, I'll be there to help you :)
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
             <Link
                href="https://linktr.ee/harshgajjar"
                target="_blank"
                className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Linktree
              </Link>
              <a
                href="/docs/Harsh_Gajjar_CV.pdf"
                download
                className="px-6 py-2 rounded-full border border-border hover:bg-muted transition-colors font-medium"
              >
                Download CV
              </a>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-2xl font-bold mb-8 border-b border-border pb-2">Experience</h2>
        <div className="space-y-8">
          {EXPERIENCE.map((exp) => (
            <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 text-sm text-muted-foreground pt-1">
                {exp.duration}
              </div>
              <div className="col-span-3 space-y-2">
                <h3 className="font-semibold text-lg">
                  {exp.title} 
                  <span className="text-muted-foreground font-normal"> @ </span>
                  {exp.organizationUrl ? (
                    <Link href={exp.organizationUrl} target="_blank" className="hover:underline">
                      {exp.organization}
                    </Link>
                  ) : (
                    exp.organization
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{exp.location}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Positions of Responsibility */}
      <section>
        <h2 className="text-2xl font-bold mb-8 border-b border-border pb-2">Community & Leadership</h2>
        <div className="space-y-8">
          {POSITIONS.map((pos) => (
            <div key={pos.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 text-sm text-muted-foreground pt-1">
                {pos.duration}
              </div>
              <div className="col-span-3 space-y-2">
                <h3 className="font-semibold text-lg">
                  {pos.title}
                  <span className="text-muted-foreground font-normal"> @ </span>
                   {pos.organizationUrl ? (
                    <Link href={pos.organizationUrl} target="_blank" className="hover:underline">
                      {pos.organization}
                    </Link>
                  ) : (
                    pos.organization
                  )}
                </h3>
                 <p className="text-muted-foreground leading-relaxed">
                  {pos.description}
                </p>
                {pos.events && (
                  <div className="flex gap-2 pt-2">
                    {pos.events.map(ev => (
                      <Link key={ev.name} href={ev.url} target="_blank" className="text-xs px-2 py-1 bg-muted rounded hover:bg-muted/80">
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
        <h2 className="text-2xl font-bold mb-8 border-b border-border pb-2">Education</h2>
        <div className="space-y-8">
          {EDUCATION.map((edu) => (
            <div key={edu.school} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 text-sm text-muted-foreground pt-1">
                {edu.duration}
              </div>
              <div className="col-span-3 space-y-2">
                <h3 className="font-semibold text-lg">
                  {edu.schoolUrl ? (
                    <Link href={edu.schoolUrl} target="_blank" className="hover:underline">
                      {edu.school}
                    </Link>
                  ) : (
                    edu.school
                  )}
                </h3>
                <p className="text-base text-muted-foreground">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">{edu.location}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {edu.courses.map((course) => (
                    <span
                      key={course}
                      className="text-xs px-2 py-1 bg-muted rounded hover:bg-muted/80"
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
        <h2 className="text-2xl font-bold mb-8 border-b border-border pb-2">Skills</h2>
        <div className="space-y-6">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill: any) => (
                  <Link 
                    key={skill.name} 
                    href={skill.url || '#'} 
                    target={skill.url ? "_blank" : undefined}
                    className="px-3 py-1 bg-muted/50 border border-border rounded-md text-sm hover:bg-muted transition-colors"
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
