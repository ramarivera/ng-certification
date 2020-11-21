export interface AngularEnvironment {
  production: boolean;
  openWeatherMapAppId: string;
  openWeatherMapBaseUrl: string;
}

export const environment: AngularEnvironment = {
  production: false,
  openWeatherMapAppId: '5a4b2d457ecbef9eb2a71e480b947604',
  openWeatherMapBaseUrl: 'http://api.openweathermap.org/data/2.5',
};
