import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';
import {
  catchError,
  switchMap,
  map,
  tap,
  first,
  concatMap,
  withLatestFrom,
  filter,
} from 'rxjs/operators';
import {
  LocalStorageKeys,
  mapOpenWeatherMapResponseToCondition,
} from '../models';

import { OpenWeatherMapClientService } from '../open-weather-map-client.service';
import * as forecastActions from './forecast.actions';
import { ForecastPartialState } from './forecast.reducer';

@Injectable()
export class ForecastEffects implements OnInitEffects {
  constructor(
    private localStorageService: LocalStorageService,
    private openWeatherMapClientService: OpenWeatherMapClientService,
    private actions$: Actions
  ) {}

  public readonly onCurrentConditionRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        forecastActions.currentConditionRequested,
        forecastActions.addZipCodeFromLocalStorage
      ),
      // withLatestFrom(this.store.select(getZipCodes)),
      // filter(([action, zipCodes]) => !zipCodes.includes(action.zipCode)),
      concatMap((action) => {
        return this.openWeatherMapClientService
          .getCurrentWeatherByZipCode(action.zipCode)
          .pipe(
            map((response) => {
              const currentCondition = mapOpenWeatherMapResponseToCondition(
                action.zipCode,
                response
              );

              return forecastActions.currentConditionRequestSuccess({
                currentCondition,
              });
            }),
            catchError((error) =>
              of(
                forecastActions.currentConditionRequestFailure({
                  error,
                })
              )
            )
          );
      })
    )
  );

  public readonly loadZipCodesFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forecastActions.loadZipCodeFromLocalStorage),
      map(
        () =>
          this.localStorageService.retrieve(
            LocalStorageKeys.ZIP_CODES
          ) as string[]
      ),
      switchMap((zipCodes) =>
        zipCodes.map((x) =>
          forecastActions.addZipCodeFromLocalStorage({ zipCode: x })
        )
      )
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

          if (!localStorageZipCodes.includes(zipCode)) {
            this.localStorageService.store(LocalStorageKeys.ZIP_CODES, [
              ...localStorageZipCodes,
              zipCode,
            ]);
          }
        })
      ),
    { dispatch: false }
  );

  public readonly removeZipCodeFromLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(forecastActions.removeLocation),
        map(({ zipCode }) => {
          const localStorageZipCodes = this.localStorageService.retrieve(
            LocalStorageKeys.ZIP_CODES
          ) as string[];

          if (localStorageZipCodes.includes(zipCode)) {
            this.localStorageService.store(
              LocalStorageKeys.ZIP_CODES,
              localStorageZipCodes.filter((x) => x !== zipCode)
            );
          }
        })
      ),
    { dispatch: false }
  );

  public readonly requestCurrentConditionForAddedZipCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forecastActions.addLocationZipCode),
      map(({ zipCode }) =>
        forecastActions.currentConditionRequested({ zipCode })
      )
    )
  );

  public readonly initializeForFeature$ = createEffect(() =>
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
      map(() => forecastActions.loadZipCodeFromLocalStorage()),
      first()
    )
  );

  ngrxOnInitEffects(): Action {
    return forecastActions.initializedForecastFeature();
  }
}
