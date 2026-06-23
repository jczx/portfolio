import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import PortfolioProjects from "./components/PortfolioProjects";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import { copyByLanguage, type Language } from "./i18n/content";

const LANGUAGE_STORAGE_KEY = "portfolio-language";
const SANCTIONS_CASE_STUDY_SLUG = "eu-sanctions-name-match";
const SANCTIONS_PIPELINE_CASE_STUDY_SLUG = "sanctions-pipeline-monitor";
const HOME_HREF = "./";

const SanctionsMatcherPage = lazy(() => import("./components/SanctionsMatcherPage"));
const SanctionsPipelineMonitorPage = lazy(
  () => import("./components/SanctionsPipelineMonitorPage"),
);

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
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(() => getActiveCaseStudy());
  const isSanctionsCaseStudy = activeCaseStudy === SANCTIONS_CASE_STUDY_SLUG;
  const isSanctionsPipelineCaseStudy = activeCaseStudy === SANCTIONS_PIPELINE_CASE_STUDY_SLUG;
  const isCaseStudy = isSanctionsCaseStudy || isSanctionsPipelineCaseStudy;
  const copy = copyByLanguage[language];
  const backToPortfolioLabel =
    language === "de" ? "Zurück zum Portfolio" : "Back to portfolio";
  const backToTopLabel = language === "de" ? "Zurück nach oben" : "Back to top";
  const caseStudyLoadingCopy =
    language === "de"
      ? { eyebrow: "Fallstudie lädt", title: "Einen Moment..." }
      : { eyebrow: "Loading case study", title: "One moment..." };

  const handleLanguageChange = useCallback((nextLanguage: Language) => {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  }, []);

  const handleCaseStudyOpen = useCallback((caseStudySlug: string) => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("case", caseStudySlug);
    nextUrl.hash = "";
    window.history.pushState({}, "", nextUrl);
    setActiveCaseStudy(caseStudySlug);
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setActiveCaseStudy(getActiveCaseStudy());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = isSanctionsCaseStudy
      ? `${language === "de" ? "EU-Sanktionslisten Name Match Explorer" : "EU Sanctions Name Match Explorer"} | Julio Caesar`
      : isSanctionsPipelineCaseStudy
        ? `Sanctions Pipeline Reliability Monitor | Julio Caesar`
        : `Julio Caesar | Data Engineering & AI Solutions`;
  }, [isSanctionsCaseStudy, isSanctionsPipelineCaseStudy, language]);

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
    ? isSanctionsCaseStudy
      ? [
          { href: "#matcher", label: "Matcher" },
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
        { href: "#case-studies", label: copy.nav.analysis },
        { href: "#experience", label: copy.nav.experience },
        { href: "#contact", label: copy.nav.contact },
      ];

  return (
    <>
      <Header
        brandHref={isCaseStudy ? HOME_HREF : "#top"}
        brandLabel={isCaseStudy ? backToPortfolioLabel : backToTopLabel}
        language={language}
        navItems={navItems}
        languageToggleLabel={copy.languageToggleLabel}
        onLanguageChange={handleLanguageChange}
      />

      {isCaseStudy ? (
        <Suspense
          fallback={(
            <div id="top">
              <main className="caseStudyPage">
                <section className="caseHero">
                  <div className="container caseHero__content">
                    <a className="caseHero__back" href={HOME_HREF}>
                      {backToPortfolioLabel}
                    </a>
                    <p className="caseHero__eyebrow">{caseStudyLoadingCopy.eyebrow}</p>
                    <h1 className="caseHero__title">{caseStudyLoadingCopy.title}</h1>
                  </div>
                </section>
              </main>
            </div>
          )}
        >
          {isSanctionsCaseStudy ? (
            <SanctionsMatcherPage homeHref={HOME_HREF} language={language} />
          ) : (
            <SanctionsPipelineMonitorPage homeHref={HOME_HREF} language={language} />
          )}
        </Suspense>
      ) : (
        <div id="top">
          <main>
            <Hero copy={copy.hero} />
            <About copy={copy.about} />
            <Skills copy={copy.skills} />
            <PortfolioProjects
              language={language}
              copy={copy.projects}
              onOpenCaseStudy={handleCaseStudyOpen}
            />
            <Projects language={language} copy={copy.experience} />
            <Contact copy={copy.contact} />
          </main>
          <Footer language={language} />
        </div>
      )}
    </>
  );
}

export default App;
