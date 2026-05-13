import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  signupForm!: FormGroup;

  showPassword = false;

  showConfirmPassword = false;

  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {

    this.signupForm = new FormGroup({

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
        Validators.required
      ])

    },
      {
        validators: this.passwordMatchValidator
      });

  }

  passwordMatchValidator(
    control: AbstractControl
  ) {

    const password =
      control.get('password')?.value;

    const confirmPassword =
      control.get('confirmPassword')?.value;

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };

  }

  togglePassword(): void {

    this.showPassword = !this.showPassword;

  }

  toggleConfirmPassword(): void {

    this.showConfirmPassword =
      !this.showConfirmPassword;

  }

  onSignup(): void {

    if (this.signupForm.invalid) {

      this.signupForm.markAllAsTouched();

      return;

    }

    const user = {

      name: this.signupForm.value.name.trim(),

      email: this.signupForm.value.email
        .trim()
        .toLowerCase(),

      phone: this.signupForm.value.phone,

      password: this.signupForm.value.password

    };

    console.log("SIGNUP REQUEST:", user);

    this.api.addUser(user).subscribe({

      next: (res: any) => {

        console.log("SIGNUP RESPONSE:", res);

        if (!res.user) {

          alert("Signup Failed");

          return;

        }

        localStorage.setItem(
          'currentUser',
          JSON.stringify(res.user)
        );

        this.signupForm.reset();

        // ✅ LOGIN PAGE
        this.router.navigate(['/welcome2']);

      },

      error: (err) => {

        console.log("SIGNUP ERROR:", err);

        alert(
          err.error?.message ||
          "Signup Failed"
        );

      }

    });

  }

}