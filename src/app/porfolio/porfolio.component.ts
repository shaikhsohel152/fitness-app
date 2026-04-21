import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../service/cart.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-porfolio',
  templateUrl: './porfolio.component.html',
  styleUrls: ['./porfolio.component.css']
})
export class PorfolioComponent implements OnInit {

  user: any;
  editAddress = false;

  addressInput = '';
  cityInput = '';
  pincodeInput = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cart: CartService,
    private api: ApiService
  ) { }

  ngOnInit(): void {

    const storedUser = localStorage.getItem('currentUser');

    if (!storedUser) {
      this.router.navigate(['/profile']);
      return;
    }

    this.user = JSON.parse(storedUser);

    // Auto-fill inputs
    this.addressInput = this.user.address || '';
    this.cityInput = this.user.city || '';
    this.pincodeInput = this.user.pincode || '';

  }


  saveAddress(): void {

    if (!this.addressInput.trim() || !this.cityInput.trim() || !this.pincodeInput.trim()) {
      alert('All fields are mandatory');
      return;
    }

    // Pincode validation
    const isIndianPincode = /^[1-9][0-9]{5}$/.test(this.pincodeInput);

    if (!isIndianPincode) {

      this.router.navigate(['/shipment-code'], {
        queryParams: { returnUrl: '/porfolio' }
      });

      return;
    }


    const updatedData = {
      address: this.addressInput,
      city: this.cityInput,
      pincode: this.pincodeInput
    };


    this.api.updateUser(this.user.id, updatedData).subscribe({

      next: () => {

        this.user.address = this.addressInput;
        this.user.city = this.cityInput;
        this.user.pincode = this.pincodeInput;

        localStorage.setItem('currentUser', JSON.stringify(this.user));

        this.editAddress = false;

        alert('Details saved successfully');
      },

      error: () => {
        alert('Failed to save details');
      }

    });

  }

  cancelEdit(): void {

    this.addressInput = this.user.address || '';
    this.cityInput = this.user.city || '';
    this.pincodeInput = this.user.pincode || '';

    this.editAddress = false;

  }


  logout(): void {

    this.cart.clearCart();
    localStorage.removeItem('currentUser');

    this.router.navigate(['/profile']);

  }
  goToOrders() {

    this.router.navigate(['/myorder']);

  }

}