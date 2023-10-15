export const SUPPORTED_YEARS = ["2023"] as const satisfies readonly string[];

export type SupportedYear = (typeof SUPPORTED_YEARS)[number];

export const isSupportedYear = (value: string): value is SupportedYear =>
  (SUPPORTED_YEARS as readonly string[]).includes(value);
