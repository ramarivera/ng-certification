// as per https://openweathermap.org/current#zip

export interface OpenWeatherMapCurrentWeatherResponse {
  coord: OpenWeatherMapCurrentWeatherCoord;
  weather: OpenWeatherMapCurrentWeatherWeather[];
  base: string;
  main: OpenWeatherMapCurrentWeatherMain;
  visibility: number;
  wind: OpenWeatherMapCurrentWeatherWind;
  clouds: OpenWeatherMapCurrentWeatherClouds;
  dt: number;
  sys: OpenWeatherCurrentWeatherSystem;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface OpenWeatherCurrentWeatherSystem {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface OpenWeatherMapCurrentWeatherClouds {
  all: number;
}

interface OpenWeatherMapCurrentWeatherWind {
  speed: number;
  deg: number;
}

interface OpenWeatherMapCurrentWeatherMain {
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
