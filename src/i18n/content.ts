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
        "DataOps / Analytics Engineer.",
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
            "ETL / batch monitoring",
            "release coordination",
            "regression testing",
            "patch & change management",
            "Tomcat / platform operations",
            "incident coordination",
            "production readiness",
          ],
        },
        {
          title: "Data Engineering & BI",
          items: [
            "SQL / PL/SQL / T-SQL",
            "ETL / ELT pipelines",
            "DWH workflows",
            "reporting pipelines",
            "dashboard development",
            "cross-system reconciliation",
            "CI/CD for data workflows",
          ],
        },
        {
          title: "Analytics & Data Science",
          items: [
            "trend / pattern detection",
            "anomaly detection",
            "NLP / screening models",
            "fraud detection projects",
            "clustering / machine learning",
            "business insight generation",
          ],
        },
      ],
    },
    experience: {
      title: "Experience",
      lead:
        "Recent roles across BI consulting, DWH operations, analytics, and data platform support.",
      timelineLabel: "Career timeline",
      skillsLabel: "Key skills",
      highlightsLabel: "Role highlights",
    },
    contact: {
      title: "Contact",
      lead:
        "Based in Berlin, Germany. Connect on LinkedIn or explore code and side projects on GitHub.",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      emailLabel: "Email",
    },
    languageToggleLabel: "Switch language",
  },
  de: {
    nav: {
      about: "Uber mich",
      experience: "Erfahrung",
      contact: "Kontakt",
    },
    hero: {
      subtitle:
        "Ich arbeite dort, wo Datenplattformen, BI-Betrieb und Produktionsstabilitat zusammenkommen.",
      intro: [
        "Ich baue stabile Systeme fur Analytics-Workflows — von SQL und Release-Koordination bis zu Produktionssupport und operativer Verbesserung.",
      ],
      primaryCta: "Kontakt",
      secondaryCta: "Erfahrung ansehen",
    },
    about: {
      title: "Uber mich",
      lead:
        "Ich arbeite am besten in Umgebungen, in denen Analytics, Infrastruktur und operative Disziplin verlasslich zusammenspielen mussen.",
      points: [
        "Praxis in Banken, FMCG und regulierten produktiven Datenumgebungen.",
        "Starke in BI- und DWH-Betrieb, SQL- und PL/SQL-Umsetzung sowie Release-Stabilitat.",
        "Verantwortungsvolle Arbeitsweise mit Testfokus, klarer Kommunikation und sauberer Ubergabe.",
      ],
    },
    skills: {
      title: "Kompetenzen",
      lead:
        "Eine praxisnahe Mischung aus Datenplattform-Support, BI- und DWH-Betrieb sowie delivery-orientierter Umsetzung.",
      groups: [
        {
          title: "Betrieb",
          items: ["Produktivsupport", "Release-Koordination", "Regressionstests", "Patch-Management", "Monitoring"],
        },
        {
          title: "Daten & BI",
          items: ["SQL", "PL/SQL", "ETL / ELT", "Oracle", "SAP BW", "ReportServer"],
        },
        {
          title: "Umsetzung",
          items: ["CI/CD", "Stakeholder-Kommunikation", "Operative Verbesserung", "Analytics-Workflows", "Zuverlassigkeit"],
        },
      ],
    },
    experience: {
      title: "Erfahrung",
      lead:
        "Aktuelle Rollen in BI-Consulting, DWH-Betrieb, Analytics und Support fur Datenplattformen.",
      timelineLabel: "Karriereverlauf",
      skillsLabel: "Kernkompetenzen",
      highlightsLabel: "Aufgabenschwerpunkte",
    },
    contact: {
      title: "Kontakt",
      lead:
        "Standort Berlin, Deutschland. Vernetze dich auf LinkedIn oder sieh dir Code und Nebenprojekte auf GitHub an.",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      emailLabel: "E-Mail",
    },
    languageToggleLabel: "Sprache wechseln",
  },
};
