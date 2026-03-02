import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="timeline__item">
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

        <ul className="projectCard__tech" aria-label="Key skills">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <ul className="projectCard__highlights" aria-label="Role highlights">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ProjectCard;
