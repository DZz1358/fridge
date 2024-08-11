import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FridgeService } from '../../services/fridge.service';
import { interval, startWith, Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PaymentStatusPipe } from '../../pipes/payment-status.pipe';
import { NgIf } from '@angular/common';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { PaymentSuccessModalComponent } from './payment-success-modal/payment-success-modal.component';

@Component({
  selector: 'app-payment-status',
  standalone: true,
  imports: [PaymentStatusPipe, NgIf, MatDialogTitle,
    MatDialogContent,],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.scss'
})
export class PaymentStatusComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  fridgeService = inject(FridgeService);

  public orderId!: string;
  // public orderId = '98d97f1b-f50c-4a87-9bc9-c2c5b9470697'
  public order: any;
  public isLoading = true;

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      this.orderId = id
    });


    let isFirstLoad = true;

    this.subscription = interval(10000).pipe(
      startWith(0),
      switchMap(() => this.fridgeService.getOrder(this.orderId)),
      tap(() => {
        if (isFirstLoad) {
          this.isLoading = false;
          isFirstLoad = false;
        }
      })
    ).subscribe(response => {
      this.order = response;
    });
  }


  openDialog() {
    this.dialog.open(PaymentSuccessModalComponent, {
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
