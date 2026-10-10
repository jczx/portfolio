import type { Language } from "../i18n/content";

export type SitePage = "home" | "eu-sanctions-name-match" | "sanctions-pipeline-monitor";

export const pageFiles: Record<SitePage, string> = {
  home: "index.html",
  "eu-sanctions-name-match": "sanctions-matcher.html",
  "sanctions-pipeline-monitor": "sanctions-monitor.html",
};

export const getPageFromLocation = (location: Pick<Location, "pathname" | "search">): SitePage => {
  const legacyCase = new URLSearchParams(location.search).get("case");
  for (const page of ["eu-sanctions-name-match", "sanctions-pipeline-monitor"] as const) {
    if (legacyCase === page || location.pathname.endsWith(`/${pageFiles[page]}`)) return page;
  }
  return "home";
};

export const getSiteMetadata = (page: SitePage, language: Language) => {
  const titles: Record<SitePage, string> = {
    home: "Julio Caesar | Data & Analytics Professional",
    "eu-sanctions-name-match": language === "de" ? "EU-Sanktionslisten: Namensabgleich | Julio Caesar" : "EU Sanctions Name Match Explorer | Julio Caesar",
    "sanctions-pipeline-monitor": language === "de" ? "Sanktionsdaten: Pipeline-Monitoring | Julio Caesar" : "Sanctions Pipeline Monitor | Julio Caesar",
  };
  const descriptions: Record<Language, Record<SitePage, string>> = {
    en: {
      home: "Julio Caesar: BI Consultant and MSc Data Science student in Berlin. Business analytics, data engineering, technical delivery, and reliable BI operations.",
      "eu-sanctions-name-match": "Explore names and aliases from the official EU sanctions list, with ranked candidate matches and explanations. A portfolio demo by Julio Caesar.",
      "sanctions-pipeline-monitor": "EU sanctions pipeline status: source date, record counts, and essential checks. A portfolio demo by Julio Caesar.",
    },
    de: {
      home: "Julio Caesar: BI Consultant und MSc-Data-Science-Student in Berlin. Business Analytics, Data Engineering, technische Umsetzung und verlässlicher BI-Betrieb.",
      "eu-sanctions-name-match": "Namen und Aliasse aus der offiziellen EU-Sanktionsliste vergleichen. Mit priorisierten Treffern und nachvollziehbaren Hinweisen. Eine Portfolio-Demo von Julio Caesar.",
      "sanctions-pipeline-monitor": "Status der EU-Sanktionsdatenpipeline: Quelldatum, Eintragszahlen und zentrale Prüfungen. Eine Portfolio-Demo von Julio Caesar.",
    },
  };
  return {
    title: titles[page],
    description: descriptions[language][page],
    url: `https://julio-caesar.com/${page === "home" ? "" : pageFiles[page]}`,
    image: `https://julio-caesar.com/${page === "home" ? "og-image" : pageFiles[page].replace(".html", "-preview")}.png`,
  };
};
