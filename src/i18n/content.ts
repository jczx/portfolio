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
        "DevOps and operations support for BI, DWH, and analytics.",
      intro: [
        "I keep analytics environments reliable across releases, testing, and day-to-day operations.",
      ],
      primaryCta: "Get in touch",
      secondaryCta: "View experience",
    },
    about: {
      title: "About",
      lead:
        "I work best in execution-focused environments where consistency, communication, and follow-through matter.",
      points: [
        "Hands-on experience across banking, FMCG, and regulated production data environments.",
        "Core strengths in BI and DWH operations, SQL and PL/SQL implementation, and release reliability.",
        "Ownership mindset: testing discipline, stakeholder communication, and operational follow-through.",
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
