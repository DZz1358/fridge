import { Component, OnInit, inject } from '@angular/core';
import { FridgeService } from '../../services/fridge.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IProduct } from '../../models/fridge.interfaces';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart$!: Observable<IProduct[]>;
  totalPrice: number = 0;

  fridgeId!: string;
  fridgeService = inject(FridgeService);

  constructor(private router: Router, private route: ActivatedRoute,) {
  }
  ngOnInit(): void {
    this.cart$ = this.fridgeService.getCart();
    this.cart$.subscribe((res: any) => {
      this.totalPrice = res.reduce((acc: any, curr: any) => acc + (+curr.price * curr.count), 0)
    })

    this.route.paramMap.subscribe(params => {
      this.fridgeId = params.get('id')!;
    });

  }

  increment(item: IProduct) {
    this.fridgeService.addToCart(item);
  }

  decrement(index: string) {
    this.fridgeService.removeFromCart(index);
  }

  sendOrder() {
    let order: { id: any; qty: any; }[] = []

    this.cart$.subscribe((res: any) => {
      res.forEach((item: any) => {
        order.push({
          id: item.id,
          qty: item.count
        })
      });
    })

    this.fridgeService.sendOrder(order, this.fridgeId).subscribe((res: any) => {
      let url = res.payment_link
      window.location.href = url;
    })
    console.log('order', order);
  }


  back() {
    this.router.navigate([`fridge-menu/${this.fridgeId}`])
  }

  clearCart() {
    this.fridgeService.clearCart();
  }


}
