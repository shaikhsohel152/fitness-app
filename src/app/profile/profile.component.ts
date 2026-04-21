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

  constructor(private router: Router, private api: ApiService) { }

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

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };

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

    const user: User = {
      name: this.signupForm.value.name.trim(),
      email: this.signupForm.value.email.toLowerCase(),
      phone: this.signupForm.value.phone,
      password: this.signupForm.value.password
    };

    this.api.addUser(user).subscribe({

      next: (res:any) => {

        // MongoDB response save karega
        localStorage.setItem('currentUser', JSON.stringify(res.response));

        this.signupForm.reset();

        this.router.navigate(['/welcome2']);

      },

      error: () => {
        alert('Signup failed. Try again!');
      }

    });

  }

}