export interface AngularEnvironment {
  production: boolean;
  openWeatherMapAppId: string;
  openWeatherMapBaseUrl: string;
}

export const environment: AngularEnvironment = {
  production: false,
  openWeatherMapAppId: '',
  openWeatherMapBaseUrl: 'http://api.openweathermap.org/data/2.5',
};
