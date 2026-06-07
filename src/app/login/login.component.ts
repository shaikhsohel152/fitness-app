import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  step: number = 1;

  email: string = '';
  otp: string = '';
  name: string = '';

  loading: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private cartService: CartService
  ) {}

  // ================= SEND OTP =================
  sendOtp(): void {

    if (!this.email.trim()) {
      alert('Email required');
      return;
    }

    this.loading = true;

    this.api.sendOtp(this.email).subscribe({

      next: (res) => {

        console.log(res);

        this.step = 2;

        this.loading = false;

        alert('OTP sent successfully 📩');
      },

      error: (err) => {

        console.log(err);

        this.loading = false;

        alert('Failed to send OTP ❌');
      }

    });
  }

  // ================= VERIFY OTP =================
  verifyOtp(): void {

    if (
      !this.name.trim() ||
      !this.email.trim() ||
      !this.otp.trim()
    ) {
      alert('All fields required');
      return;
    }

    this.loading = true;

    this.api.verifyOtp({
      name: this.name,
      email: this.email,
      otp: this.otp
    }).subscribe({

      next: (res: any) => {

        console.log('OTP RESPONSE:', res);

        this.loading = false;

        const user = res?.user || {
          name: this.name,
          email: this.email
        };

        // Save logged in user
        localStorage.setItem(
          'currentUser',
          JSON.stringify(user)
        );

        // Clear old cart
        this.cartService.clearCart();
        localStorage.removeItem('cart');

        alert('Login Successful 🚀');

        this.router.navigate(['/profile']);
      },

      error: (err) => {

        console.log(err);

        this.loading = false;

        alert('Invalid OTP ❌');
      }

    });
  }

  // ================= RESEND OTP =================
  resendOtp(): void {
    this.sendOtp();
  }

}