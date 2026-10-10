import type { SanctionsDatasetPayload } from "../data/euSanctionsSample";

export type CheckStatus = "healthy" | "watch" | "risk";
export type PipelineStatus = {
  meta: {
    generatedAt: string;
    sourceKind: "official-xml" | "fallback-sample";
    sourceDate: string;
    sourceLabel: string;
    ingestionMode: "remote-url" | "local-xml" | "fallback-sample";
  };
  metrics: {
    recordCount: number;
    previousRecordCount: number | null;
    recordDelta: number | null;
    personCount: number;
    entityCount: number;
    aliasTotal: number;
    entriesWithAliases: number;
    aliasCoveragePct: number;
    latestPublicationDate: string;
    matcherDatasetBytes: number;
    rawXmlBytes: number | null;
    topProgrammes: Array<{ programme: string; count: number }>;
  };
  checks: Array<{ id: string; label: string; status: CheckStatus; detail: string }>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const isCount = (value: unknown) => typeof value === "number" && Number.isInteger(value) && value >= 0;
const isDate = (value: unknown) => typeof value === "string" && Number.isFinite(Date.parse(value));
const isSourceKind = (value: unknown) => value === "official-xml" || value === "fallback-sample";

export const isSanctionsDataset = (value: unknown): value is SanctionsDatasetPayload => {
  if (!isRecord(value) || !isRecord(value.meta) || !Array.isArray(value.entries)) return false;
  const { meta, entries } = value;
  return isSourceKind(meta.sourceKind) && isDate(meta.sourceDate) && isDate(meta.generatedAt)
    && typeof meta.sourceLabel === "string" && entries.length > 0 && meta.recordCount === entries.length
    && entries.every(entry => isRecord(entry) && typeof entry.fsdId === "string" && entry.fsdId.length > 0
      && (entry.type === "P" || entry.type === "E") && typeof entry.primaryName === "string" && entry.primaryName.trim().length > 0
      && typeof entry.regime === "string" && typeof entry.designationDate === "string"
      && Array.isArray(entry.aliases) && entry.aliases.every(alias => typeof alias === "string"));
};

export const isPipelineStatus = (value: unknown): value is PipelineStatus => {
  if (!isRecord(value) || !isRecord(value.meta) || !isRecord(value.metrics) || !Array.isArray(value.checks)) return false;
  const { meta, metrics, checks } = value;
  const counts = ["recordCount", "personCount", "entityCount", "aliasTotal", "entriesWithAliases", "matcherDatasetBytes"];
  return isSourceKind(meta.sourceKind) && isDate(meta.generatedAt) && isDate(meta.sourceDate)
    && typeof meta.sourceLabel === "string" && ["remote-url", "local-xml", "fallback-sample"].includes(String(meta.ingestionMode))
    && counts.every(key => isCount(metrics[key])) && Number(metrics.recordCount) > 0
    && metrics.recordCount === Number(metrics.personCount) + Number(metrics.entityCount)
    && typeof metrics.aliasCoveragePct === "number" && metrics.aliasCoveragePct >= 0 && metrics.aliasCoveragePct <= 100
    && typeof metrics.latestPublicationDate === "string"
    && (metrics.previousRecordCount === null || isCount(metrics.previousRecordCount))
    && (metrics.recordDelta === null || (typeof metrics.recordDelta === "number" && Number.isInteger(metrics.recordDelta)))
    && (metrics.rawXmlBytes === null || isCount(metrics.rawXmlBytes))
    && Array.isArray(metrics.topProgrammes) && metrics.topProgrammes.every(item => isRecord(item) && typeof item.programme === "string" && isCount(item.count))
    && checks.length > 0 && checks.every(check => isRecord(check) && typeof check.id === "string" && typeof check.label === "string"
      && typeof check.detail === "string" && ["healthy", "watch", "risk"].includes(String(check.status)));
};

export const getSourceFreshness = (sourceDate: string, now = Date.now()) => {
  const timestamp = Date.parse(sourceDate);
  const elapsedHours = Number.isFinite(timestamp) ? (now - timestamp) / 3_600_000 : null;
  const hours = elapsedHours === null ? null : Number(elapsedHours.toFixed(1));
  const status: CheckStatus = elapsedHours !== null && elapsedHours >= 0 && elapsedHours <= 48 ? "healthy" : "watch";
  return { hours, status };
};
