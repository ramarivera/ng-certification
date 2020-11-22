import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocationCurrentConditionViewModel, TemperatureUnit } from '../models';
import { notIncludedIn } from '../../shared/validation';

@Component({
  selector: 'rar-locations-forecast',
  templateUrl: './locations-forecast.component.html',
  styleUrls: ['./locations-forecast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsForecastComponent implements OnInit, OnChanges {
  @Input()
  public locationsConditions: LocationCurrentConditionViewModel[];

  @Input()
  public temperatureUnit: TemperatureUnit;

  @Input()
  public existentLocations: string[] = [];

  @Output()
  public addLocation = new EventEmitter<string>();

  @Output()
  public closeLocation = new EventEmitter<string>();

  @Output()
  public fiveDaysForecastClick = new EventEmitter<string>();

  public zipCode: FormControl;

  private zipCodeDefaultValidators = [
    Validators.required,
    Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/),
  ];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.existingLocations?.isFirstChange()) {
      this.zipCode.setValidators([
        ...this.zipCodeDefaultValidators,
        notIncludedIn(this.existentLocations),
      ]);
      this.zipCode.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.zipCode = new FormControl('', {
      validators: [
        ...this.zipCodeDefaultValidators,
        notIncludedIn(this.existentLocations),
      ],
      updateOn: 'blur',
    });
  }

  public onAddLocationClicked() {
    if (!this.zipCode.valid) {
      return;
    }

    this.addLocation.emit(this.zipCode.value);
    this.zipCode.reset();
  }

  public onLocationFiveDaysForecastClicked(
    locationCondition: LocationCurrentConditionViewModel
  ) {
    this.fiveDaysForecastClick.emit(locationCondition.zipCode);
  }

  public onLocationCloseClicked(
    locationCondition: LocationCurrentConditionViewModel
  ) {
    this.closeLocation.emit(locationCondition.zipCode);
  }
}
