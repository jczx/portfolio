export type Language = "en" | "de";

type Copy = {
  nav: {
    about: string;
    analysis: string;
    experience: string;
    contact: string;
  };
  hero: {
    headline: string[];
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
      label: string;
      items: string[];
    }>;
  };
  projects: {
    title: string;
    lead: string;
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
      analysis: "Case Studies",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      headline: ["Reliable data.", "Better decisions."],
      intro: [
        "I build reliable data systems and AI-powered solutions that transform raw data into business impact.",
      ],
      primaryCta: "View Case Studies",
      secondaryCta: "Get in Touch",
    },
    about: {
      title: "About",
      lead:
        "I work at the intersection of data engineering, analytics, and AI-powered automation - from SQL and reporting workflows to intelligent systems that help teams make better decisions.",
      points: [
        "Hands-on experience across banking, FMCG, and regulated production data environments.",
        "Core strengths in analytics engineering, DWH operations, SQL/Python development, and cloud-based data platforms.",
        "I apply analytics, automation, and machine learning when the problem needs more than standard analytics.",
        "I help teams deliver stable releases, trustworthy reporting, and smarter data-driven workflows.",
      ],
    },
    skills: {
      title: "Expertise & Toolkit",
      lead:
        "A practical stack for building reliable data platforms, AI-powered workflows, and decision-ready analytics.",
      groups: [
        {
          label: "Data Engineering",
          items: [
            "Reliable, efficient & scalable data pipelines",
            "Data quality & validation",
            "Batch processing & monitoring",
            "High-performance DWH architecture & tuning",
          ],
        },
        {
          label: "Analytics & BI",
          items: [
            "Advanced analytics & data modeling",
            "Requirements & stakeholder management",
            "Business & financial analysis",
            "KPI dashboards, regulatory & executive reporting",
          ],
        },
        {
          label: "AI & Automation",
          items: [
            "ML, NLP & generative AI solutions",
            "RAG & agentic AI workflows",
            "Model pipelines, evaluation & monitoring",
            "AI integration, security & compliance",
          ],
        },
      ],
    },
    projects: {
      title: "Case Studies",
      lead:
        "Two sanctions-focused case studies across entity resolution and operational data reliability.",
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
      analysis: "Fallstudien",
      experience: "Erfahrung",
      contact: "Kontakt",
    },
    hero: {
      headline: ["Verlässliche Daten.", "Bessere Entscheidungen."],
      intro: [
        "Ich entwickle verlässliche Datensysteme und KI-gestützte Lösungen, die Rohdaten in messbaren Geschäftsnutzen verwandeln.",
      ],
      primaryCta: "Fallstudien ansehen",
      secondaryCta: "Kontakt aufnehmen",
    },
    about: {
      title: "Über mich",
      lead:
        "Ich arbeite an der Schnittstelle von Data Engineering, Analytics und KI-gestützter Automatisierung – von SQL- und Reporting-Workflows bis zu intelligenten Systemen, die Teams bessere Entscheidungen ermöglichen.",
      points: [
        "Praxiserfahrung in Banken, FMCG und regulierten produktiven Datenumgebungen.",
        "Kernkompetenzen in Analytics Engineering, DWH-Betrieb, SQL/Python-Entwicklung und cloudbasierten Datenplattformen.",
        "Ich setze Analytics, Automatisierung und Machine Learning ein, wenn Standardanalysen nicht ausreichen.",
        "Ich helfe Teams, stabile Releases, vertrauenswürdiges Reporting und intelligentere datengetriebene Workflows bereitzustellen.",
      ],
    },
    skills: {
      title: "Expertise & Toolkit",
      lead:
        "Ein praxisnaher Stack für verlässliche Datenplattformen, KI-gestützte Workflows und entscheidungsreife Analysen.",
      groups: [
        {
          label: "Data Engineering",
          items: [
            "Zuverlässige, effiziente und skalierbare Datenpipelines",
            "Datenqualität und Validierung",
            "Batch-Verarbeitung und Monitoring",
            "Leistungsstarke DWH-Architektur und Optimierung",
          ],
        },
        {
          label: "Analytics & BI",
          items: [
            "Fortgeschrittene Analysen und Datenmodellierung",
            "Anforderungs- und Stakeholder-Management",
            "Geschäfts- und Finanzanalyse",
            "KPI-Dashboards sowie regulatorisches und Executive Reporting",
          ],
        },
        {
          label: "AI & Automation",
          items: [
            "ML-, NLP- und generative KI-Lösungen",
            "RAG- und agentische KI-Workflows",
            "Modellpipelines, Evaluation und Monitoring",
            "KI-Integration, Sicherheit und Compliance",
          ],
        },
      ],
    },
    projects: {
      title: "Fallstudien",
      lead:
        "Zwei sanktionsbezogene Fallstudien zu Entity Resolution und operativer Datenzuverlässigkeit.",
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
        "Standort Berlin, Deutschland. Hier sind einige Wege, um mit mir in Kontakt zu treten und mehr über meine Arbeit zu erfahren:",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      emailLabel: "E-Mail",
    },
    languageToggleLabel: "Sprache wechseln",
  },
};
