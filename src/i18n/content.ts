export type Language = "en" | "de";

type Copy = {
  nav: {
    about: string;
    analysis: string;
    experience: string;
    contact: string;
  };
  hero: {
    subtitle: string;
    intro: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    title: string;
    lead: string;
    points: string[];
  };
  projects: {
    title: string;
    lead: string;
    sourceLabel: string;
    outputLabel: string;
    methodsLabel: string;
    stackLabel: string;
    noteLabel: string;
  };
  analysis: {
    title: string;
    lead: string;
    eyebrow: string;
    featuredTitle: string;
    summary: string;
    expandCta: string;
    collapseCta: string;
    findingsLabel: string;
    findings: string[];
    figureTitle: string;
    figureSubtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  caseStudy: {
    backLabel: string;
    eyebrow: string;
    title: string;
    lead: string;
    nav: {
      overview: string;
      comparison: string;
      methodology: string;
      sources: string;
    };
    overviewTitle: string;
    overviewLead: string;
    findingsLabel: string;
    findings: string[];
    mainFigureTitle: string;
    mainFigureSubtitle: string;
    comparisonTitle: string;
    comparisonLead: string;
    capexChangeTitle: string;
    capexChangeSubtitle: string;
    marginGapTitle: string;
    marginGapSubtitle: string;
    methodologyTitle: string;
    methodologyLead: string;
    measuredLabel: string;
    measuredPoints: string[];
    guardrailsLabel: string;
    guardrailPoints: string[];
    sourcesTitle: string;
    sources: Array<{
      label: string;
      href: string;
    }>;
  };
  experience: {
    title: string;
    lead: string;
    timelineLabel: string;
    skillsLabel: string;
    highlightsLabel: string;
  };
  contact: {
    title: string;
    lead: string;
    linkedinLabel: string;
    githubLabel: string;
    emailLabel: string;
  };
  languageToggleLabel: string;
};

export const copyByLanguage: Record<Language, Copy> = {
  en: {
    nav: {
      about: "About",
      analysis: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      subtitle: "DataOps Consultant / Analytics Engineer",
      intro: [
        "I build reliable data platforms and turn data into usable insights.",
      ],
      primaryCta: "Get in touch",
      secondaryCta: "View experience",
    },
    about: {
      title: "About",
      lead:
        "I work at the intersection of data reliability, platform operations, and analytics. From ETL monitoring and release coordination to SQL development, dashboards, and applied data science.",
      points: [
        "Hands-on experience across banking, FMCG, and regulated production data environments.",
        "Core strengths in BI and DWH operations, SQL and PL/SQL implementation, and release reliability.",
        "I apply analytics and machine learning when the problem needs more than reporting.",
        "I help teams deliver stable releases and trustworthy reporting.",
      ],
    },
    projects: {
      title: "Projects",
      lead:
        "Three portfolio builds across finance analysis, NLP and entity resolution, and operational data reliability.",
      sourceLabel: "Data basis",
      outputLabel: "Output",
      methodsLabel: "What it proves",
      stackLabel: "Methods",
      noteLabel: "Constraint",
    },
    analysis: {
      title: "Featured Analysis",
      lead:
        "A homepage analysis should stay compact. Open the quick view for the short read, then move to the full edition if you want the full argument.",
      eyebrow: "SEC-Driven Public Company Analysis",
      featuredTitle:
        "Rising capital intensity, uneven cash discipline across hyperscalers",
      summary:
        "Microsoft, Alphabet, Meta, and Amazon, compared on capital investment intensity and a standardized free-cash-flow proxy from fiscal 2021 to the latest reported fiscal year.",
      expandCta: "Quick view",
      collapseCta: "Hide quick view",
      findingsLabel: "What the data supports",
      findings: [
        "Meta leads the latest period at 34.7% of revenue, well above the rest of the peer set.",
        "Microsoft and Alphabet cluster near 23%, but Microsoft preserves the strongest latest FCF proxy margin.",
        "Amazon improves from negative proxy free cash flow in 2021 to barely positive in the latest period.",
      ],
      figureTitle:
        "Capital investment intensity, 2021 vs latest reported fiscal year",
      figureSubtitle:
        "A start-to-end comparison is enough for the homepage: every company invests harder by the end of the window, but not by the same amount.",
      primaryCta: "Read full edition",
      secondaryCta: "Methodology",
    },
    caseStudy: {
      backLabel: "Back to portfolio",
      eyebrow: "Public Company Analysis",
      title: "Hyperscaler Capital Discipline",
      lead:
        "A conservative comparison of capital investment intensity and standardized cash discipline across Microsoft, Alphabet, Meta, and Amazon using SEC company facts only.",
      nav: {
        overview: "Overview",
        comparison: "Comparison",
        methodology: "Methodology",
        sources: "Sources",
      },
      overviewTitle: "Overview",
      overviewLead:
        "Capital investment intensity rises across all four companies from fiscal 2021 to the latest reported fiscal year, but the cash-conversion trade-off differs materially by company.",
      findingsLabel: "Defensible reading",
      findings: [
        "Meta is the clearest current investment outlier, reaching 34.7% of revenue in the latest reported fiscal year.",
        "High operating profitability does not translate one-for-one into post-investment cash conversion.",
        "Amazon remains the weakest latest FCF proxy profile in this comparison despite improving from 2021.",
      ],
      mainFigureTitle:
        "Capital investment intensity, 2021 to latest reported fiscal year",
      mainFigureSubtitle:
        "The lead figure establishes the directional change first: every company invests harder by the end of the window, but not to the same degree.",
      comparisonTitle: "Comparison",
      comparisonLead:
        "The supporting figures answer two follow-up questions: who accelerated investment the most, and how much operating profitability survives after that investment is funded.",
      capexChangeTitle:
        "Capital investment intensity, 2021 vs latest reported fiscal year",
      capexChangeSubtitle:
        "A direct start-to-end comparison makes the magnitude of the shift easier to read than a dense multi-line chart alone.",
      marginGapTitle:
        "Operating margin vs FCF proxy margin, latest reported fiscal year",
      marginGapSubtitle:
        "The gap between accounting profitability and post-investment cash discipline is where the peer set starts to separate.",
      methodologyTitle: "Methodology",
      methodologyLead:
        "This page is intentionally narrow. It trades narrative ambition for comparability, auditability, and clean metric definitions.",
      measuredLabel: "What is measured",
      measuredPoints: [
        "Revenue, operating margin, operating cash flow, capital investment cash outflow, and a standardized FCF proxy.",
        "Annual facts only, filtered to official SEC annual filing forms.",
        "A four-company peer set: Microsoft, Alphabet, Meta, and Amazon.",
        "Fiscal 2021 through the latest reported fiscal year in the derived dataset.",
      ],
      guardrailsLabel: "What it does not claim",
      guardrailPoints: [
        "It does not measure AI-specific capex directly.",
        "It does not claim a causal link between investment and margin pressure.",
        "It does not present company-reported free cash flow as perfectly standardized across issuers.",
        "It does not treat cash and cash equivalents as a full liquidity measure.",
      ],
      sourcesTitle: "Official Sources",
      sources: [
        {
          label: "SEC EDGAR API documentation",
          href: "https://www.sec.gov/edgar/sec-api-documentation",
        },
        {
          label: "SEC Accessing EDGAR Data",
          href: "https://www.sec.gov/os/accessing-edgar-data",
        },
        {
          label: "SEC ticker to CIK mapping",
          href: "https://www.sec.gov/files/company_tickers.json",
        },
        {
          label: "Example SEC Company Facts endpoint",
          href: "https://data.sec.gov/api/xbrl/companyfacts/CIK0000789019.json",
        },
      ],
    },
    experience: {
      title: "Experience",
      lead:
        "Recent roles across DataOps consulting, analytics engineering, DWH operations, and data platform support.",
      timelineLabel: "Career timeline",
      skillsLabel: "Key skills",
      highlightsLabel: "Role highlights",
    },
    contact: {
      title: "Contact",
      lead:
        "Based in Berlin, Germany. Here are a few ways to connect and learn more about my work:",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      emailLabel: "Email",
    },
    languageToggleLabel: "Switch language",
  },
  de: {
    nav: {
      about: "Über mich",
      analysis: "Projekte",
      experience: "Erfahrung",
      contact: "Kontakt",
    },
    hero: {
      subtitle: "DataOps Consultant / Analytics Engineer",
      intro: [
        "Ich baue zuverlässige Datenplattformen und mache Daten zu nutzbaren Erkenntnissen.",
      ],
      primaryCta: "Kontakt",
      secondaryCta: "Erfahrung ansehen",
    },
    about: {
      title: "Über mich",
      lead:
        "Ich arbeite an der Schnittstelle von Datenzuverlässigkeit, Plattformbetrieb und Analytics. Von ETL-Monitoring und Release-Koordination bis zu SQL-Entwicklung, Dashboards und angewandter Data Science.",
      points: [
        "Praxis in Banken, FMCG und regulierten produktiven Datenumgebungen.",
        "Stärken in BI- und DWH-Betrieb, SQL- und PL/SQL-Umsetzung sowie Release-Stabilität.",
        "Ich setze Analytics und Machine Learning ein, wenn ein Problem mehr als Reporting braucht.",
        "Ich helfe Teams, stabile Releases und verlässliches Reporting zu liefern.",
      ],
    },
    projects: {
      title: "Projekte",
      lead:
        "Drei Portfolio-Projekte aus Finanzanalyse, NLP und Entity Resolution sowie operativer Datenzuverlässigkeit.",
      sourceLabel: "Datenbasis",
      outputLabel: "Ausgabe",
      methodsLabel: "Was das Projekt zeigt",
      stackLabel: "Methoden",
      noteLabel: "Begrenzung",
    },
    analysis: {
      title: "Featured Analysis",
      lead:
        "Eine Analyse auf der Startseite sollte kompakt bleiben. Öffne die Kurzansicht für die schnelle Lesart und gehe danach bei Bedarf in die volle Edition.",
      eyebrow: "SEC-basierte Public-Company-Analyse",
      featuredTitle:
        "Steigende Kapitalintensität, ungleiche Cash-Disziplin bei Hyperscalern",
      summary:
        "Microsoft, Alphabet, Meta und Amazon im Vergleich über Kapitalinvestitionsintensität und einen standardisierten FCF-Proxy von Geschäftsjahr 2021 bis zum letzten berichteten Geschäftsjahr.",
      expandCta: "Kurzansicht öffnen",
      collapseCta: "Kurzansicht schließen",
      findingsLabel: "Was die Daten tragen",
      findings: [
        "Meta führt die letzte Periode mit 34,7% des Umsatzes klar vor dem Rest der Peer Group an.",
        "Microsoft und Alphabet liegen beide bei rund 23%, aber Microsoft behält die stärkste letzte FCF-Proxy-Marge.",
        "Amazon verbessert sich von negativem Proxy-Free-Cash-Flow im Jahr 2021 auf knapp positiv in der letzten Periode.",
      ],
      figureTitle:
        "Kapitalinvestitionsintensität, 2021 vs letztes berichtetes Geschäftsjahr",
      figureSubtitle:
        "Für die Startseite reicht ein Start-Ende-Vergleich: Jedes Unternehmen investiert am Ende des Fensters aggressiver, aber nicht im gleichen Ausmaß.",
      primaryCta: "Volle Edition lesen",
      secondaryCta: "Methodik",
    },
    caseStudy: {
      backLabel: "Zurück zum Portfolio",
      eyebrow: "Public-Company-Analyse",
      title: "Kapitaldisziplin bei Hyperscalern",
      lead:
        "Ein vorsichtiger Vergleich von Kapitalinvestitionsintensität und standardisierter Cash-Disziplin bei Microsoft, Alphabet, Meta und Amazon auf Basis von SEC Company Facts.",
      nav: {
        overview: "Überblick",
        comparison: "Vergleich",
        methodology: "Methodik",
        sources: "Quellen",
      },
      overviewTitle: "Überblick",
      overviewLead:
        "Die Kapitalinvestitionsintensität steigt bei allen vier Unternehmen von Geschäftsjahr 2021 bis zum letzten berichteten Geschäftsjahr, aber der Trade-off bei der Cash-Conversion unterscheidet sich deutlich.",
      findingsLabel: "Belastbare Lesart",
      findings: [
        "Meta ist der klarste aktuelle Investitionsausreißer und erreicht 34,7% des Umsatzes im letzten berichteten Geschäftsjahr.",
        "Hohe operative Profitabilität wird nicht eins zu eins in Cash-Conversion nach Investitionen übersetzt.",
        "Amazon bleibt in diesem Vergleich das schwächste letzte FCF-Proxy-Profil, obwohl es sich seit 2021 verbessert hat.",
      ],
      mainFigureTitle:
        "Kapitalinvestitionsintensität, 2021 bis letztes berichtetes Geschäftsjahr",
      mainFigureSubtitle:
        "Die Leitfigur etabliert zuerst die Richtung: Jedes Unternehmen investiert am Ende des Fensters aggressiver, aber nicht im gleichen Ausmaß.",
      comparisonTitle: "Vergleich",
      comparisonLead:
        "Die beiden Unterstützungsfiguren beantworten zwei Anschlussfragen: Wer hat die Investitionen am stärksten beschleunigt, und wie viel operative Profitabilität bleibt nach deren Finanzierung übrig.",
      capexChangeTitle:
        "Kapitalinvestitionsintensität, 2021 vs letztes berichtetes Geschäftsjahr",
      capexChangeSubtitle:
        "Ein direkter Start-Ende-Vergleich macht die Größenordnung der Verschiebung lesbarer als ein dichter Mehrlinien-Chart allein.",
      marginGapTitle:
        "Operative Marge vs FCF-Proxy-Marge, letztes berichtetes Geschäftsjahr",
      marginGapSubtitle:
        "Die Lücke zwischen bilanzieller Profitabilität und Cash-Disziplin nach Investitionen ist der Punkt, an dem sich die Peer Group trennt.",
      methodologyTitle: "Methodik",
      methodologyLead:
        "Diese Seite ist bewusst eng gefasst. Sie tauscht narrative Breite gegen Vergleichbarkeit, Nachvollziehbarkeit und saubere Kennzahldefinitionen.",
      measuredLabel: "Was gemessen wird",
      measuredPoints: [
        "Umsatz, operative Marge, operativer Cashflow, Kapitalinvestitionsabfluss und ein standardisierter FCF-Proxy.",
        "Nur Jahreswerte, gefiltert auf offizielle SEC-Jahresformulare.",
        "Eine Peer Group mit vier Unternehmen: Microsoft, Alphabet, Meta und Amazon.",
        "Geschäftsjahr 2021 bis zum letzten berichteten Geschäftsjahr im abgeleiteten Datensatz.",
      ],
      guardrailsLabel: "Was nicht behauptet wird",
      guardrailPoints: [
        "AI-spezifische Capex-Ausgaben werden nicht direkt gemessen.",
        "Es wird kein kausaler Zusammenhang zwischen Investitionen und Margendruck behauptet.",
        "Company-reported Free Cash Flow wird nicht als perfekt standardisiert zwischen Emittenten behandelt.",
        "Cash und Cash Equivalents werden nicht als vollständiges Liquiditätsmaß verwendet.",
      ],
      sourcesTitle: "Offizielle Quellen",
      sources: [
        {
          label: "SEC EDGAR API Dokumentation",
          href: "https://www.sec.gov/edgar/sec-api-documentation",
        },
        {
          label: "SEC Zugriff auf EDGAR-Daten",
          href: "https://www.sec.gov/os/accessing-edgar-data",
        },
        {
          label: "SEC Ticker-zu-CIK-Mapping",
          href: "https://www.sec.gov/files/company_tickers.json",
        },
        {
          label: "Beispiel für SEC Company Facts",
          href: "https://data.sec.gov/api/xbrl/companyfacts/CIK0000789019.json",
        },
      ],
    },
    experience: {
      title: "Erfahrung",
      lead:
        "Aktuelle Rollen in DataOps-Consulting, Analytics Engineering, DWH-Betrieb und Support für Datenplattformen.",
      timelineLabel: "Karriereverlauf",
      skillsLabel: "Kernkompetenzen",
      highlightsLabel: "Aufgabenschwerpunkte",
    },
    contact: {
      title: "Kontakt",
      lead:
        "Standort Berlin, Deutschland. Hier sind ein paar Wege, um mit mir in Kontakt zu treten und mehr über meine Arbeit zu erfahren:",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      emailLabel: "E-Mail",
    },
    languageToggleLabel: "Sprache wechseln",
  },
};
