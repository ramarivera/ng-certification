import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from './temperature.pipe';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';

@NgModule({
  declarations: [TemperaturePipe, WeatherIconComponent],
  exports: [TemperaturePipe, WeatherIconComponent],
  imports: [CommonModule],
})
export class SharedModule {}
