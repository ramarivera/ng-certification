import { Action, createReducer, on } from '@ngrx/store';
import {
  FiveDaysLocationForecast,
  LocationCurrentCondition,
  TemperatureUnit,
} from '../models';
import * as forecastActions from './forecast.actions';

export const FORECAST_STATE_FEATURE_NAME = 'forecast';

export interface State {
  zipCodes: string[];
  conditions: LocationCurrentCondition[];
  fiveDayForecasts: FiveDaysLocationForecast[];
  temperatureUnit: TemperatureUnit;
  selectedLocation: string | null;
}

export interface ForecastPartialState {
  readonly [FORECAST_STATE_FEATURE_NAME]: State;
}

export const initialState: State = {
  zipCodes: [],
  conditions: [],
  fiveDayForecasts: [],
  temperatureUnit: 'F',
  selectedLocation: null,
};

const forecastReducer = createReducer(
  initialState,
  on(
    forecastActions.currentConditionRequestSuccess,
    (state, { currentCondition }) => {
      const otherConditions = state.conditions.filter(
        (x) => x.zipCode !== currentCondition.zipCode
      );

      const newState = {
        ...state,
        conditions: [...otherConditions, currentCondition],
      };

      return newState;
    }
  ),
  on(
    forecastActions.fiveDaysForecastRequestSuccess,
    (state, { fiveDaysForecast }) => {
      const otherForecasts = state.fiveDayForecasts.filter(
        (x) => x.zipCode !== fiveDaysForecast.zipCode
      );

      const newState = {
        ...state,
        fiveDayForecasts: [...otherForecasts, fiveDaysForecast],
      };

      return newState;
    }
  ),
  on(forecastActions.selectLocation, (state, { zipCode }) => {
    const newState = { ...state, selectedLocation: zipCode };
    return newState;
  }),
  on(
    forecastActions.addLocationZipCode,
    forecastActions.addZipCodeFromLocalStorage,
    (state, { zipCode }) => {
      const zipCodes = state.zipCodes.filter((x) => x !== zipCode);

      const newState = {
        ...state,
        zipCodes: [...zipCodes, zipCode],
      };
      return newState;
    }
  ),
  on(forecastActions.removeLocation, (state, { zipCode }) => {
    const zipCodes = state.zipCodes.filter((x) => x !== zipCode);
    const conditions = state.conditions.filter((x) => x.zipCode !== zipCode);
    const fiveDayForecasts = state.fiveDayForecasts.filter(
      (x) => x.zipCode !== zipCode
    );

    const newState = {
      ...state,
      zipCodes,
      conditions,
      fiveDayForecasts,
    };
    return newState;
  })
);

export function reducer(state: State | undefined, action: Action) {
  return forecastReducer(state, action);
}
