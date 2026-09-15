import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/home/Hero";
import Experience from "@/components/home/Experience";
import Education from "@/components/home/Education";
import Community from "@/components/home/Community";
import { SectionHeading } from "@/components/home/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import { PostList } from "@/components/blog/PostList";
import { PROJECTS } from "@/data/projects";
import { getAllPosts } from "@/lib/mdx";
import { baseOpenGraph, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    ...baseOpenGraph,
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-20">
      <Hero />
      <Experience />

      {PROJECTS.length > 0 && (
        <section className="border-t border-border py-14">
          <SectionHeading title="Selected work" href="/work" linkLabel="All projects" />
          <div>
            {PROJECTS.slice(0, 3).map((project) => (
              <ProjectCard key={project.title} project={project} compact />
            ))}
          </div>
        </section>
      )}

      {recentPosts.length > 0 && (
        <section className="border-t border-border py-14">
          <SectionHeading title="Recent writing" href="/writing" linkLabel="All writing" />
          <PostList posts={recentPosts} />
        </section>
      )}

      <Education />
      <Community />

      <section className="border-t border-border pt-14">
        <h2 className="text-[17px] font-semibold">Get in touch</h2>
        <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-foreground/80">
          If you&apos;re building something interesting, I&apos;d like to hear about it.
        </p>
        <Link
          href="/contact"
          className="group mt-6 inline-flex items-center gap-1.5 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Send a message
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </section>
    </div>
  );
}
