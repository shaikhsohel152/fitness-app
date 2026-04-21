import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome3',
  templateUrl: './welcome3.component.html',
  styleUrls: ['./welcome3.component.css']
})
export class Welcome3Component implements OnInit {

  userName: string = '';
  paymentMethod: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.name;
    }

    const method = localStorage.getItem('paymentMethod');
    if (method) {
      this.paymentMethod = method;
      // 🔹 optional: remove from localStorage after showing
      localStorage.removeItem('paymentMethod');
    }
  }

  closePage(): void {
    this.router.navigate(['/product']);
  }
}
