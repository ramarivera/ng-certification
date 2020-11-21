import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '../../app.injection-tokens';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(@Inject(WINDOW) private window: Window) {}

  public showMessage(message: string) {
    this.window.alert(message);
  }

  public showError(errorMessage: string) {
    this.window.alert(errorMessage);
  }
}
