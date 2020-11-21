import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  public locationZipCodeFormControl = new FormControl('');

  constructor() {}

  public onAddLocationClicked() {
    const locationZipCode = this.locationZipCodeFormControl.value;
    this.locationAdded.emit(locationZipCode);
    this.locationZipCodeFormControl.reset();
  }
}
