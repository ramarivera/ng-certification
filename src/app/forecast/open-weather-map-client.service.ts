import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  OPEN_WEATHER_MAP_APP_ID,
  OPEN_WEATHER_MAP_BASE_URL,
} from '../app.tokens';
import {
  OpenWeatherMapCurrentWeatherResponse,
  OpenWeatherMapFiveDaysForecastResponse,
} from './models/open-weather-map.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherMapClientService {
  constructor(
    @Inject(OPEN_WEATHER_MAP_APP_ID) private openWeatherMapAppId: string,
    @Inject(OPEN_WEATHER_MAP_BASE_URL) private openWeatherMapBaseUrl: string,
    private http: HttpClient
  ) {}

  public getCurrentWeatherByZipCode(
    zipCode: string
  ): Observable<OpenWeatherMapCurrentWeatherResponse> {
    return this.http.get<OpenWeatherMapCurrentWeatherResponse>(
      `${this.openWeatherMapBaseUrl}/weather?zip=${zipCode}&appid=${this.openWeatherMapAppId}`
    );
  }

  public getFiveDaysForecastByZipCode(
    zipCode: string
  ): Observable<OpenWeatherMapFiveDaysForecastResponse> {
    return this.http.get<OpenWeatherMapFiveDaysForecastResponse>(
      `${this.openWeatherMapBaseUrl}/forecast?zip=${zipCode}&appid=${this.openWeatherMapAppId}`
    );
  }
}
