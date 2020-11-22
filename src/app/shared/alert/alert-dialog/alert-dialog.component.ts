import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialogComponent } from '../../dialog/base-dialog.component';
import { DialogOverlayRef } from '../../dialog/dialog-overlay-ref';
import { DIALOG_DATA } from '../../dialog/dialog.tokens';
import { AlertData } from '../alert.model';

@Component({
  selector: 'rar-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
})
export class AlertDialogComponent extends BaseDialogComponent {
  public readonly title = this.dialogData.title;
  public readonly description = this.dialogData.description;

  constructor(
    protected dialogRef: DialogOverlayRef,
    @Inject(DIALOG_DATA) private dialogData: AlertData
  ) {
    super(dialogRef);
    console.log('OPENING ALERT!');
  }

  onCloseClicked() {
    this.dialogRef.close();
  }

  onOkClicked() {
    this.dialogRef.close();
  }
}
