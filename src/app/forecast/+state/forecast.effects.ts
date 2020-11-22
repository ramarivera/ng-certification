import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, createReducer, State, Store } from '@ngrx/store';
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
import { AlertService } from '../../shared/alert/alert.service';
import {
  LocalStorageKeys,
  mapOpenWeatherMapResponseToCondition,
  mapOpenWeatherMapResponseToFiveDaysForecast,
} from '../models';

import { OpenWeatherMapClientService } from '../open-weather-map-client.service';
import * as forecastActions from './forecast.actions';
import { ForecastPartialState } from './forecast.reducer';
import { getConditions } from './forecast.selectors';

@Injectable()
export class ForecastEffects implements OnInitEffects {
  constructor(
    private localStorageService: LocalStorageService,
    private openWeatherMapClientService: OpenWeatherMapClientService,
    private alertService: AlertService,
    private actions$: Actions,
    private store: Store<ForecastPartialState>
  ) {}

  public readonly onCurrentConditionRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        forecastActions.currentConditionRequested,
        forecastActions.addZipCodeFromLocalStorage
      ),
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

  public readonly onFiveDaysForecastRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forecastActions.fiveDaysForecastRequested),
      concatMap((action) => {
        return this.openWeatherMapClientService
          .getFiveDaysForecastByZipCode(action.zipCode)
          .pipe(
            map((response) => {
              const fiveDaysForecast = mapOpenWeatherMapResponseToFiveDaysForecast(
                action.zipCode,
                response
              );

              return forecastActions.fiveDaysForecastRequestSuccess({
                fiveDaysForecast,
              });
            }),
            catchError((error) =>
              of(
                forecastActions.fiveDaysForecastRequestFailure({
                  error,
                })
              )
            )
          );
      })
    )
  );

  public readonly onLocationSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forecastActions.selectLocation),
      map(({ zipCode }) =>
        forecastActions.fiveDaysForecastRequested({ zipCode })
      )
    )
  );

  public readonly onLocationAddedShowAlert$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(forecastActions.addLocationZipCode),
        concatMap(({ zipCode }) =>
          this.store.select(getConditions).pipe(
            filter(
              (conditions) =>
                conditions.find((x) => x.zipCode === zipCode) != null
            ),
            map((_) => zipCode)
          )
        ),
        tap((zipCode) => {
          this.alertService.displayAlert(
            `Added zip code ${zipCode}!`,
            'New zip code'
          );
        })
      ),
    { dispatch: false }
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

  public readonly onAnyError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          forecastActions.fiveDaysForecastRequestFailure,
          forecastActions.currentConditionRequestFailure
        ),
        tap((action) => {
          this.alertService.displayAlert(
            `An unexpected error ocurred: ${action.error.message}`,
            'ERROR!'
          );
        })
      ),
    { dispatch: false }
  );

  ngrxOnInitEffects(): Action {
    return forecastActions.initializedForecastFeature();
  }
}
