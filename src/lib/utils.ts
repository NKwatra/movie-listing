export const capitalize = (title: string) => {
  return title
    .split(/[^a-z]/)
    .map((segment) => segment[0].toUpperCase() + segment.substring(1))
    .join(" ");
};

export const formatRuntime = (runtime: number | undefined) => {
  if (!runtime) return "0m";
  return runtime < 60
    ? `${runtime}m`
    : `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
};
