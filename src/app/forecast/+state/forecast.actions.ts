import { createAction, props } from '@ngrx/store';
import { FiveDaysLocationForecast, LocationCurrentCondition } from '../models';

/**
 * Requests current conditions for a given zip code
 */
export const currentConditionRequested = createAction(
  '[Forecasts] current condition requested',
  props<{ zipCode: string }>()
);

/**
 * Loads successfully retrieved current conditions for a given zip code
 */
export const currentConditionRequestSuccess = createAction(
  '[Forecasts] current condition request success',
  props<{ currentCondition: LocationCurrentCondition }>()
);

/**
 * Signals an error while retrieving current conditions for a zip code
 */
export const currentConditionRequestFailure = createAction(
  '[Forecasts] current condition request failure',
  props<{ error: any }>()
);

/**
 * Requests five days forecast for a given zip code
 */
export const fiveDaysForecastRequested = createAction(
  '[Forecasts] five days forecast requested',
  props<{ zipCode: string }>()
);

/**
 * Loads successfully retrieved five days forecast for a given zip code
 */
export const fiveDaysForecastRequestSuccess = createAction(
  '[Forecasts] five days forecast request success',
  props<{ fiveDaysForecast: FiveDaysLocationForecast }>()
);

/**
 * Signals an error while retrieving five days forecast for a zip code
 */
export const fiveDaysForecastRequestFailure = createAction(
  '[Forecasts] five days forecast request failure',
  props<{ error: any }>()
);

/**
 * Adds a new zip code
 */
export const addLocationZipCode = createAction(
  '[Forecasts] add location zip code',
  props<{ zipCode: string }>()
);

/**
 * Removes a location
 */
export const removeLocation = createAction(
  '[Forecasts] remove location',
  props<{ zipCode: string }>()
);

/**
 * Requests loading of zip codes from local storage
 */
export const loadZipCodeFromLocalStorage = createAction(
  '[Forecasts] load zip codes from local storage'
);

/**
 * Adds zip code loaded from local storage
 */
export const addZipCodeFromLocalStorage = createAction(
  '[Forecasts] add zip codes from local storage',
  props<{ zipCode: string }>()
);

export const navigatedToLocationsForecastPage = createAction(
  '[Forecasts] navigated to locations forecast page'
);

export const selectLocation = createAction(
  '[Forecasts] select location',
  props<{ zipCode: string }>()
);

export const initializedForecastFeature = createAction(
  '[Forecasts] initialized forecast feature'
);
