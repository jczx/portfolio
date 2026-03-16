import type { CSSProperties } from "react";

type SkillsProps = {
  copy: {
    title: string;
    lead: string;
    groups: Array<{
      title: string;
      items: string[];
    }>;
  };
};

const Skills = ({ copy }: SkillsProps) => {
  return (
    <section className="section reveal-on-scroll" id="skills" style={{ "--reveal-delay": "100ms" } as CSSProperties}>
      <div className="container">
        <h2>{copy.title}</h2>
        <p className="section__lead">{copy.lead}</p>

        <div className="skillsGrid">
          {copy.groups.map((group) => (
            <article className="skillsCard" key={group.title}>
              <h3 className="skillsCard__title">{group.title}</h3>
              <ul className="skillsCard__list">
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
