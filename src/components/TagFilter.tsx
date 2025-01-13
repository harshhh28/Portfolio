import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export function TagFilter({ tags, selectedTags, onTagSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={cn(
            "px-3 py-1 rounded-full text-sm transition-all duration-300",
            "border hover:scale-105",
            selectedTags.includes(tag)
              ? "bg-white/20 border-white/30 text-white"
              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
          )}>
          {tag}
        </button>
      ))}
    </div>
  );
}
