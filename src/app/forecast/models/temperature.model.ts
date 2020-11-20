export interface Temperature {
  value: number;
  unit: TemperatureUnit;
}

export type TemperatureUnit = 'F' | 'C' | 'K';
