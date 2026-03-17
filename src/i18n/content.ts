export type Language = "en" | "de";

type Copy = {
  nav: {
    about: string;
    experience: string;
    contact: string;
  };
  hero: {
    subtitle: string;
    intro: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    title: string;
    lead: string;
    points: string[];
  };
  skills: {
    title: string;
    lead: string;
    groups: Array<{
      title: string;
      items: string[];
    }>;
  };
  experience: {
    title: string;
    lead: string;
    timelineLabel: string;
    skillsLabel: string;
    highlightsLabel: string;
  };
  contact: {
    title: string;
    lead: string;
    linkedinLabel: string;
    githubLabel: string;
    emailLabel: string;
  };
  languageToggleLabel: string;
};

export const copyByLanguage: Record<Language, Copy> = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      subtitle:
        "DataOps Consultant / Analytics Engineer",
      intro: [
        "I build reliable data platforms and turn data into usable insights.",
      ],
      primaryCta: "Get in touch",
      secondaryCta: "View experience",
    },
    about: {
      title: "About",
      lead:
        "I work at the intersection of data reliability, platform operations, and analytics. From ETL monitoring and release coordination to SQL development, dashboards, and applied data science.",
      points: [
        "Hands-on experience across banking, FMCG, and regulated production data environments.",
        "Core strengths in BI and DWH operations, SQL and PL/SQL implementation, and release reliability.",
        "I apply analytics and machine learning when the problem needs more than reporting.",
        "I help teams deliver stable releases and trustworthy reporting.",
      ],
    },
    skills: {
      title: "Skills",
      lead:
        "A practical mix of platform reliability, data engineering, BI delivery, and applied analytics.",
      groups: [
        {
          title: "Reliability & Operations",
          items: [
            "ETL / Batch Monitoring",
            "Release Coordination",
            "Regression Testing",
            "Patch & Change Management",
            "Tomcat / Platform Operations",
            "Incident Coordination",
            "Production Readiness",
          ],
        },
        {
          title: "Data Engineering & BI",
          items: [
            "SQL / PL/SQL / T-SQL",
            "ETL / ELT Pipelines",
            "DWH Workflows",
            "Reporting Pipelines",
            "Dashboard Development",
            "Cross-System Reconciliation",
            "CI/CD for Data Workflows",
          ],
        },
        {
          title: "Analytics & Data Science",
          items: [
            "Trend / Pattern Detection",
            "Anomaly Detection",
            "NLP / Screening Models",
            "Fraud Detection Projects",
            "Clustering / Machine Learning",
            "Business Insight Generation",
          ],
        },
      ],
    },
    experience: {
      title: "Experience",
      lead:
        "Recent roles across DataOps consulting, analytics engineering, DWH operations, and data platform support.",
      timelineLabel: "Career timeline",
      skillsLabel: "Key skills",
      highlightsLabel: "Role highlights",
    },
    contact: {
      title: "Contact",
      lead:
        "Based in Berlin, Germany. Here are a few ways to connect and learn more about my work:",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      emailLabel: "Email",
    },
    languageToggleLabel: "Switch language",
  },
  de: {
    nav: {
      about: "Über mich",
      experience: "Erfahrung",
      contact: "Kontakt",
    },
    hero: {
      subtitle:
        "DataOps Consultant / Analytics Engineer",
      intro: [
        "Ich baue zuverlässige Datenplattformen und mache Daten zu nutzbaren Erkenntnissen.",
      ],
      primaryCta: "Kontakt",
      secondaryCta: "Erfahrung ansehen",
    },
    about: {
      title: "Über mich",
      lead:
        "Ich arbeite an der Schnittstelle von Datenzuverlässigkeit, Plattformbetrieb und Analytics. Von ETL-Monitoring und Release-Koordination bis zu SQL-Entwicklung, Dashboards und angewandter Data Science.",
      points: [
        "Praxis in Banken, FMCG und regulierten produktiven Datenumgebungen.",
        "Stärken in BI- und DWH-Betrieb, SQL- und PL/SQL-Umsetzung sowie Release-Stabilität.",
        "Ich setze Analytics und Machine Learning ein, wenn ein Problem mehr als Reporting braucht.",
        "Ich helfe Teams, stabile Releases und verlässliches Reporting zu liefern.",
      ],
    },
    skills: {
      title: "Kompetenzen",
      lead:
        "Eine praxisnahe Mischung aus Plattformzuverlässigkeit, Data Engineering, BI-Umsetzung und angewandter Analytics.",
      groups: [
        {
          title: "Zuverlässigkeit & Betrieb",
          items: [
            "ETL- / Batch-Monitoring",
            "Release-Koordination",
            "Regressionstests",
            "Patch- & Change-Management",
            "Tomcat- / Plattformbetrieb",
            "Incident-Koordination",
            "Produktionsreife",
          ],
        },
        {
          title: "Data Engineering & BI",
          items: [
            "SQL / PL/SQL / T-SQL",
            "ETL- / ELT-Pipelines",
            "DWH-Workflows",
            "Reporting-Pipelines",
            "Dashboard-Entwicklung",
            "Systemübergreifende Abstimmung",
            "CI/CD für Daten-Workflows",
          ],
        },
        {
          title: "Analytics & Data Science",
          items: [
            "Trend- / Mustererkennung",
            "Anomalieerkennung",
            "NLP- / Screening-Modelle",
            "Fraud-Detection-Projekte",
            "Clustering / Machine Learning",
            "Business-Insight-Gewinnung",
          ],
        },
      ],
    },
    experience: {
      title: "Erfahrung",
      lead:
        "Aktuelle Rollen in DataOps-Consulting, Analytics Engineering, DWH-Betrieb und Support für Datenplattformen.",
      timelineLabel: "Karriereverlauf",
      skillsLabel: "Kernkompetenzen",
      highlightsLabel: "Aufgabenschwerpunkte",
    },
    contact: {
      title: "Kontakt",
      lead:
        "Standort Berlin, Deutschland. Hier sind ein paar Wege, um mit mir in Kontakt zu treten und mehr über meine Arbeit zu erfahren:",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      emailLabel: "E-Mail",
    },
    languageToggleLabel: "Sprache wechseln",
  },
};
