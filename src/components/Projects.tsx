import type { CSSProperties } from "react";
import { projectsByLanguage } from "../data/projects";
import ProjectCard from "./ProjectCard";
import type { Language } from "../i18n/content";

type ProjectsProps = {
  language: Language;
  copy: {
    title: string;
    lead: string;
    timelineLabel: string;
    focusLabel: string;
    highlightsLabel: string;
    clientsLabel: string;
  };
};

const Projects = ({ language, copy }: ProjectsProps) => {
  const projects = projectsByLanguage[language];

  return (
    <section className="section section--experience reveal-on-scroll" id="experience" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
      <div className="container">
        <div className="section__heading">
          <p className="section__index">{language === "de" ? "03 / Erfahrung" : "03 / Experience"}</p>
          <div>
            <h2>{copy.title}</h2>
            <p className="section__lead">{copy.lead}</p>
          </div>
        </div>

        <div className="timeline" aria-label={copy.timelineLabel}>
          {projects.map((p, index) => (
            <ProjectCard
              key={`${p.company}-${p.title}-${p.period}`}
              project={p}
              index={index}
              focusLabel={copy.focusLabel}
              highlightsLabel={copy.highlightsLabel}
              clientsLabel={copy.clientsLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
