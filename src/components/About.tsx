import type { CSSProperties } from "react";

type AboutProps = {
  copy: {
    title: string;
    lead: string;
    points: string[];
  };
};

type AboutIconName = "briefcase" | "database" | "spark" | "shield";

const aboutIcons: AboutIconName[] = ["briefcase", "database", "spark", "shield"];

const AboutIcon = ({ name }: { name: AboutIconName }) => {
  const iconProps = {
    "aria-hidden": true,
    className: "about__pointIconSvg",
    fill: "none",
    focusable: false,
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  if (name === "briefcase") {
    return (
      <svg {...iconProps}>
        <path d="M9 7V5.8C9 4.8 9.8 4 10.8 4h2.4C14.2 4 15 4.8 15 5.8V7" />
        <path d="M5.8 7h12.4c1 0 1.8.8 1.8 1.8v8.4c0 1-.8 1.8-1.8 1.8H5.8c-1 0-1.8-.8-1.8-1.8V8.8C4 7.8 4.8 7 5.8 7Z" />
        <path d="M4 12h16" />
        <path d="M10 12v1.2h4V12" />
      </svg>
    );
  }

  if (name === "database") {
    return (
      <svg {...iconProps}>
        <path d="M5 7c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Z" />
        <path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7" />
        <path d="M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg {...iconProps}>
        <path d="M12 3l1.5 5.3L19 10l-5.5 1.7L12 17l-1.5-5.3L5 10l5.5-1.7L12 3Z" />
        <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
        <path d="M5 14l.6 1.9L7.5 16l-1.9.6L5 18.5l-.6-1.9L2.5 16l1.9-.6L5 14Z" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <path d="M12 3l7 3v5.2c0 4.4-2.8 8.2-7 9.8-4.2-1.6-7-5.4-7-9.8V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
};

const About = ({ copy }: AboutProps) => {
  return (
    <section className="section section--about reveal-on-scroll" id="about" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
      <div className="container">
        <h2>{copy.title}</h2>
        <p className="section__lead">{copy.lead}</p>

        <ul className="about__points">
          {copy.points.map((point, index) => (
            <li key={point}>
              <span className="about__pointIcon">
                <AboutIcon name={aboutIcons[index] ?? "spark"} />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
