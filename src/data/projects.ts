import type { Language } from "../i18n/content";

export type Project = {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  focus: string[];
  highlights: string[];
  clients?: string[];
  responsibilities?: Array<{ label: string; detail: string }>;
};

export const projectsByLanguage: Record<Language, Project[]> = {
  en: [
    {
      title: "Business Intelligence Consultant",
      company: "InfoFabrik GmbH",
      location: "Berlin, Germany",
      period: "November 2024 to Present",
      description:
        "Translate business requirements into reporting solutions for German development banks, with responsibility for data quality, releases, and reliable BI operations.",
      clients: [
        "Investitionsbank Berlin (IBB)",
        "Investitions- und Förderbank Niedersachsen – NBank",
      ],
      focus: [
        "Oracle",
        "PL/SQL",
        "ReportServer",
        "Tomcat",
        "Azure",
        "Microsoft SQL Server",
        "Python",
        "VBScript (VBS)",
        "Java",
        "Groovy",
      ],
      highlights: [],
      responsibilities: [
        {
          label: "Reporting & data integration",
          detail: "Develop reporting solutions from business requirements through source integration, data preparation, and delivery.",
        },
        {
          label: "Regression testing & discrepancy analysis",
          detail: "Test code and releases for unintended changes. Investigate data and reporting discrepancies in test and production environments.",
        },
        {
          label: "Financial data validation",
          detail: "Analyse budgets and reconcile figures across systems. Investigate technical and business discrepancies and perform plausibility checks.",
        },
        {
          label: "Screening & data protection",
          detail: "Support sanctions screening. Define anonymisation and pseudonymisation rules, implement the SQL logic, and validate the results.",
        },
        {
          label: "DataOps & performance tuning",
          detail: "Monitor batch processes, data ingestion, and database performance. Coordinate issue resolution and tune processing performance.",
        },
        {
          label: "DevOps & release management",
          detail: "Coordinate releases and database, server, and Tomcat patches across test and production environments. Administer NBank’s ReportServer on Tomcat and analyse logs.",
        },
      ],
    },
    {
      title: "BI / Data Analyst",
      company: "Magaloop GmbH",
      location: "Berlin, Germany",
      period: "April 2021 to September 2024",
      description:
        "Delivered dashboards, product analytics, and data pipelines for product and customer reporting.",
      focus: [
        "Python",
        "SQL",
        "Airflow",
        "BigQuery",
        "Google Cloud (GCP)",
        "Google Cloud Storage",
        "PostgreSQL",
        "Tableau",
      ],
      highlights: [
        "Built Tableau dashboards and analysed product and customer trends to support business decisions.",
        "Built and maintained an ETL pipeline with Python and Airflow, using BigQuery and Google Cloud Storage on GCP.",
        "Analysed A/B test results to evaluate product changes.",
      ],
    },
    {
      title: "Accounting & E-Commerce Intern",
      company: "Hotel Santika Premiere Jakarta",
      location: "Jakarta, Indonesia",
      period: "November 2014 to May 2015",
      description:
        "Supported accounting and invoicing, with price comparison and exchange-rate analytics for e-commerce operations.",
      focus: ["Accounting", "Invoicing", "Price comparison analytics", "Exchange-rate analytics"],
      highlights: [],
    },
  ],
  de: [
    {
      title: "Business Intelligence Consultant",
      company: "InfoFabrik GmbH",
      location: "Berlin, Deutschland",
      period: "November 2024 bis heute",
      description:
        "Fachliche Anforderungen in Reporting-Lösungen für deutsche Förderbanken übersetzen und Verantwortung für Datenqualität, Releases und einen verlässlichen BI-Betrieb übernehmen.",
      clients: [
        "Investitionsbank Berlin (IBB)",
        "Investitions- und Förderbank Niedersachsen – NBank",
      ],
      focus: [
        "Oracle",
        "PL/SQL",
        "ReportServer",
        "Tomcat",
        "Azure",
        "Microsoft SQL Server",
        "Python",
        "VBScript (VBS)",
        "Java",
        "Groovy",
      ],
      highlights: [],
      responsibilities: [
        {
          label: "Reporting & Datenintegration",
          detail: "Reporting-Lösungen von der fachlichen Anforderung über Quellenanbindung und Datenaufbereitung bis zur Bereitstellung entwickeln.",
        },
        {
          label: "Regressionstests & Abweichungsanalyse",
          detail: "Codeänderungen und Releases auf unbeabsichtigte Auswirkungen prüfen. Abweichungen in Daten und im Reporting in Test- und Produktionsumgebungen untersuchen.",
        },
        {
          label: "Validierung von Finanzdaten",
          detail: "Budgets auswerten und Zahlen systemübergreifend abstimmen. Technische und fachliche Abweichungen untersuchen und Plausibilitätsprüfungen durchführen.",
        },
        {
          label: "Screening & Datenschutz",
          detail: "Sanktionsscreening unterstützen. Regeln zur Anonymisierung und Pseudonymisierung definieren, in SQL umsetzen und die Ergebnisse validieren.",
        },
        {
          label: "DataOps & Performance-Tuning",
          detail: "Batch-Prozesse, Datenimporte und Datenbankleistung überwachen. Die Behebung von Störungen koordinieren und die Verarbeitungsleistung optimieren.",
        },
        {
          label: "DevOps & Release-Management",
          detail: "Releases sowie Datenbank-, Server- und Tomcat-Patches in Test- und Produktionsumgebungen koordinieren. ReportServer der NBank auf Tomcat administrieren und Logs analysieren.",
        },
      ],
    },
    {
      title: "BI / Data Analyst",
      company: "Magaloop GmbH",
      location: "Berlin, Deutschland",
      period: "April 2021 bis September 2024",
      description:
        "Dashboards, Produktanalysen und Datenpipelines für das Produkt- und Kundenreporting umgesetzt.",
      focus: [
        "Python",
        "SQL",
        "Airflow",
        "BigQuery",
        "Google Cloud (GCP)",
        "Google Cloud Storage",
        "PostgreSQL",
        "Tableau",
      ],
      highlights: [
        "Tableau-Dashboards erstellt und Produkt- und Kundentrends als Grundlage für Geschäftsentscheidungen analysiert.",
        "Eine ETL-Pipeline mit Python und Airflow entwickelt und betreut, mit BigQuery und Google Cloud Storage auf GCP.",
        "Ergebnisse von A/B-Tests ausgewertet, um Produktänderungen zu bewerten.",
      ],
    },
    {
      title: "Praktikum Accounting & E-Commerce",
      company: "Hotel Santika Premiere Jakarta",
      location: "Jakarta, Indonesien",
      period: "November 2014 bis Mai 2015",
      description:
        "Buchhaltung und Rechnungsstellung unterstützt sowie Preisvergleichs- und Wechselkursanalysen für das E-Commerce-Geschäft durchgeführt.",
      focus: ["Buchhaltung", "Rechnungsstellung", "Preisvergleichsanalysen", "Wechselkursanalysen"],
      highlights: [],
    },
  ],
};
