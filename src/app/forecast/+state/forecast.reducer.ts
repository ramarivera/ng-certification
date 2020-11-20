import { Action, createReducer, on } from '@ngrx/store';

export const FORECAST_STATE_FEATURE_NAME = 'forecast';

export interface State {
  zipCodes: [];
  forecasts: [];
  fiveDayForecasts: [];
  currentTemperatureUnit: 'F' | 'C';
}

export interface ForecastPartialState {
  readonly [FORECAST_STATE_FEATURE_NAME]: State;
}

export const initialState: State = {
  zipCodes: [],
  forecasts: [],
  fiveDayForecasts: [],
  currentTemperatureUnit: 'F',
};

const forecastReducer = createReducer(
  initialState,
  on(SuiteNavigationActions.setNavigationTreeSuccess, (state, { tree }) => ({
    ...state,
    tree,
  })),
  on(SuiteNavigationActions.setNavigationTreeFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return forecastReducer(state, action);
}
