import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

import { Router } from '@angular/router';

interface Request {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  mouseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
   
    private route: Router
  ) {

    this.mouseForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

  }


  onSubmit(): void {

 
  const user = localStorage.getItem('currentUser');

  if (!user) {
    
    this.route.navigate(['/without-login'],
       {
    queryParams: { returnUrl: '/contact'} });
    
    return;
       };

 
  if (this.mouseForm.invalid) {
    this.mouseForm.markAllAsTouched();
    return;
  }

  const request: Request = this.mouseForm.value;

  this.api.addRequest(request).subscribe({

    next: (res:any) => {

      localStorage.setItem('Request', JSON.stringify(res));
      this.mouseForm.reset();

      this.route.navigate(['/welcome4']);
    },

    error: () => {
      alert('Something went wrong');
    }

  });

}

}