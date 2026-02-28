const Header = () => {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__brand" href="#top">
          JC
        </a>

        <nav aria-label="Primary">
          <ul className="header__nav">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;