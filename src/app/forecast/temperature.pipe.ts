import { Pipe, PipeTransform } from '@angular/core';
import { Temperature, TemperatureUnit } from './models';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  private readonly conversionTable = {
    ['C']: {
      ['C']: (value: number) => value,
      ['F']: (value: number) => this.celsiusToFahrenheit(value),
      ['K']: (value: number) => this.celsiusToKelvin(value),
    },
    ['F']: {
      ['C']: (value: number) => this.fahrenheitToCelsius(value),
      ['F']: (value: number) => value,
      ['K']: (value: number) =>
        this.celsiusToKelvin(this.fahrenheitToCelsius(value)),
    },
    ['K']: {
      ['C']: (value: number) => this.kelvinToCelsius(value),
      ['F']: (value: number) =>
        this.celsiusToFahrenheit(this.kelvinToCelsius(value)),
      ['K']: (value: number) => value,
    },
  };

  transform(
    temp: Temperature,
    unit: TemperatureUnit,
    printUnit?: boolean
  ): string {
    const convertedTemp = this.convert(temp.value, temp.unit, unit);
    return `${convertedTemp}${printUnit ? unit : ''}`;
  }

  public convert(
    value: number,
    fromUnit: TemperatureUnit,
    toUnit: TemperatureUnit
  ): number {
    const convertedTemp = this.conversionTable[fromUnit][toUnit](value);
    return Math.round((convertedTemp + Number.EPSILON) * 100) / 100;
  }

  private fahrenheitToCelsius(fahrenheitTemp: number): number {
    return (5 / 9) * (fahrenheitTemp - 32);
  }

  private celsiusToFahrenheit(celsiusTemp: number): number {
    return celsiusTemp * (9 / 5) + 32;
  }

  private celsiusToKelvin(celsiusTemp: number): number {
    return celsiusTemp + 273.15;
  }

  private kelvinToCelsius(kelvinTemp: number): number {
    return kelvinTemp - 273.15;
  }
}
