import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-success-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,],
  templateUrl: './payment-success-modal.component.html',
  styleUrl: './payment-success-modal.component.scss'
})
export class PaymentSuccessModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
