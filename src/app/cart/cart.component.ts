import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  constructor(private cartService: CartService, private route: Router) {}

  ngOnInit(): void {

    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });

  }

  increase(item: any) {
    this.cartService.increaseQty(item);
  }

  decrease(item: any) {
    this.cartService.decreaseQty(item);
  }

  remove(item: any) {
    this.cartService.removeItem(item);
  }

  getTotal() {
    return this.cartService.getTotal();
  }
  proceedToCheckout() {

  const user = localStorage.getItem('currentUser');

  if (!user) {

    this.route.navigate(
      ['/without-login'],
      {
        queryParams: { returnUrl: '/cart' }
      }
    );

  } else {

    this.route.navigate(['/payment-mode']);

  }

}

  

}