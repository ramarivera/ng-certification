import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LocationCurrentConditionViewModel,
  mapConditionToConditionViewModel,
} from '../models';
import {
  ForecastPartialState,
  FORECAST_STATE_FEATURE_NAME,
  State,
} from './forecast.reducer';

const getForecastFeatureState = createFeatureSelector<
  ForecastPartialState,
  State
>(FORECAST_STATE_FEATURE_NAME);

export const getZipCodes = createSelector(
  getForecastFeatureState,
  (state) => state.zipCodes
);

const getConditions = createSelector(
  getForecastFeatureState,
  (state) => state.conditions
);

const getFiveDaysForecasts = createSelector(
  getForecastFeatureState,
  (state) => state.fiveDayForecasts
);

const getSelectedLocation = createSelector(
  getForecastFeatureState,
  (state) => state.selectedLocation
);

export const getTemperatureUnit = createSelector(
  getForecastFeatureState,
  (state) => state.temperatureUnit
);

export const getLocationConditions = createSelector(
  getConditions,
  (conditions) => conditions.map(mapConditionToConditionViewModel)
);

export const getSelectedLocationFiveDaysForecast = createSelector(
  getSelectedLocation,
  getFiveDaysForecasts,
  (selectedLocation, fiveDaysForecasts) => {
    if (!selectedLocation || !fiveDaysForecasts[selectedLocation]) {
      return null;
    }

    return fiveDaysForecasts[selectedLocation];
  }
);
