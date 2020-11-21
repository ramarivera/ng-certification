import { OpenWeatherMapCurrentWeatherResponse } from './open-weather-map.model';
import { Temperature } from './temperature.model';
import { convertIconIdToWeatherName, WeatherType } from './weather.model';

export interface LocationCurrentCondition {
  locationName: string;
  zipCode: string;
  condition: string;
  iconId: string;
  currentTemp: Temperature;
  maxTemp: Temperature;
  minTemp: Temperature;
}

export interface LocationCurrentConditionViewModel
  extends LocationCurrentCondition {
  weather: WeatherType;
}

export function mapConditionToConditionViewModel(
  condition: LocationCurrentCondition
): LocationCurrentConditionViewModel {
  const conditionViewModel: LocationCurrentConditionViewModel = {
    ...condition,
    weather: convertIconIdToWeatherName(condition.iconId),
  };
  return conditionViewModel;
}

export function mapOpenWeatherMapResponseToCondition(
  zipCode: string,
  response: OpenWeatherMapCurrentWeatherResponse
): LocationCurrentCondition {
  if (!response.weather[0]) {
    throw new Error('Received response is invalid');
  }

  const locationCondition: LocationCurrentCondition = {
    locationName: response.name,
    zipCode,
    condition: response.weather[0].main,
    iconId: response.weather[0].icon,
    currentTemp: {
      unit: 'K',
      value: response.main.temp,
    },
    maxTemp: {
      unit: 'K',
      value: response.main.temp_max,
    },
    minTemp: {
      unit: 'K',
      value: response.main.temp_min,
    },
  };

  return locationCondition;
}

export class LocalStorageKeys {
  public static ZIP_CODES = 'RAR.FORECASTS.ZIP_CODES';
}
