export const CHART_VIEWS = ["batters", "pitchers", "all"] as const;

export type ChartViews = (typeof CHART_VIEWS)[number];
