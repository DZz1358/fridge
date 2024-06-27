import { Component, OnInit, inject } from '@angular/core';
import { FridgeService } from '../../services/fridge.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, RouterModule, AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart$!: Observable<any[]>;
  totalPrice$!: Observable<number>;


  fridgeService = inject(FridgeService);

  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.cart$ = this.fridgeService.getCart();

    this.totalPrice$ = this.cart$.pipe(
      map(cart => cart.reduce((acc, curr) => acc + (+curr.price * curr.qty), 0)),
    );

  }


  order() {
    let order: { id: any; qty: any; }[] = []

    this.cart$.subscribe((res: any) => {
      res.forEach((item: any) => {
        order.push({
          id: item.id,
          qty: item.qty
        })
      });

    })

    this.fridgeService.sendOrder(order).subscribe((res: any) => {
      let url = res.payment_link
      window.open(url, '_blank');
    })
    console.log('order', order);
  }

  clearCart() {
    this.fridgeService.clearCart();
  }


}
