import { Component, OnInit, inject } from '@angular/core';
import { FridgeService } from '../../services/fridge.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IProduct } from '../../models/fridge.interface';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, AsyncPipe, HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart$!: Observable<any[]>;
  totalPrice: number = 0;
  public currentCart: IProduct[] = []
  fridgeId!: any;
  fridgeName: any = '';
  fridgeService = inject(FridgeService);

  constructor(private router: Router, private route: ActivatedRoute,) {
  }
  ngOnInit(): void {
    this.cart$ = this.fridgeService.getCart();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      this.fridgeId = id
      this.fridgeService.changeFridgeId(this.fridgeId);
    });

    this.cart$.subscribe((res: any) => {
      let currentCart = res.find((item: { fridgeId: any; }) => {
        return item.fridgeId === this.fridgeId
      });

      this.currentCart = currentCart.products;
      this.totalPrice = currentCart.products.reduce((acc: any, curr: any) => acc + (+curr.price * curr.count), 0)
    })
  }

  increment(item: any) {
    this.fridgeService.addToCart(item);
  }

  decrement(index: string) {
    this.fridgeService.removeFromCart(index);
  }

  sendOrder() {
    let order: { id: any; qty: any; }[] = []

    this.currentCart.forEach((item: any) => {
      order.push({
        id: item.id,
        qty: item.count
      })
    });

    this.fridgeService.sendOrder(order, this.fridgeId).subscribe((res: any) => {
      let url = res.payment_link
      window.location.href = url;
    })
  }


  back() {
    this.router.navigate([`fridge-menu/${this.fridgeId}`])
  }

  clearCart() {
    this.fridgeService.clearCurrentCart();
  }


}
