import type { NextConfig } from "next";

const apiOrigin = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8000/api";
// For connect-src we whitelist the origin only (scheme+host+port). A host-source
// that includes a path (e.g. ".../api") is not reliably matched by browsers for
// connect-src, which would block legitimate cross-origin API fetches (e.g. the
// public review submission). The origin covers every path under it.
const apiConnectOrigin = (() => {
  try {
    return new URL(apiOrigin).origin;
  } catch {
    return apiOrigin;
  }
})();

// CSP notes:
// - `'unsafe-inline'` for script-src and style-src is REQUIRED by Next.js:
//   it emits inline bootstrapping/hydration scripts and inline <style> tags
//   that cannot be covered by hashes/nonces without a custom server. Every
//   OTHER directive is locked to 'self' or one exact whitelisted origin, so
//   no third-party script or frame can ever execute.
// - frame-src allows YouTube embeds only; img-src Unsplash only.
// - Cross-Origin-Resource-Policy: same-origin blocks any origin from
//   embedding our resources (SafeOffice/menus-style multilaterals protection).
// - `'unsafe-eval'` is added ONLY in development. React 19's dev build uses
//   eval() to reconstruct component stacks across realms; in production React
//   never evaluates, so the directive stays strict there. This removes the
//   "eval() is not supported in this environment" warning during `next dev`
//   without weakening the production CSP.
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: blob: https://images.unsplash.com`,
      `frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com`,
      `connect-src 'self' ${apiConnectOrigin}`,
      "font-src 'self' data:",
      "media-src 'self' blob:",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;