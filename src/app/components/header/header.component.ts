import { Component, OnChanges, OnInit, SimpleChanges, computed, inject, signal } from '@angular/core';
import { FridgeService } from '../../services/fridge.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  cart$: Observable<any[]>;
  totalPrice$: Observable<number>;
  fridgeService = inject(FridgeService);

  constructor() {
    this.cart$ = this.fridgeService.getCart();
    this.totalPrice$ = this.cart$.pipe(
      map(cart => cart.reduce((acc, curr) => acc + (+curr.price * curr.qty), 0)),
    );
    this.totalPrice$.subscribe((totalPrice) => {
      console.log('totalPrice', totalPrice);
    })
  }

  ngOnInit(): void {
    // Initial load
    this.fridgeService.getCart().subscribe();
  }
}
