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
  secondaryAction?: { label: string; href: string };
  tone: "nlp" | "science" | "ops" | "community" | "music";
};

export const portfolioProjectsByLanguage: Record<Language, PortfolioProject[]> = {
  en: [
    {
      eyebrow: "Entity matching",
      status: "Public demos",
      title: "Sanctions screening",
      summary: "Name matching and pipeline monitoring using the official EU sanctions list.",
      highlights: [
        "Compare spelling variants and aliases.",
        "Inspect the evidence behind candidate matches.",
        "Check source age, ingestion status, and alias coverage."
      ],
      tech: [
        "NLP",
        "Levenshtein",
        "TypeScript",
        "Node.js"
      ],
      actionLabel: "Open the matcher",
      href: "./sanctions-matcher.html",
      secondaryAction: { label: "View pipeline status", href: "./sanctions-monitor.html" },
      tone: "nlp"
    },
    {
      eyebrow: "Data science",
      status: "Case study coming soon",
      title: "Credit card fraud detection",
      summary: "Credit card fraud detection using XGBoost. Project details and model evaluation to follow.",
      highlights: [],
      tech: ["Python", "XGBoost"],
      tone: "science"
    },
    {
      eyebrow: "Pro bono",
      status: "In progress",
      title: "GBI Berlin Serve",
      summary: "A pro bono app for church analytics and shared calendars.",
      highlights: [
        "Attendance KPIs, people insights, and role-based access.",
        "Own architecture, SQL reporting, and deployment."
      ],
      tech: [
        "Next.js",
        "Supabase",
        "PostgreSQL",
        "Render"
      ],
      tone: "community"
    },
    {
      eyebrow: "Personal side project",
      status: "Interactive app",
      title: "Caesar’s Fret Lab",
      summary: "An interactive guitar neck for identifying chords, exploring voicings, and practising scales.",
      highlights: ["20 chord types across 24 frets", "Scale playback and note-finding practice"],
      tech: ["React", "TypeScript", "Web Audio"],
      actionLabel: "Open Fret Lab",
      href: "./caesar-guitar-lab/",
      tone: "music",
    },
  ],
  de: [
    {
      eyebrow: "Namensabgleich",
      status: "Öffentliche Demos",
      title: "Sanktionsscreening",
      summary: "Namensabgleich und Pipeline-Monitoring mit der offiziellen EU-Sanktionsliste.",
      highlights: [
        "Schreibvarianten und Aliasse vergleichen.",
        "Die Hinweise hinter möglichen Treffern nachvollziehen.",
        "Quelldatum, Importstatus und Alias-Abdeckung prüfen."
      ],
      tech: [
        "NLP",
        "Levenshtein",
        "TypeScript",
        "Node.js"
      ],
      actionLabel: "Namensabgleich öffnen",
      href: "./sanctions-matcher.html",
      secondaryAction: { label: "Pipeline-Status ansehen", href: "./sanctions-monitor.html" },
      tone: "nlp"
    },
    {
      eyebrow: "Data Science",
      status: "Projektbeschreibung folgt",
      title: "Erkennung von Kreditkartenbetrug",
      summary: "Kreditkartenbetrug mit XGBoost erkennen. Projektbeschreibung und Modellbewertung folgen.",
      highlights: [],
      tech: ["Python", "XGBoost"],
      tone: "science"
    },
    {
      eyebrow: "Pro bono",
      status: "In Arbeit",
      title: "GBI Berlin Serve",
      summary: "Eine Pro-bono-App mit Dashboards und gemeinsamen Kalendern für die Gemeindeleitung.",
      highlights: [
        "Anwesenheits-KPIs, Einblicke in die Gemeinde und rollenbasierter Zugriff.",
        "Verantwortung für Architektur, SQL-Reporting und Deployment."
      ],
      tech: [
        "Next.js",
        "Supabase",
        "PostgreSQL",
        "Render"
      ],
      tone: "community"
    },
    {
      eyebrow: "Persönliches Nebenprojekt",
      status: "Interaktive App",
      title: "Caesar’s Fret Lab",
      summary: "Ein interaktives Gitarrengriffbrett, um Akkorde zu erkennen, Griffvarianten zu erkunden und Tonleitern zu üben.",
      highlights: ["20 Akkordtypen auf 24 Bünden", "Tonleitern anhören und Noten finden"],
      tech: ["React", "TypeScript", "Web Audio"],
      actionLabel: "Fret Lab öffnen",
      href: "./caesar-guitar-lab/",
      tone: "music",
    },
  ]
};
