import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <section className="section" id="experience">
      <div className="container">
        <h2>Experience</h2>
        <p className="section__lead">
          Recent roles across BI consulting, DWH operations, analytics, and data
          platform support.
        </p>

        <div className="timeline" aria-label="Career timeline">
          {projects.map((p) => (
            <ProjectCard key={`${p.company}-${p.title}`} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
