export function formatDate(value: string | null): string {
  if (!value) return "Present";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatPeriod(start: string, end: string | null): string {
  return `${formatDate(start)} — ${formatDate(end)}`;
}