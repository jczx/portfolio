import { Suspense, lazy, useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import PortfolioProjects from "./components/PortfolioProjects";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import { copyByLanguage, type Language } from "./i18n/content";
import { getSiteMetadata, getPageFromLocation, type SitePage } from "./data/siteMetadata";

const LANGUAGE_STORAGE_KEY = "portfolio-language";
const SANCTIONS_CASE_STUDY_SLUG = "eu-sanctions-name-match";
const SANCTIONS_PIPELINE_CASE_STUDY_SLUG = "sanctions-pipeline-monitor";
const HOME_HREF = "./";

const SanctionsMatcherPage = lazy(() => import("./components/SanctionsMatcherPage"));
const FraudDetectionPage = lazy(() => import("./components/FraudDetectionPage"));
const SanctionsPipelineMonitorPage = lazy(
  () => import("./components/SanctionsPipelineMonitorPage"),
);

const detectInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "en" || stored === "de") {
      return stored;
    }
  } catch {
    // Browser preferences can block storage; the site still works in this tab.
  }

  return navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
};

const getActiveCaseStudy = () => {
  if (typeof window === "undefined") return null;
  const page = getPageFromLocation(window.location);
  return page === "home" ? null : page;
};

const subscribeLanguagePreference = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};

type AppProps = { initialLanguage?: Language; initialPage?: SitePage };

function App({ initialLanguage, initialPage }: AppProps = {}) {
  const preferredLanguage = useSyncExternalStore(subscribeLanguagePreference, detectInitialLanguage, () => initialLanguage ?? "en");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const language = selectedLanguage ?? preferredLanguage;
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(() =>
    initialPage ? (initialPage === "home" ? null : initialPage) : getActiveCaseStudy(),
  );
  const isSanctionsCaseStudy = activeCaseStudy === SANCTIONS_CASE_STUDY_SLUG;
  const isSanctionsPipelineCaseStudy = activeCaseStudy === SANCTIONS_PIPELINE_CASE_STUDY_SLUG;
  const isFraudCaseStudy = activeCaseStudy === "fraud-detection";
  const isCaseStudy = isSanctionsCaseStudy || isSanctionsPipelineCaseStudy || isFraudCaseStudy;
  const copy = copyByLanguage[language];
  const backToPortfolioLabel =
    language === "de" ? "Zurück zum Portfolio" : "Back to portfolio";
  const backToTopLabel = language === "de" ? "Zurück nach oben" : "Back to top";
  const caseStudyLoadingCopy =
    language === "de"
      ? { eyebrow: "Fallstudie lädt", title: "Einen Moment..." }
      : { eyebrow: "Loading case study", title: "One moment..." };

  const handleLanguageChange = useCallback((nextLanguage: Language) => {
    setSelectedLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // Switching languages does not depend on saving the preference.
    }
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
    const page = isSanctionsCaseStudy ? SANCTIONS_CASE_STUDY_SLUG
      : isSanctionsPipelineCaseStudy ? SANCTIONS_PIPELINE_CASE_STUDY_SLUG : isFraudCaseStudy ? "fraud-detection" : "home";
    const metadata = getSiteMetadata(page, language);
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", metadata.description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", language === "de" ? "de_DE" : "en_US");
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", metadata.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", metadata.description);
  }, [isSanctionsCaseStudy, isSanctionsPipelineCaseStudy, isFraudCaseStudy, language]);

  useEffect(() => {
    const shouldRevealImmediately =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window);

    const intersectionObserver = shouldRevealImmediately
      ? null
      : new IntersectionObserver(
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

    const revealElement = (element: HTMLElement) => {
      if (element.classList.contains("is-visible")) {
        return;
      }

      if (shouldRevealImmediately) {
        element.classList.add("is-visible");
        return;
      }

      intersectionObserver?.observe(element);
    };

    const registerRevealElements = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches(".reveal-on-scroll")) {
        revealElement(root);
      }

      root
        .querySelectorAll<HTMLElement>(".reveal-on-scroll")
        .forEach(revealElement);
    };

    registerRevealElements(document);

    // Lazy case-study components mount after this effect initially runs.
    // Observe DOM additions so their reveal elements cannot remain invisible.
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            registerRevealElements(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
    };
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
    ? isFraudCaseStudy
      ? [
          { href: "#results", label: language === "de" ? "Ergebnisse" : "Results" },
          { href: "#methodology", label: language === "de" ? "Vorgehen" : "Method" },
          { href: "#sources", label: language === "de" ? "Quellen" : "Sources" },
        ]
      : isSanctionsCaseStudy
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
        { href: "#case-studies", label: copy.nav.work },
        { href: "#experience", label: copy.nav.experience },
        { href: "#skills", label: copy.nav.skills },
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
              <main className="caseStudyPage" id="main-content" tabIndex={-1}>
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
          {isFraudCaseStudy ? (
            <FraudDetectionPage homeHref={HOME_HREF} language={language} />
          ) : isSanctionsCaseStudy ? (
            <SanctionsMatcherPage homeHref={HOME_HREF} language={language} />
          ) : (
            <SanctionsPipelineMonitorPage homeHref={HOME_HREF} language={language} />
          )}
        </Suspense>
      ) : (
        <div id="top">
          <main id="main-content" tabIndex={-1}>
            <Hero copy={copy.hero} />
            <About copy={copy.about} />
            <PortfolioProjects language={language} copy={copy.projects} />
            <Projects language={language} copy={copy.experience} />
            <Skills copy={copy.skills} />
            <Contact copy={copy.contact} />
          </main>
          <Footer language={language} />
        </div>
      )}
    </>
  );
}

export default App;
