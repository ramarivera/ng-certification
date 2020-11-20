import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LocationsForecastPageComponent } from './locations-forecast-page/locations-forecast-page.component';
import { Location5DaysForecastComponent } from './location-5days-forecast/location-5days-forecast.component';
import { Location5DaysForecastPageComponent } from './location-5days-forecast-page/location-5days-forecast-page.component';
import { LocationConditionsComponent } from './location-conditions/location-conditions.component';
import { SharedModule } from '../shared/shared.module';
import { LocationsForecastComponent } from './locations-forecast/locations-forecast.component';

@NgModule({
  declarations: [
    LocationsForecastPageComponent,
    LocationConditionsComponent,
    Location5DaysForecastComponent,
    Location5DaysForecastPageComponent,
    LocationsForecastComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class ForecastModule {}
