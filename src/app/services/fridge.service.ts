import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  API_URL = 'https://fridge.api.w3b.services';
  ID = '66a6805f-70e2-4670-923e-2910ee5ad79b';

  constructor(private http: HttpClient) {
    this.loadCartFromLocalStorage();
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
      productInCart.qty += item.qty;
    } else {
      currentCart.push(item);
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
    return this.http.get(`${this.API_URL}/fridge/${id}/store`);
  }

  sendOrder(data: any) {
    return this.http.post(`${this.API_URL}/order/${this.ID}`, data);
  }
}
