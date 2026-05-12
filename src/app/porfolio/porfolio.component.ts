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
  ) {}

  ngOnInit(): void {

    const storedUser = localStorage.getItem('currentUser');

    if (!storedUser) {
      this.router.navigate(['/profile']);
      return;
    }

    this.user = JSON.parse(storedUser);

    // Auto-fill inputs safely
    this.addressInput = this.user.address || '';
    this.cityInput = this.user.city || '';
    this.pincodeInput = this.user.pincode || '';
  }

  // ================= SAVE ADDRESS =================
  saveAddress(): void {

    if (!this.addressInput.trim() || !this.cityInput.trim() || !this.pincodeInput.trim()) {
      alert('All fields are mandatory');
      return;
    }

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

    // 🔥 FIX: use _id instead of id
    this.api.updateUser(this.user._id, updatedData).subscribe({

      next: (res: any) => {

        // update local user with response (safe way)
        this.user = res.user || { ...this.user, ...updatedData };

        // save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(this.user));

        this.editAddress = false;

        alert('Details saved successfully');
      },

      error: (err) => {
        console.log("Update error:", err);
        alert('Failed to save details');
      }

    });

  }

  // ================= CANCEL EDIT =================
  cancelEdit(): void {

    this.addressInput = this.user.address || '';
    this.cityInput = this.user.city || '';
    this.pincodeInput = this.user.pincode || '';

    this.editAddress = false;
  }

  // ================= LOGOUT =================
  logout(): void {

    this.cart.clearCart();
    localStorage.removeItem('currentUser');

    this.router.navigate(['/profile']);
  }

  // ================= ORDERS =================
  goToOrders(): void {
    this.router.navigate(['/myorder']);
  }
}