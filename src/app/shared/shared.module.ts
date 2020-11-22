import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogService } from './dialog/dialog.service';
import { AlertService } from './alert/alert.service';
import { AlertDialogComponent } from './alert/alert-dialog/alert-dialog.component';

@NgModule({
  imports: [CommonModule],
  providers: [DialogService, AlertService],
  declarations: [AlertDialogComponent],
})
export class SharedModule {}
