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
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__brand" href={brandHref} aria-label={brandLabel}>
          <span className="header__brandName">Julio Caesar</span>
          <span className="header__brandTagline">Data Engineering &amp; AI Solutions</span>
        </a>

        <nav aria-label="Primary">
          <ul className="header__nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
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
