import type { CSSProperties } from "react";
import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  skillsLabel: string;
  highlightsLabel: string;
};

const ProjectCard = ({ project, index, skillsLabel, highlightsLabel }: ProjectCardProps) => {
  const delay = `${Math.min(index * 90, 450)}ms`;

  return (
    <article className="timeline__item reveal-on-scroll" style={{ "--reveal-delay": delay } as CSSProperties}>
      <div className="timeline__rail" aria-hidden="true">
        <span className="timeline__dot" />
      </div>

      <div className="projectCard">
        <p className="projectCard__meta">
          <span>{project.company}</span>
          <span>{project.period}</span>
        </p>

        <h3 className="projectCard__title">{project.title}</h3>
        <p className="projectCard__desc">{project.description}</p>

        <ul className="projectCard__tech" aria-label={skillsLabel}>
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <ul className="projectCard__highlights" aria-label={highlightsLabel}>
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ProjectCard;
