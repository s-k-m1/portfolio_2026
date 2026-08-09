import { SITE } from "@/lib/site";
import { getProfile } from "@/lib/api";

export default async function JsonLd() {
  const profile = await getProfile();

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: profile?.portfolio_url || SITE.url,
    jobTitle: SITE.role,
    description: profile?.portfolio_description || SITE.description,
    email: profile?.email || SITE.email,
    telephone: profile?.phone || SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile?.address || "Kathmandu",
      addressCountry: "NP",
    },
    sameAs: [
      profile?.github || SITE.github,
      profile?.linkedin || SITE.linkedin,
      SITE.twitter,
    ].filter(Boolean),
    knowsAbout: [
      "React",
      "Next.js",
      "Django",
      "Django REST Framework",
      "Python",
      "PostgreSQL",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Git",
      "Docker",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.shortName,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "en",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}