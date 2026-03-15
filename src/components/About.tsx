import type { CSSProperties } from "react";

type AboutProps = {
  copy: {
    title: string;
    lead: string;
    points: string[];
  };
};

const About = ({ copy }: AboutProps) => {
  return (
    <section className="section section--about reveal-on-scroll" id="about" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
      <div className="container">
        <h2>{copy.title}</h2>
        <p className="section__lead">{copy.lead}</p>

        <ul className="about__points">
          {copy.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
