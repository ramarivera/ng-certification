import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';

import { ForecastPartialState } from './forecast.reducer';
import {
  getLocationConditions,
  getTemperatureUnit,
} from './forecast.selectors';

@Injectable()
export class ForecastFacade {
  public readonly temperatureUnit$ = this.store.select(getTemperatureUnit);
  public readonly locationsConditions$ = this.store.select(
    getLocationConditions
  );

  constructor(private store: Store<ForecastPartialState>) {}

  public dispatch(action: Action) {
    const eventId = uuidv4();
    if (!(action as any).eventId) {
      (action as any).eventId = eventId;
    }

    this.store.dispatch(action);

    return eventId;
  }
}
