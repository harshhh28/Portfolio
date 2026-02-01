import { PROJECTS } from "@/data/projects";
import ProjectFolder from "@/components/projects/ProjectFolder";

export default function WorkbenchPage() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-16 max-w-4xl mx-auto">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="text-2xl font-mono font-bold">/workbench</h1>
        <p className="text-sm text-muted-foreground font-mono mt-1">
          Active development environments and archived repositories.
        </p>
      </div>

      <div className="space-y-1">
        {PROJECTS.map((project) => (
          <ProjectFolder key={project.title} project={project} />
        ))}
        
        {/* Placeholder for empty space/directory listing feel */}
        <div className="pt-2 text-xs font-mono text-muted-foreground opacity-50 px-4">
           {PROJECTS.length} directories, 0 files
        </div>
      </div>
    </div>
  );
}
