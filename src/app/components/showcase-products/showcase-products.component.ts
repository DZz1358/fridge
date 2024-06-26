// showcase-products.component.ts
import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FridgeService } from '../../services/fridge.service';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-showcase-products',
  standalone: true,
  imports: [NgFor, RouterModule, NgIf],
  templateUrl: './showcase-products.component.html',
  styleUrls: ['./showcase-products.component.scss']
})
export class ShowcaseProductsComponent implements OnInit, OnChanges {

  fridgeStore!: any;
  fridgeService = inject(FridgeService);
  public myForm!: FormGroup;
  cart$!: Observable<any[]>;

  public isEmpty: boolean = true;

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.fridgeService.getFridgeStore('66a6805f-70e2-4670-923e-2910ee5ad79b').subscribe(arg => {
      this.fridgeStore = arg;
      this.initializeProductCounts();
    });

    this.cart$ = this.fridgeService.getCart();
    this.cart$.subscribe((cart) => {
      this.isEmpty = cart.length > 0 ? false : true;
    })

  }

  initializeProductCounts() {
    if (this.fridgeStore?.products) {
      this.fridgeStore.products.forEach((product: any) => {
        if (product.count === undefined) {
          product.count = 0;
        }
      });
    }
  }

  increment(index: number) {
    this.fridgeStore.products[index].count++;
  }

  decrement(index: number) {
    if (this.fridgeStore.products[index].count > 0) {
      this.fridgeStore.products[index].count--;
    }
  }

  addToCart(item: any, quantity: number) {
    let product = {
      ...item,
      qty: quantity
    }
    this.fridgeService.addToCart(product);
    item.count = 0;
    this.cart$ = this.fridgeService.getCart();
  }


  clearCart() {
    this.fridgeService.clearCart();
  }

}
