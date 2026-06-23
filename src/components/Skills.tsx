import type { CSSProperties } from "react";

type SkillsProps = {
  copy: {
    title: string;
    lead: string;
    groups: Array<{
      label: string;
      items: string[];
    }>;
  };
};

const Skills = ({ copy }: SkillsProps) => {
  return (
    <section
      className="section section--skills reveal-on-scroll"
      id="skills"
      style={{ "--reveal-delay": "110ms" } as CSSProperties}
    >
      <div className="container">
        <div className="section__heading">
          <p className="section__index">02 / Expertise</p>
          <div>
            <h2>{copy.title}</h2>
            <p className="section__lead">{copy.lead}</p>
          </div>
        </div>

        <div className="skillsGrid">
          {copy.groups.map((group) => (
            <article className="skillGroup" key={group.label}>
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
