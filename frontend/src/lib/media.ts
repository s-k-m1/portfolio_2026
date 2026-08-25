const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export function mediaUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  if (url.startsWith("/")) {
    const origin = API_URL.replace(/\/api\/?$/, "");
    return `${origin}${url}`;
  }
  return url;
}
