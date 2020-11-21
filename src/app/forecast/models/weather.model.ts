export type WeatherType = 'sunny' | 'clouds' | 'rain' | 'snow';

const weatherIconsToWeather: { [key: string]: WeatherType } = {
  '01d': 'sunny',
  '01n': 'sunny',
  '02d': 'clouds',
  '02n': 'clouds',
  '03d': 'clouds',
  '03n': 'clouds',
  '04d': 'clouds',
  '04n': 'clouds',
  '09d': 'rain',
  '09n': 'rain',
  '10d': 'rain',
  '10n': 'rain',
  '11d': 'rain',
  '11n': 'rain',
  '13d': 'snow',
  '13n': 'snow',
  '50d': 'clouds',
  '50n': 'clouds',
};

// https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
export function convertIconIdToWeatherName(iconId: string): WeatherType {
  return weatherIconsToWeather[iconId];
}
