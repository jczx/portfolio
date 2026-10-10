import type { CSSProperties } from "react";

type ContactProps = {
  copy: {
    indexLabel: string;
    title: string;
    lead: string;
    linkedinLabel: string;
    githubLabel: string;
    emailLabel: string;
  };
};

const Contact = ({ copy }: ContactProps) => {
  return (
    <section className="section section--contact reveal-on-scroll" id="contact" style={{ "--reveal-delay": "160ms" } as CSSProperties}>
      <div className="container">
        <div className="section__heading">
          <p className="section__index">{copy.indexLabel}</p>
          <div>
            <h2>{copy.title}</h2>
            <p className="section__lead">{copy.lead}</p>
          </div>
        </div>

        <div className="contact__links">
          <a
            className="contact__email"
            href="mailto:jcsrdata@gmail.com"
            aria-label={`${copy.emailLabel}: jcsrdata@gmail.com`}
          >
            jcsrdata@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/julcsr" target="_blank" rel="noreferrer">
            {copy.linkedinLabel}
          </a>
          <a href="https://github.com/jczx" target="_blank" rel="noreferrer">
            {copy.githubLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
