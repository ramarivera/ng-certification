import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocationCurrentConditionViewModel, TemperatureUnit } from '../models';

@Component({
  selector: 'rar-locations-forecast',
  templateUrl: './locations-forecast.component.html',
  styleUrls: ['./locations-forecast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsForecastComponent {
  @Input()
  public locationsConditions: LocationCurrentConditionViewModel[];

  @Input()
  public temperatureUnit: TemperatureUnit;

  @Output()
  public locationAdded = new EventEmitter<string>();

  @Output()
  public locationClosedClicked = new EventEmitter<string>();

  @Output()
  public locationFiveDaysForecastClicked = new EventEmitter<string>();

  public locationZipCodeFormControl = new FormControl('');

  constructor() {}

  public onAddLocationClicked() {
    const locationZipCode = this.locationZipCodeFormControl.value;

    if (!locationZipCode) {
      return;
    }

    this.locationAdded.emit(locationZipCode);
    this.locationZipCodeFormControl.reset();
  }

  public onLocationFiveDaysForecastClicked(
    locationCondition: LocationCurrentConditionViewModel
  ) {
    this.locationFiveDaysForecastClicked.emit(locationCondition.zipCode);
  }

  public onLocationCloseClicked(
    locationCondition: LocationCurrentConditionViewModel
  ) {
    this.locationClosedClicked.emit(locationCondition.zipCode);
  }
}
