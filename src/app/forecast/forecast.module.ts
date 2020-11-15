import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsForecastPageComponent } from './locations-forecast-page/locations-forecast-page.component';
import { LocationsForecastComponent } from './locations-forecast/locations-forecast.component';
import { LocationFiveDaysForecastComponent } from './location-five-days-forecast/location-five-days-forecast.component';
import { Location5DaysForecastComponent } from './location5-days-forecast/location5-days-forecast.component';
import { Location5DaysForecastPageComponent } from './location5-days-forecast-page/location5-days-forecast-page.component';

@NgModule({
  declarations: [LocationsForecastPageComponent, LocationsForecastComponent, LocationFiveDaysForecastComponent, Location5DaysForecastComponent, Location5DaysForecastPageComponent],
  imports: [
    CommonModule
  ]
})
export class ForecastModule { }
