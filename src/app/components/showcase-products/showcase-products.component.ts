// showcase-products.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FridgeService } from '../../services/fridge.service';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription, debounceTime, tap } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-showcase-products',
  standalone: true,
  imports: [NgFor, RouterModule, NgIf],
  templateUrl: './showcase-products.component.html',
  styleUrls: ['./showcase-products.component.scss']
})
export class ShowcaseProductsComponent implements OnInit {

  fridgeStore!: any;
  fridgeService = inject(FridgeService);
  public myForm!: FormGroup;
  cart$!: Observable<any[]>;
  private subscriptions: Subscription = new Subscription();

  public isLoading: boolean = true
  public isEmpty: boolean = true;
  public cart: any = []
  public fridgeId!: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.fridgeService.currentFridgeId.subscribe(id => {
      this.fridgeId = id;
    });

    this.loadFridgeStore();
    this.loadCart();

  }


  private loadCart() {
    this.cart$ = this.fridgeService.getCart();
    this.cart$.subscribe((cart) => {
      if (Array.isArray(cart)) {
        this.cart = cart;
      }
      this.isEmpty = cart.length > 0 ? false : true;
    })
  }

  private loadFridgeStore(): void {
    this.subscriptions.add(
      this.fridgeService.getFridgeStore(this.fridgeId)
        .pipe(
          tap(() => this.isLoading = true),
          debounceTime(300)
        )
        .subscribe(store => {
          this.fridgeStore = store;
          this.isLoading = false;
        })
    );
  }

  initCount(product: any) {
    const match = this.cart.find((item: any) => item.id === product.id)
    return match ? match.count : 0;
  }


  increment(item: any) {
    this.fridgeService.addToCart(item);
  }

  decrement(index: string) {
    this.fridgeService.removeFromCart(index);
  }

  toCart() {
    this.router.navigate([`fridge-menu/${this.fridgeId}/cart`]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
