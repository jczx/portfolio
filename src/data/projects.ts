export type Project = {
  title: string;
  description: string;
  tech: string[];
  href: string;
};

export const projects: Project[] = [
  {
    title: "Data Pipeline",
    description:
      "A dashboard that tracks ETL jobs, alerts on failures, and shows run history.",
    tech: ["TypeScript", "React", "Sass"],
    href: "https://example.com",
  },
  {
    title: "ML Experiment Tracker",
    description:
      "A simple UI to log experiments, compare metrics, and keep notes for reproducibility.",
    tech: ["TypeScript", "React", "Vite"],
    href: "https://example.com",
  },
  {
    title: "DevOps Playbook",
    description:
      "A documentation site for CI/CD, deployments, and operational checklists.",
    tech: ["Markdown", "GitHub Actions", "Docs"],
    href: "https://example.com",
  },
];