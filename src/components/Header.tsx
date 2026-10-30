import { useEffect, useRef, useState } from "react";
import type { Language } from "../i18n/content";

type HeaderProps = {
  language: Language;
  navItems: Array<{
    href: string;
    label: string;
  }>;
  brandHref: string;
  brandLabel: string;
  languageToggleLabel: string;
  onLanguageChange: (language: Language) => void;
};

const Header = ({
  language,
  navItems,
  brandHref,
  brandLabel,
  languageToggleLabel,
  onLanguageChange,
}: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sectionIds = navItems.map(item => item.href.slice(1)).join(",");

  useEffect(() => {
    const updateSection = () => {
      const offset = (headerRef.current?.getBoundingClientRect().bottom ?? 80) + 48;
      let current = "";
      for (const id of sectionIds.split(",")) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().height > 0 && section.getBoundingClientRect().top <= offset) {
          current = `#${id}`;
        }
      }
      setActiveHref(current);
    };
    updateSection();
    window.addEventListener("scroll", updateSection, { passive: true });
    window.addEventListener("resize", updateSection);
    return () => {
      window.removeEventListener("scroll", updateSection);
      window.removeEventListener("resize", updateSection);
    };
  }, [sectionIds]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof window.Node && !headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  return (
    <header className="header" ref={headerRef}>
      <a className="skip-link" href="#main-content">
        {language === "de" ? "Zum Inhalt springen" : "Skip to content"}
      </a>
      <div className="container header__inner">
        <a className="header__brand" href={brandHref} aria-label={brandLabel}>
          <span className="header__brandName">Julio Caesar</span>
          <span className="header__brandTagline">Data &amp; Analytics</span>
        </a>

        <button
          className="header__menuButton"
          type="button"
          ref={menuButtonRef}
          aria-expanded={menuOpen}
          aria-controls="portfolio-navigation"
          onClick={() => setMenuOpen(open => !open)}
        >
          {menuOpen ? (language === "de" ? "Schließen" : "Close") : (language === "de" ? "Menü" : "Menu")}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d={menuOpen ? "M4 4l8 8M12 4l-8 8" : "M3 5h10M3 11h10"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        <nav id="portfolio-navigation" className={menuOpen ? "header__navigation is-open" : "header__navigation"} aria-label={language === "de" ? "Hauptnavigation" : "Primary"}>
          <ul className="header__nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} aria-current={activeHref === item.href ? "location" : undefined} onClick={() => {
                  setMenuOpen(false);
                  setActiveHref(item.href);
                  const target = document.getElementById(item.href.slice(1));
                  if (target) {
                    target.tabIndex = -1;
                    target.focus({ preventScroll: true });
                  }
                }}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__language" role="group" aria-label={languageToggleLabel}>
          <button
            type="button"
            className={`header__languageButton${language === "en" ? " is-active" : ""}`}
            onClick={() => onLanguageChange("en")}
            aria-pressed={language === "en"}
            disabled={language === "en"}
          >
            EN
          </button>
          <button
            type="button"
            className={`header__languageButton${language === "de" ? " is-active" : ""}`}
            onClick={() => onLanguageChange("de")}
            aria-pressed={language === "de"}
            disabled={language === "de"}
          >
            DE
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
