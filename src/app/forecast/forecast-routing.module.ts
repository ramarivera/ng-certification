import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiveDaysForecastPageComponent } from './five-days-forecast-page/five-days-forecast-page.component';
import { LocationsForecastPageComponent } from './locations-forecast-page/locations-forecast-page.component';

const forecastRoutes: Routes = [
  { path: '', component: LocationsForecastPageComponent },
  { path: ':id', component: FiveDaysForecastPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(forecastRoutes)],
})
export class ForecastRoutingModule {}
