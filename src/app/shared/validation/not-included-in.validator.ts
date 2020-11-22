import { AbstractControl, ValidatorFn } from '@angular/forms';

export function notIncludedIn(values: string[]) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const normalizedValue: string = control.value?.toLowerCase().trim();

    return values.includes(normalizedValue)
      ? { notIncludedIn: control.value }
      : null;
  };
}
