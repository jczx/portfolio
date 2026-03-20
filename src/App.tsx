import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import PortfolioProjects from "./components/PortfolioProjects";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CaseStudyPage from "./components/CaseStudyPage";
import SanctionsMatcherPage from "./components/SanctionsMatcherPage";
import SanctionsPipelineMonitorPage from "./components/SanctionsPipelineMonitorPage";
import { copyByLanguage, type Language } from "./i18n/content";

const LANGUAGE_STORAGE_KEY = "portfolio-language";
const FINANCE_CASE_STUDY_SLUG = "hyperscaler-capital-discipline";
const SANCTIONS_CASE_STUDY_SLUG = "eu-sanctions-name-match";
const SANCTIONS_PIPELINE_CASE_STUDY_SLUG = "sanctions-pipeline-monitor";

const detectInitialLanguage = (): Language => {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "en" || stored === "de") {
    return stored;
  }

  return navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
};

const getActiveCaseStudy = () => {
  return new URLSearchParams(window.location.search).get("case");
};

function App() {
  const [language, setLanguage] = useState<Language>(() => detectInitialLanguage());
  const activeCaseStudy = getActiveCaseStudy();
  const isFinanceCaseStudy = activeCaseStudy === FINANCE_CASE_STUDY_SLUG;
  const isSanctionsCaseStudy = activeCaseStudy === SANCTIONS_CASE_STUDY_SLUG;
  const isSanctionsPipelineCaseStudy = activeCaseStudy === SANCTIONS_PIPELINE_CASE_STUDY_SLUG;
  const isCaseStudy =
    isFinanceCaseStudy || isSanctionsCaseStudy || isSanctionsPipelineCaseStudy;
  const copy = copyByLanguage[language];

  const handleLanguageChange = useCallback((nextLanguage: Language) => {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = isFinanceCaseStudy
      ? `Hyperscaler Capital Discipline | Julio Caesar`
      : isSanctionsCaseStudy
        ? `EU Sanctions Name Match Explorer | Julio Caesar`
        : isSanctionsPipelineCaseStudy
          ? `Sanctions Pipeline Reliability Monitor | Julio Caesar`
        : `Julio Caesar`;
  }, [isFinanceCaseStudy, isSanctionsCaseStudy, isSanctionsPipelineCaseStudy, language]);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    if (!revealElements.length) {
      return;
    }

    const showAllRevealElements = () => {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      showAllRevealElements();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [isCaseStudy, language]);

  useEffect(() => {
    const { hash } = window.location;
    if (!hash) {
      return;
    }

    const target = document.querySelector<HTMLElement>(hash);
    if (!target) {
      return;
    }

    requestAnimationFrame(() => {
      target.scrollIntoView();
    });
  }, [isCaseStudy, language]);

  const navItems = isCaseStudy
    ? isFinanceCaseStudy
      ? [
        { href: "#overview", label: copy.caseStudy.nav.overview },
        { href: "#comparison", label: copy.caseStudy.nav.comparison },
        { href: "#methodology", label: copy.caseStudy.nav.methodology },
        { href: "#sources", label: copy.caseStudy.nav.sources },
      ]
      : isSanctionsCaseStudy
        ? [
        { href: "#matcher", label: language === "de" ? "Matcher" : "Matcher" },
        { href: "#methodology", label: language === "de" ? "Methodik" : "Methodology" },
        { href: "#sources", label: language === "de" ? "Quellen" : "Sources" },
      ]
        : [
        { href: "#overview", label: language === "de" ? "Überblick" : "Overview" },
        { href: "#checks", label: language === "de" ? "Prüfungen" : "Checks" },
        { href: "#sources", label: language === "de" ? "Quellen" : "Sources" },
      ]
    : [
        { href: "#about", label: copy.nav.about },
        { href: "#projects", label: copy.nav.analysis },
        { href: "#experience", label: copy.nav.experience },
        { href: "#contact", label: copy.nav.contact },
      ];

  return (
    <>
      <Header
        brandHref={isCaseStudy ? "./" : "#top"}
        brandLabel={isCaseStudy ? copy.caseStudy.backLabel : "Back to top"}
        language={language}
        navItems={navItems}
        languageToggleLabel={copy.languageToggleLabel}
        onLanguageChange={handleLanguageChange}
      />

      {isCaseStudy ? (
        isFinanceCaseStudy ? (
          <CaseStudyPage copy={copy.caseStudy} homeHref="./" language={language} />
        ) : (
          isSanctionsCaseStudy ? (
            <SanctionsMatcherPage homeHref="./" language={language} />
          ) : (
            <SanctionsPipelineMonitorPage homeHref="./" language={language} />
          )
        )
      ) : (
        <div id="top">
          <main>
            <Hero copy={copy.hero} />
            <About copy={copy.about} />
            <PortfolioProjects language={language} copy={copy.projects} />
            <Projects language={language} copy={copy.experience} />
            <Contact copy={copy.contact} />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
