import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { LocalStorageService } from 'ngx-webstorage';
import { from, of } from 'rxjs';
import {
  catchError,
  switchMap,
  map,
  tap,
  first,
  concatMap,
} from 'rxjs/operators';
import {
  LocalStorageKeys,
  mapOpenWeatherMapResponseToCondition,
} from '../models';

import { OpenWeatherMapClientService } from '../open-weather-map-client.service';
import * as forecastActions from './forecast.actions';

@Injectable()
export class ForecastEffects implements OnInitEffects {
  constructor(
    private localStorageService: LocalStorageService,
    private openWeatherMapClientService: OpenWeatherMapClientService,
    private actions$: Actions
  ) {}

  public readonly onCurrentConditionRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forecastActions.currentConditionRequested),
      concatMap(({ zipCode, eventId }) =>
        this.openWeatherMapClientService
          .getCurrentWeatherByZipCode(zipCode)
          .pipe(
            map((response) => {
              const currentCondition = mapOpenWeatherMapResponseToCondition(
                zipCode,
                response
              );

              return forecastActions.currentConditionRequestSuccess({
                currentCondition,
                eventId,
              });
            }),
            catchError((error) =>
              of(
                forecastActions.currentConditionRequestFailure({
                  error,
                  eventId,
                })
              )
            )
          )
      )
    )
  );

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

  public readonly requestCurrentConditionForAddedZipCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forecastActions.addLocationZipCode),
      map(({ zipCode, eventId }) =>
        forecastActions.currentConditionRequested({ zipCode, eventId })
      )
    )
  );

  public readonly initializeForFeature$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(forecastActions.initializedForecastFeature),
        tap(() => {
          const localStorageZipCodes = this.localStorageService.retrieve(
            LocalStorageKeys.ZIP_CODES
          ) as string[];

          if (!localStorageZipCodes) {
            this.localStorageService.store(LocalStorageKeys.ZIP_CODES, []);
          }
        }),
        first()
      ),
    { dispatch: false }
  );

  ngrxOnInitEffects(): Action {
    return forecastActions.initializedForecastFeature();
  }
}
