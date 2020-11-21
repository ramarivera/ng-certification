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
  temperatureUnit: 'K',
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
  on(forecastActions.selectLocation, (state, { zipCode }) => {
    const newState = { ...state, selectedLocation: zipCode };
    return newState;
  }),
  on(forecastActions.addLocationZipCode, (state, { zipCode }) => {
    const newState = {
      ...state,
      zipCodes: [...state.zipCodes, zipCode],
    };
    return newState;
  }),
  on(forecastActions.addZipCodesFromLocalStorage, (state, { zipCodes }) => {
    if (!zipCodes) {
      return state;
    }
    return {
      ...state,
      zipCodes,
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return forecastReducer(state, action);
}
