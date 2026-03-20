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

const financePreview = [
  { label: "META", value: 34.7 },
  { label: "MSFT", value: 22.9 },
  { label: "GOOGL", value: 22.7 },
  { label: "AMZN", value: 18.4 },
];

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

const FinancePreview = ({ language }: { language: Language }) => (
  <div className="projectPreview projectPreview--finance" aria-hidden="true">
    <div className="projectPreview__header">
      <div className="projectPreview__kicker">
        {language === "de" ? "Kapitalintensität" : "Capex intensity"}
      </div>
      <span className="projectPreview__meta">{language === "de" ? "Letztes GJ" : "Latest FY"}</span>
    </div>

    <div className="projectPreview__bars">
      {financePreview.map((item) => (
        <div className="projectPreview__barGroup" key={item.label}>
          <div className="projectPreview__barTrack">
            <div
              className="projectPreview__barFill"
              style={{ height: `${Math.max((item.value / 36) * 100, 12)}%` }}
            />
          </div>
          <div className="projectPreview__barMeta">
            <span>{item.label}</span>
            <strong>{item.value.toFixed(1)}%</strong>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const NlpPreview = ({ language }: { language: Language }) => (
  <div className="projectPreview projectPreview--nlp" aria-hidden="true">
    <div className="projectPreview__header">
      <div className="projectPreview__kicker">{language === "de" ? "Treffervorschau" : "Match preview"}</div>
      <span className="projectPreview__meta">Top 3</span>
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
      <div className="projectPreview__kicker">{language === "de" ? "Pipeline-Checks" : "Pipeline checks"}</div>
      <span className="projectPreview__meta">{language === "de" ? "Letzter Lauf" : "Latest run"}</span>
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
      {language === "de" ? "Die Pipeline operativ lesbar machen" : "Make the pipeline operationally legible"}
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
  if (tone === "finance") {
    return <FinancePreview language={language} />;
  }

  if (tone === "nlp") {
    return <NlpPreview language={language} />;
  }

  return <OpsPreview language={language} />;
};

const PortfolioProjects = ({ language, copy }: PortfolioProjectsProps) => {
  const projects = portfolioProjectsByLanguage[language];

  return (
    <section
      className="section section--portfolioProjects reveal-on-scroll"
      id="projects"
      style={{ "--reveal-delay": "140ms" } as CSSProperties}
    >
      <div className="container">
        <h2>{copy.title}</h2>
        <p className="section__lead">{copy.lead}</p>

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

              <h3 className="portfolioProjectCard__title">{project.title}</h3>
              <p className="portfolioProjectCard__summary">{project.summary}</p>

              <ProjectPreview language={language} tone={project.tone} />

              <ul className="portfolioProjectCard__highlights">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <ul className="portfolioProjectCard__tech" aria-label="Project stack">
                {project.tech.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {project.href && project.actionLabel ? (
                <div className="portfolioProjectCard__actions">
                  <a className="portfolioProjectCard__cta" href={project.href}>
                    {project.actionLabel}
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioProjects;
