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
  selector: 'rar-locations-forecast-page',
  templateUrl: './locations-forecast-page.component.html',
  styleUrls: ['./locations-forecast-page.component.css'],
})
export class LocationsForecastPageComponent implements OnInit {
  public readonly temperatureUnit$ = this.forecastFacade.temperatureUnit$;
  public readonly locationsConditions$ = this.forecastFacade
    .locationsConditions$;

  constructor(
    private forecastFacade: ForecastFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.forecastFacade.dispatch(navigatedToLocationsForecastPage());
  }

  public onLocationAdded(locationZipCode: string) {
    this.forecastFacade.dispatch(
      addLocationZipCode({ zipCode: locationZipCode })
    );
  }

  public onLocationClosedClicked(locationZipCode: string) {
    this.forecastFacade.dispatch(removeLocation({ zipCode: locationZipCode }));
  }

  public onLocationFiveDaysForecastClicked(locationZipCode: string) {
    this.router.navigate(['./', locationZipCode], {
      relativeTo: this.activatedRoute,
    });
  }
}
