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

  this.api.loginUser(this.loginForm.value)
  .subscribe({

    next:(user:any)=>{

      // cart clear
      this.cartService.clearCart();

      // save user
      localStorage.setItem(
        'currentUser',
        JSON.stringify(user)
      );

      this.router.navigate(['/welcome1']);

    },

    error:()=>{

      this.router.navigate(['/signin-reject']);

    }

  });

}
}
