import type { CSSProperties } from "react";
import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  focusLabel: string;
  highlightsLabel: string;
  clientsLabel: string;
};

const ProjectCard = ({ project, index, focusLabel, highlightsLabel, clientsLabel }: ProjectCardProps) => {
  const delay = `${Math.min(index * 90, 450)}ms`;

  return (
    <article className="timeline__item reveal-on-scroll" style={{ "--reveal-delay": delay } as CSSProperties}>
      <div className="timeline__rail" aria-hidden="true">
        <span className="timeline__dot" />
      </div>

      <div className="projectCard">
        <p className="projectCard__meta">
          <span>{project.company} / {project.location}</span>
          <span>{project.period}</span>
        </p>

        <h3 className="projectCard__title">{project.title}</h3>
        <p className="projectCard__desc">{project.description}</p>

        {project.clients && project.clients.length > 0 ? (
          <div className="projectCard__clients">
            <p className="projectCard__clientsLabel">{clientsLabel}</p>
            <ul aria-label={clientsLabel}>
              {project.clients.map((client) => <li key={client}>{client}</li>)}
            </ul>
          </div>
        ) : null}

        {project.responsibilities && project.responsibilities.length > 0 ? (
          <dl className="projectCard__responsibilities" aria-label={highlightsLabel}>
            {project.responsibilities.map((responsibility) => (
              <div key={responsibility.label}>
                <dt>{responsibility.label}</dt>
                <dd>{responsibility.detail}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {project.highlights.length > 0 ? (
          <ul className="projectCard__highlights" aria-label={highlightsLabel}>
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        <p className="projectCard__focusLabel">{focusLabel}</p>
        <ul className="projectCard__tech" aria-label={focusLabel}>
          {project.focus.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ProjectCard;
