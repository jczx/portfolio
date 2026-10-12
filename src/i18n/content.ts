export type Language = "en" | "de";

type Copy = {
  nav: {
    about: string;
    work: string;
    experience: string;
    skills: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    headline: string[];
    intro: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    title: string;
    lead: string[];
    points: string[];
  };
  whatIDo: {
    indexLabel: string;
    title: string;
    lead: string;
    cards: Array<{
      title: string;
      lines: string[];
    }>;
  };
  skills: {
    indexLabel: string;
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
    focusLabel: string;
    highlightsLabel: string;
    clientsLabel: string;
  };
  contact: {
    indexLabel: string;
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
      work: "Projects",
      experience: "Experience",
      skills: "Skills",
      contact: "Contact"
    },
    hero: {
      eyebrow: "Julio Caesar · Berlin",
      headline: [
        "Data & Analytics",
        "Professional"
      ],
      intro: [
        "Business Intelligence Consultant at InfoFabrik. I use data to answer business questions, solve complex problems, and support informed decisions."
      ],
      primaryCta: "Explore my work",
      secondaryCta: "Get in touch"
    },
    about: {
      title: "About me",
      lead: [
        "My background spans analytics and data engineering, alongside experience guiding teams and coordinating technical projects from business requirements to implementation.",
        "Alongside my work, I’m pursuing a part-time Data Science master’s focused on finance and insurance management."
      ],
      points: [
        "Part-time MSc in Data Science. Expected completion: summer 2027.",
        "Based in Berlin. Fluent in German and English; native Indonesian."
      ]
    },
    whatIDo: {
      indexLabel: "02 / Focus",
      title: "Areas of expertise",
      lead: "Reporting, data quality, and platform operations.",
      cards: [
        {
          title: "Reporting & reconciliation",
          lines: [
            "End-to-end reporting and data integration for development banks.",
            "Budget analysis, reconciliation, and plausibility checks across systems."
          ]
        },
        {
          title: "Data quality & protection",
          lines: [
            "Regression testing and validation against business requirements.",
            "SQL-based anonymisation and pseudonymisation, from rule definition to result validation."
          ]
        },
        {
          title: "Platform operations",
          lines: [
            "DWH, database performance, and batch process monitoring.",
            "ReportServer and Tomcat administration, log analysis, and patch coordination."
          ]
        }
      ]
    },
    skills: {
      indexLabel: "04 / Skills",
      title: "Tools & methods",
      lead: "From business questions to analysis, delivery, and operations.",
      groups: [
        {
          label: "Programming",
          items: [
            "Python",
            "SQL / PL/SQL",
            "Java",
            "Groovy",
            "VBScript"
          ]
        },
        {
          label: "BI & analytics",
          items: [
            "Tableau",
            "ReportServer",
            "A/B testing",
            "Budget analysis"
          ]
        },
        {
          label: "Data platforms",
          items: [
            "Oracle",
            "PostgreSQL",
            "SQL Server",
            "BigQuery",
            "GCP / Cloud Storage",
            "Azure"
          ]
        },
        {
          label: "DevOps & DataOps",
          items: [
            "Airflow",
            "Tomcat",
            "Releases",
            "Batch monitoring",
            "Performance tuning"
          ]
        },
        {
          label: "Data quality & screening",
          items: [
            "Regression testing",
            "Reconciliation",
            "Sanctions screening",
            "Anonymisation",
            "Pseudonymisation"
          ]
        },
        {
          label: "Data science · studies",
          items: [
            "Regression / classification",
            "XGBoost",
            "Anomaly detection",
            "Clustering",
            "Model evaluation",
            "Statistics"
          ]
        }
      ]
    },
    projects: {
      title: "Selected work",
      lead: "Solving practical problems through analytics, data science, and technical ownership."
    },
    experience: {
      title: "Experience",
      lead: "Business analytics, data engineering, and delivery across teams.",
      timelineLabel: "Career timeline",
      focusLabel: "Tools & focus",
      highlightsLabel: "Responsibilities",
      clientsLabel: "Client engagements"
    },
    contact: {
      indexLabel: "05 / Contact",
      title: "Let’s connect",
      lead: "For data science, analytics, and technical delivery opportunities, contact me by email or LinkedIn.",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      emailLabel: "Email me"
    },
    languageToggleLabel: "Switch language"
  },
  de: {
    nav: {
      about: "Profil",
      work: "Projekte",
      experience: "Erfahrung",
      skills: "Skills",
      contact: "Kontakt"
    },
    hero: {
      eyebrow: "Julio Caesar · Berlin",
      headline: [
        "Data & Analytics",
        "Professional"
      ],
      intro: [
        "Business Intelligence Consultant bei InfoFabrik. Ich nutze Daten, um Geschäftsfragen zu beantworten, komplexe Probleme zu lösen und fundierte Entscheidungen zu unterstützen."
      ],
      primaryCta: "Projekte ansehen",
      secondaryCta: "Kontakt aufnehmen"
    },
    about: {
      title: "Über mich",
      lead: [
        "Mein Hintergrund umfasst Analytics und Data Engineering sowie Erfahrung in der fachlichen Anleitung von Teams und der Koordination technischer Projekte – von den Geschäftsanforderungen bis zur Umsetzung.",
        "Neben meiner Arbeit absolviere ich einen berufsbegleitenden Master in Data Science mit Fokus auf Finanz- und Versicherungsmanagement."
      ],
      points: [
        "Berufsbegleitender MSc in Data Science. Geplanter Abschluss: Sommer 2027.",
        "In Berlin zu Hause. Deutsch und Englisch fließend; Indonesisch als Muttersprache."
      ]
    },
    whatIDo: {
      indexLabel: "02 / Schwerpunkte",
      title: "Meine Schwerpunkte",
      lead: "Reporting, Datenqualität und Plattformbetrieb.",
      cards: [
        {
          title: "Reporting & Abstimmung",
          lines: [
            "End-to-End-Reporting und Datenintegration für Förderbanken.",
            "Systemübergreifende Budgetauswertung, Abstimmung und Plausibilitätsprüfungen."
          ]
        },
        {
          title: "Datenqualität & Datenschutz",
          lines: [
            "Regressionstests und Validierung anhand fachlicher Anforderungen.",
            "Anonymisierung und Pseudonymisierung mit SQL, von der Regeldefinition bis zur Ergebnisvalidierung."
          ]
        },
        {
          title: "Plattformbetrieb",
          lines: [
            "Überwachung von DWH, Datenbankleistung und Batch-Prozessen.",
            "ReportServer- und Tomcat-Administration, Log-Analyse und Patch-Koordination."
          ]
        }
      ]
    },
    skills: {
      indexLabel: "04 / Tools & Methoden",
      title: "Tools & Methoden",
      lead: "Von der Geschäftsfrage über die Analyse bis zur Umsetzung und zum Betrieb.",
      groups: [
        {
          label: "Programmierung",
          items: [
            "Python",
            "SQL / PL/SQL",
            "Java",
            "Groovy",
            "VBScript"
          ]
        },
        {
          label: "BI & Analytics",
          items: [
            "Tableau",
            "ReportServer",
            "A/B-Tests",
            "Budgetanalyse"
          ]
        },
        {
          label: "Datenplattformen",
          items: [
            "Oracle",
            "PostgreSQL",
            "SQL Server",
            "BigQuery",
            "GCP / Cloud Storage",
            "Azure"
          ]
        },
        {
          label: "DevOps & DataOps",
          items: [
            "Airflow",
            "Tomcat",
            "Releases",
            "Batch-Monitoring",
            "Performance-Tuning"
          ]
        },
        {
          label: "Datenqualität & Screening",
          items: [
            "Regressionstests",
            "Datenabstimmung",
            "Sanktionsscreening",
            "Anonymisierung",
            "Pseudonymisierung"
          ]
        },
        {
          label: "Data Science · Studium",
          items: [
            "Regression / Klassifikation",
            "XGBoost",
            "Anomalieerkennung",
            "Clustering",
            "Modellbewertung",
            "Statistik"
          ]
        }
      ]
    },
    projects: {
      title: "Ausgewählte Arbeiten",
      lead: "Praktische Probleme durch Analytics, Data Science und technische Verantwortung lösen."
    },
    experience: {
      title: "Erfahrung",
      lead: "Business Analytics, Data Engineering und teamübergreifende Umsetzung.",
      timelineLabel: "Karriereverlauf",
      focusLabel: "Tools & Schwerpunkte",
      highlightsLabel: "Aufgabenschwerpunkte",
      clientsLabel: "Kundenprojekte"
    },
    contact: {
      indexLabel: "05 / Kontakt",
      title: "Kontakt",
      lead: "Für Positionen in Data Science, Analytics und technischer Projektverantwortung erreichen Sie mich per E-Mail oder LinkedIn.",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      emailLabel: "E-Mail schreiben"
    },
    languageToggleLabel: "Sprache wechseln"
  }
};
