import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

interface Purchase {
  name: string;
  email: string;
  brand: string;
  price: number;
  quantity: number;
  address: string;
  date: string;
  image: string;
}

@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.css']
})
export class PaymentModeComponent implements OnInit {

  cartItems: any[] = [];
  totalAmount = 0;

  selectedMode = '';
  selectedUpi = '';

  card = {
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  };

  userAddress: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {

    this.cartItems = this.cartService.getCartItems();

    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );

    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {

      this.userAddress = JSON.parse(storedUser);

    }

  }



  /* SELECT PAYMENT MODE */

  selectMode(mode: string) {

    this.selectedMode = mode;

    this.selectedUpi = '';

    this.card = {
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    };

  }



  /* CONFIRM PAYMENT */

  confirmPayment() {

    if (!this.selectedMode) {

      alert('Select payment method');
      return;

    }


    if (this.selectedMode === 'UPI' && !this.selectedUpi) {

      alert('Select UPI app');
      return;

    }


    if (
      this.selectedMode === 'Debit Card' ||
      this.selectedMode === 'Credit Card'
    ) {

      if (
        this.card.number.length !== 16 ||
        !this.card.name ||
        !this.card.expiry ||
        this.card.cvv.length !== 3
      ) {

        alert('Enter valid card details');
        return;

      }

    }


    this.savePurchase();

  }



  /* SAVE PURCHASE */

  savePurchase() {

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');


    /* BACKEND SAVE */

    this.cartItems.forEach(item => {

      const purchase: Purchase = {

        name: item.name,
        brand: item.brand,
        email: user.email,
        price: item.price,
        quantity: item.quantity,
        address: this.userAddress?.address,
        date: new Date().toLocaleDateString(),
        image: item.image

      };

      this.api.addPurchase(purchase).subscribe();

    });



    /* LOCALSTORAGE SAVE FOR MYORDERS */

    let existingOrders = localStorage.getItem("orders");

    let ordersArray: any[] = [];

    if (existingOrders) {

      ordersArray = JSON.parse(existingOrders);

    }


    this.cartItems.forEach(item => {

      ordersArray.push({

        name: item.name,
        brand: item.brand,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        date: new Date().toLocaleDateString()

      });

    });


    localStorage.setItem("orders", JSON.stringify(ordersArray));



    /* CLEAR CART */

    this.cartService.clearCart();


    /* SUCCESS PAGE */

    this.router.navigateByUrl('/welcome3');

  }



  /* GO PROFILE */

  goToProfile() {

    this.router.navigate(['/porfolio']);

  }

}