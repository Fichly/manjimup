import { site } from "@/data/site";
import { pricing } from "@/data/pricing";
import { faq } from "@/data/faq";

/** Données structurées schema.org (Organization, WebSite, Service, FAQPage). */
export function JsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/apple-icon`,
    email: site.contact.email,
    sameAs: [site.social.instagram, site.social.linkedin].filter(Boolean),
    areaServed: { "@type": "Place", name: site.launch.region },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "fr-FR",
    publisher: { "@id": `${site.url}/#organization` },
  };

  const service = {
    "@type": "Service",
    name: "Location de paddle en libre-service",
    serviceType: "Location de stand-up paddle",
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Place", name: site.launch.region },
    offers: pricing.sessions
      .filter((s) => s.price !== null)
      .map((s) => ({
        "@type": "Offer",
        name: `Location paddle ${s.label}`,
        price: s.price,
        priceCurrency: pricing.currency,
      })),
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: [...faq.users, ...faq.partners].map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const data = { "@context": "https://schema.org", "@graph": [organization, website, service, faqPage] };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
