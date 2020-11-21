import { Component, OnInit } from '@angular/core';
import { navigatedToLocationsForecastPage } from '../+state/forecast.actions';
import { ForecastFacade } from '../+state/forecast.facade';

@Component({
  selector: 'rar-locations-forecast-page',
  templateUrl: './locations-forecast-page.component.html',
  styleUrls: ['./locations-forecast-page.component.css'],
})
export class LocationsForecastPageComponent implements OnInit {
  public readonly temperatureUnit$ = this.forecastFacade.temperatureUnit$;
  public readonly locationsConditions$ = this.forecastFacade
    .locationsConditions$;

  constructor(private forecastFacade: ForecastFacade) {}

  ngOnInit() {
    this.forecastFacade.dispatch(navigatedToLocationsForecastPage());
  }
}
