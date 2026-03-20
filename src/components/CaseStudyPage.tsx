import type { CSSProperties } from "react";
import type { Language } from "../i18n/content";
import {
  CapexChangeFigure,
  CapexHeroFigure,
  MarginGapFigure,
  OverviewTakeaways,
} from "./HyperscalerAnalysisCharts";

type CaseStudyPageProps = {
  copy: {
    backLabel: string;
    eyebrow: string;
    title: string;
    lead: string;
    overviewTitle: string;
    overviewLead: string;
    findingsLabel: string;
    findings: string[];
    mainFigureTitle: string;
    mainFigureSubtitle: string;
    comparisonTitle: string;
    comparisonLead: string;
    capexChangeTitle: string;
    capexChangeSubtitle: string;
    marginGapTitle: string;
    marginGapSubtitle: string;
    methodologyTitle: string;
    methodologyLead: string;
    measuredLabel: string;
    measuredPoints: string[];
    guardrailsLabel: string;
    guardrailPoints: string[];
    sourcesTitle: string;
    sources: Array<{
      label: string;
      href: string;
    }>;
  };
  homeHref: string;
  language: Language;
};

const CaseStudyPage = ({ copy, homeHref, language }: CaseStudyPageProps) => {
  return (
    <div id="top">
      <main className="caseStudyPage">
        <section
          className="caseHero reveal-on-scroll"
          style={{ "--reveal-delay": "60ms" } as CSSProperties}
        >
          <div className="container caseHero__content">
            <a className="caseHero__back" href={homeHref}>
              {copy.backLabel}
            </a>
            <p className="caseHero__eyebrow">{copy.eyebrow}</p>
            <h1 className="caseHero__title">{copy.title}</h1>
            <p className="caseHero__lead">{copy.lead}</p>
          </div>
        </section>

        <section
          className="section caseSection caseSection--lead reveal-on-scroll"
          id="overview"
          style={{ "--reveal-delay": "90ms" } as CSSProperties}
        >
          <div className="container">
            <div className="caseTextBlock">
              <h2>{copy.overviewTitle}</h2>
              <p className="section__lead">{copy.overviewLead}</p>
            </div>

            <div className="caseOverviewGrid">
              <div className="caseOverviewGrid__main">
                <CapexHeroFigure
                  language={language}
                  subtitle={copy.mainFigureSubtitle}
                  title={copy.mainFigureTitle}
                />
              </div>

              <aside className="caseOverviewGrid__aside">
                <p className="caseCard__label">{copy.findingsLabel}</p>
                <ul className="caseMethodList">
                  {copy.findings.map((finding) => (
                    <li key={finding}>{finding}</li>
                  ))}
                </ul>
              </aside>
            </div>

            <OverviewTakeaways language={language} />
          </div>
        </section>

        <section
          className="section caseSection reveal-on-scroll"
          id="comparison"
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          <div className="container">
            <div className="caseTextBlock">
              <h2>{copy.comparisonTitle}</h2>
              <p className="section__lead">{copy.comparisonLead}</p>
            </div>

            <div className="caseComparisonGrid">
              <CapexChangeFigure
                language={language}
                subtitle={copy.capexChangeSubtitle}
                title={copy.capexChangeTitle}
              />
              <MarginGapFigure
                language={language}
                subtitle={copy.marginGapSubtitle}
                title={copy.marginGapTitle}
              />
            </div>
          </div>
        </section>

        <section
          className="section caseSection reveal-on-scroll"
          id="methodology"
          style={{ "--reveal-delay": "150ms" } as CSSProperties}
        >
          <div className="container">
            <div className="caseTextBlock">
              <h2>{copy.methodologyTitle}</h2>
              <p className="section__lead">{copy.methodologyLead}</p>
            </div>

            <div className="caseMethodGrid">
              <article className="caseMethodPanel">
                <p className="caseCard__label">{copy.measuredLabel}</p>
                <ul className="caseMethodList">
                  {copy.measuredPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>

              <article className="caseMethodPanel">
                <p className="caseCard__label">{copy.guardrailsLabel}</p>
                <ul className="caseMethodList">
                  {copy.guardrailPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section
          className="section caseSection caseSection--sources reveal-on-scroll"
          id="sources"
          style={{ "--reveal-delay": "180ms" } as CSSProperties}
        >
          <div className="container">
            <div className="caseTextBlock">
              <h2>{copy.sourcesTitle}</h2>
            </div>

            <div className="caseSourceList">
              {copy.sources.map((source) => (
                <a
                  className="caseSourceLink"
                  href={source.href}
                  key={source.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {source.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CaseStudyPage;
