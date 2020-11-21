import { zip } from 'rxjs';
import {
  OpenWeatherMapFiveDaysForecastResponse,
  OpenWeatherMapSingleDayForecast,
} from './open-weather-map.model';
import { Temperature } from './temperature.model';
import { WeatherType } from './weather.model';

export interface FiveDaysLocationForecast {
  zipCode: string;
  locationName: string;
  forecasts: FiveDaysLocationSingleForecast[];
}

export interface FiveDaysLocationSingleForecast {
  date: number;
  iconId: string;
  condition: string;
  minTemp: Temperature;
  maxTemp: Temperature;
}

export interface FiveDaysLocationForecastViewModel {
  zipCode: string;
  locationName: string;
  forecasts: FiveDaysLocationSingleForecastViewModel[];
}

export interface FiveDaysLocationSingleForecastViewModel {
  date: Date;
  iconId: string;
  weather: WeatherType;
  condition: string;
  minTemp: Temperature;
  maxTemp: Temperature;
}

export function mapOpenWeatherMapResponseToFiveDaysForecast(
  zipCode: string,
  response: OpenWeatherMapFiveDaysForecastResponse
): FiveDaysLocationForecast {
  console.log(response);
  const fiveForecasts = response.list
    .map(mapOpenWeatherMapWeatherResponseToSingleDayForecast)
    .reduce((accum, curr) => {
      const currentDate = new Date(curr.date * 1000);

      if (!accum[currentDate.getDate()]) {
        accum[currentDate.getDate()] = curr;
      }

      return accum;
    }, {} as { [key: string]: FiveDaysLocationSingleForecast });

  const fiveDaysForecast: FiveDaysLocationForecast = {
    zipCode,
    locationName: response.city.name,
    forecasts: Object.values(fiveForecasts).slice(0, 5),
  };

  return fiveDaysForecast;
}

export function mapOpenWeatherMapWeatherResponseToSingleDayForecast(
  weatherForecast: OpenWeatherMapSingleDayForecast
): FiveDaysLocationSingleForecast {
  const singleDayForecast: FiveDaysLocationSingleForecast = {
    date: weatherForecast.dt,
    condition: weatherForecast.weather[0].main,
    iconId: weatherForecast.weather[0].icon,
    maxTemp: {
      unit: 'K',
      value: weatherForecast.main.temp_max,
    },
    minTemp: {
      unit: 'K',
      value: weatherForecast.main.temp_min,
    },
  };

  return singleDayForecast;
}
