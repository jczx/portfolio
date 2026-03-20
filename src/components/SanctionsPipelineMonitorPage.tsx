import { useEffect, useState, type CSSProperties } from "react";
import { euSanctionsFallbackPayload } from "../data/euSanctionsSample";
import type { Language } from "../i18n/content";

type PipelineStatus = {
  meta: {
    generatedAt: string;
    sourceKind: "official-xml" | "fallback-sample";
    sourceDate: string;
    sourceLabel: string;
    ingestionMode: "remote-url" | "local-xml" | "fallback-sample";
  };
  metrics: {
    recordCount: number;
    previousRecordCount: number | null;
    recordDelta: number | null;
    personCount: number;
    entityCount: number;
    aliasTotal: number;
    entriesWithAliases: number;
    aliasCoveragePct: number;
    latestPublicationDate: string;
    matcherDatasetBytes: number;
    rawXmlBytes: number | null;
    topProgrammes: Array<{
      programme: string;
      count: number;
    }>;
  };
  checks: Array<{
    id: string;
    label: string;
    status: "healthy" | "watch" | "risk";
    detail: string;
  }>;
};

type SanctionsPipelineMonitorPageProps = {
  homeHref: string;
  language: Language;
};

const fallbackStatus: PipelineStatus = {
  meta: {
    generatedAt: new Date("2026-03-20T15:00:00.000Z").toISOString(),
    sourceKind: "fallback-sample",
    sourceDate: "2026-03-20",
    sourceLabel: euSanctionsFallbackPayload.meta.sourceLabel,
    ingestionMode: "fallback-sample",
  },
  metrics: {
    recordCount: euSanctionsFallbackPayload.entries.length,
    previousRecordCount: null,
    recordDelta: null,
    personCount: euSanctionsFallbackPayload.entries.filter((entry) => entry.type === "P").length,
    entityCount: euSanctionsFallbackPayload.entries.filter((entry) => entry.type === "E").length,
    aliasTotal: euSanctionsFallbackPayload.entries.reduce((sum, entry) => sum + entry.aliases.length, 0),
    entriesWithAliases: euSanctionsFallbackPayload.entries.filter((entry) => entry.aliases.length > 0).length,
    aliasCoveragePct: 75,
    latestPublicationDate: "2024-12-03",
    matcherDatasetBytes: 0,
    rawXmlBytes: null,
    topProgrammes: [{ programme: "EU sanctions sample", count: euSanctionsFallbackPayload.entries.length }],
  },
  checks: [
    { id: "source-access", label: "Source access", status: "watch", detail: "" },
    { id: "parse", label: "Parse step", status: "healthy", detail: "" },
    { id: "freshness", label: "Source freshness", status: "watch", detail: "" },
    { id: "publish", label: "Publish step", status: "healthy", detail: "" },
    { id: "coverage", label: "Alias coverage", status: "healthy", detail: "" },
  ],
};

const copyByLanguage = {
  en: {
    backLabel: "Back to portfolio",
    eyebrow: "DataOps / Reliability",
    title: "Sanctions Pipeline Reliability Monitor",
    lead:
      "The operational view for the same FSF ingestion flow that powers the sanctions matcher. It monitors source access, parsing, publish health, and data-surface quality instead of only the user-facing search UI.",
    overviewTitle: "Overview",
    overviewLead:
      "This page turns the matcher pipeline into an auditable operating surface: if the source fails, the parser drifts, or the dataset stops looking credible, it should be visible immediately.",
    sourceModeLabel: "Source mode",
    sourceKindLabel: "Source kind",
    recordsLabel: "Entities parsed",
    aliasesLabel: "Aliases retained",
    freshnessLabel: "Source freshness",
    publishLabel: "Published payload",
    flowTitle: "Pipeline flow",
    flowSteps: ["FSF XML", "Parse aliases", "Publish matcher JSON"],
    checksTitle: "Health Checks",
    checksLead:
      "Each check answers one operational question: did the source arrive, did the parser hold, and did the published dataset still look usable.",
    outputTitle: "Dataset Profile",
    outputLead:
      "These profile metrics are the minimum useful monitor for this pipeline: scale, coverage, shape, and the biggest programmes in the current export.",
    peopleLabel: "Persons",
    entitiesLabel: "Entities",
    coverageLabel: "Alias coverage",
    latestLabel: "Latest publication",
    topProgrammesLabel: "Top programmes in export",
    sourcesTitle: "Sources",
    statusLabels: {
      healthy: "Healthy",
      watch: "Watch",
      risk: "Risk",
    },
  },
  de: {
    backLabel: "Zurück zum Portfolio",
    eyebrow: "DataOps / Reliability",
    title: "Sanctions Pipeline Reliability Monitor",
    lead:
      "Die operative Ansicht für denselben FSF-Ingestion-Flow, der den Sanktions-Matcher speist. Sie überwacht Source Access, Parsing, Publish-Gesundheit und Datenqualität statt nur die Suchoberfläche.",
    overviewTitle: "Überblick",
    overviewLead:
      "Diese Seite macht aus der Matcher-Pipeline eine nachvollziehbare Betriebsfläche: Wenn die Source ausfällt, der Parser driftet oder der Datensatz unglaubwürdig wirkt, sollte das sofort sichtbar sein.",
    sourceModeLabel: "Source-Modus",
    sourceKindLabel: "Source-Typ",
    recordsLabel: "Geparste Einträge",
    aliasesLabel: "Übernommene Aliase",
    freshnessLabel: "Source-Freshness",
    publishLabel: "Publizierte Payload",
    flowTitle: "Pipeline-Flow",
    flowSteps: ["FSF XML", "Aliase parsen", "Matcher-JSON publizieren"],
    checksTitle: "Health Checks",
    checksLead:
      "Jeder Check beantwortet eine operative Frage: Kam die Source an, blieb der Parser stabil und sieht der publizierte Datensatz weiterhin nutzbar aus?",
    outputTitle: "Datensatz-Profil",
    outputLead:
      "Diese Profilkennzahlen sind das Minimum für sinnvolles Monitoring dieser Pipeline: Größe, Coverage, Form und die größten Programme im aktuellen Export.",
    peopleLabel: "Personen",
    entitiesLabel: "Organisationen",
    coverageLabel: "Alias-Coverage",
    latestLabel: "Letzte Veröffentlichung",
    topProgrammesLabel: "Größte Programme im Export",
    sourcesTitle: "Quellen",
    statusLabels: {
      healthy: "Stabil",
      watch: "Beobachten",
      risk: "Risiko",
    },
  },
} satisfies Record<
  Language,
  {
    backLabel: string;
    eyebrow: string;
    title: string;
    lead: string;
    overviewTitle: string;
    overviewLead: string;
    sourceModeLabel: string;
    sourceKindLabel: string;
    recordsLabel: string;
    aliasesLabel: string;
    freshnessLabel: string;
    publishLabel: string;
    flowTitle: string;
    flowSteps: string[];
    checksTitle: string;
    checksLead: string;
    outputTitle: string;
    outputLead: string;
    peopleLabel: string;
    entitiesLabel: string;
    coverageLabel: string;
    latestLabel: string;
    topProgrammesLabel: string;
    sourcesTitle: string;
    statusLabels: Record<"healthy" | "watch" | "risk", string>;
  }
>;

const formatBytes = (value: number | null, language: Language) => {
  if (value === null) {
    return "—";
  }

  return new Intl.NumberFormat(language === "de" ? "de-DE" : "en-US", {
    style: "unit",
    unit: value >= 1024 * 1024 ? "megabyte" : "kilobyte",
    maximumFractionDigits: 1,
  }).format(value >= 1024 * 1024 ? value / (1024 * 1024) : value / 1024);
};

const formatDate = (value: string, language: Language) => {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value || "—";
  }

  return new Intl.DateTimeFormat(language === "de" ? "de-DE" : "en-US", {
    dateStyle: "medium",
    timeStyle: value.includes("T") ? "short" : undefined,
  }).format(parsed);
};

const formatMode = (mode: PipelineStatus["meta"]["ingestionMode"], language: Language) => {
  if (language === "de") {
    return mode === "remote-url"
      ? "Automatischer Download"
      : mode === "local-xml"
        ? "Lokales XML"
        : "Fallback-Sample";
  }

  return mode === "remote-url"
    ? "Automated download"
    : mode === "local-xml"
      ? "Local XML"
      : "Fallback sample";
};

const formatSourceKind = (kind: PipelineStatus["meta"]["sourceKind"], language: Language) => {
  if (language === "de") {
    return kind === "official-xml" ? "Offizieller XML-Export" : "Fallback-Sample";
  }

  return kind === "official-xml" ? "Official XML export" : "Fallback sample";
};

const getFreshnessHours = (value: string) => {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return Number(((Date.now() - parsed.getTime()) / (1000 * 60 * 60)).toFixed(1));
};

const buildCheckDetail = (
  checkId: string,
  payload: PipelineStatus,
  language: Language,
) => {
  const { meta, metrics } = payload;
  const isGerman = language === "de";

  if (checkId === "source-access") {
    if (meta.sourceKind === "official-xml") {
      return isGerman
        ? `Offizieller FSF-XML-Export verfügbar via ${formatMode(meta.ingestionMode, language)}.`
        : `Official FSF XML export available via ${formatMode(meta.ingestionMode, language)}.`;
    }

    return isGerman
      ? "Fallback-Sample aktiv, weil keine offizielle XML-Quelle verfügbar war."
      : "Fallback sample active because no official XML source was available.";
  }

  if (checkId === "parse") {
    return isGerman
      ? `${metrics.recordCount.toLocaleString("de-DE")} Einträge geparst, ${metrics.aliasTotal.toLocaleString("de-DE")} Aliase übernommen.`
      : `${metrics.recordCount.toLocaleString("en-US")} entities parsed, ${metrics.aliasTotal.toLocaleString("en-US")} aliases retained.`;
  }

  if (checkId === "freshness") {
    const freshness = getFreshnessHours(meta.sourceDate);

    return freshness === null
      ? isGerman
        ? "Kein verwertbarer Source-Zeitstempel verfügbar."
        : "No usable source timestamp available."
      : isGerman
        ? `Source-Export ist ${freshness.toLocaleString("de-DE")} Stunden alt.`
        : `Source export is ${freshness.toLocaleString("en-US")} hours old.`;
  }

  if (checkId === "publish") {
    return isGerman
      ? `Matcher-Datensatz erfolgreich publiziert: ${formatBytes(metrics.matcherDatasetBytes, language)}.`
      : `Matcher dataset published successfully: ${formatBytes(metrics.matcherDatasetBytes, language)}.`;
  }

  return isGerman
    ? `${metrics.aliasCoveragePct.toLocaleString("de-DE")}% der Einträge enthalten mindestens einen Alias.`
    : `${metrics.aliasCoveragePct.toLocaleString("en-US")}% of entries carry at least one alias.`;
};

const SanctionsPipelineMonitorPage = ({
  homeHref,
  language,
}: SanctionsPipelineMonitorPageProps) => {
  const copy = copyByLanguage[language];
  const [payload, setPayload] = useState<PipelineStatus>(fallbackStatus);

  useEffect(() => {
    let isActive = true;

    const loadStatus = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/eu-sanctions-pipeline-status.json`);

        if (!response.ok) {
          return;
        }

        const nextPayload = (await response.json()) as PipelineStatus;

        if (isActive) {
          setPayload(nextPayload);
        }
      } catch {
        // Keep the fallback payload if the generated status file is unavailable.
      }
    };

    void loadStatus();

    return () => {
      isActive = false;
    };
  }, []);

  const topProgrammeMax = Math.max(
    ...payload.metrics.topProgrammes.map((item) => item.count),
    1,
  );

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

            <div className="monitorOverviewGrid">
              <div className="monitorMetricGrid">
                <article className="monitorMetricCard">
                  <p className="caseCard__label">{copy.sourceModeLabel}</p>
                  <strong>{formatMode(payload.meta.ingestionMode, language)}</strong>
                </article>
                <article className="monitorMetricCard">
                  <p className="caseCard__label">{copy.sourceKindLabel}</p>
                  <strong>{formatSourceKind(payload.meta.sourceKind, language)}</strong>
                </article>
                <article className="monitorMetricCard">
                  <p className="caseCard__label">{copy.recordsLabel}</p>
                  <strong>{payload.metrics.recordCount.toLocaleString(language === "de" ? "de-DE" : "en-US")}</strong>
                </article>
                <article className="monitorMetricCard">
                  <p className="caseCard__label">{copy.aliasesLabel}</p>
                  <strong>{payload.metrics.aliasTotal.toLocaleString(language === "de" ? "de-DE" : "en-US")}</strong>
                </article>
                <article className="monitorMetricCard">
                  <p className="caseCard__label">{copy.freshnessLabel}</p>
                  <strong>{formatDate(payload.meta.sourceDate, language)}</strong>
                </article>
                <article className="monitorMetricCard">
                  <p className="caseCard__label">{copy.publishLabel}</p>
                  <strong>{formatBytes(payload.metrics.matcherDatasetBytes, language)}</strong>
                </article>
              </div>

              <aside className="monitorFlowPanel">
                <p className="caseCard__label">{copy.flowTitle}</p>
                <div className="monitorFlow">
                  {copy.flowSteps.map((step, index) => (
                    <div className="monitorFlow__step" key={step}>
                      <span className="monitorFlow__index">{index + 1}</span>
                      <strong>{step}</strong>
                      <span className="monitorFlow__line" />
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="section caseSection reveal-on-scroll"
          id="checks"
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          <div className="container">
            <div className="caseTextBlock">
              <h2>{copy.checksTitle}</h2>
              <p className="section__lead">{copy.checksLead}</p>
            </div>

            <div className="monitorCheckGrid">
              {payload.checks.map((check) => (
                <article className="monitorCheckCard" key={check.id}>
                  <div className="monitorCheckCard__top">
                    <p className="caseCard__label">{check.label}</p>
                    <span className={`monitorStatus monitorStatus--${check.status}`}>
                      {copy.statusLabels[check.status]}
                    </span>
                  </div>
                  <p className="monitorCheckCard__detail">
                    {buildCheckDetail(check.id, payload, language)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section caseSection reveal-on-scroll"
          id="profile"
          style={{ "--reveal-delay": "150ms" } as CSSProperties}
        >
          <div className="container">
            <div className="caseTextBlock">
              <h2>{copy.outputTitle}</h2>
              <p className="section__lead">{copy.outputLead}</p>
            </div>

            <div className="monitorProfileGrid">
              <div className="monitorMetricGrid monitorMetricGrid--profile">
                <article className="monitorMetricCard">
                  <p className="caseCard__label">{copy.peopleLabel}</p>
                  <strong>{payload.metrics.personCount.toLocaleString(language === "de" ? "de-DE" : "en-US")}</strong>
                </article>
                <article className="monitorMetricCard">
                  <p className="caseCard__label">{copy.entitiesLabel}</p>
                  <strong>{payload.metrics.entityCount.toLocaleString(language === "de" ? "de-DE" : "en-US")}</strong>
                </article>
                <article className="monitorMetricCard">
                  <p className="caseCard__label">{copy.coverageLabel}</p>
                  <strong>{payload.metrics.aliasCoveragePct.toLocaleString(language === "de" ? "de-DE" : "en-US")}%</strong>
                </article>
                <article className="monitorMetricCard">
                  <p className="caseCard__label">{copy.latestLabel}</p>
                  <strong>{formatDate(payload.metrics.latestPublicationDate, language)}</strong>
                </article>
              </div>

              <article className="monitorProgrammes">
                <p className="caseCard__label">{copy.topProgrammesLabel}</p>
                <div className="monitorProgrammes__list">
                  {payload.metrics.topProgrammes.map((programme) => (
                    <div className="monitorProgrammeRow" key={programme.programme}>
                      <div className="monitorProgrammeRow__meta">
                        <span>{programme.programme}</span>
                        <strong>{programme.count.toLocaleString(language === "de" ? "de-DE" : "en-US")}</strong>
                      </div>
                      <div className="monitorProgrammeRow__track">
                        <span
                          className="monitorProgrammeRow__fill"
                          style={{ width: `${(programme.count / topProgrammeMax) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
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
              <a
                className="caseSourceLink"
                href={`${import.meta.env.BASE_URL}data/eu-sanctions-pipeline-status.json`}
                rel="noreferrer"
                target="_blank"
              >
                eu-sanctions-pipeline-status.json
              </a>
              <a
                className="caseSourceLink"
                href={`${import.meta.env.BASE_URL}data/eu-sanctions-matcher.json`}
                rel="noreferrer"
                target="_blank"
              >
                eu-sanctions-matcher.json
              </a>
              <a
                className="caseSourceLink"
                href="https://circabc.europa.eu/d/a/workspace/SpacesStore/9cf02a9e-7604-4178-a21d-d0b6bdcb4114/MA_FSF_EN.pdf"
                rel="noreferrer"
                target="_blank"
              >
                MA_FSF_EN.pdf
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SanctionsPipelineMonitorPage;
