import type { Language } from "../i18n/content";

type FooterProps = {
  language: Language;
};

const Footer = ({ language }: FooterProps) => {
  const backToTopLabel = language === "de" ? "Nach oben" : "Back to top";

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} Julio Caesar</p>
        <a href="#top">{backToTopLabel} ↑</a>
      </div>
    </footer>
  );
};

export default Footer;
