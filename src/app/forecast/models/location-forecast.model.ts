import { Temperature } from './temperature.model';

export type WeatherCondition = '';

export interface LocationCurrentConditions {
  locationName: string;
  zipCode: string;
  condition: string;
  iconId: string;
  currentTemp: Temperature;
  maxTemp: Temperature;
  minTemp: Temperature;
}

export interface LocationCurrentConditionsViewModel extends LocationCurrentConditions {
  weatherName: string;
}
