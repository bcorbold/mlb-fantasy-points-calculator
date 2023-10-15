export const formatPoints = (value: number) =>
  new Intl.NumberFormat("en-CA", { minimumFractionDigits: 2 }).format(value);
