export interface ChartLineModel {
  name: string;
  series: ChartLineSeries[];
}

export interface ChartLineSeries {
  name: string;
  value: number;
}
