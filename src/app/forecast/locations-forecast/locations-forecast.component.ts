import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  @Input()
  public existingLocations: string[] = [];

  @Output()
  public locationAdded = new EventEmitter<string>();

  @Output()
  public locationClosedClicked = new EventEmitter<string>();

  @Output()
  public locationFiveDaysForecastClicked = new EventEmitter<string>();

  public locationZipCodeFormControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/),
    ],
    updateOn: 'blur',
  });

  constructor() {}

  public onAddLocationClicked() {
    if (!this.locationZipCodeFormControl.valid) {
      return;
    }

    this.locationAdded.emit(this.locationZipCodeFormControl.value);
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
