import type { Language } from "../i18n/content";
import { getSourceFreshness, isPipelineStatus, type CheckStatus } from "../utils/sanctionsData";
import { useLocalJson } from "../utils/useLocalJson";
import DemoLoadState from "./DemoLoadState";

type SanctionsPipelineMonitorPageProps = {
  homeHref: string;
  language: Language;
};

const copyByLanguage = {
  en: {
    backLabel: "Back to portfolio",
    eyebrow: "Sanctions screening",
    title: "Pipeline status",
    lead: "Dataset status for the sanctions matcher.",
    savedRunLabel: "Saved run",
    recordsLabel: "Records",
    aliasesLabel: "Aliases",
    sourceDateLabel: "Source export date",
    checksLabel: "Checks",
    matcherLabel: "Open the matcher",
    dataLabel: "View saved data",
    checkLabels: {
      "source-access": "Source access",
      parse: "Parsing",
      freshness: "Source freshness",
      publish: "Publication",
      coverage: "Alias coverage",
    },
    statusLabels: { healthy: "Healthy", watch: "Watch", risk: "Risk" },
  },
  de: {
    backLabel: "Zurück zum Portfolio",
    eyebrow: "Sanktionsscreening",
    title: "Pipeline-Status",
    lead: "Datensatzstatus für den Sanktionsmatcher.",
    savedRunLabel: "Gespeicherter Lauf",
    recordsLabel: "Einträge",
    aliasesLabel: "Aliasse",
    sourceDateLabel: "Quelldatum",
    checksLabel: "Prüfungen",
    matcherLabel: "Namensabgleich öffnen",
    dataLabel: "Gespeicherte Daten ansehen",
    checkLabels: {
      "source-access": "Quellenzugriff",
      parse: "Parsing",
      freshness: "Aktualität",
      publish: "Veröffentlichung",
      coverage: "Alias-Abdeckung",
    },
    statusLabels: { healthy: "Stabil", watch: "Beobachten", risk: "Risiko" },
  },
} satisfies Record<Language, {
  backLabel: string;
  eyebrow: string;
  title: string;
  lead: string;
  savedRunLabel: string;
  recordsLabel: string;
  aliasesLabel: string;
  sourceDateLabel: string;
  checksLabel: string;
  matcherLabel: string;
  dataLabel: string;
  checkLabels: Record<string, string>;
  statusLabels: Record<CheckStatus, string>;
}>;

const formatDate = (value: string, language: Language, showTime = false) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";

  return new Intl.DateTimeFormat(language === "de" ? "de-DE" : "en-US", {
    dateStyle: "medium",
    timeStyle: showTime ? "short" : undefined,
  }).format(parsed);
};

const SanctionsPipelineMonitorPage = ({ homeHref, language }: SanctionsPipelineMonitorPageProps) => {
  const copy = copyByLanguage[language];
  const load = useLocalJson("data/eu-sanctions-pipeline-status.json", isPipelineStatus);
  const payload = load.data;
  const labels: Record<string, string> = copy.checkLabels;
  const locale = language === "de" ? "de-DE" : "en-US";

  return (
    <div id="top">
      <main className="caseStudyPage" id="main-content" tabIndex={-1}>
        <section className="caseHero">
          <div className="container caseHero__content">
            <a className="caseHero__back" href={homeHref}>{copy.backLabel}</a>
            <p className="caseHero__eyebrow">{copy.eyebrow}</p>
            <h1 className="caseHero__title">{copy.title}</h1>
            <p className="caseHero__lead">{copy.lead}</p>
          </div>
        </section>

        <section className="section caseSection caseSection--lead monitorSummary" aria-label={copy.title}>
          <div className="container">
            {load.status !== "ready" && (
              <DemoLoadState status={load.status} language={language} kind="monitor" onRetry={load.retry} />
            )}
            {payload && (
              <>
                <p className="monitorSummary__run">
                  {copy.savedRunLabel}: <time dateTime={payload.meta.generatedAt}>{formatDate(payload.meta.generatedAt, language, true)}</time>
                </p>
                <div className="monitorMetricGrid">
                  <article className="monitorMetricCard">
                    <p className="caseCard__label">{copy.recordsLabel}</p>
                    <strong>{payload.metrics.recordCount.toLocaleString(locale)}</strong>
                  </article>
                  <article className="monitorMetricCard">
                    <p className="caseCard__label">{copy.aliasesLabel}</p>
                    <strong>{payload.metrics.aliasTotal.toLocaleString(locale)}</strong>
                  </article>
                  <article className="monitorMetricCard">
                    <p className="caseCard__label">{copy.sourceDateLabel}</p>
                    <strong><time dateTime={payload.meta.sourceDate}>{formatDate(payload.meta.sourceDate, language)}</time></strong>
                  </article>
                </div>

                <div className="monitorSummary__checks">
                  <h2>{copy.checksLabel}</h2>
                  <ul className="monitorCheckList">
                    {payload.checks.map(check => {
                      const status = check.id === "freshness"
                        ? getSourceFreshness(payload.meta.sourceDate).status
                        : check.status;

                      return (
                        <li className="monitorCheckCard" key={check.id}>
                          <span>{labels[check.id] ?? check.label}</span>
                          <span className={`monitorStatus monitorStatus--${status}`}>{copy.statusLabels[status]}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="monitorSummary__links">
                  <a href={`${import.meta.env.BASE_URL}sanctions-matcher.html`}>{copy.matcherLabel} <span aria-hidden="true">→</span></a>
                  <a href={`${import.meta.env.BASE_URL}data/eu-sanctions-pipeline-status.json`} target="_blank" rel="noreferrer">{copy.dataLabel}</a>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SanctionsPipelineMonitorPage;
