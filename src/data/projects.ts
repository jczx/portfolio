export type Project = {
  title: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    title: "DevOps Consultant (Data Platform / DWH)",
    company: "InfoFabrik GmbH",
    period: "January 2026 to Present",
    description:
      "Operating and stabilizing BI and DWH environments with release coordination, patch management, regression testing, and production support.",
    tech: ["DWH Operations", "Release Management", "Tomcat", "Oracle", "BI Reporting"],
    highlights: [
      "Led patch and change management activities to keep environments stable and compliant.",
      "Coordinated regression testing before production deployments and validated core BI and DWH workflows.",
      "Owned day-to-day operations for Operatives to DWH landscapes, including nightly batch and ETL monitoring.",
      "Planned releases, deployment windows, stakeholder communication, and rollback readiness.",
    ],
  },
  {
    title: "Business Intelligence Consultant",
    company: "InfoFabrik GmbH",
    period: "November 2024 to December 2025",
    description:
      "End-to-end BI consulting for German state development banks, covering delivery, SQL development, ELT pipelines, validation workflows, and secure reporting.",
    tech: ["SQL", "PL/SQL", "CI/CD", "ETL/ELT", "SAP BW", "ReportServer"],
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
    tech: ["Python", "SQL", "BigQuery", "ETL", "Analytics"],
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
    tech: ["Python", "SQL", "Dashboards", "Analytics"],
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
];
