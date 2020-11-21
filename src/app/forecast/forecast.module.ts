import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LocationsForecastPageComponent } from './locations-forecast-page/locations-forecast-page.component';
import { LocationConditionsComponent } from './location-conditions/location-conditions.component';
import { SharedModule } from '../shared/shared.module';
import { LocationsForecastComponent } from './locations-forecast/locations-forecast.component';
import { ForecastStateModule } from './+state/forecast-state.module';
import { OpenWeatherMapClientService } from './open-weather-map-client.service';
import { ForecastRoutingModule } from './forecast-routing.module';

@NgModule({
  declarations: [
    LocationsForecastPageComponent,
    LocationConditionsComponent,
    LocationsForecastComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ForecastStateModule,
    ForecastRoutingModule,
  ],
  providers: [OpenWeatherMapClientService],
})
export class ForecastModule {}
