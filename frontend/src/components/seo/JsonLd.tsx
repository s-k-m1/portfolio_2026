import { SITE } from "@/lib/site";
import { getProfile } from "@/lib/api";

export default async function JsonLd() {
  const profile = await getProfile();

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.name,
    alternateName: ["Saroj Mahato", "SKM", "Saroj K Mahato"],
    url: profile?.portfolio_url || SITE.url,
    jobTitle: "Backend Developer",
    description: profile?.portfolio_description || SITE.description,
    email: profile?.email || SITE.email,
    telephone: profile?.phone || SITE.phone,
    image: `${SITE.url}/assets/images/skm-pic.jpeg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile?.address || "Kathmandu",
      addressCountry: "NP",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Pokhara University",
    },
    sameAs: [
      profile?.github || SITE.github,
      profile?.linkedin || SITE.linkedin,
      SITE.twitter,
    ].filter(Boolean),
    knowsAbout: [
      "Backend Development",
      "Django",
      "Django REST Framework",
      "Python",
      "PostgreSQL",
      "REST API Design",
      "API Security",
      "Next.js",
      "React",
      "TypeScript",
      "Docker",
      "System Architecture",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Backend Developer",
      occupationLocation: {
        "@type": "Country",
        name: "Nepal",
      },
      skills: "Django, Django REST Framework, PostgreSQL, Python, REST APIs, API Security",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.shortName,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "en",
    publisher: {
      "@id": `${SITE.url}/#person`,
    },
  };

  const org = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    founder: { "@id": `${SITE.url}/#person` },
    areaServed: "Worldwide",
    knowsAbout: ["Backend Development", "Web Development", "API Development"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
    </>
  );
}
