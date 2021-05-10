export const capitalize = (title: string) => {
  return title
    .split(/[^a-z]/)
    .map((segment) => segment[0].toUpperCase() + segment.substring(1))
    .join(" ");
};
