import type { CSSProperties } from "react";

type AboutProps = {
  copy: {
    title: string;
    lead: string[];
    points: string[];
  };
};

type AboutIconName = "books" | "shield";

const aboutIcons: AboutIconName[] = ["books", "shield"];

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

  if (name === "books") {
    return (
      <svg {...iconProps}>
        <rect x="3" y="5" width="5" height="15" rx="1" />
        <rect x="8" y="3" width="5" height="17" rx="1" />
        <path d="m14 6 4-1 4 14-4 1-4-14Z" />
        <path d="M3 16h5M8 7h5m2 3 4-1" />
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
        <div className="about__copy">
          {copy.lead.map(paragraph => (
            <p className="section__lead" key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ul className="about__points">
          {copy.points.map((point, index) => (
            <li key={point}>
              <span className="about__pointIcon">
                <AboutIcon name={aboutIcons[index] ?? "books"} />
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
