import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsForecastPageComponent } from './locations-forecast-page/locations-forecast-page.component';

const forecastRoutes: Routes = [
  { path: '', component: LocationsForecastPageComponent },
  // { path: '/:id', component: Location5DaysForecastPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(forecastRoutes)],
})
export class ForecastRoutingModule {}
