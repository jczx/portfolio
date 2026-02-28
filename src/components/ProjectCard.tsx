import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <a className="projectCard" href={project.href} target="_blank" rel="noreferrer">
      <h3 className="projectCard__title">{project.title}</h3>
      <p className="projectCard__desc">{project.description}</p>

      <ul className="projectCard__tech" aria-label="Tech stack">
        {project.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </a>
  );
};

export default ProjectCard;