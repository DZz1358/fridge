import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ICart, IFridge } from '../models/fridge.interface';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {
  private storageCartsSubject = new BehaviorSubject<ICart[] | any[]>([]);
  API_URL = 'https://fridge.api.w3b.services';

  private fridgeIdSource = new BehaviorSubject<string>('');

  currentFridgeId = this.fridgeIdSource.asObservable();

  public fridgeId: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadCartFromLocalStorage();
  }

  changeFridgeId(id: string) {
    this.fridgeIdSource.next(id);
    this.fridgeId = id;
  }

  private loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      this.storageCartsSubject.next(cart);
    }
  }

  private saveCartToLocalStorage(cart: ICart | any) {
    localStorage.setItem('cart', JSON.stringify(this.storageCartsSubject.value));
  }

  public getFridgeId() {
    return localStorage.getItem('fridgeId');
  }

  public clearFridgeId() {
    localStorage.removeItem('fridgeId');
  }

  public setFridgeId(id: string) {
    localStorage.setItem('fridgeId', JSON.stringify(id));
  }

  addToCart(item: any) {
    const currentCarts = this.storageCartsSubject.value;
    let currentCart = currentCarts.find(cart => cart.fridgeId === this.fridgeId);

    if (!currentCart) {
      item.count = 1;
      currentCarts.push({
        fridgeId: this.fridgeId,
        products: [item],
        updatedAt: new Date().toISOString()
      });
    } else {
      let productInCart = currentCart.products.find((cartItem: { id: any; }) => cartItem.id === item.id);
      if (productInCart) {
        productInCart.count++;
        currentCart.updatedAt = new Date().toISOString()
      } else {
        item.count = 1;
        currentCart.products.push(item);
        currentCart.updatedAt = new Date().toISOString()
      }
    }
    this.saveCartToLocalStorage(currentCarts);
    this.storageCartsSubject.next(currentCarts);
  }

  removeFromCart(id: string) {
    const currentCarts = this.storageCartsSubject.value;
    let currentCart = currentCarts.find(cart => cart.fridgeId === this.fridgeId);

    if (currentCart) {
      let productIndex = currentCart.products.findIndex((cartItem: { id: string; }) => cartItem.id === id);

      if (productIndex !== -1) {
        let currentProduct = currentCart.products[productIndex];
        currentProduct.count--;

        if (currentProduct.count <= 0) {
          currentCart.products.splice(productIndex, 1);
        }

        this.saveCartToLocalStorage(currentCarts);
        this.storageCartsSubject.next(currentCarts);
      }
    }
  }


  getCart() {
    return this.storageCartsSubject.asObservable();
  }

  checkCartTime(id: string) {
    const currentCarts = this.storageCartsSubject.value;
    let currentCart = currentCarts.find(cart => cart.fridgeId === id);

    if (currentCart) {
      const currentTime = new Date().getTime();
      const cartTime = new Date(currentCart.updatedAt).getTime();
      const timeDifference = currentTime - cartTime;

      if (timeDifference > 1440 * 60 * 1000) {
        this.clearCurrentCart();
      }
    }
  }

  clearCurrentCart() {
    const currentCarts = this.storageCartsSubject.value;
    let currentCart = currentCarts.find(cart => cart.fridgeId === this.fridgeId);

    if (currentCart) {
      currentCarts.splice(currentCarts.indexOf(currentCart), 1);
      this.saveCartToLocalStorage(currentCarts);
      this.storageCartsSubject.next(currentCarts);
    }
  }

  getFridgeStore(id: string) {
    return this.http.get<IFridge>(`${this.API_URL}/fridge/${id}/store`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.router.navigate(['/not-found']);
        }
        return throwError(() => error);
      })
    );
  }
  sendOrder(data: any, fridgeId: string) {
    return this.http.post(`${this.API_URL}/order/${fridgeId}`, data);
  }

  getOrder(id: string) {
    return this.http.get(`${this.API_URL}/order/store/${id}`)
  }
}
