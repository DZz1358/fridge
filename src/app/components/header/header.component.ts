import { Component, inject } from '@angular/core';
import { FridgeService } from '../../services/fridge.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cart$: Observable<any[]>;
  totalPrice: number = 0;
  fridgeService = inject(FridgeService);
  fridgeName!: any;
  fridgeId!: any;

  constructor(private route: ActivatedRoute) {
    this.cart$ = this.fridgeService.getCart();
    this.fridgeService.getCart().subscribe();

    this.fridgeService.currentFridgeId.subscribe(id => {
      this.fridgeId = id;
      if (this.fridgeId) {
        this.getTotalCount(this.fridgeId);
      }
    });
  }

  getTotalCount(fridgeId: string) {
    this.cart$.subscribe((res: any) => {
      let currentCart = res.find((item: { fridgeId: any; }) => {
        return item.fridgeId === fridgeId
      });
      this.totalPrice = currentCart?.products.reduce((acc: any, curr: any) => acc + (+curr.price * curr.count), 0)
    })
  }
}
