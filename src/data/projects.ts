import type { Language } from "../i18n/content";

export type Project = {
  title: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  highlights: string[];
};

export const projectsByLanguage: Record<Language, Project[]> = {
  en: [
    {
      title: "DataOps Consultant / Analytics Engineer",
      company: "InfoFabrik GmbH",
      period: "January 2026 to Present",
      description:
        "Consulting on and stabilizing BI and DWH environments with release coordination, patch management, regression testing, production support, and analytics engineering delivery.",
      tech: ["DWH Operations", "Release Management", "Tomcat", "Oracle", "Azure", "SAP BW", "SAP ABAKUS"],
      highlights: [
        "Led patch and change management activities ensuring stable and compliant environments.",
        "Coordinated regression testing for BI and DWH workflows to reduce release risk and improve production readiness.",
        "Owned day-to-day operations for Operatives to DWH landscapes, including nightly batch and ETL monitoring.",
        "Planned releases, deployment windows, stakeholder communication, and rollback readiness.",
        "Designed and implemented end-to-end data pipelines and monitoring dashboards, including data integration, processing, and visualization.",
      ],
    },
    {
      title: "Junior Business Intelligence Consultant",
      company: "InfoFabrik GmbH",
      period: "November 2024 to December 2025",
      description:
        "End-to-end BI consulting for German state development banks, covering delivery, SQL development, ELT pipelines, validation workflows, and secure reporting.",
      tech: ["Oracle", "PL/SQL", "CI/CD", "Azure", "ETL/ELT", "SAP BW", "ReportServer", "Levenshtein"],
      highlights: [
        "Developed and optimized SQL logic, procedures, and performance tuning workflows.",
        "Built CI and CD pipelines for DWH development and implemented plausibility validation for funding applications.",
        "Developed an automated ELT process and NLP-based sanctions screening workflow.",
        "Designed ETL and ELT pipelines and migrated legacy data processing workflows.",
      ],
    },
    {
      title: "Business Intelligence / Data Analyst (Working Student)",
      company: "Magaloop GmbH",
      period: "December 2023 to September 2024",
      description:
        "Built analytics pipelines and pattern detection workflows with Python and SQL for FMCG data use cases.",
      tech: ["Python", "PostgreSQL", "BigQuery", "GCP", "ETL", "Analytics"],
      highlights: [
        "Developed and designed an ETL process from OneSignal to BigQuery.",
        "Implemented trend and pattern detection models using Python and SQL.",
        "Led a team of four in a data cleansing and integration project.",
      ],
    },
    {
      title: "Business Intelligence / Data Analyst (Intern)",
      company: "Magaloop GmbH",
      period: "September 2023 to December 2023",
      description:
        "Translated business requirements into technical specifications and delivered dashboards and analytical models for decision-making.",
      tech: ["Python", "PostgreSQL", "GCP", "Tableau", "Analytics"],
      highlights: [
        "Built interactive dashboards to visualize product journeys and market trends.",
        "Applied statistical and mathematical models in data analysis.",
        "Presented insights and dashboard findings directly to C-level executives.",
      ],
    },
    {
      title: "Data Management (Working Student)",
      company: "Magaloop GmbH",
      period: "April 2021 to September 2023",
      description:
        "Managed high-volume data operations and improved data quality across multiple systems.",
      tech: ["Data Quality", "Operations", "Master Data", "Risk Management"],
      highlights: [
        "Managed and processed high-volume data entries on a daily basis.",
        "Maintained data integrity across multiple databases.",
        "Led a team of three in a risk management project to improve master data quality.",
      ],
    },
  ],
  de: [
    {
      title: "DataOps-Berater / Analytics Engineer",
      company: "InfoFabrik GmbH",
      period: "Januar 2026 bis heute",
      description:
        "Beratung, Betrieb und Stabilisierung von BI- und DWH-Umgebungen mit Release-Koordination, Patch-Management, Regressionstests, Produktivsupport und Analytics-Engineering-Delivery.",
      tech: ["DWH-Betrieb", "Release-Management", "Tomcat", "Oracle", "Azure", "SAP BW", "SAP ABAKUS"],
      highlights: [
        "Steuerung von Patch- und Change-Management-Aktivitäten für stabile und konforme Umgebungen.",
        "Koordination von Regressionstests für BI- und DWH-Workflows, um Release-Risiken zu senken und die Produktionsreife zu verbessern.",
        "Verantwortung für den täglichen Betrieb von operativen bis DWH-Landschaften inklusive nächtlichem Batch- und ETL-Monitoring.",
        "Planung von Releases, Deployment-Fenstern, Stakeholder-Kommunikation und Rollback-Bereitschaft.",
        "Konzeption und Umsetzung von End-to-End-Datenpipelines und Monitoring-Dashboards für Integration, Verarbeitung und Visualisierung.",
      ],
    },
    {
      title: "Junior Business Intelligence Berater",
      company: "InfoFabrik GmbH",
      period: "November 2024 bis Dezember 2025",
      description:
        "Ganzheitliches BI-Consulting für deutsche Landesförderbanken mit Fokus auf Delivery, SQL-Entwicklung, ELT-Pipelines, Validierungs-Workflows und sicheres Reporting.",
      tech: ["Oracle", "PL/SQL", "CI/CD", "Azure", "ETL/ELT", "SAP BW", "ReportServer", "Levenshtein"],
      highlights: [
        "Entwicklung und Optimierung von SQL-Logik, Prozeduren und Performance-Tuning-Workflows.",
        "Aufbau von CI/CD-Pipelines für DWH-Entwicklung sowie Plausibilitätsprüfungen für Förderanträge.",
        "Entwicklung eines automatisierten ELT-Prozesses und eines NLP-basierten Sanktions-Screenings.",
        "Design von ETL- und ELT-Pipelines sowie Migration alter Datenverarbeitungsprozesse.",
      ],
    },
    {
      title: "Business Intelligence / Data Analyst (Werkstudent)",
      company: "Magaloop GmbH",
      period: "Dezember 2023 bis September 2024",
      description:
        "Aufbau von Analytics-Pipelines und Mustererkennungs-Workflows mit Python und SQL für FMCG-Datenanwendungen.",
      tech: ["Python", "PostgreSQL", "BigQuery", "GCP", "ETL", "Analytics"],
      highlights: [
        "Konzeption und Umsetzung eines ETL-Prozesses von OneSignal nach BigQuery.",
        "Implementierung von Trend- und Mustererkennungsmodellen mit Python und SQL.",
        "Leitung eines vierkopfigen Teams in einem Datenbereinigungs- und Integrationsprojekt.",
      ],
    },
    {
      title: "Business Intelligence / Data Analyst (Praktikum)",
      company: "Magaloop GmbH",
      period: "September 2023 bis Dezember 2023",
      description:
        "Übersetzung fachlicher Anforderungen in technische Spezifikationen sowie Lieferung von Dashboards und Analysemodellen für Entscheidungen.",
      tech: ["Python", "PostgreSQL", "GCP", "Tableau", "Analytics"],
      highlights: [
        "Entwicklung interaktiver Dashboards zur Visualisierung von Produktreisen und Markttrends.",
        "Anwendung statistischer und mathematischer Modelle in der Datenanalyse.",
        "Präsentation von Erkenntnissen und Dashboard-Ergebnissen direkt an C-Level-Führungskräfte.",
      ],
    },
    {
      title: "Data Management (Werkstudent)",
      company: "Magaloop GmbH",
      period: "April 2021 bis September 2023",
      description:
        "Steuerung von Datenoperationen mit hohem Volumen und Verbesserung der Datenqualität über mehrere Systeme hinweg.",
      tech: ["Datenqualität", "Operations", "Stammdaten", "Risikomanagement"],
      highlights: [
        "Tägliche Verarbeitung und Verwaltung großer Datenmengen.",
        "Sicherstellung der Datenintegrität über mehrere Datenbanken hinweg.",
        "Leitung eines dreiköpfigen Teams in einem Risikomanagement-Projekt zur Verbesserung der Stammdatenqualität.",
      ],
    },
  ],
};
