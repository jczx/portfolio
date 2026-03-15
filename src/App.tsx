import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { copyByLanguage, type Language } from "./i18n/content";

const LANGUAGE_STORAGE_KEY = "portfolio-language";
const detectInitialLanguage = (): Language => {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "en" || stored === "de") {
    return stored;
  }

  return navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
};

function App() {
  const [language, setLanguage] = useState<Language>(() => detectInitialLanguage());
  const copy = copyByLanguage[language];

  const handleLanguageChange = useCallback((nextLanguage: Language) => {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    if (!revealElements.length) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
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
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [language]);

  return (
    <div id="top">
      <Header
        language={language}
        navCopy={copy.nav}
        languageToggleLabel={copy.languageToggleLabel}
        onLanguageChange={handleLanguageChange}
      />
      <main>
        <Hero copy={copy.hero} />
        <About copy={copy.about} />
        <Projects language={language} copy={copy.experience} />
        <Contact copy={copy.contact} />
      </main>
    </div>
  );
}

export default App;
