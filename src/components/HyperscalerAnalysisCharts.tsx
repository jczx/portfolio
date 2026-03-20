import type { CSSProperties } from "react";
import { useId, useState } from "react";
import {
  baselineYear,
  capexChangeRows,
  capexSeries,
  companyMeta,
  companyOrder,
  formatPercent,
  latestCapexRanking,
  latestInsightStats,
  latestMarginGapRows,
  latestYear,
  methodologyNotes,
  type LocaleLanguage,
  type Ticker,
} from "../data/hyperscalerAnalysis";

type ChartLegendProps = {
  activeTicker: Ticker | null;
  language: LocaleLanguage;
  onSelect: (ticker: Ticker | null) => void;
};

type FigureProps = {
  language: LocaleLanguage;
  title: string;
  subtitle: string;
};

const lineChartBounds = {
  width: 760,
  height: 420,
  top: 28,
  right: 26,
  bottom: 54,
  left: 70,
};

const comparisonChartBounds = {
  width: 760,
  height: 340,
  top: 36,
  right: 42,
  bottom: 44,
  left: 134,
};

const localeLabels = {
  all: {
    en: "All",
    de: "Alle",
  },
  series: {
    en: "Series",
    de: "Reihen",
  },
  latestReported: {
    en: "Latest reported fiscal year",
    de: "Letztes berichtetes Geschäftsjahr",
  },
  operatingMargin: {
    en: "Operating margin",
    de: "Operative Marge",
  },
  freeCashFlowProxyMargin: {
    en: "FCF proxy margin",
    de: "FCF-Proxy-Marge",
  },
  latestValueCallout: {
    en: "Latest value",
    de: "Letzter Wert",
  },
  dataNote: {
    en: "SEC companyfacts only",
    de: "Nur SEC-Companyfacts",
  },
  metricLegend: {
    en: "Metric legend",
    de: "Kennzahlenlegende",
  },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildTicks(start: number, end: number, step: number) {
  const totalSteps = Math.round((end - start) / step);
  return Array.from({ length: totalSteps + 1 }, (_, index) => start + index * step);
}

function getRoundedUpperBound(value: number, step: number, headroom: number) {
  return Math.ceil((value + headroom) / step) * step;
}

const capexMaxPercent = getRoundedUpperBound(
  Math.max(...capexSeries.flatMap((series) => series.points.map((point) => point.value))),
  0.1,
  0.03,
);

const capexTicks = buildTicks(0, capexMaxPercent, 0.1);

const marginValues = latestMarginGapRows.flatMap((row) => [
  row.operatingMargin,
  row.freeCashFlowProxyMargin,
]);
const marginMinPercent = Math.min(
  0,
  Math.floor((Math.min(...marginValues) - 0.02) / 0.05) * 0.05,
);
const marginMaxPercent = getRoundedUpperBound(Math.max(...marginValues), 0.05, 0.03);
const marginTicks = buildTicks(marginMinPercent, marginMaxPercent, 0.05);

function getLineChartX(year: number) {
  const span = latestYear - baselineYear || 1;
  const progress = (year - baselineYear) / span;
  const plotWidth = lineChartBounds.width - lineChartBounds.left - lineChartBounds.right;
  return lineChartBounds.left + progress * plotWidth;
}

function getLineChartY(value: number) {
  const plotHeight = lineChartBounds.height - lineChartBounds.top - lineChartBounds.bottom;
  return lineChartBounds.top + (1 - value / capexMaxPercent) * plotHeight;
}

function getComparisonChartX(value: number, minValue: number, maxValue: number) {
  const plotWidth =
    comparisonChartBounds.width - comparisonChartBounds.left - comparisonChartBounds.right;
  const span = maxValue - minValue || 1;
  return comparisonChartBounds.left + ((value - minValue) / span) * plotWidth;
}

function getComparisonChartRowY(rowIndex: number, totalRows: number) {
  const plotHeight =
    comparisonChartBounds.height - comparisonChartBounds.top - comparisonChartBounds.bottom;
  const gap = totalRows === 1 ? 0 : plotHeight / (totalRows - 1);
  return comparisonChartBounds.top + rowIndex * gap;
}

function buildPolylinePoints(points: Array<{ fiscalYear: number; value: number }>) {
  return points.map((point) => `${getLineChartX(point.fiscalYear)},${getLineChartY(point.value)}`).join(" ");
}

function ChartLegend({ activeTicker, language, onSelect }: ChartLegendProps) {
  return (
    <div className="analysisLegend" role="group" aria-label={localeLabels.series[language]}>
      <button
        className={`analysisLegend__button${activeTicker === null ? " is-active" : ""}`}
        type="button"
        onClick={() => onSelect(null)}
        aria-pressed={activeTicker === null}
      >
        {localeLabels.all[language]}
      </button>

      {companyOrder.map((ticker) => (
        <button
          className={`analysisLegend__button${activeTicker === ticker ? " is-active" : ""}`}
          key={ticker}
          type="button"
          onClick={() => onSelect(ticker)}
          aria-pressed={activeTicker === ticker}
        >
          <span
            aria-hidden="true"
            className="analysisLegend__swatch"
            style={{
              "--legend-color": companyMeta[ticker].color,
            } as CSSProperties}
          />
          {companyMeta[ticker].shortLabel}
        </button>
      ))}
    </div>
  );
}

export function OverviewTakeaways({ language }: { language: LocaleLanguage }) {
  const cards = [
    {
      label:
        language === "de"
          ? "Höchste Kapitalintensität"
          : "Highest capital intensity",
      value: `${latestInsightStats.topCapexLeader.shortLabel} ${formatPercent(
        latestInsightStats.topCapexLeader.capexIntensity,
        language,
      )}`,
      detail:
        language === "de"
          ? "im letzten berichteten Geschäftsjahr"
          : "in the latest reported fiscal year",
    },
    {
      label:
        language === "de"
          ? "Stärkste FCF-Proxy-Marge"
          : "Strongest FCF proxy margin",
      value: `${latestInsightStats.strongestLatestFreeCashFlow.shortLabel} ${formatPercent(
        latestInsightStats.strongestLatestFreeCashFlow.freeCashFlowProxyMargin,
        language,
      )}`,
      detail:
        language === "de"
          ? "bei der standardisierten Cash-Disziplin"
          : "on standardized cash discipline",
    },
    {
      label:
        language === "de"
          ? "Schwächste FCF-Proxy-Marge"
          : "Weakest FCF proxy margin",
      value: `${latestInsightStats.weakestLatestFreeCashFlow.shortLabel} ${formatPercent(
        latestInsightStats.weakestLatestFreeCashFlow.freeCashFlowProxyMargin,
        language,
      )}`,
      detail:
        language === "de"
          ? "trotz höherem Investitionsniveau"
          : "despite higher investment intensity",
    },
  ];

  return (
    <div className="analysisTakeaways">
      {cards.map((card) => (
        <article className="analysisTakeaway" key={card.label}>
          <p className="analysisTakeaway__label">{card.label}</p>
          <p className="analysisTakeaway__value">{card.value}</p>
          <p className="analysisTakeaway__detail">{card.detail}</p>
        </article>
      ))}
    </div>
  );
}

export function CapexHeroFigure({ language, title, subtitle }: FigureProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [activeTicker, setActiveTicker] = useState<Ticker | null>(null);
  const activeSeries = activeTicker
    ? capexSeries.find((series) => series.ticker === activeTicker) ?? null
    : null;
  const activeLatestPoint = activeSeries?.points.at(-1) ?? null;

  return (
    <figure className="analysisFigure analysisFigure--lead">
      <div className="analysisFigure__header">
        <div>
          <figcaption className="analysisFigure__title">{title}</figcaption>
          <p className="analysisFigure__subtitle">{subtitle}</p>
        </div>
        <ChartLegend activeTicker={activeTicker} language={language} onSelect={setActiveTicker} />
      </div>

      <div className="analysisFigure__body analysisFigure__body--lead">
        <div className="analysisFigure__chart">
          <svg
            aria-labelledby={`${titleId} ${descriptionId}`}
            className="analysisChart"
            role="img"
            viewBox={`0 0 ${lineChartBounds.width} ${lineChartBounds.height}`}
          >
            <title id={titleId}>{title}</title>
            <desc id={descriptionId}>{subtitle}</desc>

            <rect
              x="0"
              y="0"
              width={lineChartBounds.width}
              height={lineChartBounds.height}
              rx="28"
              fill="rgba(7, 13, 20, 0.92)"
            />

            {capexTicks.map((tick) => {
              const y = getLineChartY(tick);

              return (
                <g key={tick}>
                  <line
                    x1={lineChartBounds.left}
                    x2={lineChartBounds.width - lineChartBounds.right}
                    y1={y}
                    y2={y}
                    stroke="rgba(197, 209, 224, 0.12)"
                    strokeDasharray="6 9"
                  />
                  <text
                    fill="rgba(199, 210, 223, 0.72)"
                    fontSize="13"
                    x={lineChartBounds.left - 16}
                    y={y + 4}
                    textAnchor="end"
                  >
                    {formatPercent(tick, language)}
                  </text>
                </g>
              );
            })}

            {Array.from({ length: latestYear - baselineYear + 1 }, (_, index) => baselineYear + index).map(
              (year) => {
                const x = getLineChartX(year);

                return (
                  <g key={year}>
                    <line
                      x1={x}
                      x2={x}
                      y1={lineChartBounds.top}
                      y2={lineChartBounds.height - lineChartBounds.bottom}
                      stroke="rgba(197, 209, 224, 0.07)"
                    />
                    <text
                      fill="rgba(199, 210, 223, 0.72)"
                      fontSize="13"
                      x={x}
                      y={lineChartBounds.height - 18}
                      textAnchor="middle"
                    >
                      {year}
                    </text>
                  </g>
                );
              },
            )}

            {capexSeries.map((series) => {
              const muted = activeTicker !== null && activeTicker !== series.ticker;
              const strokeWidth = activeTicker === series.ticker ? 5 : 3.5;

              return (
                <g key={series.ticker}>
                  <polyline
                    fill="none"
                    opacity={muted ? 0.18 : 0.92}
                    points={buildPolylinePoints(series.points)}
                    stroke={series.color}
                    strokeDasharray={series.dash}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={strokeWidth}
                  />

                  {series.points.map((point) => (
                    <circle
                      cx={getLineChartX(point.fiscalYear)}
                      cy={getLineChartY(point.value)}
                      fill="rgba(7, 13, 20, 0.98)"
                      key={`${series.ticker}-${point.fiscalYear}`}
                      opacity={muted ? 0.18 : 1}
                      r={activeTicker === series.ticker ? 5.5 : 4.5}
                      stroke={series.color}
                      strokeWidth="2"
                    />
                  ))}
                </g>
              );
            })}

            {activeSeries && activeLatestPoint ? (
              <g>
                <line
                  x1={getLineChartX(activeLatestPoint.fiscalYear)}
                  x2={getLineChartX(activeLatestPoint.fiscalYear)}
                  y1={getLineChartY(activeLatestPoint.value)}
                  y2={lineChartBounds.top + 16}
                  stroke={activeSeries.color}
                  strokeDasharray="4 7"
                  strokeWidth="1.5"
                />
                <rect
                  fill="rgba(2, 6, 10, 0.94)"
                  height="58"
                  rx="14"
                  width="168"
                  x={clamp(
                    getLineChartX(activeLatestPoint.fiscalYear) - 84,
                    92,
                    lineChartBounds.width - 194,
                  )}
                  y={lineChartBounds.top + 6}
                />
                <text
                  fill="rgba(199, 210, 223, 0.68)"
                  fontSize="12"
                  x={clamp(
                    getLineChartX(activeLatestPoint.fiscalYear),
                    176,
                    lineChartBounds.width - 110,
                  )}
                  y={lineChartBounds.top + 28}
                  textAnchor="middle"
                >
                  {localeLabels.latestValueCallout[language]}
                </text>
                <text
                  fill={activeSeries.color}
                  fontSize="18"
                  fontWeight="700"
                  x={clamp(
                    getLineChartX(activeLatestPoint.fiscalYear),
                    176,
                    lineChartBounds.width - 110,
                  )}
                  y={lineChartBounds.top + 50}
                  textAnchor="middle"
                >
                  {activeSeries.shortLabel} {formatPercent(activeLatestPoint.value, language)}
                </text>
              </g>
            ) : null}
          </svg>
        </div>

        <aside className="analysisFigure__rail">
          <div className="analysisFigure__railBlock">
            <p className="analysisFigure__label">{localeLabels.latestReported[language]}</p>
            <ol className="analysisRanking">
              {latestCapexRanking.map((row) => (
                <li className="analysisRanking__item" key={row.ticker}>
                  <span
                    aria-hidden="true"
                    className="analysisRanking__marker"
                    style={{ backgroundColor: row.color }}
                  />
                  <span className="analysisRanking__name">{row.shortLabel}</span>
                  <span className="analysisRanking__value">
                    {formatPercent(row.capexIntensity, language)}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="analysisFigure__railBlock">
            <p className="analysisFigure__label">{localeLabels.dataNote[language]}</p>
            <p className="analysisFigure__note">
              {methodologyNotes.mixedFiscalYearEnds[language]}
            </p>
            <p className="analysisFigure__note">{methodologyNotes.amazonConcept[language]}</p>
          </div>
        </aside>
      </div>
    </figure>
  );
}

export function CapexChangeFigure({ language, title, subtitle }: FigureProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <figure className="analysisFigure">
      <div className="analysisFigure__header">
        <div>
          <figcaption className="analysisFigure__title">{title}</figcaption>
          <p className="analysisFigure__subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="analysisFigure__body">
        <svg
          aria-labelledby={`${titleId} ${descriptionId}`}
          className="analysisChart"
          role="img"
          viewBox={`0 0 ${comparisonChartBounds.width} ${comparisonChartBounds.height}`}
        >
          <title id={titleId}>{title}</title>
          <desc id={descriptionId}>{subtitle}</desc>

          <rect
            x="0"
            y="0"
            width={comparisonChartBounds.width}
            height={comparisonChartBounds.height}
            rx="28"
            fill="rgba(7, 13, 20, 0.92)"
          />

          {capexTicks.map((tick) => {
            const x = getComparisonChartX(tick, 0, capexMaxPercent);

            return (
              <g key={tick}>
                <line
                  x1={x}
                  x2={x}
                  y1={comparisonChartBounds.top - 6}
                  y2={comparisonChartBounds.height - comparisonChartBounds.bottom + 6}
                  stroke="rgba(197, 209, 224, 0.08)"
                />
                <text
                  fill="rgba(199, 210, 223, 0.72)"
                  fontSize="12"
                  x={x}
                  y={comparisonChartBounds.height - 18}
                  textAnchor="middle"
                >
                  {formatPercent(tick, language)}
                </text>
              </g>
            );
          })}

          <text
            fill="rgba(199, 210, 223, 0.72)"
            fontSize="12"
            fontWeight="700"
            x={comparisonChartBounds.left}
            y="22"
          >
            {baselineYear}
          </text>
          <text
            fill="rgba(199, 210, 223, 0.72)"
            fontSize="12"
            fontWeight="700"
            x={comparisonChartBounds.width - comparisonChartBounds.right}
            y="22"
            textAnchor="end"
          >
            {localeLabels.latestReported[language]}
          </text>

          {capexChangeRows.map((row, index) => {
            const y = getComparisonChartRowY(index, capexChangeRows.length);
            const baselineX = getComparisonChartX(row.baseline, 0, capexMaxPercent);
            const latestX = getComparisonChartX(row.latest, 0, capexMaxPercent);

            return (
              <g key={row.ticker}>
                <text
                  fill="rgba(244, 247, 251, 0.94)"
                  fontSize="14"
                  x={comparisonChartBounds.left - 18}
                  y={y + 5}
                  textAnchor="end"
                >
                  {row.shortLabel}
                </text>

                <line
                  x1={baselineX}
                  x2={latestX}
                  y1={y}
                  y2={y}
                  stroke={row.color}
                  strokeLinecap="round"
                  strokeWidth="4"
                />
                <circle
                  cx={baselineX}
                  cy={y}
                  fill="rgba(7, 13, 20, 0.98)"
                  r="6"
                  stroke={row.color}
                  strokeWidth="2"
                />
                <circle cx={latestX} cy={y} fill={row.color} r="6.5" />

                <text
                  fill="rgba(199, 210, 223, 0.74)"
                  fontSize="12"
                  x={baselineX}
                  y={y - 12}
                  textAnchor="middle"
                >
                  {formatPercent(row.baseline, language)}
                </text>
                <text
                  fill="rgba(244, 247, 251, 0.96)"
                  fontSize="12"
                  fontWeight="700"
                  x={latestX}
                  y={y - 12}
                  textAnchor="middle"
                >
                  {formatPercent(row.latest, language)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}

export function MarginGapFigure({ language, title, subtitle }: FigureProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <figure className="analysisFigure">
      <div className="analysisFigure__header">
        <div>
          <figcaption className="analysisFigure__title">{title}</figcaption>
          <p className="analysisFigure__subtitle">{subtitle}</p>
        </div>

        <div className="analysisMetricLegend" aria-label={localeLabels.metricLegend[language]}>
          <span className="analysisMetricLegend__item">
            <span aria-hidden="true" className="analysisMetricLegend__marker analysisMetricLegend__marker--open" />
            {localeLabels.operatingMargin[language]}
          </span>
          <span className="analysisMetricLegend__item">
            <span aria-hidden="true" className="analysisMetricLegend__marker analysisMetricLegend__marker--filled" />
            {localeLabels.freeCashFlowProxyMargin[language]}
          </span>
        </div>
      </div>

      <div className="analysisFigure__body">
        <svg
          aria-labelledby={`${titleId} ${descriptionId}`}
          className="analysisChart"
          role="img"
          viewBox={`0 0 ${comparisonChartBounds.width} ${comparisonChartBounds.height}`}
        >
          <title id={titleId}>{title}</title>
          <desc id={descriptionId}>{subtitle}</desc>

          <rect
            x="0"
            y="0"
            width={comparisonChartBounds.width}
            height={comparisonChartBounds.height}
            rx="28"
            fill="rgba(7, 13, 20, 0.92)"
          />

          {marginTicks.map((tick) => {
            const x = getComparisonChartX(tick, marginMinPercent, marginMaxPercent);

            return (
              <g key={tick}>
                <line
                  x1={x}
                  x2={x}
                  y1={comparisonChartBounds.top - 6}
                  y2={comparisonChartBounds.height - comparisonChartBounds.bottom + 6}
                  stroke="rgba(197, 209, 224, 0.08)"
                />
                <text
                  fill="rgba(199, 210, 223, 0.72)"
                  fontSize="12"
                  x={x}
                  y={comparisonChartBounds.height - 18}
                  textAnchor="middle"
                >
                  {formatPercent(tick, language)}
                </text>
              </g>
            );
          })}

          {latestMarginGapRows.map((row, index) => {
            const y = getComparisonChartRowY(index, latestMarginGapRows.length);
            const operatingX = getComparisonChartX(
              row.operatingMargin,
              marginMinPercent,
              marginMaxPercent,
            );
            const fcfX = getComparisonChartX(
              row.freeCashFlowProxyMargin,
              marginMinPercent,
              marginMaxPercent,
            );

            return (
              <g key={row.ticker}>
                <text
                  fill="rgba(244, 247, 251, 0.94)"
                  fontSize="14"
                  x={comparisonChartBounds.left - 18}
                  y={y + 5}
                  textAnchor="end"
                >
                  {row.shortLabel}
                </text>

                <line
                  x1={fcfX}
                  x2={operatingX}
                  y1={y}
                  y2={y}
                  stroke={row.color}
                  strokeLinecap="round"
                  strokeOpacity="0.74"
                  strokeWidth="4"
                />
                <circle
                  cx={operatingX}
                  cy={y}
                  fill="rgba(7, 13, 20, 0.98)"
                  r="6.5"
                  stroke="rgba(245, 248, 252, 0.94)"
                  strokeWidth="2"
                />
                <rect
                  fill={row.color}
                  height="11"
                  rx="2"
                  width="11"
                  x={fcfX - 5.5}
                  y={y - 5.5}
                />

                <text
                  fill="rgba(245, 248, 252, 0.94)"
                  fontSize="12"
                  x={operatingX}
                  y={y - 12}
                  textAnchor="middle"
                >
                  {formatPercent(row.operatingMargin, language)}
                </text>
                <text
                  fill={row.color}
                  fontSize="12"
                  fontWeight="700"
                  x={fcfX}
                  y={y - 12}
                  textAnchor="middle"
                >
                  {formatPercent(row.freeCashFlowProxyMargin, language)}
                </text>
              </g>
            );
          })}
        </svg>

        <p className="analysisFigure__footnote">
          {language === "de"
            ? "FCF-Proxy-Marge = operativer Cashflow minus Kapitalinvestitionsabfluss, geteilt durch Umsatz."
            : "FCF proxy margin = operating cash flow minus capital investment cash outflow, divided by revenue."}
        </p>
      </div>
    </figure>
  );
}
