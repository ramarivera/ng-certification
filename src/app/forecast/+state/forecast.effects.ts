import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { LocalStorageService } from 'ngx-webstorage';
import { catchError, switchMap, map } from 'rxjs/operators';
import { LocalStorageKeys } from '../models';

import { OpenWeatherMapClientService } from '../open-weather-map-client.service';
import * as forecastActions from './forecast.actions';

@Injectable()
export class ForecastEffects {
  constructor(
    private localStorageService: LocalStorageService,
    private openWeatherMapClientService: OpenWeatherMapClientService,
    private actions$: Actions
  ) {}

  public readonly loadZipCodesFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forecastActions.loadZipCodesFromLocalStorage),
      map((_) => {
        const localStorageZipCodes = this.localStorageService.retrieve(
          LocalStorageKeys.ZIP_CODES
        ) as string[];

        return forecastActions.addZipCodesFromLocalStorage({
          zipCodes: localStorageZipCodes,
        });
      })
      // catchError(error => {

      // })
    )
  );

  public readonly addZipCodeToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(forecastActions.addLocationZipCode),
        map(({ zipCode }) => {
          const localStorageZipCodes = this.localStorageService.retrieve(
            LocalStorageKeys.ZIP_CODES
          ) as string[];

          this.localStorageService.store(LocalStorageKeys.ZIP_CODES, [
            ...localStorageZipCodes,
            zipCode,
          ]);
        })
      ),
    { dispatch: false }
  );
}
