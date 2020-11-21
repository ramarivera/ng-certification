import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationCurrentConditionViewModel, TemperatureUnit } from '../models';

@Component({
  selector: 'rar-location-conditions',
  templateUrl: './location-conditions.component.html',
  styleUrls: ['./location-conditions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationConditionsComponent implements OnInit {
  @Input()
  public currentCondition: LocationCurrentConditionViewModel;

  @Input()
  public temperatureUnit: TemperatureUnit = 'F';

  @Output()
  public fiveDaysForecastClicked = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public onFiveDaysForecastClicked() {
    this.fiveDaysForecastClicked.emit();
  }
}
