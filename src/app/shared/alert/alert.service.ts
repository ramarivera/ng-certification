import { Injectable } from '@angular/core';
import { DialogOverlayRef } from '../dialog/dialog-overlay-ref';
import { DialogService } from '../dialog/dialog.service';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { AlertData } from './alert.model';

@Injectable()
export class AlertService {
  constructor(private dialogService: DialogService) {}

  public displayAlert(description: string, title?: string): DialogOverlayRef {
    const alertData: AlertData = {
      description,
      title,
    };

    return this.dialogService.open(AlertDialogComponent, alertData);
  }
}
