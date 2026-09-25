import type { Language } from "../i18n/content";

export type PortfolioProject = {
  eyebrow: string;
  status: string;
  title: string;
  summary: string;
  highlights: string[];
  tech: string[];
  actionLabel?: string;
  href?: string;
  tone: "nlp" | "ops" | "music";
};

export const portfolioProjectsByLanguage: Record<Language, PortfolioProject[]> = {
  en: [
    {
      eyebrow: "NLP / Entity Resolution",
      status: "Matcher",
      title: "EU Sanctions Name Match Explorer",
      summary:
        "A cautious name-matching demo that ranks candidate matches, alias evidence, and explanation signals instead of giving a fake compliance verdict.",
      highlights: [
        "Explainable similarity scoring",
        "Official FSF XML dataset",
      ],
      tech: ["NLP", "Levenshtein", "TypeScript"],
      actionLabel: "Open project",
      href: "?case=eu-sanctions-name-match",
      tone: "nlp",
    },
    {
      eyebrow: "DataOps / Reliability",
      status: "Monitor",
      title: "Sanctions Pipeline Reliability Monitor",
      summary:
        "An operations case study for the same FSF ingestion flow: source freshness, parse health, publish status, and alias-coverage checks.",
      highlights: [
        "5,994 official records monitored",
        "Source freshness and coverage monitoring",
      ],
      tech: ["Node.js", "ETL", "Observability"],
      actionLabel: "Open project",
      href: "?case=sanctions-pipeline-monitor",
      tone: "ops",
    },

    {
      eyebrow: "Personal side project",
      status: "Interactive app",
      title: "Caesar Guitar Lab",
      summary: "An interactive guitar neck for identifying chords, exploring voicings, and practising scales.",
      highlights: ["20 chord types across 24 frets", "Scale playback and note-finding practice"],
      tech: ["React", "TypeScript", "Web Audio"],
      actionLabel: "Open Guitar Lab",
      href: "./caesar-guitar-lab/",
      tone: "music",
    },
  ],
  de: [
    {
      eyebrow: "NLP / Entity Resolution",
      status: "Matcher",
      title: "EU-Sanktionslisten Name Match Explorer",
      summary:
        "Eine vorsichtige Name-Matching-Demo, die Kandidaten, Alias-Hinweise und Erklärungssignale priorisiert, statt ein künstliches Compliance-Urteil auszugeben.",
      highlights: [
        "Erklärbares Similarity Scoring",
        "Offizieller FSF-XML-Datensatz",
      ],
      tech: ["NLP", "Levenshtein", "TypeScript"],
      actionLabel: "Projekt öffnen",
      href: "?case=eu-sanctions-name-match",
      tone: "nlp",
    },
    {
      eyebrow: "DataOps / Reliability",
      status: "Monitor",
      title: "Sanctions Pipeline Reliability Monitor",
      summary:
        "Eine Betriebs-Fallstudie für denselben FSF-Ingestion-Flow: Source Freshness, Parse-Gesundheit, Publish-Status und Alias-Coverage-Checks.",
      highlights: [
        "5.994 offizielle EintrÃ¤ge Ã¼berwacht",
        "Source-Freshness und Coverage-Monitoring",
      ],
      tech: ["Node.js", "ETL", "Observability"],
      actionLabel: "Projekt öffnen",
      href: "?case=sanctions-pipeline-monitor",
      tone: "ops",
    },
    {
      eyebrow: "Persönliches Nebenprojekt",
      status: "Interaktive App",
      title: "Caesar Guitar Lab",
      summary: "Ein interaktives Gitarrengriffbrett, um Akkorde zu erkennen, Griffvarianten zu erkunden und Tonleitern zu üben.",
      highlights: ["20 Akkordtypen auf 24 Bünden", "Tonleitern anhören und Noten finden"],
      tech: ["React", "TypeScript", "Web Audio"],
      actionLabel: "Guitar Lab öffnen",
      href: "./caesar-guitar-lab/",
      tone: "music",
    },
  ],
};
