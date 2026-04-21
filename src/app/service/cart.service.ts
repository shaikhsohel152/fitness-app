import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = [];
  cart$ = new BehaviorSubject<any[]>([]);

  constructor() {
    // 🔁 LOAD CART FROM LOCALSTORAGE ON APP START
    const storedCart = localStorage.getItem('cartItems');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    this.cart$.next(this.cartItems);
  }

  private updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cart$.next(this.cartItems);
  }

  addToCart(product: any) {

    const existing = this.cartItems.find(
      item => item.id === product.id
    );

    if (existing) {

      if (existing.quantity < 10) {
        existing.quantity++;
      }

    }
    else {

      this.cartItems.push({

        id: product.id,

        brand: product.brand,

        rating: product.rating,

        bougth: product.bougth,

        price: Number(product.price),

        image: product.imgsrc,

        quantity: 1

      });

    }

    this.updateCart();

  }

  increaseQty(item: any) {
    if (item.quantity < 10) {
      item.quantity++;
      this.updateCart();
    }
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(
      p => p.id !== item.id
    );
    this.updateCart();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }

  getCartItems() {
    return this.cartItems;
  }

  // 🔥 THIS IS THE KEY FIX
  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
    this.cart$.next([]);
  }
}
