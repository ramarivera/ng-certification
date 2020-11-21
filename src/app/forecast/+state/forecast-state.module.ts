import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ForecastEffects } from './forecast.effects';
import {
  FORECAST_STATE_FEATURE_NAME,
  reducer as forecastReducer,
} from './forecast.reducer';
import { ForecastFacade } from './forecast.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('forecast', {
      [FORECAST_STATE_FEATURE_NAME]: forecastReducer,
    }),
    EffectsModule.forFeature([ForecastEffects]),
  ],
  providers: [ForecastFacade],
})
export class ForecastStateModule {}
