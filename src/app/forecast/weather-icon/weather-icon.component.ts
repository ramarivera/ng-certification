import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { WeatherType } from '../models';

@Component({
  selector: 'rar-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherIconComponent {
  @Input()
  public weather: WeatherType;

  public get weatherIconSrc() {
    return `/assets/weather/${this.weather}.png`;
  }

  constructor() {}
}
