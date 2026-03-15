import type { CSSProperties } from "react";

type ContactProps = {
  copy: {
    title: string;
    lead: string;
    linkedinLabel: string;
    githubLabel: string;
    emailLabel: string;
  };
};

const Contact = ({ copy }: ContactProps) => {
  return (
    <section className="section reveal-on-scroll" id="contact" style={{ "--reveal-delay": "160ms" } as CSSProperties}>
      <div className="container">
        <h2>{copy.title}</h2>
        <p className="section__lead">{copy.lead}</p>

        <div className="contact__links">
          <a href="https://www.linkedin.com/in/julcsr" target="_blank" rel="noreferrer">
            {copy.linkedinLabel}
          </a>
          <a href="https://github.com/jczx" target="_blank" rel="noreferrer">
            {copy.githubLabel}
          </a>
          <a href="mailto:jcsrdata@gmail.com">
            {copy.emailLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
