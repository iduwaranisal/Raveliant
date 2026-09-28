import React from "react";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.raveliant.com/#organization",
    name: "Raveliant Digital Solutions",
    alternateName: ["Raveliant", "Raveliant Digital", "Raveliant Solutions"],
    url: "https://www.raveliant.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.raveliant.com/logo.jpg",
      width: 1024,
      height: 1024,
      caption: "Raveliant Digital Solutions Logo",
    },
    image: "https://www.raveliant.com/logo.jpg",
    description:
      "Raveliant Digital Solutions is an end-to-end digital growth agency specializing in high-converting modern websites, custom software engineering, 24/7 AI chatbots, and targeted social media marketing campaigns.",
    email: "raveliantcontact@gmail.com",
    telephone: "+94704692220",
    sameAs: [
      "https://wa.me/94704692220",
      "https://facebook.com/raveliant",
      "https://instagram.com/raveliant",
      "https://linkedin.com/company/raveliant",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+94704692220",
        contactType: "customer service",
        email: "raveliantcontact@gmail.com",
        availableLanguage: ["English", "Sinhala"],
        areaServed: "Worldwide",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.raveliant.com/#website",
    url: "https://www.raveliant.com",
    name: "Raveliant Digital Solutions",
    description:
      "Modern websites, intelligent AI chatbots, and targeted social media ads engineered to scale businesses.",
    publisher: {
      "@id": "https://www.raveliant.com/#organization",
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProfessionalServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.raveliant.com/#service",
    name: "Raveliant Digital Solutions",
    url: "https://www.raveliant.com",
    image: "https://www.raveliant.com/logo.jpg",
    telephone: "+94704692220",
    priceRange: "$$",
    currenciesAccepted: "USD, LKR, EUR, GBP, AUD",
    paymentAccepted: "Credit Card, Bank Transfer, Online",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Growth & Engineering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "High-Performance Modern Web Development",
            description:
              "Custom fast Next.js websites and web applications engineered to turn visitors into booked clients.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Intelligent AI Chatbots & Business Automation",
            description:
              "24/7 AI assistants that talk to visitors, answer inquiries, and schedule appointments automatically.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Targeted Paid Social Media Advertising",
            description:
              "High-converting video and image ad campaigns on Meta (Instagram, Facebook) and TikTok delivering predictable inquiries.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * HomePageSchema — Explicitly tells Google that https://www.raveliant.com is the
 * root WebPage and primary entry point for the site. This is the most direct
 * signal you can send to fix sub-pages appearing as the top search result.
 */
export function HomePageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.raveliant.com/#webpage",
    url: "https://www.raveliant.com",
    name: "Raveliant Digital Solutions — AI, Software & Digital Growth Agency",
    description:
      "We Don't Just Build Software. We Scale Businesses. High-performance websites, intelligent 24/7 AI chatbots, and targeted social media marketing that multiply customer inquiries.",
    isPartOf: {
      "@id": "https://www.raveliant.com/#website",
    },
    about: {
      "@id": "https://www.raveliant.com/#organization",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://www.raveliant.com/images/hero_showcase.jpg",
      width: 1200,
      height: 630,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.raveliant.com",
        },
      ],
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "ReadAction",
      target: ["https://www.raveliant.com"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
