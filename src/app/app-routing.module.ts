import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'forecast', loadChildren: () => import('./forecast/forecast.module').then((x) => x.ForecastModule) },
  {
    path: '',
    redirectTo: 'forecast',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
