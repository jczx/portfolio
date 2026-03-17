import type { Language } from "../i18n/content";

type HeaderProps = {
  language: Language;
  navCopy: {
    about: string;
    experience: string;
    contact: string;
  };
  languageToggleLabel: string;
  onLanguageChange: (language: Language) => void;
};

const Header = ({ language, navCopy, languageToggleLabel, onLanguageChange }: HeaderProps) => {
  const brandLogo = `${import.meta.env.BASE_URL}favicon-jc.svg`;

  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__brand" href="#top" aria-label="Back to top">
          <img className="header__brandLogo" src={brandLogo} alt="JC" />
        </a>

        <nav aria-label="Primary">
          <ul className="header__nav">
            <li><a href="#about">{navCopy.about}</a></li>
            <li><a href="#experience">{navCopy.experience}</a></li>
            <li><a href="#contact">{navCopy.contact}</a></li>
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
