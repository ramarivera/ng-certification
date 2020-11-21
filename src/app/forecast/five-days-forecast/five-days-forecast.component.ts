import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FiveDaysLocationForecastViewModel, TemperatureUnit } from '../models';

@Component({
  selector: 'rar-five-days-forecast',
  templateUrl: './five-days-forecast.component.html',
  styleUrls: ['./five-days-forecast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiveDaysForecastComponent {
  @Input()
  public temperatureUnit: TemperatureUnit;

  @Input()
  public fiveDaysForecast: FiveDaysLocationForecastViewModel;

  @Output()
  public backClicked = new EventEmitter();

  constructor() {}

  public onBackButtonClicked() {
    this.backClicked.emit();
  }
}
