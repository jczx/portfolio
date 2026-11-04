type HeroProps = {
  copy: {
    eyebrow: string;
    headline: string[];
    intro: string[];
    primaryCta: string;
    secondaryCta: string;
  };
};

const Hero = ({ copy }: HeroProps) => {
  return (
    <section className="hero" id="hero">
      <div className="container hero__content">
        <div className="hero__copy">
          <p className="hero__eyebrow">{copy.eyebrow}</p>
          <h1 className="hero__name">
            {copy.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          {copy.intro.map((paragraph) => (
            <p className="hero__intro" key={paragraph}>{paragraph}</p>
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
