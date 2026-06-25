import type { CSSProperties } from "react";
import profilePicture from "../assets/julio_colour_blackedout.png";

type HeroProps = {
  copy: {
    headline: string[];
    intro: string[];
    primaryCta: string;
    secondaryCta: string;
  };
};

const Hero = ({ copy }: HeroProps) => {
  return (
    <section className="hero reveal-on-scroll" id="hero" style={{ "--reveal-delay": "40ms" } as CSSProperties}>
      <div className="hero__portrait">
        <img
          src={profilePicture}
          alt="Portrait of Julio Caesar"
          width="1254"
          height="1254"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      <div className="container hero__content">
        <div className="hero__copy">
          <h1 className="hero__name">
            {copy.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          {copy.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="hero__actions">
            <a className="hero__cta hero__cta--primary" href="#case-studies">
              {copy.primaryCta}
            </a>
            <a className="hero__cta hero__cta--secondary" href="#contact">
              {copy.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
