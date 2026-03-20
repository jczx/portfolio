import { useId, useState, type CSSProperties } from "react";
import {
  CapexChangeFigure,
  OverviewTakeaways,
} from "./HyperscalerAnalysisCharts";
import type { Language } from "../i18n/content";

type FeaturedAnalysisProps = {
  copy: {
    title: string;
    lead: string;
    eyebrow: string;
    featuredTitle: string;
    summary: string;
    expandCta: string;
    collapseCta: string;
    findingsLabel: string;
    findings: string[];
    figureTitle: string;
    figureSubtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  caseStudyHref: string;
  methodologyHref: string;
  language: Language;
};

const FeaturedAnalysis = ({
  copy,
  caseStudyHref,
  methodologyHref,
  language,
}: FeaturedAnalysisProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const quickViewId = useId();

  return (
    <section
      className="section section--analysis reveal-on-scroll"
      id="analysis"
      style={{ "--reveal-delay": "100ms" } as CSSProperties}
    >
      <div className="container">
        <div className="analysisFeature">
          <div className="analysisFeature__heading">
            <p className="analysisFeature__eyebrow">{copy.eyebrow}</p>
            <span className="analysisFeature__sectionTitle">{copy.title}</span>
            <h2 className="analysisFeature__title">{copy.featuredTitle}</h2>
            <p className="analysisFeature__lead">{copy.lead}</p>
          </div>

          <article className={`analysisFeature__teaser${isExpanded ? " is-open" : ""}`}>
            <div className="analysisFeature__teaserCopy">
              <p className="analysisFeature__summary">{copy.summary}</p>
            </div>

            <div className="analysisFeature__teaserActions">
              <button
                aria-controls={quickViewId}
                aria-expanded={isExpanded}
                className="analysisFeature__toggle"
                onClick={() => setIsExpanded((current) => !current)}
                type="button"
              >
                {isExpanded ? copy.collapseCta : copy.expandCta}
              </button>
            </div>
          </article>

          {isExpanded ? (
            <div className="analysisFeature__expanded" id={quickViewId}>
              <div className="analysisFeature__top">
                <div className="analysisFeature__compactFigure">
                  <CapexChangeFigure
                    language={language}
                    subtitle={copy.figureSubtitle}
                    title={copy.figureTitle}
                  />
                </div>

                <aside className="analysisFeature__notes">
                  <p className="analysisFeature__label">{copy.findingsLabel}</p>
                  <ul className="analysisFeature__insightList">
                    {copy.findings.map((finding) => (
                      <li key={finding}>{finding}</li>
                    ))}
                  </ul>

                  <div className="analysisFeature__actions">
                    <a className="hero__cta hero__cta--primary" href={caseStudyHref}>
                      {copy.primaryCta}
                    </a>
                    <a className="hero__cta hero__cta--secondary" href={methodologyHref}>
                      {copy.secondaryCta}
                    </a>
                  </div>
                </aside>
              </div>

              <OverviewTakeaways language={language} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAnalysis;
