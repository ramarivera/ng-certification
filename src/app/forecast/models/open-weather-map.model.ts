// as per https://openweathermap.org/current#zip

export interface OpenWeatherMapCurrentWeatherResponse {
  coord: OpenWeatherMapCurrentWeatherCoord;
  weather: OpenWeatherMapCurrentWeatherWeather[];
  base: string;
  main: OpenWeatherMapMain;
  visibility: number;
  dt: number;
  sys: OpenWeatherCurrentWeatherSystem;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface OpenWeatherMapFiveDaysForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: OpenWeatherMapSingleDayForecast[];
  city: OpenWeatherMapFiveDaysForecastCity;
}

interface OpenWeatherMapFiveDaysForecastCity {
  name: string;
  coord: OpenWeatherMapCurrentWeatherCoord;
  country: string;
}

export interface OpenWeatherMapSingleDayForecast {
  dt: number;
  main: OpenWeatherMapMain;
  weather: OpenWeatherMapSingleDayWeatherForecast[];
  dt_txt: string;
}

interface OpenWeatherMapSingleDayWeatherForecast {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface OpenWeatherCurrentWeatherSystem {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface OpenWeatherMapMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface OpenWeatherMapCurrentWeatherWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface OpenWeatherMapCurrentWeatherCoord {
  lon: number;
  lat: number;
}
