import { analysisSnapshot } from "./hyperscalerCapitalDiscipline.generated";

export type LocaleLanguage = "en" | "de";
export type AnnualRow = (typeof analysisSnapshot.annualRows)[number];
export type Ticker = AnnualRow["ticker"];

export const companyOrder = ["META", "MSFT", "GOOGL", "AMZN"] as const satisfies readonly Ticker[];

export const companyMeta: Record<
  Ticker,
  {
    shortLabel: string;
    fullLabel: string;
    color: string;
    dash: string;
  }
> = {
  META: {
    shortLabel: "Meta",
    fullLabel: "Meta Platforms",
    color: "#f0c27b",
    dash: "",
  },
  MSFT: {
    shortLabel: "Microsoft",
    fullLabel: "Microsoft",
    color: "#8eb8ff",
    dash: "0",
  },
  GOOGL: {
    shortLabel: "Alphabet",
    fullLabel: "Alphabet",
    color: "#8fd1bf",
    dash: "10 8",
  },
  AMZN: {
    shortLabel: "Amazon",
    fullLabel: "Amazon",
    color: "#e89a72",
    dash: "2 8",
  },
};

const localeByLanguage: Record<LocaleLanguage, string> = {
  en: "en-US",
  de: "de-DE",
};

const annualRowsByTicker = Object.fromEntries(
  companyOrder.map((ticker) => [
    ticker,
    analysisSnapshot.annualRows
      .filter((row) => row.ticker === ticker)
      .sort((left, right) => left.fiscalYear - right.fiscalYear),
  ]),
) as Record<Ticker, AnnualRow[]>;

const latestRowsByTicker = Object.fromEntries(
  companyOrder.map((ticker) => {
    const rows = annualRowsByTicker[ticker];
    return [ticker, rows.at(-1)];
  }),
) as Record<Ticker, AnnualRow>;

const baselineRowsByTicker = Object.fromEntries(
  companyOrder.map((ticker) => {
    const rows = annualRowsByTicker[ticker];
    return [ticker, rows[0]];
  }),
) as Record<Ticker, AnnualRow>;

export const analysisWindow = analysisSnapshot.analysisWindow;
export const latestYear = analysisSnapshot.summary.latestYear;
export const baselineYear = analysisSnapshot.summary.baselineYear;
export const annualRows = analysisSnapshot.annualRows;
export const latestRows = companyOrder.map((ticker) => latestRowsByTicker[ticker]);

export const capexSeries = companyOrder.map((ticker) => ({
  ticker,
  ...companyMeta[ticker],
  points: annualRowsByTicker[ticker].map((row) => ({
    fiscalYear: row.fiscalYear,
    value: row.capexIntensity,
  })),
}));

export const latestCapexRanking = analysisSnapshot.summary.capexIntensityRankingLatestYear.map((entry) => ({
  ...entry,
  ...companyMeta[entry.ticker],
  periodEnd: latestRowsByTicker[entry.ticker].periodEnd,
}));

export const capexChangeRows = companyOrder
  .map((ticker) => ({
    ticker,
    ...companyMeta[ticker],
    baseline: baselineRowsByTicker[ticker].capexIntensity,
    latest: latestRowsByTicker[ticker].capexIntensity,
  }))
  .sort((left, right) => right.latest - left.latest);

export const latestMarginGapRows = companyOrder
  .map((ticker) => ({
    ticker,
    ...companyMeta[ticker],
    operatingMargin: latestRowsByTicker[ticker].operatingMargin,
    freeCashFlowProxyMargin: latestRowsByTicker[ticker].freeCashFlowProxyMargin,
    periodEnd: latestRowsByTicker[ticker].periodEnd,
  }))
  .sort((left, right) => right.operatingMargin - left.operatingMargin);

export const latestInsightStats = {
  topCapexLeader: latestCapexRanking[0],
  strongestLatestFreeCashFlow: [...latestMarginGapRows].sort(
    (left, right) => right.freeCashFlowProxyMargin - left.freeCashFlowProxyMargin,
  )[0],
  weakestLatestFreeCashFlow: [...latestMarginGapRows].sort(
    (left, right) => left.freeCashFlowProxyMargin - right.freeCashFlowProxyMargin,
  )[0],
};

export const methodologyNotes = {
  mixedFiscalYearEnds: {
    en: "Microsoft's latest reported fiscal year ends in June 2025; the other three end in December 2025.",
    de: "Microsofts letztes berichtetes Geschäftsjahr endet im Juni 2025; die drei anderen enden im Dezember 2025.",
  },
  amazonConcept: {
    en: "Amazon's capital-investment metric uses the broader SEC concept `PaymentsToAcquireProductiveAssets`.",
    de: "Amazons Kapitalinvestitionskennzahl nutzt das breitere SEC-Konzept `PaymentsToAcquireProductiveAssets`.",
  },
};

export function formatPercent(
  value: number,
  language: LocaleLanguage,
  digits = 1,
) {
  return new Intl.NumberFormat(localeByLanguage[language], {
    style: "percent",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function formatCompactCurrency(
  value: number,
  language: LocaleLanguage,
) {
  return new Intl.NumberFormat(localeByLanguage[language], {
    notation: "compact",
    compactDisplay: "short",
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatMonthYear(
  dateValue: string,
  language: LocaleLanguage,
) {
  return new Intl.DateTimeFormat(localeByLanguage[language], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dateValue}T00:00:00Z`));
}
