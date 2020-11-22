import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import { ForecastPartialState } from './forecast.reducer';
import {
  getLocationConditions,
  getSelectedLocationFiveDaysForecast,
  getTemperatureUnit,
} from './forecast.selectors';

@Injectable()
export class ForecastFacade {
  public readonly temperatureUnit$ = this.store.select(getTemperatureUnit);
  public readonly locationsConditions$ = this.store.select(
    getLocationConditions
  );
  public readonly selectedLocationFiveDaysForecast$ = this.store.select(
    getSelectedLocationFiveDaysForecast
  );

  constructor(private store: Store<ForecastPartialState>) {}

  public dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
