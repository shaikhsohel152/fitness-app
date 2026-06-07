import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { ApiService } from '../services/api.service';

interface Address {
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = null;

  tab: string = 'profile';

  addressInput: Address = {
    phone: '',
    address: '',
    city: '',
    pincode: ''
  };

  constructor(
    private router: Router,
    private cart: CartService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  // ================= LOAD USER =================
  loadUser(): void {

    const data = localStorage.getItem('currentUser');

    if (!data) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      const parsed = JSON.parse(data);

      this.user = {
        name: parsed?.name || 'User',
        email: parsed?.email || '',
        phone: parsed?.phone || '',
        address: parsed?.address || '',
        city: parsed?.city || '',
        pincode: parsed?.pincode || '',
        _id: parsed?._id
      };

      this.fillForm();

    } catch (e) {
      console.log('Corrupted user data');
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }
  }

  // ================= FILL FORM =================
  fillForm(): void {
    this.addressInput = {
      phone: this.user?.phone || '',
      address: this.user?.address || '',
      city: this.user?.city || '',
      pincode: this.user?.pincode || ''
    };
  }

  // ================= SAVE =================
 
saveAddress(): void {

  if (
    !this.addressInput.phone.trim() ||
    !this.addressInput.address.trim() ||
    !this.addressInput.city.trim() ||
    !this.addressInput.pincode.trim()
  ) {
    alert('All fields are required');
    return;
  }

  const isValidPhone = /^[6-9]\d{9}$/.test(this.addressInput.phone);

  if (!isValidPhone) {
    alert('Please enter a valid 10-digit mobile number');
    return;
  }

  const isValidPin = /^[1-9][0-9]{5}$/.test(this.addressInput.pincode);

  if (!isValidPin) {
    this.router.navigate(['/shipment-code'], {
      queryParams: { returnUrl: '/profile' }
    });
    return;
  }

  const updatedData = {
    phone: this.addressInput.phone,
    address: this.addressInput.address,
    city: this.addressInput.city,
    pincode: this.addressInput.pincode
  };

  this.api.updateUser(this.user._id, updatedData).subscribe({

    next: (res: any) => {

      this.user = {
        ...this.user,
        ...updatedData
      };

      localStorage.setItem('currentUser', JSON.stringify(this.user));

      alert('Profile updated successfully');
    },

    error: (err) => {
      console.log(err);
      alert('Update failed');
    }
  });
}


  // ================= CANCEL =================
  cancelEdit(): void {
    this.fillForm();
  }

  // ================= NAVIGATION =================
  goToOrders(): void {
    this.router.navigate(['/myorder']);
  }

  logout(): void {
    this.cart.clearCart();
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}