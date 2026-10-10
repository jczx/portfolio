import type { CSSProperties } from "react";
import { portfolioProjectsByLanguage, type PortfolioProject } from "../data/portfolioProjects";
import type { Language } from "../i18n/content";

type PortfolioProjectsProps = {
  language: Language;
  copy: {
    title: string;
    lead: string;
  };
};

const nlpPreview = {
  query: "Wagner Group",
  matches: [
    { label: "Wagner Group", score: 96 },
    { label: "Vagner Group", score: 94 },
    { label: "Africa Corps", score: 61 },
  ],
};

const opsPreviewByLanguage = {
  en: [
    { label: "Download", state: "healthy" },
    { label: "Parse", state: "healthy" },
    { label: "Publish", state: "watch" },
    { label: "Freshness", state: "healthy" },
  ],
  de: [
    { label: "Download", state: "healthy" },
    { label: "Parse", state: "healthy" },
    { label: "Publish", state: "watch" },
    { label: "Aktualität", state: "healthy" },
  ],
} as const;

const NlpPreview = ({ language }: { language: Language }) => (
  <div className="projectPreview projectPreview--nlp" aria-hidden="true">
    <div className="projectPreview__header">
      <div className="projectPreview__kicker">
        {language === "de" ? "Treffervorschau" : "Match preview"}
      </div>
      <span className="projectPreview__meta">
        {language === "de" ? "Beispiel" : "Example"}
      </span>
    </div>

    <div className="projectPreview__searchField">{nlpPreview.query}</div>

    <div className="projectPreview__matches">
      {nlpPreview.matches.map((item) => (
        <div className="projectPreview__matchRow" key={item.label}>
          <div className="projectPreview__matchMeta">
            <span>{item.label}</span>
            <strong>{item.score}%</strong>
          </div>
          <div className="projectPreview__matchTrack">
            <div
              className="projectPreview__matchFill"
              style={{ width: `${item.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="projectPreview__caption">
      {language === "de" ? "Kandidatenranking statt Urteil" : "Candidate ranking, not a verdict"}
    </div>
  </div>
);

const OpsPreview = ({ language }: { language: Language }) => (
  <div className="projectPreview projectPreview--ops" aria-hidden="true">
    <div className="projectPreview__header">
      <div className="projectPreview__kicker">
        {language === "de" ? "Pipeline-Checks" : "Pipeline checks"}
      </div>
      <span className="projectPreview__meta">
        {language === "de" ? "Beispielstatus" : "Example status"}
      </span>
    </div>

    <div className="projectPreview__statusGrid">
      {opsPreviewByLanguage[language].map((item) => (
        <div className="projectPreview__statusCell" key={item.label}>
          <span
            className={`projectPreview__statusDot projectPreview__statusDot--${item.state}`}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>

    <div className="projectPreview__timeline">
      {["healthy", "healthy", "watch", "healthy", "risk", "healthy"].map((state, index) => (
        <span
          className={`projectPreview__pulse projectPreview__pulse--${state}`}
          key={`${state}-${index}`}
        />
      ))}
    </div>

    <div className="projectPreview__caption">
      {language === "de"
        ? "Datenaktualität und Pipeline-Status prüfen"
        : "Inspect data freshness and pipeline status"}
    </div>
  </div>
);

const ProjectPreview = ({
  tone,
  language,
}: {
  tone: PortfolioProject["tone"];
  language: Language;
}) => {
  if (tone === "nlp") {
    return <NlpPreview language={language} />;
  }

  if (tone === "ops") {
    return <OpsPreview language={language} />;
  }

  return null;
};

const getProjectHref = (href: string) => {
  if (!href.startsWith("?")) {
    return href;
  }

  return `${import.meta.env.BASE_URL}${href}`;
};

const PortfolioProjects = ({ language, copy }: PortfolioProjectsProps) => {
  const projects = portfolioProjectsByLanguage[language].filter(project => project.tone !== "music");
  const personalProjects = portfolioProjectsByLanguage[language].filter(project => project.tone === "music");

  return (
    <section
      className="section section--portfolioProjects reveal-on-scroll"
      id="case-studies"
      style={{ "--reveal-delay": "140ms" } as CSSProperties}
    >
      <div className="container">
        <div className="section__heading">
          <p className="section__index">
            {language === "de" ? "02 / Projekte" : "02 / Selected work"}
          </p>
          <div>
            <h2>{copy.title}</h2>
            <p className="section__lead">{copy.lead}</p>
          </div>
        </div>

        <div className="portfolioProjects__grid">
          {projects.map((project, index) => (
            <article
              className={`portfolioProjectCard reveal-on-scroll is-${project.tone}`}
              key={project.title}
              style={{ "--reveal-delay": `${190 + index * 70}ms` } as CSSProperties}
            >
              <div className="portfolioProjectCard__top">
                <p className="portfolioProjectCard__eyebrow">{project.eyebrow}</p>
                <span className="portfolioProjectCard__status">{project.status}</span>
              </div>

              <h3 className="portfolioProjectCard__title">
                {project.href ? (
                  <a href={getProjectHref(project.href)}>{project.title}</a>
                ) : (
                  project.title
                )}
              </h3>
              <p className="portfolioProjectCard__summary">{project.summary}</p>

              <ProjectPreview language={language} tone={project.tone} />

              {project.highlights.length > 0 && <ul className="portfolioProjectCard__highlights">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>}

              <ul
                className="portfolioProjectCard__tech"
                aria-label={language === "de" ? "Projekt-Stack" : "Project stack"}
              >
                {project.tech.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {project.href && project.actionLabel ? (
                <div className="portfolioProjectCard__actions">
                  <a
                    className="portfolioProjectCard__cta"
                    href={getProjectHref(project.href)}
                  >
                    <span>{project.actionLabel}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                  {project.secondaryAction && (
                    <a className="portfolioProjectCard__secondary" href={getProjectHref(project.secondaryAction.href)}>
                      {project.secondaryAction.label} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              ) : null}
            </article>
          ))}
        </div>
        {personalProjects.length > 0 && (
          <div className="portfolioProjects__personal">
            <h3>{language === "de" ? "Persönliches Projekt" : "Personal project"}</h3>
            {personalProjects.map(project => (
              <article className="personalProject" key={project.title}>
                <div className="personalProject__identity">
                  <img
                    className="personalProject__icon"
                    src={`${import.meta.env.BASE_URL}caesar-guitar-lab-assets/favicon.ico`}
                    alt=""
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.summary}</p>
                  </div>
                </div>
                {project.href && <a href={getProjectHref(project.href)}>{project.actionLabel} <span aria-hidden="true">↗</span></a>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioProjects;
