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
        <div className="hero__portrait">
          <img
            src={`${import.meta.env.BASE_URL}images/julio-800.webp`}
            srcSet={[480, 800, 1254].map(width => `${import.meta.env.BASE_URL}images/julio-${width}.webp ${width}w`).join(", ")}
            sizes="(max-width: 520px) min(320px, calc(100vw - 40px)), (max-width: 760px) min(400px, calc(100vw - 40px)), (max-width: 1244px) 44vw, 512px"
            alt="Julio Caesar"
            width="1254"
            height="1254"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
