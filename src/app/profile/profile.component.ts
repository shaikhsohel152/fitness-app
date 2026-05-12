import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  signupForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {

    this.signupForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ]),

        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),

        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]),

        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),

        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ])
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSignup(): void {

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { name, email, phone, password } = this.signupForm.value;

    const user: User = {
      name: name.trim(),
      email: email.toLowerCase(),
      phone,
      password
    };

    console.log("SIGNUP REQUEST:", user);

    this.api.addUser(user).subscribe({

      next: (res: any) => {

        console.log("SIGNUP RESPONSE:", res);

        const createdUser = res.user || res.response;

        if (!createdUser) {
          alert(res.message || 'Signup failed!');
          return;
        }

        localStorage.setItem('currentUser', JSON.stringify(createdUser));

        this.signupForm.reset();

        this.router.navigate(['/welcome2']);
      },

      error: (err) => {
        console.log("SIGNUP ERROR:", err);
        alert(err.error?.message || 'Signup failed!');
      }

    });
  }
}