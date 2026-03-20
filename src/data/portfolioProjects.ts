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
  tone: "finance" | "nlp" | "ops";
};

export const portfolioProjectsByLanguage: Record<Language, PortfolioProject[]> = {
  en: [
    {
      eyebrow: "Public Company Analysis",
      status: "Analysis",
      title: "Hyperscaler Capital Discipline",
      summary:
        "SEC-only market analysis on how aggressively hyperscalers increased capital intensity without preserving the same cash discipline.",
      highlights: [
        "Official-source metrics only",
        "Interactive finance case study",
      ],
      tech: ["SEC XBRL", "TypeScript", "Visualization"],
      actionLabel: "Open project",
      href: "?case=hyperscaler-capital-discipline",
      tone: "finance",
    },
    {
      eyebrow: "NLP / Entity Resolution",
      status: "Matcher",
      title: "EU Sanctions Name Match Explorer",
      summary:
        "A cautious name-matching demo that ranks candidate matches, alias evidence, and explanation signals instead of giving a fake compliance verdict.",
      highlights: [
        "Explainable similarity scoring",
        "Human-review output only",
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
        "Download-parse-publish checks",
        "Source freshness and coverage monitoring",
      ],
      tech: ["Node.js", "ETL", "Observability"],
      actionLabel: "Open project",
      href: "?case=sanctions-pipeline-monitor",
      tone: "ops",
    },
  ],
  de: [
    {
      eyebrow: "Public-Company-Analyse",
      status: "Analyse",
      title: "Kapitaldisziplin bei Hyperscalern",
      summary:
        "SEC-basierte Marktanalyse dazu, wie stark Hyperscaler ihre Kapitalintensität erhöht haben, ohne dieselbe Cash-Disziplin zu bewahren.",
      highlights: [
        "Nur offizielle Kennzahlen",
        "Interaktive Finanz-Fallstudie",
      ],
      tech: ["SEC XBRL", "TypeScript", "Visualisierung"],
      actionLabel: "Projekt öffnen",
      href: "?case=hyperscaler-capital-discipline",
      tone: "finance",
    },
    {
      eyebrow: "NLP / Entity Resolution",
      status: "Matcher",
      title: "EU-Sanktionslisten Name Match Explorer",
      summary:
        "Ein vorsichtiges Name-Matching-Demo, das Kandidaten, Alias-Hinweise und Erklärsignale priorisiert, statt ein künstliches Compliance-Urteil auszugeben.",
      highlights: [
        "Erklärbares Similarity Scoring",
        "Nur Human-Review-Ausgabe",
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
        "Download-Parse-Publish-Checks",
        "Source-Freshness und Coverage-Monitoring",
      ],
      tech: ["Node.js", "ETL", "Observability"],
      actionLabel: "Projekt öffnen",
      href: "?case=sanctions-pipeline-monitor",
      tone: "ops",
    },
  ],
};
