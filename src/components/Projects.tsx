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
    skillsLabel: string;
    highlightsLabel: string;
  };
};

const Projects = ({ language, copy }: ProjectsProps) => {
  const projects = projectsByLanguage[language];

  return (
    <section className="section section--experience reveal-on-scroll" id="experience" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
      <div className="container">
        <h2>{copy.title}</h2>
        <p className="section__lead">{copy.lead}</p>

        <div className="timeline" aria-label={copy.timelineLabel}>
          {projects.map((p, index) => (
            <ProjectCard
              key={`${p.company}-${p.title}`}
              project={p}
              index={index}
              skillsLabel={copy.skillsLabel}
              highlightsLabel={copy.highlightsLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
