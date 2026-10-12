import type { Language } from "../i18n/content";
import results from "../../public/data/fraud-results.json";
import Footer from "./Footer";

const text = {
  en: {
    back: "Back to portfolio", eyebrow: "Data science / Case study",
    title: "Credit card fraud detection",
    lead: "Finding fraud while keeping manual reviews manageable.",
    result: "What the model found", test: "Final test", transactions: "transactions", frauds: "fraud cases",
    detected: "Fraud detected", missed: "Fraud missed", falseAlerts: "Legitimate transactions flagged",
    reviews: "transactions sent for review", precision: "of alerts were fraud", recall: "of fraud detected",
    approach: "How it works",
    steps: [
      ["Prepare the data", "DuckDB validates the ULB dataset and prepares 30 transaction features. The outcome label is excluded from model inputs."],
      ["Compare models in time order", "A dummy baseline, logistic regression and XGBoost are compared using three forward-validation folds. Separate windows handle training, calibration, threshold selection and final testing (60 / 15 / 10 / 15%)."],
      ["Set a review budget", "Unweighted XGBoost was selected by validation average precision. Its review threshold was chosen within a 1% validation review budget, then frozen before testing. FastAPI serves the saved model locally."],
    ],
    comparison: "Model comparison", model: "Model", validation: "Validation AP", final: "Test AP", selected: "Selected",
    ap: "AP = average precision: a ranking measure, not accuracy. Validation is the mean across training folds; test uses calibrated scores. Model selection used validation only.",
    limits: "Limitations",
    limitations: [
      "Most alerts were legitimate transactions. The review budget applies to validation; future workload can change.",
      "Sigmoid calibration worsened test Brier score and log loss. Its fitting window had only 38 fraud cases.",
      "The dataset covers two days in 2013, with anonymised features and only 52 test frauds. These results do not establish performance on future banking transactions.",
    ],
    evidence: "Explore the work", source: "Download source code", metrics: "View saved results", dataset: "ULB dataset",
    sourceNote: "Python, SQL, tests and reproduction instructions. Dataset and trained model are not included.",
    models: ["Dummy baseline", "Logistic regression", "XGBoost", "Logistic regression · weighted", "XGBoost · weighted"],
  },
  de: {
    back: "Zurück zum Portfolio", eyebrow: "Data Science / Fallstudie",
    title: "Kreditkartenbetrug erkennen",
    lead: "Betrug erkennen und den Aufwand für manuelle Prüfungen begrenzen.",
    result: "Ergebnisse des Modells", test: "Abschließender Test", transactions: "Transaktionen", frauds: "Betrugsfälle",
    detected: "Betrug erkannt", missed: "Betrug übersehen", falseAlerts: "Legitime Transaktionen markiert",
    reviews: "Transaktionen zur Prüfung markiert", precision: "der Meldungen waren Betrug", recall: "der Betrugsfälle erkannt",
    approach: "Vorgehen",
    steps: [
      ["Daten vorbereiten", "DuckDB validiert den ULB-Datensatz und bereitet 30 Transaktionsmerkmale auf. Das Betrugslabel wird nicht als Eingabemerkmal verwendet."],
      ["Modelle chronologisch vergleichen", "Eine einfache Baseline, logistische Regression und XGBoost werden in drei zeitlich vorwärts gerichteten Validierungsdurchläufen verglichen. Training, Kalibrierung, Schwellenwahl und Test nutzen getrennte Zeitfenster (60 / 15 / 10 / 15 %)."],
      ["Prüfkapazität festlegen", "Ungewichtetes XGBoost wurde anhand der Average Precision in der Validierung ausgewählt. Die Schwelle wurde bei höchstens 1 % Prüfquote in der Validierung festgelegt und vor dem Test eingefroren. FastAPI stellt das gespeicherte Modell lokal bereit."],
    ],
    comparison: "Modellvergleich", model: "Modell", validation: "Validierungs-AP", final: "Test-AP", selected: "Ausgewählt",
    ap: "AP = Average Precision: ein Maß für das Ranking, nicht die Genauigkeit. Validierung: Mittelwert der Trainingsfolds. Test: kalibrierte Werte. Die Modellauswahl basiert ausschließlich auf der Validierung.",
    limits: "Aussagekraft und Grenzen",
    limitations: [
      "Die meisten Meldungen betrafen legitime Transaktionen. Die Prüfgrenze gilt für die Validierung; der spätere Prüfaufwand kann sich ändern.",
      "Die Sigmoid-Kalibrierung verschlechterte Brier Score und Log Loss im Test. Das Kalibrierungsfenster enthielt nur 38 Betrugsfälle.",
      "Der Datensatz umfasst zwei Tage aus 2013, anonymisierte Merkmale und nur 52 Betrugsfälle im Test. Die Ergebnisse belegen keine Leistung bei zukünftigen Banktransaktionen.",
    ],
    evidence: "Projekt ansehen", source: "Quellcode herunterladen", metrics: "Gespeicherte Ergebnisse", dataset: "ULB-Datensatz",
    sourceNote: "Python, SQL, Tests und Anleitung zur Reproduktion. Datensatz und trainiertes Modell sind nicht enthalten.",
    models: ["Einfache Baseline", "Logistische Regression", "XGBoost", "Logistische Regression · gewichtet", "XGBoost · gewichtet"],
  },
};

export default function FraudDetectionPage({ language, homeHref }: { language: Language; homeHref: string }) {
  const copy = text[language];
  const locale = language === "de" ? "de-DE" : "en-US";
  const number = (value: number) => value.toLocaleString(locale);
  const percent = (value: number) => value.toLocaleString(locale, { style: "percent", maximumFractionDigits: 2 });
  const score = (value: number) => value.toLocaleString(locale, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  const test = results.test;
  const detected = test.positives - test.missed_fraud;

  return (
    <div id="top">
      <main className="caseStudyPage fraudCase" id="main-content" tabIndex={-1}>
        <section className="caseHero">
          <div className="container caseHero__content">
            <a className="caseHero__back" href={homeHref}>{copy.back}</a>
            <p className="caseHero__eyebrow">{copy.eyebrow}</p>
            <h1 className="caseHero__title">{copy.title}</h1>
            <p className="caseHero__lead">{copy.lead}</p>
            <p className="fraudCase__stack">Python · DuckDB · XGBoost · FastAPI</p>
          </div>
        </section>
        <div className="container fraudCase__body">
          <section id="results" aria-labelledby="fraud-results-heading">
            <p className="fraudCase__eyebrow">{copy.test} · {number(test.n)} {copy.transactions} · {number(test.positives)} {copy.frauds}</p>
            <h2 id="fraud-results-heading">{copy.result}</h2>
            <dl className="fraudCase__metrics">
              {[[copy.detected, `${detected} / ${test.positives}`], [copy.falseAlerts, number(test.false_positives)], [copy.missed, number(test.missed_fraud)]].map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
            <p>{number(test.alerts)} {copy.reviews} ({percent(test.alert_rate)}). {percent(test.recall)} {copy.recall}.</p>
            <div className="fraudCase__reviewBar" aria-hidden="true"><span style={{ width: `${test.precision * 100}%` }} /></div>
            <p className="fraudCase__note">{percent(test.precision)} {copy.precision}.</p>
          </section>
          <section id="methodology" aria-labelledby="fraud-method-heading">
            <h2 id="fraud-method-heading">{copy.approach}</h2>
            <ol className="fraudCase__steps">
              {copy.steps.map(([title, description]) => <li key={title}><h3>{title}</h3><p>{description}</p></li>)}
            </ol>
            <details className="fraudCase__comparison">
              <summary>{copy.comparison}</summary>
              <div className="fraudCase__tableWrap">
                <table>
                  <caption>{copy.ap}</caption>
                  <thead><tr><th scope="col">{copy.model}</th><th scope="col">{copy.validation}</th><th scope="col">{copy.final}</th></tr></thead>
                  <tbody>{results.comparison.map((model, index) => (
                    <tr key={model.group} className={model.group === results.selected_group ? "is-selected" : undefined}>
                      <th scope="row">{copy.models[index]}{model.group === results.selected_group && <small>{copy.selected}</small>}</th>
                      <td>{score(model.validation_ap)}</td><td>{score(model.test_ap)}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </details>
          </section>
          <section aria-labelledby="fraud-limits-heading">
            <h2 id="fraud-limits-heading">{copy.limits}</h2>
            <ul className="fraudCase__limits">{copy.limitations.map(item => <li key={item}>{item}</li>)}</ul>
          </section>
          <section id="sources" aria-labelledby="fraud-sources-heading">
            <h2 id="fraud-sources-heading">{copy.evidence}</h2>
            <div className="fraudCase__links">
              <a href="./downloads/credit-fraud-source.zip" download>{copy.source} <span aria-hidden="true">↓</span></a>
              <a href="./data/fraud-results.json">{copy.metrics}</a>
              <a href={results.dataset_url} target="_blank" rel="noreferrer">{copy.dataset} <span aria-hidden="true">↗</span></a>
            </div>
            <p className="fraudCase__note">{copy.sourceNote}</p>
          </section>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
}
