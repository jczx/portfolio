import type { CSSProperties } from "react";
type HeroProps = {
  copy: {
    subtitle: string;
    intro: string[];
    primaryCta: string;
    secondaryCta: string;
  };
};

const Hero = ({ copy }: HeroProps) => {
  return (
    <section className="hero reveal-on-scroll" id="hero" style={{ "--reveal-delay": "40ms" } as CSSProperties}>
      <div className="container hero__content">
        <div className="hero__copy">
          <h1 className="hero__name">Julio Caesar</h1>
          <span className="hero__eyebrow">{copy.subtitle}</span>
          {copy.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="hero__actions">
            <a className="hero__cta hero__cta--primary" href="#contact">
              {copy.primaryCta}
            </a>
            <a className="hero__cta hero__cta--secondary" href="#experience">
              {copy.secondaryCta}
            </a>
          </div>
        </div>
      </div>
      <div className="hero__blend" aria-hidden="true" />
    </section>
  );
};

export default Hero;
