import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  navigatedToLocationsForecastPage,
  addLocationZipCode,
  removeLocation,
  selectLocation,
} from '../+state/forecast.actions';
import { ForecastFacade } from '../+state/forecast.facade';

@Component({
  selector: 'rar-five-days-forecast-page',
  templateUrl: './five-days-forecast-page.component.html',
})
export class FiveDaysForecastPageComponent implements OnInit {
  public readonly temperatureUnit$ = this.forecastFacade.temperatureUnit$;
  public readonly selectedLocationFiveDaysForecast$ = this.forecastFacade
    .selectedLocationFiveDaysForecast$;

  constructor(
    private forecastFacade: ForecastFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const routeZipCode = this.activatedRoute.snapshot.paramMap.get('zipCode');
    this.forecastFacade.dispatch(selectLocation({ zipCode: routeZipCode }));
  }

  public onLocationAdded(locationZipCode: string) {
    this.forecastFacade.dispatch(
      addLocationZipCode({ zipCode: locationZipCode })
    );
  }

  public onLocationClosedClicked(locationZipCode: string) {
    this.forecastFacade.dispatch(removeLocation({ zipCode: locationZipCode }));
  }

  public onBackClicked() {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute,
    });
  }
}
