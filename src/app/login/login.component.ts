import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showPassword = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  handleLogin(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log("LOGIN REQUEST:", this.loginForm.value);

    this.api.loginUser(this.loginForm.value).subscribe({

      next: (res: any) => {

        console.log("LOGIN RESPONSE:", res);

        // 🔥 SAFE EXTRACTION (backend flexible)
        const user = res.user || res.response;

        if (!user || !user.email) {
          this.router.navigate(['/signin-reject']);
          return;
        }

        this.cartService.clearCart();

        localStorage.setItem('currentUser', JSON.stringify(user));

        this.router.navigate(['/welcome1']);
      },

      error: (err) => {
        console.log("LOGIN ERROR:", err);
        this.router.navigate(['/signin-reject']);
      }

    });
  }
}