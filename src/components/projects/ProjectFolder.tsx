"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FileCode, ExternalLink, Github } from "lucide-react";
import { Project } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectFolderProps {
  project: Project;
}

const ProjectFolder = ({ project }: ProjectFolderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border bg-card/50 overflow-hidden">
      {/* Folder Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 text-sm font-mono hover:bg-secondary/50 transition-colors text-left",
          isOpen && "bg-secondary/30"
        )}
      >
        <div className="flex items-center gap-3">
          {isOpen ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
          {isOpen ? <Folder size={16} className="text-blue-400 fill-blue-400/20" /> : <Folder size={16} className="text-blue-400" />}
          <span className="font-medium text-foreground">{project.title}</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
           {/* Fake Metadata */}
           <span className="hidden sm:inline-block">drwxr-xr-x</span>
           <span>{(project.title.length % 8) + 2}.0K</span>
           <span className="hidden sm:inline-block">admin</span>
        </div>
      </button>

      {/* Folder Content (README view) */}
      {isOpen && (
        <div className="border-t border-border animate-in slide-in-from-top-1 px-4 py-6 bg-background/50">
           {/* README Header */}
           <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border/50 max-w-2xl">
              <FileCode size={14} className="text-muted-foreground" />
              <span className="text-xs font-mono font-bold text-muted-foreground">README.md</span>
           </div>
           
           <div className="prose prose-sm prose-invert max-w-2xl">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="flex flex-wrap gap-2 not-prose my-4">
                 {project.tags.map(tag => (
                   <span key={tag} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-mono border border-border/50">
                     {tag}
                   </span>
                 ))}
              </div>
              
              <div className="flex gap-4 not-prose mt-4">
                 <Link href={project.github} target="_blank" className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors">
                    <Github size={14} />
                    src/repo
                 </Link>
                 <Link href={project.demo} target="_blank" className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink size={14} />
                    deploy/live
                 </Link>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFolder;
