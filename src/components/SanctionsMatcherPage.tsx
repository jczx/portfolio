import {
  useDeferredValue,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import {
  type SanctionsDatasetPayload,
} from "../data/euSanctionsSample";
import {
  createSanctionsIndex,
  formatMatchScore,
  rankSanctionsMatches,
} from "../utils/sanctionsMatcher";
import type { Language } from "../i18n/content";
import { isSanctionsDataset } from "../utils/sanctionsData";
import { useLocalJson } from "../utils/useLocalJson";
import DemoLoadState from "./DemoLoadState";

type SanctionsMatcherPageProps = {
  homeHref: string;
  language: Language;
};

const copyByLanguage = {
  en: {
    backLabel: "Back to portfolio",
    eyebrow: "NLP / Entity Resolution",
    title: "EU Sanctions Name Match Explorer",
    lead:
      "Compare names and aliases from the official EU sanctions list. Review ranked candidates and the evidence behind each match.",
    sampleLabel: "Try a sample query",
    sampleQueries: ["Wagner Group", "Maxim Shugaley", "Valery Zakharov", "Lobaye Invest"],
    inputLabel: "Enter a person or entity name",
    inputPlaceholder: "Type a name to compare",
    helperFallback:
      "A small example dataset is in use, rather than the full official list.",
    resultsTitle: "Top candidate matches",
    emptyState: "Type a name to see ranked matches.",
    noResults: "No candidate cleared the current threshold.",
    scoreLabel: "Similarity",
    aliasLabel: "Best alias",
    idLabel: "Reference",
    typeLabel: "Type",
    dateLabel: "Latest publication",
    regimeLabel: "Programme",
    reasonsLabel: "Why it surfaced",
    methodologyTitle: "Methodology",
    methodologyLead:
      "Scores combine spelling similarity and shared name tokens. They support manual review.",
    methodologyPoints: [
      "Names are normalized before matching so punctuation, accents, casing, and spacing do not dominate the result.",
      "The score combines edit distance, token overlap, containment, and alias matching instead of relying on a single fuzzy metric.",
      "Results are ranked, explained, and kept in human-review mode: candidate matches only, never a final sanctions verdict.",
    ],
    guardrailsTitle: "Guardrails",
    guardrails: [
      "This is not a production screening tool.",
      "It does not decide whether someone is sanctioned.",
      "Scores describe name similarity, not the probability of a sanctions match.",
    ],
    sourcesTitle: "Official Sources",
    sources: [
      {
        label: "EU Sanctions Helpdesk resources",
        href: "https://eu-sanctions-compliance-helpdesk.europa.eu/resources_en",
      },
      {
        label: "EU Sanctions Map",
        href: "https://www.sanctionsmap.eu/",
      },
      {
        label: "FSF stakeholders' manual",
        href: "https://circabc.europa.eu/d/a/workspace/SpacesStore/9cf02a9e-7604-4178-a21d-d0b6bdcb4114/MA_FSF_EN.pdf",
      },
    ],
  },
  de: {
    backLabel: "Zurück zum Portfolio",
    eyebrow: "NLP / Entity Resolution",
    title: "EU-Sanktionslisten Name Match Explorer",
    lead:
      "Namen und Aliasse aus der offiziellen EU-Sanktionsliste vergleichen. Priorisierte Kandidaten und die Hinweise zu jedem Treffer nachvollziehen.",
    sampleLabel: "Beispielabfrage",
    sampleQueries: ["Wagner Group", "Maxim Shugaley", "Valery Zakharov", "Lobaye Invest"],
    inputLabel: "Personen- oder Unternehmensnamen eingeben",
    inputPlaceholder: "Namen zum Vergleich eingeben",
    helperFallback:
      "Ein kleiner Beispieldatensatz wird verwendet, anstelle der vollständigen offiziellen Liste.",
    resultsTitle: "Top-Kandidaten",
    emptyState: "Gib einen Namen ein, um priorisierte Treffer zu sehen.",
    noResults: "Kein Kandidat liegt über dem aktuellen Schwellenwert.",
    scoreLabel: "Ähnlichkeit",
    aliasLabel: "Bester Alias",
    idLabel: "Referenz",
    typeLabel: "Typ",
    dateLabel: "Letzte Veröffentlichung",
    regimeLabel: "Programm",
    reasonsLabel: "Warum der Treffer erscheint",
    methodologyTitle: "Methodik",
    methodologyLead:
      "Die Werte kombinieren Ähnlichkeiten in der Schreibweise mit gemeinsamen Namensbestandteilen. Sie unterstützen die manuelle Prüfung.",
    methodologyPoints: [
      "Namen werden vor dem Matching normalisiert, damit Satzzeichen, Akzente, Großschreibung und Leerzeichen das Ergebnis nicht dominieren.",
      "Der Score kombiniert Edit Distance, Token-Overlap, Containment und Alias-Matching statt nur auf eine Fuzzy-Kennzahl zu setzen.",
      "Ergebnisse werden gerankt, erklärt und bewusst im Human-Review-Modus gehalten: nur Kandidaten, niemals ein finales Sanktionsurteil.",
    ],
    guardrailsTitle: "Leitplanken",
    guardrails: [
      "Das ist kein produktives Screening-Tool.",
      "Es entscheidet nicht, ob jemand sanktioniert ist.",
      "Die Werte beschreiben Namensähnlichkeit, nicht die Wahrscheinlichkeit eines Sanktionstreffers.",
    ],
    sourcesTitle: "Offizielle Quellen",
    sources: [
      {
        label: "EU Sanctions Helpdesk Ressourcen",
        href: "https://eu-sanctions-compliance-helpdesk.europa.eu/resources_en",
      },
      {
        label: "EU Sanctions Map",
        href: "https://www.sanctionsmap.eu/",
      },
      {
        label: "FSF Stakeholders' Manual",
        href: "https://circabc.europa.eu/d/a/workspace/SpacesStore/9cf02a9e-7604-4178-a21d-d0b6bdcb4114/MA_FSF_EN.pdf",
      },
    ],
  },
} satisfies Record<
  Language,
  {
    backLabel: string;
    eyebrow: string;
    title: string;
    lead: string;
    sampleLabel: string;
    sampleQueries: string[];
    inputLabel: string;
    inputPlaceholder: string;
    helperFallback: string;
    resultsTitle: string;
    emptyState: string;
    noResults: string;
    scoreLabel: string;
    aliasLabel: string;
    idLabel: string;
    typeLabel: string;
    dateLabel: string;
    regimeLabel: string;
    reasonsLabel: string;
    methodologyTitle: string;
    methodologyLead: string;
    methodologyPoints: string[];
    guardrailsTitle: string;
    guardrails: string[];
    sourcesTitle: string;
    sources: Array<{
      label: string;
      href: string;
    }>;
  }
>;

const typeLabelByLanguage = {
  en: {
    P: "Person",
    E: "Entity",
  },
  de: {
    P: "Person",
    E: "Organisation",
  },
} satisfies Record<Language, Record<"P" | "E", string>>;

const formatMatchReason = (reason: string, language: Language) => {
  if (language === "en") return reason;
  const translations: Record<string, string> = {
    "Exact normalized alias match": "Exakter Treffer nach Normalisierung",
    "Matched via alias set": "Treffer über einen Alias",
    "Low edit distance to best alias": "Geringer Zeichenabstand zum besten Alias",
    "Matched after normalization": "Treffer nach Normalisierung",
    "Closest overall normalized candidate": "Ähnlichster normalisierter Kandidat",
  };
  return reason.startsWith("Shared tokens: ") ? reason.replace("Shared tokens: ", "Gemeinsame Namensbestandteile: ") : translations[reason] ?? reason;
};

const formatSourceDate = (value: string, language: Language) => {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(language === "de" ? "de-DE" : "en-US", {
    dateStyle: "medium",
  }).format(parsed);
};

const buildHelperText = (payload: SanctionsDatasetPayload, language: Language, fallbackText: string) => {
  if (payload.meta.sourceKind !== "official-xml") {
    return fallbackText;
  }

  const count = payload.meta.recordCount.toLocaleString(language === "de" ? "de-DE" : "en-US");
  const date = formatSourceDate(payload.meta.sourceDate, language);

  return language === "de"
    ? `Offizieller FSF-XML-Export vom ${date} mit ${count} Einträgen.`
    : `Official FSF XML export dated ${date} with ${count} entries.`;
};

const SanctionsMatcherPage = ({ homeHref, language }: SanctionsMatcherPageProps) => {
  const copy = copyByLanguage[language];
  const typeCopy = typeLabelByLanguage[language];
  const [query, setQuery] = useState("Wagner Group");
  const load = useLocalJson("data/eu-sanctions-matcher.json", isSanctionsDataset);
  const dataset = load.data;
  const index = useMemo(() => createSanctionsIndex(dataset?.entries ?? []), [dataset]);
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => rankSanctionsMatches(deferredQuery, index, 5), [deferredQuery, index]);
  const helperText = dataset ? buildHelperText(dataset, language, copy.helperFallback) : "";

  return (
    <div id="top">
      <main className="caseStudyPage" id="main-content" tabIndex={-1}>
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
          id="matcher"
          style={{ "--reveal-delay": "90ms" } as CSSProperties}
        >
          <div className="container sanctionsMatcher">
            <div className="sanctionsMatcher__panel">
              <div className="sanctionsMatcher__field">
                <label className="sanctionsMatcher__label" htmlFor="sanctions-query">
                  {copy.inputLabel}
                </label>
                <input
                  className="sanctionsMatcher__input"
                  id="sanctions-query"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={copy.inputPlaceholder}
                  type="search"
                  disabled={load.status !== "ready"}
                  value={query}
                />
              </div>

              <div className="sanctionsMatcher__samples">
                <p className="sanctionsMatcher__label">{copy.sampleLabel}</p>
                <div className="sanctionsMatcher__sampleButtons">
                  {copy.sampleQueries.map((sample) => (
                    <button
                      className={`sanctionsMatcher__sampleButton${query === sample ? " is-active" : ""}`}
                      key={sample}
                      onClick={() => setQuery(sample)}
                      type="button"
                      disabled={load.status !== "ready"}
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              {helperText && <p className="sanctionsMatcher__helper">{helperText}</p>}
              {load.status !== "ready" && <DemoLoadState status={load.status} language={language} kind="dataset" onRetry={load.retry} />}
            </div>

            <div className="sanctionsMatcher__results">
              <div className="caseTextBlock">
                <h2>{copy.resultsTitle}</h2>
              </div>

              {load.status === "ready" && !query.trim() ? (
                <div className="sanctionsResultCard sanctionsResultCard--empty">
                  <p>{copy.emptyState}</p>
                </div>
              ) : null}

              {load.status === "ready" && query.trim() && !results.length ? (
                <div className="sanctionsResultCard sanctionsResultCard--empty">
                  <p>{copy.noResults}</p>
                </div>
              ) : null}

              {results.map((match) => (
                <article className="sanctionsResultCard" key={`${match.entry.fsdId}-${match.alias}`}>
                  <div className="sanctionsResultCard__top">
                    <div>
                      <p className="caseCard__label">
                        {copy.idLabel} {match.entry.fsdId}
                      </p>
                      <h3 className="sanctionsResultCard__title">{match.entry.primaryName}</h3>
                    </div>
                    <div className="sanctionsResultCard__score">
                      <span>{copy.scoreLabel}</span>
                      <strong>{formatMatchScore(match.score)}</strong>
                    </div>
                  </div>

                  <div className="sanctionsResultCard__meta">
                    <div>
                      <p className="caseCard__label">{copy.aliasLabel}</p>
                      <p>{match.alias}</p>
                    </div>
                    <div>
                      <p className="caseCard__label">{copy.typeLabel}</p>
                      <p>{typeCopy[match.entry.type]}</p>
                    </div>
                    <div>
                      <p className="caseCard__label">{copy.regimeLabel}</p>
                      <p>{match.entry.regime}</p>
                    </div>
                    <div>
                      <p className="caseCard__label">{copy.dateLabel}</p>
                      <p>{match.entry.designationDate || "-"}</p>
                    </div>
                  </div>

                  <div className="sanctionsResultCard__body">
                    <p className="caseCard__label">{copy.reasonsLabel}</p>
                    <ul className="caseMethodList">
                      {match.reasons.map((reason) => (
                        <li key={reason}>{formatMatchReason(reason, language)}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section caseSection reveal-on-scroll"
          id="methodology"
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          <div className="container">
            <div className="caseTextBlock">
              <h2>{copy.methodologyTitle}</h2>
              <p className="section__lead">{copy.methodologyLead}</p>
            </div>

            <div className="caseMethodGrid">
              <article className="caseMethodPanel">
                <p className="caseCard__label">{copy.methodologyTitle}</p>
                <ul className="caseMethodList">
                  {copy.methodologyPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>

              <article className="caseMethodPanel">
                <p className="caseCard__label">{copy.guardrailsTitle}</p>
                <ul className="caseMethodList">
                  {copy.guardrails.map((point) => (
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
          style={{ "--reveal-delay": "150ms" } as CSSProperties}
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

export default SanctionsMatcherPage;
