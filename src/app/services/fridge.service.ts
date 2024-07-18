import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IFridge } from '../models/fridge.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  API_URL = 'https://fridge.api.w3b.services';

  private fridgeIdSource = new BehaviorSubject<string>('');
  private fridgeIdSubject = new BehaviorSubject<string | null>(null);

  currentFridgeId = this.fridgeIdSource.asObservable();

  constructor(private http: HttpClient,
  ) {
    this.loadCartFromLocalStorage();
  }

  changeFridgeId(id: string) {
    this.fridgeIdSource.next(id);
  }

  private loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      this.cartSubject.next(cart);
    }
  }

  private saveCartToLocalStorage(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(item: any) {
    const currentCart = this.cartSubject.value;
    const productInCart = currentCart.find(cartItem => cartItem.id === item.id);

    if (productInCart) {
      productInCart.count++;
    } else {
      item.count = 1;
      currentCart.push(item);
    }

    this.saveCartToLocalStorage(currentCart);
    this.cartSubject.next(currentCart);
  }

  removeFromCart(id: string) {
    const currentCart = this.cartSubject.value;

    const productIndex = currentCart.findIndex(cartItem => cartItem.id === id);

    if (productIndex !== -1) {
      const productInCart = currentCart[productIndex];

      if (productInCart.count > 1) {
        productInCart.count--;
      } else {
        currentCart.splice(productIndex, 1);
      }
    }

    this.saveCartToLocalStorage(currentCart);
    this.cartSubject.next(currentCart);
  }

  getCart() {
    return this.cartSubject.asObservable();
  }

  clearCart() {
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }

  getFridgeStore(id: string) {
    return this.http.get<IFridge>(`${this.API_URL}/fridge/${id}/store`);
  }

  sendOrder(data: any, fridgeId: string) {
    return this.http.post(`${this.API_URL}/order/${fridgeId}`, data);
  }
}
