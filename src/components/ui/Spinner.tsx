export const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] gap-3">
      <div className="w-5 h-5 rounded-full border-2 border-border border-t-primary animate-spin" />
      <span className="text-xs text-muted-foreground">Loading…</span>
    </div>
  );
};
