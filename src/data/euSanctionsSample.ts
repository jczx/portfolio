export type SanctionsEntry = {
  fsdId: string;
  type: "P" | "E";
  primaryName: string;
  aliases: string[];
  designationDate: string;
  regime: string;
};

export type SanctionsDatasetMeta = {
  sourceKind: "official-xml" | "fallback-sample";
  generatedAt: string;
  sourceDate: string;
  recordCount: number;
  sourceLabel: string;
};

export type SanctionsDatasetPayload = {
  meta: SanctionsDatasetMeta;
  entries: SanctionsEntry[];
};

// Curated official sample derived from the public EU Sanctions Map PDF export
// for the human-rights regime viewed on 20 Mar 2026. The full FSF export still
// requires a valid token, so this sample keeps the demo honest and reproducible.
export const euSanctionsSample: SanctionsEntry[] = [
  {
    fsdId: "127726",
    type: "P",
    primaryName: "Alexander Petrovich KALASHNIKOV",
    aliases: [
      "Александр Петрович КАЛАШНИКОВ",
      "Alexandr Petrovich KALASHNIKOV",
      "Aleksandr Petrovitj KALASJNIKOV",
      "Alexander Petrovitj KALASJNIKOV",
      "Alexandr Petrovič KALAŠNIKOV",
    ],
    designationDate: "03.12.2024",
    regime: "EU Global Human Rights Sanctions Regime",
  },
  {
    fsdId: "128293",
    type: "P",
    primaryName: "Gabriel Moses LOKUJO",
    aliases: [],
    designationDate: "22.03.2021",
    regime: "EU Global Human Rights Sanctions Regime",
  },
  {
    fsdId: "132556",
    type: "P",
    primaryName: "Valeriy Nikolaevich ZAKHAROV",
    aliases: [
      "Валерий Николаевич ЗАХАРОВ",
      "Valery Nikolaevich ZAKHAROV",
      "Valerij Nikolajevitj ZAKHAROV",
      "Valerij Zacharov",
      "Валери Захаров",
    ],
    designationDate: "06.12.2023",
    regime: "EU Global Human Rights Sanctions Regime",
  },
  {
    fsdId: "132563",
    type: "E",
    primaryName: "Vagner Group",
    aliases: [
      "Wagner Group",
      "групата Вагнер",
      "Группа Вагнера",
      "PMC Wagner",
      "Africa Corps",
      "Volunteer Corps",
      "Expeditionary Corps",
      "Expeditionary and Volunteer Corps",
      "League",
      "Ligue",
    ],
    designationDate: "03.12.2024",
    regime: "EU Global Human Rights Sanctions Regime",
  },
  {
    fsdId: "150225",
    type: "P",
    primaryName: "Maksim SHUGALEI",
    aliases: [
      "Максим ШУГАЛЕЙ",
      "Maxim SHUGALEY",
      "Maksim SJUGALEJ",
      "Maksim ŠUGALEJ",
      "Maxim CHOUGALEÏ",
      "Maksim Shugaley",
    ],
    designationDate: "06.12.2023",
    regime: "EU Global Human Rights Sanctions Regime",
  },
  {
    fsdId: "150241",
    type: "P",
    primaryName: "Konstantin Alexandrovich PIKALOV",
    aliases: [
      "Константин Александрович ПИКАЛОВ",
      "Konstantin Alexandrovič PIKALOV",
      "Konstantin Aleksandrovič PIKALOV",
      "Konstantin Alexandrovitj PIKALOV",
      "Konstantin Pikałow",
    ],
    designationDate: "06.12.2023",
    regime: "EU Global Human Rights Sanctions Regime",
  },
  {
    fsdId: "150279",
    type: "E",
    primaryName: "Lobaye Invest SARLU",
    aliases: [],
    designationDate: "03.12.2024",
    regime: "EU Global Human Rights Sanctions Regime",
  },
  {
    fsdId: "150285",
    type: "E",
    primaryName: "Foundation for National Values protection",
    aliases: [
      "FZNC",
      "FPNV",
      "Organization for the Protection of National Values",
      "Foundation for the Protection of National Values",
      "Fund for the Defence of National Values",
      "FDNV",
      "Foundation for the Defence of National Values",
    ],
    designationDate: "03.12.2024",
    regime: "EU Global Human Rights Sanctions Regime",
  },
  {
    fsdId: "150295",
    type: "E",
    primaryName: "Radio Centrafricaine Lengo Sengo",
    aliases: [
      "Lengo Sengo",
      "radio Lengo Sengo",
      "Centrinés Afrikos Respublikos radijas Lengo Sengo",
    ],
    designationDate: "03.12.2024",
    regime: "EU Global Human Rights Sanctions Regime",
  },
];

export const euSanctionsFallbackPayload: SanctionsDatasetPayload = {
  meta: {
    sourceKind: "fallback-sample",
    generatedAt: new Date("2026-03-20T15:00:00.000Z").toISOString(),
    sourceDate: "2026-03-20",
    recordCount: euSanctionsSample.length,
    sourceLabel: "Curated official EU sanctions sample",
  },
  entries: euSanctionsSample,
};
