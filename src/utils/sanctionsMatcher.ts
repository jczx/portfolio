import type { SanctionsEntry } from "../data/euSanctionsSample";

export type SanctionsMatch = {
  entry: SanctionsEntry;
  alias: string;
  score: number;
  matchedTokens: string[];
  reasons: string[];
};

type PreparedAlias = {
  raw: string;
  normalized: string;
  tokens: string[];
};

type PreparedEntry = {
  entry: SanctionsEntry;
  aliases: PreparedAlias[];
};

const normalizeForMatch = (value: string) => {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
};

const tokenize = (value: string) => {
  return normalizeForMatch(value)
    .split(" ")
    .filter(Boolean);
};

const levenshteinDistance = (left: string, right: string) => {
  if (left === right) {
    return 0;
  }

  if (!left.length) {
    return right.length;
  }

  if (!right.length) {
    return left.length;
  }

  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let row = 1; row <= left.length; row += 1) {
    let diagonal = previous[0];
    previous[0] = row;

    for (let column = 1; column <= right.length; column += 1) {
      const saved = previous[column];
      const substitutionCost = left[row - 1] === right[column - 1] ? 0 : 1;
      previous[column] = Math.min(
        previous[column] + 1,
        previous[column - 1] + 1,
        diagonal + substitutionCost,
      );
      diagonal = saved;
    }
  }

  return previous[right.length];
};

const intersection = (left: string[], right: string[]) => {
  const rightSet = new Set(right);
  return left.filter((token) => rightSet.has(token));
};

const explainMatch = ({
  alias,
  aliasNormalized,
  primaryName,
  query,
  queryTokens,
  aliasTokens,
  stringSimilarity,
  tokenOverlap,
  tokenMatches,
}: {
  alias: string;
  aliasNormalized: string;
  primaryName: string;
  query: string;
  queryTokens: string[];
  aliasTokens: string[];
  stringSimilarity: number;
  tokenOverlap: number;
  tokenMatches: string[];
}) => {
  const reasons: string[] = [];

  if (aliasNormalized === query) {
    reasons.push("Exact normalized alias match");
  }

  if (alias !== primaryName) {
    reasons.push("Matched via alias set");
  }

  if (tokenOverlap >= 0.67 || tokenMatches.length >= Math.min(queryTokens.length, 2)) {
    reasons.push(`Shared tokens: ${tokenMatches.join(", ")}`);
  }

  if (stringSimilarity >= 0.82) {
    reasons.push("Low edit distance to best alias");
  }

  if (aliasTokens.length && queryTokens.length && aliasNormalized !== alias.toLowerCase()) {
    reasons.push("Matched after normalization");
  }

  if (!reasons.length) {
    reasons.push("Closest overall normalized candidate");
  }

  return reasons.slice(0, 3);
};

export const createSanctionsIndex = (entries: SanctionsEntry[]) => {
  return entries.map((entry) => ({
    entry,
    aliases: [entry.primaryName, ...entry.aliases]
      .map((alias) => {
        const normalized = normalizeForMatch(alias);

        return {
          raw: alias,
          normalized,
          tokens: normalized.split(" ").filter(Boolean),
        };
      })
      .filter((alias) => alias.normalized.length > 0),
  })) satisfies PreparedEntry[];
};

export const rankSanctionsMatches = (
  query: string,
  index: PreparedEntry[],
  limit = 5,
) => {
  const normalizedQuery = normalizeForMatch(query);

  if (!normalizedQuery) {
    return [] as SanctionsMatch[];
  }

  const queryTokens = tokenize(query);

  const matches = index
    .map(({ entry, aliases }) => {
      let bestMatch: SanctionsMatch | null = null;

      for (const alias of aliases) {
        const tokenMatches = intersection(queryTokens, alias.tokens);
        const tokenOverlap =
          tokenMatches.length /
          Math.max(queryTokens.length, alias.tokens.length, 1);
        const containsBoost =
          alias.normalized.includes(normalizedQuery) || normalizedQuery.includes(alias.normalized)
            ? 1
            : 0;
        const distance = levenshteinDistance(normalizedQuery, alias.normalized);
        const stringSimilarity =
          1 - distance / Math.max(normalizedQuery.length, alias.normalized.length, 1);
        const score = Math.max(
          0,
          Math.min(
            1,
            stringSimilarity * 0.58 +
              tokenOverlap * 0.26 +
              containsBoost * 0.1 +
              (tokenMatches.length ? Math.min(tokenMatches.length / 4, 0.06) : 0),
          ),
        );

        const nextMatch: SanctionsMatch = {
          entry,
          alias: alias.raw,
          score,
          matchedTokens: tokenMatches,
          reasons: explainMatch({
            alias: alias.raw,
            aliasNormalized: alias.normalized,
            primaryName: entry.primaryName,
            query: normalizedQuery,
            queryTokens,
            aliasTokens: alias.tokens,
            stringSimilarity,
            tokenOverlap,
            tokenMatches,
          }),
        };

        if (!bestMatch || nextMatch.score > bestMatch.score) {
          bestMatch = nextMatch;
        }
      }

      return bestMatch;
    })
    .filter((match): match is SanctionsMatch => Boolean(match))
    .filter((match) => match.score >= 0.2)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);

  return matches;
};

export const formatMatchScore = (score: number) => {
  return `${Math.round(score * 100)}%`;
};
