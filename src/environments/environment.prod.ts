export interface AngularEnvironment {
  production: boolean;
  openWeatherMapAppId: string;
  openWeatherMapBaseUrl: string;
}

export const environment: AngularEnvironment = {
  production: true,
  openWeatherMapAppId: '',
  openWeatherMapBaseUrl: '',
};
